import { useState } from 'react';
import { COLORS, CORE, TECH, USED } from '../data/portfolio';
import { Head, Reveal } from '../lib/ui';
import TechSphere, { NODES, type TNode } from './TechSphere';

const CATS = Object.keys(TECH);

export default function TechStack() {
  const [filter, setFilter] = useState<string | null>(null);
  const [sel, setSel] = useState<TNode>(NODES.find((n) => n.n === 'NestJS') ?? NODES[0]);
  const used = USED[sel.n]?.split(', ');
  return (
    <section id="stack">
      <Head n="04 — STACK" t="Technologies I work with" sub="Drag the sphere to spin it, filter by category, and click a technology to see where I used it." />
      <div className="stackgrid">
        <Reveal className="sphere-wrap glass">
          <TechSphere filter={filter} selected={sel.n} onSelect={setSel} />
          <p className="mono hint">DRAG TO ROTATE · CLICK A WORD</p>
        </Reveal>
        <Reveal className="stackside">
          <div className="fps" role="group" aria-label="Filter by category">
            <button className={'fp' + (filter === null ? ' on' : '')} onClick={() => setFilter(null)}>All</button>
            {CATS.map((c, i) => (
              <button key={c} className={'fp' + (filter === c ? ' on' : '')} style={{ ['--fc' as string]: COLORS[i] }} onClick={() => setFilter(filter === c ? null : c)}>{c}</button>
            ))}
          </div>
          <div className="glass tdetail" aria-live="polite" style={{ ['--fc' as string]: COLORS[sel.k] }}>
            <span className="mono dc">{sel.c}</span>
            <b className="dn">{sel.n}</b>
            <p className="mono" style={{ fontSize: 12, color: 'var(--m)', margin: '14px 0 8px' }}>USED IN</p>
            <div className="chips">{used ? used.map((u) => <span key={u} className="chip-s">{u}</span>) : <span style={{ color: 'var(--m)', fontSize: 14 }}>Part of my core technical profile.</span>}</div>
          </div>
          <p className="mono" style={{ fontSize: 12, color: 'var(--m)', margin: '22px 0 10px' }}>THE ONES I REACH FOR FIRST</p>
          <div className="chips">{CORE.map((n) => <button key={n} className={'tk hi' + (sel.n === n ? ' on' : '')} onClick={() => setSel(NODES.find((x) => x.n === n)!)}>{n}</button>)}</div>
        </Reveal>
      </div>
      <ul className="sr" aria-label="All technologies">{NODES.map((n) => <li key={n.n}><button onClick={() => setSel(n)}>{n.n} ({n.c})</button></li>)}</ul>
    </section>
  );
}
