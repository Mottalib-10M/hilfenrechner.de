/**
 * Lohnsteuer, Solidaritätszuschlag und Bemessungsgrundlage der Kirchensteuer nach dem Programmablaufplan
 * 2026 des Bundesfinanzministeriums (PAP 2026, Quelle `pap2026`). Umgesetzt sind die Methoden MPARA,
 * MRE4JL, MRE4ABZ, MBERECH, MZTABFB, MLSTJAHR, UPEVP, MVSPKVPV, MVSPHB, UPMLST, UPTAB26, MST5_6, UP5_6,
 * MSOLZ und UPANTEIL für laufenden Arbeitslohn ohne Versorgungsbezüge, ohne Altersentlastungsbetrag und
 * ohne Freibetrag auf der Lohnsteuerkarte. Geprüft gegen die Schnittstelle des BMF-Rechners
 * (tests/lohnsteuer.test.ts).
 */
export interface LstInput {
  /** 1 = Jahr, 2 = Monat. */
  lzz: 1 | 2;
  /** Steuerpflichtiger Arbeitslohn im Lohnzahlungszeitraum, in Euro. */
  re4: number;
  stkl: 1 | 2 | 3 | 4 | 5 | 6;
  /** Zahl der Kinderfreibeträge (0,5 je Kind und Elternteil, 1 bei Zusammenveranlagung). */
  zkf?: number;
  /** Kirchensteuerpflichtig. */
  church?: boolean;
  /** Durchschnittlicher oder kassenindividueller Zusatzbeitrag der Krankenkasse, in Prozent. */
  kvz?: number;
  /** Arbeitsort in Sachsen (höherer Arbeitnehmeranteil der Pflegeversicherung). */
  pvs?: boolean;
  /** Beitragszuschlag für Kinderlose in der sozialen Pflegeversicherung. */
  pvz?: boolean;
  /** Zahl der beim Abschlag zu berücksichtigenden Kinder (zweites bis fünftes Kind unter 25): 0 bis 4. */
  pva?: number;
  /** Privat kranken- und pflegeversichert. */
  pkv?: boolean;
  /** Monatlicher Basisbeitrag zur privaten Kranken- und Pflegeversicherung, in Euro. */
  pkpv?: number;
  /** Monatlicher Arbeitgeberzuschuss zur PKV (Beamte: 0), in Euro. */
  pkpvAgz?: number;
  /** Nicht rentenversicherungspflichtig (Beamte). */
  noRv?: boolean;
  /** Nicht arbeitslosenversicherungspflichtig (Beamte). */
  noAlv?: boolean;
}
export interface LstResult {
  /** Lohnsteuer im Lohnzahlungszeitraum, in Euro. */
  lst: number;
  soli: number;
  /** Bemessungsgrundlage der Kirchensteuer im Lohnzahlungszeitraum, in Euro (0 ohne Kirchensteuerpflicht). */
  bk: number;
  /** Zu versteuerndes Jahreseinkommen der Tabelle, in Euro. */
  zve: number;
  /** Vorsorgepauschale des Jahres, in Euro. */
  vsp: number;
}
const EPS = 1e-7;
const down = (x: number, d = 0) => { const k = 10 ** d; return Math.floor(x * k + EPS) / k; };
const up = (x: number, d = 0) => { const k = 10 ** d; return Math.ceil(x * k - EPS) / k; };

export const PAP = {
  BBGRVALV: 101400, AVSATZAN: 0.013, RVSATZAN: 0.093, BBGKVPV: 69750,
  W1STKL5: 14071, W2STKL5: 34939, W3STKL5: 222260, GFB: 12348, SOLZFREI: 20350,
  ANP: 1230, SAP: 36, EFA: 4260, KFB: 9756, KFB4: 4878, VSPHB_MAX: 1900,
} as const;

function uptab26(x: number, kztab: number): number {
  let st: number;
  if (x < PAP.GFB + 1) st = 0;
  else if (x < 17800) { const y = down((x - PAP.GFB) / 10000, 6); st = down((y * 914.51 + 1400) * y); }
  else if (x < 69879) { const y = down((x - 17799) / 10000, 6); st = down((y * 173.1 + 2397) * y + 1034.87); }
  else if (x < 277826) st = down(x * 0.42 - 11135.63);
  else st = down(x * 0.45 - 19470.38);
  return st * kztab;
}
function up5_6(zx: number): number {
  const st1 = uptab26(down(zx * 1.25), 1);
  const st2 = uptab26(down(zx * 0.75), 1);
  const diff = (st1 - st2) * 2;
  const mist = down(zx * 0.14);
  return mist > diff ? mist : diff;
}
function mst5_6(x: number): number {
  const zzx = x;
  if (zzx > PAP.W2STKL5) {
    let st = up5_6(PAP.W2STKL5);
    if (zzx > PAP.W3STKL5) { st = down(st + (PAP.W3STKL5 - PAP.W2STKL5) * 0.42); st = down(st + (zzx - PAP.W3STKL5) * 0.45); }
    else st = down(st + (zzx - PAP.W2STKL5) * 0.42);
    return st;
  }
  let st = up5_6(zzx);
  if (zzx > PAP.W1STKL5) {
    const vergl = st;
    const hoch = down(up5_6(PAP.W1STKL5) + (zzx - PAP.W1STKL5) * 0.42);
    st = hoch < vergl ? hoch : vergl;
  }
  return st;
}

type Base = Omit<LstInput, 'lzz' | 're4'>;
/** Jahressteuer der Tabelle für einen Jahresarbeitslohn `zre4j` (MZTABFB, MLSTJAHR). */
function jahr(inp: Base, zre4j: number) {
  const { stkl } = inp;
  const zkf = inp.zkf ?? 0, kvz = inp.kvz ?? 2.9, pva = inp.pva ?? 0;
  // MPARA
  const kvsatzan = kvz / 2 / 100 + 0.07;
  let pvsatzan = inp.pvs ? 0.023 : 0.018;
  pvsatzan = inp.pvz ? pvsatzan + 0.006 : pvsatzan - pva * 0.0025;
  // MRE4ABZ (ohne Versorgungsbezüge, Altersentlastung, Freibeträge)
  const zre4 = Math.max(0, down(zre4j, 2));
  const zre4vp = zre4j;
  const zvbez = 0;
  // MZTABFB
  let anp = 0;
  if (stkl < 6 && zre4 > zvbez) anp = zre4 - zvbez < PAP.ANP ? up(anp + zre4 - zvbez) : anp + PAP.ANP;
  let kztab = 1, sap = 0, kfb = 0, efa = 0;
  if (stkl === 1) { sap = PAP.SAP; kfb = down(zkf * PAP.KFB); }
  else if (stkl === 2) { efa = PAP.EFA; sap = PAP.SAP; kfb = down(zkf * PAP.KFB); }
  else if (stkl === 3) { kztab = 2; sap = PAP.SAP; kfb = down(zkf * PAP.KFB); }
  else if (stkl === 4) { sap = PAP.SAP; kfb = down(zkf * PAP.KFB4); }
  else if (stkl === 5) { sap = PAP.SAP; }
  const ztabfb = down(efa + anp + sap, 2);
  // UPEVP
  const vspr = inp.noRv ? 0 : down(Math.min(zre4vp, PAP.BBGRVALV) * PAP.RVSATZAN, 2);
  let vspkvpv: number;
  if (inp.pkv) {
    if (stkl === 6) vspkvpv = 0;
    else {
      const agz = down((Math.round((inp.pkpvAgz ?? 0) * 100) * 12) / 100, 2);
      vspkvpv = Math.max(0, down((Math.round((inp.pkpv ?? 0) * 100) * 12) / 100, 2) - agz);
    }
  } else vspkvpv = down(Math.min(zre4vp, PAP.BBGKVPV) * (kvsatzan + pvsatzan), 2);
  let vsp = up(vspkvpv + vspr);
  if (!inp.noAlv && stkl !== 6) {
    const vspalv = down(PAP.AVSATZAN * Math.min(zre4vp, PAP.BBGRVALV), 2);
    const vsphb = Math.min(down(vspalv + vspkvpv, 2), PAP.VSPHB_MAX);
    const vspn = up(vspr + vsphb);
    if (vspn > vsp) vsp = vspn;
  }
  // MLSTJAHR mit und ohne Kinderfreibeträge
  const tab = (zve: number) => { const x = zve < 1 ? 0 : down(zve / kztab); return stkl < 5 ? uptab26(x, kztab) : mst5_6(x); };
  const zve = Math.max(0, zre4 - ztabfb - vsp);
  const st = tab(zre4 - ztabfb - vsp);
  const stKfb = zkf > 0 ? tab(zre4 - ztabfb - kfb - vsp) : st;
  const stSolzS = zkf > 0 ? tab(zre4 - ztabfb - vsp - kfb) : st;
  return { st, stKfb, stSolzS, zve, vsp, kztab };
}
const solzJahr = (jbmg: number, kztab: number) => {
  const solzfrei = PAP.SOLZFREI * kztab;
  if (jbmg <= solzfrei) return 0;
  const solzj = down((jbmg * 5.5) / 100, 2);
  const solzmin = down(((jbmg - solzfrei) * 11.9) / 100, 2);
  return solzmin < solzj ? solzmin : solzj;
};

export function lohnsteuer(inp: LstInput): LstResult {
  const { lzz } = inp;
  const re4c = Math.round(inp.re4 * 100);
  const zre4j = lzz === 1 ? down(re4c / 100, 2) : down((re4c * 12) / 100, 2);
  const j = jahr(inp, zre4j);
  const anteil = (jw: number) => (lzz === 1 ? jw : Math.floor(jw / 12 + EPS));
  const lstjahr = down(j.st);
  const jbmg = down(j.stKfb);
  const solzlzz = anteil(down(solzJahr(jbmg, j.kztab) * 100));
  const bk = inp.church ? anteil(jbmg * 100) : 0;
  return { lst: anteil(lstjahr * 100) / 100, soli: solzlzz / 100, bk: bk / 100, zve: j.zve, vsp: j.vsp };
}

/**
 * Steuer auf einen sonstigen Bezug (zum Beispiel die Jahressonderzahlung) nach MSONST/MOSONST/MRE4SONST/
 * STSMIN/MSOLZSTS: Differenz der Jahreslohnsteuer mit und ohne den Bezug, Soli ohne Milderungszone.
 */
export function sonstigerBezug(inp: Base & { jahresLohn: number; bezug: number }): { lst: number; soli: number; bk: number } {
  if (inp.bezug <= 0) return { lst: 0, soli: 0, bk: 0 };
  const ohne = jahr(inp, down(inp.jahresLohn, 2));
  const mit = jahr(inp, down(inp.jahresLohn + inp.bezug, 2));
  const sts = Math.max(0, Math.floor(((mit.st - ohne.st) * 100) / 100 + EPS) * 100);
  const solzfrei = PAP.SOLZFREI * mit.kztab;
  const solzs = down(mit.stSolzS) > solzfrei ? Math.floor((sts * 5.5) / 100 + EPS) : 0;
  return { lst: sts / 100, soli: solzs / 100, bk: inp.church ? sts / 100 : 0 };
}
