import { useSiteLocale } from '@/app/providers/site-locale-context'
import { Container } from '@/shared/ui/Container'
import { getResumeCtaContent } from './resume-cta.data'
import './resume-cta.css'

export function ResumeCtaSection() {
  const { locale } = useSiteLocale()
  const content = getResumeCtaContent(locale)

  return (
    <section className="resume-cta" id="resume">
      <Container>
        <div className="resume-cta__panel">
          <div className="resume-cta__layout">
            <div className="resume-cta__content">
              <p className="resume-cta__eyebrow">{content.eyebrow}</p>
              <h2 className="resume-cta__title">{content.title}</h2>
              <p className="resume-cta__lead">{content.lead}</p>

              <div className="resume-cta__actions">
                <a
                  className="resume-cta__button resume-cta__button--primary"
                  href={content.primaryAction.href}
                  download={content.primaryAction.download}
                >
                  {content.primaryAction.label}
                </a>

                <a
                  className="resume-cta__button resume-cta__button--secondary"
                  href={content.secondaryAction.href}
                  download={content.secondaryAction.download}
                >
                  {content.secondaryAction.label}
                </a>
              </div>

            </div>

            <div className="resume-cta__visual" aria-hidden="true">
              <div className="resume-cta__plus" />

              <div className="resume-cta__slip">
                <span className="resume-cta__slip-index">01</span>
                <span className="resume-cta__slip-text">{content.visual.slipText}</span>
                <span className="resume-cta__slip-icon">-&gt;</span>
              </div>

              <div className="resume-cta__chip">{content.visual.chipText}</div>
              <div className="resume-cta__badge">{content.visual.badge}</div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
