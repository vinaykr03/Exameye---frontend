import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Plugin to serve the correct HTML file based on VITE_APP_TYPE for SPA routing
function htmlEntryPlugin(): Plugin {
  return {
    name: "html-entry",
    configureServer(server) {
      const appType = process.env.VITE_APP_TYPE || "student";
      const htmlFile = appType === "student" ? "student.html" : "admin.html";
      
      return () => {
        // Middleware to handle SPA routing - serve HTML for all non-file routes
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split('?')[0] || '/';
          
          // Skip for actual files (has extension and is not .html)
          const hasFileExtension = /\.\w+$/.test(url) && !url.endsWith('.html');
          
          // Skip for Vite internal requests and static assets
          if (
            hasFileExtension ||
            url.startsWith('/src/') ||
            url.startsWith('/node_modules/') ||
            url.startsWith('/@') ||
            url.startsWith('/api/') ||
            url.startsWith('/public/')
          ) {
            return next();
          }
          
          // For all other routes (SPA routes), serve the appropriate HTML file
          // This allows React Router to handle client-side routing
          if (url !== `/${htmlFile}`) {
            req.url = `/${htmlFile}`;
          }
          
          next();
        });
      };
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Determine which app to serve based on environment variable
  const appType = process.env.VITE_APP_TYPE || "student"; // 'student' or 'admin'
  const isStudent = appType === "student";
  const htmlFile = isStudent ? "student.html" : "admin.html";
  
  return {
    build: {
      outDir: process.env.BUILD_OUT_DIR || 'dist',
      rollupOptions: {
        input: htmlFile,
      },
    },

    // Server configuration
    server: {
      port: isStudent ? 3000 : 3001, // Student on 3000, Admin on 3001
      host: '0.0.0.0',
      allowedHosts: true,
    },
    plugins: [
      htmlEntryPlugin(),
      react(), 
      mode === "development" && componentTagger()
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
