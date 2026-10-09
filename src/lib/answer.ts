import { EDU, PROJECTS, TECH, WINS } from '../data/portfolio';
import { LINKS } from '../data/config';

export const SKILLS = () => Object.entries(TECH).map(([k, v]) => `${k}: ${v.join(', ')}`).join('\n');
export const INTERN = 'Backend Development Intern at Digixito Media Pvt. Ltd., Noida (June–July 2026) on the IAIRE Community Platform, using NestJS, TypeScript, PostgreSQL, TypeORM, JWT, RBAC and a monorepo architecture. Built 30+ production REST APIs.';
export const WINS_TEXT = () => WINS.map((w) => `• ${w.t} (${w.d})`).join('\n') + '\n• 300+ LeetCode problems solved';
export const projectText = (id: string) => {
  const p = PROJECTS.find((x) => x.id === id)!;
  return `${p.name}: ${p.sub}.\n${p.desc}\nStack: ${p.tech.join(', ')}.\nFeatures: ${p.features.join('; ')}.`;
};

// Answers come ONLY from portfolio data, so nothing is invented.
export function answer(q: string): string {
  q = q.toLowerCase();
  if (/syncroom|watch|websocket|real.?time|rbac|role/.test(q))
    return projectText('syncroom') + '\nArchitecture: client → WebSocket server → room + permission logic. Events are validated on the server, then broadcast to authorized participants.';
  if (/krishi/.test(q)) return projectText('krishiqueue');
  if (/spend|audit|llm|ai app/.test(q)) return projectText('aispend');
  if (/path/.test(q)) return projectText('pathfinder');
  if (/project|built|build/.test(q)) return 'Featured projects:\n' + PROJECTS.map((p) => `• ${p.name} — ${p.sub}`).join('\n');
  if (/intern|backend|experience|work|digixito|iaire/.test(q)) return INTERN;
  if (/tech|skill|stack|know|language|framework/.test(q)) return SKILLS();
  if (/educat|college|cgpa|degree|study|school/.test(q)) return EDU.map((e) => `• ${e.t} — ${e.d}`).join('\n');
  if (/leetcode|achiev|hackathon|certif|ambassador|award/.test(q)) return WINS_TEXT();
  if (/contact|email|reach|hire|github|linkedin/.test(q)) return `Use the contact form at the bottom of this page, or find Tiya on LinkedIn (${LINKS.linkedin}) and GitHub (${LINKS.github}).`;
  if (/who|about|tiya/.test(q)) return 'Tiya Jain is a final-year CSE student seeking Software Development / Full-Stack Developer roles, with experience across full-stack, backend, real-time systems and AI applications.';
  return 'I can only answer from this portfolio: skills, projects, internship, education or achievements. Try one of the suggestions.';
}
