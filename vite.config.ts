import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages project URL: https://thedolapo.github.io/LDV-waitlist/
  // For custom domain ldvsupply.com only, switch to base: '/'
  base: '/LDV-waitlist/',
})
