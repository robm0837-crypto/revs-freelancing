-- Run this once in Supabase: SQL Editor -> New query -> paste -> Run.
-- Creates a "profiles" table that holds each person's role (user or admin).

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- People can read only their own profile. There are no insert/update/delete
-- policies, so nobody can promote themselves. Roles are changed only here in
-- the Supabase dashboard (or with the service role).
drop policy if exists "Users can read their own profile" on public.profiles;
create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

-- Every new login (including invites) automatically gets a "user" profile.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Create profiles for anyone who already exists (like your test invite).
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- Make yourself the administrator.
update public.profiles
set role = 'admin'
where email = 'robm0837@gmail.com';
