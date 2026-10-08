-- NEXO Finance core schema
-- Safe bootstrap: creates only missing objects. No existing user data is deleted.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  currency text not null default 'BRL',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  account_type text not null default 'checking'
    check (account_type in ('checking','savings','cash','credit_card','investment','other')),
  initial_balance numeric(14,2) not null default 0,
  opened_at date not null default current_date,
  closed_at date,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (closed_at is null or closed_at >= opened_at)
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  kind text not null check (kind in ('income','expense')),
  color text,
  icon text,
  created_at timestamptz not null default now(),
  unique (user_id, name, kind)
);

create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid not null references public.accounts(id) on delete restrict,
  category_id uuid references public.categories(id) on delete set null,
  description text not null,
  amount numeric(14,2) not null check (amount <> 0),
  kind text not null check (kind in ('income','expense')),
  status text not null default 'confirmed' check (status in ('confirmed','scheduled','cancelled')),
  transaction_date date not null,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  month date not null,
  amount numeric(14,2) not null check (amount >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  target_amount numeric(14,2) not null check (target_amount > 0),
  current_amount numeric(14,2) not null default 0 check (current_amount >= 0),
  target_date date,
  status text not null default 'active' check (status in ('active','completed','paused','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.assets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  asset_type text not null default 'other'
    check (asset_type in ('cash','account','investment','property','vehicle','other')),
  valuation_method text not null default 'manual'
    check (valuation_method in ('market','acquisition_cost','manual')),
  current_value numeric(14,2) not null default 0 check (current_value >= 0),
  market_value_available boolean not null default false,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.debts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  debt_type text not null default 'other'
    check (debt_type in ('loan','credit_card','financing','other')),
  principal numeric(14,2) not null check (principal >= 0),
  outstanding_balance numeric(14,2) not null check (outstanding_balance >= 0),
  interest_amount numeric(14,2) not null default 0 check (interest_amount >= 0),
  fees_amount numeric(14,2) not null default 0 check (fees_amount >= 0),
  monthly_payment numeric(14,2) not null default 0 check (monthly_payment >= 0),
  due_day smallint check (due_day between 1 and 31),
  status text not null default 'active' check (status in ('active','paid','paused')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  insight_type text not null,
  title text not null,
  body text not null,
  status text not null default 'active' check (status in ('active','dismissed')),
  data_window_start date,
  data_window_end date,
  is_partial boolean not null default false,
  volatility_margin numeric(8,4),
  created_at timestamptz not null default now()
);

create index if not exists idx_accounts_user on public.accounts(user_id);
create index if not exists idx_categories_user on public.categories(user_id);
create index if not exists idx_transactions_user_date on public.transactions(user_id, transaction_date desc);
create index if not exists idx_transactions_account_date on public.transactions(account_id, transaction_date desc);
create index if not exists idx_budgets_user_month on public.budgets(user_id, month);
create index if not exists idx_goals_user_status on public.goals(user_id, status);
create index if not exists idx_assets_user on public.assets(user_id);
create index if not exists idx_debts_user_status on public.debts(user_id, status);
create index if not exists idx_insights_user_status on public.insights(user_id, status);

create or replace function public.validate_transaction_account_dates()
returns trigger
language plpgsql
as $$
declare
  account_opened date;
  account_closed date;
  account_user uuid;
begin
  select opened_at, closed_at, user_id
    into account_opened, account_closed, account_user
  from public.accounts
  where id = new.account_id;

  if account_user is null or account_user <> new.user_id then
    raise exception 'Transaction account does not belong to the transaction user';
  end if;

  if new.transaction_date < account_opened
     or (account_closed is not null and new.transaction_date > account_closed) then
    raise exception 'Transaction date is outside account lifetime';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_validate_transaction_account_dates on public.transactions;
create trigger trg_validate_transaction_account_dates
before insert or update on public.transactions
for each row execute function public.validate_transaction_account_dates();

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at before update on public.profiles for each row execute function public.set_updated_at();
drop trigger if exists trg_accounts_updated_at on public.accounts;
create trigger trg_accounts_updated_at before update on public.accounts for each row execute function public.set_updated_at();
drop trigger if exists trg_categories_updated_at on public.categories;
create trigger trg_categories_updated_at before update on public.categories for each row execute function public.set_updated_at();
drop trigger if exists trg_transactions_updated_at on public.transactions;
create trigger trg_transactions_updated_at before update on public.transactions for each row execute function public.set_updated_at();
drop trigger if exists trg_budgets_updated_at on public.budgets;
create trigger trg_budgets_updated_at before update on public.budgets for each row execute function public.set_updated_at();
drop trigger if exists trg_goals_updated_at on public.goals;
create trigger trg_goals_updated_at before update on public.goals for each row execute function public.set_updated_at();
drop trigger if exists trg_assets_updated_at on public.assets;
create trigger trg_assets_updated_at before update on public.assets for each row execute function public.set_updated_at();
drop trigger if exists trg_debts_updated_at on public.debts;
create trigger trg_debts_updated_at before update on public.debts for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;
alter table public.budgets enable row level security;
alter table public.goals enable row level security;
alter table public.assets enable row level security;
alter table public.debts enable row level security;
alter table public.insights enable row level security;

drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists accounts_all_own on public.accounts;
create policy accounts_all_own on public.accounts for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists categories_all_own on public.categories;
create policy categories_all_own on public.categories for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists transactions_all_own on public.transactions;
create policy transactions_all_own on public.transactions for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists budgets_all_own on public.budgets;
create policy budgets_all_own on public.budgets for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists goals_all_own on public.goals;
create policy goals_all_own on public.goals for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists assets_all_own on public.assets;
create policy assets_all_own on public.assets for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists debts_all_own on public.debts;
create policy debts_all_own on public.debts for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
drop policy if exists insights_all_own on public.insights;
create policy insights_all_own on public.insights for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.accounts, public.categories, public.transactions, public.budgets, public.goals, public.assets, public.debts, public.insights to authenticated;
