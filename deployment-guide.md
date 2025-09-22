# 🚀 GeoCetak Deployment Guide

## Prerequisites

1. **Node.js** (v18 atau lebih tinggi)
2. **Supabase Account** dengan project yang sudah dibuat
3. **Google Cloud Account** untuk Gemini API
4. **Domain** (opsional, untuk production)

## Environment Setup

### 1. Frontend Environment Variables

Buat file `.env` di root project:

```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# App Configuration
VITE_APP_NAME=GeoCetak
VITE_APP_VERSION=1.0.0
VITE_ENVIRONMENT=production

# Analytics (optional)
VITE_GOOGLE_ANALYTICS_ID=your_ga_id
```

### 2. Supabase Environment Variables

Di Supabase Dashboard > Settings > Environment Variables:

```env
GEMINI_API_KEY=your_google_gemini_api_key
```

## Database Setup

### 1. Run Migrations

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 2. Enable Row Level Security

Pastikan RLS sudah aktif untuk semua tabel (sudah included di migration).

## Deployment Steps

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
# Build project
npm run build

# Deploy to Vercel
vercel --prod
```

3. **Configure Environment Variables**
   - Masuk ke Vercel Dashboard
   - Tambahkan semua environment variables
   - Redeploy

### Option 2: Netlify

1. **Build Project**
```bash
npm run build
```

2. **Deploy via Netlify CLI**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### Option 3: Manual Server

1. **Build Project**
```bash
npm run build
```

2. **Serve Static Files**
```bash
# Using serve
npm install -g serve
serve -s dist -l 3000

# Using nginx (production)
# Copy dist/ contents to /var/www/html/
```

## Post-Deployment Checklist

### 1. Test Core Features

- [ ] User authentication
- [ ] 3D cylinder visualization
- [ ] Parameter controls (radius, height)
- [ ] Tab navigation (Concept, Net, Formula, Quiz)
- [ ] Essay evaluation with AI
- [ ] Progress tracking
- [ ] XP system

### 2. Performance Optimization

```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check lighthouse scores
npx lighthouse https://your-domain.com --view
```

### 3. Security Configuration

- [ ] CORS settings di Supabase
- [ ] API rate limiting
- [ ] Input validation
- [ ] SQL injection protection (RLS)

### 4. Monitoring Setup

```javascript
// Add to main.tsx for error tracking
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.VITE_ENVIRONMENT,
});
```

## Performance Optimizations

### 1. Code Splitting

```javascript
// Lazy load heavy components
const CylinderLessonLayout = lazy(() => import('./pages/CylinderLessonLayout'));
const EssayPracticePage = lazy(() => import('./pages/EssayPracticePage'));
```

### 2. Image Optimization

```bash
# Optimize images
npm install -g imagemin-cli
imagemin src/assets/images/* --out-dir=dist/assets/images
```

### 3. Caching Strategy

```javascript
// Service Worker for caching
// sw.js
const CACHE_NAME = 'geocetak-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

## Monitoring & Analytics

### 1. Performance Monitoring

```javascript
// Add to App.tsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### 2. User Analytics

```javascript
// Track user interactions
import { analytics } from './services/analytics';

// Track page views
analytics.page('Cylinder Lesson');

// Track events
analytics.track('Parameter Changed', {
  parameter: 'radius',
  value: 2.5,
});
```

## Troubleshooting

### Common Issues

1. **3D Models Not Loading**
   - Check Three.js dependencies
   - Verify WebGL support
   - Check console for errors

2. **AI Evaluation Failing**
   - Verify Gemini API key
   - Check Supabase Function logs
   - Validate request format

3. **Slow Performance**
   - Enable lazy loading
   - Optimize bundle size
   - Check memory leaks

### Debug Commands

```bash
# Check build issues
npm run build -- --debug

# Analyze dependencies
npm ls --depth=0

# Check for security vulnerabilities
npm audit

# Performance profiling
npm run dev -- --profile
```

## Scaling Considerations

### 1. Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX CONCURRENTLY idx_user_progress_performance 
ON user_progress(user_id, module_id, last_accessed);

-- Partition large tables
CREATE TABLE learning_sessions_2024 PARTITION OF learning_sessions
FOR VALUES FROM ('2024-01-01') TO ('2025-01-01');
```

### 2. CDN Setup

```javascript
// Use CDN for static assets
const ASSET_URL = import.meta.env.PROD 
  ? 'https://cdn.your-domain.com' 
  : '/src/assets';
```

### 3. Load Balancing

```nginx
# nginx.conf for load balancing
upstream geocetak_backend {
    server 127.0.0.1:3000;
    server 127.0.0.1:3001;
}

server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://geocetak_backend;
    }
}
```

## Maintenance

### 1. Regular Updates

```bash
# Update dependencies monthly
npm update
npm audit fix

# Update Supabase
supabase update
```

### 2. Backup Strategy

```bash
# Backup database
supabase db dump > backup-$(date +%Y%m%d).sql

# Backup user uploads
aws s3 sync s3://your-bucket s3://backup-bucket
```

### 3. Health Checks

```javascript
// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
});
```

---

## 🎉 Congratulations!

Aplikasi GeoCetak Anda sekarang siap untuk production! 

Untuk support dan updates, silakan check:
- 📚 [Documentation](./docs/)
- 🐛 [Issue Tracker](./issues/)
- 💬 [Community](./discussions/)
