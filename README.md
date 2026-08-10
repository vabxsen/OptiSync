# OptiSync

OptiSync is a dark-mode PC game patch intelligence and performance blueprint hub built with Next.js App Router, Supabase, Tailwind CSS, and Framer Motion.

## Local setup

1. Copy `.env.example` to `.env.local`.
2. Add the Supabase project URL and anon key. Add a Steam Web API key for live news sync.
3. Run `supabase/migrations/0001_initial.sql` in the Supabase SQL editor.
4. Enable GitHub in Supabase Authentication providers and set the callback URL to `http://localhost:3000/auth/callback`.
5. Start the app with `npm run dev`.

The interface includes curated preview data when Supabase is not configured. Live authentication, persistence, and Steam synchronization activate once the environment variables are present.

## Commands

- `npm run dev` starts the development server.
- `npm run lint` runs ESLint.
- `npx tsc --noEmit` checks strict TypeScript.
- `npm run build` creates the production build.
