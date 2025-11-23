# Build Debugging Guide

If your Netlify build is failing, follow these steps to diagnose and fix the issue.

## Quick Local Test

### On Windows:
```bash
test-build-local.bat
```

### On Mac/Linux:
```bash
chmod +x test-build-local.sh
./test-build-local.sh
```

This script will:
1. ✅ Verify `package.json` is valid JSON
2. ✅ Check that `build:all` script exists
3. ✅ Verify Node version compatibility
4. ✅ Install dependencies (like Netlify does)
5. ✅ Run the build command
6. ✅ Verify both `student.html` and `admin.html` are created

## Manual Testing Steps

### 1. Verify package.json Syntax

```bash
node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('✅ package.json is valid')"
```

If this errors, fix the JSON syntax (missing commas, brackets, etc.).

### 2. Check Build Script Exists

Verify `package.json` contains:
```json
"scripts": {
  "build:all": "node scripts/build-all.js"
}
```

### 3. Test Build Locally (Exact Netlify Process)

```bash
# Clean install (like Netlify)
npm ci

# Run the build
npm run build:all
```

### 4. Verify Output

Check that `dist/` folder contains:
- ✅ `student.html`
- ✅ `admin.html`
- ✅ `assets/` folder with JS/CSS files

## Common Issues & Fixes

### Issue: "Cannot find module 'scripts/build-all.js'"

**Fix**: Make sure `scripts/build-all.js` exists and is committed to git.

### Issue: "build:all script not found"

**Fix**: Verify `package.json` has the script:
```json
"build:all": "node scripts/build-all.js"
```

### Issue: Node version mismatch

**Fix**: 
- Netlify will use Node 20 (specified in `.nvmrc` and `netlify.toml`)
- Make sure your local Node version is 18+ for testing
- Check: `node -v`

### Issue: Missing dependencies

**Fix**: 
```bash
npm ci
```

This installs exact versions from `package-lock.json` (like Netlify does).

### Issue: Build succeeds locally but fails on Netlify

**Check**:
1. ✅ Base directory is set correctly (empty if repo root, or subdirectory name)
2. ✅ Build command matches: `npm run build:all`
3. ✅ Publish directory: `dist`
4. ✅ Environment variables are set in Netlify (if needed)

## Netlify Build Settings Checklist

In Netlify Dashboard → Site settings → Build & deploy:

- [ ] **Base directory**: Empty (if frontend is at repo root) OR `Exameye-Shield-frontend--main` (if in subdirectory)
- [ ] **Build command**: `npm run build:all`
- [ ] **Publish directory**: `dist`
- [ ] **Node version**: Should auto-detect from `.nvmrc` (Node 20)

## Getting Full Build Logs

1. Go to **Netlify Dashboard** → Your site → **Deploys**
2. Click on the failed deploy
3. Expand the full build log
4. Look for the first error (usually near the top)
5. Copy the full error message (not just the last line)

## Environment Variables

If your build needs environment variables, set them in:
**Site settings** → **Environment variables**

Common variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_PROCTORING_API_URL`
- `VITE_PROCTORING_WS_URL`

## Still Having Issues?

1. Run the local test script and share the output
2. Copy the **full** Netlify build log (not truncated)
3. Verify your repository structure matches what Netlify expects

