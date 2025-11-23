#!/bin/bash
# Local build test script - Run this to test the build locally before deploying to Netlify

echo "🔍 Testing Netlify build locally..."
echo ""

# Check if package.json exists and is valid
echo "1. Checking package.json..."
if node -e "JSON.parse(require('fs').readFileSync('package.json','utf8')); console.log('✅ package.json is valid JSON')" 2>/dev/null; then
    echo "   ✅ package.json is valid"
else
    echo "   ❌ package.json has syntax errors!"
    exit 1
fi

# Check if build script exists
echo ""
echo "2. Checking build script..."
if grep -q '"build:all"' package.json; then
    echo "   ✅ build:all script found in package.json"
else
    echo "   ❌ build:all script NOT found in package.json!"
    exit 1
fi

# Check Node version
echo ""
echo "3. Checking Node version..."
NODE_VERSION=$(node -v)
echo "   Current Node version: $NODE_VERSION"
if [[ "$NODE_VERSION" =~ v(18|19|20|21|22) ]]; then
    echo "   ✅ Node version is compatible (18+)"
else
    echo "   ⚠️  Warning: Node version should be 18 or higher"
fi

# Install dependencies (like Netlify does)
echo ""
echo "4. Installing dependencies (npm ci)..."
if npm ci; then
    echo "   ✅ Dependencies installed successfully"
else
    echo "   ❌ Failed to install dependencies!"
    exit 1
fi

# Run the build
echo ""
echo "5. Running build command (npm run build:all)..."
if npm run build:all; then
    echo ""
    echo "   ✅ Build completed successfully!"
    echo ""
    
    # Check if dist folder exists and has required files
    echo "6. Verifying build output..."
    if [ -f "dist/student.html" ]; then
        echo "   ✅ student.html found"
    else
        echo "   ❌ student.html NOT found!"
        exit 1
    fi
    
    if [ -f "dist/admin.html" ]; then
        echo "   ✅ admin.html found"
    else
        echo "   ❌ admin.html NOT found!"
        exit 1
    fi
    
    echo ""
    echo "🎉 All checks passed! Your build should work on Netlify."
    echo ""
    echo "📁 Build output location: ./dist"
    echo "   - Student app: dist/student.html"
    echo "   - Admin app: dist/admin.html"
else
    echo ""
    echo "   ❌ Build failed! Check the error messages above."
    exit 1
fi

