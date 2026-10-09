import { useEffect, useRef } from 'react';
import { COLORS, CORE, TECH } from '../data/portfolio';
import { RM } from '../lib/ui';

export interface TNode { n: string; c: string; k: number; core: boolean }
export const NODES: TNode[] = Object.entries(TECH).flatMap(([c, list], k) => list.map((n) => ({ n, c, k, core: CORE.includes(n) })));
const SHORT: Record<string, string> = { 'AI Application Development': 'AI Apps', 'Prompt Engineering': 'Prompting', 'DevOps / Tools': 'Tools' };

interface Props { filter: string | null; selected: string | null; onSelect: (n: TNode) => void }
interface P { nd: TNode; x: number; y: number; z: number; sx: number; sy: number; s: number; z2: number; w: number; fs: number; dim: boolean }

// Draggable 3D tag sphere drawn on a 2D canvas (no extra libraries)
export default function TechSphere({ filter, selected, onSelect }: Props) {
  const cv = useRef<HTMLCanvasElement>(null);
  const live = useRef({ filter, selected });
  live.current = { filter, selected };
  const cb = useRef(onSelect);
  cb.current = onSelect;

  useEffect(() => {
    const c = cv.current!, x = c.getContext('2d')!;
    let W = 0, H = 0, raf = 0, vis = true, dpr = 1;
    const pts: P[] = NODES.map((nd, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / NODES.length), th = Math.PI * (1 + Math.sqrt(5)) * (i + 0.5);
      return { nd, x: Math.cos(th) * Math.sin(phi), y: Math.cos(phi), z: Math.sin(th) * Math.sin(phi), sx: 0, sy: 0, s: 1, z2: 0, w: 0, fs: 14, dim: false };
    });
    const idle = RM ? 0 : 0.004;
    let ax = 0.35, ay = 0, vx = 0, vy = idle;
    let down = false, moved = 0, lx = 0, ly = 0, inside = false, hov: P | null = null, px = -1, py = -1;

    const size = () => {
      dpr = Math.min(devicePixelRatio, 2); W = c.clientWidth; H = c.clientHeight;
      c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const ro = new ResizeObserver(size); ro.observe(c);
    const io = new IntersectionObserver((e) => (vis = e[0].isIntersecting)); io.observe(c);

    const hit = (): P | null => {
      const { filter: f } = live.current;
      const sorted = [...pts].sort((a, b) => b.z2 - a.z2);
      for (const p of sorted) if ((!f || p.nd.c === f) && Math.abs(px - p.sx) < p.w / 2 + 8 && Math.abs(py - p.sy) < p.fs * 0.85) return p;
      return null;
    };
    const pos = (e: PointerEvent) => { const r = c.getBoundingClientRect(); px = e.clientX - r.left; py = e.clientY - r.top; };

    const pd = (e: PointerEvent) => { down = true; moved = 0; pos(e); lx = e.clientX; ly = e.clientY; c.setPointerCapture(e.pointerId); };
    const pm = (e: PointerEvent) => {
      pos(e); inside = true;
      if (down) {
        const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY; moved += Math.abs(dx) + Math.abs(dy);
        ay += dx * 0.008; ax += dy * 0.008; vy = dx * 0.0016; vx = dy * 0.0016;
      }
      hov = down ? null : hit();
      c.dataset.cursor = down ? 'DRAG' : hov ? 'OPEN' : 'DRAG';
    };
    const pu = (e: PointerEvent) => { down = false; if (moved < 6) { pos(e); const h = hit(); if (h) cb.current(h.nd); } };
    const pl = () => { inside = false; hov = null; px = py = -1; };
    c.addEventListener('pointerdown', pd); c.addEventListener('pointermove', pm); c.addEventListener('pointerup', pu); c.addEventListener('pointerleave', pl);

    const frame = () => {
      raf = requestAnimationFrame(frame); if (!vis) return;
      if (!down) { vy += (idle * (inside ? 0.25 : 1) - vy) * 0.03; vx *= 0.94; ay += vy; ax += vx; }
      const R = Math.min(W, H) * (W < 420 ? 0.31 : 0.36), fov = 2.7, cs = Math.cos(ay), sn = Math.sin(ay), ca = Math.cos(ax), sa = Math.sin(ax);
      const { filter: f, selected: sel } = live.current;
      const small = W < 420 ? 0.82 : 1;
      x.clearRect(0, 0, W, H);

      // faint orbit rings for depth
      x.lineWidth = 1; x.strokeStyle = 'rgba(139,155,255,.10)';
      x.beginPath(); x.ellipse(W / 2, H / 2, R * 1.04, R * 1.04 * Math.abs(sa) * 0.9 + 2, 0, 0, 7); x.stroke();
      x.beginPath(); x.ellipse(W / 2, H / 2, R * 1.04, R * 1.04, 0, 0, 7); x.stroke();

      for (const p of pts) {
        const x1 = p.x * cs + p.z * sn, z1 = -p.x * sn + p.z * cs;
        const y2 = p.y * ca - z1 * sa, z2 = p.y * sa + z1 * ca;
        p.s = fov / (fov - z2); p.z2 = z2; p.sx = W / 2 + x1 * R * p.s; p.sy = H / 2 + y2 * R * p.s;
        p.fs = (p.nd.core ? 21 : 14) * p.s * small; p.dim = !!f && p.nd.c !== f;
        x.font = `${p.nd.core ? 700 : 500} ${p.fs}px Sora,system-ui,sans-serif`; p.w = x.measureText(SHORT[p.nd.n] ?? p.nd.n).width;
      }
      const order = [...pts].sort((a, b) => a.z2 - b.z2);
      const sp = sel ? pts.find((p) => p.nd.n === sel) : undefined;

      // connect the selected node to its category
      if (sp) for (const q of pts) if (q !== sp && q.nd.c === sp.nd.c) {
        x.strokeStyle = COLORS[sp.nd.k] + '55'; x.lineWidth = 1.2; x.beginPath(); x.moveTo(sp.sx, sp.sy); x.lineTo(q.sx, q.sy); x.stroke();
      }

      x.textAlign = 'center'; x.textBaseline = 'middle';
      for (const p of order) {
        const depth = (p.z2 + 1) / 2, base = 0.1 + 0.9 * Math.pow(depth, 1.6), a = p.dim ? base * 0.14 : base;
        const label = SHORT[p.nd.n] ?? p.nd.n, isSel = sel === p.nd.n, isHov = hov === p;
        x.font = `${p.nd.core || isSel ? 700 : 500} ${p.fs * (isHov ? 1.12 : 1)}px Sora,system-ui,sans-serif`;
        if (isSel || isHov) {
          const w = x.measureText(label).width + 22, h = p.fs + 14;
          x.globalAlpha = 1; x.fillStyle = 'rgba(11,14,26,.92)'; x.strokeStyle = COLORS[p.nd.k]; x.lineWidth = 1.5;
          x.shadowColor = COLORS[p.nd.k]; x.shadowBlur = 22; x.beginPath(); x.roundRect(p.sx - w / 2, p.sy - h / 2, w, h, h / 2); x.fill(); x.stroke(); x.shadowBlur = 0;
        }
        x.globalAlpha = isSel || isHov ? 1 : a;
        x.fillStyle = isSel || isHov ? '#ffffff' : p.nd.core ? '#eef1ff' : COLORS[p.nd.k];
        x.fillText(label, p.sx, p.sy);
      }
      x.globalAlpha = 1;
    };
    frame();
    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      c.removeEventListener('pointerdown', pd); c.removeEventListener('pointermove', pm); c.removeEventListener('pointerup', pu); c.removeEventListener('pointerleave', pl);
    };
  }, []);

  return <canvas ref={cv} className="sphere" data-cursor="DRAG" role="img" aria-label="Interactive 3D sphere of technologies. Drag to rotate, click a technology for details." />;
}
