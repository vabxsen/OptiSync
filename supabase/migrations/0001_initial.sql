CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  default_gpu TEXT,
  default_cpu TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE games (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  steam_app_id INT UNIQUE,
  cover_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE patches (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  version_string TEXT,
  release_date DATE NOT NULL,
  update_size_mb DECIMAL(10, 2),
  is_hotfix BOOLEAN DEFAULT false,
  patch_notes_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE optimizations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  gpu_model TEXT NOT NULL,
  resolution TEXT NOT NULL,
  target_fps INT,
  settings JSONB NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE tracked_games (
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  game_id UUID REFERENCES games(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (user_id, game_id)
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE patches ENABLE ROW LEVEL SECURITY;
ALTER TABLE optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracked_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are publicly readable" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users manage their own profile" ON profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Games are publicly readable" ON games FOR SELECT USING (true);
CREATE POLICY "Patches are publicly readable" ON patches FOR SELECT USING (true);
CREATE POLICY "Optimizations are publicly readable" ON optimizations FOR SELECT USING (true);
CREATE POLICY "Users create their own optimizations" ON optimizations FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users manage their own optimizations" ON optimizations FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own optimizations" ON optimizations FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Users read their tracked games" ON tracked_games FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users manage their tracked games" ON tracked_games FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX patches_game_release_idx ON patches(game_id, release_date DESC);
CREATE INDEX optimizations_game_upvotes_idx ON optimizations(game_id, upvotes DESC);
