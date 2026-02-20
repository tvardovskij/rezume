import { Container } from '@/shared/ui/Container'
import './summary.css'

const bulletPoints = [
  'Архитектура: feature-oriented структура и переиспользуемые UI-блоки.',
  'Производительность: lazy loading, мемоизация, критичный CSS.',
  'Качество: строгий TypeScript, линтеры и автопроверки в CI.',
]

export function SummarySection() {
  return (
    <section className="summary" id="about">
      <Container className="summary__content">
        <h2 className="summary__title">Ключевые проекты</h2>
        <ul className="summary__list">
          {bulletPoints.map((point) => (
            <li key={point} className="summary__item">
              {point}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
