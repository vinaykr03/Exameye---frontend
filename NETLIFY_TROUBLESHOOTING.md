# Netlify Admin Route Troubleshooting

If the admin login page is not accessible on Netlify, follow these steps:

## Step 1: Verify Build Output

Check the Netlify build logs to ensure both HTML files are created:

1. Go to **Netlify Dashboard** → Your site → **Deploys** → Click on the latest deploy
2. Check the build logs for:
   ```
   ✓ student.html found
   ✓ admin.html found
   ```

If you see errors about missing `admin.html`, the build failed. Check the build logs for errors.

## Step 2: Verify Files in Deploy

1. In Netlify Dashboard → **Deploys** → Click on a deploy
2. Click **Browse published files** or **View deploy log**
3. Verify both files exist:
   - `student.html`
   - `admin.html`

## Step 3: Test URLs Directly

Try accessing these URLs directly (replace with your site URL):

- Student: `https://your-site.netlify.app/student.html`
- Admin: `https://your-site.netlify.app/admin.html`

If `admin.html` returns 404, the file wasn't built or deployed.

## Step 4: Check Redirects

1. Go to **Site settings** → **Redirects**
2. Verify these redirects exist (in this order):
   - `/admin` → `/admin.html` (200)
   - `/admin/*` → `/admin.html` (200)
   - `/student` → `/student.html` (200)
   - `/student/*` → `/student.html` (200)
   - `/` → `/student.html` (200)
   - `/*` → `/student.html` (200)

## Step 5: Clear Cache and Redeploy

1. Go to **Deploys** → **Trigger deploy** → **Clear cache and deploy site**
2. Wait for the build to complete
3. Test the admin URL again: `https://your-site.netlify.app/admin`

## Step 6: Test Locally First

Before deploying, test the build locally:

```bash
cd Exameye-Shield-frontend--main
npm run build:all
npx serve dist
```

Then test:
- `http://localhost:3000/` → Should show student login
- `http://localhost:3000/admin` → Should show admin login
- `http://localhost:3000/admin.html` → Should show admin login

## Common Issues

### Issue: Build fails with "admin.html not found"

**Solution**: Check that `admin.html` exists in the project root and that the build script runs successfully.

### Issue: Admin route shows student page

**Solution**: The redirects might not be working. Check the redirect order in `netlify.toml` - `/admin` must come before `/admin/*` and both must come before the catch-all `/*`.

### Issue: 404 on /admin

**Solution**: 
1. Verify `admin.html` exists in the deployed files
2. Check that redirects are configured correctly
3. Try accessing `/admin.html` directly to verify the file exists

### Issue: Build succeeds but admin.html missing

**Solution**: Check the build logs for errors during the admin build step. The `build:all` script should fail if `admin.html` is missing.

## Quick Fix: Force Redeploy

If nothing else works:

1. **Clear build cache**: Site settings → Build & deploy → Clear build cache
2. **Trigger new deploy**: Deploys → Trigger deploy → Clear cache and deploy site
3. **Wait for build** and test again

## Verify Configuration

Your `netlify.toml` should have:

```toml
[build]
  command = "npm run build:all"
  publish = "dist"

[[redirects]]
  from = "/admin"
  to = "/admin.html"
  status = 200

[[redirects]]
  from = "/admin/*"
  to = "/admin.html"
  status = 200
```

Make sure the redirects are in the correct order (more specific first).

