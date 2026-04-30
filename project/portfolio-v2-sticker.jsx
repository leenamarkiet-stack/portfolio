// portfolio-v2-sticker.jsx — Sticker Sheet variation
// Playful, color-blocked, slightly tilted cards, color-pop highlights.

function StickerPortfolio({ accent = '#E0533C', serifFont, sansFont, monoFont }) {
  const bio = window.PORTFOLIO_BIO;
  const projects = window.PORTFOLIO_PROJECTS;
  const { items, dragProps } = window.useReorderable(projects, 'portfolio-v2-order');
  const [open, setOpen] = React.useState(null);

  const fonts = {
    serif: `"${serifFont || 'Instrument Serif'}", Georgia, serif`,
    sans:  `"${sansFont  || 'Inter Tight'}", system-ui, sans-serif`,
    mono:  `"${monoFont  || 'Inter'}", system-ui, sans-serif`,
  };

  // Per-card tilt + accent block — deterministic by index so reorder feels right
  const tints = ['#F8D7C2', '#C9DCE8', '#D6E5C7', '#E8D7E5', '#EDE3B7', '#D9D2EC', '#F4C9C2', '#C7E0DA'];
  const tilts = [-1.2, 0.6, -0.4, 1.1, -0.8, 0.3, -1.0, 0.7];

  const openProject = items.find(p => p.id === open);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: '#FFF8EE', color: '#1B1816',
      fontFamily: fonts.sans,
      padding: '48px 56px 96px',
      boxSizing: 'border-box',
      backgroundImage: `radial-gradient(circle at 15% 10%, ${accent}10 0%, transparent 50%),
                        radial-gradient(circle at 85% 60%, #5BA3C422 0%, transparent 50%)`,
    }}>
      {/* Top sticker bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 32,
      }}>
        <span style={{
          fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.06em',
          padding: '6px 12px', borderRadius: 999,
          background: '#1B1816', color: '#FFF8EE',
          transform: 'rotate(-1.2deg)', display: 'inline-block',
        }}>★ {bio.name.toUpperCase()} — PORTFOLIO V.2026</span>
        <span style={{
          fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: '0.08em',
          padding: '5px 11px', borderRadius: 999,
          background: '#FFF', color: '#1B1816',
          border: '1px solid rgba(0,0,0,0.12)',
          transform: 'rotate(0.8deg)', display: 'inline-block',
        }}>📍 {bio.location}</span>
      </div>

      {/* HERO — sticker card layout */}
      <section style={{
        display: 'grid', gridTemplateColumns: '220px 1fr 200px',
        gap: 28, alignItems: 'start', marginBottom: 64,
      }}>
        {/* photo sticker */}
        <div style={{
          aspectRatio: '4/5', borderRadius: 14, overflow: 'hidden',
          background: `linear-gradient(160deg, ${accent}, ${accent}aa)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#FFF8EE', fontFamily: fonts.mono, fontSize: 11,
          letterSpacing: '0.1em',
          transform: 'rotate(-2.5deg)',
          boxShadow: '0 14px 28px -8px rgba(0,0,0,0.18)',
          border: '4px solid #FFF8EE', outline: '1px solid rgba(0,0,0,0.06)',
        }}>PHOTO</div>

        {/* big intro */}
        <div>
          <div style={{
            display: 'inline-block', marginBottom: 12,
            fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.08em',
            padding: '5px 12px', borderRadius: 999,
            background: '#1B1816', color: accent,
            transform: 'rotate(-0.6deg)',
          }}>HEY 👋 I'M…</div>
          <h1 style={{
            margin: 0, fontFamily: fonts.serif, fontWeight: 400,
            fontSize: 88, lineHeight: 0.96, letterSpacing: '-0.025em',
          }}>
            <span style={{
              background: accent, color: '#FFF8EE',
              padding: '0 12px', borderRadius: 8,
              display: 'inline-block', transform: 'rotate(-0.8deg)',
            }}>Leena</span>{' '}
            <span style={{ fontStyle: 'italic' }}>Markiet</span>
          </h1>
          <p style={{
            margin: '20px 0 0', maxWidth: 540, fontSize: 17, lineHeight: 1.5,
            color: '#3A332C',
          }}>
            <strong style={{ background: '#EDE3B7', padding: '0 4px' }}>
              {bio.role}
            </strong>{' '}— {bio.paragraph.replace(/^I'm a service designer.*?land\. /, '')}
          </p>
          <div style={{ marginTop: 22, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a href={`mailto:${bio.email}`} style={stickerBtn(accent, '#FFF8EE', -0.5)}>✉ {bio.email}</a>
            <a href="#" style={stickerBtn('#1B1816', '#FFF8EE', 0.7)}>↓ CV</a>
            <a href="#" style={stickerBtn('#FFF', '#1B1816', -0.4)}>in / LinkedIn</a>
          </div>
        </div>

        {/* badge column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingTop: 8 }}>
          <Badge fonts={fonts} bg={accent} fg="#FFF8EE" tilt={2.5}>
            <div style={{ fontFamily: fonts.serif, fontSize: 30, lineHeight: 1 }}>8+</div>
            <div style={{ fontSize: 10, letterSpacing: '0.08em' }}>YEARS</div>
          </Badge>
          <Badge fonts={fonts} bg="#1B1816" fg="#FFF8EE" tilt={-2}>
            <div style={{ fontFamily: fonts.serif, fontSize: 30, lineHeight: 1 }}>40+</div>
            <div style={{ fontSize: 10, letterSpacing: '0.08em' }}>PROJECTS</div>
          </Badge>
          <Badge fonts={fonts} bg="#EDE3B7" fg="#1B1816" tilt={1.8}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, lineHeight: 1.2, letterSpacing: '0.06em' }}>
              ✦ AVAILABLE<br/>SUMMER ‘26
            </div>
          </Badge>
        </div>
      </section>

      {/* SKILLS sticker row */}
      <section style={{ marginBottom: 56 }}>
        <SectionTitle fonts={fonts} accent={accent}>What I do</SectionTitle>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          {bio.skills.map((s, i) => (
            <span key={s} style={{
              fontFamily: fonts.mono, fontSize: 12, letterSpacing: '0.03em',
              padding: '7px 13px', borderRadius: 999,
              background: tints[i % tints.length], color: '#1B1816',
              border: '1px solid rgba(0,0,0,0.1)',
              transform: `rotate(${(i % 3 - 1) * 0.7}deg)`,
              display: 'inline-block',
            }}>{s}</span>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: 24,
        }}>
          <SectionTitle fonts={fonts} accent={accent}>Selected work</SectionTitle>
          <span style={{
            fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.08em',
            color: '#5C544A', textTransform: 'uppercase',
          }}>↔ drag to reorder</span>
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22,
        }}>
          {items.map((p, idx) => (
            <StickerCard key={p.id} p={p} idx={idx} accent={accent} fonts={fonts}
              tint={tints[idx % tints.length]} tilt={tilts[idx % tilts.length]}
              dragProps={dragProps(p.id)} onOpen={() => setOpen(p.id)} />
          ))}
        </div>
      </section>

      <footer style={{
        marginTop: 80, paddingTop: 28,
        borderTop: '2px dashed rgba(0,0,0,0.18)',
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12,
        fontFamily: fonts.mono, fontSize: 11, color: '#5C544A',
        letterSpacing: '0.06em',
      }}>
        <span>♥ Made with care, in Helsinki — © 2026</span>
        <span>{bio.email}</span>
      </footer>

      {openProject && (
        <window.CaseStudyOverlay project={openProject} accent={accent} fonts={fonts}
          variant="sticker" onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

function Badge({ fonts, bg, fg, tilt, children }) {
  return (
    <div style={{
      background: bg, color: fg, padding: '12px 14px',
      borderRadius: 12, transform: `rotate(${tilt}deg)`,
      boxShadow: '0 6px 16px -8px rgba(0,0,0,0.2)',
      border: '3px solid #FFF8EE', outline: '1px solid rgba(0,0,0,0.06)',
      fontFamily: fonts.sans, textAlign: 'center',
    }}>{children}</div>
  );
}

function SectionTitle({ fonts, accent, children }) {
  return (
    <h2 style={{
      margin: 0, fontFamily: fonts.serif, fontWeight: 400,
      fontSize: 36, letterSpacing: '-0.01em', display: 'inline-block',
    }}>
      <span style={{
        borderBottom: `4px solid ${accent}`, paddingBottom: 2,
      }}>{children}</span>
    </h2>
  );
}

function StickerCard({ p, idx, accent, fonts, tint, tilt, dragProps, onOpen }) {
  const dragging = dragProps['data-drag-state'] === 'dragging';
  const over = dragProps['data-drag-state'] === 'over';
  const [hover, setHover] = React.useState(false);
  return (
    <article {...dragProps}
      onClick={onOpen}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: '#FFFCF6', borderRadius: 14, overflow: 'hidden',
        cursor: 'pointer', userSelect: 'none',
        opacity: dragging ? 0.4 : 1,
        transform: `rotate(${hover || over ? 0 : tilt}deg) ${hover ? 'translateY(-4px) scale(1.02)' : ''}`,
        transition: 'transform .22s cubic-bezier(.2,.7,.3,1), box-shadow .2s',
        boxShadow: hover ? '0 18px 32px -10px rgba(0,0,0,0.22)' : '0 6px 14px -8px rgba(0,0,0,0.12)',
        border: '1px solid rgba(0,0,0,0.06)',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ position: 'relative', aspectRatio: '4/3', background: tint }}>
        <window.PlaceholderImage hue={p.cover.hue} label={p.cover.label} />
        <span style={{
          position: 'absolute', top: 10, left: 10,
          fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.08em',
          padding: '4px 9px', borderRadius: 999,
          background: '#1B1816', color: '#FFF8EE',
          transform: 'rotate(-3deg)', display: 'inline-block',
        }}>#{String(idx+1).padStart(2,'0')}</span>
        <span style={{
          position: 'absolute', bottom: 10, right: 10,
          fontFamily: fonts.serif, fontSize: 18,
          padding: '2px 10px', borderRadius: 999,
          background: accent, color: '#FFF8EE',
          transform: 'rotate(2deg)', display: 'inline-block',
        }}>{p.year}</span>
      </div>
      <div style={{ padding: '14px 14px 16px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
        <h3 style={{
          fontFamily: fonts.serif, fontWeight: 400, fontSize: 21,
          margin: 0, lineHeight: 1.1, letterSpacing: '-0.01em',
        }}>{p.title}</h3>
        <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.45, color: '#3A332C' }}>
          {p.description}
        </p>
        <div style={{ marginTop: 'auto', paddingTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.04em',
              padding: '3px 8px', borderRadius: 999,
              background: tint, color: '#1B1816',
              border: '1px solid rgba(0,0,0,0.1)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

function stickerBtn(bg, fg, tilt) {
  return {
    fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
    padding: '9px 14px', borderRadius: 999,
    background: bg, color: fg,
    border: '1px solid rgba(0,0,0,0.12)',
    textDecoration: 'none', display: 'inline-block',
    transform: `rotate(${tilt}deg)`,
    boxShadow: '0 4px 10px -4px rgba(0,0,0,0.15)',
  };
}

window.StickerPortfolio = StickerPortfolio;
