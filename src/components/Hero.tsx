import { useEffect, useRef, useState } from 'react';
import { LINKS } from '../data/config';
import { Glow, RM, go } from '../lib/ui';

const ROLES = ['Full-Stack Developer', 'Backend Developer', 'AI Application Developer'];
const QUICK: [string, string][] = [['30+', 'REST APIs shipped'], ['300+', 'LeetCode solved'], ['2', 'Hackathon finals'], ['4', 'Featured projects']];

export default function Hero() {
  const [i, setI] = useState(0);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => { if (RM) return; const t = setInterval(() => setI((x) => (x + 1) % ROLES.length), 2300); return () => clearInterval(t); }, []);
  // The two title words slide apart as you scroll away from the hero
  useEffect(() => {
    const f = () => ref.current?.style.setProperty('--sy', Math.min(1, scrollY / (innerHeight * 0.8)).toFixed(3));
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f);
  }, []);
  return (
    <section id="home" ref={ref} className="hero">
      <span className="pill"><i className="dot" />Open to Software Development roles</span>
      <p className="eyebrow mono" style={{ marginTop: 22 }}>TIYA JAIN · FINAL-YEAR COMPUTER SCIENCE</p>
      <h1 className="big">
        <span className="l1"><Glow text="Software" /></span>
        <span className="l2"><Glow text="Developer" /></span>
      </h1>
      <div className="fade">
        <p className="lead">Building scalable web applications, real-time systems and AI-powered experiences. <b key={i} className="swap">{ROLES[i]}</b></p>
        <div className="row">
          <button className="btn f" onClick={() => go('projects')}>View my work</button>
          <button className="btn" onClick={() => go('contact')}>Let's talk</button>
          <span className="soc">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
          </span>
        </div>
        <div className="quick">{QUICK.map(([n, l]) => <div key={l}><b>{n}</b><span>{l}</span></div>)}</div>
      </div>
      <p className="scrollcue mono" aria-hidden="true">SCROLL TO EXPLORE ↓</p>
    </section>
  );
}
