export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            companies: {
                Row: {
                    id: string
                    name: string
                    ticker: string
                    sector: string | null
                    description: string | null
                    share_price: number | null
                    prev_share_price: number | null
                    total_shares: number | null
                    volatility: number | null
                    dividend_yield: number | null
                    price_history: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    name: string
                    ticker: string
                    sector?: string | null
                    description?: string | null
                    share_price?: number | null
                    prev_share_price?: number | null
                    total_shares?: number | null
                    volatility?: number | null
                    dividend_yield?: number | null
                    price_history?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    name?: string
                    ticker?: string
                    sector?: string | null
                    description?: string | null
                    share_price?: number | null
                    prev_share_price?: number | null
                    total_shares?: number | null
                    volatility?: number | null
                    dividend_yield?: number | null
                    price_history?: Json | null
                    created_at?: string
                }
            }
            profiles: {
                Row: {
                    id: string
                    username: string | null
                    title: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    username?: string | null
                    title?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    username?: string | null
                    title?: string | null
                    created_at?: string
                }
            }
            player_stats: {
                Row: {
                    user_id: string
                    cash: number
                    heat: number
                    ap: number
                    reputation: number
                    karma: number
                    insider_level: number
                    level: number
                    xp: number
                    created_at: string
                }
                Insert: {
                    user_id: string
                    cash?: number
                    heat?: number
                    ap?: number
                    reputation?: number
                    karma?: number
                    insider_level?: number
                    level?: number
                    xp?: number
                    created_at?: string
                }
                Update: {
                    user_id?: string
                    cash?: number
                    heat?: number
                    ap?: number
                    reputation?: number
                    karma?: number
                    insider_level?: number
                    level?: number
                    xp?: number
                    created_at?: string
                }
            }
            game_actions: {
                Row: {
                    id: string
                    type: string | null
                    label: string | null
                    description: string | null
                    requirements: Json | null
                    cooldown_days: number | null
                    base_success_rate: number | null
                    created_at: string
                }
                Insert: {
                    id: string
                    type?: string | null
                    label?: string | null
                    description?: string | null
                    requirements?: Json | null
                    cooldown_days?: number | null
                    base_success_rate?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    type?: string | null
                    label?: string | null
                    description?: string | null
                    requirements?: Json | null
                    cooldown_days?: number | null
                    base_success_rate?: number | null
                    created_at?: string
                }
            }
            assets: {
                Row: {
                    id: string
                    owner_id: string | null
                    type: string
                    name: string | null
                    acquired_at: string | null
                    base_value: number | null
                    current_value: number | null
                    company_id: string | null
                    shares: number | null
                    count: number | null
                    cost_basis_per_share: number | null
                    location: string | null
                    properties: Json | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    owner_id?: string | null
                    type: string
                    name?: string | null
                    acquired_at?: string | null
                    base_value?: number | null
                    current_value?: number | null
                    company_id?: string | null
                    shares?: number | null
                    count?: number | null
                    cost_basis_per_share?: number | null
                    location?: string | null
                    properties?: Json | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    owner_id?: string | null
                    type?: string
                    name?: string | null
                    acquired_at?: string | null
                    base_value?: number | null
                    current_value?: number | null
                    company_id?: string | null
                    shares?: number | null
                    count?: number | null
                    cost_basis_per_share?: number | null
                    location?: string | null
                    properties?: Json | null
                    created_at?: string
                }
            }
            loans: {
                Row: {
                    id: string
                    borrower_id: string | null
                    lender_name: string
                    principal: number
                    remaining_principal: number
                    interest_rate_daily: number
                    origination_date: string | null
                    term_days: number | null
                    collateral_asset_id: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    borrower_id?: string | null
                    lender_name: string
                    principal: number
                    remaining_principal: number
                    interest_rate_daily: number
                    origination_date?: string | null
                    term_days?: number | null
                    collateral_asset_id?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    borrower_id?: string | null
                    lender_name?: string
                    principal?: number
                    remaining_principal?: number
                    interest_rate_daily?: number
                    origination_date?: string | null
                    term_days?: number | null
                    collateral_asset_id?: string | null
                    created_at?: string
                }
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
