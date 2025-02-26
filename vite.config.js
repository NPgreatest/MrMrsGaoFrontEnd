/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,  // Use Heroku's port
    strictPort: true,                // Ensures Vite doesn't try random ports
    hmr: {
      clientPort: 443,                // Fix HMR for Heroku
    },
    allowedHosts: ['.herokuapp.com'], // Allow all Heroku subdomains
  }


})
