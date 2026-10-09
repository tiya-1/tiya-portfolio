import { useEffect, useRef, useState } from 'react';
import { STEPS } from '../data/portfolio';
import { Head } from '../lib/ui';

export default function Pipeline() {
  const [sel, setSel] = useState<number | null>(null), [on, setOn] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) setOn((s) => new Set(s).add(Number((e.target as HTMLElement).dataset.i))); }), { threshold: 0.6 });
    refs.current.forEach((r) => r && io.observe(r)); return () => io.disconnect();
  }, []);
  return (
    <section id="build">
      <Head n="05 — PROCESS" t="How I build" sub="Stages light up as you scroll. Select one for a short note." />
      <div className="pipe">
        {STEPS.map((s, i) => (
          <button key={s[0]} ref={(el) => { refs.current[i] = el; }} data-i={i} className={'glass ps' + (on.has(i) || sel === i ? ' on' : '') + (sel === i ? ' sel' : '')} onClick={() => { setSel(i); setOn((o) => new Set(o).add(i)); }}>
            <b className="mono">{String(i + 1).padStart(2, '0')}</b><br />{s[0]}
          </button>
        ))}
      </div>
      <div className="glass info" style={{ marginTop: 14 }} aria-live="polite">{sel === null ? 'Select a stage.' : <><b style={{ color: 'var(--b)' }}>{STEPS[sel][0]}</b> — {STEPS[sel][1]}</>}</div>
    </section>
  );
}
