'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const FOREX_PAIRS = [
  { pair: 'EUR/USD', rate: 1.0842, chg: 0.31, signal: 'BUY', conf: 67, bid: 1.0840, ask: 1.0844, spread: 0.4, session: 'LONDON' },
  { pair: 'GBP/USD', rate: 1.2734, chg: 0.18, signal: 'BUY', conf: 61, bid: 1.2731, ask: 1.2737, spread: 0.6, session: 'LONDON' },
  { pair: 'USD/JPY', rate: 156.42, chg: -0.24, signal: 'NEUTRAL', conf: 52, bid: 156.39, ask: 156.45, spread: 0.6, session: 'TOKYO' },
  { pair: 'USD/INR', rate: 83.48, chg: -0.08, signal: 'NEUTRAL', conf: 55, bid: 83.46, ask: 83.50, spread: 0.4, session: 'INDIA' },
  { pair: 'AUD/USD', rate: 0.6621, chg: 0.44, signal: 'BUY', conf: 63, bid: 0.6619, ask: 0.6623, spread: 0.4, session: 'SYDNEY' },
  { pair: 'USD/CAD', rate: 1.3612, chg: -0.19, signal: 'SELL', conf: 58, bid: 1.3609, ask: 1.3615, spread: 0.6, session: 'NY' },
  { pair: 'EUR/JPY', rate: 169.61, chg: 0.08, signal: 'NEUTRAL', conf: 49, bid: 169.57, ask: 169.65, spread: 0.8, session: 'LONDON' },
  { pair: 'USD/CHF', rate: 0.9021, chg: -0.13, signal: 'SELL', conf: 56, bid: 0.9019, ask: 0.9023, spread: 0.4, session: 'EUROPE' },
]

const COMMODITIES = [
  { sym: 'GOLD', name: 'Gold', unit: 'USD/oz', price: 2341.20, chg: -0.12, chg7d: 2.4, signal: 'BUY', conf: 65, resistance: 2400, support: 2280, color: '#F59E0B', emoji: '🥇' },
  { sym: 'SILVER', name: 'Silver', unit: 'USD/oz', price: 27.84, chg: 0.62, chg7d: 4.8, signal: 'BUY', conf: 67, resistance: 30, support: 26, color: '#9CA3AF', emoji: '🥈' },
  { sym: 'CRUDE OIL', name: 'Crude Oil (WTI)', unit: 'USD/bbl', price: 83.45, chg: 0.94, chg7d: 3.1, signal: 'BUY', conf: 62, resistance: 87, support: 80, color: '#6B7280', emoji: '🛢️' },
  { sym: 'BRENT', name: 'Brent Crude', unit: 'USD/bbl', price: 87.12, chg: 0.78, chg7d: 2.9, signal: 'BUY', conf: 61, resistance: 91, support: 83, color: '#4B5563', emoji: '⚡' },
  { sym: 'NATURAL GAS', name: 'Natural Gas', unit: 'USD/MMBtu', price: 2.34, chg: -1.28, chg7d: -5.2, signal: 'NEUTRAL', conf: 48, resistance: 2.6, support: 2.1, color: '#60A5FA', emoji: '🔥' },
  { sym: 'COPPER', name: 'Copper', unit: 'USD/lb', price: 4.62, chg: 1.44, chg7d: 6.7, signal: 'STRONG BUY', conf: 78, resistance: 5.0, support: 4.3, color: '#F97316', emoji: '🔩' },
  { sym: 'PLATINUM', name: 'Platinum', unit: 'USD/oz', price: 1024.50, chg: 0.34, chg7d: 1.8, signal: 'BUY', conf: 60, resistance: 1100, support: 980, color: '#67E8F9', emoji: '💎' },
  { sym: 'WHEAT', name: 'Wheat', unit: 'USD/bu', price: 568.40, chg: -0.72, chg7d: -2.1, signal: 'NEUTRAL', conf: 46, resistance: 600, support: 540, color: '#D97706', emoji: '🌾' },
]

const SIG_COLOR = (s: string) => s === 'STRONG BUY' ? '#00D964' : s === 'BUY' ? '#48BB78' : s === 'SELL' ? '#FC8181' : '#F59E0B'

export default function ForexCommoditiesPage() {
  const [tab, setTab] = useState<'forex' | 'commodities'>('commodities')
  const [rates, setRates] = useState(FOREX_PAIRS.map(f => f.rate))
  const [prices, setPrices] = useState(COMMODITIES.map(c => c.price))

  useEffect(() => {
    const iv = setInterval(() => {
      setRates(prev => prev.map((r, i) => r * (1 + (Math.random() - 0.5) * 0.0003)))
      setPrices(prev => prev.map((p, i) => p * (1 + (Math.random() - 0.5) * 0.002)))
    }, 2000)
    return () => clearInterval(iv)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#080C14', color: '#F7FAFC', fontFamily: 'system-ui,sans-serif' }}>
      <div style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href="/dashboard" style={{ color: '#63B3ED', textDecoration: 'none', fontSize: 13 }}>← Dashboard</Link>
        <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.1)' }} />
        <div style={{ fontSize: 11, color: '#4A5568', fontWeight: 700, letterSpacing: 2 }}>FOREX & COMMODITIES</div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, color: '#48BB78' }}>● LIVE</div>
      </div>

      <div style={{ padding: '24px', maxWidth: 1200, margin: '0 auto' }}>
        {/* DXY, Sessions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 14, marginBottom: 24 }}>
          <StatCard label="DXY Index" val="104.82" sub="-0.24% today" color="#FC8181" />
          <StatCard label="Gold/Silver Ratio" val="84.1x" sub="Historical avg: 70x" color="#F59E0B" />
          <StatCard label="Oil Inventory" val="-4.2M bbls" sub="Bullish for crude" color="#48BB78" />
          <StatCard label="Active Sessions" val="2 of 4" sub="London + NY open" color="#63B3ED" />
          <StatCard label="US 10Y Yield" val="4.42%" sub="-2bp today" color="#9F7AEA" />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 20, background: 'rgba(255,255,255,0.03)', padding: 4, borderRadius: 10, width: 'fit-content' }}>
          {([
            { k: 'commodities', l: 'Commodities' },
            { k: 'forex', l: 'Forex Pairs' },
          ] as const).map(t => (
            <button key={t.k} onClick={() => setTab(t.k)}
              style={{ padding: '8px 20px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, transition: 'all 0.2s',
                background: tab === t.k ? '#1A202C' : 'transparent', color: tab === t.k ? '#63B3ED' : '#718096' }}>
              {t.l}
            </button>
          ))}
        </div>

        {/* Commodities */}
        {tab === 'commodities' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: 14 }}>
            {COMMODITIES.map((c, i) => {
              const lp = prices[i]
              const live_chg = ((lp - c.price) / c.price * 100 + c.chg)
              return (
                <div key={c.sym} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 14, padding: 18, transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${c.color}44`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)')}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 24 }}>{c.emoji}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: '#E2E8F0' }}>{c.sym}</div>
                        <div style={{ fontSize: 11, color: '#718096' }}>{c.unit}</div>
                      </div>
                    </div>
                    <span style={{ padding: '3px 8px', borderRadius: 6, fontSize: 10, fontWeight: 700, background: `${SIG_COLOR(c.signal)}22`, color: SIG_COLOR(c.signal) }}>
                      {c.signal}
                    </span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: '#E2E8F0', marginBottom: 4 }}>
                    {c.unit.includes('/oz') || c.unit.includes('/lb') ? '$' : '$'}{lp.toFixed(2)}
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 12, color: live_chg >= 0 ? '#48BB78' : '#FC8181', fontWeight: 600 }}>{live_chg >= 0 ? '+' : ''}{live_chg.toFixed(2)}% today</span>
                    <span style={{ fontSize: 12, color: c.chg7d >= 0 ? '#48BB78' : '#FC8181' }}>{c.chg7d >= 0 ? '+' : ''}{c.chg7d}% 7d</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, fontSize: 11 }}>
                    <span style={{ color: '#FC8181' }}>Support: <strong>{c.support}</strong></span>
                    <span style={{ color: '#48BB78' }}>Resistance: <strong>{c.resistance}</strong></span>
                    <span style={{ color: '#718096' }}>Conf: <strong style={{ color: SIG_COLOR(c.signal) }}>{c.conf}%</strong></span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Forex */}
        {tab === 'forex' && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 16, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  {['Pair','Bid','Ask','Spread','Change','Signal','Confidence','Session'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 10, color: '#4A5568', fontWeight: 700, letterSpacing: 0.8 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FOREX_PAIRS.map((f, i) => {
                  const lr = rates[i]
                  const live_chg = ((lr - f.rate) / f.rate * 100 + f.chg)
                  return (
                    <tr key={f.pair} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <td style={{ padding: '13px 16px', fontWeight: 800, color: '#E2E8F0', fontSize: 15 }}>{f.pair}</td>
                      <td style={{ padding: '13px 16px', color: '#48BB78' }}>{lr.toFixed(4)}</td>
                      <td style={{ padding: '13px 16px', color: '#FC8181' }}>{(lr + f.spread / 10000).toFixed(4)}</td>
                      <td style={{ padding: '13px 16px', color: '#718096' }}>{f.spread} pips</td>
                      <td style={{ padding: '13px 16px', color: live_chg >= 0 ? '#48BB78' : '#FC8181', fontWeight: 600 }}>
                        {live_chg >= 0 ? '+' : ''}{live_chg.toFixed(3)}%
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 700, background: `${SIG_COLOR(f.signal)}22`, color: SIG_COLOR(f.signal) }}>
                          {f.signal}
                        </span>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <div style={{ width: 40, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2 }}>
                            <div style={{ height: '100%', width: `${f.conf}%`, background: SIG_COLOR(f.signal), borderRadius: 2 }} />
                          </div>
                          <span style={{ fontSize: 12, color: SIG_COLOR(f.signal) }}>{f.conf}%</span>
                        </div>
                      </td>
                      <td style={{ padding: '13px 16px' }}>
                        <span style={{ padding: '3px 8px', borderRadius: 5, fontSize: 10, fontWeight: 600, background: 'rgba(99,179,237,0.1)', color: '#63B3ED' }}>{f.session}</span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ label, val, sub, color }: { label: string; val: string; sub: string; color: string }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '16px 18px' }}>
      <div style={{ fontSize: 10, color: '#4A5568', fontWeight: 700 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, color, marginTop: 4 }}>{val}</div>
      <div style={{ fontSize: 11, color: '#718096', marginTop: 2 }}>{sub}</div>
    </div>
  )
}
