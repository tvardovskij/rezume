import type { CSSProperties } from "react";

type Point = {
  x: number;
  y: number;
};

type AmbientAnchor = {
  key: string;
  point: Point;
  glowRadius: number;
  coreRadius: number;
  color: string;
  opacity: number;
  animationDelay: string;
  animationDuration: string;
};

function round(value: number) {
  return Number(value.toFixed(2));
}

function createInfinityPoints(
  count: number,
  scaleX: number,
  scaleY: number,
  centerX = 600,
  centerY = 450,
  offset = 0,
) {
  return Array.from({ length: count }, (_, index) => {
    const t = (index / count) * Math.PI * 2 + offset;
    const sinT = Math.sin(t);
    const cosT = Math.cos(t);
    const denom = 1 + sinT * sinT;

    return {
      x: round(centerX + scaleX * (cosT / denom)),
      y: round(centerY + scaleY * ((sinT * cosT) / denom)),
    } satisfies Point;
  });
}

function scalePoints(points: Point[], scaleX: number, scaleY: number, centerX = 600, centerY = 450) {
  return points.map((point) => ({
    x: round(centerX + (point.x - centerX) * scaleX),
    y: round(centerY + (point.y - centerY) * scaleY),
  }));
}

function createClosedSmoothPath(points: Point[]) {
  if (points.length < 2) {
    return "";
  }

  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length];
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const afterNext = points[(index + 2) % points.length];

    const cp1x = round(current.x + (next.x - previous.x) / 6);
    const cp1y = round(current.y + (next.y - previous.y) / 6);
    const cp2x = round(next.x - (afterNext.x - current.x) / 6);
    const cp2y = round(next.y - (afterNext.y - current.y) / 6);

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`;
  }

  return `${path} Z`;
}

function createAnchors(points: Point[], count: number, hueShift = 0) {
  const step = Math.max(1, Math.floor(points.length / count));

  return Array.from({ length: count }, (_, index): AmbientAnchor => {
    const point = points[(index * step + Math.floor(step / 2)) % points.length];
    const depth = (Math.cos((index / count) * Math.PI * 2) + 1) / 2;

    return {
      key: `anchor-${count}-${index}`,
      point,
      glowRadius: round(8 + depth * 6),
      coreRadius: round(1.8 + depth * 1.3),
      color: `hsla(${192 + hueShift + depth * 38}, 98%, ${64 + depth * 8}%, ${0.48 + depth * 0.18})`,
      opacity: round(0.28 + depth * 0.22),
      animationDelay: `${(-index * 0.65).toFixed(2)}s`,
      animationDuration: `${(7.6 + (index % 3) * 1.4).toFixed(2)}s`,
    };
  });
}

const outerPoints = createInfinityPoints(96, 282, 218, 600, 450, Math.PI / 2);
const innerPoints = scalePoints(outerPoints, 0.84, 0.8);

const outerPath = createClosedSmoothPath(outerPoints);
const innerPath = createClosedSmoothPath(innerPoints);

const outerAnchors = createAnchors(outerPoints, 8, 0);
const innerAnchors = createAnchors(innerPoints, 4, 16);

export function HeroAmbientLogo() {
  return (
    <div className="hero__animation">
      <svg
        className="hero__animation-svg"
        viewBox="0 0 1200 900"
        preserveAspectRatio="xMidYMid slice"
        role="presentation"
      >
        <defs>
          <radialGradient id="hero-animation-field" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c84eff" stopOpacity="0.34" />
            <stop offset="20%" stopColor="#ff6abc" stopOpacity="0.18" />
            <stop offset="48%" stopColor="#2f7fff" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#070f25" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hero-animation-aurora-mint" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#29f3c1" stopOpacity="0.34" />
            <stop offset="70%" stopColor="#29f3c1" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#29f3c1" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hero-animation-aurora-blue" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2c7dff" stopOpacity="0.42" />
            <stop offset="66%" stopColor="#2c7dff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#2c7dff" stopOpacity="0" />
          </radialGradient>

          <radialGradient id="hero-animation-aurora-rose" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff529e" stopOpacity="0.36" />
            <stop offset="64%" stopColor="#ff529e" stopOpacity="0.07" />
            <stop offset="100%" stopColor="#ff529e" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="hero-animation-ribbon-halo" x1="270" y1="450" x2="930" y2="450">
            <stop offset="0%" stopColor="#22f2c6" stopOpacity="0.08" />
            <stop offset="42%" stopColor="#d54fff" stopOpacity="0.16" />
            <stop offset="100%" stopColor="#2c7fff" stopOpacity="0.08" />
          </linearGradient>

          <linearGradient id="hero-animation-ribbon-shell" x1="270" y1="450" x2="930" y2="450">
            <stop offset="0%" stopColor="#27efc6" />
            <stop offset="26%" stopColor="#247fff" />
            <stop offset="48%" stopColor="#b84dff" />
            <stop offset="68%" stopColor="#ff559d" />
            <stop offset="100%" stopColor="#2d7dff" />
          </linearGradient>

          <linearGradient id="hero-animation-ribbon-inner" x1="320" y1="360" x2="880" y2="540">
            <stop offset="0%" stopColor="#39efcf" stopOpacity="0.08" />
            <stop offset="34%" stopColor="#3a8bff" stopOpacity="0.2" />
            <stop offset="56%" stopColor="#c362ff" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#ff5ea8" stopOpacity="0.12" />
          </linearGradient>

          <linearGradient id="hero-animation-current-cyan" x1="270" y1="450" x2="930" y2="450">
            <stop offset="0%" stopColor="#59ffd3" stopOpacity="0" />
            <stop offset="40%" stopColor="#4dc7ff" stopOpacity="0.34" />
            <stop offset="50%" stopColor="#8fe3ff" stopOpacity="0.62" />
            <stop offset="60%" stopColor="#397fff" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#397fff" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="hero-animation-current-rose" x1="270" y1="450" x2="930" y2="450">
            <stop offset="0%" stopColor="#ff82c7" stopOpacity="0" />
            <stop offset="42%" stopColor="#ff67ae" stopOpacity="0.26" />
            <stop offset="50%" stopColor="#ff8fd7" stopOpacity="0.48" />
            <stop offset="58%" stopColor="#8d63ff" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#8d63ff" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="hero-animation-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f4f7ff" stopOpacity="0.72" />
            <stop offset="18%" stopColor="#e06cff" stopOpacity="0.3" />
            <stop offset="42%" stopColor="#58acff" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#123570" stopOpacity="0" />
          </radialGradient>
        </defs>

        <g className="hero__animation-scene">
          <ellipse
            className="hero__animation-field"
            cx="600"
            cy="450"
            rx="330"
            ry="212"
            fill="url(#hero-animation-field)"
          />

          <g className="hero__animation-auroras">
            <ellipse
              className="hero__animation-aurora hero__animation-aurora--mint"
              cx="404"
              cy="320"
              rx="224"
              ry="128"
              fill="url(#hero-animation-aurora-mint)"
            />
            <ellipse
              className="hero__animation-aurora hero__animation-aurora--blue"
              cx="780"
              cy="514"
              rx="242"
              ry="142"
              fill="url(#hero-animation-aurora-blue)"
            />
            <ellipse
              className="hero__animation-aurora hero__animation-aurora--rose"
              cx="654"
              cy="266"
              rx="174"
              ry="106"
              fill="url(#hero-animation-aurora-rose)"
            />
          </g>

          <g className="hero__animation-symbol">
            <path className="hero__animation-ribbon hero__animation-ribbon--halo" d={outerPath} />
            <path className="hero__animation-ribbon hero__animation-ribbon--shell" d={outerPath} />
            <path className="hero__animation-ribbon hero__animation-ribbon--inner" d={innerPath} />
            <path className="hero__animation-ribbon hero__animation-ribbon--current-a" d={outerPath} />
            <path className="hero__animation-ribbon hero__animation-ribbon--current-b" d={innerPath} />
          </g>

          <g className="hero__animation-center">
            <circle className="hero__animation-core-aura" cx="600" cy="450" r="34" fill="url(#hero-animation-core)" />
            <circle className="hero__animation-core-ring hero__animation-core-ring--outer" cx="600" cy="450" r="38" />
            <circle className="hero__animation-core-ring hero__animation-core-ring--inner" cx="600" cy="450" r="24" />
            <circle className="hero__animation-core-dot" cx="600" cy="450" r="7" />
          </g>

          {outerAnchors.map((anchor) => (
            <g
              key={anchor.key}
              className="hero__animation-anchor"
              style={
                {
                  opacity: anchor.opacity,
                  animationDelay: anchor.animationDelay,
                  animationDuration: anchor.animationDuration,
                } satisfies CSSProperties
              }
            >
              <circle
                className="hero__animation-anchor-glow"
                cx={anchor.point.x}
                cy={anchor.point.y}
                r={anchor.glowRadius}
                style={{ color: anchor.color } satisfies CSSProperties}
              />
              <circle
                className="hero__animation-anchor-core"
                cx={anchor.point.x}
                cy={anchor.point.y}
                r={anchor.coreRadius}
                style={{ color: anchor.color } satisfies CSSProperties}
              />
            </g>
          ))}

          {innerAnchors.map((anchor) => (
            <g
              key={anchor.key}
              className="hero__animation-anchor hero__animation-anchor--secondary"
              style={
                {
                  opacity: anchor.opacity * 0.84,
                  animationDelay: anchor.animationDelay,
                  animationDuration: `${Number.parseFloat(anchor.animationDuration) + 1.2}s`,
                } satisfies CSSProperties
              }
            >
              <circle
                className="hero__animation-anchor-glow"
                cx={anchor.point.x}
                cy={anchor.point.y}
                r={anchor.glowRadius * 0.78}
                style={{ color: anchor.color } satisfies CSSProperties}
              />
              <circle
                className="hero__animation-anchor-core"
                cx={anchor.point.x}
                cy={anchor.point.y}
                r={anchor.coreRadius * 0.84}
                style={{ color: anchor.color } satisfies CSSProperties}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
