'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) { setError(error.message); setLoading(false) }
    else router.push('/dashboard')
  }

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
  }

  const inp = { width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '11px 14px', color: '#F7FAFC', fontFamily: 'inherit', fontSize: 14, outline: 'none' }

  return (
    <div style={{ minHeight: '100vh', background: '#080C14', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ width: '100%', maxWidth: 420, background: 'linear-gradient(135deg,#0D1117,#0F1A2E)', border: '1px solid rgba(99,179,237,0.3)', borderRadius: 22, padding: 40 }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg,#63B3ED,#9F7AEA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: 20, margin: '0 auto 16px' }}>V</div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#F7FAFC', marginBottom: 8 }}>Welcome back</h1>
          <p style={{ color: '#718096', fontSize: 14 }}>Sign in to your VittaIQ account</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={handleGoogle} style={{ width: '100%', padding: '12px 20px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#CBD5E0', cursor: 'pointer', fontFamily: 'inherit', fontSize: 14, fontWeight: 600 }}>🔵 Continue with Google</button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ color: '#4A5568', fontSize: 13 }}>or email</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input style={inp} type="email" placeholder="Email address" value={email} onChange={e => setEmail(e.target.value)} required />
            <input style={inp} type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
            {error && <div style={{ color: '#FC8181', fontSize: 13, padding: '8px 12px', background: 'rgba(252,129,129,0.08)', borderRadius: 8 }}>{error}</div>}
            <button type="submit" disabled={loading} style={{ width: '100%', padding: 13, background: 'linear-gradient(135deg,#63B3ED,#9F7AEA)', border: 'none', borderRadius: 10, color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <p style={{ textAlign: 'center', color: '#718096', fontSize: 13 }}>
            No account?{' '}
            <span style={{ color: '#63B3ED', cursor: 'pointer', fontWeight: 600 }} onClick={() => router.push('/auth/signup')}>Sign Up</span>
          </p>
        </div>
      </div>
    </div>
  )
}
