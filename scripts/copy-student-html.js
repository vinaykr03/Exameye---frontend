import fs from 'fs';
import path from 'path';

const distDir = 'dist';
const studentHtmlPath = path.join(distDir, 'student.html');
const indexHtmlPath = path.join(distDir, 'index.html');

if (fs.existsSync(studentHtmlPath)) {
  fs.copyFileSync(studentHtmlPath, indexHtmlPath);
  console.log('✓ Copied student.html to index.html for Netlify');
} else {
  console.error('❌ student.html not found in dist directory');
  process.exit(1);
}