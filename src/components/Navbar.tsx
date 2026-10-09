import { useEffect, useState } from 'react';
import { go } from '../lib/ui';

const SECS: [string, string][] = [['home', 'Home'], ['about', 'About'], ['experience', 'Experience'], ['projects', 'Projects'], ['stack', 'Stack'], ['achievements', 'Beyond'], ['contact', 'Contact']];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false), [active, setActive] = useState('home'), [open, setOpen] = useState(false), [pr, setPr] = useState(0);
  useEffect(() => {
    const f = () => {
      setScrolled(scrollY > 30); setPr(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight));
      let c = 'home'; SECS.forEach(([id]) => { if (document.getElementById(id)!.getBoundingClientRect().top < innerHeight * 0.4) c = id; }); setActive(c);
    };
    f(); addEventListener('scroll', f, { passive: true }); return () => removeEventListener('scroll', f);
  }, []);
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${pr})` }} aria-hidden="true" />
      <nav className={scrolled ? 's' : ''}>
        <a className="logo" href="#home" aria-label="Home">TJ<i>.</i></a>
        <div className={'links' + (open ? ' o' : '')} role="navigation" aria-label="Main">
          {SECS.map(([id, l]) => <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} onClick={() => setOpen(false)}>{l}</a>)}
        </div>
        <button className="btn sm cta" onClick={() => go('contact')}>Let's talk</button>
        <button id="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      </nav>
    </>
  );
}
