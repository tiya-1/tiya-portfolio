import { LINKS } from '../data/config';
export default function Footer() {
  return (
    <footer>
      <span><b>Tiya Jain</b> · Software Developer</span>
      <span className="soc">
        <a href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer">LeetCode</a>
      </span>
      <span>© 2026 Tiya Jain · Built with React &amp; TypeScript</span>
    </footer>
  );
}
