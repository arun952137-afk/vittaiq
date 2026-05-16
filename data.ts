import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

// Generate deterministic but realistic-looking signals
function generateSignal(sym: string, seed: number) {
  const signals = ['STRONG BUY', 'BUY', 'NEUTRAL', 'SELL', 'STRONG SELL']
  const colors = ['#00D964', '#48BB78', '#F6AD55', '#FC8181', '#F56565']
  const idx = Math.abs(seed) % 5
  const confidence = 55 + Math.abs(seed * 7) % 35
  
  const entries: Record<string, { entry: number; t1: number; t2: number; stop: number }> = {
    'NIFTY50': { entry: 22350, t1: 22700, t2: 23100, stop: 22050 },
    'BTC/USD': { entry: 65800, t1: 69000, t2: 73000, stop: 62000 },
    'RELIANCE': { entry: 2820, t1: 2980, t2: 3150, stop: 2700 },
    'AAPL': { entry: 186, t1: 198, t2: 212, stop: 178 },
    'NVDA': { entry: 850, t1: 950, t2: 1050, stop: 790 },
    'ETH/USD': { entry: 3600, t1: 4100, t2: 4700, stop: 3200 },
    'GOLD': { entry: 2310, t1: 2380, t2: 2450, stop: 2260 },
    'TCS': { entry: 3870, t1: 4050, t2: 4250, stop: 3720 },
    'SENSEX': { entry: 73200, t1: 75000, t2: 77000, stop: 71500 },
  }

  const levels = entries[sym] || { entry: 100, t1: 108, t2: 115, stop: 94 }
  const rr = ((levels.t1 - levels.entry) / (levels.entry - levels.stop)).toFixed(1)

  return {
    symbol: sym,
    signal: signals[idx],
    color: colors[idx],
    confidence,
    entry: levels.entry,
    target1: levels.t1,
    target2: levels.t2,
    stopLoss: levels.stop,
    riskReward: rr,
    timeframe: ['1D', '4H', '1W'][Math.abs(seed) % 3],
    pattern: ['Bull Flag', 'Cup & Handle', 'Ascending Triangle', 'Double Bottom', 'Breakout'][Math.abs(seed * 3) % 5],
    generated: new Date().toISOString(),
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const symbols = searchParams.get('symbols')?.split(',') || [
    'NIFTY50', 'SENSEX', 'BTC/USD', 'ETH/USD', 'RELIANCE', 'TCS', 'AAPL', 'NVDA', 'GOLD'
  ]

  const now = Date.now()
  const signals = symbols.map((sym, i) => generateSignal(sym, (now / 1000 / 3600 | 0) + i * 13))

  return NextResponse.json({
    signals,
    updated: new Date().toISOString(),
    nextUpdate: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
  })
}
