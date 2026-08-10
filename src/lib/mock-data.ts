import type { Game, Optimization, Patch, Profile } from "@/types/domain";

export const profile: Profile = {
  username: "Alex Mercer",
  defaultGpu: "RTX 4070",
  defaultCpu: "Ryzen 7 7800X3D",
};

export const games: Game[] = [
  { id: "cyberpunk", title: "Cyberpunk 2077", steamAppId: 1091500, coverImageUrl: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?auto=format&fit=crop&w=1000&q=85", accent: "#e27b46", genre: "Action RPG", status: "Live" },
  { id: "elden-ring", title: "Elden Ring", steamAppId: 1245620, coverImageUrl: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1000&q=85", accent: "#d0a14e", genre: "Action RPG", status: "Live" },
  { id: "stalker", title: "S.T.A.L.K.E.R. 2", steamAppId: 1643320, coverImageUrl: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1000&q=85", accent: "#78916c", genre: "Survival", status: "Syncing" },
  { id: "helldivers", title: "HELLDIVERS 2", steamAppId: 553850, coverImageUrl: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1000&q=85", accent: "#a9b6c8", genre: "Co-op Shooter", status: "Live" },
];

export const patches: Patch[] = [
  { id: "p1", gameId: "cyberpunk", version: "2.21", title: "Patch 2.21", releaseDate: "2026-08-10T08:30:00Z", updateSizeMb: 820, isHotfix: false, summary: "Photo Mode improvements, vehicle handling fixes, and stability updates across Night City.", tags: ["Performance", "Bug fixes"] },
  { id: "p2", gameId: "elden-ring", version: "1.16.1", title: "Regulation Update 1.16.1", releaseDate: "2026-08-09T14:10:00Z", updateSizeMb: 46, isHotfix: true, summary: "A targeted hotfix addressing co-op connection stability and several combat regressions.", tags: ["Hotfix", "Network"] },
  { id: "p3", gameId: "stalker", version: "1.7", title: "Title Update 1.7", releaseDate: "2026-08-08T11:20:00Z", updateSizeMb: 6840, isHotfix: false, summary: "Major AI overhaul, new A-Life behaviors, and extensive shader compilation improvements.", tags: ["Major patch", "A-Life"] },
  { id: "p4", gameId: "helldivers", version: "01.004.002", title: "Game Update 01.004.002", releaseDate: "2026-08-07T18:45:00Z", updateSizeMb: 2140, isHotfix: false, summary: "Weapon balance pass and fixes for extraction rewards not displaying correctly.", tags: ["Balance", "Gameplay"] },
  { id: "p5", gameId: "cyberpunk", version: "2.20b", title: "Backend Hotfix", releaseDate: "2026-08-05T09:00:00Z", updateSizeMb: 72, isHotfix: true, summary: "Quiet backend hotfix for cloud save synchronization and quest tracking.", tags: ["Hotfix"] },
];

export const optimizations: Optimization[] = [
  { id: "o1", gameId: "cyberpunk", username: "FrameWarden", initials: "FW", gpuModel: "RTX 4070", resolution: "1440p", targetFps: 90, upvotes: 248, settings: { "Preset": "Custom", "Ray Tracing": "Medium", "DLSS": "Quality", "NVIDIA Reflex": "On + Boost", "Crowd Density": "High" }, createdAt: "2026-08-09" },
  { id: "o2", gameId: "cyberpunk", username: "pixelpilot", initials: "PP", gpuModel: "RX 7900 XTX", resolution: "1440p", targetFps: 120, upvotes: 184, settings: { "Preset": "Ultra", "Ray Tracing": "Off", "FSR 3": "Quality", "Frame Generation": "On", "Crowd Density": "Medium" }, createdAt: "2026-08-07" },
  { id: "o3", gameId: "cyberpunk", username: "Rook.exe", initials: "RX", gpuModel: "RTX 3060 Ti", resolution: "1080p", targetFps: 75, upvotes: 96, settings: { "Preset": "High", "Ray Tracing": "Off", "DLSS": "Balanced", "Textures": "High", "Volumetric Fog": "Medium" }, createdAt: "2026-08-04" },
];

export function getGame(id: string) { return games.find((game) => game.id === id); }
export function getGamePatches(id: string) { return patches.filter((patch) => patch.gameId === id); }
export function getGameOptimizations(id: string) { return optimizations.filter((optimization) => optimization.gameId === id); }
