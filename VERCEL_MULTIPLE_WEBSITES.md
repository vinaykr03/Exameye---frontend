# How to Deploy Two Websites on Vercel

There are several ways to deploy multiple websites on Vercel. Here are the most common approaches:

## Option 1: Deploy as Separate Projects (Recommended)

This is the simplest approach - each website gets its own Vercel project with its own domain.

### Steps:

1. **Deploy First Website:**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click **"Add New"** → **"Project"**
   - Import your first project (e.g., your frontend)
   - Configure build settings:
     - **Framework Preset**: Vite
     - **Build Command**: `npm run build:all` (or `npm run build`)
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Click **"Deploy"**
   - Your first site will be live at: `https://your-project-name.vercel.app`

2. **Deploy Second Website:**
   - Click **"Add New"** → **"Project"** again
   - Import your second project (e.g., your backend or another frontend)
   - Configure build settings for the second project
   - Click **"Deploy"**
   - Your second site will be live at: `https://your-second-project-name.vercel.app`

### Custom Domains:
- Each project can have its own custom domain
- Go to **Project Settings** → **Domains** to add custom domains
- Example: `student.yourdomain.com` and `admin.yourdomain.com`

---

## Option 2: Monorepo with Multiple Apps

If you have multiple apps in one repository (like your student and admin apps), you can deploy them as separate projects from the same repo.

### Setup:

1. **Create `vercel.json` for Student App:**
   ```json
   {
     "buildCommand": "npm run build:student",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

2. **Deploy Student App:**
   - Import your repository
   - Set **Root Directory** to your project root
   - Set **Build Command**: `npm run build:student`
   - Set **Output Directory**: `dist`
   - Deploy

3. **Deploy Admin App:**
   - Click **"Add New"** → **"Project"**
   - Import the **same repository**
   - Set **Root Directory** to your project root
   - Set **Build Command**: `npm run build:admin`
   - Set **Output Directory**: `dist`
   - Deploy

### Using vercel.json for Each App:

You can also create separate configs:

**For Student App** (`vercel-student.json`):
```json
{
  "buildCommand": "npm run build:student",
  "outputDirectory": "dist"
}
```

**For Admin App** (`vercel-admin.json`):
```json
{
  "buildCommand": "npm run build:admin",
  "outputDirectory": "dist"
}
```

Then specify the config file in Vercel project settings.

---

## Option 3: Single Project with Multiple Routes

If you want both apps in one Vercel project (like your current setup), you can use rewrites:

### Create `vercel.json`:

```json
{
  "buildCommand": "npm run build:all",
  "outputDirectory": "dist",
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
    }
  ]
}
```

This gives you:
- `https://your-site.vercel.app/` → Student app
- `https://your-site.vercel.app/student` → Student app
- `https://your-site.vercel.app/admin` → Admin app

---

## Option 4: Deploy Frontend and Backend Separately

If you want to deploy your frontend and backend as separate Vercel projects:

### Frontend (React/Vite):
- **Framework**: Vite
- **Build Command**: `npm run build:all`
- **Output Directory**: `dist`
- **Node Version**: 18.x or higher

### Backend (Python/Flask):
- **Framework**: Other
- **Build Command**: `pip install -r requirements.txt`
- **Output Directory**: (leave empty for serverless)
- **Python Version**: 3.9 or higher
- **Install Command**: `pip install -r requirements.txt`

**Note**: For Python backends, you may need to create a `vercel.json`:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.py"
    }
  ]
}
```

---

## Quick Start: Deploy Your Current Project

Based on your setup, here's the fastest way:

### 1. Deploy Student App:
```bash
# In your project directory
cd Exameye-Shield-frontend--main

# Install Vercel CLI (if not installed)
npm i -g vercel

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (your account)
# - Link to existing project? No
# - Project name: exameye-shield-student
# - Directory: ./
# - Override settings? No
```

### 2. Deploy Admin App:
```bash
# In the same directory
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: exameye-shield-admin
# - Override settings? Yes
# - Build Command: npm run build:admin
# - Output Directory: dist
```

---

## Environment Variables

For each project, set environment variables:

1. Go to **Project Settings** → **Environment Variables**
2. Add all variables with `VITE_` prefix
3. Select environments: **Production**, **Preview**, **Development**
4. **Redeploy** after adding variables

---

## Managing Multiple Projects

### Dashboard:
- All your projects appear in your Vercel dashboard
- Each has its own:
  - Deployment history
  - Environment variables
  - Custom domains
  - Analytics
  - Logs

### CLI:
```bash
# List all projects
vercel ls

# Switch between projects
vercel link

# Deploy specific project
vercel --prod
```

---

## Best Practices

1. **Separate Projects**: Use separate projects for different apps (easier to manage)
2. **Custom Domains**: Use subdomains like `student.yourdomain.com` and `admin.yourdomain.com`
3. **Environment Variables**: Set them per project, not globally
4. **Build Optimization**: Use appropriate build commands for each app
5. **Monitoring**: Set up separate analytics for each project

---

## Troubleshooting

### Issue: Both apps showing same content
- **Solution**: Make sure you're using separate build commands (`build:student` vs `build:admin`)

### Issue: Environment variables not working
- **Solution**: Variables must start with `VITE_` for Vite projects, and you must redeploy after adding them

### Issue: Build failing
- **Solution**: Check build logs in Vercel dashboard, ensure all dependencies are in `package.json`

### Issue: Routes not working
- **Solution**: Check `vercel.json` rewrites configuration, ensure HTML files are in output directory

---

## Example: Your Current Setup

For your Exameye-Shield project, I recommend:

1. **Student App Project:**
   - Build: `npm run build:student`
   - Domain: `student.exameye-shield.com` (or your custom domain)

2. **Admin App Project:**
   - Build: `npm run build:admin`
   - Domain: `admin.exameye-shield.com` (or your custom domain)

Both can share the same repository but deploy independently!

