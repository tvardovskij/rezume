import type { MouseEvent } from 'react'
import { Container } from '@/shared/ui/Container'
import { useSiteLocale } from '@/app/providers/site-locale-context'
import { HeroAmbientLogo } from './HeroAmbientLogo'
import { heroTechIcons, showHeroTech } from './hero.data'
import './hero.css'

export function HeroSection() {
  const { buildLocaleHref, content, githubUrl, locale, switchLocale } = useSiteLocale()
  const { hero, nav } = content

  function handleLocaleClick(event: MouseEvent<HTMLAnchorElement>, nextLocale: 'en' | 'ru') {
    if (nextLocale === locale) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    switchLocale(nextLocale)
  }

  return (
    <header className="hero" id="hero">
      <div className="hero__media" aria-hidden="true">
        <div className="hero__effect-stage">
          <div className="hero__effect-blur">
            <div className="hero__effect-layer hero__effect-layer--animation">
              <HeroAmbientLogo />
            </div>
            <div className="hero__effect-layer hero__effect-layer--filters" />
          </div>
        </div>
        <div className="hero__layer hero__layer--grain" />
        <div className="hero__fadeout" />
      </div>

      <Container className="hero__content">
        <nav className="hero__nav">
          <a className="hero__brand" href="#hero" aria-label={nav.homeLabel}>
            <img
              className="hero__brand-full-logo"
              src="/logo-full.svg"
              alt={nav.logoAlt}
              width={150}
              height={45}
              loading="eager"
              decoding="async"
            />
          </a>
          <div className="hero__nav-actions">
            <ul className="hero__menu">
              <li>
                <a href="#about">{nav.about}</a>
              </li>
              <li>
                <a href="#projects">{nav.projects}</a>
              </li>
              <li>
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  {nav.github}
                </a>
              </li>
            </ul>

            <div className="hero__locale-switch" role="group" aria-label={nav.languageSwitchLabel}>
              <a
                href={buildLocaleHref('ru')}
                className={locale === 'ru' ? 'is-active' : undefined}
                lang="ru"
                aria-current={locale === 'ru' ? 'page' : undefined}
                onClick={(event) => handleLocaleClick(event, 'ru')}
              >
                RU
              </a>
              <a
                href={buildLocaleHref('en')}
                className={locale === 'en' ? 'is-active' : undefined}
                lang="en"
                aria-current={locale === 'en' ? 'page' : undefined}
                onClick={(event) => handleLocaleClick(event, 'en')}
              >
                EN
              </a>
            </div>
          </div>
        </nav>

        <div className="hero__intro" id="about">
          <div className="hero__title-wrap">
            <h1 className="hero__title">{hero.title}</h1>
          </div>

          <p className="hero__lead">
            {hero.leadStart} <br />
            {hero.leadEnd}
          </p>
        </div>

        {showHeroTech && (
          <ul className="hero__stack" aria-label={hero.stackLabel}>
            {heroTechIcons.map((tech) => (
              <li
                key={tech.id}
                className="hero__stack-item"
                title={tech.label}
                aria-label={tech.label}
              >
                <img
                  className="hero__stack-icon"
                  src={tech.icon}
                  alt={tech.label}
                  width={34}
                  height={34}
                  decoding="async"
                />
              </li>
            ))}
          </ul>
        )}

        <ul className="hero__metrics">
          {hero.metrics.map((metric) => (
            <li key={metric.value} className="hero__metric">
              <p className="hero__metric-value">{metric.value}</p>
              <p className="hero__metric-caption">{metric.caption}</p>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  )
}
