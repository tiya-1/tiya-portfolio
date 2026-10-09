import { useEffect, useRef, useState } from 'react';
import { EDU, STATS, WINS } from '../data/portfolio';
import { Head, RM, Reveal } from '../lib/ui';

function Count({ to, suffix }: { to: number; suffix: string }) {
  const [v, setV] = useState(RM ? to : 0), el = useRef<HTMLElement>(null);
  useEffect(() => {
    if (RM) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const u = (t: number) => { const q = Math.min((t - t0) / 1200, 1); setV(Math.round(to * (1 - Math.pow(1 - q, 3)))); if (q < 1) requestAnimationFrame(u); };
      requestAnimationFrame(u);
    }, { threshold: 0.6 });
    if (el.current) io.observe(el.current); return () => io.disconnect();
  }, [to]);
  return <b ref={el}>{v}{v === to ? suffix : ''}</b>;
}

export default function Achievements() {
  return (
    <section id="achievements">
      <Head n="06 — BEYOND PROJECTS" t="Achievements" />
      <div className="stats">{STATS.map(([n, l, s]) => <div className="glass" key={l}><Count to={n} suffix={s} /><span>{l}</span></div>)}</div>
      <div className="grid2" style={{ marginTop: 24 }}>
        <Reveal><h3 className="h3s">Achievements &amp; certifications</h3>{WINS.map((w) => <div key={w.t} className="glass item" data-cursor="✦"><span className="ic">{w.i}</span><div><b>{w.t}</b><br /><span>{w.d}</span></div></div>)}</Reveal>
        <Reveal><h3 className="h3s">Education</h3>{EDU.map((e) => <div key={e.t} className="glass item"><span className="ic">🎓</span><div><b>{e.t}</b><br /><span>{e.d}</span></div></div>)}</Reveal>
      </div>
    </section>
  );
}
