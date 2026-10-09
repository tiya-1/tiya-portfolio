import { useState, type FormEvent } from 'react';
import { LINKS, WEB3FORMS_KEY } from '../data/config';
import { Head } from '../lib/ui';

type S = { k: 'idle' | 'ok' | 'er'; t: string };
const EMPTY = { name: '', email: '', message: '', botcheck: '' };

export default function Contact() {
  const [f, setF] = useState(EMPTY);
  const [s, setS] = useState<S>({ k: 'idle', t: '' }), [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!f.name.trim() || !/^\S+@\S+\.\S+$/.test(f.email) || f.message.trim().length < 5)
      return setS({ k: 'er', t: 'Add your name, a valid email and a message of at least 5 characters.' });
    if (!WEB3FORMS_KEY) return setS({ k: 'er', t: 'The contact form is not set up yet. Please reach out on LinkedIn instead.' });
    setBusy(true); setS({ k: 'idle', t: 'Sending…' });
    try {
      const r = await fetch('https://api.web3forms.com/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: `Portfolio message from ${f.name}`, ...f }) });
      const d = await r.json().catch(() => ({}));
      if (!r.ok || d.success === false) throw new Error(d.message || 'Could not send');
      setS({ k: 'ok', t: `Thanks, ${f.name}! Your message was sent.` }); setF(EMPTY);
    } catch (err) {
      setS({ k: 'er', t: `${(err as Error).message}. Please try again, or reach out on LinkedIn.` });
    } finally { setBusy(false); }
  };
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value });
  return (
    <section id="contact">
      <Head n="08 — CONTACT" t="Let's build something." sub="Interested in working together, discussing a project, or exploring an opportunity? Send a message and I'll get back to you." />
      <form onSubmit={submit} noValidate className="glass pad">
        <input value={f.name} onChange={set('name')} placeholder="Name" aria-label="Name" maxLength={80} />
        <input type="email" value={f.email} onChange={set('email')} placeholder="Email" aria-label="Email" maxLength={120} />
        <textarea value={f.message} onChange={set('message')} rows={5} placeholder="Message" aria-label="Message" maxLength={2000} />
        <input type="text" name="botcheck" value={f.botcheck} onChange={set('botcheck')} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
        <div className="row">
          <button className="btn f" disabled={busy}>{busy ? 'Sending…' : 'Send message'}</button>
          <a className="btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn" href={LINKS.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
        <div className={'fm ' + s.k} key={s.t} aria-live="polite">{s.t}</div>
      </form>
    </section>
  );
}
