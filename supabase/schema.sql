-- Run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

create table if not exists store_status (
  id int primary key default 1,
  is_open boolean default false,
  updated_at timestamptz default now()
);

insert into store_status (id, is_open)
values (1, false)
on conflict (id) do nothing;

create table if not exists push_subscriptions (
  id uuid default gen_random_uuid() primary key,
  endpoint text unique not null,
  p256dh text not null,
  auth text not null,
  created_at timestamptz default now()
);

-- RLS: store_status readable by anyone, writable only by server
alter table store_status enable row level security;
create policy "Anyone can read store_status"
  on store_status for select using (true);
create policy "Service role can update store_status"
  on store_status for all using (auth.role() = 'service_role');

-- RLS: push_subscriptions insertable by anyone, readable/deletable only by server
alter table push_subscriptions enable row level security;
create policy "Anyone can insert subscriptions"
  on push_subscriptions for insert with check (true);
create policy "Service role can manage subscriptions"
  on push_subscriptions for all using (auth.role() = 'service_role');
