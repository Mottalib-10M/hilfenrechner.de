/**
 * Wohngeld (Mietzuschuss) nach dem Wohngeldgesetz, Werte seit 1. Januar 2025 (BGBl. 2024 I Nr. 314).
 * Formel § 19 Abs. 1: 1,15 · (M − (a + b·M + c·Y) · Y), Rechenschritte und Mindestwerte nach Anlage 3,
 * Rundung auf volle Euro. M = Bruttokaltmiete bis zum Höchstbetrag (Anlage 1) plus Klimakomponente
 * (§ 12 Abs. 7), dazu der Gesamtbetrag zur Entlastung bei den Heizkosten (§ 12 Abs. 6); die tatsächlichen
 * Heizkosten zählen nicht. Y = monatliches Gesamteinkommen: Jahreseinkommen (§ 14) je Person, je 10 % ab
 * für Steuern, Kranken-/Pflege- und Rentenversicherung (§ 16), Freibeträge (§ 17), geteilt durch 12.
 */
import { P } from './params';

export interface WgPerson { brutto: number; /** Steuern, KV/PV, RV werden gezahlt (Zahl der 10-%-Abzüge, 0 bis 3). */ abzuege?: number; sonstiges?: number }
export interface WgInput { personen: number; mietstufe: number; miete: number; einkommen: WgPerson[]; alleinerziehend?: boolean; kinderErwerb?: number[]; /** Elterngeld im Monat. */ elterngeld?: number; /** Unterhalt und Unterhaltsvorschuss für Kinder im Monat. */ unterhaltKinder?: number }
export interface WgResult { wohngeld: number; M: number; Y: number; hoechst: number; heiz: number; klima: number; mieteBerueck: number; jahresEink: number; gekappt: boolean }

const W = () => P.wohngeld;
const idx = (n: number) => Math.min(n, 12) - 1;
export function hoechstbetrag(n: number, stufe: number): number {
  const t = W().hoechstbetrag as number[][]; const s = Math.min(Math.max(stufe, 1), 7) - 1;
  if (n <= 5) return t[n - 1][s];
  return t[4][s] + (n - 5) * (W().hoechstbetragMehr as number[])[s];
}
const mitMehr = (tab: number[], mehr: number, n: number) => (n <= tab.length ? tab[n - 1] : tab[tab.length - 1] + (n - tab.length) * mehr);
export const heizEntlastung = (n: number) => mitMehr(W().heizkosten as number[], W().heizkostenMehr, n);
export const klimaKomponente = (n: number) => mitMehr(W().klima as number[], W().klimaMehr, n);

/** Jahreseinkommen einer Person nach § 14 und § 16 WoGG (Arbeitnehmer: Brutto minus Arbeitnehmer-Pauschbetrag). */
export function jahreseinkommen(p: WgPerson): number {
  const jahr = Math.max(0, p.brutto * 12 - (p.brutto > 0 ? Math.min(p.brutto * 12, W().werbungskosten) : 0)) + (p.sonstiges ?? 0) * 12;
  const k = p.abzuege ?? (p.brutto > W().geringfuegig ? 3 : p.brutto > 0 ? 1 : 0);
  return jahr * (1 - 0.1 * k);
}

export function wohngeld(i: WgInput): WgResult {
  const n = Math.max(1, Math.min(i.personen, 12));
  const hoechst = hoechstbetrag(i.personen, i.mietstufe);
  const klima = klimaKomponente(i.personen), heiz = heizEntlastung(i.personen);
  const mieteBerueck = Math.min(i.miete, hoechst + klima);
  let jahresEink = i.einkommen.reduce((s, p) => s + jahreseinkommen(p), 0);
  // Elterngeld zählt über dem Freibetrag von 300 € (§ 10 Abs. 1 BEEG); Unterhalt für die Kinder zählt (§ 14 Abs. 2).
  if (i.elterngeld) jahresEink += Math.max(0, i.elterngeld - P.elterngeld.freibetragSgb2) * 12;
  if (i.unterhaltKinder) jahresEink += i.unterhaltKinder * 12;
  if (i.alleinerziehend) jahresEink -= W().freibetragAlleinerziehend;
  for (const e of i.kinderErwerb ?? []) jahresEink -= Math.min(e * 12, W().freibetragKindErwerb);
  jahresEink = Math.max(0, jahresEink);
  const A2 = W().formel as { a: number[]; b: number[]; c: number[] }; const A3 = W().mindest as { M: number[]; Y: number[] };
  let M = mieteBerueck + heiz; let Y = jahresEink / 12;
  M = Math.max(M, A3.M[idx(n)]); Y = Math.max(Y, A3.Y[idx(n)]);
  const r10 = (x: number) => Math.round(x * 1e10) / 1e10;
  const z1 = r10(A2.a[idx(n)] + A2.b[idx(n)] * M + A2.c[idx(n)] * Y), z2 = r10(z1 * Y), z3 = r10(M - z2), z4 = r10(1.15 * z3);
  let wg = Math.round(z4 + 1e-9);
  if (i.personen > 12) wg = Math.min(wg + (i.personen - 12) * 65, M);
  // § 21 Nr. 1 WoGG: unter 10 € im Monat wird kein Wohngeld geleistet.
  if (wg < W().minimum) wg = 0;
  return { wohngeld: Math.max(0, wg), M, Y, hoechst, heiz, klima, mieteBerueck, jahresEink, gekappt: i.miete > hoechst + klima };
}
