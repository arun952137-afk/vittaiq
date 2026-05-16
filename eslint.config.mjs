export interface Profile {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
  investor_level: 'beginner' | 'intermediate' | 'pro'
  risk_profile: 'conservative' | 'balanced' | 'aggressive'
  plan: 'free' | 'pro' | 'elite'
  onboarding_completed: boolean
  created_at: string
}

export interface MarketTicker {
  symbol: string
  price: number
  change: number
  volume: string
  exchange?: string
  sector?: string
}

export interface NewsItem {
  id: string
  headline: string
  summary: string
  category: string
  sentiment: 'bullish' | 'bearish' | 'neutral'
  impact: 'HIGH' | 'MEDIUM' | 'LOW'
  ai_summary: string | null
  published_at: string
}

export interface SentimentData {
  id: string
  sentiment_type: string
  value: number
  label: string
}

export interface PortfolioAsset {
  id: string
  symbol: string
  name: string | null
  asset_type: string
  quantity: number
  avg_buy_price: number
  current_price: number
  allocation_pct: number
  gain_pct: number
  color: string
}

export interface Alert {
  id: string
  symbol: string
  alert_type: string
  target_value: number | null
  message: string | null
  is_active: boolean
  created_at: string
}

export interface Watchlist {
  id: string
  name: string
  symbols: string[]
}
