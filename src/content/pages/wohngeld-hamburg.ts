import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

/** Wohngeld nach dem nicht beschlossenen Entwurf BT-Drs. 21/8284: halbierter Heizkostenbetrag, neue Werte c, neue Mietstufe. */
function nachEntwurf(h: Helpers, n: number, stufe: number, miete: number, brutto: number[]) {
  const W = h.P.wohngeld; const E = W.entwurf2027; const i = Math.min(n, 12) - 1;
  const heiz = n <= 5 ? E.heizkosten[n - 1] : E.heizkosten[4] + (n - 5) * E.heizkostenMehr;
  const mb = Math.min(miete, h.WG.hoechstbetrag(n, stufe) + h.WG.klimaKomponente(n));
  const y = brutto.reduce((a, b) => a + h.WG.jahreseinkommen({ brutto: b }), 0) / 12;
  const M = Math.max(mb + heiz, W.mindest.M[i]); const Y = Math.max(y, W.mindest.Y[i]);
  const r = (x: number) => Math.round(x * 1e10) / 1e10;
  const wg = Math.round(r(W.formelFaktor * r(M - r(r(W.formel.a[i] + W.formel.b[i] * M + E.c[i] * Y) * Y))) + 1e-9);
  return wg < W.minimum ? 0 : wg;
}

export default definePage({
  id: 'wohngeld-hamburg',
  group: 'wohngeld',
  order: 21,
  slug: 'wohngeld-hamburg',
  nav: 'Wohngeld Hamburg',
  card: 'Wohngeld in Hamburg (Mietstufe VI) und was der Entwurf für 2027 mit Stufe V bedeuten würde.',
  title: 'Wohngeld Hamburg 2026: Mietstufe VI und Folgen der Reform',
  description: 'Wohngeld in Hamburg 2026: Mietstufe VI, Höchstbeträge je Haushalt, berechnete Beispiele und was der Gesetzentwurf für 2027 mit Stufe V in Hamburg ändern würde.',
  h1: 'Wohngeld in Hamburg: Stufe VI heute, Stufe V im Entwurf',
  intro: 'Hamburg ist beim Wohngeld in Mietstufe VI eingestuft, der zweithöchsten. Der Gesetzentwurf für 2027 würde die Stadt in Stufe V herabsetzen. Der Rechner rechnet nach geltendem Recht.',
  tool: { kind: 'haushalt', props: { kinder: '', brutto1: 1700, miete: 640, heizung: 90, ort: 'Hamburg' } },
  related: ['wohngeld-reform-2027', 'mietstufen', 'wohngeld-rechner', 'wohngeld-berlin', 'wohngeld-antrag'],
  sources: ['wogv_anlage', 'wogg_anl1', 'btd_21_8284', 'wogg_19'],
  resume: (h) => {
    const s = h.P.wohngeld.mietstufen['Hamburg']; const sn = h.P.wohngeld.entwurf2027.mietstufen['Hamburg'];
    const a = h.WG.wohngeld({ personen: 1, mietstufe: s, miete: 640, einkommen: [{ brutto: 1700 }] }).wohngeld;
    const b = nachEntwurf(h, 1, sn, 640, [1700]);
    return `In Hamburg gilt für das ganze Stadtgebiet die Mietstufe ${ROM[s - 1]}. Die Wohngeldstelle setzt die Bruttokaltmiete deshalb bis ${h.m(h.WG.hoechstbetrag(1, s))} für eine Person, ${h.m(h.WG.hoechstbetrag(2, s))} für zwei und ${h.m(h.WG.hoechstbetrag(4, s))} für vier Personen an, jeweils plus Klimakomponente; dazu kommt der Heizkostenbetrag. Eine alleinstehende Person mit ${h.m(1700)} brutto und ${h.m(640)} Bruttokaltmiete erhält nach heutigem Recht rund ${h.m(a)} im Monat. Für Hamburg ist der Gesetzentwurf zur Wohngeldreform (BT-Drucksache ${h.P.wohngeld.entwurf2027.drucksache}) besonders wichtig: Er würde die Stadt ab ${h.date(h.P.wohngeld.entwurf2027.inkraftGeplant)} in Mietstufe ${ROM[sn - 1]} einordnen und zugleich die Heizkostenkomponente halbieren. Für dasselbe Beispiel ergäben sich nach unserer Rechnung nur noch ${h.m(b)}. Am ${h.date(h.TODAY)} ist der Entwurf nicht beschlossen; bis zu einer Verkündung gilt Stufe ${ROM[s - 1]}. Zuständig für den Antrag ist das Bezirksamt, in dessen Bezirk Sie wohnen.`;
  },
  faqs: (h) => [
    { q: 'Wo beantrage ich Wohngeld in Hamburg?', a: 'Beim Bezirksamt Ihres Wohnbezirks, also etwa Altona, Eimsbüttel, Hamburg-Mitte, Hamburg-Nord, Wandsbek, Bergedorf oder Harburg. Dort ist die Wohngeldstelle angesiedelt. Den Antrag können Sie schriftlich oder über das Onlineangebot der Stadt stellen. Wohngeld gibt es ab dem Monat, in dem der Antrag eingeht; fehlende Unterlagen reichen Sie nach.' },
    { q: 'Sinkt mein Hamburger Wohngeld 2027 sicher?', a: `Nein, sicher ist das nicht. Die niedrigere Mietstufe und die halbierte Heizkostenkomponente stehen in einem Gesetzentwurf vom ${h.date(h.P.wohngeld.entwurf2027.datum)}, den der Bundestag noch beschließen muss. Er kann ihn ändern. Außerdem sieht der Entwurf vor, dass bereits bewilligtes Wohngeld bis zum Ende des laufenden Bewilligungszeitraums in der bisherigen Höhe bleibt.` },
    { q: 'Warum würde Hamburg im Entwurf in eine niedrigere Mietstufe fallen?', a: 'Die Mietstufe misst die Mieten der Wohngeldhaushalte im Vergleich zum Bundesdurchschnitt. Der Entwurf rechnet mit neueren Daten der Wohngeldstatistik. Liegen die Hamburger Wohngeldmieten nach diesen Daten näher am Durchschnitt als früher, ergibt sich eine niedrigere Stufe, auch wenn die Mieten absolut gestiegen sind. Es zählt der Abstand, nicht die Höhe.' },
  ],
  body: (h) => {
    const W = h.P.wohngeld; const s = W.mietstufen['Hamburg']; const sn = W.entwurf2027.mietstufen['Hamburg'];
    const hb = [1, 2, 3, 4, 5].map((n) => [String(n), h.m(h.WG.hoechstbetrag(n, s)), h.m(h.WG.hoechstbetrag(n, sn)), h.m(h.WG.hoechstbetrag(n, s) - h.WG.hoechstbetrag(n, sn))]);
    const faelle: Array<[string, number, number, number[]]> = [
      ['Single, 1.300 € brutto', 1, 600, [1300]],
      ['Single, 1.700 € brutto', 1, 640, [1700]],
      ['Paar, 2.400 € brutto', 2, 760, [2400]],
      ['Paar, beide 1.500 € brutto', 2, 760, [1500, 1500]],
      ['Familie mit 2 Kindern, 3.200 € brutto', 4, 1050, [3200]],
    ];
    const zeilen = faelle.map(([t, n, mi, b]) => {
      const heute = h.WG.wohngeld({ personen: n, mietstufe: s, miete: mi, einkommen: b.map((x) => ({ brutto: x })) }).wohngeld;
      const ent = nachEntwurf(h, n, sn, mi, b);
      return [t, h.m(mi), h.m(heute), h.m(ent), h.m(ent - heute)];
    });
    return `
<h2>Höchstbeträge: Stufe VI heute, Stufe V nach Entwurf</h2>
${h.table(['Personen', `Heute (Stufe ${ROM[s - 1]})`, `Entwurf (Stufe ${ROM[sn - 1]})`, 'Differenz'], hb, `Höchstbeträge für die Bruttokaltmiete in Hamburg ohne Klimakomponente. Entwurf: BT-Drucksache ${W.entwurf2027.drucksache}, nicht beschlossen.`, ['l', 'r', 'r', 'r'])}
<p>Die Höchstbeträge der einzelnen Stufen würde der Entwurf nicht ändern. Weil Hamburg aber eine Stufe tiefer rutschen würde, sänke die Grenze, bis zu der die Miete zählt, für jede Haushaltsgröße. Betroffen wären vor allem Haushalte, deren Miete heute zwischen den beiden Höchstbeträgen oder darüber liegt; wer eine günstige Wohnung unter dem Höchstbetrag der Stufe ${ROM[sn - 1]} hat, verlöre nur durch die übrigen Änderungen.</p>

<h2>Beispiele: Wohngeld heute und nach Entwurf</h2>
${h.table(['Haushalt', 'Bruttokaltmiete', 'Heute', 'Nach Entwurf', 'Unterschied'], zeilen, `Eigene Berechnung. Heute: Stufe ${ROM[s - 1]} nach geltendem Recht. Entwurf: Stufe ${ROM[sn - 1]}, halbierter Heizkostenbetrag und neue Werte c nach BT-Drucksache ${W.entwurf2027.drucksache}; nicht beschlossen. Mieten sind Beispielwerte.`, ['l', 'r', 'r', 'r', 'r'])}
<p>In allen Beispielen läge das Wohngeld nach dem Entwurf deutlich niedriger. Drei Effekte addieren sich: der niedrigere Höchstbetrag, die halbierte Heizkostenkomponente und der höhere Wert c, der mittlere Einkommen stärker trifft. Das Paar mit zwei Verdiensten zeigt den Extremfall: Es liegt heute knapp unter der Einkommensgrenze und verlöre den Anspruch nach dem Entwurf ganz. Je näher ein Haushalt heute an dieser Grenze liegt, desto größer ist der relative Verlust. Haushalte, die nur knapp über dem Bedarf des Grundsicherungsgelds liegen, würden nach dem Entwurf eher zum Jobcenter wechseln; dort gelten die Hamburger Angemessenheitsgrenzen für die Miete.</p>
${h.box('Noch kein geltendes Recht', `<p>Die rechte Spalte zeigt eine Modellrechnung zum Gesetzentwurf vom ${h.date(W.entwurf2027.datum)}. Ob, wann und in welcher Form das Gesetz kommt, ist am ${h.date(h.TODAY)} offen. Was der Entwurf insgesamt vorsieht, steht unter ${h.a('wohngeld-reform-2027', 'Wohngeldreform 2027')}.</p>`, 'warning')}

<h2>Was Hamburger Haushalte jetzt wissen sollten</h2>
<p>Bis der Bundestag entscheidet, gilt Stufe ${ROM[s - 1]}, und jeder Antrag wird nach dem geltenden Recht berechnet. Nach der Übergangsregel des Entwurfs bliebe ein vor dem Stichtag bewilligtes Wohngeld bis zum Ende seines Bewilligungszeitraums unverändert. Wer einen Anspruch hat, verliert durch einen Antrag im laufenden Jahr also nichts. Familien sollten zusätzlich den Kinderzuschlag prüfen, denn der Entwurf ändert ihn nicht direkt; sinkt das Wohngeld, kann der Kinderzuschlag allein aber nicht mehr reichen, um den Bedarf zu decken. Den Vergleich rechnet der ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')}.</p>

<h2>Wohngeld in Hamburg beantragen</h2>
<p>Zuständig ist die Wohngeldstelle des Bezirksamts, in dessen Bezirk die Wohnung liegt. Der Bewilligungszeitraum beginnt mit dem Monat des Antrags und dauert in der Regel ${W.bewilligungMonate} Monate. Wer in Hamburg wohnt und im Umland arbeitet oder umgekehrt, richtet sich nach dem Wohnort: Für Gemeinden in Schleswig-Holstein oder Niedersachsen gelten eigene, oft niedrigere Mietstufen. Hinweise zu Unterlagen und Fristen gibt ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}, den Vergleich mit Berlin zeigt ${h.a('wohngeld-berlin', 'Wohngeld in Berlin')}.</p>
`;
  },
});
