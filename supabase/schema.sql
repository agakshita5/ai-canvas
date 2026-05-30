create extension if not exists vector;
create extension if not exists pgcrypto;

create table if not exists users (
  id text primary key,
  email text unique,
  created_at timestamptz not null default now()
);

create table if not exists generations (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references users(id) on delete cascade,

  prompt text not null,

  image_url text not null,
  sb_public_id text,

  aspect_ratio text,
  created_at timestamptz not null default now()
);

create index if not exists generations_user_id_idx
  on generations(user_id);

create index if not exists generations_created_at_idx
  on generations(created_at desc);