"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const credentials = z.object({ email: z.string().email(), password: z.string().min(8) });

export async function signIn(_previousState: { error?: string; success?: string }, formData: FormData) {
  const parsed = credentials.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter a valid email and an 8+ character password." };
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) return { error: "Those credentials did not match an account." };
  const { data: profile } = await supabase.from("profiles").select("id").eq("id", (await supabase.auth.getUser()).data.user?.id ?? "").maybeSingle();
  redirect(profile ? "/" : "/onboarding");
}

export async function signUp(_previousState: { error?: string; success?: string }, formData: FormData) {
  const parsed = credentials.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Enter a valid email and an 8+ character password." };
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({ email: parsed.data.email, password: parsed.data.password });
  if (error) return { error: error.message };
  return { success: "Check your email to confirm your OptiSync account." };
}

export async function signInWithGithub() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: "github", options: { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/auth/callback` } });
  if (error) return { error: error.message };
  if (data.url) redirect(data.url);
}

export async function completeOnboarding(_previousState: { error?: string }, formData: FormData) {
  const profile = z.object({ username: z.string().min(2).max(32), defaultGpu: z.string().min(2), defaultCpu: z.string().min(2) }).safeParse(Object.fromEntries(formData));
  if (!profile.success) return { error: "Complete each hardware field to continue." };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");
  const { error } = await supabase.from("profiles").upsert({ id: user!.id, username: profile.data.username, default_gpu: profile.data.defaultGpu, default_cpu: profile.data.defaultCpu });
  if (error) return { error: "Could not save your baseline. Try again." };
  redirect("/");
}
