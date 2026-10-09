import { useEffect, useRef } from 'react';
import { FINE, RM } from '../lib/ui';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null), lab = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (RM || !FINE) return;
    document.body.classList.add('cc');
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0;
    const mv = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY;
      dot.current!.style.transform = `translate(${x}px,${y}px)`;
      dot.current!.classList.add('on'); ring.current!.classList.add('on');
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor],a,button,input,textarea');
      const l = t?.dataset.cursor ?? (t?.tagName === 'A' ? '→' : '');
      ring.current!.classList.toggle('big', !!t); ring.current!.classList.toggle('lbl', !!l); lab.current!.textContent = l;
      document.querySelectorAll<HTMLElement>('.btn').forEach((b) => {
        const r = b.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
        b.style.transform = Math.hypot(dx, dy) < 90 ? `translate(${dx * 0.2}px,${dy * 0.2}px)` : '';
      });
    };
    const loop = () => { raf = requestAnimationFrame(loop); rx += (x - rx) * 0.18; ry += (y - ry) * 0.18; ring.current!.style.transform = `translate(${rx}px,${ry}px)`; };
    loop(); addEventListener('mousemove', mv);
    return () => { cancelAnimationFrame(raf); removeEventListener('mousemove', mv); document.body.classList.remove('cc'); };
  }, []);
  return <><div ref={dot} className="c-dot" aria-hidden="true" /><div ref={ring} className="c-ring" aria-hidden="true"><span ref={lab} /></div></>;
}
