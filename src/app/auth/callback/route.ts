import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from("profiles").select("id").eq("id", user.id).maybeSingle();
      return NextResponse.redirect(new URL(profile ? "/" : "/onboarding", request.url));
    }
  }
  return NextResponse.redirect(new URL("/auth/login", request.url));
}
