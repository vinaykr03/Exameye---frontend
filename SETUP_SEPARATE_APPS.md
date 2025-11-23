# Separate Student and Admin Applications

This project now has separate entry points for Student and Admin applications, each running on different localhost ports.

## Setup

First, install the required dependencies:

```bash
npm install
```

## Running the Applications

### Option 1: Run Student App Only
```bash
npm run dev:student
```
- **URL**: http://localhost:3000
- **Entry Point**: `student.html`
- **Routes**: `/`, `/register`, `/verify`, `/compatibility`, `/exam`

### Option 2: Run Admin App Only
```bash
npm run dev:admin
```
- **URL**: http://localhost:3001
- **Entry Point**: `admin.html`
- **Routes**: `/`, `/login`, `/dashboard`, `/monitor`, `/subjects`, `/upload-template`, `/student-report`, `/analytics`

### Option 3: Run Both Apps Simultaneously
```bash
npm run dev:all
```
This will start both servers:
- Student: http://localhost:3000
- Admin: http://localhost:3001

## Building for Production

### Build Student App
```bash
npm run build:student
```

### Build Admin App
```bash
npm run build:admin
```

## File Structure

- `student.html` - HTML entry point for student app
- `admin.html` - HTML entry point for admin app
- `src/student-main.tsx` - React entry point for student app
- `src/admin-main.tsx` - React entry point for admin app
- `src/StudentApp.tsx` - Student app router and components
- `src/AdminApp.tsx` - Admin app router and components

## Notes

- Each app has its own routing structure (no `/student/` or `/admin/` prefixes)
- Both apps share the same component library and utilities
- The apps are completely independent and can be deployed separately

