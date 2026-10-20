/**
 * Vergleich für einen Haushalt: alle Leistungen auf einmal und die Kombination, die nach dem Gesetz gilt.
 * - Kindergeld (§ 66 EStG) und Unterhaltsvorschuss (UVG) stehen neben allem anderen.
 * - Wohngeld und Kinderzuschlag gehen dem Grundsicherungsgeld vor, wenn sie die Hilfebedürftigkeit des ganzen
 *   Haushalts beseitigen (§ 12a SGB II, § 6a Abs. 1 Nr. 3 BKGG, § 7 Abs. 1 WoGG). Fehlen dann höchstens 100 €
 *   und hat der Haushalt Erwerbseinkommen mit mindestens 100 € Freibetrag, besteht der Kinderzuschlag trotzdem
 *   (§ 6a Abs. 1a BKGG): der Haushalt kann wählen.
 * - Sonst: Grundsicherungsgeld vom Jobcenter (Wohngeld und Kinderzuschlag entfallen).
 * Die Ämter entscheiden; der Vergleich ersetzt keinen Bescheid.
 */
import { P } from './params';
import { netto, type Stkl } from './netto';
import { grundsicherung, erwerbsfreibetrag, type GsgResult } from './grundsicherung';
import { wohngeld, type WgResult } from './wohngeld';
import { kinderzuschlag, type KizResult } from './kiz';
import { unterhaltsvorschuss } from './uvg';

export interface HaushaltInput {
  paar: boolean;
  /** Monatsbrutto je Erwachsenem (eine oder zwei Zahlen). */
  brutto: number[];
  kinder: number[];
  /** Unterhalt vom anderen Elternteil für alle Kinder zusammen (nur Alleinerziehende). */
  unterhalt: number;
  /** Bruttokaltmiete (Kaltmiete plus kalte Nebenkosten) im Monat. */
  miete: number;
  heizung: number;
  mietstufe: number;
  elterngeld: number;
  sonstiges: number;
}
export type OptionId = 'gsg' | 'vorrang' | 'nur-kg';
export interface Leistung { name: string; betrag: number; stelle: string }
export interface Option { id: OptionId; titel: string; leistungen: Leistung[]; leistungenSumme: number; verfuegbar: number; zulaessig: boolean; hinweis: string }
export interface VergleichResult {
  netto: number[]; nettoSumme: number; kindergeld: number; uvg: number[]; uvgSumme: number; unterhalt: number;
  gsg: GsgResult; wg: WgResult; kiz: KizResult; gsgRest: GsgResult; optionen: Option[]; empfehlung: OptionId; begruendung: string; luecke: number; wahlrecht: boolean;
}

export const STELLE = { gsg: 'Jobcenter', wg: 'Wohngeldstelle der Stadt oder Gemeinde', kiz: 'Familienkasse', kg: 'Familienkasse', uvg: 'Unterhaltsvorschussstelle des Jugendamts', eg: 'Elterngeldstelle des Landes' } as const;
const r2 = (x: number) => Math.round(x * 100) / 100;
const minder = (a: number) => a < 18;
/** Steuerklassen, mit denen das Netto geschätzt wird: Paar mit einem Verdienst III, mit zwei IV/IV; Alleinerziehende II; sonst I. */
export const stklFuer = (paar: boolean, kinder: number[], brutto: number[]): Stkl[] => (paar ? (brutto.filter((b) => b > 0).length > 1 ? [4, 4] : brutto.map((b) => (b > 0 ? 3 : 5) as Stkl)) : [kinder.some(minder) ? 2 : 1]);

export function vergleich(h: HaushaltInput): VergleichResult {
  const nE = h.paar ? 2 : 1; const brutto = Array.from({ length: nE }, (_, i) => Math.max(0, h.brutto[i] ?? 0));
  const kinder = h.kinder.filter((a) => a >= 0 && a < 25); const nK = kinder.length;
  const allein = !h.paar && kinder.some(minder);
  const stkl = stklFuer(h.paar, kinder, brutto);
  const net = brutto.map((b, i) => netto({ brutto: b, stkl: stkl[i], kinder: kinder.filter(minder).length }).netto);
  const nettoSumme = r2(net.reduce((a, b) => a + b, 0));
  const kindergeld = P.kindergeld.betrag * nK;
  const unterhalt = allein ? Math.max(0, h.unterhalt) : 0;
  const unterhaltJe = nK ? unterhalt / nK : 0;
  const erwachsene = brutto.map((b, i) => ({ brutto: b, netto: net[i] }));

  // Unterhaltsvorschuss zuerst ohne Rücksicht auf das Grundsicherungsgeld, dann die Regel für 12- bis 17-Jährige.
  const gsgVorab = grundsicherung({ erwachsene, kinder: kinder.map((a) => ({ alter: a, unterhalt: unterhaltJe })), miete: h.miete, heizung: h.heizung, elterngeld: h.elterngeld, sonstiges: h.sonstiges });
  const uvg = kinder.map((a) => (allein ? unterhaltsvorschuss({ alter: a, unterhalt: unterhaltJe, bruttoElternteil: brutto[0], gsgOhneUvg: gsgVorab.anspruch > 0 }).betrag : 0));
  const uvgSumme = uvg.reduce((a, b) => a + b, 0);
  const kindHaushalt = kinder.map((a, i) => ({ alter: a, unterhalt: unterhaltJe + uvg[i] }));
  const basis = { erwachsene, kinder: kindHaushalt, miete: h.miete, heizung: h.heizung, elterngeld: h.elterngeld, sonstiges: h.sonstiges };

  const gsg = grundsicherung(basis);
  const wgPersonen = [...brutto.map((b) => ({ brutto: b })), ...(h.sonstiges > 0 ? [{ brutto: 0, sonstiges: h.sonstiges }] : [])];
  const wg = wohngeld({ personen: nE + nK, mietstufe: h.mietstufe, miete: h.miete, einkommen: wgPersonen, alleinerziehend: allein, elterngeld: h.elterngeld, unterhaltKinder: unterhalt + uvgSumme });
  const kiz = nK ? kinderzuschlag({ erwachsene, kinder: kindHaushalt, miete: h.miete, heizung: h.heizung, elterngeld: h.elterngeld, sonstiges: h.sonstiges }) : ({ gesamt: 0, jeKind: [], elternBedarf: 0, elternEinkommen: 0, erwerbAnrechenbar: 0, mindestOk: false, wohnanteil: 1, kuerzung: 0 } as KizResult);
  const kizSumme = kiz.jeKind.reduce((a, b) => a + b, 0);
  const kizJe = kiz.gesamt && kizSumme ? kiz.jeKind.map((x) => (x / kizSumme) * kiz.gesamt) : [];
  const gsgRest = grundsicherung(basis, { wohngeld: wg.wohngeld, kiz: kizJe });
  const luecke = gsgRest.anspruch;
  const absetz = brutto.reduce((s, b) => s + erwerbsfreibetrag(b, nK > 0), 0);
  const wahlrecht = luecke > 0 && kiz.gesamt > 0 && luecke <= P.kiz.luecke && absetz >= P.kiz.luecke;
  const vorrangReicht = luecke <= 0.005 && (wg.wohngeld > 0 || kiz.gesamt > 0);

  const basisGeld = nettoSumme + kindergeld + unterhalt + uvgSumme + h.elterngeld + h.sonstiges;
  const kgL: Leistung[] = [];
  if (kindergeld) kgL.push({ name: 'Kindergeld', betrag: kindergeld, stelle: STELLE.kg });
  if (uvgSumme) kgL.push({ name: 'Unterhaltsvorschuss', betrag: uvgSumme, stelle: STELLE.uvg });
  const sum = (l: Leistung[]) => r2(l.reduce((s, x) => s + x.betrag, 0));

  const lGsg = [...kgL, ...(gsg.anspruch > 0 ? [{ name: gsg.sofortzuschlag ? 'Grundsicherungsgeld mit Sofortzuschlag' : 'Grundsicherungsgeld', betrag: gsg.zahlbetrag, stelle: STELLE.gsg }] : [])];
  const lVor = [...kgL, ...(wg.wohngeld > 0 ? [{ name: 'Wohngeld', betrag: wg.wohngeld, stelle: STELLE.wg }] : []), ...(kiz.gesamt > 0 && (vorrangReicht || wahlrecht) ? [{ name: 'Kinderzuschlag', betrag: kiz.gesamt, stelle: STELLE.kiz }] : [])];
  const optionen: Option[] = [
    { id: 'gsg', titel: 'Grundsicherungsgeld', leistungen: lGsg, leistungenSumme: sum(lGsg), verfuegbar: r2(basisGeld + gsg.zahlbetrag), zulaessig: gsg.anspruch > 0 && !vorrangReicht,
      hinweis: vorrangReicht ? 'Nicht möglich: Wohngeld und Kinderzuschlag decken den Bedarf, sie gehen vor (§ 12a SGB II).' : gsg.anspruch > 0 ? 'Vom Jobcenter; Wohngeld und Kinderzuschlag entfallen dann.' : 'Kein Anspruch: Ihr Einkommen deckt den Bedarf nach dem SGB II.' },
    { id: 'vorrang', titel: nK ? 'Wohngeld und Kinderzuschlag' : 'Wohngeld', leistungen: lVor, leistungenSumme: sum(lVor), verfuegbar: r2(basisGeld + sum(lVor) - kindergeld - uvgSumme), zulaessig: (vorrangReicht || wahlrecht) && sum(lVor) - kindergeld - uvgSumme > 0,
      hinweis: vorrangReicht ? 'Deckt den Bedarf des ganzen Haushalts: diese Leistungen gehen dem Grundsicherungsgeld vor.' : wahlrecht ? `Es fehlen ${Math.round(luecke)} € zum Bedarf; bei Erwerbseinkommen besteht der Kinderzuschlag trotzdem (§ 6a Abs. 1a BKGG).` : wg.wohngeld > 0 || kiz.gesamt > 0 ? `Reicht nicht: es fehlen ${Math.round(luecke)} € zum Bedarf, also Grundsicherungsgeld.` : 'Kein Anspruch nach den Angaben.' },
  ];
  const ohneGsg = !optionen[0].zulaessig && !optionen[1].zulaessig;
  if (ohneGsg) optionen.push({ id: 'nur-kg', titel: kgL.length ? 'Kindergeld und Unterhaltsvorschuss' : 'Keine Leistung', leistungen: kgL, leistungenSumme: sum(kgL), verfuegbar: r2(basisGeld), zulaessig: true, hinweis: 'Ihr Einkommen liegt über den Grenzen der bedarfsabhängigen Leistungen.' });

  let empfehlung: OptionId; let begruendung: string;
  if (vorrangReicht && gsg.anspruch <= 0) { empfehlung = 'vorrang'; begruendung = 'Ihr Einkommen deckt schon den Bedarf nach dem SGB II, also kein Grundsicherungsgeld. ' + (kiz.gesamt > 0 ? 'Wohngeld und Kinderzuschlag kommen' : 'Wohngeld kommt') + ' trotzdem dazu, weil die Grenzen dort höher liegen.'; }
  else if (vorrangReicht) { empfehlung = 'vorrang'; begruendung = 'Wohngeld' + (kiz.gesamt > 0 ? ' und Kinderzuschlag decken' : ' deckt') + ' Ihren Bedarf. Diese Leistungen haben Vorrang: das Jobcenter würde Sie an Wohngeldstelle und Familienkasse verweisen.'; }
  else if (wahlrecht) {
    const besser = optionen[0].verfuegbar > optionen[1].verfuegbar ? 'gsg' : 'vorrang';
    empfehlung = besser; begruendung = `Sie können wählen. Grundsicherungsgeld bringt ${Math.round(Math.abs(optionen[0].verfuegbar - optionen[1].verfuegbar))} € ${besser === 'gsg' ? 'mehr' : 'weniger'} im Monat, verlangt aber Termine beim Jobcenter und die Prüfung von Wohnung und Vermögen; Wohngeld und Kinderzuschlag laufen ohne diese Pflichten.`;
  } else if (gsg.anspruch > 0) { empfehlung = 'gsg'; begruendung = 'Wohngeld und Kinderzuschlag reichen nicht, um Ihren Bedarf zu decken. Zuständig ist das Jobcenter; es zahlt auch die angemessenen Kosten der Unterkunft.'; }
  else { empfehlung = 'nur-kg'; begruendung = 'Nach Ihren Angaben besteht kein Anspruch auf Grundsicherungsgeld, Wohngeld oder Kinderzuschlag. Kindergeld' + (uvgSumme ? ' und Unterhaltsvorschuss stehen' : ' steht') + ' Ihnen unabhängig davon zu.'; if (!kgL.length) begruendung = 'Nach Ihren Angaben besteht kein Anspruch auf Grundsicherungsgeld oder Wohngeld.'; }
  return { netto: net, nettoSumme, kindergeld, uvg, uvgSumme, unterhalt, gsg, wg, kiz, gsgRest, optionen, empfehlung, begruendung, luecke, wahlrecht };
}
