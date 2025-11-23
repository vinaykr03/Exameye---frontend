# Fixing 404 Error on Vercel

## Common Causes of 404 on Vercel

### 1. **Root Directory Not Set** (Most Common)

If your project is in a subdirectory (like `Exameye-Shield-frontend--main`), Vercel needs to know where to find your files.

**Fix:**
1. Go to Vercel Dashboard → Your Project → **Settings** → **General**
2. Find **Root Directory**
3. Set it to: `Exameye-Shield-frontend--main`
4. Click **Save**
5. **Redeploy** your project

### 2. **Build Failed or Output Directory Wrong**

**Check Build Logs:**
1. Go to Vercel Dashboard → **Deployments**
2. Click on the latest deployment
3. Check **Build Logs** for errors
4. Look for:
   - `✓ student.html found`
   - `✓ admin.html found`
   - `✅ Build complete!`

**If build failed:**
- Check that `package-lock.json` is committed
- Verify Node.js version (should be 20.x)
- Check for missing dependencies

### 3. **vercel.json Not in Root**

The `vercel.json` must be in the **repository root**, not in the subdirectory.

**If your repo structure is:**
```
your-repo/
├── Exameye-Shield-frontend--main/
│   ├── vercel.json  ❌ WRONG LOCATION
│   ├── package.json
│   └── ...
```

**Fix:** Move `vercel.json` to repository root OR set Root Directory in Vercel.

### 4. **Output Directory Mismatch**

**Check:**
1. Vercel Dashboard → **Settings** → **General**
2. **Output Directory** should be: `dist` (or `Exameye-Shield-frontend--main/dist` if using root directory)
3. **Build Command** should be: `npm run build:all`

---

## Step-by-Step Fix

### Step 1: Verify Project Structure

Your project structure should be:
```
Exameye-Shield-frontend--main/
├── vercel.json          ✅
├── package.json         ✅
├── dist/                (created after build)
│   ├── student.html     ✅
│   ├── admin.html       ✅
│   └── assets/          ✅
└── ...
```

### Step 2: Configure Vercel Settings

1. **Go to Vercel Dashboard**
   - Navigate to your project: `exameye-frontend`

2. **Check Root Directory**
   - **Settings** → **General** → **Root Directory**
   - If your repo root is the project: Leave **empty** or set to `.`
   - If your project is in a subdirectory: Set to `Exameye-Shield-frontend--main`

3. **Verify Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build:all`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Check Environment Variables**
   - **Settings** → **Environment Variables**
   - Ensure all `VITE_*` variables are set
   - Select **Production**, **Preview**, and **Development**

### Step 3: Check Build Logs

1. Go to **Deployments** → Latest deployment
2. Click **Build Logs**
3. Look for these success messages:
   ```
   ✓ student.html found
   ✓ admin.html found
   ✅ Build complete! Both apps are ready in dist/
   ```

4. If you see errors:
   - Copy the error message
   - Check the troubleshooting section below

### Step 4: Redeploy

After fixing settings:
1. Go to **Deployments**
2. Click **"..."** on latest deployment
3. Select **"Redeploy"**
4. Or push a new commit to trigger automatic deployment

---

## Quick Fixes

### Fix 1: Update vercel.json with Root Directory

If your project is in a subdirectory, update `vercel.json`:

```json
{
  "buildCommand": "npm run build:all",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rootDirectory": "Exameye-Shield-frontend--main",
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
  ]
}
```

**Note:** `rootDirectory` in vercel.json is not standard. Instead, set it in Vercel Dashboard.

### Fix 2: Verify Build Locally First

Test the build locally before deploying:

```bash
cd Exameye-Shield-frontend--main
npm install
npm run build:all

# Check if files exist
ls -la dist/
# Should see: student.html, admin.html, assets/

# Test locally
npm run preview
# Visit http://localhost:4173
```

If local build fails, fix those issues first.

### Fix 3: Check File Paths

Verify that `vercel.json` is in the correct location:

**If your repo structure is:**
```
your-repo/
└── Exameye-Shield-frontend--main/
    ├── vercel.json  ✅ Correct
    ├── package.json
    └── ...
```

**Then in Vercel Dashboard:**
- **Root Directory**: `Exameye-Shield-frontend--main`

**If your repo structure is:**
```
your-repo/
├── vercel.json  ✅ Correct (at root)
├── Exameye-Shield-frontend--main/
│   ├── package.json
│   └── ...
```

**Then in Vercel Dashboard:**
- **Root Directory**: `.` (empty or root)

---

## Common Error Messages

### "Build Command Not Found"
**Solution:** 
- Check that `package.json` has `build:all` script
- Verify Root Directory is set correctly

### "Output Directory Not Found"
**Solution:**
- Check that build completed successfully
- Verify Output Directory is `dist` (not `Exameye-Shield-frontend--main/dist`)
- Check build logs for actual output location

### "Cannot find module"
**Solution:**
- Ensure `package-lock.json` is committed
- Check that all dependencies are in `package.json`
- Try `npm install` locally to verify

### "404: NOT_FOUND" (Your Current Error)
**Most Likely Causes:**
1. ✅ Root Directory not set (if project is in subdirectory)
2. ✅ Build failed (check build logs)
3. ✅ Output Directory wrong
4. ✅ vercel.json not being read

---

## Verification Checklist

After fixing, verify:

- [ ] Root Directory is set correctly in Vercel Dashboard
- [ ] Build Command is `npm run build:all`
- [ ] Output Directory is `dist`
- [ ] Build logs show "✓ student.html found" and "✓ admin.html found"
- [ ] Environment variables are set
- [ ] `vercel.json` exists and is in correct location
- [ ] Build completes successfully (no errors)
- [ ] Deployment shows "Ready" status

---

## Still Not Working?

### Debug Steps:

1. **Check Deployment Details**
   - Vercel Dashboard → Deployments → Click deployment
   - Check **Build Logs** tab
   - Check **Function Logs** tab
   - Look for any error messages

2. **Test Build Locally**
   ```bash
   npm run build:all
   ls dist/
   # Should see student.html and admin.html
   ```

3. **Check Vercel Project Settings**
   - Framework: Vite
   - Node.js Version: 20.x
   - Build Command: `npm run build:all`
   - Output Directory: `dist`

4. **Try Manual Deployment**
   ```bash
   vercel --prod --debug
   ```

5. **Check File Structure**
   - Ensure `vercel.json` is committed to Git
   - Verify it's in the correct location
   - Check that it's not in `.gitignore`

---

## Quick Test

After fixing, test these URLs:

- `https://exameye-frontend.vercel.app/` → Should show student page
- `https://exameye-frontend.vercel.app/admin` → Should show admin page
- `https://exameye-frontend.vercel.app/student.html` → Should show student page directly

If `/student.html` works but `/` doesn't, it's a routing issue.
If `/student.html` doesn't work, it's a build/output directory issue.

