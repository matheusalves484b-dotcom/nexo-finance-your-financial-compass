export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }

  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          full_name: string | null
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      accounts: {
        Row: {
          id: string
          user_id: string
          name: string
          account_type:
            | "checking"
            | "savings"
            | "cash"
            | "credit_card"
            | "investment"
            | "other"
          initial_balance: number
          opened_at: string
          closed_at: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          account_type?:
            | "checking"
            | "savings"
            | "cash"
            | "credit_card"
            | "investment"
            | "other"
          initial_balance?: number
          opened_at?: string
          closed_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          account_type?:
            | "checking"
            | "savings"
            | "cash"
            | "credit_card"
            | "investment"
            | "other"
          initial_balance?: number
          opened_at?: string
          closed_at?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          kind: "income" | "expense"
          color: string | null
          icon: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          kind: "income" | "expense"
          color?: string | null
          icon?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          kind?: "income" | "expense"
          color?: string | null
          icon?: string | null
          created_at?: string
        }
        Relationships: []
      }

      transactions: {
        Row: {
          id: string
          user_id: string
          account_id: string
          category_id: string | null
          description: string
          amount: number
          kind: "income" | "expense"
          status: "confirmed" | "scheduled" | "cancelled"
          transaction_date: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          account_id: string
          category_id?: string | null
          description: string
          amount: number
          kind: "income" | "expense"
          status?: "confirmed" | "scheduled" | "cancelled"
          transaction_date: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          account_id?: string
          category_id?: string | null
          description?: string
          amount?: number
          kind?: "income" | "expense"
          status?: "confirmed" | "scheduled" | "cancelled"
          transaction_date?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      budgets: {
        Row: {
          id: string
          user_id: string
          category_id: string | null
          month: string
          amount: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          category_id?: string | null
          month: string
          amount: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          category_id?: string | null
          month?: string
          amount?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      goals: {
        Row: {
          id: string
          user_id: string
          name: string
          target_amount: number
          current_amount: number
          target_date: string | null
          status: "active" | "completed" | "paused" | "cancelled"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          target_amount: number
          current_amount?: number
          target_date?: string | null
          status?: "active" | "completed" | "paused" | "cancelled"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          target_amount?: number
          current_amount?: number
          target_date?: string | null
          status?: "active" | "completed" | "paused" | "cancelled"
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      assets: {
        Row: {
          id: string
          user_id: string
          name: string
          asset_type:
            | "cash"
            | "account"
            | "investment"
            | "property"
            | "vehicle"
            | "other"
          valuation_method: "market" | "acquisition_cost" | "manual"
          current_value: number
          market_value_available: boolean
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          asset_type?:
            | "cash"
            | "account"
            | "investment"
            | "property"
            | "vehicle"
            | "other"
          valuation_method?: "market" | "acquisition_cost" | "manual"
          current_value?: number
          market_value_available?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          asset_type?:
            | "cash"
            | "account"
            | "investment"
            | "property"
            | "vehicle"
            | "other"
          valuation_method?: "market" | "acquisition_cost" | "manual"
          current_value?: number
          market_value_available?: boolean
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      debts: {
        Row: {
          id: string
          user_id: string
          name: string
          debt_type: "loan" | "credit_card" | "financing" | "other"
          principal: number
          outstanding_balance: number
          interest_amount: number
          fees_amount: number
          monthly_payment: number
          due_day: number | null
          status: "active" | "paid" | "paused"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          debt_type?: "loan" | "credit_card" | "financing" | "other"
          principal: number
          outstanding_balance: number
          interest_amount?: number
          fees_amount?: number
          monthly_payment?: number
          due_day?: number | null
          status?: "active" | "paid" | "paused"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          debt_type?: "loan" | "credit_card" | "financing" | "other"
          principal?: number
          outstanding_balance?: number
          interest_amount?: number
          fees_amount?: number
          monthly_payment?: number
          due_day?: number | null
          status?: "active" | "paid" | "paused"
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }

      checklists: {
        Row: { id:string; user_id:string; title:string; description:string|null; deadline:string|null; priority:"low"|"medium"|"high"; category:string|null; status:"pending"|"completed"|"cancelled"; recurrence:"none"|"daily"|"weekly"|"monthly"; created_at:string; updated_at:string },
        Insert: { id?:string; user_id:string; title:string; description?:string|null; deadline?:string|null; priority?:"low"|"medium"|"high"; category?:string|null; status?:"pending"|"completed"|"cancelled"; recurrence?:"none"|"daily"|"weekly"|"monthly"; created_at?:string; updated_at?:string },
        Update: { id?:string; user_id?:string; title?:string; description?:string|null; deadline?:string|null; priority?:"low"|"medium"|"high"; category?:string|null; status?:"pending"|"completed"|"cancelled"; recurrence?:"none"|"daily"|"weekly"|"monthly"; created_at?:string; updated_at?:string },
        Relationships: []
      }
      checklist_items: {
        Row: { id:string; checklist_id:string; user_id:string; title:string; description:string|null; deadline:string|null; priority:"low"|"medium"|"high"; status:"pending"|"completed"|"cancelled"; recurrence:"none"|"daily"|"weekly"|"monthly"; created_at:string; updated_at:string },
        Insert: { id?:string; checklist_id:string; user_id:string; title:string; description?:string|null; deadline?:string|null; priority?:"low"|"medium"|"high"; status?:"pending"|"completed"|"cancelled"; recurrence?:"none"|"daily"|"weekly"|"monthly"; created_at?:string; updated_at?:string },
        Update: { id?:string; checklist_id?:string; user_id?:string; title?:string; description?:string|null; deadline?:string|null; priority?:"low"|"medium"|"high"; status?:"pending"|"completed"|"cancelled"; recurrence?:"none"|"daily"|"weekly"|"monthly"; created_at?:string; updated_at?:string },
        Relationships: []
      }
      debt_payments: {
        Row: { id:string; user_id:string; debt_id:string; amount:number; payment_date:string; notes:string|null; created_at:string },
        Insert: { id?:string; user_id:string; debt_id:string; amount:number; payment_date?:string; notes?:string|null; created_at?:string },
        Update: { id?:string; user_id?:string; debt_id?:string; amount?:number; payment_date?:string; notes?:string|null; created_at?:string },
        Relationships: []
      }
      notifications: {
        Row: { id:string; user_id:string; title:string; body:string|null; kind:string; read_at:string|null; enabled:boolean; created_at:string },
        Insert: { id?:string; user_id:string; title:string; body?:string|null; kind?:string; read_at?:string|null; enabled?:boolean; created_at?:string },
        Update: { id?:string; user_id?:string; title?:string; body?:string|null; kind?:string; read_at?:string|null; enabled?:boolean; created_at?:string },
        Relationships: []
      }
      subscriptions: {
        Row: { id:string; user_id:string; plan:"free"|"complete"; status:"trialing"|"active"|"past_due"|"canceled"|"expired"; billing_cycle:"monthly"|"annual"|null; trial_ends_at:string|null; current_period_end:string|null; provider:string|null; provider_subscription_id:string|null; created_at:string; updated_at:string },
        Insert: { id?:string; user_id:string; plan?:"free"|"complete"; status?:"trialing"|"active"|"past_due"|"canceled"|"expired"; billing_cycle?:"monthly"|"annual"|null; trial_ends_at?:string|null; current_period_end?:string|null; provider?:string|null; provider_subscription_id?:string|null; created_at?:string; updated_at?:string },
        Update: { id?:string; user_id?:string; plan?:"free"|"complete"; status?:"trialing"|"active"|"past_due"|"canceled"|"expired"; billing_cycle?:"monthly"|"annual"|null; trial_ends_at?:string|null; current_period_end?:string|null; provider?:string|null; provider_subscription_id?:string|null; created_at?:string; updated_at?:string },
        Relationships: []
      }
      plans: {
        Row: { id:string; name:string; price_monthly:number|null; price_annual:number|null; features:any; active:boolean },
        Insert: { id:string; name:string; price_monthly?:number|null; price_annual?:number|null; features?:any; active?:boolean },
        Update: { id?:string; name?:string; price_monthly?:number|null; price_annual?:number|null; features?:any; active?:boolean },
        Relationships: []
      }
      payments: {
        Row: { id:string; user_id:string; subscription_id:string|null; amount:number; currency:string; status:"pending"|"paid"|"failed"|"refunded"; provider:string|null; provider_payment_id:string|null; paid_at:string|null; created_at:string },
        Insert: { id?:string; user_id:string; subscription_id?:string|null; amount:number; currency?:string; status?:"pending"|"paid"|"failed"|"refunded"; provider?:string|null; provider_payment_id?:string|null; paid_at?:string|null; created_at?:string },
        Update: { id?:string; user_id?:string; subscription_id?:string|null; amount?:number; currency?:string; status?:"pending"|"paid"|"failed"|"refunded"; provider?:string|null; provider_payment_id?:string|null; paid_at?:string|null; created_at?:string },
        Relationships: []
      }
      financial_snapshots: {
        Row: { id:string; user_id:string; snapshot_date:string; total_income:number; total_expenses:number; savings:number; assets:number; liabilities:number; net_worth:number; created_at:string },
        Insert: { id?:string; user_id:string; snapshot_date:string; total_income?:number; total_expenses?:number; savings?:number; assets?:number; liabilities?:number; net_worth?:number; created_at?:string },
        Update: { id?:string; user_id?:string; snapshot_date?:string; total_income?:number; total_expenses?:number; savings?:number; assets?:number; liabilities?:number; net_worth?:number; created_at?:string },
        Relationships: []
      }

      insights: {
        Row: {
          id: string
          user_id: string
          insight_type: string
          title: string
          body: string
          status: "active" | "dismissed"
          data_window_start: string | null
          data_window_end: string | null
          is_partial: boolean
          volatility_margin: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          insight_type: string
          title: string
          body: string
          status?: "active" | "dismissed"
          data_window_start?: string | null
          data_window_end?: string | null
          is_partial?: boolean
          volatility_margin?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          insight_type?: string
          title?: string
          body?: string
          status?: "active" | "dismissed"
          data_window_start?: string | null
          data_window_end?: string | null
          is_partial?: boolean
          volatility_margin?: number | null
          created_at?: string
        }
        Relationships: []
      }
    }

    Views: {
      [_ in never]: never
    }

    Functions: {
      [_ in never]: never
    }

    Enums: {
      [_ in never]: never
    }

    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals["public"]

export type Tables<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Row"]

export type TablesInsert<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Insert"]

export type TablesUpdate<
  T extends keyof DefaultSchema["Tables"]
> = DefaultSchema["Tables"][T]["Update"]

export type Enums<
  T extends keyof DefaultSchema["Enums"]
> = DefaultSchema["Enums"][T]

export type CompositeTypes<
  T extends keyof DefaultSchema["CompositeTypes"]
> = DefaultSchema["CompositeTypes"][T]

export const Constants = {
  public: {
    Enums: {},
  },
} as const
