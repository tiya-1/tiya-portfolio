import { Fragment, useEffect, useRef, type ReactNode } from 'react';
export const RM = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
export const MOB = typeof innerWidth !== 'undefined' && innerWidth < 820;
export const FINE = typeof matchMedia !== 'undefined' && matchMedia('(pointer:fine)').matches;
export const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const r = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { e.target.classList.add('in'); o.disconnect(); } }, { threshold: 0.12 });
    if (r.current) o.observe(r.current);
    return () => o.disconnect();
  }, []);
  return <div ref={r} className={'rv ' + className}>{children}</div>;
}

// Text whose letters brighten and lift as the cursor gets close
export function Glow({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (RM || !FINE) return;
    const el = ref.current!, letters = [...el.querySelectorAll<HTMLElement>('.lt')];
    let raf = 0, mx = 0, my = 0;
    const paint = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const far = my < r.top - 220 || my > r.bottom + 220;
      letters.forEach((l) => {
        if (far) { l.style.setProperty('--p', '0'); return; }
        const b = l.getBoundingClientRect();
        l.style.setProperty('--p', Math.max(0, 1 - Math.hypot(mx - (b.left + b.width / 2), my - (b.top + b.height / 2)) / 170).toFixed(2));
      });
    };
    const mv = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(paint); };
    addEventListener('mousemove', mv);
    return () => { removeEventListener('mousemove', mv); cancelAnimationFrame(raf); };
  }, []);
  return (
    <span ref={ref} className={'glow ' + className} aria-label={text}>
      {text.split(' ').map((w, i) => (
        <Fragment key={i}>
          <span className="w" aria-hidden="true">{[...w].map((c, j) => <span key={j} className="lt">{c}</span>)}</span>{' '}
        </Fragment>
      ))}
    </span>
  );
}

export function Head({ n, t, sub }: { n: string; t: string; sub?: string }) {
  return (
    <Reveal>
      <p className="eyebrow mono">{n}</p>
      <h2><Glow text={t} /></h2>
      {sub && <p className="sub">{sub}</p>}
    </Reveal>
  );
}
