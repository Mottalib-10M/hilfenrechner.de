/**
 * Elterngeld nach dem BEEG für Arbeitnehmerinnen und Arbeitnehmer.
 * Elterngeld-Netto (§§ 2c, 2e, 2f): Monatsbrutto minus 1/12 Arbeitnehmer-Pauschbetrag, minus Lohnsteuer, Soli und
 * gegebenenfalls 8 % Kirchensteuer nach dem Programmablaufplan, minus Pauschalen von 9 % (Kranken- und Pflege-),
 * 10 % (Renten-) und 2 % (Arbeitslosenversicherung); Minijobs ohne Sozialabgaben, Übergangsbereich mit der
 * reduzierten Bemessungsgrundlage. Maßgeblich ist der PAP des Jahres vor der Geburt: der Rechenkern nutzt den
 * PAP 2026, also das Recht für Geburten ab 1. Januar 2027 (für Geburten 2026 gilt der PAP 2025).
 * Ersatzrate (§ 2 Abs. 1 und 2): 67 %, unter 1.000 € je 2 € weniger 0,1 Punkte mehr bis 100 %, über 1.200 € je
 * 2 € mehr 0,1 Punkte weniger bis 65 %. Mindestens 300 €, höchstens 1.800 € (§ 2 Abs. 1, 4). Elterngeld Plus:
 * die Hälfte (§ 4a Abs. 2). Geschwisterbonus 10 %, mindestens 75 € (§ 2a), Mehrlingszuschlag 300 € (§ 2a Abs. 4).
 */
import { P } from './params';
import { lohnsteuer } from './lohnsteuer';
import type { Stkl } from './netto';

export interface EgInput { brutto: number; stkl?: Stkl; kirche?: boolean; kinderFb?: number; geschwister?: boolean; mehrlinge?: number; /** Netto-Erwerbseinkommen nach der Geburt bei Teilzeit (Elterngeld-Netto). */ nettoNachher?: number }
export interface EgResult { egNetto: number; steuern: number; sozial: number; rate: number; basis: number; plus: number; mindest: boolean; hoechst: boolean }

const r2 = (x: number) => Math.round(x * 100 + 1e-9) / 100;

export function elterngeldNetto(brutto: number, stkl: Stkl = 1, kirche = false, kinderFb = 0): { netto: number; steuern: number; sozial: number } {
  const E = P.elterngeld; const S = P.sv;
  if (brutto <= 0) return { netto: 0, steuern: 0, sozial: 0 };
  const basis = Math.max(0, brutto - E.anp / 12);
  let sozBasis = 0;
  if (brutto > S.geringfuegig) sozBasis = brutto <= S.uebergangBis ? (S.uebergangBis / (S.uebergangBis - S.geringfuegig)) * (brutto - S.geringfuegig) : brutto;
  const sozial = r2(sozBasis * (E.pauschKvPv + E.pauschRv + E.pauschAv));
  let steuern = 0;
  if (brutto > S.geringfuegig) {
    const l = lohnsteuer({ lzz: 2, re4: brutto, stkl: stkl === 6 ? 1 : stkl, zkf: kinderFb, church: kirche });
    steuern = r2(l.lst + l.soli + (kirche ? l.bk * E.kirchensteuer : 0));
  }
  return { netto: r2(Math.max(0, basis - steuern - sozial)), steuern, sozial };
}

export function ersatzrate(egNetto: number): number {
  const E = P.elterngeld;
  if (egNetto < 1000) return Math.min(1, E.rate + Math.floor((1000 - egNetto) / 2) * 0.001);
  if (egNetto > 1200) return Math.max(E.rateMin, E.rate - Math.floor((egNetto - 1200) / 2) * 0.001);
  return E.rate;
}

export function elterngeld(i: EgInput): EgResult {
  const E = P.elterngeld;
  const n = elterngeldNetto(i.brutto, i.stkl ?? 1, i.kirche ?? false, i.kinderFb ?? 0);
  const rate = ersatzrate(n.netto);
  const ohne = Math.min(E.hoechst, Math.max(E.mindest, n.netto * rate));
  let basis = ohne; let plus = ohne / 2;
  if (i.nettoNachher && i.nettoNachher > 0) {
    // § 2 Abs. 3: Unterschied zwischen dem Einkommen vor der Geburt (höchstens 2.770 €) und danach;
    // Elterngeld Plus höchstens die Hälfte des Basiselterngeldes ohne Einkommen nach der Geburt (§ 4a Abs. 2).
    const diff = Math.max(0, (Math.min(n.netto, E.kappungTeilzeit) - i.nettoNachher) * rate);
    basis = Math.min(E.hoechst, Math.max(E.mindest, diff));
    plus = Math.min(ohne / 2, Math.max(E.mindest / 2, diff));
  }
  const mindest = basis <= E.mindest; const hoechst = basis >= E.hoechst;
  if (i.geschwister) { basis += Math.max(E.geschwisterMin, basis * E.geschwister); plus += Math.max(E.geschwisterMin / 2, plus * E.geschwister); }
  if (i.mehrlinge && i.mehrlinge > 1) { basis += (i.mehrlinge - 1) * E.mehrling; plus += (i.mehrlinge - 1) * E.mehrling / 2; }
  return { egNetto: n.netto, steuern: n.steuern, sozial: n.sozial, rate, basis: r2(basis), plus: r2(plus), mindest, hoechst };
}
