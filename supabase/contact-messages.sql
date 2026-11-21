-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Creates the inbox table for contact-form messages.

-- Helper: true only for people marked "admin" in the profiles table.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin'
  );
$$;

revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (
    char_length(email) <= 254
    and email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'
  ),
  message text not null check (char_length(message) between 10 and 5000)
);

alter table public.contact_messages enable row level security;

grant insert on public.contact_messages to anon, authenticated;
grant select on public.contact_messages to authenticated;

-- Visitors can send a message, but cannot read any.
drop policy if exists "Anyone can send a message" on public.contact_messages;
create policy "Anyone can send a message"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

-- Only admins can read the inbox.
drop policy if exists "Admins can read messages" on public.contact_messages;
create policy "Admins can read messages"
  on public.contact_messages
  for select
  to authenticated
  using (public.is_admin());
