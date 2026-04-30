// portfolio-v1-editorial.jsx — Editorial direction with gradient palette
// Palette: #FFEDCE cream · #FFC193 peach · #FF8383 coral · #FF3737 red
//          #C3CC9B sage · #546B41 forest

const EP_PALETTE = {
  cream: '#FFEDCE',
  peach: '#FFC193',
  coral: '#FF8383',
  red: '#FF3737',
  sage: '#C3CC9B',
  forest: '#546B41',
  ink: '#1F1A14',
  paper: '#FFFAF0'
};

function EditorialPortfolio({ accent = '#FF3737', serifFont, sansFont, monoFont }) {
  const bio = window.PORTFOLIO_BIO;
  const projects = window.PORTFOLIO_PROJECTS;
  const { items, dragProps } = window.useReorderable(projects, 'portfolio-v1-order');
  const [open, setOpen] = React.useState(null);

  const fonts = {
    serif: `"${serifFont || 'Instrument Serif'}", Georgia, serif`,
    sans: `"${sansFont || 'Inter'}", system-ui, sans-serif`,
    mono: `"${sansFont || 'Inter'}", system-ui, sans-serif`
  };

  const openProject = items.find((p) => p.id === open);

  // Hero gradient — cream → peach → coral wash
  const heroGradient = `linear-gradient(135deg, ${EP_PALETTE.cream} 0%, ${EP_PALETTE.peach} 60%, ${EP_PALETTE.coral} 100%)`;
  // Primary button gradient — coral → red
  const btnGradient = `linear-gradient(135deg, ${EP_PALETTE.coral} 0%, ${EP_PALETTE.red} 100%)`;

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: EP_PALETTE.cream,
      color: EP_PALETTE.ink,
      fontFamily: fonts.sans,
      boxSizing: 'border-box'
    }}>
      {/* HERO with gradient background */}
      <div style={{
        background: heroGradient,
        padding: '40px 64px 96px',
        position: 'relative', overflow: 'hidden'
      }}>
        {/* Soft blob accent */}
        <div aria-hidden style={{
          position: 'absolute', top: -120, right: -80, width: 480, height: 480,
          background: `radial-gradient(closest-side, ${EP_PALETTE.red}55, transparent 70%)`,
          filter: 'blur(20px)', pointerEvents: 'none'
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: -160, left: -120, width: 520, height: 520,
          background: `radial-gradient(closest-side, ${EP_PALETTE.sage}66, transparent 70%)`,
          filter: 'blur(30px)', pointerEvents: 'none'
        }} />

        {/* Top meta bar */}
        <div style={{
          position: 'relative',
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: EP_PALETTE.ink,
          borderBottom: `1px solid ${EP_PALETTE.ink}22`, paddingBottom: 14, marginBottom: 56
        }}>
          <span style={{ whiteSpace: 'nowrap' }}>{bio.name.toLowerCase().replace(' ', '.')} / portfolio</span>
          <span style={{ whiteSpace: 'nowrap', fontFamily: "Inter" }}>2026 — {bio.location}</span>
        </div>

        <section style={{
          position: 'relative',
          display: 'grid', gridTemplateColumns: '200px 1fr',
          gap: 48, alignItems: 'start'
        }}>
          {/* Photo card with gradient frame */}
          <div style={{
            width: 200, height: 240, borderRadius: 8,
            padding: 4,
            background: `linear-gradient(160deg, ${EP_PALETTE.paper}, ${EP_PALETTE.cream})`,
            boxShadow: `0 18px 40px -16px ${EP_PALETTE.ink}33`
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: 6,
              background: `linear-gradient(135deg, ${EP_PALETTE.peach}, ${EP_PALETTE.coral})`,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{
                fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.12em',
                color: EP_PALETTE.paper,
                background: `${EP_PALETTE.ink}33`, padding: '4px 10px', borderRadius: 999
              }}>PHOTO</span>
            </div>
          </div>

          <div style={{ paddingTop: 4 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.1em',
              textTransform: 'uppercase', color: EP_PALETTE.forest,
              background: `${EP_PALETTE.sage}66`,
              padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap',
              marginBottom: 20
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: 999, background: EP_PALETTE.forest
              }} />
              Available for projects, summer 2026
            </div>
            <h1 style={{
              fontFamily: fonts.serif, fontWeight: 400,
              fontSize: 76, lineHeight: 1.0, margin: 0,
              letterSpacing: '-0.025em', textWrap: 'pretty',
              color: EP_PALETTE.ink
            }}>
              {bio.name},<br />
              <em style={{
                fontStyle: 'italic',
                background: `linear-gradient(120deg, ${EP_PALETTE.red}, ${EP_PALETTE.forest})`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>{bio.role.toLowerCase()}</em>
            </h1>
            <p style={{
              maxWidth: 600, marginTop: 24,
              fontSize: 16, lineHeight: 1.55,
              color: EP_PALETTE.ink
            }}>{bio.paragraph}</p>
            <div style={{ display: 'flex', gap: 10, marginTop: 28, flexWrap: 'wrap' }}>
              <GradBtn href={`mailto:${bio.email}`} primary gradient={btnGradient}>
                {bio.email} ↗
              </GradBtn>
              <GradBtn href="#">Download CV ↓</GradBtn>
              {bio.socials.slice(0, 2).map((s) =>
              <GradBtn key={s.label} href={s.url}>{s.label} ↗</GradBtn>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* CONTENT */}
      <div style={{ padding: '64px 64px 96px' }}>
        {/* SKILLS */}
        <section style={{ marginBottom: 64 }}>
          <SectionLabel fonts={fonts} num="01" title="Toolkit" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {bio.skills.map((s, i) =>
            <span key={s} style={{
                fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, letterSpacing: '0.04em',
                padding: '7px 12px', borderRadius: 999, whiteSpace: 'nowrap',
                color: EP_PALETTE.paper,
                background: `linear-gradient(135deg, ${EP_PALETTE.coral} 0%, ${EP_PALETTE.red} 100%)`,
                border: `1px solid ${EP_PALETTE.red}`,
                boxShadow: `0 4px 10px -4px ${EP_PALETTE.red}55`
              }}>{s}</span>
            )}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <SectionLabel fonts={fonts} num="02"
          title="Selected work"
          hint="Drag any card to reorder ↔" />
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20
          }}>
            {items.map((p, idx) =>
            <EditorialCard key={p.id} p={p} idx={idx} fonts={fonts}
            dragProps={dragProps(p.id)} onOpen={() => setOpen(p.id)} />
            )}
          </div>
        </section>

        <footer style={{
          marginTop: 96, paddingTop: 24,
          borderTop: `1px solid ${EP_PALETTE.ink}22`,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: fonts.mono, fontSize: 11, color: EP_PALETTE.forest,
          letterSpacing: '0.06em', textTransform: 'uppercase'
        }}>
          <span>© {bio.name}, 2026</span>
          <span>{bio.email}</span>
        </footer>
      </div>

      {openProject &&
      <window.CaseStudyOverlay project={openProject} accent={accent} fonts={fonts}
      variant="editorial" palette={EP_PALETTE}
      onClose={() => setOpen(null)} />
      }
    </div>);

}

function SectionLabel({ fonts, num, title, hint }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      marginBottom: 24, gap: 16
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.1em',
          background: `linear-gradient(135deg, ${EP_PALETTE.coral}, ${EP_PALETTE.red})`,
          WebkitBackgroundClip: 'text', backgroundClip: 'text',
          WebkitTextFillColor: 'transparent', fontWeight: 600
        }}>
          {num}
        </span>
        <h2 style={{
          fontFamily: fonts.serif, fontWeight: 400, fontSize: 32,
          margin: 0, letterSpacing: '-0.01em', color: EP_PALETTE.ink
        }}>{title}</h2>
      </div>
      {hint && <span style={{
        fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.1em',
        color: EP_PALETTE.forest, textTransform: 'uppercase', whiteSpace: 'nowrap'
      }}>{hint}</span>}
    </div>);

}

function EditorialCard({ p, idx, fonts, dragProps, onOpen }) {
  const dragging = dragProps['data-drag-state'] === 'dragging';
  const over = dragProps['data-drag-state'] === 'over';
  const [hover, setHover] = React.useState(false);

  // Each card has its own gradient cover overlay using the palette
  const coverGradients = [
  `linear-gradient(135deg, ${EP_PALETTE.peach}, ${EP_PALETTE.coral})`,
  `linear-gradient(135deg, ${EP_PALETTE.sage}, ${EP_PALETTE.forest})`,
  `linear-gradient(135deg, ${EP_PALETTE.cream}, ${EP_PALETTE.peach})`,
  `linear-gradient(135deg, ${EP_PALETTE.coral}, ${EP_PALETTE.red})`,
  `linear-gradient(135deg, ${EP_PALETTE.peach}, ${EP_PALETTE.sage})`,
  `linear-gradient(135deg, ${EP_PALETTE.red}, ${EP_PALETTE.forest})`,
  `linear-gradient(135deg, ${EP_PALETTE.sage}, ${EP_PALETTE.peach})`,
  `linear-gradient(135deg, ${EP_PALETTE.forest}, ${EP_PALETTE.coral})`];

  const cover = coverGradients[idx % coverGradients.length];

  return (
    <article {...dragProps}
    onClick={onOpen}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      background: EP_PALETTE.paper,
      border: `1px solid ${EP_PALETTE.ink}12`,
      borderRadius: 8, overflow: 'hidden', cursor: 'pointer',
      opacity: dragging ? 0.4 : 1,
      transform: over ? 'translateX(6px)' : hover ? 'translateY(-3px)' : 'none',
      transition: 'transform .18s ease, box-shadow .18s ease, opacity .15s',
      boxShadow: hover ?
      `0 18px 36px -16px ${EP_PALETTE.ink}40` :
      `0 1px 0 ${EP_PALETTE.ink}08`,
      boxSizing: 'border-box', display: 'flex', flexDirection: 'column',
      userSelect: 'none'
    }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: cover }}>
        {/* Subtle stripe texture */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0,
          backgroundImage: `repeating-linear-gradient(135deg, ${EP_PALETTE.paper}22 0 12px, transparent 12px 24px)`
        }} />
        {/* Cover label */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{
            fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: '0.08em',
            color: EP_PALETTE.ink, textTransform: 'uppercase',
            padding: '5px 11px', borderRadius: 999,
            background: `${EP_PALETTE.paper}cc`,
            backdropFilter: 'blur(2px)'
          }}>{p.cover.label}</span>
        </div>
        <span style={{
          position: 'absolute', top: 8, left: 8,
          fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.08em',
          padding: '3px 8px', borderRadius: 999,
          background: EP_PALETTE.paper, color: EP_PALETTE.ink
        }}>{String(idx + 1).padStart(2, '0')}</span>
        <span style={{
          position: 'absolute', top: 8, right: 8,
          fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.08em',
          padding: '3px 8px', borderRadius: 999,
          background: `linear-gradient(135deg, ${EP_PALETTE.coral}, ${EP_PALETTE.red})`,
          color: EP_PALETTE.paper, fontWeight: 500
        }}>{p.year}</span>
      </div>
      <div style={{
        padding: '14px 14px 16px',
        display: 'flex', flexDirection: 'column', gap: 8, flex: 1
      }}>
        <h3 style={{
          fontFamily: fonts.serif, fontWeight: 400, fontSize: 20,
          margin: 0, lineHeight: 1.2, letterSpacing: '-0.01em',
          color: EP_PALETTE.ink, textWrap: 'pretty'
        }}>{p.title}</h3>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.45, color: EP_PALETTE.ink }}>
          {p.description}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {p.tags.map((t) =>
          <span key={t} style={{
            fontFamily: fonts.mono, fontSize: 9.5, letterSpacing: '0.05em',
            padding: '2px 7px', borderRadius: 3, whiteSpace: 'nowrap',
            background: `${EP_PALETTE.sage}55`, color: EP_PALETTE.forest
          }}>{t}</span>
          )}
        </div>
        <div style={{
          fontFamily: fonts.mono, fontSize: 10, color: EP_PALETTE.forest,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          paddingTop: 4, borderTop: `1px dashed ${EP_PALETTE.ink}18`, marginTop: 4
        }}>{p.role}</div>
      </div>
    </article>);

}

function GradBtn({ href, primary, gradient, children }) {
  const [hover, setHover] = React.useState(false);
  const base = {
    fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
    padding: '10px 16px', borderRadius: 999,
    textDecoration: 'none', display: 'inline-block',
    transition: 'transform .15s, box-shadow .15s, background .2s',
    transform: hover ? 'translateY(-1px)' : 'none'
  };
  if (primary) {
    return (
      <a href={href}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        ...base,
        background: gradient,
        color: EP_PALETTE.paper,
        border: `1px solid ${EP_PALETTE.red}`,
        boxShadow: hover ?
        `0 10px 24px -8px ${EP_PALETTE.red}80` :
        `0 4px 10px -4px ${EP_PALETTE.red}55`
      }}>{children}</a>);

  }
  return (
    <a href={href}
    onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
    style={{
      ...base,
      background: hover ?
      `linear-gradient(135deg, ${EP_PALETTE.paper}, ${EP_PALETTE.cream})` :
      'transparent',
      color: EP_PALETTE.ink,
      border: `1px solid ${EP_PALETTE.ink}30`
    }}>{children}</a>);

}

window.EditorialPortfolio = EditorialPortfolio;
window.EP_PALETTE = EP_PALETTE;