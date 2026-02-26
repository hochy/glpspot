import { NextRequest, NextResponse } from 'next/server'

// Newsletter service configuration
// Set these in your .env.local file
const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY || ''
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID || ''
const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY || ''
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID || ''

// Configuration: which service to use (convertkit, mailchimp, or log)
const NEWSLETTER_SERVICE = process.env.NEWSLETTER_SERVICE || 'log'

interface SubscribeRequest {
  email: string
}

async function subscribeToConvertKit(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.convertkit.com/v3/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: CONVERTKIT_API_KEY,
        email,
        fields: {
          source: 'glpgrub',
        },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      return { success: false, error: `Failed to subscribe: ${error}` }
    }

    // Add to form if form ID is provided
    if (CONVERTKIT_FORM_ID) {
      await fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_secret: CONVERTKIT_API_KEY,
          email,
        }),
      })
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to connect to ConvertKit' }
  }
}

async function subscribeToMailchimp(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const [_, audienceHash] = MAILCHIMP_API_KEY.split('-')

    const response = await fetch(`https://${audienceHash}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `apikey ${MAILCHIMP_API_KEY}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'pending',
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return { success: false, error: error.detail || 'Failed to subscribe to Mailchimp' }
    }

    return { success: true }
  } catch (error) {
    return { success: false, error: 'Failed to connect to Mailchimp' }
  }
}

function logSubscribe(email: string): { success: boolean; error?: string } {
  console.log('[Newsletter Subscribe]', { email, timestamp: new Date().toISOString() })
  return { success: true }
}

export async function POST(request: NextRequest) {
  try {
    const { email }: SubscribeRequest = await request.json()

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    let result

    switch (NEWSLETTER_SERVICE) {
      case 'convertkit':
        if (!CONVERTKIT_API_KEY) {
          return NextResponse.json({ error: 'ConvertKit not configured' }, { status: 500 })
        }
        result = await subscribeToConvertKit(email)
        break

      case 'mailchimp':
        if (!MAILCHIMP_API_KEY || !MAILCHIMP_LIST_ID) {
          return NextResponse.json({ error: 'Mailchimp not configured' }, { status: 500 })
        }
        result = await subscribeToMailchimp(email)
        break

      case 'log':
      default:
        result = logSubscribe(email)
        break
    }

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
