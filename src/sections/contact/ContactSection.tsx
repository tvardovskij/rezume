import { useState } from 'react'
import { useSiteLocale } from '@/app/providers/site-locale-context'
import { Container } from '@/shared/ui/Container'
import { ContactAmbientWaves } from './ContactAmbientWaves'
import { getContactFooterContent, type ContactChannel } from './contact.data'
import './contact.css'

function getLinkBehaviorProps(href: string) {
  if (/^(mailto:|tel:)/i.test(href)) {
    return {}
  }

  return {
    target: '_blank',
    rel: 'noopener noreferrer',
  } as const
}

type ContactIconLinkProps = {
  channel: ContactChannel
}

function ContactIconLink({ channel }: ContactIconLinkProps) {
  const [iconBroken, setIconBroken] = useState(false)
  const icon = !iconBroken ? (
    <img
      className="contact-footer__social-icon"
      src={channel.iconPath}
      alt=""
      width={34}
      height={34}
      loading="lazy"
      decoding="async"
      onError={() => setIconBroken(true)}
    />
  ) : null

  const content = (
    <>
      {icon ?? (
        <span className="contact-footer__social-icon-fallback" aria-hidden="true">
          {channel.fallback}
        </span>
      )}
      <span className="contact-footer__social-label">{channel.title}</span>
    </>
  )

  if (!channel.href) {
    return <span className="contact-footer__social-link contact-footer__social-link--placeholder">{content}</span>
  }

  return (
    <a
      className="contact-footer__social-link"
      href={channel.href}
      aria-label={channel.title}
      {...getLinkBehaviorProps(channel.href)}
    >
      {content}
    </a>
  )
}

type ContactTextLinkProps = {
  channel: ContactChannel
}

function ContactTextLink({ channel }: ContactTextLinkProps) {
  if (!channel.href) {
    return (
      <span className="contact-footer__text-link contact-footer__text-link--placeholder">
        {channel.title}
      </span>
    )
  }

  return (
    <a className="contact-footer__text-link" href={channel.href} {...getLinkBehaviorProps(channel.href)}>
      {channel.title}
    </a>
  )
}

export function ContactSection() {
  const { githubUrl, locale } = useSiteLocale()
  const content = getContactFooterContent(locale, githubUrl)
  const featuredChannels = content.channels.filter((channel) => channel.featured && channel.href)
  const directChannels = content.channels.filter((channel) => channel.group === 'direct')
  const socialChannels = content.channels.filter((channel) => channel.group === 'social')

  return (
    <footer className="contact-footer" id="contact">
      <div className="contact-footer__media" aria-hidden="true">
        <div className="contact-footer__effect-stage">
          <div className="contact-footer__wave-stage">
            <div className="contact-footer__effect-layer contact-footer__effect-layer--animation">
              <ContactAmbientWaves />
            </div>
          </div>
          <div className="contact-footer__effect-blur">
            <div className="contact-footer__effect-layer contact-footer__effect-layer--filters" />
          </div>
        </div>
        <div className="contact-footer__layer contact-footer__layer--grain" />
      </div>

      <Container className="contact-footer__inner">
        <div className="contact-footer__top">
          <div className="contact-footer__intro">
            {content.primaryContact.href ? (
              <a
                className="contact-footer__primary"
                href={content.primaryContact.href}
                {...getLinkBehaviorProps(content.primaryContact.href)}
              >
                {content.primaryContact.label}
              </a>
            ) : (
              <h2 className="contact-footer__primary contact-footer__primary--static">
                {content.primaryContact.label}
              </h2>
            )}
            <p className="contact-footer__role">{content.role}</p>
            <p className="contact-footer__lead">{content.lead}</p>
          </div>

          <div className="contact-footer__aside">
            {featuredChannels.length > 0 ? (
              <ul className="contact-footer__socials" aria-label={content.socialAriaLabel}>
                {featuredChannels.map((channel) => (
                  <li key={channel.id}>
                    <ContactIconLink channel={channel} />
                  </li>
                ))}
              </ul>
            ) : null}

            <a
              className="contact-footer__repo-link"
              href={content.repository.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.repository.buttonLabel}
            </a>
          </div>
        </div>

        <div className="contact-footer__bottom">
          <div className="contact-footer__network-groups">
            <section className="contact-footer__column">
              <p className="contact-footer__column-label">{content.columnLabels.direct}</p>
              <div className="contact-footer__links">
                {directChannels.map((channel) => (
                  <ContactTextLink key={channel.id} channel={channel} />
                ))}
              </div>
            </section>

            <section className="contact-footer__column">
              <p className="contact-footer__column-label">{content.columnLabels.social}</p>
              <div className="contact-footer__links">
                {socialChannels.map((channel) => (
                  <ContactTextLink key={channel.id} channel={channel} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </Container>
    </footer>
  )
}
