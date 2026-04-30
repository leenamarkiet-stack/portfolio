// portfolio-case-study.jsx — full-page case study overlay used by all variations.

function CaseStudyOverlay({ project, accent, fonts, variant = 'editorial', palette, onClose }) {
  const cs = window.CASE_STUDY_TEMPLATE(project);
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const monoBg = variant === 'terminal';
  const playful = variant === 'sticker';
  const P = palette || window.EP_PALETTE || {
    cream: '#FFEDCE', peach: '#FFC193', coral: '#FF8383', red: '#FF3737',
    sage: '#C3CC9B', forest: '#546B41', ink: '#1F1A14', paper: '#FFFAF0',
  };

  const bg = monoBg ? '#0E0E0E' : (playful ? '#FFF8EE' : P.cream);
  const fg = monoBg ? '#E8E5DD' : P.ink;
  const heroGrad = `linear-gradient(135deg, ${P.cream}, ${P.peach} 60%, ${P.coral})`;
  const ctaGrad  = `linear-gradient(135deg, ${P.coral}, ${P.red})`;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 1000,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start',
      overflow: 'auto', padding: '24px',
      animation: 'cs-fadein .25s ease',
    }} onClick={onClose}>
      <style>{`
        @keyframes cs-fadein { from { opacity: 0; } to { opacity: 1; } }
        @keyframes cs-slide { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: none; } }
      `}</style>
      <div onClick={(e) => e.stopPropagation()} ref={scrollRef}
        style={{
          width: '100%', maxWidth: 1080,
          background: bg, color: fg,
          borderRadius: 12, overflow: 'hidden',
          boxShadow: '0 40px 80px -20px rgba(0,0,0,0.45)',
          fontFamily: fonts.sans,
          animation: 'cs-slide .3s ease',
        }}>
        {/* Header bar */}
        <div style={{
          position: 'sticky', top: 0, zIndex: 2,
          background: bg, borderBottom: `1px solid ${monoBg ? '#222' : 'rgba(0,0,0,0.08)'}`,
          padding: '14px 28px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <span style={{
            fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.1em',
            textTransform: 'uppercase', color: monoBg ? '#888' : '#5C544A',
          }}>
            ← Case study / {project.year}
          </span>
          <button onClick={onClose} style={{
            border: `1px solid ${monoBg ? '#333' : 'rgba(0,0,0,0.18)'}`,
            background: 'transparent', color: fg,
            padding: '6px 12px', borderRadius: 999, cursor: 'pointer',
            fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.06em',
            textTransform: 'uppercase',
          }}>Close ✕</button>
        </div>

        {/* Hero */}
        <header style={{
          padding: '40px 56px 32px',
          background: monoBg ? bg : (playful ? bg : heroGrad),
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20,
            position: 'relative',
          }}>
            {project.tags.map(t => (
              <span key={t} style={{
                fontFamily: fonts.mono, fontSize: 10.5, letterSpacing: '0.06em',
                padding: '4px 10px', borderRadius: 999,
                background: monoBg ? '#1A1A1A' : `${P.paper}cc`,
                border: monoBg ? '1px solid #2A2A2A' : `1px solid ${P.ink}18`,
                color: monoBg ? '#CCC' : P.ink,
              }}>{t}</span>
            ))}
          </div>
          <h1 style={{
            margin: 0, fontFamily: fonts.serif, fontWeight: 400,
            fontSize: 56, lineHeight: 1.05, letterSpacing: '-0.02em',
            textWrap: 'pretty', position: 'relative',
          }}>
            {project.title}
          </h1>
          <p style={{
            margin: '20px 0 0', maxWidth: 640, fontSize: 17, lineHeight: 1.55,
            color: monoBg ? '#B8B5AD' : P.ink, position: 'relative',
          }}>{cs.overview}</p>

          {/* Meta strip */}
          <div style={{
            marginTop: 32, display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)', gap: 16,
            paddingTop: 20, position: 'relative',
            borderTop: `1px dashed ${monoBg ? '#333' : `${P.ink}33`}`,
          }}>
            {cs.meta.map(m => (
              <div key={m.k}>
                <div style={{
                  fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.1em',
                  color: monoBg ? '#777' : P.forest, textTransform: 'uppercase',
                  marginBottom: 4,
                }}>{m.k}</div>
                <div style={{ fontSize: 13, color: fg }}>{m.v}</div>
              </div>
            ))}
          </div>
        </header>

        {/* Hero image */}
        <div style={{ padding: '0 56px' }}>
          <div style={{
            aspectRatio: '16/8', width: '100%', borderRadius: 8, overflow: 'hidden',
            border: monoBg ? '1px solid #222' : '1px solid rgba(0,0,0,0.06)',
            transform: playful ? 'rotate(-0.5deg)' : 'none',
          }}>
            <window.PlaceholderImage hue={project.cover.hue} label={cs.hero.label}
              mono={monoBg} />
          </div>
        </div>

        {/* Body sections */}
        <div style={{ padding: '40px 56px 56px' }}>
          {cs.sections.map((sec, i) => (
            <section key={i} style={{ marginBottom: 56 }}>
              <div style={{
                display: 'flex', alignItems: 'baseline', gap: 16,
                marginBottom: 18,
              }}>
                <span style={{
                  fontFamily: fonts.mono, fontSize: 11,
                  letterSpacing: '0.1em', fontWeight: 600,
                  background: monoBg ? 'transparent' : `linear-gradient(135deg, ${P.coral}, ${P.red})`,
                  color: monoBg ? accent : 'transparent',
                  WebkitBackgroundClip: monoBg ? undefined : 'text',
                  backgroundClip: monoBg ? undefined : 'text',
                  WebkitTextFillColor: monoBg ? accent : 'transparent',
                }}>0{i+1}</span>
                <h2 style={{
                  margin: 0, fontFamily: fonts.serif, fontWeight: 400,
                  fontSize: 30, letterSpacing: '-0.01em',
                }}>{sec.heading}</h2>
              </div>
              <p style={{
                margin: '0 0 20px', maxWidth: 680, fontSize: 15, lineHeight: 1.6,
                color: monoBg ? '#B8B5AD' : '#3A332C',
              }}>{sec.body}</p>
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12,
              }}>
                {sec.images.map((img, j) => (
                  <div key={j} style={{
                    aspectRatio: '4/3', borderRadius: 6, overflow: 'hidden',
                    border: monoBg ? '1px solid #222' : '1px solid rgba(0,0,0,0.08)',
                    transform: playful ? `rotate(${j % 2 ? 0.6 : -0.4}deg)` : 'none',
                  }}>
                    <window.PlaceholderImage
                      hue={project.cover.hue + (j * 30) + (i * 10)}
                      label={img.label} mono={monoBg} />
                  </div>
                ))}
              </div>
            </section>
          ))}

          {/* Outro */}
          <div style={{
            paddingTop: 28,
            borderTop: `1px solid ${monoBg ? '#222' : 'rgba(0,0,0,0.12)'}`,
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 16,
          }}>
            <span style={{
              fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.08em',
              color: monoBg ? '#777' : '#5C544A', textTransform: 'uppercase',
            }}>End of case study</span>
            <a href={`mailto:${window.PORTFOLIO_BIO.email}`} style={{
              fontFamily: 'inherit', fontSize: 13, fontWeight: 500,
              padding: '10px 18px', borderRadius: 999,
              background: monoBg ? accent : ctaGrad,
              color: monoBg ? '#0E0E0E' : P.paper,
              textDecoration: 'none',
              boxShadow: monoBg ? 'none' : `0 8px 20px -8px ${P.red}80`,
            }}>Talk about a project like this →</a>
          </div>
        </div>
      </div>
    </div>
  );
}

window.CaseStudyOverlay = CaseStudyOverlay;
