import { useEffect, useRef } from 'react';
import { BUILD } from '../data/portfolio';
import { Head } from '../lib/ui';

export default function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current!;
    const mv = (e: MouseEvent) => el.querySelectorAll<HTMLElement>('.spot-t').forEach((t) => {
      const r = t.getBoundingClientRect(); t.style.setProperty('--x', e.clientX - r.left + 'px'); t.style.setProperty('--y', e.clientY - r.top + 'px');
    });
    el.addEventListener('mousemove', mv);
    return () => el.removeEventListener('mousemove', mv);
  }, []);
  return (
    <section id="what">
      <Head n="WHAT I BUILD" t="Move your cursor. Light the way." />
      <div className="spot" ref={ref}>
        {BUILD.map(([t, d]) => (
          <div className="spot-row" key={t}><div className="spot-t">{t}</div><p>{d}</p></div>
        ))}
      </div>
    </section>
  );
}
