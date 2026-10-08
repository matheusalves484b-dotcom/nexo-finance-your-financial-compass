-- NEXO Finance extended core schema
-- Run this migration in Supabase SQL Editor if the connected DB has not received it yet.

create table if not exists public.checklists (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 title text not null, description text, deadline date, priority text not null default 'medium' check(priority in ('low','medium','high')),
 category text, status text not null default 'pending' check(status in ('pending','completed','cancelled')),
 recurrence text not null default 'none' check(recurrence in ('none','daily','weekly','monthly')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.checklist_items (
 id uuid primary key default gen_random_uuid(), checklist_id uuid not null references public.checklists(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade, title text not null, description text, deadline date,
 priority text not null default 'medium' check(priority in ('low','medium','high')),
 status text not null default 'pending' check(status in ('pending','completed','cancelled')),
 recurrence text not null default 'none' check(recurrence in ('none','daily','weekly','monthly')),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.debt_payments (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 debt_id uuid not null references public.debts(id) on delete cascade, amount numeric(14,2) not null check(amount>0),
 payment_date date not null default current_date, notes text, created_at timestamptz not null default now()
);
create table if not exists public.notifications (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 title text not null, body text, kind text not null default 'general', read_at timestamptz, enabled boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.subscriptions (
 id uuid primary key default gen_random_uuid(), user_id uuid not null unique references auth.users(id) on delete cascade,
 plan text not null default 'free' check(plan in ('free','complete')), status text not null default 'active' check(status in ('trialing','active','past_due','canceled','expired')),
 billing_cycle text check(billing_cycle in ('monthly','annual')), trial_ends_at timestamptz, current_period_end timestamptz,
 provider text, provider_subscription_id text, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists public.plans (
 id text primary key, name text not null, price_monthly numeric(14,2), price_annual numeric(14,2), features jsonb not null default '[]'::jsonb, active boolean not null default true
);
create table if not exists public.payments (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 subscription_id uuid references public.subscriptions(id) on delete set null, amount numeric(14,2) not null check(amount>=0),
 currency text not null default 'BRL', status text not null default 'pending' check(status in ('pending','paid','failed','refunded')),
 provider text, provider_payment_id text, paid_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.financial_snapshots (
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
 snapshot_date date not null, total_income numeric(14,2) not null default 0, total_expenses numeric(14,2) not null default 0,
 savings numeric(14,2) not null default 0, assets numeric(14,2) not null default 0, liabilities numeric(14,2) not null default 0,
 net_worth numeric(14,2) not null default 0, created_at timestamptz not null default now(), unique(user_id,snapshot_date)
);
insert into public.plans(id,name,price_monthly,price_annual,features) values
('free','Free',0,0,'["Dashboard básico","Receitas e despesas","Planejamento mensal","1 meta","Checklist básico","Resumo mensal"]'),
('complete','Complete',29.90,299,'["Tudo do Free","Metas ilimitadas","Checklists ilimitados","Dívidas","Patrimônio","Relatórios avançados","Insights","Simulador What if?","Categorias personalizadas","Exportação"]')
on conflict(id) do update set name=excluded.name,price_monthly=excluded.price_monthly,price_annual=excluded.price_annual,features=excluded.features;
alter table public.checklists enable row level security;
alter table public.checklist_items enable row level security;
alter table public.debt_payments enable row level security;
alter table public.notifications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.plans enable row level security;
alter table public.payments enable row level security;
alter table public.financial_snapshots enable row level security;
do $$ begin create policy "nexo_checklists_own" on public.checklists for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_checklist_items_own" on public.checklist_items for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_debt_payments_own" on public.debt_payments for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_notifications_own" on public.notifications for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_subscriptions_own" on public.subscriptions for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_plans_read" on public.plans for select to authenticated using(active=true); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_payments_own" on public.payments for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
do $$ begin create policy "nexo_snapshots_own" on public.financial_snapshots for all to authenticated using((select auth.uid())=user_id) with check((select auth.uid())=user_id); exception when duplicate_object then null; end $$;
grant select on public.plans to authenticated;
grant select,insert,update,delete on public.checklists,public.checklist_items,public.debt_payments,public.notifications,public.subscriptions,public.payments,public.financial_snapshots to authenticated;
