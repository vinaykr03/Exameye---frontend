import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const adminHtmlPath = path.join(distDir, 'admin.html');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(adminHtmlPath)) {
  fs.copyFileSync(adminHtmlPath, indexHtmlPath);
  console.log('✓ Copied admin.html to index.html for Netlify');
} else {
  console.error('❌ admin.html not found in dist directory');
  process.exit(1);
}