import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  LayoutDashboard,
  Menu,
  Plus,
  Target,
  WalletCards,
  X,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({ component: Index });

type Transaction = {
  id: string;
  description: string;
  amount: number;
  kind: "income" | "expense";
  status: "confirmed" | "scheduled" | "cancelled";
  transaction_date: string;
};

type Account = {
  id: string;
  name: string;
  initial_balance: number;
  account_type: string;
};

type Goal = {
  id: string;
  name: string;
  current_amount: number;
  target_amount: number;
  target_date: string | null;
};

type Profile = {
  full_name: string | null;
  currency: string;
};

type ChartPoint = { month: string; receitas: number; despesas: number };

const money = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 2,
  }).format(value);

const shortMoney = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);

function monthKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

function monthLabel(key: string) {
  const [year, month] = key.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", { month: "short" })
    .format(new Date(year, month - 1, 1))
    .replace(".", "");
}

function Index() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [userMissing, setUserMissing] = useState(false);
  const [error, setError] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    kind: "expense" as "income" | "expense",
    description: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10),
  });

  async function loadDashboard() {
    setLoading(true);
    setError("");
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData.user) {
      setUserMissing(true);
      setLoading(false);
      return;
    }

    setUserMissing(false);
    const userId = userData.user.id;

    const [profileRes, accountsRes, transactionsRes, goalsRes] = await Promise.all([
      supabase.from("profiles").select("full_name,currency").eq("id", userId).maybeSingle(),
      supabase
        .from("accounts")
        .select("id,name,initial_balance,account_type")
        .eq("user_id", userId)
        .eq("is_active", true),
      supabase
        .from("transactions")
        .select("id,description,amount,kind,status,transaction_date")
        .eq("user_id", userId)
        .order("transaction_date", { ascending: false })
        .limit(1000),
      supabase
        .from("goals")
        .select("id,name,current_amount,target_amount,target_date")
        .eq("user_id", userId)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(3),
    ]);

    const firstError = profileRes.error || accountsRes.error || transactionsRes.error || goalsRes.error;
    if (firstError) {
      setError("Não foi possível carregar seus dados financeiros.");
      setLoading(false);
      return;
    }

    setProfile(profileRes.data);
    setAccounts(accountsRes.data ?? []);
    setTransactions(transactionsRes.data ?? []);
    setGoals(goalsRes.data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    void loadDashboard();
  }, []);

  const confirmed = useMemo(
    () => transactions.filter((t) => t.status === "confirmed"),
    [transactions],
  );

  const income = useMemo(
    () => confirmed.filter((t) => t.kind === "income").reduce((sum, t) => sum + Number(t.amount), 0),
    [confirmed],
  );

  const expenses = useMemo(
    () => confirmed.filter((t) => t.kind === "expense").reduce((sum, t) => sum + Number(t.amount), 0),
    [confirmed],
  );

  const balance = useMemo(
    () => accounts.reduce((sum, account) => sum + Number(account.initial_balance), 0) + income - expenses,
    [accounts, income, expenses],
  );

  const savings = income - expenses;
  const savingsRate = income > 0 ? (savings / income) * 100 : null;

  const chartData = useMemo<ChartPoint[]>(() => {
    const now = new Date();
    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const key = monthKey(date);
      const rows = confirmed.filter((t) => t.transaction_date.slice(0, 7) === key);
      return {
        month: monthLabel(key),
        receitas: rows.filter((t) => t.kind === "income").reduce((s, t) => s + Number(t.amount), 0),
        despesas: rows.filter((t) => t.kind === "expense").reduce((s, t) => s + Number(t.amount), 0),
      };
    });
  }, [confirmed]);

  async function addTransaction(event: React.FormEvent) {
    event.preventDefault();
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user || accounts.length === 0 || !form.description || Number(form.amount) <= 0) return;

    setSaving(true);
    const { error: insertError } = await supabase.from("transactions").insert({
      user_id: userData.user.id,
      account_id: accounts[0].id,
      description: form.description.trim(),
      amount: Number(form.amount),
      kind: form.kind,
      status: "confirmed",
      transaction_date: form.date,
    });

    setSaving(false);
    if (insertError) {
      setError("Não foi possível salvar a movimentação.");
      return;
    }

    setForm({ kind: "expense", description: "", amount: "", date: new Date().toISOString().slice(0, 10) });
    setShowAdd(false);
    await loadDashboard();
  }

  if (loading) return <LoadingScreen />;

  if (userMissing) {
    return (
      <main className="nexo-empty-screen">
        <div className="nexo-empty-card">
          <div className="nexo-mark">N</div>
          <span className="eyebrow">NEXO FINANCE</span>
          <h1>Seu dinheiro precisa de direção.</h1>
          <p>Entre na sua conta para acessar seu planejamento financeiro.</p>
          <a href="/login" className="nexo-button gold">Entrar no NEXO</a>
        </div>
      </main>
    );
  }

  const firstName = profile?.full_name?.trim().split(/\s+/)[0] || "Olá";
  const hasData = accounts.length > 0 || confirmed.length > 0;

  return (
    <div className="nexo-app">
      <aside className={`nexo-sidebar ${mobileNav ? "open" : ""}`}>
        <div className="nexo-brand">
          <div className="nexo-logo">N</div>
          <div><strong>NEXO</strong><span>FINANCE</span></div>
        </div>
        <nav>
          <NavItem active href="/" icon={<LayoutDashboard size={18} />} label="Dashboard" />
          <NavItem href="/app-planejamento" icon={<BarChart3 size={18} />} label="Planejamento" />
          <NavItem href="/app-transacoes" icon={<WalletCards size={18} />} label="Transações" />
          <NavItem href="/app-checklists" icon={<CheckCircle2 size={18} />} label="Checklists" />
          <NavItem href="/app-metas" icon={<Target size={18} />} label="Metas" />
          <NavItem href="/app-dividas" icon={<CreditCard size={18} />} label="Dívidas" />
          <NavItem href="/app-patrimonio" icon={<CircleDollarSign size={18} />} label="Patrimônio" />\n              <NavItem href="/app-contas" icon={<WalletCards size={18} />} label="Contas" />
        </nav>
        <div className="sidebar-bottom">
          <div className="nexo-mini-note">
            <span>STATUS</span>
            <strong>Conta conectada</strong>
            <small>Seus dados são privados.</small>
          </div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-overlay" onClick={() => setMobileNav(false)} aria-label="Fechar menu" />}

      <main className="nexo-main">
        <header className="nexo-header">
          <button className="icon-button mobile-menu" onClick={() => setMobileNav(true)} aria-label="Abrir menu"><Menu size={20} /></button>
          <div>
            <span className="eyebrow">VISÃO GERAL</span>
            <h1>Olá, {firstName}.</h1>
            <p>Veja como está sua vida financeira.</p>
          </div>
          <button className="nexo-button gold header-action" onClick={() => setShowAdd(true)}>
            <Plus size={17} /> Adicionar
          </button>
        </header>

        {error && <div className="nexo-alert">{error}<button onClick={() => setError("")}><X size={15}/></button></div>}

        {!hasData ? (
          <section className="nexo-welcome">
            <div>
              <span className="eyebrow">PRIMEIRO PASSO</span>
              <h2>Comece pelo seu ponto de partida.</h2>
              <p>Cadastre uma conta para que o NEXO possa calcular seu saldo e transformar seus dados em planejamento.</p>
              <button className="nexo-button gold" onClick={() => setShowAdd(true)}>Adicionar movimentação</button>
            </div>
            <div className="welcome-orbit"><span>N</span></div>
          </section>
        ) : (
          <>
            <section className="metric-grid">
              <Metric label="Saldo disponível" value={money(balance)} icon={<WalletCards size={18}/>} />
              <Metric label="Receitas" value={money(income)} icon={<ArrowUpRight size={18}/>} positive />
              <Metric label="Despesas" value={money(expenses)} icon={<ArrowDownRight size={18}/>} />
              <Metric label="Taxa de economia" value={savingsRate === null ? "—" : `${savingsRate.toFixed(1)}%`} icon={<BarChart3 size={18}/>} positive={savingsRate !== null && savingsRate >= 0} />
            </section>

            <section className="dashboard-grid">
              <div className="nexo-card chart-card">
                <div className="card-heading">
                  <div><span className="eyebrow">ÚLTIMOS 6 MESES</span><h2>Fluxo financeiro</h2></div>
                  <span className="legend"><i className="gold-dot"/> Receitas <i className="white-dot"/> Despesas</span>
                </div>
                <div className="chart-wrap">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="goldArea" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#C9A227" stopOpacity={0.22}/>
                          <stop offset="100%" stopColor="#C9A227" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="#2A2A2A" vertical={false}/>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#777", fontSize: 11 }}/>
                      <YAxis hide />
                      <Tooltip
                        contentStyle={{ background: "#111111", border: "1px solid #292929", borderRadius: 10, color: "#fff" }}
                        formatter={(value) => money(Number(value))}
                      />
                      <Area type="monotone" dataKey="receitas" stroke="#C9A227" fill="url(#goldArea)" strokeWidth={2} />
                      <Area type="monotone" dataKey="despesas" stroke="#E7E7E7" fill="transparent" strokeWidth={1.5} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="nexo-card insight-card">
                <span className="eyebrow">INSIGHT DO NEXO</span>
                <div className="insight-symbol">✦</div>
                <h2>{confirmed.length >= 2
                  ? expenses > income
                    ? "Seus gastos estão acima das receitas."
                    : "Seu fluxo financeiro está positivo."
                  : "Continue registrando suas movimentações."}</h2>
                <p>{confirmed.length >= 2
                  ? expenses > income
                    ? "Revise seu orçamento para recuperar margem de economia."
                    : `Você tem ${savingsRate !== null ? savingsRate.toFixed(1) : "—"}% de taxa de economia no período registrado.`
                  : "Com mais dados, o NEXO poderá identificar padrões reais do seu comportamento financeiro."}</p>
              </div>
            </section>

            <section className="lower-grid">
              <div className="nexo-card">
                <div className="card-heading">
                  <div><span className="eyebrow">MOVIMENTAÇÕES</span><h2>Últimas transações</h2></div>
                  <button className="text-button">Ver todas <ChevronRight size={15}/></button>
                </div>
                <div className="transaction-list">
                  {transactions.slice(0, 5).map((t) => (
                    <div className="transaction-row" key={t.id}>
                      <div className={`transaction-icon ${t.kind}`}>{t.kind === "income" ? <ArrowUpRight size={16}/> : <ArrowDownRight size={16}/>}</div>
                      <div className="transaction-name"><strong>{t.description}</strong><span>{new Date(t.transaction_date + "T12:00:00").toLocaleDateString("pt-BR")}</span></div>
                      <strong className={t.kind === "income" ? "amount-positive" : "amount-negative"}>{t.kind === "income" ? "+" : "-"} {money(Number(t.amount))}</strong>
                    </div>
                  ))}
                  {transactions.length === 0 && <EmptyInline text="Você ainda não possui transações." />}
                </div>
              </div>

              <div className="nexo-card">
                <div className="card-heading">
                  <div><span className="eyebrow">OBJETIVOS</span><h2>Suas metas</h2></div>
                  <button className="text-button">Ver todas <ChevronRight size={15}/></button>
                </div>
                <div className="goal-list">
                  {goals.map((goal) => {
                    const progress = Math.min(100, Math.max(0, (Number(goal.current_amount) / Number(goal.target_amount)) * 100));
                    return (
                      <div className="goal-row" key={goal.id}>
                        <div className="goal-top"><strong>{goal.name}</strong><span>{progress.toFixed(0)}%</span></div>
                        <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }}/></div>
                        <div className="goal-values"><span>{money(Number(goal.current_amount))}</span><span>{money(Number(goal.target_amount))}</span></div>
                      </div>
                    );
                  })}
                  {goals.length === 0 && <EmptyInline text="Crie sua primeira meta para acompanhar sua evolução." />}
                </div>
              </div>
            </section>
          </>
        )}

        <footer className="nexo-disclaimer">
          NEXO Finance é uma plataforma de gestão financeira e organização pessoal. Não somos uma corretora, banco ou consultoria de investimentos. O conteúdo da plataforma é informativo e educacional.
        </footer>
      </main>

      <nav className="mobile-bottom-nav">
        <NavItem active href="/" icon={<LayoutDashboard size={18}/>} label="Início" compact />
        <NavItem href="/app-transacoes" icon={<WalletCards size={18}/>} label="Mov." compact />
        <button className="floating-add" onClick={() => setShowAdd(true)} aria-label="Adicionar"><Plus size={22}/></button>
        <NavItem href="/app-checklists" icon={<CheckCircle2 size={18}/>} label="Tarefas" compact />
        <NavItem href="/app-metas" icon={<Target size={18}/>} label="Metas" compact />
      </nav>

      {showAdd && (
        <div className="modal-backdrop">
          <form className="nexo-modal" onSubmit={addTransaction}>
            <div className="modal-header"><div><span className="eyebrow">NOVA MOVIMENTAÇÃO</span><h2>Registrar dinheiro</h2></div><button type="button" className="icon-button" onClick={() => setShowAdd(false)}><X size={19}/></button></div>
            {accounts.length === 0 ? (
              <div className="modal-empty"><WalletCards size={30}/><strong>Adicione uma conta primeiro.</strong><p>O NEXO precisa de uma conta para associar a movimentação.</p></div>
            ) : (
              <>
                <div className="segmented"><button type="button" className={form.kind === "expense" ? "selected" : ""} onClick={() => setForm({...form, kind: "expense"})}>Despesa</button><button type="button" className={form.kind === "income" ? "selected" : ""} onClick={() => setForm({...form, kind: "income"})}>Receita</button></div>
                <label>Descrição<input required value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} placeholder="Ex.: Mercado" /></label>
                <label>Valor<input required min="0.01" step="0.01" type="number" value={form.amount} onChange={(e) => setForm({...form, amount: e.target.value})} placeholder="0,00" /></label>
                <label>Data<input required type="date" value={form.date} onChange={(e) => setForm({...form, date: e.target.value})} /></label>
                <button className="nexo-button gold full" disabled={saving}>{saving ? "Salvando..." : "Salvar movimentação"}</button>
              </>
            )}
          </form>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, icon, positive }: { label: string; value: string; icon: React.ReactNode; positive?: boolean }) {
  return <div className="metric-card"><div className={`metric-icon ${positive ? "positive" : ""}`}>{icon}</div><span>{label}</span><strong>{value}</strong></div>;
}

function NavItem({ icon, label, href, active = false, compact = false }: { icon: React.ReactNode; label: string; href?: string; active?: boolean; compact?: boolean }) {
  const className = `nav-item ${active ? "active" : ""} ${compact ? "compact" : ""}`;
  return href ? <a href={href} className={className}>{icon}<span>{label}</span></a> : <button className={className}>{icon}<span>{label}</span></button>;
}

function EmptyInline({ text }: { text: string }) {
  return <div className="inline-empty"><span>{text}</span><ChevronRight size={15}/></div>;
}

function LoadingScreen() {
  return <main className="nexo-empty-screen"><div className="nexo-loader"><div className="nexo-mark">N</div><span>CARREGANDO SEU NEXO</span></div></main>;
}
