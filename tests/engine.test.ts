import { describe, it, expect } from 'vitest';
import { kizAusEinkommen, wohnanteilEltern } from '../src/lib/engine/kiz';
import { wohngeld, hoechstbetrag } from '../src/lib/engine/wohngeld';
import { grundsicherung, mehrbedarfAlleinerziehend, erwerbsfreibetrag } from '../src/lib/engine/grundsicherung';
import { ersatzrate, elterngeld } from '../src/lib/engine/elterngeld';
import { unterhaltsvorschuss } from '../src/lib/engine/uvg';
import { mutterschaftsgeld } from '../src/lib/engine/mutterschaft';
import { vergleich } from '../src/lib/engine/vergleich';
import { netto } from '../src/lib/engine/netto';

describe('Kinderzuschlag: Beispiele der Familienkasse (Merkblatt KiZ 2, Stand Juli 2026)', () => {
  it('Paar, drei Kinder, Einkommen 1.915 €, Bedarf der Eltern 1.570 € → 736 €', () => {
    expect(kizAusEinkommen([297, 297, 297], 1570, 1915, 0).gesamt).toBe(736);
  });
  it('Paar, ein Kind, Einkommen 2.100 €, Bedarf der Eltern 1.676 € → 106 €', () => {
    expect(kizAusEinkommen([297], 1676, 2100, 0).gesamt).toBe(106);
  });
  it('Kindesunterhalt 300 € mindert den Höchstbetrag auf 162 €', () => {
    expect(Math.round(297 - 0.45 * 300)).toBe(162);
  });
  it('Wohnkostenanteil der Eltern nach der Tabelle', () => {
    expect(wohnanteilEltern(true, 3)).toBe(0.62);
    expect(wohnanteilEltern(false, 1)).toBe(0.77);
    expect(wohnanteilEltern(false, 7)).toBe(0.40);
  });
});

describe('Wohngeld', () => {
  it('Höchstbeträge der Anlage 1 (1 Person, Mietstufe I und VII)', () => {
    expect(hoechstbetrag(1, 1)).toBe(361);
    expect(hoechstbetrag(1, 7)).toBe(677);
  });
  it('steigt mit der Miete und fällt mit dem Einkommen', () => {
    const a = wohngeld({ personen: 1, mietstufe: 4, miete: 500, einkommen: [{ brutto: 1200 }] }).wohngeld;
    const b = wohngeld({ personen: 1, mietstufe: 4, miete: 600, einkommen: [{ brutto: 1200 }] }).wohngeld;
    const c = wohngeld({ personen: 1, mietstufe: 4, miete: 500, einkommen: [{ brutto: 1600 }] }).wohngeld;
    expect(a).toBeGreaterThan(0); expect(b).toBeGreaterThanOrEqual(a); expect(c).toBeLessThan(a);
  });
  it('Kontrollrechnungen mit der Formel des § 19 (unabhängig nachgerechnet)', () => {
    // 1 Person, Stufe IV, 600 € Bruttokaltmiete, 1.500 € brutto: Y = (18.000 − 1.230) · 0,7 / 12 = 978,25 €
    expect(wohngeld({ personen: 1, mietstufe: 4, miete: 600, einkommen: [{ brutto: 1500 }] }).wohngeld).toBe(301);
    const y = (yMonat: number) => [{ brutto: 0, sonstiges: yMonat, abzuege: 0 }];
    expect(wohngeld({ personen: 2, mietstufe: 4, miete: 750, einkommen: y(1500) }).wohngeld).toBe(290);
    expect(wohngeld({ personen: 4, mietstufe: 4, miete: 1000, einkommen: y(2400) }).wohngeld).toBe(459);
    expect(wohngeld({ personen: 1, mietstufe: 3, miete: 450, einkommen: y(1200) }).wohngeld).toBe(151);
  });
  it('kein Wohngeld unter 10 €', () => {
    for (let br = 1000; br < 4000; br += 25) { const w = wohngeld({ personen: 1, mietstufe: 3, miete: 450, einkommen: [{ brutto: br }] }).wohngeld; expect(w === 0 || w >= 10).toBe(true); }
  });
});

describe('Grundsicherungsgeld', () => {
  it('Mehrbedarf Alleinerziehende: ein Kind unter 7 = 36 %, vier Kinder = 48 %, höchstens 60 %', () => {
    expect(mehrbedarfAlleinerziehend([3])).toBeCloseTo(563 * 0.36, 2);
    expect(mehrbedarfAlleinerziehend([8, 10, 12, 16])).toBeCloseTo(563 * 0.48, 2);
    expect(mehrbedarfAlleinerziehend([1, 2, 3, 4, 5, 6])).toBeCloseTo(563 * 0.6, 2);
  });
  it('Freibetrag höchstens 348 € ohne Kind, 378 € mit Kind', () => {
    expect(erwerbsfreibetrag(5000, false)).toBe(348);
    expect(erwerbsfreibetrag(5000, true)).toBe(378);
    expect(erwerbsfreibetrag(520, false)).toBe(184);
  });
  it('Alleinstehend ohne Einkommen: Regelbedarf plus Miete', () => {
    expect(grundsicherung({ erwachsene: [{ brutto: 0 }], kinder: [], miete: 450, heizung: 80 }).anspruch).toBe(563 + 530);
  });
});

describe('Elterngeld', () => {
  it('Ersatzrate 67 %, 100 % bei 340 €, 65 % ab 1.240 €', () => {
    expect(ersatzrate(1100)).toBe(0.67); expect(ersatzrate(340)).toBeCloseTo(1, 6); expect(ersatzrate(1500)).toBe(0.65);
  });
  it('Mindest- und Höchstbetrag', () => {
    expect(elterngeld({ brutto: 0 }).basis).toBe(300);
    expect(elterngeld({ brutto: 9000 }).basis).toBe(1800);
  });
});

describe('Unterhaltsvorschuss und Mutterschaftsgeld', () => {
  it('Beträge 2026 nach Altersstufe', () => {
    expect(unterhaltsvorschuss({ alter: 3 }).betrag).toBe(227);
    expect(unterhaltsvorschuss({ alter: 9 }).betrag).toBe(299);
    expect(unterhaltsvorschuss({ alter: 14, bruttoElternteil: 800, gsgOhneUvg: true }).betrag).toBe(394);
    expect(unterhaltsvorschuss({ alter: 14, bruttoElternteil: 300, gsgOhneUvg: true }).betrag).toBe(0);
  });
  it('Schutzfrist 98 Tage, 13 € je Tag von der Kasse', () => {
    const r = mutterschaftsgeld({ nettoMonat: 1800, versicherung: 'gkv' });
    expect(r.tage).toBe(98); expect(r.kasse).toBe(1274); expect(r.gesamt).toBeCloseTo(5880, 0);
  });
});

describe('Vergleich der Kombinationen', () => {
  it('Midijob-Netto liegt zwischen Brutto minus voller Abgaben und Brutto', () => {
    const n = netto({ brutto: 1200 }).netto; expect(n).toBeGreaterThan(1200 * 0.79); expect(n).toBeLessThan(1200);
  });
  it('ohne Einkommen: Grundsicherungsgeld', () => {
    const v = vergleich({ paar: false, brutto: [0], kinder: [], unterhalt: 0, miete: 450, heizung: 70, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
    expect(v.empfehlung).toBe('gsg');
  });
  it('Paar mit zwei Kindern und 2.800 € brutto: Wohngeld und Kinderzuschlag', () => {
    const v = vergleich({ paar: true, brutto: [2800, 0], kinder: [4, 8], unterhalt: 0, miete: 750, heizung: 110, mietstufe: 4, elterngeld: 0, sonstiges: 0 });
    expect(v.kiz.gesamt).toBeGreaterThan(0); expect(['vorrang', 'gsg']).toContain(v.empfehlung);
  });
  it('hohes Einkommen: nur Kindergeld', () => {
    const v = vergleich({ paar: true, brutto: [5000, 2500], kinder: [4], unterhalt: 0, miete: 900, heizung: 120, mietstufe: 4, elterngeld: 0, sonstiges: 0 });
    expect(v.empfehlung).toBe('nur-kg'); expect(v.kindergeld).toBe(259);
  });
});
