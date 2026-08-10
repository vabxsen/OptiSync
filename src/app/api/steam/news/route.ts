import { NextResponse } from "next/server";
import { fetchSteamNews, steamContentsToMarkdown } from "@/lib/steam/fetcher";

export async function GET(request: Request) {
  const appId = Number(new URL(request.url).searchParams.get("appId"));
  if (!Number.isInteger(appId) || appId <= 0) return NextResponse.json({ error: "A valid appId is required." }, { status: 400 });
  try { const news = await fetchSteamNews(appId); return NextResponse.json({ news: news.map((item) => ({ ...item, markdown: steamContentsToMarkdown(item.contents) })) }); } catch (error) { return NextResponse.json({ error: error instanceof Error ? error.message : "Unable to fetch Steam news." }, { status: 502 }); }
}
