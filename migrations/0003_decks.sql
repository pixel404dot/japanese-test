alter table user_progress
  add column if not exists decks_json text not null default '{}';
