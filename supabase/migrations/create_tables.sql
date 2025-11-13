
-- Create users_plans table
create table public.user_plans (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  plan_type text not null check (plan_type in ('starter', 'professional', 'enterprise')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create usage_history table
create table public.usage_history (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  action text not null,
  details jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.user_plans enable row level security;
alter table public.usage_history enable row level security;

-- Create policies
create policy "Users can view their own plan"
  on public.user_plans for select
  using (auth.uid() = user_id);

create policy "Users can insert their own plan"
  on public.user_plans for insert
  with check (auth.uid() = user_id);

create policy "Users can view their own history"
  on public.usage_history for select
  using (auth.uid() = user_id);

create policy "Users can insert their own history"
  on public.usage_history for insert
  with check (auth.uid() = user_id);
