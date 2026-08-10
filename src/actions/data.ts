"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const optimizationInput = z.object({ gameId: z.string().uuid(), gpuModel: z.string().min(2), resolution: z.string().min(2), targetFps: z.number().int().positive().max(1000).nullable(), settings: z.record(z.string(), z.string()).refine((value) => Object.keys(value).length > 0) });

export async function createOptimization(input: unknown) {
  const parsed = optimizationInput.safeParse(input);
  if (!parsed.success) return { error: "Check the blueprint fields and try again." };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to submit a blueprint." };
  const { error } = await supabase.from("optimizations").insert({ ...parsed.data, user_id: user.id });
  if (error) return { error: "Could not save the blueprint right now." };
  revalidatePath(`/games/${parsed.data.gameId}`);
  return { success: true };
}

export async function toggleTrackedGame(gameId: string, tracked: boolean) {
  const validId = z.string().uuid().safeParse(gameId);
  if (!validId.success) return { error: "Invalid game id." };
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "You must be signed in to update your library." };
  const query = tracked ? supabase.from("tracked_games").insert({ user_id: user.id, game_id: gameId }) : supabase.from("tracked_games").delete().eq("user_id", user.id).eq("game_id", gameId);
  const { error } = await query;
  if (error) return { error: "Could not update your library." };
  revalidatePath("/");
  return { success: true };
}
