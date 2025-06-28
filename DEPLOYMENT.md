# 🚀 Deployment Guide

## Pre-Deployment Checklist

### ✅ Code Quality
- [ ] All components are properly exported
- [ ] No console.log statements in production code
- [ ] All images are using proper URLs (no local paths)
- [ ] Environment variables are properly configured
- [ ] Build passes locally (`npm run build`)

### ✅ Configuration Files
- [ ] `next.config.js` is properly configured
- [ ] `vercel.json` exists (for Vercel)
- [ ] `netlify.toml` exists (for Netlify)
- [ ] `package.json` has correct scripts
- [ ] `.gitignore` excludes build artifacts

## Vercel Deployment

### 1. Connect Repository
```bash
npm i -g vercel
vercel login
vercel
```

### 2. Environment Variables
Set in Vercel Dashboard:
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_CHAIN_ID`

### 3. Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`

## Netlify Deployment

### 1. Connect Repository
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository

### 2. Build Settings
- Build Command: `npm run build`
- Publish Directory: `out`
- Node Version: `18`

### 3. Environment Variables
Set in Netlify Dashboard:
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_CHAIN_ID`

## Post-Deployment Checklist

### ✅ Functionality
- [ ] Home page loads correctly
- [ ] Navigation works on all pages
- [ ] Campaign listing page works
- [ ] Individual campaign pages load
- [ ] Wallet connection works
- [ ] Images display properly
- [ ] Responsive design works on mobile

### ✅ Performance
- [ ] Page load times are acceptable
- [ ] Images are optimized
- [ ] CSS is minified
- [ ] JavaScript is bundled properly

## Troubleshooting

### Common Issues

#### Images Not Loading
- Check image URLs are accessible
- Verify domain is in `next.config.js` images.domains
- Ensure images are using HTTPS

#### Build Failures
- Check Node.js version (18+ required)
- Verify all dependencies are installed
- Check for syntax errors in components

#### Routing Issues
- Verify `trailingSlash: true` in next.config.js
- Check redirect rules in netlify.toml
- Ensure all pages are properly exported

---

**Remember**: Always test thoroughly before deploying to production! 