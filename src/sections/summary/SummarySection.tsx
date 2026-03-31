import { Container } from '@/shared/ui/Container'
import { useSiteLocale } from '@/app/providers/site-locale-context'
import './summary.css'

export function SummarySection() {
  const { content } = useSiteLocale()
  const { projects } = content

  return (
    <section className="summary" id="projects">
      <Container className="summary__content">
        <header className="summary__head">
          <p className="summary__eyebrow">{projects.eyebrow}</p>
          <h2 className="summary__title">{projects.title}</h2>
          <p className="summary__lead">{projects.lead}</p>
        </header>

        <div className="summary__grid">
          {projects.items.map((project) => {
            const pngFallback = project.image.src.replace(/\.webp$/, '.png')

            return (
              <article key={project.id} className={`summary-project summary-project--${project.id}`}>
                <div className="summary-project__visual">
                  <picture className="summary-project__picture">
                    <source srcSet={project.image.src} type="image/webp" />
                    <img
                      className="summary-project__image"
                      src={pngFallback}
                      alt={project.image.alt}
                      width={project.image.width}
                      height={project.image.height}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </picture>
                </div>

                <div className="summary-project__body">
                  <p className="summary-project__category">{project.category}</p>
                  <h3 className="summary-project__title">{project.title}</h3>
                  <p className="summary-project__description">{project.description}</p>

                  <ul className="summary-project__badges" aria-label={project.title}>
                    {project.badges.map((badge) => (
                      <li key={badge} className="summary-project__badge">
                        {badge}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
