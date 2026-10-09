import { useEffect, useRef } from 'react';
import { MOB, RM } from '../lib/ui';

export default function Background() {
  const cv = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cv.current!, x = c.getContext('2d')!, dp = Math.min(devicePixelRatio, 2);
    let W = 0, H = 0;
    const rs = () => { W = innerWidth; H = innerHeight; c.width = W * dp; c.height = H * dp; x.setTransform(dp, 0, 0, dp, 0, 0); };
    rs(); addEventListener('resize', rs);
    const ps = Array.from({ length: MOB ? 35 : 90 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + 0.3, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, a: Math.random() * 0.4 + 0.12 }));
    const trail: { x: number; y: number; t: number }[] = [];
    const bursts: { x: number; y: number; vx: number; vy: number; t: number }[] = [];
    let mx = W / 2, my = H / 3, raf = 0;
    const set = (px: number, py: number) => {
      mx = px; my = py; trail.push({ x: px, y: py, t: performance.now() }); if (trail.length > 45) trail.shift();
      document.documentElement.style.setProperty('--mx', px + 'px'); document.documentElement.style.setProperty('--my', py + 'px');
    };
    const mv = (e: MouseEvent) => set(e.clientX, e.clientY);
    const tm = (e: TouchEvent) => set(e.touches[0].clientX, e.touches[0].clientY);
    const ck = (e: MouseEvent) => {
      if (RM) return;
      for (let k = 0; k < 16; k++) { const a = (k / 16) * 6.283 + Math.random() * 0.4, v = 1.5 + Math.random() * 2.6; bursts.push({ x: e.clientX, y: e.clientY, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: performance.now() }); }
    };
    addEventListener('mousemove', mv); addEventListener('touchmove', tm, { passive: true }); addEventListener('click', ck);
    const f = (now: number) => {
      raf = requestAnimationFrame(f); x.clearRect(0, 0, W, H);
      ps.forEach((p) => {
        if (!RM) { p.x += p.vx; p.y += p.vy; if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0; }
        const near = Math.max(0, 1 - Math.hypot(p.x - mx, p.y - my) / 230);
        x.fillStyle = `rgba(170,185,255,${p.a + near * 0.6})`; x.beginPath(); x.arc(p.x, p.y, p.r + near * 1.6, 0, 7); x.fill();
      });
      for (let k = bursts.length - 1; k >= 0; k--) {
        const b = bursts[k], age = (now - b.t) / 800; if (age >= 1) { bursts.splice(k, 1); continue; }
        b.x += b.vx; b.y += b.vy; b.vx *= 0.95; b.vy *= 0.95;
        x.fillStyle = `rgba(255,184,107,${(1 - age) * 0.9})`; x.beginPath(); x.arc(b.x, b.y, 2.2 * (1 - age) + 0.4, 0, 7); x.fill();
      }
      if (!RM) for (let i = 1; i < trail.length; i++) {
        const a = trail[i - 1], b = trail[i], age = (now - b.t) / 750; if (age > 1) continue;
        x.strokeStyle = `rgba(150,140,255,${(1 - age) * 0.55})`; x.lineWidth = (1 - age) * 3; x.lineCap = 'round';
        x.beginPath(); x.moveTo(a.x, a.y); x.lineTo(b.x, b.y); x.stroke();
      }
    };
    raf = requestAnimationFrame(f);
    return () => {
      removeEventListener('click', ck); cancelAnimationFrame(raf); removeEventListener('resize', rs); removeEventListener('mousemove', mv); removeEventListener('touchmove', tm); };
  }, []);
  return (
    <div className="bg" aria-hidden="true">
      <div className="blob b1" /><div className="blob b2" /><div className="grid" /><div className="beam" />
      <canvas ref={cv} />
      <div className="noise" />
    </div>
  );
}
