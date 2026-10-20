import { definePage } from '../../lib/guide-types';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default definePage({
  id: 'wohngeld-koeln',
  group: 'wohngeld',
  order: 23,
  slug: 'wohngeld-koeln',
  nav: 'Wohngeld Köln',
  card: 'Wohngeld in Köln (Mietstufe VI) für Familien: zusammen mit Kinderzuschlag und Kindergeld gerechnet.',
  title: 'Wohngeld Köln 2026: Mietstufe VI und Familien mit Kindern',
  description: 'Wohngeld in Köln 2026: Mietstufe VI, Höchstbeträge und berechnete Beispiele für Familien und Alleinerziehende mit Wohngeld, Kinderzuschlag und Kindergeld.',
  h1: 'Wohngeld in Köln für Familien und Alleinerziehende',
  intro: 'Köln liegt beim Wohngeld in Mietstufe VI. Für Familien zählt meist nicht das Wohngeld allein, sondern die Kombination mit Kinderzuschlag. Der Rechner ist auf eine Kölner Familie eingestellt.',
  tool: { kind: 'haushalt', props: { paar: true, kinder: '5, 10', brutto1: 2800, brutto2: 0, miete: 920, heizung: 130, ort: 'Köln' } },
  related: ['kinderzuschlag-rechner', 'wohngeld-rechner', 'mietstufen', 'kinderzuschlag', 'wohngeld-muenchen'],
  sources: ['wogv_anlage', 'wogg_anl1', 'bkgg_6a', 'wogg_19', 'estg_66'],
  resume: (h) => {
    const s = h.P.wohngeld.mietstufen['Köln'];
    const v = h.VG.vergleich({ paar: true, brutto: [2800, 0], kinder: [5, 10], unterhalt: 0, miete: 920, heizung: 130, mietstufe: s, elterngeld: 0, sonstiges: 0 });
    return `Köln gehört beim Wohngeld zur Mietstufe ${ROM[s - 1]}, wie Hamburg, Frankfurt am Main, Düsseldorf und Stuttgart. Die Bruttokaltmiete zählt höchstens bis ${h.m(h.WG.hoechstbetrag(1, s))} für eine Person, ${h.m(h.WG.hoechstbetrag(3, s))} für drei und ${h.m(h.WG.hoechstbetrag(4, s))} für vier Personen, jeweils plus Klimakomponente. Für Familien ist das Wohngeld meist nur ein Baustein. Ein Beispiel mit den Vorgaben des Rechners: Ein Paar mit zwei Kindern von 5 und 10 Jahren, ein Verdienst von ${h.m(2800)} brutto und ${h.m(920)} Bruttokaltmiete erhält nach unserer Rechnung ${h.m(v.wg.wohngeld)} Wohngeld, ${h.m(v.kiz.gesamt)} Kinderzuschlag und ${h.m(v.kindergeld)} Kindergeld im Monat. Wohngeld beantragen Sie bei der Wohngeldstelle der Stadt Köln, Kinderzuschlag und Kindergeld bei der Familienkasse. Beide Anträge sind getrennt nötig. Nach dem Gesetzentwurf für 2027 bliebe Köln in Stufe ${ROM[h.P.wohngeld.entwurf2027.mietstufen['Köln'] - 1]}, doch die geplante Halbierung der Heizkostenkomponente träfe auch Kölner Haushalte; der Entwurf ist nicht beschlossen.`;
  },
  faqs: (h) => [
    { q: 'Muss ich in Köln Wohngeld und Kinderzuschlag getrennt beantragen?', a: 'Ja. Das Wohngeld bewilligt die Wohngeldstelle der Stadt Köln, den Kinderzuschlag die Familienkasse der Bundesagentur für Arbeit. Die Anträge laufen unabhängig, die Behörden tauschen aber Daten aus. Stellen Sie beide möglichst gleichzeitig, denn der Kinderzuschlag prüft, ob mit Wohngeld der Bedarf der Familie gedeckt ist, und ohne Antrag wird er nicht gezahlt.' },
    { q: 'Zählt der Kinderzuschlag beim Kölner Wohngeld als Einkommen?', a: 'Nein. Kinderzuschlag und Kindergeld gehören beim Wohngeld nicht zum Einkommen. Umgekehrt zählt das Wohngeld beim Kinderzuschlag nicht als Einkommen der Eltern; es hilft aber, den Bedarf der Familie zu decken, was Voraussetzung für den Kinderzuschlag ist. Unterhalt und Unterhaltsvorschuss zählen dagegen bei beiden Leistungen, beim Kinderzuschlag als Einkommen des Kindes.' },
    { q: 'Was ändert sich in Köln, wenn ein drittes Kind kommt?', a: `Der Haushalt wird größer, und damit steigen Höchstbetrag, Heizkostenbetrag und die Werte der Formel. Das Wohngeld nimmt deshalb meist deutlich zu. Dazu kommen ein weiterer Kinderzuschlag von bis zu ${h.m(h.P.kiz.hoechst)} und Kindergeld von ${h.m(h.P.kindergeld.betrag)}. Weil sich die Haushaltsgröße ändert, sollten Sie nach der Geburt sofort einen neuen Wohngeldantrag stellen.` },
  ],
  body: (h) => {
    const s = h.P.wohngeld.mietstufen['Köln'];
    const fam = [1200, 1800, 2400, 3200, 4000, 4600].map((b) => {
      const v = h.VG.vergleich({ paar: true, brutto: [b, 0], kinder: [5, 10], unterhalt: 0, miete: 920, heizung: 130, mietstufe: s, elterngeld: 0, sonstiges: 0 });
      const weg = v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : v.empfehlung === 'vorrang' ? 'Wohngeld/KiZ' : 'nur Kindergeld';
      return [h.m(b), h.m(v.wg.wohngeld), h.m(v.kiz.gesamt), h.m(v.kindergeld), weg];
    });
    const ae = [700, 1400, 1900, 2400, 2900].map((b) => {
      const v = h.VG.vergleich({ paar: false, brutto: [b], kinder: [4], unterhalt: 0, miete: 680, heizung: 100, mietstufe: s, elterngeld: 0, sonstiges: 0 });
      const weg = v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : v.empfehlung === 'vorrang' ? 'Wohngeld/KiZ' : 'ohne Wohngeld/KiZ';
      return [h.m(b), h.m(v.uvgSumme), h.m(v.wg.wohngeld), h.m(v.kiz.gesamt), weg];
    });
    return `
<h2>Paar mit zwei Kindern in Köln</h2>
${h.table(['Brutto (ein Verdienst)', 'Wohngeld', 'Kinderzuschlag', 'Kindergeld', 'Maßgeblicher Weg'], fam, `Paar, Kinder 5 und 10 Jahre, Bruttokaltmiete ${h.m(920)}, Heizung ${h.m(130)}, Mietstufe ${ROM[s - 1]}. Beispielwerte, eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['r', 'r', 'r', 'r', 'l'])}
<p>Bei kleinem Lohn decken Wohngeld und Kinderzuschlag den Bedarf der Familie noch nicht, und das Jobcenter ist zuständig. In diesen Zeilen werden Wohngeld und Kinderzuschlag nicht gezahlt; die Beträge zeigen nur, was die Rechnung ergäbe, und dass sie nicht ausreicht. Die Familie bekommt dann Grundsicherungsgeld, das Miete und Heizung in angemessener Höhe einschließt. Mit steigendem Lohn kippt die Rechnung: Wohngeld und Kinderzuschlag reichen, und sie gehen dem Grundsicherungsgeld vor. In diesem Bereich setzt sich das Haushaltsgeld aus Lohn und drei Leistungen zusammen, die von zwei Stellen kommen: Wohngeld von der Stadt, Kinderzuschlag und Kindergeld von der Familienkasse. Die Familie hat dann keine Pflichten gegenüber dem Jobcenter, muss aber Änderungen an beide Stellen melden. Mit noch höherem Lohn sinkt zuerst der Kinderzuschlag, der Elterneinkommen über dem Bedarf der Eltern zu ${h.pc(h.P.kiz.anrechnungEltern)} anrechnet, dann das Wohngeld. Kindergeld bleibt in jedem Fall.</p>

<h2>Alleinerziehend mit einem Kind in Köln</h2>
${h.table(['Brutto', 'Unterhaltsvorschuss', 'Wohngeld', 'Kinderzuschlag', 'Maßgeblicher Weg'], ae, `Alleinerziehend, Kind 4 Jahre, kein Unterhalt vom anderen Elternteil, Bruttokaltmiete ${h.m(680)}, Heizung ${h.m(100)}. Eigene Berechnung.`, ['r', 'r', 'r', 'r', 'l'])}
<p>Bei Alleinerziehenden ohne Unterhalt springt der Unterhaltsvorschuss des Jugendamts ein, für ein Kind unter sechs Jahren ${h.m(h.P.uvg.betraege[0])}. Er ist Einkommen des Kindes: Beim Kinderzuschlag mindert er den Betrag für dieses Kind zu ${h.pc(h.P.kiz.anrechnungKind)}, beim Wohngeld zählt er voll zum Haushaltseinkommen. Dafür bekommt die Alleinerziehende beim Wohngeld einen Freibetrag von ${h.m(h.P.wohngeld.freibetragAlleinerziehend)} im Jahr. Unterhaltsvorschuss und Kindergeld kommen in jedem Fall hinzu; der Rechner zeigt die Summe.</p>

<h2>Höchstbeträge in Köln</h2>
<p>In Stufe ${ROM[s - 1]} zählt die Bruttokaltmiete für zwei Personen bis ${h.m(h.WG.hoechstbetrag(2, s))}, für drei bis ${h.m(h.WG.hoechstbetrag(3, s))}, für vier bis ${h.m(h.WG.hoechstbetrag(4, s))} und für fünf bis ${h.m(h.WG.hoechstbetrag(5, s))}, jeweils zuzüglich Klimakomponente. Familien mit größeren Wohnungen liegen in Köln häufig darüber; dann rechnet die Wohngeldstelle mit dem Höchstbetrag. Für das Jobcenter gelten eigene Kölner Angemessenheitsgrenzen, die nicht mit der Mietstufe zusammenhängen. Wer zwischen beiden Leistungen steht, sollte deshalb nicht von der einen Grenze auf die andere schließen: Eine Wohnung kann für das Wohngeld voll zählen und für das Jobcenter zu teuer sein.</p>

<h2>Anträge in Köln</h2>
<p>Das Wohngeld beantragen Sie bei der Wohngeldstelle der Stadt Köln, den Kinderzuschlag bei der Familienkasse, den Unterhaltsvorschuss beim Jugendamt der Stadt. Der Kinderzuschlag wird für ${h.P.kiz.bewilligung} Monate bewilligt, das Wohngeld meist für ${h.P.wohngeld.bewilligungMonate}. Beide gibt es nicht rückwirkend vor dem Antragsmonat. Einzelheiten zum Kinderzuschlag stehen unter ${h.a('kinderzuschlag', 'Kinderzuschlag')}, zum Wohngeldantrag unter ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}.</p>
`;
  },
});
