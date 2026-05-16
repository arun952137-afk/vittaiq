import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

const PREDICTIONS = [
  {
    symbol: 'NIFTY50', name: 'Nifty 50',
    current: 22456.80, 
    pred_1d: { price: 22640, change: 0.82, confidence: 71, signal: 'BUY' },
    pred_7d: { price: 23100, change: 2.87, confidence: 63, signal: 'BUY' },
    pred_30d: { price: 23850, change: 6.21, confidence: 54, signal: 'BUY' },
    support: [22100, 21750, 21200],
    resistance: [22600, 23000, 23500],
    pattern: 'Ascending Triangle', rsi: 58, macd: 'Bullish Cross',
    botSignal: 'MOMENTUM_BOT: LONG signal triggered at 22,380. Target: 22,750. Stop: 22,050',
    category: 'index'
  },
  {
    symbol: 'BTC/USD', name: 'Bitcoin',
    current: 67234,
    pred_1d: { price: 69200, change: 2.92, confidence: 68, signal: 'BUY' },
    pred_7d: { price: 72000, change: 7.09, confidence: 59, signal: 'BUY' },
    pred_30d: { price: 78000, change: 16.01, confidence: 48, signal: 'BUY' },
    support: [65000, 62000, 58000],
    resistance: [68500, 72000, 75000],
    pattern: 'Bull Flag + ETF Flow', rsi: 62, macd: 'Bullish',
    botSignal: 'WHALE_TRACKER_BOT: Exchange outflows +42% WoW. ACCUMULATION phase detected.',
    category: 'crypto'
  },
  {
    symbol: 'RELIANCE', name: 'Reliance Ind.',
    current: 2847.35,
    pred_1d: { price: 2880, change: 1.15, confidence: 66, signal: 'BUY' },
    pred_7d: { price: 2980, change: 4.66, confidence: 61, signal: 'BUY' },
    pred_30d: { price: 3150, change: 10.63, confidence: 52, signal: 'STRONG BUY' },
    support: [2750, 2680, 2580],
    resistance: [2900, 3050, 3200],
    pattern: 'Bullish Flag', rsi: 55, macd: 'Bullish Cross',
    botSignal: 'FUNDAMENTAL_BOT: Q4 beat + JIO growth. Institutional accumulation detected.',
    category: 'stock'
  },
  {
    symbol: 'NVDA', name: 'NVIDIA Corp.',
    current: 875.30,
    pred_1d: { price: 912, change: 4.19, confidence: 74, signal: 'STRONG BUY' },
    pred_7d: { price: 960, change: 9.68, confidence: 65, signal: 'STRONG BUY' },
    pred_30d: { price: 1050, change: 19.96, confidence: 55, signal: 'BUY' },
    support: [840, 800, 760],
    resistance: [900, 950, 1000],
    pattern: 'Breakout + AI Catalyst', rsi: 67, macd: 'Strongly Bullish',
    botSignal: 'MOMENTUM_BOT + CATALYST_BOT: Blackwell orders > $15B. Momentum score: 9.2/10',
    category: 'stock'
  },
  {
    symbol: 'GOLD', name: 'Gold Spot',
    current: 2341.20,
    pred_1d: { price: 2360, change: 0.81, confidence: 62, signal: 'BUY' },
    pred_7d: { price: 2420, change: 3.37, confidence: 57, signal: 'BUY' },
    pred_30d: { price: 2500, change: 6.78, confidence: 50, signal: 'BUY' },
    support: [2280, 2240, 2200],
    resistance: [2380, 2430, 2500],
    pattern: 'ATH Breakout + CB Buying', rsi: 61, macd: 'Bullish',
    botSignal: 'MACRO_BOT: Central bank buying at record pace. Safe haven demand rising.',
    category: 'commodity'
  },
  {
    symbol: 'ETH/USD', name: 'Ethereum',
    current: 3812.50,
    pred_1d: { price: 3920, change: 2.83, confidence: 65, signal: 'BUY' },
    pred_7d: { price: 4200, change: 10.17, confidence: 58, signal: 'BUY' },
    pred_30d: { price: 4800, change: 25.90, confidence: 47, signal: 'BUY' },
    support: [3600, 3300, 3000],
    resistance: [4000, 4400, 5000],
    pattern: 'ETF Approval Play', rsi: 59, macd: 'Neutral-Bullish',
    botSignal: 'ONCHAIN_BOT: ETF odds 70%. Staking ratio at ATH. Supply squeeze forming.',
    category: 'crypto'
  },
]

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get('category')
  const symbol = searchParams.get('symbol')

  let predictions = [...PREDICTIONS]
  if (category) predictions = predictions.filter(p => p.category === category)
  if (symbol) predictions = predictions.filter(p => p.symbol === symbol)

  return NextResponse.json({
    predictions,
    generated: new Date().toISOString(),
    modelVersion: 'VittaIQ-Quant-v2.1',
    disclaimer: 'AI predictions are for educational purposes only. Not financial advice.',
  })
}
