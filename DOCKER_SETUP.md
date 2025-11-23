# Frontend Docker Setup

This Dockerfile creates a production-ready container that serves both the **Student** and **Admin** applications from a single container using path-based routing. It supports **dynamic ports** for platforms like Railway, Render, Fly.io, and Heroku.

## Build Stages

1. **Builder Stage**: Uses Node.js 20 to install dependencies and build both Vite apps (student and admin)
2. **Production Stage**: Uses nginx Alpine to serve the static files efficiently with path-based routing and dynamic PORT support

## Building the Docker Image

### Basic Build
```bash
cd frontend
docker build -t exameye-frontend .
```

### Build with Tag
```bash
docker build -t exameye-frontend:latest .
```

## Running the Container

### Basic Run
```bash
docker run -p 3000:80 exameye-frontend
```

Both apps will be available:
- **Student Portal**: `http://localhost:3000/` or `http://localhost:3000/student`
- **Admin Portal**: `http://localhost:3000/admin`

### Run with Custom Port
```bash
docker run -p 8080:80 exameye-frontend
```

### Run with Dynamic PORT (Simulating Railway/Render)
```bash
# Simulate platforms that use dynamic PORT environment variable
docker run -p 3000:3000 -e PORT=3000 exameye-frontend
```

### Run in Background (Detached)
```bash
docker run -d -p 3000:80 --name frontend exameye-frontend
```

## Environment Variables

The Dockerfile includes default values for Supabase configuration. You can override them at build time if needed.

### Default Values
- `VITE_SUPABASE_URL`: `https://ukwnvvuqmiqrjlghgxnf.supabase.co`
- `VITE_SUPABASE_ANON_KEY`: (pre-configured)
- `VITE_PROCTORING_API_URL`: `http://localhost:8001` (⚠️ **Change this for production!**)

### Build with Custom Environment Variables

```bash
docker build --build-arg VITE_PROCTORING_API_URL=https://exameye-shield-backend.onrender.com \
             --build-arg VITE_PROCTORING_WS_URL=wss://exameye-shield-backend.onrender.com \
             --build-arg VITE_SUPABASE_URL=https://ukwnvvuqmiqrjlghgxnf.supabase.co \
             --build-arg VITE_SUPABASE_ANON_KEY=your-anon-key \
             -t exameye-frontend .
```

**Note**: 
- Vite requires environment variables at **build time**, not runtime
- For production, **always override** `VITE_PROCTORING_API_URL` with your actual backend URL (not `localhost`)
- The default `localhost:8001` is only suitable for local development
- If running Docker and connecting to a backend on the host machine, use `host.docker.internal:8001` instead of `localhost:8001`

## Using with Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:80"
    environment:
      - VITE_PROCTORING_API_URL=https://exameye-shield-backend.onrender.com
      - VITE_PROCTORING_WS_URL=wss://exameye-shield-backend.onrender.com
    restart: unless-stopped
```

## Deployment Platforms

### Railway ✅
- Railway will automatically detect and use the Dockerfile
- **Dynamic PORT Support**: ✅ Automatically configured
- The Dockerfile uses `nginx.conf.template` and `docker-entrypoint.sh` to handle Railway's dynamic PORT
- Make sure to set environment variables in Railway dashboard
- **See**: `RAILWAY_DOCKER_SETUP.md` for detailed Railway deployment guide

### Render ✅
- Select "Docker" as the environment
- Point to the Dockerfile location
- **Dynamic PORT Support**: ✅ Automatically configured
- **Admin Routing**: Fixed - uses regex location blocks for proper `/admin` routing
- Set environment variables in Render dashboard
- **See**: `RENDER_TROUBLESHOOTING.md` for admin page routing fix

### Fly.io ✅
- Uses Dockerfile automatically
- **Dynamic PORT Support**: ✅ Automatically configured
- Set environment variables in Fly.io dashboard

### Heroku ✅
- Uses Dockerfile via Container Registry
- **Dynamic PORT Support**: ✅ Automatically configured
- Set environment variables in Heroku dashboard

### Northflank ✅
- Select "Dockerfile" build method
- **Dynamic PORT Support**: ✅ Automatically configured
- Set environment variables in the service configuration

### DigitalOcean App Platform ✅
- Uses Dockerfile automatically
- **Dynamic PORT Support**: ✅ Automatically configured
- Set environment variables in App Platform dashboard

### Vercel
- Vercel doesn't use Dockerfiles for frontend deployments
- Use Vercel's native build system instead (recommended for frontend)
- **See**: `VERCEL_MULTIPLE_WEBSITES.md` for Vercel deployment guide

## Environment Variables at Build Time

The Dockerfile already supports build-time environment variables (required for Vite).

### Build with Environment Variables

```bash
docker build \
  --build-arg VITE_PROCTORING_API_URL=https://exameye-shield-backend.onrender.com \
  --build-arg VITE_PROCTORING_WS_URL=wss://exameye-shield-backend.onrender.com \
  --build-arg VITE_SUPABASE_URL=https://ukwnvvuqmiqrjlghgxnf.supabase.co \
  --build-arg VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9... \
  -t exameye-frontend .
```

**Important**: The Supabase values are already set as defaults in the Dockerfile, so you only need to override them if you're using different credentials.

### Using a Build Script (Alternative)

Create a `build-docker.sh` script:
```bash
#!/bin/bash
docker build \
  --build-arg VITE_PROCTORING_API_URL=${VITE_PROCTORING_API_URL:-http://localhost:8001} \
  --build-arg VITE_PROCTORING_WS_URL=${VITE_PROCTORING_WS_URL} \
  --build-arg VITE_SUPABASE_URL=${VITE_SUPABASE_URL:-https://ukwnvvuqmiqrjlghgxnf.supabase.co} \
  --build-arg VITE_SUPABASE_ANON_KEY=${VITE_SUPABASE_ANON_KEY} \
  -t exameye-frontend .
```

Then source your `.env` file and run:
```bash
source .env
chmod +x build-docker.sh
./build-docker.sh
```

**Note**: Vite requires environment variables at **build time**, not runtime, because they're embedded into the JavaScript bundle during the build process.

## Troubleshooting

### Build Fails
- Make sure `package-lock.json` is up to date: `npm install`
- Check that all dependencies are listed in `package.json`

### App Shows Blank Page
- Check browser console for errors
- Verify environment variables are set correctly
- Ensure the build completed successfully

### Routing Issues (404 on refresh or admin page shows student page)
- The nginx config includes SPA routing support (`try_files`) for both apps
- Student routes (`/` and `/student/*`) serve `student.html`
- Admin routes (`/admin` and `/admin/*`) serve `admin.html` using regex location blocks
- **Admin Page Fix**: Updated to use `location ~ ^/admin(/.*)?$` for proper routing
- If issues persist, check the `nginx.conf.template` file
- **For Render**: See `RENDER_TROUBLESHOOTING.md` for admin routing troubleshooting

### Dynamic PORT Issues
- The Dockerfile uses `nginx.conf.template` and `docker-entrypoint.sh` to handle dynamic PORT
- If nginx fails to start, check that `PORT` environment variable is set
- Defaults to port 80 if `PORT` is not set
- Verify `docker-entrypoint.sh` has execute permissions
- Check logs for "Starting nginx on port [PORT]" message

### Port Already in Use
- Change the host port: `docker run -p 8080:80 exameye-frontend`
- Or stop the existing container: `docker stop <container-id>`

## How It Works

### Build Process
The Dockerfile uses `npm run build:all` which:
1. Builds the student app to a temporary directory
2. Builds the admin app to a temporary directory
3. Merges both builds into a single `dist` folder
4. Ensures both `student.html` and `admin.html` are present

### Dynamic PORT Support
The Dockerfile includes:
1. **`nginx.conf.template`**: Template file with `${PORT}` placeholder
2. **`docker-entrypoint.sh`**: Script that substitutes PORT at runtime using `envsubst`
3. **`gettext` package**: Provides `envsubst` command for environment variable substitution

**How it works:**
- At container startup, `docker-entrypoint.sh` runs
- It reads the `PORT` environment variable (defaults to 80 if not set)
- Substitutes `${PORT}` in `nginx.conf.template` to create final nginx config
- Starts nginx on the specified port

### Routing Configuration
The `nginx.conf.template` file configures:
- **Root path (`/`)**: Serves `student.html` (student portal)
- **`/admin` and `/admin/*` paths**: Serves `admin.html` (admin portal) using regex `location ~ ^/admin(/.*)?$`
- **`/student` and `/student/*` paths**: Serves `student.html` (student portal) using regex `location ~ ^/student(/.*)?$`
- **SPA fallbacks**: Handles client-side routing for both apps with `try_files`

**Admin Routing Fix:**
- Uses regex location blocks to properly match `/admin`, `/admin/`, and `/admin/*` paths
- Ensures admin page loads correctly on platforms like Render

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

## Image Size Optimization

The current setup uses:
- **Builder stage**: ~500MB (Node.js + dependencies)
- **Production stage**: ~30MB (nginx Alpine + gettext for envsubst)
- **Final image**: ~30MB (only production stage is included)

This is already optimized using multi-stage builds!

## Key Files

- **`Dockerfile`**: Multi-stage build configuration
- **`nginx.conf.template`**: Nginx configuration template with `${PORT}` placeholder
- **`docker-entrypoint.sh`**: Entrypoint script that handles PORT substitution
- **`scripts/build-all.js`**: Build script that creates both student.html and admin.html
- **`nginx.conf`**: Static nginx config (for local development, not used in Docker)

## Platform-Specific Guides

- **Railway**: See `RAILWAY_DOCKER_SETUP.md`
- **Render**: See `RENDER_TROUBLESHOOTING.md`
- **Vercel**: See `VERCEL_MULTIPLE_WEBSITES.md`
- **Dynamic Ports**: See `DYNAMIC_PORT_PLATFORMS.md` for list of platforms

