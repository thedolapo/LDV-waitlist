import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // For ldvsupply.com at root. To use theolapo.github.io/LDV-waitlist/ instead, set base: '/LDV-waitlist/'
  base: '/',
})
