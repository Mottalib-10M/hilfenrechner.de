/**
 * Netto aus einem Monatsbrutto (Arbeitnehmer, gesetzlich versichert), wie es die Leistungsrechner brauchen.
 * - Minijob bis zur Geringfügigkeitsgrenze (603 € in 2026): keine Lohnsteuer beim Beschäftigten (Pauschsteuer
 *   trägt der Arbeitgeber), nur der Eigenanteil zur Rentenversicherung (18,6 % − 15 % = 3,6 %), außer bei Befreiung.
 * - Übergangsbereich 603,01 € bis 2.000 €: Arbeitnehmeranteil auf die reduzierte beitragspflichtige Einnahme
 *   BE = 2000 / (2000 − G) × (AE − G) (§ 20 Abs. 2a Satz 6 SGB IV).
 * - darüber: volle Arbeitnehmeranteile (sv.ts), Lohnsteuer und Soli nach dem PAP 2026 (lohnsteuer.ts).
 * Kirchensteuer wird nicht abgezogen (Annahme, im Ergebnis genannt).
 */
import { P } from './params';
import { lohnsteuer } from './lohnsteuer';
import { pvRate, kvRate } from './sv';

export type Stkl = 1 | 2 | 3 | 4 | 5 | 6;
export interface NettoInput { brutto: number; stkl?: Stkl; kinder?: number; kvz?: number; rvBefreit?: boolean }
export interface NettoResult { brutto: number; art: 'keins' | 'minijob' | 'uebergang' | 'voll'; lst: number; soli: number; sv: number; netto: number }
const r2 = (x: number) => Math.round(x * 100 + 1e-9) / 100;

export function netto({ brutto, stkl = 1, kinder = 0, kvz = P.sv.zusatzDurchschnitt, rvBefreit = false }: NettoInput): NettoResult {
  const S = P.sv; const G = S.geringfuegig;
  if (brutto <= 0) return { brutto: 0, art: 'keins', lst: 0, soli: 0, sv: 0, netto: 0 };
  if (brutto <= G) {
    const rv = rvBefreit ? 0 : r2(brutto * (S.rvGesamt - S.minijobRvAg));
    return { brutto, art: 'minijob', lst: 0, soli: 0, sv: rv, netto: r2(brutto - rv) };
  }
  const anRate = S.rvAn + S.avAn + kvRate(kvz) + pvRate({ kinder });
  let svBetrag: number; let art: NettoResult['art'];
  if (brutto <= S.uebergangBis) {
    const be = (S.uebergangBis / (S.uebergangBis - G)) * (brutto - G);
    svBetrag = r2(be * anRate); art = 'uebergang';
  } else {
    const rvB = Math.min(brutto, S.bbgRv / 12), kvB = Math.min(brutto, S.bbgKv / 12);
    svBetrag = r2(rvB * (S.rvAn + S.avAn) + kvB * (kvRate(kvz) + pvRate({ kinder }))); art = 'voll';
  }
  const lst = lohnsteuer({ lzz: 2, re4: brutto, stkl, zkf: stkl === 2 || stkl === 3 ? kinder : kinder * 0.5, church: false, kvz, pvz: kinder === 0, pva: Math.max(0, Math.min(kinder - 1, 4)) });
  return { brutto, art, lst: lst.lst, soli: lst.soli, sv: svBetrag, netto: r2(brutto - lst.lst - lst.soli - svBetrag) };
}

/** Faktor F des Übergangsbereichs: 28 % geteilt durch den Gesamtsozialversicherungsbeitragssatz (§ 20 Abs. 2a SGB IV). */
export function faktorF(): number {
  const S = P.sv;
  const gsv = S.rvGesamt + S.avGesamt + S.kvAllgGesamt + S.zusatzDurchschnitt / 100 + S.pvGesamt;
  return Math.round((0.28 / gsv) * 10000) / 10000;
}
