# Railway Docker Deployment Guide

## Overview

This guide explains how to deploy the ExamEye Shield frontend to Railway using Docker. The Dockerfile is configured to work with Railway's dynamic PORT environment variable.

## How It Works

Railway automatically assigns a dynamic PORT to your container. The Docker setup:
1. Uses an nginx template that accepts the PORT variable
2. Substitutes the PORT at runtime using `envsubst`
3. Starts nginx on the assigned port

## What You're Seeing in the Logs

The logs you're seeing are **normal** - they indicate:
- ✅ Nginx is starting successfully
- ✅ Worker processes are being created
- ✅ Configuration is complete
- ✅ Server is ready to accept connections

The many "start worker process" messages are normal - nginx creates multiple worker processes for handling requests efficiently.

## Railway Configuration

### 1. Environment Variables

Set these in Railway Dashboard → **Variables**:

```
VITE_PROCTORING_API_URL=https://your-backend-url.com
VITE_PROCTORING_WS_URL=wss://your-backend-url.com
VITE_SUPABASE_URL=https://ukwnvvuqmiqrjlghgxnf.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
VITE_SUPABASE_PROJECT_ID=ukwnvvuqmiqrjlghgxnf
```

**Important:** These must be set as **build-time** variables because Vite embeds them during the build process.

### 2. Railway Settings

In Railway Dashboard → **Settings** → **Service**:
- **Build Command**: (Leave empty - Dockerfile handles this)
- **Start Command**: (Leave empty - Dockerfile handles this)
- **Dockerfile Path**: `Dockerfile` (or `Exameye-Shield-frontend--main/Dockerfile` if in subdirectory)

### 3. Port Configuration

Railway automatically:
- Sets the `PORT` environment variable
- Routes traffic to your container on that port
- The Dockerfile is configured to use this PORT automatically

**No manual port configuration needed!**

## Verifying Deployment

### Check Logs

After deployment, check Railway logs. You should see:
```
✅ Configuration complete; ready for start up
✅ nginx/1.29.3
✅ start worker processes
```

### Test URLs

Once deployed, Railway will provide a public URL. Test:
- **Student Portal**: `https://your-app.railway.app/`
- **Admin Portal**: `https://your-app.railway.app/admin`

### Common Issues

#### Issue: "502 Bad Gateway" or "Connection Refused"
**Cause:** Nginx not listening on Railway's PORT
**Solution:** The updated Dockerfile should fix this. Make sure you're using the latest version with `docker-entrypoint.sh`

#### Issue: "404 Not Found" on Routes
**Cause:** SPA routing not configured
**Solution:** The nginx config includes `try_files` for SPA routing. If issues persist, check that `nginx.conf.template` is being used correctly.

#### Issue: Environment Variables Not Working
**Cause:** Variables not set at build time
**Solution:** 
1. Set variables in Railway Dashboard → **Variables**
2. Make sure they start with `VITE_` prefix
3. Redeploy after adding variables

#### Issue: Build Fails
**Cause:** Missing dependencies or build errors
**Solution:**
1. Check Railway build logs for specific errors
2. Ensure `package-lock.json` is committed
3. Verify all dependencies are in `package.json`

## Dockerfile Changes for Railway

The Dockerfile has been updated to:
1. Use `nginx.conf.template` instead of static `nginx.conf`
2. Include `docker-entrypoint.sh` to substitute PORT at runtime
3. Install `gettext` package for `envsubst` command

## Local Testing

To test the Railway setup locally:

```bash
# Build the image
docker build -t exameye-frontend .

# Run with PORT environment variable (simulating Railway)
docker run -p 3000:3000 -e PORT=3000 exameye-frontend

# Test URLs
# Student: http://localhost:3000/
# Admin: http://localhost:3000/admin
```

## Monitoring

### Check Railway Logs
1. Go to Railway Dashboard → Your Service
2. Click **Deployments** → Latest deployment
3. Click **View Logs**

### What to Look For
- ✅ "Configuration complete; ready for start up"
- ✅ "nginx/1.29.3"
- ✅ No error messages
- ✅ Worker processes starting

### Health Check

Railway automatically health checks your service. The nginx server should respond with HTTP 200 on any route.

## Troubleshooting

### Nginx Not Starting
If nginx fails to start:
1. Check Railway logs for error messages
2. Verify `docker-entrypoint.sh` has execute permissions
3. Ensure `nginx.conf.template` exists

### Port Issues
If you see port-related errors:
1. Railway sets PORT automatically - don't override it
2. The entrypoint script handles PORT substitution
3. Check that `envsubst` is available (installed via `gettext` package)

### Build Issues
If the build fails:
1. Check that all files are committed (Dockerfile, nginx.conf.template, docker-entrypoint.sh)
2. Verify environment variables are set in Railway
3. Check build logs for specific npm/node errors

## Next Steps

After successful deployment:
1. ✅ Test both student and admin portals
2. ✅ Verify environment variables are working
3. ✅ Test WebSocket connections (if applicable)
4. ✅ Set up custom domain (optional)
5. ✅ Configure monitoring/alerts (optional)

## Support

If you encounter issues:
1. Check Railway logs first
2. Verify all environment variables are set
3. Ensure you're using the latest Dockerfile
4. Check that `nginx.conf.template` and `docker-entrypoint.sh` are in your repository

