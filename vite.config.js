/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000, // Use port 3000 for Vite dev server
    strictPort: true,
    https: false, // Enable HTTPS for local development
    hmr: {
      clientPort: 443, // Ensure Hot Module Replacement works over HTTPS
    },
    proxy: {
      '/api': {
        target: 'https://api.yourdomain.com', // Point to FastAPI backend
        changeOrigin: true,
        secure: true,  // Ensures it works over HTTPS
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove /api prefix if needed
      },
    },
    allowedHosts: ['www.laogao.us','laogao.us'], // Allow Cloudflare domain
  }
})
