# Render Deployment - Admin Page Not Showing Fix

## Problem
When deploying to Render, the admin page (`/admin`) always shows the student page instead.

## Root Cause
The nginx location block for `/admin` wasn't matching all admin routes properly. Nginx location matching requires specific configuration to handle both `/admin` and `/admin/*` paths.

## Solution

The nginx configuration has been updated to properly handle admin routes using:
1. **Exact match** (`location = /admin`) for `/admin`
2. **Prefix match** (`location /admin/`) for `/admin/` with trailing slash
3. **Regex match** (`location ~ ^/admin`) for all `/admin/*` paths

## Updated Configuration

The `nginx.conf.template` now includes:

```nginx
# Exact match for /admin
location = /admin {
    try_files /admin.html =404;
}

# Prefix match for /admin/ (with trailing slash)
location /admin/ {
    try_files $uri $uri/ /admin.html;
}

# Regex match for /admin/* (any path starting with /admin/)
location ~ ^/admin {
    try_files $uri $uri/ /admin.html;
}
```

## Verification Steps

### 1. Check Build Output
After deployment, verify both HTML files are built:
- `student.html` ✅
- `admin.html` ✅

Check Render build logs for:
```
✓ student.html found
✓ admin.html found
```

### 2. Test URLs
After deployment, test these URLs:

**Student Portal:**
- `https://your-app.onrender.com/` → Should show student homepage
- `https://your-app.onrender.com/register` → Should show student registration
- `https://your-app.onrender.com/student` → Should show student homepage

**Admin Portal:**
- `https://your-app.onrender.com/admin` → Should show admin homepage
- `https://your-app.onrender.com/admin/login` → Should show admin login
- `https://your-app.onrender.com/admin/dashboard` → Should show admin dashboard

### 3. Check Browser Console
If admin page still shows student content:
1. Open browser DevTools (F12)
2. Go to Network tab
3. Navigate to `/admin`
4. Check which HTML file is being served
5. Should see `admin.html` loaded, not `student.html`

### 4. Check Render Logs
In Render Dashboard → Logs, you should see:
- No 404 errors for `/admin.html`
- Nginx serving requests correctly
- No routing errors

## Common Issues

### Issue: Still seeing student page on `/admin`

**Possible Causes:**
1. **Build didn't include admin.html**
   - Check build logs for "admin.html found"
   - Verify `npm run build:all` completed successfully

2. **Browser cache**
   - Clear browser cache (Ctrl+Shift+Delete)
   - Try incognito/private window
   - Hard refresh (Ctrl+F5)

3. **Old Docker image cached**
   - Render might be using cached build
   - Trigger a new deployment
   - Or clear Render's build cache

4. **nginx config not updated**
   - Verify `nginx.conf.template` has the new location blocks
   - Check that Dockerfile uses the template (not static nginx.conf)

### Issue: 404 on `/admin`

**Solution:**
- Verify `admin.html` exists in build output
- Check nginx error logs in Render
- Ensure location blocks are in correct order (more specific first)

### Issue: Admin page loads but shows blank

**Possible Causes:**
1. **JavaScript errors**
   - Check browser console for errors
   - Verify environment variables are set correctly
   - Check that `admin-main.tsx` is loading

2. **Asset paths incorrect**
   - Check Network tab for 404s on JS/CSS files
   - Verify build output includes assets folder

## Render-Specific Configuration

### Environment Variables
Make sure these are set in Render Dashboard → Environment:

```
VITE_PROCTORING_API_URL=https://your-backend-url.com
VITE_PROCTORING_WS_URL=wss://your-backend-url.com
VITE_SUPABASE_URL=https://ukwnvvuqmiqrjlghgxnf.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_PROJECT_ID=ukwnvvuqmiqrjlghgxnf
```

### Dockerfile Settings
In Render Dashboard → Settings:
- **Dockerfile Path:** `Dockerfile` (or path to your Dockerfile)
- **Docker Context:** `.` (or your frontend directory)
- **Build Command:** (Leave empty - Dockerfile handles this)
- **Start Command:** (Leave empty - Dockerfile handles this)

## Testing Locally

Before deploying to Render, test locally:

```bash
# Build the Docker image
docker build -t exameye-frontend .

# Run with PORT environment variable
docker run -p 3000:3000 -e PORT=3000 exameye-frontend

# Test URLs
# Student: http://localhost:3000/
# Admin: http://localhost:3000/admin
# Admin Login: http://localhost:3000/admin/login
```

## Debugging Commands

### Check what HTML is being served
```bash
# From your local machine, test the deployed URL
curl -I https://your-app.onrender.com/admin

# Should return 200 and serve admin.html
```

### Check nginx configuration
If you have shell access to the container:
```bash
# View the generated nginx config
cat /etc/nginx/conf.d/default.conf

# Test nginx configuration
nginx -t

# Check nginx error logs
tail -f /var/log/nginx/error.log
```

## After Fix

Once the fix is deployed:
1. ✅ `/admin` should show admin homepage
2. ✅ `/admin/login` should show admin login
3. ✅ `/admin/dashboard` should show admin dashboard (after login)
4. ✅ `/` should still show student homepage
5. ✅ All admin routes should work correctly

## Still Having Issues?

If the problem persists:
1. Check Render deployment logs for errors
2. Verify both `student.html` and `admin.html` are in the build
3. Test the Docker image locally first
4. Check browser console for JavaScript errors
5. Verify environment variables are set correctly

## Related Files

- `nginx.conf.template` - Nginx configuration template
- `Dockerfile` - Docker build configuration
- `docker-entrypoint.sh` - Entrypoint script for PORT substitution
- `scripts/build-all.js` - Build script that creates both HTML files

