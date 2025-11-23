# Complete Vercel Deployment Guide - Student & Admin Pages

This guide provides step-by-step instructions for deploying both the Student and Admin pages on Vercel.

## 🎯 Recommended Approach: Single Project with Both Apps

For your ExamEye Shield project, we recommend deploying both apps in a **single Vercel project** using path-based routing. This is simpler to manage and both apps share the same domain.

---

## 📋 Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier works)
2. **GitHub/GitLab/Bitbucket**: Your code must be in a Git repository
3. **Node.js**: Vercel will use Node.js 20 (configured in package.json)

---

## 🚀 Method 1: Single Project (Recommended)

Deploy both student and admin apps in one Vercel project with path-based routing.

### Step 1: Create vercel.json Configuration

Create a `vercel.json` file in your project root:

```json
{
  "buildCommand": "npm run build:all",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/admin",
      "destination": "/admin.html"
    },
    {
      "source": "/admin/:path*",
      "destination": "/admin.html"
    },
    {
      "source": "/student",
      "destination": "/student.html"
    },
    {
      "source": "/student/:path*",
      "destination": "/student.html"
    },
    {
      "source": "/",
      "destination": "/student.html"
    },
    {
      "source": "/(.*)",
      "destination": "/student.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

**Save this as:** `Exameye-Shield-frontend--main/vercel.json`

### Step 2: Deploy via Vercel Dashboard

1. **Go to Vercel Dashboard**
   - Visit [vercel.com](https://vercel.com)
   - Click **"Add New"** → **"Project"**

2. **Import Your Repository**
   - Connect your GitHub/GitLab/Bitbucket account
   - Select your repository: `Exameye-Shield-frontend--main`
   - Click **"Import"**

3. **Configure Project Settings**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `Exameye-Shield-frontend--main` (if your repo has subdirectories)
   - **Build Command**: `npm run build:all` (already in vercel.json)
   - **Output Directory**: `dist` (already in vercel.json)
   - **Install Command**: `npm install` (default)

4. **Set Environment Variables**
   - Click **"Environment Variables"**
   - Add the following variables (select **Production**, **Preview**, and **Development** for each):

   ```
   VITE_PROCTORING_API_URL=https://your-backend-url.com
   VITE_PROCTORING_WS_URL=wss://your-backend-url.com
   VITE_SUPABASE_URL=https://ukwnvvuqmiqrjlghgxnf.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   VITE_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   VITE_SUPABASE_PROJECT_ID=ukwnvvuqmiqrjlghgxnf
   ```

5. **Deploy**
   - Click **"Deploy"**
   - Wait for build to complete (2-5 minutes)

### Step 3: Verify Deployment

After deployment, test these URLs:

- **Student Portal**: `https://your-project.vercel.app/`
- **Student Portal (explicit)**: `https://your-project.vercel.app/student`
- **Admin Portal**: `https://your-project.vercel.app/admin`
- **Admin Login**: `https://your-project.vercel.app/admin/login`

---

## 🚀 Method 2: Separate Projects (Alternative)

Deploy student and admin as separate Vercel projects for independent scaling and domains.

### Deploy Student App

1. **Create First Project**
   - Go to Vercel Dashboard → **"Add New"** → **"Project"**
   - Import your repository
   - **Project Name**: `exameye-shield-student`
   - **Root Directory**: `Exameye-Shield-frontend--main`
   - **Build Command**: `npm run build:student`
   - **Output Directory**: `dist`
   - **Framework**: Vite

2. **Set Environment Variables** (same as above)

3. **Deploy**

4. **Result**: `https://exameye-shield-student.vercel.app`

### Deploy Admin App

1. **Create Second Project**
   - Go to Vercel Dashboard → **"Add New"** → **"Project"**
   - Import the **same repository**
   - **Project Name**: `exameye-shield-admin`
   - **Root Directory**: `Exameye-Shield-frontend--main`
   - **Build Command**: `npm run build:admin`
   - **Output Directory**: `dist`
   - **Framework**: Vite

2. **Set Environment Variables** (same as above)

3. **Deploy**

4. **Result**: `https://exameye-shield-admin.vercel.app`

---

## 🛠️ Method 3: Deploy via CLI

### Install Vercel CLI

```bash
npm install -g vercel
```

### Deploy Single Project (Both Apps)

```bash
# Navigate to your project
cd Exameye-Shield-frontend--main

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account/team)
# - Link to existing project? No
# - Project name: exameye-shield
# - Directory: ./
# - Override settings? No (uses vercel.json)

# Deploy to production
vercel --prod
```

### Deploy Separate Projects via CLI

**Student App:**
```bash
cd Exameye-Shield-frontend--main

# Deploy student app
vercel --name exameye-shield-student

# When prompted:
# - Override settings? Yes
# - Build Command: npm run build:student
# - Output Directory: dist
```

**Admin App:**
```bash
# In the same directory
vercel --name exameye-shield-admin

# When prompted:
# - Override settings? Yes
# - Build Command: npm run build:admin
# - Output Directory: dist
```

---

## 🔧 Environment Variables Setup

### Required Variables

Set these in **Vercel Dashboard** → **Project Settings** → **Environment Variables**:

| Variable Name | Example Value | Environments |
|--------------|---------------|--------------|
| `VITE_PROCTORING_API_URL` | `https://exameye-shield-backend.onrender.com` | All |
| `VITE_PROCTORING_WS_URL` | `wss://exameye-shield-backend.onrender.com` | All |
| `VITE_SUPABASE_URL` | `https://ukwnvvuqmiqrjlghgxnf.supabase.co` | All |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGci...` | All |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | `eyJhbGci...` | All |
| `VITE_SUPABASE_PROJECT_ID` | `ukwnvvuqmiqrjlghgxnf` | All |

### Important Notes

- ✅ Select **Production**, **Preview**, and **Development** for each variable
- ✅ Variables must start with `VITE_` for Vite projects
- ✅ **Redeploy** after adding/changing variables (they're baked into the build)
- ✅ Use `wss://` (not `ws://`) for WebSocket URLs on HTTPS

### Setting Variables via CLI

```bash
# Set a variable
vercel env add VITE_PROCTORING_API_URL production

# Or add to all environments
vercel env add VITE_PROCTORING_API_URL production preview development
```

---

## ✅ Verification & Testing

### 1. Check Build Logs

In Vercel Dashboard → **Deployments** → Click on deployment → **Build Logs**:

Look for:
```
✓ student.html found
✓ admin.html found
✅ Build complete! Both apps are ready in dist/
```

### 2. Test URLs

**Single Project:**
- `https://your-project.vercel.app/` → Student homepage
- `https://your-project.vercel.app/register` → Student registration
- `https://your-project.vercel.app/admin` → Admin homepage
- `https://your-project.vercel.app/admin/login` → Admin login
- `https://your-project.vercel.app/admin/dashboard` → Admin dashboard (after login)

**Separate Projects:**
- `https://exameye-shield-student.vercel.app/` → Student app
- `https://exameye-shield-admin.vercel.app/` → Admin app

### 3. Check Browser Console

Open DevTools (F12) → Console:
- Should see no errors
- Check that environment variables are loaded
- Verify API calls are going to correct backend URL

### 4. Test WebSocket Connection

1. Navigate to student exam page
2. Check console for:
   ```
   🔌 WebSocket URL configured: wss://your-backend-url.com
   ✅ Proctoring WebSocket connected successfully!
   ```

---

## 🌐 Custom Domains

### Single Project Setup

1. Go to **Project Settings** → **Domains**
2. Add your domain: `exameye-shield.com`
3. Add subdomains:
   - `student.exameye-shield.com` → Points to `/` (student app)
   - `admin.exameye-shield.com` → Points to `/admin` (admin app)

**Note**: For subdomain routing, you'll need to configure rewrites in `vercel.json` or use separate projects.

### Separate Projects Setup

1. **Student Project** → **Domains** → Add `student.exameye-shield.com`
2. **Admin Project** → **Domains** → Add `admin.exameye-shield.com`

---

## 🔄 Continuous Deployment

Vercel automatically deploys on every push to your repository:

- **Production**: Deploys from `main` or `master` branch
- **Preview**: Deploys from other branches and pull requests

### Manual Deployment

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel
```

---

## 🐛 Troubleshooting

### Issue: Admin page shows student page

**Solution:**
1. Verify `vercel.json` has correct rewrites
2. Check that `admin.html` exists in build output
3. Clear browser cache and hard refresh (Ctrl+F5)
4. Check Vercel build logs for errors

### Issue: 404 on routes

**Solution:**
1. Verify `vercel.json` rewrites are configured
2. Check that both `student.html` and `admin.html` are in `dist/`
3. Ensure rewrites use correct paths

### Issue: Environment variables not working

**Solution:**
1. Variables must start with `VITE_` prefix
2. **Redeploy** after adding variables (they're baked into build)
3. Check build logs to verify variables are being used
4. Verify variables are set for correct environments (Production/Preview/Development)

### Issue: Build fails

**Solution:**
1. Check build logs in Vercel dashboard
2. Verify `package-lock.json` is committed
3. Ensure Node.js version is compatible (20.x)
4. Check that all dependencies are in `package.json`

### Issue: WebSocket connection fails

**Solution:**
1. Verify `VITE_PROCTORING_WS_URL` uses `wss://` (not `ws://`)
2. Check backend is accessible and running
3. Verify CORS is configured on backend
4. Check browser console for WebSocket errors

### Issue: API calls failing

**Solution:**
1. Verify `VITE_PROCTORING_API_URL` is set correctly
2. Check backend is running and accessible
3. Verify CORS configuration on backend
4. Check Network tab in DevTools for actual requests

---

## 📊 Monitoring & Analytics

### Vercel Analytics

1. Go to **Project Settings** → **Analytics**
2. Enable Vercel Analytics (free tier available)
3. View real-time traffic and performance metrics

### Logs

- **Build Logs**: Vercel Dashboard → Deployments → Build Logs
- **Function Logs**: Vercel Dashboard → Deployments → Function Logs
- **Real-time Logs**: Vercel Dashboard → Deployments → View Logs

---

## 🔐 Security Best Practices

1. ✅ Never commit environment variables to Git
2. ✅ Use Vercel's environment variable system
3. ✅ Enable Vercel's security headers (already in vercel.json)
4. ✅ Use HTTPS (automatic on Vercel)
5. ✅ Regularly update dependencies

---

## 📝 Quick Reference

### Single Project Commands

```bash
# Deploy
vercel --prod

# View deployments
vercel ls

# View logs
vercel logs

# Link to project
vercel link
```

### Project URLs

After deployment, you'll get:
- **Production**: `https://your-project.vercel.app`
- **Preview**: `https://your-project-git-branch.vercel.app`

---

## 🎉 Success Checklist

After deployment, verify:

- [ ] Build completed successfully
- [ ] Both `student.html` and `admin.html` are in build output
- [ ] Student page loads at `/`
- [ ] Admin page loads at `/admin`
- [ ] Environment variables are set
- [ ] WebSocket connection works
- [ ] API calls succeed
- [ ] No console errors
- [ ] Custom domain configured (if applicable)

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite on Vercel](https://vercel.com/guides/deploying-vite)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vercel Routing](https://vercel.com/docs/concepts/projects/project-configuration#rewrites)

---

## 💡 Tips

1. **Use Single Project**: Easier to manage, both apps share same domain
2. **Set Variables Early**: Add environment variables before first deployment
3. **Test Preview Deployments**: Use preview URLs to test before production
4. **Monitor Build Logs**: Check logs if something doesn't work
5. **Use Custom Domains**: More professional than `.vercel.app` subdomain

---

## 🆘 Need Help?

If you encounter issues:
1. Check Vercel build logs
2. Check browser console for errors
3. Verify environment variables are set
4. Test locally first: `npm run build:all && npm run preview`
5. Check Vercel status page: [status.vercel.com](https://status.vercel.com)

