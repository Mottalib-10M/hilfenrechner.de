/**
 * Unterhaltsvorschuss nach dem Unterhaltsvorschussgesetz (UVG), Beträge seit 1. Januar 2026: Mindestunterhalt
 * der Altersstufe (Mindestunterhaltsverordnung, BGBl. 2024 I Nr. 359) minus das volle Kindergeld für ein erstes
 * Kind (§ 2 Abs. 1 und 2). Zahlungen des anderen Elternteils mindern den Vorschuss (§ 2 Abs. 3).
 * Kinder von 12 bis 17 Jahren (§ 1 Abs. 1a): nur wenn das Kind kein Grundsicherungsgeld bezieht oder der
 * alleinerziehende Elternteil mindestens 600 € brutto im Monat verdient.
 */
import { P } from './params';

export const uvgStufe = (alter: number): number => (alter < 6 ? 0 : alter < 12 ? 1 : 2);
export const uvgBetrag = (alter: number): number => (alter >= 18 ? 0 : (P.uvg.betraege as number[])[uvgStufe(alter)]);

export interface UvgInput { alter: number; unterhalt?: number; bruttoElternteil?: number; gsgOhneUvg?: boolean }
export interface UvgResult { betrag: number; voll: number; grund: string }

export function unterhaltsvorschuss(i: UvgInput): UvgResult {
  const voll = uvgBetrag(i.alter);
  if (!voll) return { betrag: 0, voll: 0, grund: 'Ab dem 18. Geburtstag gibt es keinen Unterhaltsvorschuss mehr.' };
  const betrag = Math.max(0, voll - Math.max(0, i.unterhalt ?? 0));
  if (i.alter >= 12 && i.gsgOhneUvg && (i.bruttoElternteil ?? 0) < P.uvg.mindesteinkommen12)
    return { betrag: 0, voll, grund: `Ab 12 Jahren nur, wenn das Kind kein Grundsicherungsgeld bezieht oder der Elternteil mindestens ${P.uvg.mindesteinkommen12} € brutto verdient.` };
  return { betrag, voll, grund: betrag < voll ? 'Der gezahlte Unterhalt wird abgezogen.' : '' };
}
