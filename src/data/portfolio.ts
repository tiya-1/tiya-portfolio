
export interface Project {
  id: string; name: string; sub: string; tech: string[]; desc: string;
  problem?: string; solution?: string; impact?: string; flow: string[]; features: string[];
  github: string; demo: string; // leave '' to hide the button
}

export const PROJECTS: Project[] = [
  {
    id: 'krishiqueue', name: 'KrishiQueue', sub: 'Farmer Procurement Queue Management Platform',
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Socket.io', 'REST API', 'Vercel'],
    desc: 'A farmer procurement queue-management platform designed to improve procurement visibility and reduce physical waiting time.',
    problem: 'Long waiting times and no visibility into procurement status for farmers.',
    solution: 'Farmer-initiated slot booking with automatic digital tokens and live queue tracking, plus separate Operator and Admin dashboards.',
    impact: 'Projected to reduce farmer physical wait time by 40–60% and processing delays by up to 70% through real-time monitoring across procurement centers.',
    flow: ['Farmer', 'Slot Booking', 'Digital Token', 'Live Queue', 'Procurement', 'Payment'],
    features: ['Farmer slot booking', 'Automatic digital token generation', 'Real-time queue tracking', 'Operator dashboard', 'Admin dashboard', 'JWT authentication', 'Payment status tracking', 'Transaction history', 'Notifications', 'Hindi voice assistant for low-literacy access', 'Vercel deployment'],
    github: '', // paste KrishiQueue repo link here
    demo: 'https://krishiqueue-platform.vercel.app/',
  },
  {
    id: 'syncroom', name: 'SyncRoom', sub: 'Real-Time Synchronized YouTube Watch Rooms',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'WebSockets', 'YouTube IFrame Player API'],
    desc: 'Create or join a room and watch YouTube together in real time. Play, pause, seek and the current video stay synchronized for everyone, and every protected event is validated on the server before it is broadcast.',
    problem: 'Watching a video together remotely means counting down "3, 2, 1, play" and drifting out of sync.',
    solution: "A room-based WebSocket server that validates each playback event against the sender's role, then broadcasts it to everyone in the room.",
    flow: ['React Client', 'YouTube Player', 'WebSocket Client', 'WebSocket Server', 'Room + Permission Logic'],
    features: ['Room-based watching', 'Real-time play / pause / seek / video sync', 'Host, Moderator and Participant roles', 'Backend-enforced permission validation'],
    github: 'https://github.com/tiya-1/watch-party', demo: '', // paste live URL if you have one
  },
  {
    id: 'aispend', name: 'AI Spend Audit Platform', sub: 'AI-powered cloud and software spend analysis',
    tech: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'LLM APIs', 'GitHub Actions (CI/CD)', 'Vercel'],
    desc: 'An AI-powered platform that analyses cloud and software spend and generates cost-optimization recommendations.',
    problem: 'Enterprises lack automated visibility into where cloud and software spend is wasted, so cost optimization is manual and reactive.',
    solution: 'LLM API integration with fallback mechanisms, backed by responsive dashboards and production-ready API integrations.',
    flow: ['Spend Data Input', 'LLM Analysis', 'Recommendations', 'Dashboard'],
    features: ['Spend data input', 'LLM-driven analysis with fallback mechanisms', 'Cost-optimization recommendations', 'Responsive dashboards', 'CI/CD with GitHub Actions', 'Deployed live on Vercel'],
    github: 'https://github.com/tiya-1/ai-spend-audit', demo: 'https://ai-spend-audit-rho-one.vercel.app/',
  },
  {
    id: 'pathfinder', name: 'Path Finder', sub: 'Career Learning Platform',
    tech: ['MERN Stack', 'JWT', 'MongoDB', 'Docker Compose'],
    desc: 'A full-stack career learning platform with secure authentication, course management and progress tracking, run as separate frontend, backend and database services.',
    flow: ['Frontend Container', 'Backend Container', 'MongoDB Container'],
    features: ['Secure JWT authentication', 'Protected routes', 'REST APIs for course management', 'Learning progress tracking', 'MongoDB storage', 'Docker Compose with separate frontend / backend / database services'],
    github: 'https://github.com/tiya-1/Career-Reality-Engine', demo: '',
  },
];

export const TECH: Record<string, string[]> = {
  Languages: ['Java', 'JavaScript', 'TypeScript', 'SQL'],
  Frontend: ['React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3'],
  Backend: ['Node.js', 'Express', 'NestJS', 'REST APIs', 'JWT', 'RBAC', 'WebSockets'],
  Databases: ['MongoDB', 'PostgreSQL', 'Firebase'],
  'DevOps / Tools': ['Docker', 'Git', 'GitHub', 'Vercel', 'GitHub Actions', 'Postman'],
  AI: ['LLM APIs', 'Prompt Engineering', 'AI Application Development'],
  'Core CS': ['DSA', 'OOP', 'DBMS', 'OS', 'Networks'],
};
export const USED: Record<string, string> = {
  JavaScript: 'KrishiQueue, SyncRoom, Path Finder', TypeScript: 'IAIRE Community Platform, AI Spend Audit Platform',
  React: 'KrishiQueue, SyncRoom, Path Finder, AI Spend Audit Platform', 'Next.js': 'AI Spend Audit Platform', 'Tailwind CSS': 'AI Spend Audit Platform',
  'Node.js': 'KrishiQueue, SyncRoom, Path Finder', Express: 'KrishiQueue, SyncRoom, Path Finder', NestJS: 'IAIRE Community Platform',
  'REST APIs': 'IAIRE Community Platform (30+ APIs), KrishiQueue, Path Finder', JWT: 'IAIRE Community Platform, KrishiQueue, Path Finder',
  RBAC: 'IAIRE Community Platform, SyncRoom', WebSockets: 'SyncRoom (KrishiQueue uses Socket.io)',
  MongoDB: 'KrishiQueue, SyncRoom, Path Finder', PostgreSQL: 'IAIRE Community Platform',
  Docker: 'Path Finder', Vercel: 'KrishiQueue, AI Spend Audit Platform', 'GitHub Actions': 'AI Spend Audit Platform (CI/CD)',
  'LLM APIs': 'AI Spend Audit Platform', 'Prompt Engineering': 'AI Spend Audit Platform', 'AI Application Development': 'AI Spend Audit Platform',
};
export const COLORS = ['#8b9bff', '#ffb86b', '#6ee7b7', '#ff7a90', '#7dd3fc', '#d8b4fe', '#fde68a'];

export const METS: [string, string, string][] = [
  ['30+', 'Production REST APIs', 'Built across the IAIRE Community Platform, a multi-school platform connecting students to innovation, research and patent-support resources.'],
  ['JWT', 'Authentication', 'Secure JWT authentication across multiple user roles.'],
  ['RBAC', 'Authorization', 'Role-Based Access Control restricting what each user role can do.'],
  ['PostgreSQL', 'Database', 'Optimized PostgreSQL queries and a modular backend architecture using TypeORM.'],
];
export const ARCH: [string, string][] = [
  ['Client', 'Sends HTTP requests to the API.'],
  ['Controller', 'Handles incoming HTTP requests and routes them to the appropriate business logic.'],
  ['Service', 'Contains application/business logic.'],
  ['TypeORM', 'Maps entities to relational tables and runs queries.'],
  ['PostgreSQL', 'Persistent relational data storage.'],
];
export const STEPS: [string, string][] = [
  ['Idea', 'Define the problem and who it is for.'], ['Requirements', 'Separate must-have features from nice-to-have.'],
  ['Architecture', 'Choose components and how they communicate.'], ['Database', 'Model entities and relations before writing endpoints.'],
  ['API', 'Design REST endpoints with auth and role checks.'], ['Real-time logic', 'Define events, validation and broadcast rules.'],
  ['Frontend', 'Build the UI against the agreed API.'], ['Testing', 'Test endpoints and flows, including permission failures.'],
  ['Docker', 'Containerize services so setup is repeatable.'], ['Deployment', 'Ship it and verify it works outside my machine.'],
];
export const STATS: [number, string, string][] = [
  [300, 'LeetCode problems solved', '+'], [30, 'Production REST APIs', '+'], [2, 'Hackathon finals', ''], [4, 'Featured projects', ''],
];
export const WINS = [
  { t: 'Finalist — Hacknovate 7.0', d: '2026 · international hybrid, 30-hour hackathon', i: '🏆' },
  { t: 'Finalist — NexGen Hack', d: '2025', i: '🏆' },
  { t: 'Campus Ambassador — GSSoC 2025', d: 'GirlScript Summer of Code', i: '🌟' },
  { t: 'DevOps Virtual Internship', d: 'Docker, CI/CD fundamentals and deployment workflows', i: '📜' },
  { t: 'Deloitte Technology Job Simulation', d: 'Certification', i: '📜' },
];
export const EDU = [
  { t: 'B.Tech, Computer Science Engineering', d: 'IMS Engineering College, Ghaziabad · 2023–2027 · CGPA 8.5/10' },
  { t: 'CBSE Class 12', d: 'DAV Public School, Ghaziabad · 2022–2023 · 87%' },
  { t: 'CBSE Class 10', d: 'DAV Public School, Ghaziabad · 2020–2021 · 90.1%' },
];
export const MARQUEE = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB', 'Docker', 'WebSockets', 'JWT', 'RBAC', 'LLM APIs', 'GitHub Actions'];

// Technologies shown large as the "core stack"
export const CORE = ['React', 'Node.js', 'Express', 'MongoDB', 'NestJS', 'PostgreSQL', 'TypeScript', 'JavaScript', 'Java'];
export const BUILD: [string, string][] = [
  ['Full-stack systems', 'MERN products like KrishiQueue and Path Finder, from database to deployed UI.'],
  ['Backend services', '30+ REST APIs with NestJS, PostgreSQL, JWT and role-based access control.'],
  ['AI applications', 'LLM-powered spend analysis with fallback mechanisms.'],
  ['Real-time products', 'SyncRoom: WebSocket-synced watch rooms with role permissions.'],
];
