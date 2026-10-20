/**
 * Grundsicherungsgeld nach dem SGB II in der Fassung ab 1. Juli 2026 (BGBl. 2026 I Nr. 107), für eine
 * Bedarfsgemeinschaft aus einer oder zwei erwachsenen Personen und ihren Kindern.
 * Bedarf: Regelbedarfe (§ 20, § 23), Mehrbedarf für Alleinerziehende (§ 21 Abs. 3), Unterkunft und Heizung
 * nach Köpfen (§ 22). Einkommen: Netto aus Arbeit abzüglich der Freibeträge (§ 11b), Kindergeld und Unterhalt
 * als Einkommen des Kindes bis zu seinem Bedarf (§ 11 Abs. 1 Satz 4 und 5), ein Überschuss aus Kindergeld
 * beim Elternteil, Elterngeld mit Freibetrag (§ 10 Abs. 5 BEEG), Wohngeld und Kinderzuschlag, wenn bezogen.
 * Dazu der Sofortzuschlag von 25 € je Kind (§ 72), der außerhalb der Bedarfsrechnung gezahlt wird.
 * Vereinfachungen (auf /de/methodik/ genannt): Kosten der Unterkunft werden in tatsächlicher Höhe angesetzt,
 * weil die Angemessenheitsgrenze jeder Kommune anders ist; Vermögen wird nicht geprüft.
 */
import { P } from './params';
import { netto } from './netto';
import { formatMoney } from '../format';

export interface Kind { alter: number; unterhalt?: number }
export interface Erwachsener { brutto: number; netto?: number; alter?: number }
export interface Haushalt {
  erwachsene: Erwachsener[];
  kinder: Kind[];
  /** Bruttokaltmiete (Kaltmiete + kalte Nebenkosten) im Monat. */
  miete: number;
  heizung: number;
  /** Elterngeld im Monat (Summe beider Eltern). */
  elterngeld?: number;
  /** Sonstiges Einkommen (Rente, Arbeitslosengeld, Krankengeld) netto im Monat. */
  sonstiges?: number;
}
export interface Zeile { label: string; betrag: number }
export interface GsgResult {
  bedarf: Zeile[]; bedarfSumme: number;
  einkommen: Zeile[]; einkommenSumme: number;
  freibetraege: number;
  anspruch: number;
  /** Sofortzuschlag für Kinder (§ 72 SGB II), nur wenn ein Anspruch besteht; nicht Teil der Bedarfsrechnung. */
  sofortzuschlag: number;
  /** Auszahlung: Anspruch plus Sofortzuschlag. */
  zahlbetrag: number;
  /** Bedarf und Einkommen je Kopf (für die Vorrangprüfung und die Kinder). */
  kinderBedarf: number[];
  mehrbedarfAE: number;
}

export const rbsKind = (alter: number): number => {
  const R = P.regelbedarf;
  if (alter < 6) return R.rbs6; if (alter < 14) return R.rbs5; if (alter < 18) return R.rbs4; return R.rbs3;
};
/** Regelbedarf der Erwachsenen: allein (RBS 1) oder je Partner (RBS 2). */
export const rbsErwachsene = (n: number): number[] => (n === 1 ? [P.regelbedarf.rbs1] : [P.regelbedarf.rbs2, P.regelbedarf.rbs2]);

/** Mehrbedarf für Alleinerziehende (§ 21 Abs. 3 SGB II) in Euro. */
export function mehrbedarfAlleinerziehend(kinderAlter: number[]): number {
  const M = P.gsg.mehrbedarfAE; const minder = kinderAlter.filter((a) => a < 18);
  if (!minder.length) return 0;
  const unter7 = minder.filter((a) => a < 7).length, unter16 = minder.filter((a) => a < 16).length;
  // Nr. 1: mit einem Kind unter sieben Jahren oder mit zwei oder drei Kindern unter sechzehn Jahren 36 %;
  // Nr. 2: 12 % je Kind, wenn das mehr ergibt; höchstens 60 % (Abs. 3 und Abs. 8).
  const nr1 = unter7 >= 1 || (unter16 >= 2 && unter16 <= 3);
  const proz = Math.min(M.max, Math.max(nr1 ? M.hoch : 0, M.jeKind * minder.length));
  return Math.round(P.regelbedarf.rbs1 * proz * 100) / 100;
}

/** Freibetrag auf Erwerbseinkommen (§ 11b Abs. 2 und 3 SGB II), aus dem Monatsbrutto. */
export function erwerbsfreibetrag(brutto: number, mitKind: boolean): number {
  const F = P.gsg.freibetrag; if (brutto <= 0) return 0;
  let fb = Math.min(brutto, F.grund);
  for (const [von, bis, satz] of F.stufen as Array<[number, number | null, number]>) {
    const ob = bis == null ? (mitKind ? F.obenKind : F.obenOhne) : bis;
    if (brutto > von) fb += (Math.min(brutto, ob) - von) * satz;
  }
  return Math.round(fb * 100) / 100;
}

export function grundsicherung(h: Haushalt, opts: { wohngeld?: number; kiz?: number[] } = {}): GsgResult {
  const R = P.regelbedarf; const nE = h.erwachsene.length; const nK = h.kinder.length; const n = nE + nK;
  const allein = nE === 1 && nK > 0;
  const kdu = Math.max(0, h.miete) + Math.max(0, h.heizung);
  const kopf = n ? kdu / n : 0;
  const bedarf: Zeile[] = [];
  rbsErwachsene(nE).forEach((b, i) => bedarf.push({ label: nE === 1 ? 'Regelbedarf alleinstehend (Stufe 1)' : `Regelbedarf Partner ${i + 1} (Stufe 2)`, betrag: b }));
  h.kinder.forEach((k, i) => bedarf.push({ label: `Regelbedarf Kind ${i + 1}, ${k.alter} Jahre`, betrag: rbsKind(k.alter) }));
  const mb = allein ? mehrbedarfAlleinerziehend(h.kinder.map((k) => k.alter)) : 0;
  if (mb) bedarf.push({ label: 'Mehrbedarf für Alleinerziehende', betrag: mb });
  if (kdu) bedarf.push({ label: 'Miete und Heizung', betrag: kdu });
  const bedarfSumme = bedarf.reduce((s, z) => s + z.betrag, 0);

  // Einkommen der Kinder: Kindergeld, Unterhalt oder Unterhaltsvorschuss, Kinderzuschlag; nur bis zum eigenen Bedarf.
  const kg = P.kindergeld.betrag;
  const kinderBedarf = h.kinder.map((k) => rbsKind(k.alter) + kopf);
  let ueberschussKg = 0; let kinderEink = 0;
  h.kinder.forEach((k, i) => {
    const other = (k.unterhalt ?? 0) + (opts.kiz?.[i] ?? 0);
    const anrechenbar = Math.min(kinderBedarf[i], other + kg);
    kinderEink += anrechenbar;
    const kgGenutzt = Math.max(0, Math.min(kg, kinderBedarf[i] - Math.min(other, kinderBedarf[i])));
    ueberschussKg += kg - kgGenutzt;
  });

  const einkommen: Zeile[] = [];
  let freibetraege = 0; let erwEink = 0;
  h.erwachsene.forEach((e, i) => {
    if (e.brutto <= 0) return;
    const nt = e.netto && e.netto > 0 ? e.netto : netto({ brutto: e.brutto, kinder: nK }).netto;
    const fb = Math.min(nt, erwerbsfreibetrag(e.brutto, nK > 0));
    freibetraege += fb; erwEink += nt - fb;
    einkommen.push({ label: `Netto aus Arbeit${nE > 1 ? `, Person ${i + 1}` : ''} (${fmt(nt)} abzüglich Freibetrag ${fmt(fb)})`, betrag: nt - fb });
  });
  if (kinderEink) einkommen.push({ label: 'Kindergeld, Unterhalt und Kinderzuschlag, soweit die Kinder sie brauchen', betrag: kinderEink });
  let sonstigeErw = 0;
  if (ueberschussKg > 0) sonstigeErw += ueberschussKg;
  // § 10 Abs. 5 BEEG: frei bleibt das Elterngeld bis zum Einkommen vor der Geburt, höchstens 300 €; beim
  // Mindestbetrag ohne Einkommen vor der Geburt nichts. Vereinfachung: mehr als der Mindestbetrag = Einkommen vor der Geburt.
  if (h.elterngeld) sonstigeErw += h.elterngeld - (h.elterngeld > P.elterngeld.mindest ? Math.min(h.elterngeld, P.elterngeld.freibetragSgb2) : 0);
  if (h.sonstiges) sonstigeErw += h.sonstiges;
  if (sonstigeErw > 0) einkommen.push({ label: 'Sonstiges Einkommen der Eltern (Kindergeld-Überschuss, Elterngeld über dem Freibetrag, Renten)', betrag: sonstigeErw });
  if (opts.wohngeld) einkommen.push({ label: 'Wohngeld', betrag: opts.wohngeld });
  const einkommenSumme = einkommen.reduce((s, z) => s + z.betrag, 0);
  const anspruch = Math.max(0, Math.round((bedarfSumme - einkommenSumme) * 100) / 100);
  // § 72 SGB II: 25 € je Kind mit Regelbedarfsstufe 3 bis 6, wenn Grundsicherungsgeld bezogen wird.
  const sofortzuschlag = anspruch > 0 ? nK * P.gsg.sofortzuschlag : 0;
  return { bedarf, bedarfSumme, einkommen, einkommenSumme, freibetraege, anspruch, sofortzuschlag, zahlbetrag: Math.round((anspruch + sofortzuschlag) * 100) / 100, kinderBedarf, mehrbedarfAE: mb };
}
const fmt = (x: number) => formatMoney(Math.round(x), 0);
