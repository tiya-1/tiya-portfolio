import { useEffect, useRef, useState, type FormEvent } from 'react';
import { answer } from '../lib/answer';
import { Head, RM } from '../lib/ui';

const SUG = ['What technologies does Tiya know?', 'Tell me about the SyncRoom project.', 'Tell me about her internship.', 'Explain the WebSocket architecture.', 'What projects has Tiya built?'];
interface M { who: 'u' | 'a'; t: string }

export default function AIAssistant() {
  const [msgs, setMsgs] = useState<M[]>([{ who: 'a', t: "Hi! Ask me about Tiya's projects, stack or internship." }]);
  const [q, setQ] = useState('');
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => { box.current?.scrollTo({ top: 1e9 }); }, [msgs]);
  const ask = (v: string) => {
    v = v.trim().slice(0, 200); if (!v) return;
    setMsgs((m) => [...m, { who: 'u', t: v }]);
    setTimeout(() => setMsgs((m) => [...m, { who: 'a', t: answer(v) }]), RM ? 0 : 350);
  };
  const submit = (e: FormEvent) => { e.preventDefault(); ask(q); setQ(''); };
  return (
    <section id="ai">
      <Head n="07 — ASK" t="Tiya AI" sub="Answers only from this portfolio's data, so it never makes things up." />
      <div className="glass">
        <div id="chat" ref={box} aria-live="polite">{msgs.map((m, i) => <div key={i} className={'msg ' + m.who}>{m.t}</div>)}</div>
        <form className="ai" onSubmit={submit}>
          <input value={q} onChange={(e) => setQ(e.target.value)} maxLength={200} aria-label="Ask Tiya AI" placeholder="Ask about projects, stack, internship…" />
          <button className="btn f">Ask</button>
        </form>
      </div>
      <div className="chips" style={{ marginTop: 12 }}>{SUG.map((s) => <button key={s} className="chip" onClick={() => ask(s)}>{s}</button>)}</div>
    </section>
  );
}
