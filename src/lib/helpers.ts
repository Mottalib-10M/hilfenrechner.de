/** Schreibhilfen für jede Seite: Links, Beträge aus der Parameterdatei und den Rechenkernen, Tabellen, Quellen. */
import { route, ROUTES } from '../i18n/routes';
import { P, TODAY, type SourceKey } from './engine/params';
import * as GSG from './engine/grundsicherung';
import * as WG from './engine/wohngeld';
import * as KIZ from './engine/kiz';
import * as EG from './engine/elterngeld';
import * as UV from './engine/uvg';
import * as MU from './engine/mutterschaft';
import * as VG from './engine/vergleich';
import * as NT from './engine/netto';
import { formatMoney, formatNumber, formatPercent, formatDecimal, displayDate } from './format';

const esc = (s: string | number) => String(s).replace(/&(?!(?:[a-z]+|#\d+);)/g, '&amp;').replace(/</g, '&lt;');
export function table(headers: string[], rows: Array<Array<string | number>>, caption?: string, align: Array<'l' | 'r'> = []) {
  const al = (i: number) => (align[i] === 'r' ? 'text-right' : 'text-left');
  return `<div class="not-prose my-6 overflow-x-auto"><table class="journal w-full text-sm">${caption ? `<caption class="mb-2 text-left text-sm text-navy-600">${caption}</caption>` : ''}<thead><tr>${headers.map((h, i) => `<th scope="col" class="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy-700 ${al(i)}">${h}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${r.map((c, i) => `<td class="tabular-nums border-b border-navy-100 px-3 py-2 text-navy-800 ${al(i)}">${typeof c === 'number' ? esc(formatNumber(c, 0)) : c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

export function helpers(strict = false) {
  const m = (n: number) => formatMoney(Math.round(n), 0);
  const m2 = (n: number) => formatMoney(n, 2);
  const pc = (x: number, d?: number) => { const v = Math.round(x * 10000) / 100; return formatPercent(x, d ?? (Number.isInteger(v) ? 0 : Number.isInteger(+(v * 10).toFixed(6)) ? 1 : 2)); };
  const date = (iso: string) => displayDate(iso, 'de-DE');
  const a = (id: string, text: string) => {
    if (!ROUTES.some((r) => r.id === id)) { if (strict) throw new Error(`Unbekannte Seite in einem Link: ${id}`); return text; }
    return `<a href="${route(id, 'de')}">${text}</a>`;
  };
  return {
    P, TODAY, GSG, WG, KIZ, EG, UV, MU, VG, NT,
    a, m, m2, pc, date, num: (n: number, d = 0) => formatNumber(n, d), dec: (n: number, d = 2) => formatDecimal(n, d),
    table,
    /** Link auf eine amtliche Quelle der Parameterdatei. */
    src: (key: SourceKey, text?: string) => { const s = (P.sources as Record<string, { url: string; label: { de: string } }>)[key]; return `<a href="${s.url}" target="_blank" rel="nofollow noopener noreferrer">${text ?? s.label.de}</a>`; },
    /** Hinweiskasten. */
    box: (title: string, html: string, kind: 'info' | 'tip' | 'warning' | 'example' = 'info') => `<div class="callout callout-${kind}"><span class="callout-title">${title}</span>${html}</div>`,
  };
}
export type Helpers = ReturnType<typeof helpers>;
