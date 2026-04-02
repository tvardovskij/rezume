import { startTransition, type CSSProperties, useState } from 'react'
import { useSiteLocale } from '@/app/providers/site-locale-context'
import { cx } from '@/shared/lib/cx'
import { Container } from '@/shared/ui/Container'
import {
  getTechStackItems,
  getTechStackSectionCopy,
  type TechStackCategoryId,
  type TechStackItem,
} from './tech-stack.data'
import './tech-stack.css'

function getCardStyle(item: TechStackItem) {
  return {
    '--tech-stack-accent': item.accent,
    '--tech-stack-accent-soft': item.accentSoft,
  } as CSSProperties
}

export function TechStackSection() {
  const { locale } = useSiteLocale()
  const copy = getTechStackSectionCopy(locale)
  const [activeCategory, setActiveCategory] = useState<TechStackCategoryId>('core')
  const visibleItems = getTechStackItems(activeCategory)

  function handleCategoryChange(categoryId: TechStackCategoryId) {
    if (categoryId === activeCategory) {
      return
    }

    startTransition(() => {
      setActiveCategory(categoryId)
    })
  }

  return (
    <section className="tech-stack" id="stack">
      <div className="tech-stack__panel">
        <Container className="tech-stack__inner">
          <header className="tech-stack__head">
            <div className="tech-stack__copy">
              <p className="tech-stack__eyebrow">{copy.eyebrow}</p>
              <h2 className="tech-stack__title">{copy.title}</h2>
            </div>

            <p className="tech-stack__lead">{copy.lead}</p>
          </header>

          <ul className="tech-stack__filters" aria-label={copy.filterAriaLabel}>
            {copy.categories.map((category) => (
              <li key={category.id}>
                <button
                  type="button"
                  className={cx(
                    'tech-stack__filter',
                    activeCategory === category.id && 'tech-stack__filter--active',
                  )}
                  aria-pressed={activeCategory === category.id}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.label}
                </button>
              </li>
            ))}
          </ul>

          <ul className="tech-stack__grid">
            {visibleItems.map((item) => {
              const primaryCategory = copy.filters[item.groups[0]]
              const compactMark = item.short.length > 3

              return (
                <li key={item.id}>
                  <article className="tech-stack-card" style={getCardStyle(item)}>
                    <div className="tech-stack-card__media" aria-hidden="true">
                      {item.icon ? (
                        <img
                          className="tech-stack-card__icon"
                          src={item.icon}
                          alt=""
                          width={56}
                          height={56}
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <span
                          className={cx(
                            'tech-stack-card__short',
                            compactMark && 'tech-stack-card__short--compact',
                          )}
                        >
                          {item.short}
                        </span>
                      )}
                    </div>

                    <div className="tech-stack-card__body">
                      <p className="tech-stack-card__category">{primaryCategory}</p>
                      <h3 className="tech-stack-card__label">{item.label}</h3>
                    </div>
                  </article>
                </li>
              )
            })}
          </ul>
        </Container>
      </div>
    </section>
  )
}
