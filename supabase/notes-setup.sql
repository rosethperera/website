-- Run this once in the Supabase dashboard's SQL Editor for the new,
-- dedicated portfolio-site Supabase project. Creates the public per-project
-- notepad's notes table and locks it down with Row Level Security:
-- anyone can post and read notes, nobody can update or delete from the
-- client — deletion only happens through the password-gated admin flow
-- in the app itself (client-side check against VITE_ADMIN_PASSWORD, then
-- a normal authenticated delete call — see src/windows/NotepadWindow.jsx).

create table if not exists notes (
  id uuid primary key default gen_random_uuid(),
  project_slug text not null,
  text text not null,
  created_at timestamptz not null default now()
);

create index if not exists notes_project_slug_idx on notes (project_slug, created_at desc);

alter table notes enable row level security;

-- Anyone can read all notes.
create policy "public read" on notes
  for select
  using (true);

-- Anyone can post a note (no accounts, no personal info required).
create policy "public insert" on notes
  for insert
  with check (true);

-- No public update policy: updates are blocked by default with RLS on.
-- No public delete policy: deletes are blocked by default with RLS on.
-- The app's delete button uses the anon key too, which means as configured
-- here, delete calls from the client will fail RLS and be rejected by
-- Supabase itself — the app-level password prompt is a UX gate on TOP of
-- this, not a replacement for it. If you want deletes to actually work from
-- the client (matching the "client-side env var" tradeoff you picked over
-- the Edge Function approach), add this policy too:
--
-- create policy "anon delete" on notes
--   for delete
--   using (true);
--
-- That reopens delete to anyone who calls the API directly (bypassing the
-- password prompt entirely, since the prompt only exists in the app's UI,
-- not the database). Given this is a low-stakes portfolio feature, that's
-- probably an acceptable tradeoff, but it's worth being clear-eyed about:
-- the real access control here is "nobody else knows to try," not a hard
-- boundary. Add the policy above when you're ready to enable deletes.
