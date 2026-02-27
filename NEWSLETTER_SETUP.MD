# Newsletter Setup Guide

## Quick Start

1. Choose your newsletter service (Beehiiv, ConvertKit, or Mailchimp)
2. Copy `.env.example` to `.env.local`
3. Fill in your API credentials
4. Deploy!

---

## Beehiiv Setup (Recommended for Newsletters)

### Why Beehiiv?
- Newsletter-first platform (built exactly for this use case)
- Free tier: Unlimited subscribers, 0% fees
- Clean, creator-friendly interface
- Modern features (recommendations, analytics)

### Get API Key
1. Go to [Beehiiv](https://www.beehiiv.com/) and sign in
2. Navigate to Settings → Integrations → API
3. Generate a new API key (it will be a long alphanumeric string)
4. Copy your API key
5. Paste in `.env.local`: `BEEHIIV_API_KEY=your_api_key_here`

### Get Publication ID
1. On the Beehiiv dashboard, go to Settings → Publication
2. Find your Publication ID (usually: `pub_xxxxxxxx`)
3. Paste in `.env.local`: `BEEHIIV_PUBLICATION_ID=pub_xxxxxxxx`

### Set Service
In `.env.local`:
```
NEWSLETTER_SERVICE=beehiiv
```

---

## ConvertKit Setup

### Get API Key
1. Go to [ConvertKit Settings](https://app.convertkit.com/account_settings/advanced_settings)
2. Scroll to "API Secret"
3. Copy your API key (starts with something like `6SjG...`)
4. Paste in `.env.local`: `CONVERTKIT_API_KEY=your_api_key_here`

### Get Form ID
1. Go to your ConvertKit dashboard
2. Create a new form (or use existing)
3. The form URL will be like: `https://app.convertkit.com/forms/123456/edit`
4. The number after `/forms/` is your form ID
5. Paste in `.env.local`: `CONVERTKIT_FORM_ID=123456`

### Set Service
In `.env.local`:
```
NEWSLETTER_SERVICE=convertkit
```

---

## Mailchimp Setup (Alternative)

### Get API Key
1. Go to [Mailchimp Account](https://us1.admin.mailchimp.com/account/api/)
2. Create an API key if needed
3. Your API key will be like: `us1-abc123def456` (server prefix + key)
4. Paste in `.env.local`: `MAILCHIMP_API_KEY=us1-abc123def456`

### Get List ID
1. Go to [Mailchimp Lists](https://us1.admin.mailchimp.com/lists/)
2. Select or create a list
3. Go to Settings → List name and defaults
4. Copy the List ID
5. Paste in `.env.local`: `MAILCHIMP_LIST_ID=your_list_id`

### Set Service
In `.env.local`:
```
NEWSLETTER_SERVICE=mailchimp
```

---

## Testing Mode

To test without a real newsletter service, use log mode:

```
NEWSLETTER_SERVICE=log
```

This will just log email signups to the console (good for development/testing).

---

## Google Analytics (Optional but Recommended)

### Get Measurement ID
1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property or use existing
3. In Admin → Property → Settings → Data Streams
4. Create a Web data stream
5. Copy your Measurement ID (starts with `G-`)

### Set in `.env.local`:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

---

## Production Checklist

Before deploying:
- [ ] Newsletter service configured (ConvertKit or Mailchimp)
- [ ] API keys in `.env.local` (NOT committed to git)
- [ ] Google Analytics measurement ID set (optional)
- [ ] Create welcome email in your newsletter service
- [ ] Test signup form on non-production environment

---

## Security Notes

- `.env.local` is NOT in version control (in `.gitignore`)
- Never commit `.env.local` to GitHub
- API keys are server-side only, never exposed to clients
- ConvertKit API Secret is safe to use in backend
- Mailchimp API Key is safe to use in backend (it's client-facing)

---

## Troubleshooting

### Newsletter signup not working:
1. Check browser console for errors
2. Check your API keys are valid
3.Verify form/list ID is correct
4. Check newsletter service account has active subscription

### Analytics not tracking:
1. Verify `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
2. Check browser network tab for analytics requests
3. Wait 24-48 hours for Google Analytics to show first data
4. Check Google Analytics real-time view during testing

---

## ConvertKit vs Mailchimp vs Beehiiv

| Feature | Beehiiv | ConvertKit | Mailchimp |
|---------|---------|------------|----------|
| Free Tier | Unlimited subs (0% fees) | 1,000 subscribers | 500 subscribers |
| Focus | Newsletter-centric | Email marketing | Email marketing |
| Email Automation | Good | Powerful | Basic |
| Paid Plans | \$49/mo+ | \$29/mo+ | \$13/mo+ |
| Landing Pages | Yes | Yes | Limited |
| Ease of Use | Simple | Simple | More complex |
| Best For | Newsletters | Creators | Businesses |
| Recommendation | ⭐ For The GLPSpot | Good alternative | More complex |

**Recommendation:** Start with **Beehiiv** for The GLPSpot - it's newsletter-first, free, and creator-friendly.
