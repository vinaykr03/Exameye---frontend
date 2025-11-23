# Netlify Deployment Guide

This guide explains how to deploy your ExamEye Shield application to Netlify with separate entry points for student and admin login pages.

## Overview

Your application has two separate entry points:
- **Student Portal**: `student.html` - Main entry point for students
- **Admin Portal**: `admin.html` - Main entry point for administrators

Both apps are deployed to a single Netlify site with path-based routing.

## Deployment URLs

After deployment, you'll have:
- **Student Login**: `https://your-site.netlify.app/` or `https://your-site.netlify.app/student`
- **Admin Login**: `https://your-site.netlify.app/admin`

## Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   ```bash
   git add .
   git commit -m "Configure Netlify deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your Git repository

3. **Configure Build Settings**
   - **Base directory**: `Exameye-Shield-frontend--main` (if your frontend is in a subdirectory)
   - **Build command**: `npm run build:all`
   - **Publish directory**: `dist`
   - **Node version**: `18` or `20` (set in Environment variables if needed)
   
   **Note**: If your repository root contains both frontend and backend folders, you MUST set the **Base directory** to `Exameye-Shield-frontend--main` so Netlify knows where to find `package.json` and run the build command.

4. **Deploy**
   - Click "Deploy site"
   - Netlify will automatically detect `netlify.toml` and use those settings

### Option 2: Deploy via Netlify CLI

1. **Install Netlify CLI** (if not already installed)
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**
   ```bash
   netlify login
   ```

3. **Initialize and Deploy**
   ```bash
   cd Exameye-Shield-frontend--main
   npm install
   npm run build:all
   netlify deploy --prod
   ```

## How It Works

### Build Process

The `build:all` script:
1. Builds the student app to a temporary directory
2. Builds the admin app to a temporary directory
3. Merges both builds into a single `dist` folder
4. Ensures both `student.html` and `admin.html` are present

### Routing Configuration

The `netlify.toml` file configures:
- **Root path (`/`)**: Serves `student.html` (student portal)
- **`/admin/*` paths**: Serves `admin.html` (admin portal)
- **`/student/*` paths**: Serves `student.html` (student portal)
- **SPA fallbacks**: Handles client-side routing for both apps

### File Structure After Build

```
dist/
├── student.html          # Student app entry point
├── admin.html            # Admin app entry point
├── assets/               # Shared assets (JS, CSS, images)
│   ├── index-*.js
│   ├── index-*.css
│   └── ...
└── ...
```

## Environment Variables

If you need to set environment variables in Netlify:

1. Go to **Site settings** → **Environment variables**
2. Add any required variables (e.g., `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
3. Redeploy your site

## Custom Domain Setup

1. Go to **Site settings** → **Domain management**
2. Add your custom domain
3. Configure DNS as instructed by Netlify

## Troubleshooting

### Build Fails

- Check that `npm run build:all` works locally
- Verify Node.js version (should be 18+)
- Check Netlify build logs for specific errors

### Routing Issues

- Ensure `netlify.toml` is in the root of your project
- Verify both `student.html` and `admin.html` exist in the build output
- Check Netlify redirects in **Site settings** → **Redirects**

### Assets Not Loading

- Verify that assets are being copied correctly during build
- Check browser console for 404 errors
- Ensure asset paths are relative (not absolute)

## Testing Locally

Before deploying, test the build locally:

```bash
npm run build:all
npx serve dist
```

Then visit:
- `http://localhost:3000/` - Student portal
- `http://localhost:3000/admin` - Admin portal

## Additional Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Netlify Redirects](https://docs.netlify.com/routing/redirects/)
- [Vite Multi-Page Apps](https://vitejs.dev/guide/build.html#multi-page-app)

