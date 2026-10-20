import { definePage } from '../../lib/guide-types';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default definePage({
  id: 'wohngeld-muenchen',
  group: 'wohngeld',
  order: 22,
  slug: 'wohngeld-muenchen',
  nav: 'Wohngeld München',
  card: 'Wohngeld in München (Mietstufe VII): welcher Teil hoher Mieten zählt und bis zu welchem Einkommen.',
  title: 'Wohngeld München 2026: Mietstufe VII und hohe Mieten',
  description: 'Wohngeld in München 2026: höchste Mietstufe VII, welcher Teil hoher Münchner Mieten zählt, Einkommensgrenzen je Haushaltsgröße und berechnete Beispiele.',
  h1: 'Wohngeld in München: was bei hohen Mieten ankommt',
  intro: 'München ist die einzige Großstadt in der höchsten Mietstufe VII. Trotzdem liegen viele Mieten über dem, was das Wohngeld berücksichtigt. Der Rechner ist auf München eingestellt.',
  tool: { kind: 'haushalt', props: { kinder: '', brutto1: 1900, miete: 780, heizung: 90, ort: 'München' } },
  related: ['mietstufen', 'wohngeld-einkommensgrenzen', 'wohngeld-rechner', 'wohngeld-koeln', 'wohngeld-antrag'],
  sources: ['wogv_anlage', 'wogg_anl1', 'wogg_12', 'wogg_19'],
  resume: (h) => {
    const s = h.P.wohngeld.mietstufen['München'];
    const r = h.WG.wohngeld({ personen: 1, mietstufe: s, miete: 780, einkommen: [{ brutto: 1900 }] });
    return `München hat beim Wohngeld die Mietstufe ${ROM[s - 1]}, die höchste, die das Gesetz kennt. Das bedeutet die höchsten Obergrenzen für die Miete: ${h.m(h.WG.hoechstbetrag(1, s))} für eine Person, ${h.m(h.WG.hoechstbetrag(2, s))} für zwei, ${h.m(h.WG.hoechstbetrag(3, s))} für drei und ${h.m(h.WG.hoechstbetrag(4, s))} für vier Personen, jeweils zuzüglich Klimakomponente von ${h.m2(h.WG.klimaKomponente(1))} bis ${h.m2(h.WG.klimaKomponente(4))}. Viele Münchner Bruttokaltmieten liegen trotzdem darüber, und was darüber liegt, bezuschusst das Wohngeld nicht. Ein Beispiel: Bei ${h.m(780)} Bruttokaltmiete und ${h.m(1900)} brutto berücksichtigt die Wohngeldstelle für eine alleinstehende Person nur ${h.m2(r.mieteBerueck)} der Miete und zahlt rund ${h.m(r.wohngeld)} im Monat. Weil die Höchstbeträge hoch sind, reicht das Wohngeld in München weiter in mittlere Einkommen hinein als anderswo. Zuständig ist die Wohngeldstelle der Landeshauptstadt; für Umlandgemeinden gelten eigene Stufen und eigene Stellen. Nach dem Gesetzentwurf für 2027 bliebe München in Stufe ${ROM[h.P.wohngeld.entwurf2027.mietstufen['München'] - 1]}.`;
  },
  faqs: (h) => [
    { q: 'Gilt für den Landkreis München dieselbe Mietstufe wie für die Stadt?', a: `Nicht unbedingt. Gemeinden mit mindestens ${h.num(h.P.wohngeld.einwohnerSchwelle)} Einwohnern haben eine eigene Stufe, kleinere Gemeinden die Stufe ihres Landkreises. Für größere Orte im Umland wie Unterschleißheim, Garching oder Ottobrunn steht die Stufe deshalb gesondert in der Anlage zur Wohngeldverordnung. Zuständig für den Antrag ist dort in der Regel das Landratsamt oder die Gemeinde, nicht die Stadt München.` },
    { q: 'Bekommt man in München mit einem mittleren Einkommen noch Wohngeld?', a: 'Häufiger als in anderen Städten, weil die Höchstbeträge in Stufe VII am höchsten sind. Entscheidend sind aber Haushaltsgröße und Einkommen. Eine Familie mit zwei Kindern und einem Verdienst kann bei einer Miete am Höchstbetrag auch mit einem Bruttolohn über dem Durchschnitt noch Wohngeld bekommen; die Grenzen für jede Haushaltsgröße stehen in der Tabelle auf dieser Seite.' },
    { q: 'Hilft mir das Wohngeld in München, wenn meine Miete weit über dem Höchstbetrag liegt?', a: 'Ja, aber nur bis zum Höchstbetrag plus Klimakomponente. Die Wohngeldstelle rechnet dann mit diesem Wert statt mit Ihrer tatsächlichen Miete. Der Teil darüber bleibt ohne Zuschuss. Eine Kürzung oder Ablehnung wegen einer zu teuren Wohnung gibt es beim Wohngeld nicht; anders als beim Grundsicherungsgeld müssen Sie nicht umziehen.' },
  ],
  body: (h) => {
    const s = h.P.wohngeld.mietstufen['München'];
    const bsp: Array<[number, number, number[]]> = [[1, 850, [1800]], [2, 1050, [2600]], [3, 1250, [2900]], [4, 1450, [3600]]];
    const anteil = bsp.map(([n, mi, b]) => {
      const r = h.WG.wohngeld({ personen: n, mietstufe: s, miete: mi, einkommen: b.map((x) => ({ brutto: x })) });
      return [`${n} ${n === 1 ? 'Person' : 'Personen'}`, h.m(mi), h.m2(r.mieteBerueck), h.pc(r.mieteBerueck / mi, 0), h.m(mi - r.mieteBerueck), h.m(b[0]), h.m(r.wohngeld)];
    });
    const grenze = (n: number) => { let last = 0; for (let b = 10; b <= 15000; b += 10) { const r = h.WG.wohngeld({ personen: n, mietstufe: s, miete: h.WG.hoechstbetrag(n, s) + h.WG.klimaKomponente(n), einkommen: [{ brutto: b }] }); if (r.wohngeld > 0) last = b; else if (last) break; } return last; };
    const grenzen = [1, 2, 3, 4, 5].map((n) => [String(n), h.m(h.WG.hoechstbetrag(n, s) + h.WG.klimaKomponente(n)), h.m(grenze(n))]);
    return `
<h2>Wie viel einer Münchner Miete zählt</h2>
${h.table(['Haushalt', 'Bruttokaltmiete', 'Berücksichtigt', 'Anteil', 'Nicht berücksichtigt', 'Brutto', 'Wohngeld'], anteil, `München, Mietstufe ${ROM[s - 1]}. Mieten und Löhne sind Beispielwerte; Wohngeld nach § 19 WoGG, eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt das Grundproblem in München: Auch in der höchsten Stufe deckt der Höchstbetrag nur einen Teil typischer Mieten. Bei den Beispielmieten bleiben je nach Haushalt zwischen ${h.m(Math.min(...bsp.map(([n, mi]) => mi - Math.min(mi, h.WG.hoechstbetrag(n, s) + h.WG.klimaKomponente(n)))))} und ${h.m(Math.max(...bsp.map(([n, mi]) => mi - Math.min(mi, h.WG.hoechstbetrag(n, s) + h.WG.klimaKomponente(n)))))} im Monat ohne Zuschuss, rund ein Fünftel der Miete. Das Wohngeld hilft trotzdem spürbar, denn auf den berücksichtigten Teil kommt noch der Heizkostenbetrag, und die Formel übernimmt bei kleinem Einkommen einen großen Teil davon. Wer eine Wohnung sucht, kann mit den Höchstbeträgen abschätzen, welcher Teil der Miete gefördert würde. Garagen- oder Stellplatzmieten und Möblierungszuschläge zählen dabei nicht zur Bruttokaltmiete und müssen herausgerechnet werden.</p>

<h2>Bis zu welchem Einkommen es in München Wohngeld gibt</h2>
${h.table(['Personen', 'Miete am Höchstbetrag', 'Höchster Bruttolohn mit Wohngeld'], grenzen, `Mietstufe ${ROM[s - 1]}, ein Verdienst, Arbeitnehmer mit Steuern und Sozialabgaben. Eigene Berechnung in Schritten von 10 €.`, ['l', 'r', 'r'])}
<p>In Stufe ${ROM[s - 1]} liegen die Einkommensgrenzen am höchsten. Für einen Haushalt mit vier Personen und einem Verdienst reicht der Anspruch bis zu einem Bruttolohn von rund ${h.m(grenze(4))} im Monat, für eine alleinstehende Person bis rund ${h.m(grenze(1))}. Zum Vergleich: In Mietstufe I endet der Anspruch einer alleinstehenden Person schon deutlich früher. Voraussetzung ist, dass die Miete mindestens den Höchstbetrag erreicht, was in München häufig der Fall ist. Liegt die Miete darunter oder gibt es weiteres Einkommen wie Unterhalt, sinkt die Grenze. Die Grenzen für alle Stufen zum Vergleich stehen unter ${h.a('wohngeld-einkommensgrenzen', 'Wohngeld-Einkommensgrenzen')}.</p>

<h2>Wohngeld und andere Hilfen in München</h2>
<p>Haushalte mit Kindern sollten neben dem Wohngeld den Kinderzuschlag prüfen, bis zu ${h.m(h.P.kiz.hoechst)} je Kind von der Familienkasse. Reichen Lohn, Wohngeld und Kinderzuschlag nicht für den Bedarf, ist das Jobcenter zuständig; es übernimmt die Miete nur bis zur Münchner Angemessenheitsgrenze, die die Stadt selbst festlegt und die nichts mit der Mietstufe zu tun hat. Ob für Ihren Haushalt Wohngeld oder Grundsicherungsgeld gilt, zeigt der Vergleich im Rechner oben.</p>

<h2>Wo der Antrag gestellt wird</h2>
<p>Für Wohnungen im Stadtgebiet ist die Wohngeldstelle der Landeshauptstadt München zuständig. Wer im Umland wohnt, wendet sich an seine Gemeinde oder das Landratsamt. Wohngeld gibt es ab dem Monat des Antrags, in der Regel für ${h.P.wohngeld.bewilligungMonate} Monate. Fehlende Unterlagen können Sie nachreichen; der Eingang des Antrags sichert den Monat. Mehr dazu unter ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}. Wie sich die Lage in einer Stadt der Stufe ${ROM[h.P.wohngeld.mietstufen['Köln'] - 1]} darstellt, zeigt ${h.a('wohngeld-koeln', 'Wohngeld in Köln')}.</p>
`;
  },
});
