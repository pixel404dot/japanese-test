create table if not exists practice_sessions (
  id         serial primary key,
  user_id    text not null,
  script     text not null,
  lines      text not null,
  mode       text not null,
  score      integer not null,
  total      integer not null,
  created_at timestamptz not null default now()
);
create index if not exists practice_sessions_user_id_idx on practice_sessions (user_id);

create table if not exists kana_stats (
  user_id    text not null,
  kana       text not null,
  script     text not null,
  correct    integer not null default 0,
  attempts   integer not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, kana, script)
);
