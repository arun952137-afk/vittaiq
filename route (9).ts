'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const UNDERLYINGS = [
  { sym: 'NIFTY', price: 22456.80, lot: 50, expiry: '30 May 2024' },
  { sym: 'BANKNIFTY', price: 48234.50, lot: 15, expiry: '29 May 2024' },
  { sym: 'FINNIFTY', price: 21876.20, lot: 40, expiry: '28 May 2024' },
  { sym: 'SENSEX', price: 73847.20, lot: 10, expiry: '31 May 2024' },
]

const STRATEGIES = [
  { name: 'Bull Call Spread', legs: 'Buy CE + Sell Higher CE', risk: 'Limited', reward: 'Limited', bias: 'Bullish', premium: 3200, maxProfit: 11800, breakeven: 22550, prob: 62 },
  { name: 'Iron Condor', legs: 'Sell OTM CE+PE, Buy further OTM', risk: 'Limited', reward: 'Limited', bias: 'Neutral', premium: 8400, maxProfit: 8400, breakeven: 22100, prob: 71 },
  { name: 'Bear Put Spread', legs: 'Buy PE + Sell Lower PE', risk: 'Limited', reward: 'Limited', bias: 'Bearish', premium: 2800, maxProfit: 12200, breakeven: 22350, prob: 38 },
  { name: 'Straddle', legs: 'Buy ATM CE + Buy ATM PE', risk: 'Premium Paid', reward: 'Unlimited', bias: 'High Volatility', premium: 12600, maxProfit: -1, breakeven: 22100, prob: 45 },
  { name: 'Covered Call', legs: 'Hold Underlying + Sell OTM CE', risk: 'Downside', reward: 'Premium + Upside cap', bias: 'Mild Bullish', premium: -4200, maxProfit: 6800, breakeven: 22200, prob: 68 },
  { name: 'Calendar Spread', legs: 'Buy Far CE + Sell Near CE', risk: 'Debit Paid', reward: 'Theta Decay', bias: 'Neutral-Bullish', premium: 1800, maxProfit: 7200, breakeven: 22350, prob: 58 },
]

function generateChain(atm: number, count = 7) {
  const strikes = []
  const step = 50
  for (let i = -count; i <= count; i++) {
    const strike = Math.round(atm / step) * step + i * step
    const distance = Math.abs(strike - atm)
    const iv = 14 + distance / atm * 800 + Math.random() * 3
    const callLTP = Math.max(1, (strike <= atm ? (atm - strike) + (iv / 100) * atm * Math.sqrt(7 / 365) : (iv / 100) * atm * Math.sqrt(7 / 365)))
    const putLTP = Math.max(1, (strike >= atm ? (strike - atm) + (iv / 100) * atm * Math.sqrt(7 / 365) : (iv / 100) * atm * Math.sqrt(7 / 365)))
    const callDelta = Math.max(0.01, Math.min(0.99, 0.5 - (strike - atm) / (atm * 0.05)))
    strikes.push({
      strike,
      isATM: i === 0,
      call: { ltp: Math.round(callLTP * 20) / 20, iv: Math.round(iv * 10) / 10, delta: Math.round(callDelta * 100) / 100, oi: Math.round((2000 - Math.abs(i) * 150 + Math.random() * 300) * 100) },
      put: { ltp: Math.round(putLTP * 20) / 20, iv: Math.round(iv * 10) / 10, delta: -Math.round((1 - callDelta) * 100) / 100, oi: Math.round((2100 - Math.abs(i) * 140 + Math.random() * 300) * 100) },
    })
  }
  return strikes
}

export default function OptionsPage() {
  const [underlying, setUnderlying] = useState(UNDERLYINGS[0])
  const [chain, setChain] = useState(generateChain(UNDERLYINGS[0].price))
  const [tab, setTab] = useState<'chain' | 'strategies' | 'builder'>('chain')
  const [livePrice, setLivePrice] = useState(UNDERLYINGS[0].price)

  useEffect(() => {
    const iv = setInterval(() => {
      setLivePrice(p => {
        const newP = p * (1 + (Math.random() - 0.5) * 0.0005)
        setChain(generateChain(newP))
        return newP
      })
    }, 3000)
    return () => clearInterval(iv)
  }, [])

  const handleUnderlying = (u: typeof UNDERLYINGS[0]) => {
    setUnderlying(u)
    setLivePrice(u.price)
    setChain(generateChain(u.price))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#080C14', color: '#F7FAFC', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/dashboard" style={{ color: '#63B3ED', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700, letterSpacing: 2 }}>OPTIONS ANALYTICS</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: '#48BB78' }}>● LIVE</div>
      </div>

      <div style={{ padding: '24px', maxWidth: 1400, margin: '0 auto' }}>
        {/* Underlying selector */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          {UNDERLYINGS.map(u => (
            <button key={u.sym} onClick={() => handleUnderlying(u)}
              style={{ padding: '12px 20px', borderRadius: 10, border: '1px solid', cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left',
                borderColor: underlying.sym === u.sym ? '#63B3ED' : 'rgba(255,255,255,0.08)',
                background: underlying.sym === u.sym ? 'rgba(99,179,237,0.1)' : 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontWeight: 700, color: underlying.sym === u.sym ? '#63B3ED' : '#CBD5E0', fontSize: 14 }}>{u.sym}</div>
              <div style={{ fontSize: 11, color: '#718096' }}>Lot: {u.lot} | {u.expiry}</div>
            </button>
          ))}
        </div>

        {/* Price Display */}
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '16px 20px', marginBottom: 24, display: 'flex', gap: 40, alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700 }}>SPOT PRICE</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#E2E8F0' }}>{livePrice.toFixed(2)}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700 }}>ATM STRIKE</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: '#63B3ED' }}>{Math.round(livePrice / 50) * 50}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700 }}>EXPIRY</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#CBD5E0' }}>{underlying.expiry}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700 }}>PCR</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#F59E0B' }}>0.84</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700 }}>IV RANK</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#48BB78' }}>34th</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700 }}>MAX PAIN</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#FC8181' }}>{Math.round(livePrice / 50) * 50 - 100}</div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 20, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
          {(['chain', 'strategies', 'builder'] as const).map(t => (
            <button key={t} onClick={() => setTab(t)}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                background: tab === t ? '#1A202C' : 'transparent', color: tab === t ? '#63B3ED' : '#718096' }}>
              {t === 'chain' ? 'Option Chain' : t === 'strategies' ? 'AI Strategies' : 'Strategy Builder'}
            </button>
          ))}
        </div>

        {/* Option Chain Tab */}
        {tab === 'chain' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th colSpan={4} style={{ padding: '10px 14px', textAlign: 'center', color: '#48BB78', fontSize: 11, fontWeight: 700, letterSpacing: 1, background: 'rgba(72,187,120,0.05)' }}>CALLS</th>
                    <th style={{ padding: '10px 14px', textAlign: 'center', color: '#F59E0B', fontSize: 13, fontWeight: 800, background: 'rgba(245,158,11,0.05)' }}>STRIKE</th>
                    <th colSpan={4} style={{ padding: '10px 14px', textAlign: 'center', color: '#FC8181', fontSize: 11, fontWeight: 700, letterSpacing: 1, background: 'rgba(252,129,129,0.05)' }}>PUTS</th>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    {['OI','IV','Delta','LTP','','LTP','Delta','IV','OI'].map((h, i) => (
                      <th key={i} style={{ padding: '8px 12px', textAlign: i < 4 ? 'right' : i === 4 ? 'center' : 'left', color: '#4A5568', fontWeight: 700, fontSize: 10, letterSpacing: 0.5 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {chain.map((row) => (
                    <tr key={row.strike}
                      style={{ borderBottom: '1px solid rgba(255,255,255,0.03)', background: row.isATM ? 'rgba(245,158,11,0.06)' : 'transparent' }}>
                      <td style={{ padding: '9px 12px', textAlign: 'right', color: '#718096' }}>{(row.call.oi / 100).toFixed(0)}K</td>
                      <td style={{ padding: '9px 12px', textAlign: 'right', color: '#63B3ED' }}>{row.call.iv}%</td>
                      <td style={{ padding: '9px 12px', textAlign: 'right', color: '#48BB78' }}>{row.call.delta}</td>
                      <td style={{ padding: '9px 12px', textAlign: 'right', fontWeight: 700, color: '#48BB78' }}>{row.call.ltp.toFixed(2)}</td>
                      <td style={{ padding: '9px 12px', textAlign: 'center', fontWeight: 800, color: row.isATM ? '#F59E0B' : '#718096', fontSize: row.isATM ? 14 : 12 }}>
                        {row.strike}
                        {row.isATM && <span style={{ fontSize: 9, color: '#F59E0B', display: 'block' }}>ATM</span>}
                      </td>
                      <td style={{ padding: '9px 12px', textAlign: 'left', fontWeight: 700, color: '#FC8181' }}>{row.put.ltp.toFixed(2)}</td>
                      <td style={{ padding: '9px 12px', textAlign: 'left', color: '#FC8181' }}>{row.put.delta}</td>
                      <td style={{ padding: '9px 12px', textAlign: 'left', color: '#63B3ED' }}>{row.put.iv}%</td>
                      <td style={{ padding: '9px 12px', textAlign: 'left', color: '#718096' }}>{(row.put.oi / 100).toFixed(0)}K</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* AI Strategies Tab */}
        {tab === 'strategies' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(340px,1fr))', gap: 16 }}>
            {STRATEGIES.map(s => (
              <div key={s.name} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: 20, transition: 'border-color 0.2s', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(99,179,237,0.3)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: '#E2E8F0' }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: '#718096', marginTop: 2 }}>{s.legs}</div>
                  </div>
                  <div style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontWeight: 700,
                    background: s.bias.includes('Bull') ? 'rgba(72,187,120,0.15)' : s.bias.includes('Bear') ? 'rgba(252,129,129,0.15)' : 'rgba(245,158,11,0.15)',
                    color: s.bias.includes('Bull') ? '#48BB78' : s.bias.includes('Bear') ? '#FC8181' : '#F59E0B' }}>
                    {s.bias}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                  <Metric label="Max Risk" val={s.premium > 0 ? `₹${s.premium.toLocaleString()}` : 'Downside'} color="#FC8181" />
                  <Metric label="Max Profit" val={s.maxProfit > 0 ? `₹${s.maxProfit.toLocaleString()}` : '∞'} color="#48BB78" />
                  <Metric label="Breakeven" val={s.breakeven.toFixed(0)} color="#F59E0B" />
                  <Metric label="Win Prob" val={`${s.prob}%`} color={s.prob >= 60 ? '#48BB78' : '#F59E0B'} />
                </div>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                  <div style={{ height: '100%', width: `${s.prob}%`, background: 'linear-gradient(90deg,#3B82F6,#8B5CF6)', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 10, color: '#4A5568', marginTop: 4 }}>Probability of Profit: {s.prob}%</div>
              </div>
            ))}
          </div>
        )}

        {/* Builder Tab */}
        {tab === 'builder' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 32, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🔧</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#CBD5E0', marginBottom: 8 }}>Strategy Builder</div>
            <div style={{ color: '#718096', fontSize: 14 }}>Build custom multi-leg strategies with real-time P&L visualization. Coming in next update.</div>
          </div>
        )}

        <p style={{ textAlign: 'center', color: '#2D3748', fontSize: 11, marginTop: 24 }}>Options trading involves significant risk. For educational purposes only.</p>
      </div>
    </div>
  )
}

function Metric({ label, val, color }: { label: string; val: string; color: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '8px 10px' }}>
      <div style={{ fontSize: 10, color: '#4A5568', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color, marginTop: 2 }}>{val}</div>
    </div>
  )
}
