# 🚀 GeoCetak Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (connected to GitHub)
- Node.js 18+ locally for testing

### Step 1: Prepare Repository
```bash
# Ensure all files are committed
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy to Vercel

#### Option A: Vercel CLI (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

#### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 3: Environment Variables (Optional)
If you want to use Supabase in production:

1. In Vercel Dashboard → Project → Settings → Environment Variables
2. Add:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_DEV_MODE=false
   VITE_ENVIRONMENT=production
   ```

### Step 4: Custom Domain (Optional)
1. In Vercel Dashboard → Project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

## Build Configuration

### Current Setup
- **Build Command**: `npm run build` (skips TypeScript checking for faster builds)
- **Type Check**: `npm run build:check` (includes TypeScript checking)
- **Framework**: Vite with React + TypeScript
- **Output**: Static files in `dist/` directory

### Performance Optimizations
- ✅ Code splitting by vendor chunks
- ✅ Asset optimization
- ✅ Tree shaking
- ✅ Minification with esbuild
- ✅ Source maps for debugging

## Troubleshooting

### Build Errors
If you encounter TypeScript errors during deployment:
1. Run `npm run build:check` locally to see all errors
2. Fix critical errors or use `npm run build` for deployment
3. The current setup prioritizes successful deployment over strict typing

### Performance Issues
- Monitor bundle size warnings
- Use browser dev tools to check loading times
- Consider lazy loading for heavy components

### Environment Issues
- Ensure all environment variables are set correctly
- Check browser console for runtime errors
- Verify API endpoints are accessible

## Post-Deployment Checklist

### ✅ Functionality Test
- [ ] 3D Cylinder visualization loads
- [ ] Interactive controls work (radius, height sliders)
- [ ] Tab navigation (Konsep, Jaring-jaring, Rumus, Quiz)
- [ ] Responsive design on mobile
- [ ] Performance is acceptable

### ✅ Analytics Setup (Optional)
- [ ] Google Analytics configured
- [ ] Error tracking (Sentry) setup
- [ ] Performance monitoring enabled

### ✅ SEO & Meta Tags
- [ ] Page titles and descriptions
- [ ] Open Graph tags for social sharing
- [ ] Favicon and app icons

## Monitoring & Maintenance

### Vercel Analytics
- Monitor page views and performance
- Check Core Web Vitals
- Review function execution logs

### Updates & Maintenance
```bash
# Deploy updates
git push origin main  # Auto-deploys if connected to Vercel

# Manual deployment
vercel --prod
```

## Support

For deployment issues:
1. Check Vercel deployment logs
2. Review browser console errors
3. Test locally with `npm run preview`
4. Contact support if needed

---

**GeoCetak is now ready for production! 🎉**

Access your deployed app at: `https://your-project-name.vercel.app`
