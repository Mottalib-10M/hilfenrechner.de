/**
 * Hauptrechner: ein Haushalt (allein oder Paar, Kinder mit Alter, Bruttolöhne, Miete, Heizung, Wohnort) →
 * Grundsicherungsgeld, Wohngeld, Kinderzuschlag, Kindergeld, Unterhaltsvorschuss; dazu die Kombination, die nach
 * § 12a SGB II gilt, und wo man sie beantragt. Rechenkern: lib/engine/vergleich.ts.
 * Hydratation (RECETTE §17.5): erster Render = Vorgaben der Seite; Link-Parameter erst im Effekt, die Adresse
 * ändert sich erst nach einer echten Eingabe (url-state.ts).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Toggle from '../ui/Toggle';
import Ledger from './Ledger';
import Actions from './Actions';
import { P, TODAY } from '../../lib/engine/params';
import { vergleich, STELLE } from '../../lib/engine/vergleich';
import { formatMoney, displayDate } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';

interface Props { paar?: boolean; kinder?: string; brutto1?: number; brutto2?: number; miete?: number; heizung?: number; ort?: string; unterhalt?: number; elterngeld?: number; sonstiges?: number; methodHref: string; idPrefix?: string }
const m = (n: number) => formatMoney(Math.round(n), 0);
const m2 = (n: number) => formatMoney(n, 2);
const ROEMISCH = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const STAEDTE = Object.entries(P.wohngeld.mietstufen as Record<string, number>).sort((a, b) => a[0].localeCompare(b[0], 'de'));
const ORTE = [...STAEDTE.map(([s, st]) => ({ value: s, label: `${s} (Stufe ${ROEMISCH[st - 1]})` })), ...ROEMISCH.map((r, i) => ({ value: `stufe-${i + 1}`, label: `Anderer Ort, Mietstufe ${r}` }))];
const stufeVon = (ort: string) => (ort.startsWith('stufe-') ? Number(ort.slice(6)) : (P.wohngeld.mietstufen as Record<string, number>)[ort] ?? 3);
export const parseAlter = (s: string): number[] => s.split(/[,;\s]+/).map((x) => parseInt(x, 10)).filter((x) => Number.isFinite(x) && x >= 0 && x < 25).slice(0, 8);

export default function Haushalt({ paar: p0 = false, kinder: k0 = '4', brutto1: b10 = 1400, brutto2: b20 = 0, miete: mi0 = 600, heizung: hz0 = 90, ort: o0 = 'Berlin', unterhalt: u0 = 0, elterngeld: eg0 = 0, sonstiges: so0 = 0, methodHref, idPrefix = 'r' }: Props) {
  const [paar, setPaar] = useState(p0);
  const [kinderTxt, setKinderTxt] = useState(k0);
  const [b1, setB1] = useState(b10);
  const [b2, setB2] = useState(b20);
  const [miete, setMiete] = useState(mi0);
  const [heizung, setHeizung] = useState(hz0);
  const [ort, setOrt] = useState(o0);
  const [unterhalt, setUnterhalt] = useState(u0);
  const [eg, setEg] = useState(eg0);
  const [sonst, setSonst] = useState(so0);

  useEffect(() => {
    const u = readParams(window.location.search);
    if (!u.toString()) return;
    setPaar(str(u, 'h', p0 ? '2' : '1') === '2'); setKinderTxt(str(u, 'k', k0).replace(/-/g, ', '));
    setB1(num(u, 'b1', b10)); setB2(num(u, 'b2', b20)); setMiete(num(u, 'mi', mi0)); setHeizung(num(u, 'hz', hz0));
    const o = str(u, 'o', o0); if (ORTE.some((x) => x.value === o)) setOrt(o);
    setUnterhalt(num(u, 'u', u0)); setEg(num(u, 'eg', eg0)); setSonst(num(u, 'so', so0));
  }, []);
  const kinder = parseAlter(kinderTxt);
  useEffect(() => { updateURL({ h: paar ? 2 : 1, k: kinder.join('-'), b1, b2: paar ? b2 : undefined, mi: miete, hz: heizung, o: ort, u: !paar && unterhalt ? unterhalt : undefined, eg: eg || undefined, so: sonst || undefined }); }, [paar, kinderTxt, b1, b2, miete, heizung, ort, unterhalt, eg, sonst]);

  const stufe = stufeVon(ort);
  const v = useMemo(() => vergleich({ paar, brutto: paar ? [b1, b2] : [b1], kinder, unterhalt: paar ? 0 : unterhalt, miete, heizung, mietstufe: stufe, elterngeld: eg, sonstiges: sonst }), [paar, kinderTxt, b1, b2, miete, heizung, stufe, unterhalt, eg, sonst]);
  const best = v.optionen.find((o) => o.id === v.empfehlung) ?? v.optionen[0];
  const id = (x: string) => `${idPrefix}-${x}`;
  const rows: Array<[string, string]> = [[`Netto aus Arbeit${paar ? ' (beide)' : ''}`, m2(v.nettoSumme)]];
  if (v.unterhalt) rows.push(['Unterhalt für die Kinder', m2(v.unterhalt)]);
  if (eg) rows.push(['Elterngeld', m2(eg)]);
  if (sonst) rows.push(['Sonstiges Einkommen', m2(sonst)]);
  for (const l of best.leistungen) rows.push([`${l.name} (${l.stelle})`, m2(l.betrag)]);
  const notes = [v.begruendung, `Netto geschätzt mit Steuerklasse ${paar ? (b2 > 0 && b1 > 0 ? 'IV/IV' : 'III') : kinder.some((a) => a < 18) ? 'II' : 'I'}, ohne Kirchensteuer. Miete und Heizung in tatsächlicher Höhe; das Jobcenter zahlt nur die angemessenen Kosten (nach der Karenzzeit). Vermögen wird nicht geprüft.`];

  return (
    <div data-chrome className="rechner border border-navy-300 bg-white p-4 sm:p-5">
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)]">
        <form className="grid content-start gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <Toggle id={id('h')} label="Haushalt" value={paar ? '2' : '1'} onChange={(x) => setPaar(x === '2')} options={[{ value: '1', label: 'Allein' }, { value: '2', label: 'Paar' }]} />
            <div className="grid grid-rows-subgrid row-span-3 content-start gap-y-0">
              <label htmlFor={id('k')} className="mb-1 block text-sm font-medium text-navy-700">Alter der Kinder</label>
              <input id={id('k')} type="text" inputMode="numeric" value={kinderTxt} onChange={(e) => setKinderTxt(e.target.value.replace(/[^0-9,;\s]/g, ''))} placeholder="keine" aria-describedby={id('k-help')} className="h-12 w-full self-start rounded-lg border border-navy-300 bg-white px-3 text-navy-900 focus:border-accent-500 focus:outline-none focus:ring-2 focus:ring-accent-500/20" />
              <p id={id('k-help')} className="mt-1 text-xs text-navy-500">{kinder.length ? `${kinder.length} ${kinder.length === 1 ? 'Kind' : 'Kinder'}; ` : ''}mit Komma getrennt, leer = keine</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <NumberField id={id('b1')} label={paar ? 'Bruttolohn Person 1' : 'Ihr Bruttolohn im Monat'} value={b1} onChange={setB1} unit="€" max={20000} help="0, wenn kein Lohn" />
            {paar
              ? <NumberField id={id('b2')} label="Bruttolohn Person 2" value={b2} onChange={setB2} unit="€" max={20000} help="0, wenn kein Lohn" />
              : <NumberField id={id('u')} label="Unterhalt vom anderen Elternteil" value={unterhalt} onChange={setUnterhalt} unit="€" max={5000} help="Für alle Kinder zusammen, 0 = nichts" />}
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <NumberField id={id('mi')} label="Kaltmiete mit Nebenkosten" value={miete} onChange={setMiete} unit="€" max={6000} help="Ohne Heizung" />
            <NumberField id={id('hz')} label="Heizkosten im Monat" value={heizung} onChange={setHeizung} unit="€" max={2000} help="Abschlag laut Vermieter oder Versorger" />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <SelectField id={id('o')} label="Wohnort" value={ort} onChange={setOrt} options={ORTE} help={`Mietstufe ${ROEMISCH[stufe - 1]} für das Wohngeld`} />
          </div>
          <details className="group border-t border-navy-200 pt-3">
            <summary className="cursor-pointer text-sm font-medium text-accent-700">Mehr: Elterngeld, Rente und anderes Einkommen</summary>
            <div className="mt-3 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
              <NumberField id={id('eg')} label="Elterngeld im Monat" value={eg} onChange={setEg} unit="€" max={4000} help="Beide Eltern zusammen" />
              <NumberField id={id('so')} label="Sonstiges Einkommen netto" value={sonst} onChange={setSonst} unit="€" max={10000} help="Rente, Arbeitslosengeld, Krankengeld" />
            </div>
          </details>
        </form>
        <Ledger label={`Empfohlen: ${best.titel}`} value={m(best.verfuegbar)} unit="€ im Monat" sub="So viel Geld hat der Haushalt insgesamt, mit Lohn und Leistungen" rows={rows} total={['Leistungen zusammen', m2(best.leistungenSumme)]} notes={notes} />
      </div>
      <div className="mt-5">
        <h3 className="text-base font-semibold text-navy-900">Die Kombinationen im Vergleich</h3>
        <div className="mt-2 overflow-x-auto">
          <table className="journal w-full text-sm">
            <thead><tr><th scope="col" className="px-2 py-1 text-left">Weg</th><th scope="col" className="px-2 py-1 text-right">Leistungen</th><th scope="col" className="px-2 py-1 text-right">Geld im Monat</th><th scope="col" className="px-2 py-1 text-left">Bewertung</th></tr></thead>
            <tbody>{v.optionen.map((o) => <tr key={o.id}><td className="border-b border-navy-100 px-2 py-1 font-medium">{o.titel}{o.id === v.empfehlung ? ' ✓' : ''}</td><td className="tabular-nums border-b border-navy-100 px-2 py-1 text-right">{m(o.leistungenSumme)}</td><td className="tabular-nums border-b border-navy-100 px-2 py-1 text-right">{o.zulaessig ? m(o.verfuegbar) : 'nicht möglich'}</td><td className="border-b border-navy-100 px-2 py-1 text-navy-700">{o.hinweis}</td></tr>)}</tbody>
          </table>
        </div>
        <details className="mt-3 text-sm">
          <summary className="cursor-pointer font-medium text-accent-700">Rechenweg: Bedarf und Einkommen nach dem SGB II</summary>
          <table className="ledger mt-2 w-full"><tbody>
            {v.gsg.bedarf.map((z) => <tr key={z.label}><td className="pr-2 text-navy-700">{z.label}</td><td className="tabular-nums text-right">{m2(z.betrag)}</td></tr>)}
            <tr className="total"><td>Bedarf</td><td className="tabular-nums text-right">{m2(v.gsg.bedarfSumme)}</td></tr>
            {v.gsg.einkommen.map((z) => <tr key={z.label}><td className="pr-2 text-navy-700">{z.label}</td><td className="tabular-nums text-right">− {m2(z.betrag)}</td></tr>)}
            <tr className="total"><td>Grundsicherungsgeld</td><td className="tabular-nums text-right">{m2(v.gsg.anspruch)}</td></tr>
            {v.gsg.sofortzuschlag > 0 && <tr><td className="pr-2 text-navy-700">Sofortzuschlag für {kinder.length === 1 ? 'das Kind' : `${kinder.length} Kinder`} (§ 72 SGB II)</td><td className="tabular-nums text-right">+ {m2(v.gsg.sofortzuschlag)}</td></tr>}
          </tbody></table>
          <p className="mt-2 text-xs text-navy-600">Wohngeld: berücksichtigte Miete {m(v.wg.mieteBerueck)} (Höchstbetrag {m(v.wg.hoechst)} plus Klimakomponente {m(v.wg.klima)}), Heizkostenkomponente {m(v.wg.heiz)}, Monatseinkommen nach Abzügen {m(v.wg.Y)}.{v.kiz.elternBedarf ? ` Kinderzuschlag: Bedarf der Eltern ${m(v.kiz.elternBedarf)} (Wohnanteil ${Math.round(v.kiz.wohnanteil * 100)} %), anrechenbares Einkommen ${m(v.kiz.elternEinkommen)}${v.kiz.mindestOk ? '' : `, Mindesteinkommen von ${paar ? P.kiz.mindestPaar : P.kiz.mindestAllein} € brutto nicht erreicht`}.` : ''}</p>
        </details>
        <p className="mt-3 text-sm text-navy-700">Anträge: Grundsicherungsgeld beim {STELLE.gsg}, Wohngeld bei der {STELLE.wg}, Kindergeld und Kinderzuschlag bei der {STELLE.kiz}, Unterhaltsvorschuss bei der {STELLE.uvg}. Entscheiden wird immer die Behörde.</p>
      </div>
      <div aria-hidden="true" className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-300 bg-white/95 px-4 py-2 text-sm text-navy-900 shadow-[0_-2px_6px_rgba(0,0,0,0.06)] lg:hidden print:hidden">{best.titel}: <strong className="tabular-nums">{m(best.leistungenSumme)}</strong> Leistungen im Monat</div>
      <Actions methodHref={methodHref} note={`Recht in Kraft am ${displayDate(TODAY, 'de-DE')}; Grundsicherungsgeld nach dem SGB II seit ${displayDate(P.reform.inkraft, 'de-DE')}.`} />
    </div>
  );
}
