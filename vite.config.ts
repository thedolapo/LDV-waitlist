import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Project URL: https://thedolapo.github.io/LDV-waitlist/
  // For ldvsupply.com only: set base: '/' and push (then theolapo.github.io/LDV-waitlist will 404 on assets)
  base: '/LDV-waitlist/',
})
