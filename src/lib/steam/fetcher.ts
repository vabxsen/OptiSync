import { z } from "zod";

const newsItemSchema = z.object({ gid: z.string(), title: z.string(), url: z.string().url(), date: z.number(), contents: z.string() });
const newsResponseSchema = z.object({ appnews: z.object({ newsitems: z.array(newsItemSchema).default([]) }) });
export type SteamNewsItem = z.infer<typeof newsItemSchema>;

export async function fetchSteamNews(appId: number): Promise<SteamNewsItem[]> {
  const url = new URL("https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/");
  url.searchParams.set("appid", String(appId));
  url.searchParams.set("count", "20");
  url.searchParams.set("maxlength", "10000");
  const response = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(10_000) });
  if (!response.ok) throw new Error(`Steam API returned ${response.status}`);
  const parsed = newsResponseSchema.safeParse(await response.json());
  if (!parsed.success) throw new Error("Steam API response did not match the expected shape");
  return parsed.data.appnews.newsitems;
}

export function steamContentsToMarkdown(contents: string) {
  return contents.replace(/\[h[1-6]\](.*?)\[\/h[1-6]\]/gi, "## $1\n").replace(/\[b\](.*?)\[\/b\]/gi, "**$1**").replace(/\[i\](.*?)\[\/i\]/gi, "*$1*").replace(/\[url=(.*?)\](.*?)\[\/url\]/gi, "[$2]($1)").replace(/\[img\].*?\[\/img\]/gi, "").replace(/\[list\]/gi, "").replace(/\[\/list\]/gi, "").replace(/\[\*\](.*?)(?=\[\*\]|$)/gi, "- $1\n").replace(/\n{3,}/g, "\n\n").trim();
}
