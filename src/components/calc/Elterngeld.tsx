/**
 * Elterngeld-Rechner (BEEG): Brutto vor der Geburt → Elterngeld-Netto, Ersatzrate, Basiselterngeld und
 * Elterngeld Plus, mit Teilzeit nach der Geburt, Geschwisterbonus und Mehrlingszuschlag. Rechenkern:
 * lib/engine/elterngeld.ts. Hydratation wie Haushalt.tsx (RECETTE §17.5).
 */
import { useEffect, useMemo, useState } from 'react';
import NumberField from '../ui/NumberField';
import SelectField from '../ui/SelectField';
import Ledger from './Ledger';
import Actions from './Actions';
import { P } from '../../lib/engine/params';
import { elterngeld } from '../../lib/engine/elterngeld';
import { formatMoney, formatPercent } from '../../lib/format';
import { readParams, num, str, updateURL } from '../../lib/url-state';
import type { Stkl } from '../../lib/engine/netto';

interface Props { brutto?: number; stkl?: string; methodHref: string; idPrefix?: string }
const m = (n: number) => formatMoney(Math.round(n), 0);
/** Résultat de calculateur : euros entiers (RECETTE §4.1), les centimes restent dans le calcul. */
const m2 = (n: number) => formatMoney(Math.round(n), 0);
const STKL = ['1', '2', '3', '4', '5'].map((x) => ({ value: x, label: ['I', 'II', 'III', 'IV', 'V'][Number(x) - 1] }));

export default function Elterngeld({ brutto: b0 = 2800, stkl: s0 = '4', methodHref, idPrefix = 'r' }: Props) {
  const [brutto, setBrutto] = useState(b0);
  const [stkl, setStkl] = useState(s0);
  const [kirche, setKirche] = useState('0');
  const [nachher, setNachher] = useState(0);
  const [geschw, setGeschw] = useState('0');
  const [mehr, setMehr] = useState('1');
  useEffect(() => {
    const u = readParams(window.location.search);
    if (!u.toString()) return;
    setBrutto(num(u, 'b', b0)); setStkl(str(u, 's', s0)); setKirche(str(u, 'ki', '0')); setNachher(num(u, 'tz', 0)); setGeschw(str(u, 'g', '0')); setMehr(str(u, 'mz', '1'));
  }, []);
  useEffect(() => { updateURL({ b: brutto, s: stkl, ki: kirche === '1' ? 1 : undefined, tz: nachher || undefined, g: geschw === '1' ? 1 : undefined, mz: mehr !== '1' ? mehr : undefined }); }, [brutto, stkl, kirche, nachher, geschw, mehr]);
  const r = useMemo(() => elterngeld({ brutto, stkl: Number(stkl) as Stkl, kirche: kirche === '1', geschwister: geschw === '1', mehrlinge: Number(mehr), nettoNachher: nachher }), [brutto, stkl, kirche, nachher, geschw, mehr]);
  const E = P.elterngeld; const id = (x: string) => `${idPrefix}-${x}`;
  const rows: Array<[string, string]> = [
    ['Brutto vor der Geburt', m2(brutto)],
    [`Arbeitnehmer-Pauschbetrag (1/12)`, `− ${m2(E.anp / 12)}`],
    ['Steuern (Lohnsteuer, Soli' + (kirche === '1' ? ', Kirchensteuer)' : ')'), `− ${m2(r.steuern)}`],
    ['Sozialabgaben (Pauschalen 9 + 10 + 2 %)', `− ${m2(r.sozial)}`],
    ['Elterngeld-Netto', m2(r.egNetto)],
    [`Ersatzrate`, formatPercent(r.rate, 1)],
    ['Elterngeld Plus im Monat', m2(r.plus)],
  ];
  const notes = [
    r.mindest ? `Mindestbetrag: ${m(E.mindest)} Basiselterngeld, auch ohne Einkommen vor der Geburt.` : r.hoechst ? `Höchstbetrag: ${m(E.hoechst)} Basiselterngeld.` : '',
    `Basiselterngeld bis zum ${E.basisBisLebensmonat}. Lebensmonat, zusammen ${E.basisMonate} Monate plus ${E.partnerMonate} Partnermonate; ein Monat Basiselterngeld kann doppelt (Plus) genommen werden.`,
    `Lohnsteuer nach dem Programmablaufplan 2026, maßgeblich für Geburten ab 2027; für Geburten 2026 rechnet die Elterngeldstelle mit dem PAP 2025 (Abweichung meist wenige Euro). Kein Anspruch bei mehr als ${m(E.einkommensgrenze)} zu versteuerndem Einkommen im Jahr vor der Geburt.`,
  ].filter(Boolean);
  return (
    <div data-chrome className="rechner border border-navy-300 bg-white p-4 sm:p-5">
      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(0,26rem)]">
        <form className="grid content-start gap-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <NumberField id={id('b')} label="Bruttolohn im Monat vor der Geburt" value={brutto} onChange={setBrutto} unit="€" max={30000} help="Durchschnitt der 12 Monate vor dem Mutterschutz" />
            <SelectField id={id('s')} label="Steuerklasse" value={stkl} onChange={setStkl} options={STKL} help="Die überwiegend gültige im Bemessungszeitraum" />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <NumberField id={id('tz')} label="Netto aus Teilzeit nach der Geburt" value={nachher} onChange={setNachher} unit="€" max={10000} help="0, wenn Sie nicht arbeiten" />
            <SelectField id={id('ki')} label="Kirchensteuer" value={kirche} onChange={setKirche} options={[{ value: '0', label: 'Nein' }, { value: '1', label: 'Ja' }]} />
          </div>
          <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
            <SelectField id={id('g')} label="Geschwisterbonus" value={geschw} onChange={setGeschw} options={[{ value: '0', label: 'Nein' }, { value: '1', label: 'Ja (Kind unter 3 oder zwei unter 6)' }]} />
            <SelectField id={id('mz')} label="Kinder bei dieser Geburt" value={mehr} onChange={setMehr} options={['1', '2', '3', '4'].map((x) => ({ value: x, label: x === '1' ? 'Ein Kind' : `${x} (Mehrlinge)` }))} />
          </div>
        </form>
        <Ledger label="Basiselterngeld im Monat" value={m(r.basis)} sub={`Elterngeld Plus: ${m(r.plus)} im Monat, doppelt so lange`} rows={rows} notes={notes} />
      </div>
      <div aria-hidden="true" className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-300 bg-white/95 px-4 py-2 text-sm text-navy-900 shadow-[0_-2px_6px_rgba(0,0,0,0.06)] lg:hidden print:hidden">Basiselterngeld: <strong className="tabular-nums">{m(r.basis)}</strong> im Monat</div>
      <Actions methodHref={methodHref} note="§§ 2 bis 2f und 4 BEEG; die Elterngeldstelle entscheidet." />
    </div>
  );
}
