create table if not exists public.quote_requests (
  id uuid primary key,
  name text not null,
  phone text not null,
  vehicle text not null,
  category text not null,
  details text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

alter table public.quote_requests enable row level security;

create table if not exists public.site_content (
  id text primary key,
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_content enable row level security;
