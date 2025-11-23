import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Clean dist folder
const distDir = path.join(rootDir, 'dist');
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

const studentTempDir = path.join(rootDir, 'dist-student-temp');
const adminTempDir = path.join(rootDir, 'dist-admin-temp');

console.log('Building student app...');
// Build student app to temp directory
execSync('npm run build:student', { 
  cwd: rootDir, 
  stdio: 'inherit',
  env: { ...process.env, VITE_APP_TYPE: 'student', BUILD_OUT_DIR: 'dist-student-temp' }
});

console.log('Building admin app...');
// Build admin app to temp directory
execSync('npm run build:admin', { 
  cwd: rootDir, 
  stdio: 'inherit',
  env: { ...process.env, VITE_APP_TYPE: 'admin', BUILD_OUT_DIR: 'dist-admin-temp' }
});

// Create final dist directory
fs.mkdirSync(distDir, { recursive: true });

console.log('Merging builds...');

// Copy student files
if (fs.existsSync(studentTempDir)) {
  copyRecursiveSync(studentTempDir, distDir);
  fs.rmSync(studentTempDir, { recursive: true, force: true });
}

// Copy admin files, being careful with assets
if (fs.existsSync(adminTempDir)) {
  const adminFiles = fs.readdirSync(adminTempDir);
  
  adminFiles.forEach(file => {
    const srcPath = path.join(adminTempDir, file);
    const destPath = path.join(distDir, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      // For directories like assets, merge contents
      if (fs.existsSync(destPath)) {
        // Merge directory contents
        const subFiles = fs.readdirSync(srcPath);
        subFiles.forEach(subFile => {
          const subSrcPath = path.join(srcPath, subFile);
          const subDestPath = path.join(destPath, subFile);
          if (fs.existsSync(subDestPath)) {
            // File exists, skip or overwrite (admin takes precedence for conflicts)
            fs.copyFileSync(subSrcPath, subDestPath);
          } else {
            fs.copyFileSync(subSrcPath, subDestPath);
          }
        });
      } else {
        fs.cpSync(srcPath, destPath, { recursive: true });
      }
    } else {
      // For files, copy admin.html and any other admin-specific files
      if (file === 'admin.html' || !fs.existsSync(destPath)) {
        fs.copyFileSync(srcPath, destPath);
      }
    }
  });
  
  fs.rmSync(adminTempDir, { recursive: true, force: true });
}

// Verify both HTML files exist
const studentHtmlPath = path.join(distDir, 'student.html');
const adminHtmlPath = path.join(distDir, 'admin.html');

if (!fs.existsSync(studentHtmlPath)) {
  console.error('Error: student.html not found in build output');
  process.exit(1);
}

if (!fs.existsSync(adminHtmlPath)) {
  console.error('Error: admin.html not found in build output');
  process.exit(1);
}

console.log('✓ Build complete! Both apps are ready in dist/');
console.log('  - Student app: student.html');
console.log('  - Admin app: admin.html');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}
