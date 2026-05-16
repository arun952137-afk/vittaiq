'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const BOTS = [
  {
    id: 'MOMENTUM_BOT',
    name: 'Momentum Scout',
    icon: '⚡',
    color: '#F59E0B',
    status: 'ACTIVE',
    description: 'Identifies trending stocks with strong price momentum, volume surge, and relative strength vs index.',
    coverage: 'NSE + NASDAQ',
    signals: 247,
    winRate: 71.4,
    avgReturn: 4.8,
    lastSignal: '8m ago',
    signals_today: [
      { sym: 'NVDA', action: 'BUY', conf: 84, entry: 875, sl: 820, t1: 950, reason: 'Vol surge 3.2x avg + RSI breakout' },
      { sym: 'INFY', action: 'BUY', conf: 72, entry: 1456, sl: 1390, t1: 1580, reason: 'Cup & handle breakout + earnings catalyst' },
      { sym: 'BAJFINANCE', action: 'WATCH', conf: 64, entry: 7234, sl: 6900, t1: 7600, reason: 'Building momentum, not confirmed yet' },
    ]
  },
  {
    id: 'WHALE_TRACKER',
    name: 'Whale Tracker',
    icon: '🐋',
    color: '#3B82F6',
    status: 'ACTIVE',
    description: 'Monitors institutional block trades, bulk deals, FII/DII flows, and unusual options OI build-up.',
    coverage: 'NSE + BSE + CRYPTO',
    signals: 189,
    winRate: 68.2,
    avgReturn: 6.1,
    lastSignal: '23m ago',
    signals_today: [
      { sym: 'HDFCBANK', action: 'BUY', conf: 78, entry: 1623, sl: 1550, t1: 1750, reason: 'FII buying ₹2,400Cr in 3 days' },
      { sym: 'BTC/USD', action: 'BUY', conf: 82, entry: 65800, sl: 62000, t1: 72000, reason: 'Spot ETF inflows $480M today' },
    ]
  },
  {
    id: 'CATALYST_BOT',
    name: 'Catalyst AI',
    icon: '🎯',
    color: '#10B981',
    status: 'ACTIVE',
    description: 'Scans earnings calendars, product launches, regulatory approvals, and macro events for trade catalysts.',
    coverage: 'Global Markets',
    signals: 312,
    winRate: 74.1,
    avgReturn: 5.4,
    lastSignal: '45m ago',
    signals_today: [
      { sym: 'RELIANCE', action: 'BUY', conf: 76, entry: 2847, sl: 2700, t1: 3050, reason: 'Q4 beat + Jio subscriber milestone' },
      { sym: 'TCS', action: 'HOLD', conf: 58, entry: 3921, sl: 3750, t1: 4100, reason: 'Earnings inline, no fresh catalyst' },
      { sym: 'MSFT', action: 'BUY', conf: 80, entry: 415, sl: 390, t1: 450, reason: 'Azure AI revenue guidance raised' },
    ]
  },
  {
    id: 'MACRO_BOT',
    name: 'Macro Oracle',
    icon: '🌐',
    color: '#9F7AEA',
    status: 'ACTIVE',
    description: 'Analyses Fed minutes, CPI/PCE data, bond yields, DXY, and global macro flows to time sector rotations.',
    coverage: 'Global Macro',
    signals: 124,
    winRate: 66.8,
    avgReturn: 7.2,
    lastSignal: '1.2h ago',
    signals_today: [
      { sym: 'GOLD', action: 'BUY', conf: 73, entry: 2341, sl: 2260, t1: 2450, reason: 'DXY weakening + Fed pivot signals' },
      { sym: 'EUR/USD', action: 'BUY', conf: 67, entry: 1.0842, sl: 1.0720, t1: 1.1050, reason: 'ECB hawkish, USD softening' },
    ]
  },
  {
    id: 'ONCHAIN_BOT',
    name: 'On-Chain Intel',
    icon: '🔗',
    color: '#EC4899',
    status: 'ACTIVE',
    description: 'Reads blockchain data: whale wallet movements, exchange inflows/outflows, miner behavior, and stablecoin minting.',
    coverage: 'BTC + ETH + SOL',
    signals: 96,
    winRate: 69.7,
    avgReturn: 9.3,
    lastSignal: '18m ago',
    signals_today: [
      { sym: 'ETH/USD', action: 'BUY', conf: 75, entry: 3812, sl: 3500, t1: 4200, reason: 'Exchange outflows 42K ETH — accumulation' },
      { sym: 'SOL/USD', action: 'BUY', conf: 70, entry: 178, sl: 155, t1: 210, reason: 'Active addresses +28% WoW' },
    ]
  },
  {
    id: 'SCREENER_BOT',
    name: 'Alpha Screener',
    icon: '🔍',
    color: '#06B6D4',
    status: 'SCANNING',
    description: 'Continuous multi-factor screening across 2,000+ stocks using 40+ technical and fundamental filters.',
    coverage: 'NSE + NASDAQ + LSE',
    signals: 423,
    winRate: 63.4,
    avgReturn: 3.9,
    lastSignal: '4m ago',
    signals_today: [
      { sym: 'ICICIBANK', action: 'BUY', conf: 81, entry: 1089, sl: 1030, t1: 1180, reason: 'Breaking 52W high + volume expansion' },
      { sym: 'META', action: 'BUY', conf: 77, entry: 521, sl: 490, t1: 570, reason: 'AI ad revenue beat — re-rating catalyst' },
      { sym: 'MARUTI', action: 'WATCH', conf: 60, entry: 12450, sl: 11900, t1: 13200, reason: 'Near breakout, await volume confirm' },
    ]
  },
]

const ACTION_COLOR = (a: string) => a === 'BUY' ? '#48BB78' : a === 'SELL' ? '#FC8181' : a === 'HOLD' ? '#63B3ED' : '#F59E0B'

export default function BotsPage() {
  const [selected, setSelected] = useState(BOTS[0])
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const iv = setInterval(() => {
      setPulse(p => !p)
    }, 1500)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#080C14', color: '#F7FAFC', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/dashboard" style={{ color: '#63B3ED', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700, letterSpacing: 2 }}>AI TRADING BOTS</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: '#48BB78', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#48BB78', opacity: pulse ? 1 : 0.3, transition: 'opacity 0.5s' }} />
          6 BOTS ACTIVE
        </div>
      </div>

      <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Bot List */}
        <div>
          <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700, letterSpacing: 1, marginBottom: 12 }}>SELECT BOT</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {BOTS.map(b => (
              <button key={b.id} onClick={() => setSelected(b)}
                style={{ padding: '14px 16px', borderRadius: 12, border: '1px solid', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
                  borderColor: selected.id === b.id ? b.color : 'rgba(255,255,255,0.07)',
                  background: selected.id === b.id ? `${b.color}11` : 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{b.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, color: selected.id === b.id ? b.color : '#CBD5E0' }}>{b.name}</div>
                      <div style={{ fontSize: 10, color: '#4A5568' }}>{b.signals} signals • {b.winRate}% win</div>
                    </div>
                  </div>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: b.status === 'ACTIVE' ? '#48BB78' : '#F59E0B' }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bot Detail */}
        <div>
          <div style={{ background: 'rgba(255,255,255,0.02)', border: `1px solid ${selected.color}33`, borderRadius: 16, padding: 24, marginBottom: 20 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ fontSize: 40 }}>{selected.icon}</div>
                <div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: selected.color }}>{selected.name}</h2>
                  <div style={{ fontSize: 12, color: '#718096' }}>{selected.id} • {selected.coverage}</div>
                </div>
              </div>
              <span style={{ padding: '6px 14px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                background: selected.status === 'ACTIVE' ? 'rgba(72,187,120,0.15)' : 'rgba(245,158,11,0.15)',
                color: selected.status === 'ACTIVE' ? '#48BB78' : '#F59E0B' }}>
                ● {selected.status}
              </span>
            </div>

            <p style={{ color: '#A0AEC0', fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>{selected.description}</p>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
              {[
                { label: 'Total Signals', val: selected.signals.toLocaleString(), color: selected.color },
                { label: 'Win Rate', val: `${selected.winRate}%`, color: selected.winRate >= 70 ? '#48BB78' : '#F59E0B' },
                { label: 'Avg Return', val: `+${selected.avgReturn}%`, color: '#48BB78' },
                { label: 'Last Signal', val: selected.lastSignal, color: '#718096' },
              ].map(s => (
                <div key={s.label} style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 10, color: '#4A5568', fontWeight: 700 }}>{s.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: s.color, marginTop: 4 }}>{s.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Signals */}
          <div>
            <div style={{ fontSize: 12, color: '#4A5568', fontWeight: 700, letterSpacing: 1, marginBottom: 14 }}>TODAY'S SIGNALS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {selected.signals_today.map((sig, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12, padding: '16px 20px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 16, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: '#E2E8F0' }}>{sig.sym}</div>
                    <span style={{ padding: '2px 8px', borderRadius: 5, fontSize: 11, fontWeight: 700, background: `${ACTION_COLOR(sig.action)}22`, color: ACTION_COLOR(sig.action) }}>
                      {sig.action}
                    </span>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: '#A0AEC0', marginBottom: 4 }}>{sig.reason}</div>
                    <div style={{ display: 'flex', gap: 14, fontSize: 12 }}>
                      <span style={{ color: '#718096' }}>Entry: <strong style={{ color: '#CBD5E0' }}>{sig.entry.toLocaleString()}</strong></span>
                      <span style={{ color: '#718096' }}>SL: <strong style={{ color: '#FC8181' }}>{sig.sl.toLocaleString()}</strong></span>
                      <span style={{ color: '#718096' }}>T1: <strong style={{ color: '#48BB78' }}>{sig.t1.toLocaleString()}</strong></span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: '#4A5568' }}>Confidence</div>
                    <div style={{ fontSize: 22, fontWeight: 800, color: sig.conf >= 75 ? '#48BB78' : sig.conf >= 60 ? '#F59E0B' : '#FC8181' }}>{sig.conf}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p style={{ textAlign: 'center', color: '#2D3748', fontSize: 11, paddingBottom: 24 }}>AI signals are educational only. Not financial advice. Always do your own research.</p>
    </div>
  )
}
