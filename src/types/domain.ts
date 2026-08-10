export type UpdateKind = "hotfix" | "standard" | "major";

export type Game = {
  id: string;
  title: string;
  steamAppId: number;
  coverImageUrl: string;
  accent: string;
  genre: string;
  status: "Live" | "Syncing";
};

export type Patch = {
  id: string;
  gameId: string;
  version: string;
  title: string;
  releaseDate: string;
  updateSizeMb: number;
  isHotfix: boolean;
  summary: string;
  tags: string[];
};

export type Optimization = {
  id: string;
  gameId: string;
  username: string;
  initials: string;
  gpuModel: string;
  resolution: string;
  targetFps: number;
  upvotes: number;
  settings: Record<string, string>;
  createdAt: string;
};

export type Profile = {
  username: string;
  defaultGpu: string;
  defaultCpu: string;
};
