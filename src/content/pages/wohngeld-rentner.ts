import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Wohngeld für eine Rente: Jahresrente minus 10 % für Kranken- und Pflegeversicherung, optional Grundrentenfreibetrag (§ 17a WoGG). */
function wgRente(h: Helpers, rente: number, personen = 1, stufe = 3, miete = 480, grundrente = false) {
  const W = h.P.wohngeld; const G = W.grundrente;
  let jahr = rente * 12 * (1 - W.abzugSatz);
  let fb = 0;
  if (grundrente) { fb = Math.min(G.grund + G.satz * Math.max(0, rente * 12 - G.grund), G.maxAnteilRbs1 * h.P.regelbedarf.rbs1 * 12); jahr -= fb; }
  return { r: h.WG.wohngeld({ personen, mietstufe: stufe, miete, einkommen: [{ brutto: 0, sonstiges: Math.max(0, jahr) / 12, abzuege: 0 }] }), fb };
}

export default definePage({
  id: 'wohngeld-rentner',
  group: 'wohngeld',
  order: 16,
  slug: 'wohngeld-rentner',
  nav: 'Wohngeld für Rentner',
  card: 'Wohngeld bei kleiner Rente: was zählt, Grundrentenfreibetrag und Abgrenzung zur Grundsicherung im Alter.',
  title: 'Wohngeld für Rentner 2026: Rente, Freibetrag und Rechner',
  description: 'Wohngeld für Rentner: welche Rente zählt, Abzug für die Krankenversicherung, Grundrentenfreibetrag nach § 17a WoGG und Grenze zur Grundsicherung im Alter.',
  h1: 'Wohngeld für Rentnerinnen und Rentner',
  intro: 'Rentnerhaushalte sind eine der größten Gruppen im Wohngeld. Tragen Sie Ihre Rente unter „sonstiges Einkommen“ ein, dazu Miete und Wohnort; der Rechner zeigt das Wohngeld.',
  tool: { kind: 'haushalt', props: { kinder: '', brutto1: 0, sonstiges: 1100, miete: 480, heizung: 70, ort: 'stufe-3' } },
  related: ['wohngeld-rechner', 'wohngeld-einkommensgrenzen', 'wohngeld-antrag', 'mietstufen', 'wohngeld-2026'],
  sources: ['wogg_14', 'wogg_16', 'wogg_17a', 'wogg_7', 'sgb12_41'],
  resume: (h) => {
    const a = wgRente(h, 1100);
    return `Für das Wohngeld zählt die Rente nicht netto, sondern im Wesentlichen mit ihrem Bruttobetrag, einschließlich des steuerfreien Teils (§ 14 WoGG). Davon zieht die Wohngeldstelle pauschal ${h.pc(h.P.wohngeld.abzugSatz)} ab, wenn Beiträge zur Kranken- und Pflegeversicherung gezahlt werden, und weitere ${h.pc(h.P.wohngeld.abzugSatz)}, falls Einkommensteuer anfällt (§ 16 WoGG). Wer mindestens ${h.P.wohngeld.grundrente.jahre} Jahre Grundrentenzeiten hat, bekommt einen Freibetrag von ${h.m(h.P.wohngeld.grundrente.grund)} im Jahr plus ${h.pc(h.P.wohngeld.grundrente.satz)} der übrigen Rente, höchstens ${h.pc(h.P.wohngeld.grundrente.maxAnteilRbs1)} der Regelbedarfsstufe 1 im Monat (§ 17a WoGG). Ein Beispiel: Eine alleinstehende Rentnerin mit ${h.m(1100)} Rente und ${h.m(480)} Bruttokaltmiete in einer Gemeinde der Mietstufe III erhält nach unserer Rechnung rund ${h.m(a.r.wohngeld)} Wohngeld im Monat. Reichen Rente und Wohngeld nicht für den Lebensunterhalt, ist die Grundsicherung im Alter nach dem SGB XII beim Sozialamt zuständig; sie schließt Wohngeld aus (§ 7 WoGG). Diese Leistung rechnet unser Werkzeug nicht.`;
  },
  faqs: (h) => [
    { q: 'Wird die Witwenrente beim Wohngeld angerechnet?', a: 'Ja. Alle Renten zählen zum Einkommen des Haushalts: Altersrente, Erwerbsminderungsrente, Witwen- und Witwerrente, Betriebsrenten und private Renten. Bei gesetzlichen Renten zählt auch der Teil, der steuerfrei bleibt. Die Wohngeldstelle zieht die Pauschalen nach § 16 WoGG ab, je nachdem, welche Beiträge und Steuern tatsächlich gezahlt werden.' },
    { q: 'Wie erfahre ich, ob ich Anspruch auf den Grundrentenfreibetrag habe?', a: `Der Freibetrag setzt mindestens ${h.P.wohngeld.grundrente.jahre} Jahre Grundrentenzeiten voraus: Pflichtbeitragszeiten aus Beschäftigung, Kindererziehung oder Pflege. Ob Sie diese Zeiten haben, steht in Ihrer Rentenauskunft oder im Rentenbescheid; wer einen Grundrentenzuschlag bekommt, erfüllt die Voraussetzung. Geben Sie im Wohngeldantrag an, dass Sie die Zeiten haben, und legen Sie den Nachweis bei.` },
    { q: 'Bekomme ich als Rentner Wohngeld oder Grundsicherung im Alter?', a: 'Das hängt davon ab, ob Rente und Wohngeld zusammen Ihren Bedarf decken. Wenn ja, gibt es Wohngeld, und das Sozialamt verweist darauf. Wenn nein, zahlt das Sozialamt Grundsicherung im Alter einschließlich der angemessenen Miete; Wohngeld ist dann ausgeschlossen. Im Zweifel stellen Sie beide Anträge, die Ämter klären die Zuständigkeit untereinander.' },
    { q: 'Warum zeigt der Rechner für meine Rente weniger Wohngeld als die Tabelle auf dieser Seite?', a: `Der Rechner setzt das unter „sonstiges Einkommen“ eingetragene Geld ohne Abzug an, so als wäre es bereits ein Nettobetrag. Die Tabelle rechnet wie die Wohngeldstelle mit dem Bruttobetrag der Rente und dem Abzug von ${h.pc(h.P.wohngeld.abzugSatz)} für die Krankenversicherung. Tragen Sie im Rechner deshalb Ihre Bruttorente minus ${h.pc(h.P.wohngeld.abzugSatz)} ein, dann stimmen beide Ergebnisse überein.` },
  ],
  body: (h) => {
    const W = h.P.wohngeld;
    const z = (x: number) => (x > 0 ? h.m(x) : '–');
    const zeilen = [900, 1100, 1300, 1500, 1700].map((r) => [h.m(r), z(wgRente(h, r).r.wohngeld), z(wgRente(h, r, 2, 3, 580).r.wohngeld), z(wgRente(h, r, 1, 3, 480, true).r.wohngeld)]);
    const g = wgRente(h, 1100, 1, 3, 480, true);
    return `
<h2>Wohngeld bei kleiner Rente in Zahlen</h2>
${h.table(['Rente brutto im Monat', 'Alleinstehend', 'Paar (eine Rente)', 'Alleinstehend mit Grundrentenzeiten'], zeilen, `Mietstufe III; Bruttokaltmiete ${h.m(480)} für eine Person, ${h.m(580)} für zwei; Abzug von ${h.pc(W.abzugSatz)} für die Kranken- und Pflegeversicherung, keine Steuer. Eigene Berechnung nach § 19 WoGG.`, ['r', 'r', 'r', 'r'])}
<p>Die letzte Spalte zeigt, wie stark der Grundrentenfreibetrag wirkt. Bei ${h.m(1100)} Rente ist er auf den Höchstbetrag von ${h.m(g.fb)} im Jahr begrenzt; das Wohngeld steigt dadurch auf ${h.m(g.r.wohngeld)}. Ohne Grundrentenzeiten fällt das Wohngeld bei höheren Renten früher weg. Ob eine Rente überhaupt zu Wohngeld führt, hängt außerdem stark von Miete und Mietstufe ab; die Grenzen für alle Stufen stehen unter ${h.a('wohngeld-einkommensgrenzen', 'Wohngeld-Einkommensgrenzen')}.</p>

<h2>Welche Rente zählt und wie</h2>
<p>Die Wohngeldstelle rechnet mit dem Jahreseinkommen. Bei der gesetzlichen Rente ist das der Zahlbetrag vor Abzug der Beiträge zur Kranken- und Pflegeversicherung, einschließlich des Teils, der nicht der Einkommensteuer unterliegt; das WoGG zählt ihn ausdrücklich mit (§ 14 Abs. 2). Betriebsrenten und private Renten kommen hinzu, ebenso Kapitalerträge und Mieteinnahmen. Vom Ergebnis werden Pauschalen abgezogen: ${h.pc(W.abzugSatz)}, wenn Kranken- und Pflegeversicherungsbeiträge gezahlt werden, was bei fast allen Rentnern der Fall ist, und weitere ${h.pc(W.abzugSatz)}, wenn Einkommensteuer zu erwarten ist. Rentenversicherungsbeiträge fallen im Ruhestand meist nicht mehr an.</p>
<p>Im Rechner oben tragen Sie die Rente unter „sonstiges Einkommen“ ein. Das Feld wird ohne Pauschalabzug angesetzt. Um wie die Wohngeldstelle zu rechnen, geben Sie die Bruttorente minus ${h.pc(W.abzugSatz)} ein, bei einer Rente von ${h.m(1100)} also ${h.m(1100 * (1 - W.abzugSatz))}.</p>

<h2>Grundsicherung im Alter: die Grenze nach unten</h2>
<p>Wer die Regelaltersgrenze erreicht hat oder dauerhaft voll erwerbsgemindert ist und seinen Lebensunterhalt nicht aus eigenem Einkommen und Vermögen bestreiten kann, hat Anspruch auf Grundsicherung im Alter und bei Erwerbsminderung nach dem SGB XII (§ 41 SGB XII). Zuständig ist das Sozialamt, nicht das Jobcenter. Diese Leistung deckt den Regelbedarf von ${h.m(h.P.regelbedarf.rbs1)} für Alleinstehende und die angemessenen Kosten von Unterkunft und Heizung. Wer sie bezieht, ist vom Wohngeld ausgeschlossen (§ 7 Abs. 1 Nr. 5 WoGG).</p>
<p>Unser Rechner rechnet die Grundsicherung im Alter nicht. Sein Vergleich mit dem Grundsicherungsgeld des SGB II gilt für erwerbsfähige Menschen unter der Altersgrenze. Für Rentnerinnen und Rentner gibt er deshalb nur einen Anhaltspunkt: Zeigt er, dass Rente und Wohngeld zusammen unter dem Bedarf aus Regelbedarf und Miete liegen, sollten Sie beim Sozialamt Grundsicherung im Alter beantragen. Freibeträge für Renten mit Grundrentenzeiten gibt es auch dort, mit eigenen Regeln.</p>
${h.box('Beide Anträge sind erlaubt', '<p>Wer unsicher ist, ob Wohngeld oder Grundsicherung im Alter zusteht, darf beide beantragen. Wird die Grundsicherung abgelehnt, weil Wohngeld reicht, beginnt das Wohngeld ab dem Monat der Ablehnung, wenn der Wohngeldantrag bis zum Ende des Folgemonats gestellt ist (§ 25 Abs. 3 WoGG).</p>', 'tip')}

<h2>Was sonst für Rentnerhaushalte gilt</h2>
<ul>
<li>Lebt ein Paar zusammen, zählen beide Renten. Die Höchstbeträge und die Formel richten sich nach zwei Personen.</li>
<li>Ein Schwerbehindertenausweis mit einem Grad der Behinderung von 100 oder häusliche Pflegebedürftigkeit bringt einen Freibetrag von ${h.m(W.freibetragSchwerbehindert)} im Jahr (§ 17 WoGG).</li>
<li>Weil sich Renten selten ändern, bewilligt die Wohngeldstelle oft für mehr als ${W.bewilligungMonate} Monate, bis zu ${W.bewilligungMax}. Eine Rentenanpassung führt nur dann zu einer Neuberechnung, wenn das Einkommen um mehr als ${h.pc(W.amtswegenSchwelle)} steigt.</li>
<li>Eigentümer im Ruhestand erhalten statt des Mietzuschusses einen Lastenzuschuss für ihre selbst genutzte Wohnung.</li>
</ul>
<p>Wie der Antrag abläuft und welche Unterlagen nötig sind, steht unter ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}. Für den Rentenbescheid genügt meist die letzte Rentenanpassungsmitteilung.</p>
`;
  },
});
