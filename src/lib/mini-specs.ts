/**
 * Kleine Rechner der Seiten (RECETTE §9.3): ein bis vier Felder, die Zahl des Themas vorn, zwei bis vier
 * Zeilen Rechenweg. Alle Werte kommen aus der Parameterdatei und den Rechenkernen.
 */
import { P } from './engine/params';
import { rbsKind, mehrbedarfAlleinerziehend, erwerbsfreibetrag } from './engine/grundsicherung';
import { netto } from './engine/netto';
import { wohngeld } from './engine/wohngeld';
import { kinderzuschlag } from './engine/kiz';
import { elterngeld } from './engine/elterngeld';
import { unterhaltsvorschuss } from './engine/uvg';
import { mutterschaftsgeld } from './engine/mutterschaft';
import { formatMoney, formatPercent, displayDate } from './format';
import type { MiniSpec } from './mini-types';

const m = (n: number) => formatMoney(Math.round(n), 0);
const m2 = (n: number) => formatMoney(n, 2);
const STUFEN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'].map((s, i) => ({ value: String(i + 1), label: `Mietstufe ${s}` }));
const JA_NEIN = [{ value: '1', label: 'Ja' }, { value: '0', label: 'Nein' }];
const HAUSHALT = [{ value: '1', label: 'Alleinerziehend' }, { value: '2', label: 'Paar' }];
const schon = (alter: number) => alter <= 0 ? 0 : ((P.vermoegen.stufen as number[][]).find(([v, b]) => alter >= v && alter <= b)?.[2] ?? 0);

const SPECS: Record<string, MiniSpec> = {
  vermoegen: {
    title: 'Schonvermögen im Grundsicherungsgeld', cta: 'Gesamten Anspruch berechnen',
    inputs: [{ id: 'a', label: 'Ihr Alter', def: 38, unit: 'Jahre', max: 99 }, { id: 'p', label: 'Alter Partner (0 = keiner)', def: 0, unit: 'Jahre', max: 99 }, { id: 'k', label: 'Kinder im Haushalt', def: 1, max: 8 }],
    run: (v) => {
      const a = schon(Math.max(15, v.a)), p = schon(v.p), k = schon(15) * Math.max(0, Math.round(v.k));
      return { head: ['Geschützt für den Haushalt', m(a + p + k)], rows: [['Sie', m(a)], ...(v.p > 0 ? [['Partner', m(p)] as [string, string]] : []), ['Kinder', m(k)]], note: `Freibeträge nach Lebensalter, seit ${displayDate(P.reform.inkraft, 'de-DE')}; selbst genutztes Wohneigentum und Altersvorsorge kommen dazu.` };
    },
  },
  regelsatz: {
    title: 'Regelbedarf des Haushalts', cta: 'Mit Miete und Einkommen rechnen',
    inputs: [{ id: 'e', label: 'Erwachsene', def: 1, options: [{ value: '1', label: '1' }, { value: '2', label: '2' }] }, { id: 'k1', label: 'Kinder unter 6', def: 1, max: 6 }, { id: 'k2', label: 'Kinder 6 bis 13', def: 0, max: 6 }, { id: 'k3', label: 'Kinder 14 bis 17', def: 0, max: 6 }],
    run: (v) => {
      const R = P.regelbedarf; const er = v.e === 2 ? 2 * R.rbs2 : R.rbs1;
      const alter = [...Array(Math.round(v.k1)).fill(3), ...Array(Math.round(v.k2)).fill(9), ...Array(Math.round(v.k3)).fill(15)];
      const ki = alter.reduce((s, a) => s + rbsKind(a), 0);
      const mb = v.e === 1 ? mehrbedarfAlleinerziehend(alter) : 0;
      return { head: ['Regelbedarfe im Monat', m(er + ki + mb)], rows: [['Erwachsene', m(er)], ['Kinder', m(ki)], ...(mb ? [['Mehrbedarf Alleinerziehende', m2(mb)] as [string, string]] : [])], note: 'Ohne Miete und Heizung; die zahlt das Jobcenter zusätzlich.' };
    },
  },
  mehrbedarf: {
    title: 'Mehrbedarf für Alleinerziehende', cta: 'Gesamten Anspruch berechnen',
    inputs: [{ id: 'a', label: 'Kinder unter 7 Jahren', def: 1, max: 6 }, { id: 'b', label: 'Kinder von 7 bis 17', def: 0, max: 6 }],
    run: (v) => {
      const alter = [...Array(Math.round(v.a)).fill(3), ...Array(Math.round(v.b)).fill(10)];
      const mb = mehrbedarfAlleinerziehend(alter);
      return { head: ['Mehrbedarf im Monat', m2(mb)], rows: [['Anteil am Regelbedarf', formatPercent(mb / P.regelbedarf.rbs1, 0)], ['Regelbedarf Stufe 1', m(P.regelbedarf.rbs1)]] };
    },
  },
  hinzuverdienst: {
    title: 'Freibetrag beim Hinzuverdienst', cta: 'Mit Miete und Familie rechnen',
    inputs: [{ id: 'b', label: 'Bruttolohn im Monat', def: 603, unit: '€', max: 5000 }, { id: 'k', label: 'Minderjähriges Kind im Haushalt', def: 0, options: JA_NEIN }],
    run: (v) => {
      const n = netto({ brutto: v.b, kinder: v.k ? 1 : 0 }).netto; const fb = Math.min(n, erwerbsfreibetrag(v.b, v.k === 1));
      return { head: ['Bleibt Ihnen vom Lohn', m2(fb)], rows: [['Netto', m2(n)], ['Wird angerechnet', m2(n - fb)]], note: `Grundfreibetrag ${m(P.gsg.freibetrag.grund)}, dann ${(P.gsg.freibetrag.stufen as number[][]).map((x) => formatPercent(x[2], 0)).join(', ')} (§ 11b SGB II).` };
    },
  },
  sanktion: {
    title: 'Minderung bei Pflichtverletzung', cta: 'Anspruch berechnen',
    inputs: [{ id: 'h', label: 'Regelbedarf', def: 1, options: [{ value: '1', label: 'Alleinstehend' }, { value: '2', label: 'Partner' }, { value: '3', label: 'Erwachsenes Kind (18 bis 24)' }] }],
    run: (v) => {
      const rb = v.h === 2 ? P.regelbedarf.rbs2 : v.h === 3 ? P.regelbedarf.rbs3 : P.regelbedarf.rbs1;
      const mo = rb * P.minderung.satz;
      return { head: [`Weniger je Monat (${formatPercent(P.minderung.satz, 0)})`, m2(mo)], rows: [['Dauer', `${P.minderung.monate} Monate`], ['Zusammen', m2(mo * P.minderung.monate)]], note: 'Miete und Heizung werden bei Meldeversäumnis und Pflichtverletzung weiter gezahlt.' };
    },
  },
  karenz: {
    title: 'Miete in der Karenzzeit', cta: 'Gesamten Anspruch berechnen',
    inputs: [{ id: 'a', label: 'Angemessene Miete laut Kommune', def: 500, unit: '€', max: 3000 }, { id: 't', label: 'Ihre Miete mit Heizung', def: 800, unit: '€', max: 5000 }],
    run: (v) => {
      const cap = v.a * P.kdu.deckelFaktor; const gez = Math.min(v.t, cap);
      return { head: ['Im ersten Jahr übernommen', m(gez)], rows: [[`Obergrenze (${String(P.kdu.deckelFaktor).replace('.', ',')}-fach)`, m(cap)], ['Selbst zu zahlen', m(Math.max(0, v.t - gez))], ['Nach dem ersten Jahr', m(Math.min(v.t, v.a))]] };
    },
  },
  wohngeld: {
    title: 'Wohngeld schnell geschätzt', cta: 'Mit allen Leistungen vergleichen',
    inputs: [{ id: 'n', label: 'Personen im Haushalt', def: 1, max: 12 }, { id: 'mi', label: 'Bruttokaltmiete', def: 550, unit: '€', max: 5000 }, { id: 'b', label: 'Bruttolohn aller im Monat', def: 1500, unit: '€', max: 10000 }, { id: 's', label: 'Mietstufe des Wohnorts', def: 4, options: STUFEN }],
    run: (v) => {
      const n = Math.max(1, Math.round(v.n)); const r = wohngeld({ personen: n, mietstufe: v.s, miete: v.mi, einkommen: [{ brutto: v.b }] });
      return { head: ['Wohngeld im Monat', m(r.wohngeld)], rows: [['Berücksichtigte Miete', m(r.mieteBerueck)], ['Heizkosten- und Klimakomponente', m(r.heiz + r.klima)], ['Monatseinkommen nach Abzügen', m(r.Y)]], note: r.gekappt ? 'Ihre Miete liegt über dem Höchstbetrag; gerechnet wird mit dem Höchstbetrag.' : undefined };
    },
  },
  kiz: {
    title: 'Kinderzuschlag schnell geschätzt', cta: 'Mit Wohngeld und Grundsicherungsgeld vergleichen',
    inputs: [{ id: 'h', label: 'Haushalt', def: 2, options: HAUSHALT }, { id: 'k', label: 'Kinder', def: 2, max: 8 }, { id: 'b', label: 'Bruttolohn im Monat', def: 2400, unit: '€', max: 10000 }, { id: 'mi', label: 'Warmmiete', def: 850, unit: '€', max: 5000 }],
    run: (v) => {
      const k = Math.max(1, Math.round(v.k)); const paar = v.h === 2;
      const r = kinderzuschlag({ erwachsene: paar ? [{ brutto: v.b }, { brutto: 0 }] : [{ brutto: v.b }], kinder: Array(k).fill({ alter: 7 }), miete: v.mi, heizung: 0 });
      return { head: ['Kinderzuschlag im Monat', m(r.gesamt)], rows: [['Höchstens', m(P.kiz.hoechst * k)], ['Bedarf der Eltern', m(r.elternBedarf)], ['Anrechenbares Einkommen der Eltern', m(r.elternEinkommen)]], note: r.mindestOk ? 'Ob Kinderzuschlag oder Grundsicherungsgeld gilt, zeigt der Vergleich.' : `Unter ${paar ? P.kiz.mindestPaar : P.kiz.mindestAllein} € brutto gibt es keinen Kinderzuschlag.` };
    },
  },
  kindergeld: {
    title: 'Kindergeld für Ihre Kinder', cta: 'Alle Familienleistungen berechnen',
    inputs: [{ id: 'k', label: 'Kinder', def: 2, max: 12 }],
    run: (v) => { const k = Math.max(0, Math.round(v.k)); const b = P.kindergeld.betrag; return { head: ['Kindergeld im Monat', m(b * k)], rows: [['Je Kind', m(b)], ['Im Jahr', m(b * k * 12)]], note: 'Gleicher Betrag für jedes Kind.' }; },
  },
  elterngeld: {
    title: 'Elterngeld schnell geschätzt', cta: 'Mit Wohngeld und Kinderzuschlag rechnen',
    inputs: [{ id: 'b', label: 'Bruttolohn vor der Geburt', def: 2800, unit: '€', max: 20000 }, { id: 's', label: 'Steuerklasse', def: 4, options: ['1', '2', '3', '4', '5'].map((x) => ({ value: x, label: ['I', 'II', 'III', 'IV', 'V'][Number(x) - 1] })) }],
    run: (v) => { const r = elterngeld({ brutto: v.b, stkl: v.s as 1 | 2 | 3 | 4 | 5 }); return { head: ['Basiselterngeld im Monat', m(r.basis)], rows: [['Elterngeld-Netto', m(r.egNetto)], ['Ersatzrate', formatPercent(r.rate, 1)], ['Elterngeld Plus', m(r.plus)]], note: 'Lohnsteuer nach dem Programmablaufplan 2026, maßgeblich für Geburten ab 2027.' }; },
  },
  uvg: {
    title: 'Unterhaltsvorschuss für ein Kind', cta: 'Alle Leistungen berechnen',
    inputs: [{ id: 'a', label: 'Alter des Kindes', def: 7, unit: 'Jahre', max: 17 }, { id: 'u', label: 'Gezahlter Unterhalt', def: 0, unit: '€', max: 2000 }],
    run: (v) => { const r = unterhaltsvorschuss({ alter: v.a, unterhalt: v.u }); return { head: ['Unterhaltsvorschuss im Monat', m(r.betrag)], rows: [['Betrag der Altersstufe', m(r.voll)], ['Abzug für gezahlten Unterhalt', m(Math.min(r.voll, v.u))]], note: v.a >= 12 ? `Ab 12 Jahren nur ohne Grundsicherungsgeld oder bei mindestens ${P.uvg.mindesteinkommen12} € brutto des Elternteils.` : undefined }; },
  },
  mutterschaft: {
    title: 'Mutterschaftsgeld und Zuschuss', cta: 'Elterngeld danach berechnen',
    inputs: [{ id: 'n', label: 'Nettolohn im Monat', def: 1800, unit: '€', max: 20000 }, { id: 'v', label: 'Krankenversicherung', def: 1, options: [{ value: '1', label: 'Gesetzlich, eigenes Mitglied' }, { value: '0', label: 'Privat oder familienversichert' }] }],
    run: (v) => { const r = mutterschaftsgeld({ nettoMonat: v.n, versicherung: v.v ? 'gkv' : 'privat' }); return { head: [`Für ${r.tage} Tage Schutzfrist`, m(r.gesamt)], rows: [[v.v ? 'Krankenkasse' : 'Bundesamt für Soziale Sicherung', m(v.v ? r.kasse : r.bas)], ['Zuschuss des Arbeitgebers', m(r.arbeitgeber)], ['Je Kalendertag', m2(r.proTag)]] }; },
  },
};

export function getSpec(kind: string, _lang = 'de'): MiniSpec {
  const k = kind.replace(/^mini:/, '');
  const s = SPECS[k];
  if (!s) throw new Error(`Unbekannter Mini-Rechner: ${kind}`);
  return s;
}
export const MINI_KINDS = Object.keys(SPECS);
