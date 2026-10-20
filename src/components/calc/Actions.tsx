/** Share, print and method links under a full calculator. */
import { useState } from 'react';
export default function Actions({ methodHref, note }: { methodHref: string; note: string }) {
  const [copied, setCopied] = useState(false);
  const share = () => { try { navigator.clipboard.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* clipboard refused */ } };
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
      <button type="button" onClick={share} className="rounded border border-navy-300 px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50">{copied ? 'Link kopiert' : 'Link zu diesem Ergebnis kopieren'}</button>
      <button type="button" onClick={() => window.print()} className="rounded border border-navy-300 px-3 py-1.5 font-medium text-navy-800 hover:bg-navy-50">Drucken</button>
      <a href={methodHref} className="text-accent-700 underline underline-offset-2">So wird gerechnet</a>
      <span className="text-xs text-navy-600">{note}</span>
    </div>
  );
}
