/**
 * Kinderzuschlag nach § 6a BKGG (Fassung ab 1. Juli 2026).
 * Höchstbetrag je Kind (Abs. 2), minus 45 % des Einkommens des Kindes ohne Kindergeld (Abs. 3), Gesamtkinderzuschlag
 * minus 45 % des Erwerbseinkommens der Eltern über ihrem Gesamtbedarf und minus anderes Einkommen in voller Höhe
 * (Abs. 5 und 6). Gesamtbedarf der Eltern: Regelbedarfe, Mehrbedarf und ihr Anteil an Miete und Heizung nach dem
 * Verhältnis aus dem 12. Existenzminimumbericht (Abs. 5 Satz 4). Mindesteinkommen 900 € (Paare) oder 600 €
 * (Alleinerziehende) brutto (Abs. 1 Nr. 2). Anspruch nur, wenn mit Kinderzuschlag und Wohngeld keine Hilfebedürftigkeit
 * bleibt, oder höchstens 100 € fehlen bei Erwerbseinkommen (Abs. 1a); diese Prüfung macht vergleich.ts.
 */
import { P } from './params';
import { erwerbsfreibetrag, rbsErwachsene, mehrbedarfAlleinerziehend } from './grundsicherung';
import { netto } from './netto';

export interface KizInput { erwachsene: Array<{ brutto: number; netto?: number }>; kinder: Array<{ alter: number; unterhalt?: number }>; miete: number; heizung: number; elterngeld?: number; sonstiges?: number }
export interface KizResult { gesamt: number; jeKind: number[]; elternBedarf: number; elternEinkommen: number; erwerbAnrechenbar: number; mindestOk: boolean; wohnanteil: number; kuerzung: number }

/** Anteil der Eltern an Miete und Heizung (Verhältnis nach dem 12. Existenzminimumbericht). */
export function wohnanteilEltern(paar: boolean, kinder: number): number {
  // Tabelle der Familienkasse (Merkblatt KiZ 2, Stand Juli 2026) für 1 bis 5 Kinder; darüber der Wert für 5.
  const t = (paar ? P.kiz.wohnanteil.paar : P.kiz.wohnanteil.allein) as number[];
  return t[Math.min(Math.max(kinder, 1), t.length) - 1] / 100;
}

/** Gesamtkinderzuschlag aus den anrechenbaren Größen (Abs. 5 und 6), gerundet auf volle Euro wie in den Beispielen der Familienkasse. */
export function kizAusEinkommen(jeKind: number[], elternBedarf: number, erwerb: number, anderes: number): { gesamt: number; kuerzung: number } {
  const ein = erwerb + anderes; let kuerzung = 0;
  if (ein > elternBedarf) {
    // Die Überschreitung gilt als durch Erwerbseinkommen verursacht, es sei denn, das andere Einkommen allein übersteigt den Bedarf.
    kuerzung = anderes >= elternBedarf ? (anderes - elternBedarf) + P.kiz.anrechnungEltern * erwerb : P.kiz.anrechnungEltern * (ein - elternBedarf);
  }
  const summe = jeKind.reduce((a, b) => a + b, 0);
  return { gesamt: Math.max(0, Math.round(summe - kuerzung)), kuerzung };
}

export function kinderzuschlag(i: KizInput): KizResult {
  const K = P.kiz; const paar = i.erwachsene.length > 1; const nK = i.kinder.filter((k) => k.alter < 25).length;
  const bruttoSumme = i.erwachsene.reduce((s, e) => s + e.brutto, 0);
  const mindestOk = bruttoSumme + (i.elterngeld ?? 0) + (i.sonstiges ?? 0) >= (paar ? K.mindestPaar : K.mindestAllein);
  const jeKind = i.kinder.map((k) => (k.alter < 25 ? Math.max(0, K.hoechst - K.anrechnungKind * (k.unterhalt ?? 0)) : 0));
  const anteil = nK ? wohnanteilEltern(paar, nK) : 1;
  const kdu = Math.max(0, i.miete) + Math.max(0, i.heizung);
  const mb = !paar ? mehrbedarfAlleinerziehend(i.kinder.map((k) => k.alter)) : 0;
  const elternBedarf = rbsErwachsene(paar ? 2 : 1).reduce((a, b) => a + b, 0) + mb + kdu * anteil;
  let erwerb = 0;
  for (const e of i.erwachsene) {
    if (e.brutto <= 0) continue;
    const nt = e.netto && e.netto > 0 ? e.netto : netto({ brutto: e.brutto, kinder: nK }).netto;
    erwerb += nt - Math.min(nt, erwerbsfreibetrag(e.brutto, nK > 0));
  }
  const eg = i.elterngeld ? i.elterngeld - (i.elterngeld > P.elterngeld.mindest ? Math.min(i.elterngeld, P.elterngeld.freibetragSgb2) : 0) : 0;
  const anderes = eg + (i.sonstiges ?? 0);
  const elternEinkommen = erwerb + anderes;
  const k = kizAusEinkommen(jeKind, elternBedarf, erwerb, anderes);
  const gesamt = mindestOk ? k.gesamt : 0; const kuerzung = k.kuerzung;
  return { gesamt, jeKind, elternBedarf, elternEinkommen, erwerbAnrechenbar: erwerb, mindestOk, wohnanteil: anteil, kuerzung };
}
