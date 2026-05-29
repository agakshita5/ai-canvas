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
  prompt_embedding vector(768),

  image_url text not null,
  cloudinary_public_id text,

  aspect_ratio text,
  created_at timestamptz not null default now()
);

create index if not exists generations_user_id_idx
  on generations(user_id);

create index if not exists generations_created_at_idx
  on generations(created_at desc);

create index if not exists generations_prompt_embedding_idx
  on generations
  using ivfflat (prompt_embedding vector_cosine_ops)
  with (lists = 100);

create or replace function match_similar_generations (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  user_id text,
  prompt text,
  image_url text,
  cloudinary_public_id text,
  aspect_ratio text,
  similarity float,
  created_at timestamptz
)
language sql
stable
as $$
  select
    g.id,
    g.user_id,
    g.prompt,
    g.image_url,
    g.cloudinary_public_id,
    g.aspect_ratio,
    1 - (g.prompt_embedding <=> query_embedding) as similarity,
    g.created_at
  from generations g
  where g.prompt_embedding is not null
    and 1 - (g.prompt_embedding <=> query_embedding) > match_threshold
  order by g.prompt_embedding <=> query_embedding
  limit match_count;
$$;