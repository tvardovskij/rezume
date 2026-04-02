import { useId } from 'react'

type RibbonVariant = 'a' | 'b' | 'c'

function RibbonTile({ variant }: { variant: RibbonVariant }) {
  const id = useId().replace(/:/g, '')

  const pathByVariant: Record<RibbonVariant, string> = {
    a: 'M 0 216 C 104 124 296 124 400 216 S 696 308 800 216 S 1096 124 1200 216 S 1496 308 1600 216',
    b: 'M 0 210 C 104 300 296 300 400 210 S 696 120 800 210 S 1096 300 1200 210 S 1496 120 1600 210',
    c: 'M 0 214 C 152 166 248 166 400 214 S 648 262 800 214 S 1048 166 1200 214 S 1448 262 1600 214',
  }

  const bodyGradientByVariant: Record<RibbonVariant, string> = {
    a: `url(#${id}-body-a)`,
    b: `url(#${id}-body-b)`,
    c: `url(#${id}-body-a)`,
  }

  const path = pathByVariant[variant]

  return (
    <svg
      className="contact-footer__animation-ribbon-svg"
      viewBox="0 0 1600 420"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id={`${id}-halo`} x1="0" y1="0" x2="1600" y2="0">
          <stop offset="0%" stopColor="#67c5ff" stopOpacity="0" />
          <stop offset="22%" stopColor="#67c5ff" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#a86fff" stopOpacity="0.34" />
          <stop offset="78%" stopColor="#67c5ff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#f56fd8" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-body-a`} x1="0" y1="0" x2="1600" y2="0">
          <stop offset="0%" stopColor="#69cbff" />
          <stop offset="34%" stopColor="#7d8dff" />
          <stop offset="60%" stopColor="#ba6fff" />
          <stop offset="100%" stopColor="#69cbff" />
        </linearGradient>

        <linearGradient id={`${id}-body-b`} x1="0" y1="0" x2="1600" y2="0">
          <stop offset="0%" stopColor="#77d6ff" />
          <stop offset="30%" stopColor="#73a6ff" />
          <stop offset="58%" stopColor="#9f74ff" />
          <stop offset="100%" stopColor="#77d6ff" />
        </linearGradient>

        <linearGradient id={`${id}-inner`} x1="0" y1="0" x2="1600" y2="0">
          <stop offset="0%" stopColor="#86d8ff" stopOpacity="0.28" />
          <stop offset="30%" stopColor="#90b5ff" stopOpacity="0.22" />
          <stop offset="56%" stopColor="#c292ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#86d8ff" stopOpacity="0.28" />
        </linearGradient>

        <linearGradient id={`${id}-current`} x1="0" y1="0" x2="1600" y2="0">
          <stop offset="0%" stopColor="#9adfff" stopOpacity="0" />
          <stop offset="46%" stopColor="#d6b2ff" stopOpacity="0.42" />
          <stop offset="52%" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="60%" stopColor="#ff9be4" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ff9be4" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        className="contact-footer__animation-ribbon-stroke contact-footer__animation-ribbon-stroke--halo"
        d={path}
        stroke={`url(#${id}-halo)`}
      />
      <path
        className="contact-footer__animation-ribbon-stroke contact-footer__animation-ribbon-stroke--body"
        d={path}
        stroke={bodyGradientByVariant[variant]}
      />
      <path
        className="contact-footer__animation-ribbon-stroke contact-footer__animation-ribbon-stroke--inner"
        d={path}
        stroke={`url(#${id}-inner)`}
      />
      <path
        className={`contact-footer__animation-ribbon-stroke contact-footer__animation-ribbon-stroke--current contact-footer__animation-ribbon-stroke--current-${variant}`}
        d={path}
        stroke={`url(#${id}-current)`}
      />
    </svg>
  )
}

function RibbonTrack({
  variant,
  direction,
}: {
  variant: RibbonVariant
  direction: 'left' | 'right'
}) {
  return (
    <div
      className={`contact-footer__animation-track contact-footer__animation-track--${direction} contact-footer__animation-track--${variant}`}
    >
      <RibbonTile variant={variant} />
      <RibbonTile variant={variant} />
    </div>
  )
}

export function ContactAmbientWaves() {
  return (
    <div className="contact-footer__animation">
      <div className="contact-footer__animation-pocket" />
      <div className="contact-footer__animation-glow contact-footer__animation-glow--a" />
      <div className="contact-footer__animation-glow contact-footer__animation-glow--b" />

      <div className="contact-footer__animation-ribbon contact-footer__animation-ribbon--a">
        <RibbonTrack variant="a" direction="left" />
      </div>

      <div className="contact-footer__animation-ribbon contact-footer__animation-ribbon--b">
        <RibbonTrack variant="b" direction="right" />
      </div>

      <div className="contact-footer__animation-ribbon contact-footer__animation-ribbon--c">
        <RibbonTrack variant="c" direction="left" />
      </div>
    </div>
  )
}
