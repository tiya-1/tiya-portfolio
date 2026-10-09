import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { LINKS } from '../data/config';
import { go } from '../lib/ui';

interface Item { label: string; hint: string; run: () => void }
const SECTIONS: [string, string][] = [['home', 'Home'], ['about', 'Who is Tiya?'], ['what', 'What I build'], ['experience', 'Experience'], ['projects', 'Projects'], ['stack', 'Tech stack'], ['build', 'How I build'], ['achievements', 'Achievements'], ['ai', 'Ask Tiya AI'], ['contact', 'Contact']];
const ITEMS: Item[] = [
  ...SECTIONS.map(([id, label]) => ({ label, hint: 'Go to section', run: () => go(id) })),
  { label: 'GitHub', hint: 'Open profile', run: () => window.open(LINKS.github, '_blank', 'noopener') },
  { label: 'LinkedIn', hint: 'Open profile', run: () => window.open(LINKS.linkedin, '_blank', 'noopener') },
];
const MAC = typeof navigator !== 'undefined' && /mac/i.test(navigator.platform);

export default function Palette() {
  const [open, setOpen] = useState(false), [q, setQ] = useState(''), [i, setI] = useState(0);
  const input = useRef<HTMLInputElement>(null);
  const list = useMemo(() => ITEMS.filter((it) => it.label.toLowerCase().includes(q.trim().toLowerCase())), [q]);
  const close = () => { setOpen(false); setQ(''); setI(0); };
  const run = (it?: Item) => { if (!it) return; close(); setTimeout(it.run, 60); };

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === 'Escape') close();
    };
    addEventListener('keydown', k); return () => removeEventListener('keydown', k);
  }, []);
  useEffect(() => { if (open) input.current?.focus(); }, [open]);

  return (
    <>
      <button className="kbd" onClick={() => setOpen(true)} aria-label="Open quick navigation" data-cursor="JUMP">{MAC ? '⌘' : 'Ctrl'} K<span> · jump to…</span></button>
      {open && createPortal(
        <div className="pal-bg" onMouseDown={close}>
          <div className="pal glass" role="dialog" aria-modal="true" aria-label="Quick navigation" onMouseDown={(e) => e.stopPropagation()}>
            <input ref={input} value={q} onChange={(e) => { setQ(e.target.value); setI(0); }} placeholder="Jump to a section or link…" aria-label="Search"
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setI((x) => Math.min(x + 1, list.length - 1)); }
                else if (e.key === 'ArrowUp') { e.preventDefault(); setI((x) => Math.max(x - 1, 0)); }
                else if (e.key === 'Enter') run(list[i]);
              }} />
            <ul role="listbox">
              {list.map((it, n) => (
                <li key={it.label} role="option" aria-selected={n === i} className={n === i ? 'on' : ''} onMouseEnter={() => setI(n)} onClick={() => run(it)}>
                  <span>{it.label}</span><span className="mono">{it.hint}</span>
                </li>
              ))}
              {!list.length && <li className="none">Nothing matches "{q}"</li>}
            </ul>
            <p className="mono pal-f">↑ ↓ to move · Enter to go · Esc to close</p>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
