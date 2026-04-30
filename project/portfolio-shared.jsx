// portfolio-shared.jsx — shared hooks + tiny utilities used by all 3 variations.

// useReorderable: drag-to-reorder list with localStorage persistence.
// Returns { items, dragProps(id) } where dragProps gives you handlers for the card.
function useReorderable(initial, storageKey) {
  const [order, setOrder] = React.useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        // validate: must contain exactly the same id set
        const initialIds = new Set(initial.map(i => i.id));
        const parsedIds = new Set(parsed);
        if (parsed.length === initial.length &&
            [...initialIds].every(id => parsedIds.has(id))) {
          return parsed;
        }
      }
    } catch (e) {}
    return initial.map(i => i.id);
  });

  const items = React.useMemo(() => {
    const map = new Map(initial.map(i => [i.id, i]));
    return order.map(id => map.get(id)).filter(Boolean);
  }, [initial, order]);

  React.useEffect(() => {
    try { localStorage.setItem(storageKey, JSON.stringify(order)); } catch (e) {}
  }, [order, storageKey]);

  const [dragId, setDragId] = React.useState(null);
  const [overId, setOverId] = React.useState(null);

  const dragProps = (id) => ({
    draggable: true,
    onDragStart: (e) => {
      setDragId(id);
      e.dataTransfer.effectAllowed = 'move';
      // some browsers need data set
      try { e.dataTransfer.setData('text/plain', id); } catch (_) {}
    },
    onDragOver: (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (id !== overId) setOverId(id);
    },
    onDragLeave: () => {
      // gentle — only clear if leaving entire grid
    },
    onDrop: (e) => {
      e.preventDefault();
      if (!dragId || dragId === id) {
        setDragId(null); setOverId(null); return;
      }
      setOrder(prev => {
        const next = [...prev];
        const from = next.indexOf(dragId);
        const to = next.indexOf(id);
        if (from < 0 || to < 0) return prev;
        next.splice(from, 1);
        next.splice(to, 0, dragId);
        return next;
      });
      setDragId(null); setOverId(null);
    },
    onDragEnd: () => { setDragId(null); setOverId(null); },
    'data-drag-id': id,
    'data-drag-state': dragId === id ? 'dragging' : (overId === id && dragId ? 'over' : ''),
  });

  return { items, dragProps, dragId, overId };
}

// Soft striped placeholder image — uses HSL hue to color each card distinctly.
function PlaceholderImage({ hue = 30, label = "image", style = {}, dense = false, mono = false }) {
  const bg = mono
    ? `repeating-linear-gradient(135deg, #1a1a1a 0 14px, #232323 14px 28px)`
    : `repeating-linear-gradient(135deg, hsl(${hue} 70% 86%) 0 14px, hsl(${hue} 70% 80%) 14px 28px)`;
  const fg = mono ? 'rgba(255,255,255,0.85)' : `hsl(${hue} 60% 28%)`;
  return (
    <div style={{
      position: 'relative', width: '100%', height: '100%',
      background: bg, overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      ...style,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        background: mono ? 'rgba(0,0,0,0.45)' : `hsl(${hue} 60% 92% / 0.55)`,
      }}/>
      <span style={{
        position: 'relative', zIndex: 1,
        fontFamily: '"Inter", system-ui, sans-serif',
        fontSize: dense ? 10 : 11, letterSpacing: '0.04em',
        color: fg, padding: '4px 8px',
        background: mono ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.6)',
        borderRadius: 4,
        textTransform: 'uppercase',
      }}>{label}</span>
    </div>
  );
}

window.useReorderable = useReorderable;
window.PlaceholderImage = PlaceholderImage;
