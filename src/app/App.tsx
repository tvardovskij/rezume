import { SiteLocaleProvider } from '@/app/providers/SiteLocaleProvider'
import { ContactSection } from '@/sections/contact/ContactSection'
import { HeroSection } from '@/sections/hero/HeroSection'
import { ResumeCtaSection } from '@/sections/resume-cta/ResumeCtaSection'
import { TechStackSection } from '@/sections/stack/TechStackSection'
import { SummarySection } from '@/sections/summary/SummarySection'

export function App() {
  return (
    <SiteLocaleProvider>
      <div className="app-shell">
        <HeroSection />
        <main className="app-main">
          <SummarySection />
          <TechStackSection />
          <ResumeCtaSection />
        </main>
        <ContactSection />
      </div>
    </SiteLocaleProvider>
  )
}
