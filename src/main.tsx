import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app/App'
import { Analytics } from "@vercel/analytics/react"
import '@/app/styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Analytics />
    <App />
  </StrictMode>,
)
