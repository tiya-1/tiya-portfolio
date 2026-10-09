import { LINKS } from '../data/config';
import { Head, Reveal } from '../lib/ui';

const FACTS: [string, string][] = [
  ['Studying', 'B.Tech CSE · IMS Engineering College · 2023–2027 · CGPA 8.5/10'],
  ['Focus', 'Full-stack development, backend engineering, real-time systems, AI applications'],
  ['Experience', 'Backend Development Intern · 30+ production REST APIs'],
  ['Status', 'Open to Software Development / Full-Stack Developer roles'],
];

export default function About() {
  return (
    <section id="about">
      <Head n="01 — ABOUT" t="Who is Tiya?" />
      <div className="about">
        <Reveal className="photo glass">
          <img src={LINKS.photo} alt="Tiya Jain" width={320} height={320} onError={(e) => (e.currentTarget.style.display = 'none')} />
        </Reveal>
        <Reveal className="glass pad">
          <p className="big-p">I'm Tiya Jain, a final-year Computer Science student who builds software end to end: MERN products, NestJS and PostgreSQL backends, and applications powered by LLM APIs.</p>
          <p style={{ color: 'var(--m)', margin: '12px 0 20px' }}>I care about clean architecture, secure APIs (JWT, RBAC) and products that feel good to use.</p>
          <dl className="facts">{FACTS.map(([k, v]) => <div key={k}><dt className="mono">{k}</dt><dd>{v}</dd></div>)}</dl>
        </Reveal>
      </div>
    </section>
  );
}
