import { useEffect, useRef, useState, type MouseEvent as RME } from 'react';
import { createPortal } from 'react-dom';
import { PROJECTS, type Project } from '../data/portfolio';
import { FINE, Glow, Head, Reveal, RM } from '../lib/ui';

function Links({ p }: { p: Project }) {
  const stop = (e: RME) => e.stopPropagation();
  return (
    <>
      {p.demo && <a className="btn f sm" href={p.demo} target="_blank" rel="noopener noreferrer" onClick={stop}>Live Demo</a>}
      {p.github && <a className="btn sm" href={p.github} target="_blank" rel="noopener noreferrer" onClick={stop}>GitHub</a>}
    </>
  );
}

function Card({ p, i, onOpen }: { p: Project; i: number; onOpen: () => void }) {
  const move = (e: RME<HTMLElement>) => {
    const el = e.currentTarget, b = el.getBoundingClientRect(), px = (e.clientX - b.left) / b.width, py = (e.clientY - b.top) / b.height;
    el.style.setProperty('--cx', e.clientX - b.left + 'px'); el.style.setProperty('--cy', e.clientY - b.top + 'px');
    if (FINE && !RM) { el.style.setProperty('--rx', ((0.5 - py) * 7).toFixed(2) + 'deg'); el.style.setProperty('--ry', ((px - 0.5) * 9).toFixed(2) + 'deg'); }
  };
  const leave = (e: RME<HTMLElement>) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); };
  return (
    <Reveal className={i === 0 ? 'feat' : ''}>
      <article className="proj glass" onMouseMove={move} onMouseLeave={leave} onClick={onOpen} data-cursor="EXPLORE">
        <span className="idx mono">{String(i + 1).padStart(2, '0')}</span>
        <h3><Glow text={p.name} /></h3>
        <p className="psub">{p.sub}</p>
        <p className="pdesc">{p.desc}</p>
        <div className="chips">{p.tech.map((t) => <span key={t} className="chip-s">{t}</span>)}</div>
        <div className="row" style={{ marginTop: 20 }}>
          <button className="btn sm" onClick={(e) => { e.stopPropagation(); onOpen(); }} aria-label={`Open ${p.name} case study`}>Case study →</button>
          <Links p={p} />
        </div>
      </article>
    </Reveal>
  );
}

function CaseStudy({ p, onClose }: { p: Project; onClose: () => void }) {
  const btn = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    btn.current?.focus(); document.body.style.overflow = 'hidden';
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    addEventListener('keydown', k);
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', k); };
  }, [onClose]);
  // Rendered into <body> so it always sits above the navbar and progress bar
  return createPortal(
    <div id="modal" role="dialog" aria-modal="true" aria-label={`${p.name} case study`}>
      <div className="mbar">
        <button ref={btn} className="btn f sm" onClick={onClose}>← Back to projects</button>
        <span className="mono mname">{p.name}</span>
        <button className="btn sm mx" onClick={onClose} aria-label="Close case study">✕ Close</button>
      </div>
      <div className="in">
        <h2>{p.name}</h2><p className="mono" style={{ color: 'var(--b)' }}>{p.sub}</p>
        <div className="row" style={{ marginTop: 14 }}><Links p={p} /></div>
        <h4>Overview</h4><p>{p.desc}</p>
        {p.problem && <><h4>Problem</h4><p>{p.problem}</p></>}
        {p.solution && <><h4>Solution</h4><p>{p.solution}</p></>}
        {p.impact && <><h4>Impact (projected)</h4><p>{p.impact}</p></>}
        <h4>Architecture / flow</h4>
        <div className="glass flowbox">
          {p.flow.map((f, i) => <span key={f} style={{ display: 'contents' }}><span className="nd" style={{ cursor: 'default', minWidth: 0 }}>{f}</span>{i < p.flow.length - 1 && <span className="arrow">→</span>}</span>)}
        </div>
        <h4>Core features</h4><ul>{p.features.map((f) => <li key={f}>{f}</li>)}</ul>
        <h4>Technologies</h4><div className="chips">{p.tech.map((t) => <span key={t} className="chip-s">{t}</span>)}</div>
        <div className="row" style={{ marginTop: 34 }}><button className="btn" onClick={onClose}>← Back to projects</button></div>
      </div>
    </div>,
    document.body,
  );
}

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  // SyncRoom (current project) leads, then the rest in their given order
  const list = [...PROJECTS].sort((a, b) => Number(b.id === 'syncroom') - Number(a.id === 'syncroom'));
  return (
    <section id="projects">
      <Head n="03 — PROJECTS" t="Things I've built" sub="Hover a card, then open the live demo, the code, or the full case study." />
      <div className="pc">{list.map((p, i) => <Card key={p.id} p={p} i={i} onOpen={() => setOpen(p)} />)}</div>
      {open && <CaseStudy p={open} onClose={() => setOpen(null)} />}
    </section>
  );
}
