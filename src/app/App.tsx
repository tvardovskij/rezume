import { SiteLocaleProvider } from '@/app/providers/SiteLocaleProvider'
import { HeroSection } from '@/sections/hero/HeroSection'
import { SummarySection } from '@/sections/summary/SummarySection'

export function App() {
  return (
    <SiteLocaleProvider>
      <div className="app-shell">
        <HeroSection />
        <main className="app-main">
          <SummarySection />
        </main>
      </div>
    </SiteLocaleProvider>
  )
}
