import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr' // 1. Import this

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    svgr() // 2. Add this to the plugins list
  ],
})