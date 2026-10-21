create table if not exists user_progress (
  user_id text primary key,
  stats_json text not null default '{}',
  srs_json text not null default '{}',
  updated_at timestamptz not null default now()
);
