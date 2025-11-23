# Frontend Docker Setup

This Dockerfile creates a production-ready container that serves both the **Student** and **Admin** applications from a single container using path-based routing.

## Build Stages

1. **Builder Stage**: Uses Node.js 20 to install dependencies and build both Vite apps (student and admin)
2. **Production Stage**: Uses nginx Alpine to serve the static files efficiently with path-based routing

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

### Railway
- Railway will automatically detect and use the Dockerfile
- No additional configuration needed
- Make sure to set environment variables in Railway dashboard

### Render
- Select "Docker" as the environment
- Point to the Dockerfile location
- Set environment variables in Render dashboard

### Northflank
- Select "Dockerfile" build method
- Set environment variables in the service configuration

### Vercel
- Vercel doesn't use Dockerfiles for frontend deployments
- Use Vercel's native build system instead (recommended for frontend)

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

### Routing Issues (404 on refresh)
- The nginx config includes SPA routing support (`try_files`) for both apps
- Student routes (`/` and `/student/*`) serve `student.html`
- Admin routes (`/admin/*`) serve `admin.html`
- If issues persist, check the `nginx.conf` file

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

### Routing Configuration
The `nginx.conf` file configures:
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

## Image Size Optimization

The current setup uses:
- **Builder stage**: ~500MB (Node.js + dependencies)
- **Production stage**: ~25MB (nginx Alpine)
- **Final image**: ~25MB (only production stage is included)

This is already optimized using multi-stage builds!

