// portfolio-v3-terminal.jsx — Terminal / Index variation
// Monochrome utility, mono fonts, dense grid, accent for hover/pop.

function TerminalPortfolio({ accent = '#FF6A3D', serifFont, sansFont, monoFont }) {
  const bio = window.PORTFOLIO_BIO;
  const projects = window.PORTFOLIO_PROJECTS;
  const { items, dragProps } = window.useReorderable(projects, 'portfolio-v3-order');
  const [open, setOpen] = React.useState(null);

  const fonts = {
    serif: `"${serifFont || 'Instrument Serif'}", Georgia, serif`,
    sans:  `"${sansFont  || 'Inter Tight'}", system-ui, sans-serif`,
    mono:  `"${monoFont  || 'JetBrains Mono'}", ui-monospace, monospace`,
  };

  const openProject = items.find(p => p.id === open);

  return (
    <div style={{
      width: '100%', minHeight: '100%',
      background: '#0E0E0E', color: '#E8E5DD',
      fontFamily: fonts.mono,
      padding: '40px 56px 80px',
      boxSizing: 'border-box',
    }}>
      {/* Top status bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: 11, letterSpacing: '0.08em', color: '#888',
        padding: '8px 0', marginBottom: 40,
        borderBottom: '1px solid #222',
      }}>
        <span>~/leena.markiet/portfolio.html</span>
        <span style={{ display: 'flex', gap: 16 }}>
          <span style={{ color: accent }}>● ONLINE</span>
          <span>v.2026.04.30</span>
        </span>
      </div>

      {/* HERO */}
      <section style={{
        display: 'grid', gridTemplateColumns: '160px 1fr', gap: 32,
        alignItems: 'start', marginBottom: 64,
      }}>
        <div style={{
          width: 160, height: 200, overflow: 'hidden',
          background: '#1A1A1A',
          border: '1px solid #2A2A2A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#555', fontSize: 10, letterSpacing: '0.1em',
        }}>[ PHOTO.JPG ]</div>
        <div>
          <div style={{ fontSize: 11, color: '#777', marginBottom: 14 }}>
            <span style={{ color: accent }}>$</span> whoami
          </div>
          <h1 style={{
            margin: 0, fontFamily: fonts.serif, fontWeight: 400,
            fontSize: 80, lineHeight: 0.98, letterSpacing: '-0.02em',
            color: '#F5F2EA',
          }}>
            {bio.name}
          </h1>
          <div style={{
            fontFamily: fonts.mono, fontSize: 13, color: accent,
            marginTop: 8, letterSpacing: '0.04em',
          }}>
            &gt; {bio.role.toLowerCase()}
            <span style={{
              display: 'inline-block', width: 8, height: 14,
              background: accent, marginLeft: 6, verticalAlign: -2,
              animation: 'cursor-blink 1s steps(2) infinite',
            }}/>
          </div>
          <style>{`@keyframes cursor-blink { 50% { opacity: 0; } }`}</style>
          <p style={{
            margin: '24px 0 0', maxWidth: 580, fontSize: 13.5, lineHeight: 1.6,
            color: '#B8B5AD', fontFamily: fonts.mono,
          }}>{bio.paragraph}</p>

          {/* contact lines */}
          <div style={{
            marginTop: 20, fontSize: 12, color: '#888',
            display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '4px 14px',
            maxWidth: 480,
          }}>
            <span style={{ color: '#555' }}>email&nbsp;&nbsp;&gt;</span>
            <a href={`mailto:${bio.email}`} style={termLink(accent)}>{bio.email}</a>
            <span style={{ color: '#555' }}>cv&nbsp;&nbsp;&nbsp;&nbsp;&gt;</span>
            <a href="#" style={termLink(accent)}>./leena_markiet_cv.pdf</a>
            <span style={{ color: '#555' }}>links&nbsp;&gt;</span>
            <span>
              {bio.socials.map((s, i) => (
                <React.Fragment key={s.label}>
                  <a href={s.url} style={termLink(accent)}>{s.label.toLowerCase()}</a>
                  {i < bio.socials.length - 1 && <span style={{ color: '#444' }}> · </span>}
                </React.Fragment>
              ))}
            </span>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{ marginBottom: 56 }}>
        <TermHeader accent={accent} num="01">SKILLS</TermHeader>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {bio.skills.map(s => (
            <span key={s} style={{
              fontSize: 11, padding: '4px 10px',
              border: '1px solid #2A2A2A', color: '#CCC',
              background: '#161616',
            }}>{s.toLowerCase().replace(/ /g, '_')}</span>
          ))}
        </div>
      </section>

      {/* PROJECTS — index list + grid */}
      <section>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'baseline', marginBottom: 18,
        }}>
          <TermHeader accent={accent} num="02">SELECTED_WORK ({items.length})</TermHeader>
          <span style={{ fontSize: 10.5, color: '#666', letterSpacing: '0.08em' }}>
            [drag] reorder · [click] open
          </span>
        </div>

        {/* Index header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '40px 1fr 1.5fr 100px 80px',
          gap: 12, padding: '8px 0', fontSize: 10, color: '#666',
          letterSpacing: '0.1em', borderBottom: '1px solid #222',
        }}>
          <span>#</span><span>TITLE</span><span>TAGS</span><span>ROLE</span><span>YEAR</span>
        </div>

        {items.map((p, idx) => (
          <TerminalRow key={p.id} p={p} idx={idx} accent={accent} fonts={fonts}
            dragProps={dragProps(p.id)} onOpen={() => setOpen(p.id)} />
        ))}

        {/* Grid view below */}
        <div style={{ marginTop: 40 }}>
          <div style={{ fontSize: 10, color: '#666', letterSpacing: '0.1em', marginBottom: 12 }}>
            ── GRID VIEW ──
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1,
            background: '#222', border: '1px solid #222',
          }}>
            {items.map((p, idx) => (
              <TerminalCard key={p.id} p={p} idx={idx} accent={accent} fonts={fonts}
                onOpen={() => setOpen(p.id)} />
            ))}
          </div>
        </div>
      </section>

      <footer style={{
        marginTop: 80, paddingTop: 20, borderTop: '1px solid #222',
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: '#666', letterSpacing: '0.06em',
      }}>
        <span>© {bio.name} 2026 — built in HTML, hand-coded.</span>
        <span><span style={{ color: accent }}>$</span> _</span>
      </footer>

      {openProject && (
        <window.CaseStudyOverlay project={openProject} accent={accent} fonts={fonts}
          variant="terminal" onClose={() => setOpen(null)} />
      )}
    </div>
  );
}

function TermHeader({ accent, num, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', gap: 12,
      marginBottom: 16,
    }}>
      <span style={{ color: accent, fontSize: 11 }}>[{num}]</span>
      <h2 style={{
        margin: 0, fontFamily: 'inherit', fontWeight: 500,
        fontSize: 14, letterSpacing: '0.1em', color: '#F5F2EA',
      }}>// {children}</h2>
      <span style={{ flex: 1, height: 1, background: '#222' }}/>
    </div>
  );
}

function TerminalRow({ p, idx, accent, fonts, dragProps, onOpen }) {
  const dragging = dragProps['data-drag-state'] === 'dragging';
  const over = dragProps['data-drag-state'] === 'over';
  const [hover, setHover] = React.useState(false);
  return (
    <div {...dragProps}
      onClick={onOpen}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid', gridTemplateColumns: '40px 1fr 1.5fr 100px 80px',
        gap: 12, padding: '12px 0', fontSize: 12,
        borderBottom: '1px solid #1A1A1A',
        cursor: 'pointer', userSelect: 'none',
        background: hover ? '#161616' : 'transparent',
        opacity: dragging ? 0.3 : 1,
        borderTop: over ? `1px solid ${accent}` : '1px solid transparent',
        transition: 'background .12s, border-color .12s, opacity .15s',
      }}>
      <span style={{ color: hover ? accent : '#555' }}>{String(idx+1).padStart(2,'0')}</span>
      <span style={{ color: hover ? accent : '#F5F2EA' }}>
        {hover ? '> ' : '  '}{p.title}
      </span>
      <span style={{ color: '#888', fontSize: 11 }}>
        {p.tags.map(t => t.toLowerCase().replace(/ /g, '_')).join(' · ')}
      </span>
      <span style={{ color: '#888', fontSize: 11 }}>{p.role}</span>
      <span style={{ color: '#888', fontSize: 11 }}>{p.year}</span>
    </div>
  );
}

function TerminalCard({ p, idx, accent, fonts, onOpen }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div onClick={onOpen}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        background: '#0E0E0E', cursor: 'pointer',
        display: 'flex', flexDirection: 'column',
      }}>
      <div style={{ position: 'relative', aspectRatio: '4/3' }}>
        <window.PlaceholderImage hue={p.cover.hue} label={p.cover.label} mono />
        {hover && <div style={{
          position: 'absolute', inset: 0,
          background: `${accent}30`, mixBlendMode: 'screen',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: accent, fontSize: 11, letterSpacing: '0.1em',
        }}>OPEN →</div>}
        <span style={{
          position: 'absolute', top: 8, left: 8, fontSize: 10,
          color: '#CCC', letterSpacing: '0.08em',
        }}>{String(idx+1).padStart(2,'0')} / {p.year}</span>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{
          fontSize: 13, color: hover ? accent : '#F5F2EA',
          marginBottom: 6, transition: 'color .12s',
        }}>{p.title}</div>
        <div style={{ fontSize: 10.5, color: '#777', lineHeight: 1.5 }}>
          {p.description}
        </div>
        <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {p.tags.map(t => (
            <span key={t} style={{
              fontSize: 9.5, padding: '1px 6px',
              border: '1px solid #2A2A2A', color: '#999',
            }}>{t.toLowerCase()}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function termLink(accent) {
  return {
    color: accent, textDecoration: 'none',
    borderBottom: `1px dotted ${accent}66`,
  };
}

window.TerminalPortfolio = TerminalPortfolio;
