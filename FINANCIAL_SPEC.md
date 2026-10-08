# Diretrizes de Cálculo e Invariantes - NEXO

Este documento define as regras de negócio para o motor financeiro da NEXO. 
**Regra de Ouro:** Insights e cálculos devem ser derivados estritamente de dados reais. Nunca inventar ou extrapolar dados sem base histórica explícita.

## 1. Transações
- **Cálculo de Saldo:** `Saldo = ∑(Entradas confirmadas) - ∑(Saídas confirmadas)`.
- **Invariante:** O valor de uma transação nunca pode ser nulo.
- **Invariante:** Transações futuras (agendadas) não impactam o saldo atual, apenas o saldo projetado.
- **Validação:** A data da transação deve estar contida no intervalo de existência da conta associada.

## 2. Orçamento
- **Cálculo de Disponível:** `Orçado - Gasto Realizado`.
- **Status de Categoria:** `(Gasto / Orçado) * 100`.
- **Invariante:** A soma dos orçamentos mensais não deve ultrapassar 100% da receita líquida prevista sem um alerta de déficit.
- **Não Invenção:** Não sugerir orçamentos baseados em "médias de mercado" sem antes ter 3 meses de histórico do usuário.

## 3. Metas
- **Progresso:** `(Valor Atual Acumulado / Valor Objetivo) * 100`.
- **Tempo Estimado:** `(Valor Objetivo - Valor Atual) / Média de Aporte Mensal (últimos 6 meses)`.
- **Invariante:** O valor atual de uma meta não pode ultrapassar o valor objetivo no cálculo de porcentagem (teto de 100%).

## 4. Dívidas
- **Custo Efetivo:** `Principal + Juros Acumulados + Taxas`.
- **DTI (Debt-to-Income):** `Soma das parcelas mensais / Renda bruta mensal`.
- **Invariante:** O valor amortizado não pode ser superior ao saldo devedor remanescente.

## 5. Patrimônio (Net Worth)
- **Cálculo:** `∑(Ativos: contas, investimentos, bens) - ∑(Passivos: dívidas, cartões)`.
- **Invariante:** Ativos devem ser avaliados pelo valor de mercado atual (se disponível via integração) ou custo de aquisição (se manual). Nunca misturar as bases sem flag de sinalização.

## 6. Insights e Inteligência
- **Tendência (MoM):** `((Mês Atual - Mês Anterior) / Mês Anterior) * 100`.
- **Regra de Insight:** Insights de "comportamento de gasto" exigem no mínimo 60 dias de dados contínuos.
- **Política de Dados:** Se um dado estiver ausente (ex: falta conexão bancária de uma conta), o insight deve ser omitido ou marcado como "Parcial", nunca preenchido com zeros ou médias sintéticas.
- **Veracidade:** Projeções devem sempre incluir a margem de erro baseada na volatilidade histórica do usuário.

---
*Documento gerado para a estrutura NEXO - Analista de Produto Financeiro.*
