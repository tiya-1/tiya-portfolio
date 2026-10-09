import { useEffect, useRef, useState } from 'react';
import { ARCH, METS } from '../data/portfolio';
import { Head, Reveal } from '../lib/ui';

const STACK = ['NestJS', 'TypeScript', 'PostgreSQL', 'TypeORM', 'JWT', 'RBAC', 'Monorepo'];

export default function Experience() {
  const [m, setM] = useState<number | null>(null), [a, setA] = useState<number | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const f = () => { const r = ref.current!.getBoundingClientRect(); ref.current!.style.setProperty('--tp', String(Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height)))); };
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f);
  }, []);
  return (
    <section id="experience">
      <Head n="02 — EXPERIENCE" t="Engineering experience" sub="Scroll: the light follows the timeline." />
      <div className="exp" ref={ref}>
        <div className="tline"><i /></div>
        <Reveal className="glass pad hl">
          <p className="mono" style={{ color: 'var(--b)', fontSize: 13 }}>JUNE 2026 — JULY 2026 · NOIDA</p>
          <h3 className="h3">Backend Development Intern</h3>
          <p style={{ color: 'var(--m)' }}><b style={{ color: 'var(--t)' }}>Digixito Media Pvt. Ltd.</b> · IAIRE Community Platform, a multi-school platform connecting students to innovation, research and patent-support resources.</p>
          <div className="chips big">{STACK.map((t) => <span key={t} className="chip-s">{t}</span>)}</div>
          <ul className="bul">
            <li>Built <b>30+ production-grade REST APIs</b> powering the platform.</li>
            <li>Implemented <b>RBAC</b> and secure <b>JWT</b> authentication across multiple user roles.</li>
            <li>Optimized PostgreSQL queries and a modular architecture using TypeORM.</li>
            <li>Collaborated through Git-based workflows on a monorepo.</li>
          </ul>
          <div className="mets">{METS.map((x, i) => <button key={x[0]} className={'met' + (m === i ? ' on' : '')} onClick={() => setM(i)} data-cursor="OPEN"><b>{x[0]}</b><span>{x[1]}</span></button>)}</div>
          <div className="info" aria-live="polite">{m === null ? 'Select a metric to read more.' : METS[m][2]}</div>
        </Reveal>
        <Reveal className="glass pad">
          <p className="mono eyebrow">REQUEST FLOW</p>
          <div className="diag">
            {ARCH.map((n, i) => (
              <div key={n[0]} style={{ display: 'contents' }}>
                <button className={'nd' + (a === i ? ' on' : '')} onClick={() => setA(i)}>{n[0]}</button>
                {i < ARCH.length - 1 && <div className="ar"><i className="pk" style={{ animationDelay: `${i * 0.45}s` }} /></div>}
              </div>
            ))}
          </div>
          <div className="info" aria-live="polite">{a === null ? 'Click a layer.' : <><b style={{ color: 'var(--b)' }}>{ARCH[a][0]}</b> — {ARCH[a][1]}</>}</div>
        </Reveal>
      </div>
    </section>
  );
}
