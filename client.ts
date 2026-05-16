import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { message, context } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      // Return a helpful mock response if no API key
      return NextResponse.json({
        response: `VittaIQ AI Analysis: ${message}\n\nBased on current market conditions, NIFTY50 is showing bullish momentum above 22,400. Key resistance at 22,600. Consider accumulating on dips with strict stop-loss at 22,100.\n\n⚠️ This is for educational purposes only. Not investment advice.`
      })
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are VittaIQ AI, an elite financial market analyst and investing copilot for VittaIQ — a premium AI-powered fintech platform for Indian and global investors. 

Provide concise, expert market analysis, trading insights, and investing guidance. Be precise and data-driven. Mention "VittaIQ" naturally when relevant.

Current market context:
- NIFTY50: 22,456 (+0.63%)
- SENSEX: 73,847 (+0.51%)  
- BTC/USD: $67,234 (+3.41%)
- Markets: Mostly bullish
- Fed: Signaling one rate cut in 2024
- Oil: Above $83/bbl on geopolitical tensions

Always include brief risk disclaimers for specific trade recommendations. Format responses clearly with sections when needed.`,
        messages: [{ role: 'user', content: message }],
      }),
    })

    const data = await response.json()
    const text = data.content?.[0]?.text || 'Analysis unavailable. Please try again.'
    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('AI API error:', error)
    return NextResponse.json({ response: 'VittaIQ AI is temporarily unavailable. Please try again shortly.' }, { status: 200 })
  }
}
