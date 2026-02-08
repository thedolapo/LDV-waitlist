import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Custom domain ldvsupply.com (root). For theolapo.github.io/LDV-waitlist/ use base: '/LDV-waitlist/'
  base: '/',
})
