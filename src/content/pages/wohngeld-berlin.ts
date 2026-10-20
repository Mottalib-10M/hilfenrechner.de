import { definePage } from '../../lib/guide-types';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default definePage({
  id: 'wohngeld-berlin',
  group: 'wohngeld',
  order: 20,
  slug: 'wohngeld-berlin',
  nav: 'Wohngeld Berlin',
  card: 'Wohngeld in Berlin (Mietstufe IV): Höchstbeträge, Beispiele für typische Haushalte und Rechner.',
  title: 'Wohngeld Berlin 2026: Mietstufe IV, Höchstbeträge, Rechner',
  description: 'Wohngeld in Berlin 2026: Mietstufe IV, Höchstbeträge je Haushaltsgröße, berechnete Beispiele für Singles, Paare und Familien, Vergleich mit Grundsicherungsgeld.',
  h1: 'Wohngeld in Berlin 2026',
  intro: 'Berlin gehört beim Wohngeld zur Mietstufe IV. Der Rechner ist auf Berlin eingestellt; ändern Sie Haushalt, Lohn und Miete nach Ihren Zahlen.',
  tool: { kind: 'haushalt', props: { kinder: '', brutto1: 1500, miete: 560, heizung: 85, ort: 'Berlin' } },
  related: ['mietstufen', 'wohngeld-rechner', 'wohngeld-antrag', 'wohngeld-hamburg', 'wohngeld-2026'],
  sources: ['wogv_anlage', 'wogg_anl1', 'wogg_12', 'wogg_19', 'btd_21_8284'],
  resume: (h) => {
    const s = h.P.wohngeld.mietstufen['Berlin'];
    const r = h.WG.wohngeld({ personen: 1, mietstufe: s, miete: 560, einkommen: [{ brutto: 1500 }] });
    return `Für ganz Berlin gilt beim Wohngeld die Mietstufe ${ROM[s - 1]}; die Stadt ist in der Anlage zur Wohngeldverordnung als eine Gemeinde eingetragen, Unterschiede zwischen den Bezirken gibt es nicht. Die Wohngeldstelle berücksichtigt die Bruttokaltmiete deshalb höchstens bis ${h.m(h.WG.hoechstbetrag(1, s))} für eine Person, ${h.m(h.WG.hoechstbetrag(2, s))} für zwei, ${h.m(h.WG.hoechstbetrag(3, s))} für drei und ${h.m(h.WG.hoechstbetrag(4, s))} für vier Personen, jeweils zuzüglich Klimakomponente. Dazu kommt der feste Heizkostenbetrag, für eine Person ${h.m2(h.WG.heizEntlastung(1))}. Ein Beispiel mit den Vorgaben des Rechners: Wer allein lebt, ${h.m(1500)} brutto verdient und ${h.m(560)} Bruttokaltmiete zahlt, kommt auf rund ${h.m(r.wohngeld)} Wohngeld im Monat. Viele Berliner Mieten in neuen Verträgen liegen über dem Höchstbetrag; der Teil darüber bleibt ohne Zuschuss. Zuständig sind die Wohngeldstellen der Bezirksämter. Nach dem Gesetzentwurf für 2027 bliebe Berlin in Stufe ${ROM[h.P.wohngeld.entwurf2027.mietstufen['Berlin'] - 1]}; der Entwurf ist nicht beschlossen.`;
  },
  faqs: (h) => [
    { q: 'Welche Wohngeldstelle ist in Berlin zuständig?', a: 'Das Bezirksamt des Bezirks, in dem Ihre Wohnung liegt. Jedes der Berliner Bezirksämter hat eine Wohngeldstelle, oft im Amt für Bürgerdienste oder im Bereich Soziales. Die Formulare des Landes Berlin gelten in allen Bezirken gleich, und es gibt einen Online-Antrag. Ziehen Sie innerhalb Berlins um, wechselt die Zuständigkeit zum Bezirksamt des neuen Bezirks.' },
    { q: 'Gilt in Berlin eine höhere Mietstufe für teure Bezirke wie Mitte oder Charlottenburg?', a: `Nein. Berlin ist für das Wohngeld eine einzige Gemeinde mit einer einzigen Mietstufe, ${ROM[h.P.wohngeld.mietstufen['Berlin'] - 1]}. Wer in Mitte wohnt, hat denselben Höchstbetrag wie jemand in Marzahn-Hellersdorf. Eine teurere Wohnung bringt deshalb nur bis zum Höchstbetrag plus Klimakomponente mehr Wohngeld, unabhängig vom Bezirk.` },
    { q: 'Bekomme ich in Berlin Wohngeld oder Grundsicherungsgeld vom Jobcenter?', a: 'Das hängt davon ab, ob Ihr Einkommen zusammen mit Wohngeld und gegebenenfalls Kinderzuschlag Ihren Bedarf deckt. Wenn ja, gilt Wohngeld. Wenn nicht, ist das Jobcenter Ihres Bezirks zuständig, das die Miete bis zur Berliner Angemessenheitsgrenze übernimmt. Der Rechner oben vergleicht beide Wege für Ihren Haushalt.' },
  ],
  body: (h) => {
    const s = h.P.wohngeld.mietstufen['Berlin'];
    const hb = [1, 2, 3, 4, 5].map((n) => [String(n), h.m(h.WG.hoechstbetrag(n, s)), h.m2(h.WG.klimaKomponente(n)), h.m2(h.WG.hoechstbetrag(n, s) + h.WG.klimaKomponente(n)), h.m2(h.WG.heizEntlastung(n))]);
    const haushalte: Array<[string, boolean, number[], number, number, number]> = [
      ['Single, Vollzeit', false, [], 2150, 560, 85],
      ['Single, Teilzeit', false, [], 1400, 480, 75],
      ['Paar, ein Verdienst', true, [], 2600, 680, 100],
      ['Alleinerziehend, Kind 7 Jahre', false, [7], 1900, 640, 95],
      ['Paar, zwei Kinder (3 und 9)', true, [3, 9], 3000, 860, 130],
    ];
    const zeilen = haushalte.map(([t, paar, kinder, b, mi, hz]) => {
      const v = h.VG.vergleich({ paar, brutto: paar ? [b, 0] : [b], kinder, unterhalt: 0, miete: mi, heizung: hz, mietstufe: s, elterngeld: 0, sonstiges: 0 });
      const weg = v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : v.empfehlung === 'vorrang' ? (v.kiz.gesamt > 0 ? 'Wohngeld + Kinderzuschlag' : 'Wohngeld') : 'keine';
      return [t, h.m(b), h.m(mi), h.m(v.wg.wohngeld), v.kiz.gesamt ? h.m(v.kiz.gesamt) : '–', weg];
    });
    return `
<h2>Höchstbeträge in Berlin</h2>
${h.table(['Personen', `Höchstbetrag Stufe ${ROM[s - 1]}`, 'Klimakomponente', 'Berücksichtigt höchstens', 'Heizkostenbetrag'], hb, 'Berlin, Mietstufe ' + ROM[s - 1] + ', Beträge im Monat. Anlage 1 und § 12 WoGG.', ['l', 'r', 'r', 'r', 'r'])}
<p>Die dritte Spalte ist die Grenze, bis zu der die Wohngeldstelle Ihre Bruttokaltmiete ansetzt. Für einen Zwei-Personen-Haushalt sind das ${h.m2(h.WG.hoechstbetrag(2, s) + h.WG.klimaKomponente(2))}. Zahlen Sie mehr, wird mit diesem Betrag gerechnet. Der Heizkostenbetrag in der letzten Spalte kommt unabhängig von Ihren tatsächlichen Heizkosten hinzu. Ob Ihre Wohnung mit Fernwärme, Gas oder Strom beheizt wird, spielt dafür keine Rolle; auch eine hohe Nachzahlung aus der Heizkostenabrechnung erhöht das Wohngeld nicht. Sie kann aber im Monat der Fälligkeit einen Anspruch beim Jobcenter auslösen, wenn das Geld dafür fehlt.</p>

<h2>Beispiele für Berliner Haushalte</h2>
${h.table(['Haushalt', 'Brutto', 'Bruttokaltmiete', 'Wohngeld', 'Kinderzuschlag', 'Maßgeblicher Weg'], zeilen, `Berechnet mit den Rechenkernen dieser Website für Mietstufe ${ROM[s - 1]}, Stand ${h.date(h.TODAY)}. Mieten sind Beispielwerte.`, ['l', 'r', 'r', 'r', 'r', 'l'])}
<p>Die Beispiele zeigen, wie unterschiedlich die Lage in Berlin sein kann. Ein Single in Vollzeit mit ${h.m(2150)} brutto liegt nahe an der Einkommensgrenze und bekommt nur noch wenig Wohngeld; bei einem Stundenlohn deutlich über dem Mindestlohn von ${h.m2(h.P.sv.mindestlohn)} fällt es ganz weg. Beim Paar mit einem Verdienst von ${h.m(2600)} trägt das Wohngeld dagegen einen spürbaren Teil der Miete, weil Höchstbetrag und Formel mit der Haushaltsgröße wachsen. In Teilzeit ist das Wohngeld höher, kann aber zu niedrig sein, um den Bedarf zu decken; dann ist das Jobcenter zuständig. Familien erhalten neben dem Wohngeld häufig den Kinderzuschlag der Familienkasse, für jedes Kind bis zu ${h.m(h.P.kiz.hoechst)}. Für Alleinerziehende zählt der Unterhaltsvorschuss, den der Rechner bei fehlendem Unterhalt automatisch ansetzt, beim Wohngeld als Einkommen.</p>

<h2>Wenn die Miete über dem Höchstbetrag liegt</h2>
<p>Gerade bei Mietverträgen der letzten Jahre übersteigt die Bruttokaltmiete in Berlin oft den Höchstbetrag. Das Wohngeld wird dann so berechnet, als zahlten Sie genau den Höchstbetrag plus Klimakomponente. Der Rest bleibt Ihre Sache. Wohngeld verlangt anders als das Grundsicherungsgeld aber keinen Umzug in eine günstigere Wohnung; Sie dürfen teurer wohnen, solange Sie den Lebensunterhalt mit Einkommen und Wohngeld bestreiten können. Beim Grundsicherungsgeld prüft das Jobcenter dagegen die Angemessenheit nach den Berliner Richtwerten; mehr dazu unter ${h.a('grundsicherung-miete', 'Miete im Grundsicherungsgeld')}.</p>

<h2>Antrag in Berlin</h2>
<p>Den Antrag stellen Sie beim Bezirksamt Ihres Wohnbezirks, schriftlich oder online. Wohngeld gibt es ab dem Monat, in dem der Antrag eingeht; Unterlagen können Sie nachreichen. Bewilligt wird in der Regel für ${h.P.wohngeld.bewilligungMonate} Monate. Eine Liste der Unterlagen und die Regeln für den Weiterleistungsantrag stehen unter ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}. Wie Berlin im Vergleich zu anderen Städten eingestuft ist, zeigt ${h.a('mietstufen', 'Mietstufen')}; das Gegenstück für eine Stadt in höherer Stufe ist ${h.a('wohngeld-hamburg', 'Wohngeld in Hamburg')}.</p>
`;
  },
});
