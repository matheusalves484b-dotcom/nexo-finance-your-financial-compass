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
