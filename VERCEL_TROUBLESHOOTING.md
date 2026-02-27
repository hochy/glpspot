# Vercel Deployment Troubleshooting

## Issue: Environment Variable Syntax Error (Fixed ✅)

**Error:**
```
Error: x Expected a semicolon
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA measurement_ID || ''
                                                               ^
```

**Cause:**
The environment variable name had a space instead of an underscore: `NEXT_PUBLIC_GA measurement_ID` → `NEXT_PUBLIC_GA_MEASUREMENT_ID`

**Fix Applied:**
- Updated `src/app/layout.tsx` line 10
- Committed: `fix: Correct environment variable syntax`
- Pushed: `061041f`

---

## ✅ Deployment Pre-Flight Checklist

### 1. Source Code
- [x] All `glpgrub.com` → `theglpspot.com` updated
- [x] All `GLPGrub` → `The GLPSpot` updated
- [x] All `hello@glpgrub.com` → `hello@theglpspot.com` updated
- [x] Syntax error in `layout.tsx` fixed
- [x] All changes committed to GitHub
- [x] Latest commit: `061041f`

### 2. GitHub Repository
- [x] URL: https://github.com/hochy/glpspot
- [x] Main branch: `main`
- [x] Latest push: Commit `061041f`

### 3. Vercel Configuration
- [ ] Project connected to GitHub repo
- [ ] Build command: `npm run build`
- [ ] Output directory: `.next`
- [ ] Node.js version: 20.x (automatic)
- [ ] Framework preset: Next.js

### 4. Environment Variables (Vercel Dashboard)
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional, leave empty if not using GA)
- [ ] `NEWSLETTER_SERVICE` (optional: `convertkit`, `mailchimp`, or `log`)
- [ ] `CONVERTKIT_API_KEY` (optional, if using ConvertKit)
- [ ] `CONVERTKIT_FORM_ID` (optional, if using ConvertKit)
- [ ] `MAILCHIMP_API_KEY` (optional, if using Mailchimp)
- [ ] `MAILCHIMP_LIST_ID` (optional, if using Mailchimp)

### 5. Domains (Vercel Dashboard → Settings → Domains)
- [ ] Primary: `theglpspot.com`
- [ ] Secondary: `glpspot.com` (redirect to theglpspot.com)

### 6. DNS Configuration (At your domain registrar)
For **theglpspot.com**:
- [ ] Add `A` record: `@` → Vercel's IPv4 address
- [ ] Add `AAAA` record: `@` → Vercel's IPv6 address
- [ ] Add `CNAME` record: `www` → `cname.vercel-dns.com`

For **glpspot.com** (redirect):
- [ ] Add `A` record: `@` → Vercel's IPv4 address
- [ ] Add `AAAA` record: `@` → Vercel's IPv6 address
- [ ] Add `CNAME` record: `www` → `cname.vercel-dns.com`

---

## If Vercel Deployment Still Fails

### Common Issues & Solutions

**Issue: Build fails with other TypeScript errors**
- Check: `npm run build` locally first
- Fix: Run `npm run lint` and address any issues

**Issue: Module not found errors**
- Fix: Run `npm install` to ensure all dependencies are installed

**Issue: Deployment succeeds but site shows 404**
- Check: Build output directory (should be `.next`)
- Fix: Update Vercel project settings → Build & Development Settings

**Issue: Images not loading**
- Check: `/public/images/` folder has images
- Fix: Ensure images are in the correct directory

---

## Local Build Test

Before deploying, test locally:

```bash
cd /home/jeremy/.openclaw/workspace/glpspot-repo
npm install
npm run build
```

If `npm run build` succeeds, Vercel should also succeed.

---

## Deployment Steps

1. ✅ **Verify build locally** → `npm run build`
2. ✅ **Fix syntax errors**
3. ✅ **Push to GitHub** → Done (commit `061041f`)
4. ⏳ **Push to Vercel** → Go to Vercel dashboard → Deployments → Redeploy
5. ⏳ **Configure domains** → Add theglpspot.com + glpspot.com
6. ⏳ **Configure DNS** → Update DNS at your registrar
7. ⏳ **Test live site** → https://theglpspot.com

---

## Resources

- GitHub: https://github.com/hochy/glpspot
- Vercel Dashboard: https://vercel.com/dashboard
- Next.js Docs: https://nextjs.org/docs
- Environment Variables: https://vercel.com/docs/projects/environment-variables
