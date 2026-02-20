import { Container } from "@/shared/ui/Container";
import { heroMetrics, heroTechIcons, showHeroTech } from "./hero.data";
import "./hero.css";

export function HeroSection() {
  return (
    <header className="hero" id="hero">
      <div className="hero__media" aria-hidden="true">
        <img
          className="hero__poster"
          src="/media/hero/hero-poster.webp"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <img
          className="hero__gif"
          src="/media/hero/hero-bg.optimized.gif"
          alt=""
          loading="eager"
          fetchPriority="low"
          decoding="async"
        />
        <div className="hero__layer hero__layer--grain" />
        <div className="hero__layer hero__layer--blue" />
        <div className="hero__layer hero__layer--circles" />
        <div className="hero__layer hero__layer--blur" />
        <div className="hero__fadeout" />
      </div>

      <Container className="hero__content">
        <nav className="hero__nav">
          <a className="hero__brand" href="#hero" aria-label="На главную">
            <img
              className="hero__brand-full-logo"
              src="/logo-full.svg"
              alt="Логотип Дмитрия"
              loading="eager"
              decoding="async"
            />
          </a>
          <ul className="hero__menu">
            <li>
              <a href="#about">Обо мне</a>
            </li>
            <li>
              <a href="#projects">Проекты</a>
            </li>
            <li>
              <a href="#contacts">Контакты</a>
            </li>
          </ul>
        </nav>

        <div className="hero__intro">
          <div className="hero__title-wrap">
            <h1 className="hero__title">
              Я — E2E Lead Fullstack Engineer
            </h1>
          </div>

          <p className="hero__lead">
          Я живу проектами, которыми занимаюсь. <br />
          Для меня frontend и backend — это единый организм: я проектирую, реализую, запускаю и поддерживаю крупные системы, работая как самостоятельно, так и в команде
          </p>
        </div>

        {showHeroTech && (
          <ul className="hero__stack" aria-label="Основной стек">
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
                />
              </li>
            ))}
          </ul>
        )}

        <ul className="hero__metrics">
          {heroMetrics.map((metric) => (
            <li key={metric.value} className="hero__metric">
              <p className="hero__metric-value">{metric.value}</p>
              <p className="hero__metric-caption">{metric.caption}</p>
            </li>
          ))}
        </ul>
      </Container>
    </header>
  );
}

