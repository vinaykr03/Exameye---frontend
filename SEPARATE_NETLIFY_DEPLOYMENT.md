# Separate Netlify Deployments

## Setup Instructions

### 1. Student App Deployment
- Create new site on Netlify
- Connect to this repository
- Build settings:
  - Build command: `npm run build:student`
  - Publish directory: `dist`
  - Config file: `netlify-student.toml`

### 2. Admin App Deployment  
- Create another new site on Netlify
- Connect to same repository
- Build settings:
  - Build command: `npm run build:admin`
  - Publish directory: `dist`
  - Config file: `netlify-admin.toml`

### 3. Environment Variables
Set in Netlify dashboard for each site:
- `VITE_APP_TYPE=student` (for student site)
- `VITE_APP_TYPE=admin` (for admin site)

## Result
- Student site: `https://student-app.netlify.app`
- Admin site: `https://admin-app.netlify.app`