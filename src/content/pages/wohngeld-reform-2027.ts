import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

/**
 * Wohngeld nach dem Gesetzentwurf BT-Drs. 21/8284 (nicht beschlossen): gleiche Höchstbeträge, Klimakomponente,
 * Werte a und b und Mindestwerte; halbierter Heizkostenbetrag und neue Werte c. Nur für die Beispielrechnung.
 */
function entwurf(h: Helpers, n: number, stufe: number, miete: number, brutto: number) {
  const W = h.P.wohngeld; const E = W.entwurf2027; const i = Math.min(n, 12) - 1;
  const heiz = n <= 5 ? E.heizkosten[n - 1] : E.heizkosten[4] + (n - 5) * E.heizkostenMehr;
  const mieteB = Math.min(miete, h.WG.hoechstbetrag(n, stufe) + h.WG.klimaKomponente(n));
  const Y0 = h.WG.jahreseinkommen({ brutto }) / 12;
  const M = Math.max(mieteB + heiz, W.mindest.M[i]); const Y = Math.max(Y0, W.mindest.Y[i]);
  const r10 = (x: number) => Math.round(x * 1e10) / 1e10;
  const z1 = r10(W.formel.a[i] + W.formel.b[i] * M + E.c[i] * Y);
  let wg = Math.round(r10(W.formelFaktor * r10(M - r10(z1 * Y))) + 1e-9);
  if (wg < W.minimum) wg = 0;
  return Math.max(0, wg);
}
const heute = (h: Helpers, n: number, stufe: number, miete: number, brutto: number) => h.WG.wohngeld({ personen: n, mietstufe: stufe, miete, einkommen: [{ brutto }] }).wohngeld;

export default definePage({
  id: 'wohngeld-reform-2027',
  group: 'wohngeld',
  order: 17,
  slug: 'wohngeld-reform-2027',
  nav: 'Wohngeldreform 2027 (Entwurf)',
  card: 'Was der Gesetzentwurf zum Wohngeld ab 2027 ändern würde, mit Beispielrechnungen. Noch nicht beschlossen.',
  title: 'Wohngeldreform 2027: was der Gesetzentwurf ändern würde',
  description: 'Wohngeldreform 2027 als Entwurf: keine Erhöhung, halbe Heizkostenkomponente, neue Formelwerte und Mietstufen, Beispiele heute und danach. BT-Drucksache 21/8284.',
  h1: 'Wohngeldreform 2027: der Gesetzentwurf im Überblick',
  intro: 'Die Bundesregierung will das Wohngeld zum 1. Januar 2027 umbauen und dabei sparen. Der Entwurf liegt dem Bundestag vor, beschlossen ist er nicht. Diese Seite zeigt, was er für Haushalte bedeuten würde.',
  mini: { kind: 'mini:wohngeld' },
  related: ['wohngeld-2026', 'mietstufen', 'wohngeld-rechner', 'wohngeld-hamburg', 'wohngeld-tabelle'],
  sources: ['btd_21_8284', 'wogg_12', 'wogg_anl2', 'wogg_19', 'bgbl_2024_314'],
  resume: (h) => {
    const E = h.P.wohngeld.entwurf2027;
    const a = heute(h, 1, 4, 600, 1500), b = entwurf(h, 1, 4, 600, 1500);
    return `Die Bundesregierung hat am ${h.date(E.datum)} den Entwurf eines Gesetzes zur Vereinfachung und Fortentwicklung des Wohngeldgesetzes in den Bundestag eingebracht (BT-Drucksache ${E.drucksache}). Am ${h.date(h.TODAY)} ist er nicht beschlossen; es gilt weiter das Recht seit dem ${h.date(h.P.wohngeld.letzteErhoehung)}. Der Entwurf soll am ${h.date(E.inkraftGeplant)} in Kraft treten und würde vier Dinge ändern, die den Betrag betreffen: Die regelmäßige Erhöhung zum ${h.date(E.inkraftGeplant)} entfiele. Der Heizkostenbetrag würde halbiert, für eine Person von ${h.m2(h.P.wohngeld.heizkosten[0])} auf ${h.m2(E.heizkosten[0])}. Der Wert c der Wohngeldformel stiege, sodass höhere Einkommen stärker angerechnet würden. Und neue Mietstufen auf Grundlage der ${E.datenMietstufen} kämen hinzu, etwa für Hamburg Stufe ${ROM[E.mietstufen['Hamburg'] - 1]} statt ${ROM[h.P.wohngeld.mietstufen['Hamburg'] - 1]}. Nach unserer Rechnung bekäme eine alleinstehende Person in Mietstufe IV mit ${h.m(1500)} brutto und ${h.m(600)} Bruttokaltmiete nach dem Entwurf ${h.m(b)} statt ${h.m(a)} im Monat. Die Höchstbeträge für die Miete blieben gleich. Ob der Bundestag den Entwurf so beschließt, ist offen.`;
  },
  faqs: (h) => [
    { q: 'Ist die Wohngeldkürzung 2027 schon beschlossen?', a: `Nein. Am ${h.date(h.TODAY)} liegt nur der Gesetzentwurf der Bundesregierung vor, BT-Drucksache ${h.P.wohngeld.entwurf2027.drucksache} vom ${h.date(h.P.wohngeld.entwurf2027.datum)}. Der Bundestag muss ihn beraten und beschließen, der Bundesrat ist beteiligt. Änderungen im Verfahren sind möglich. Erst mit der Verkündung im Bundesgesetzblatt wird daraus geltendes Recht. Bis dahin gelten die bisherigen Beträge.` },
    { q: 'Was passiert mit meinem laufenden Wohngeldbescheid, wenn die Reform kommt?', a: `Nach der Übergangsregel des Entwurfs (neuer § 42e WoGG) bliebe es bis zum Ende des laufenden Bewilligungszeitraums beim bewilligten Betrag, wenn das Wohngeld vor dem ${h.date(h.P.wohngeld.entwurf2027.inkraftGeplant)} bewilligt wurde. Erst der Weiterleistungsantrag würde nach neuem Recht berechnet. Muss die Wohngeldstelle wegen einer Änderung neu entscheiden, gälte ab dem Stichtag das neue Recht. Das alles gilt nur, wenn das Gesetz so beschlossen wird.` },
    { q: 'Würde die Reform auch das Grundsicherungsgeld betreffen?', a: 'Indirekt ja. Die Bundesregierung rechnet in ihrem Entwurf selbst damit, dass mehr Haushalte statt Wohngeld Grundsicherungsgeld oder Sozialhilfe beziehen: Die Ausgaben für das SGB II und SGB XII würden steigen, die für Wohngeld und Kinderzuschlag sinken. Für Haushalte an der Grenze könnte sich der richtige Weg also vom Wohngeld zum Jobcenter verschieben.' },
    { q: 'Ändern sich mit der Reform die Höchstbeträge für die Miete?', a: 'Nein. Nach dem Entwurf blieben die Höchstbeträge je Haushaltsgröße und Mietstufe gleich, die Klimakomponente würde nur in die Tabelle der Höchstbeträge verschoben. Wohl aber änderte sich für einige Gemeinden die Mietstufe, und damit der Höchstbetrag, der für sie gilt. Wer in eine niedrigere Stufe rutscht, hätte einen niedrigeren Höchstbetrag.' },
  ],
  body: (h) => {
    const W = h.P.wohngeld; const E = W.entwurf2027;
    const heiz = [1, 2, 3, 4, 5].map((n) => [String(n), h.m2(W.heizkosten[n - 1]), h.m2(E.heizkosten[n - 1]), h.m2(W.heizkosten[n - 1] - E.heizkosten[n - 1])]);
    const cTab = [1, 2, 3, 4, 5].map((n) => [String(n), h.dec(W.formel.c[n - 1] * 1e5, 3), h.dec(E.c[n - 1] * 1e5, 3)]);
    const faelle: Array<[string, number, number, number, number]> = [
      ['1 Person, Stufe IV, 1.000 € brutto', 1, 4, 520, 1000],
      ['1 Person, Stufe IV, 1.500 € brutto', 1, 4, 600, 1500],
      ['2 Personen, Stufe III, 2.000 € brutto', 2, 3, 600, 2000],
      ['4 Personen, Stufe IV, 3.000 € brutto', 4, 4, 900, 3000],
      ['4 Personen, Stufe IV, 4.000 € brutto', 4, 4, 900, 4000],
    ];
    const bsp = faelle.map(([t, n, s, mi, b]) => { const a = heute(h, n, s, mi, b), e = entwurf(h, n, s, mi, b); return [t, h.m(mi), h.m(a), h.m(e), h.m(e - a)]; });
    const hh = W.mietstufen['Hamburg'], hhN = E.mietstufen['Hamburg'];
    const hhA = heute(h, 1, hh, 650, 1600), hhE = entwurf(h, 1, hhN, 650, 1600);
    return `
<h2>Stand des Verfahrens</h2>
<p>Der Entwurf trägt den Titel „Entwurf eines Gesetzes zur Vereinfachung und Fortentwicklung des Wohngeldgesetzes“. Die Bundesregierung hat ihn dem Bundestag mit Drucksache ${h.src('btd_21_8284', E.drucksache)} vom ${h.date(E.datum)} zugeleitet. Der Bundesrat hat am ${h.date(E.bundesratStellungnahme)} dazu Stellung genommen und Änderungen verlangt, die Bundesregierung hat geantwortet. Als Datum des Inkrafttretens ist der ${h.date(E.inkraftGeplant)} vorgesehen. Am ${h.date(h.TODAY)} hat der Bundestag das Gesetz nicht beschlossen. Alles auf dieser Seite beschreibt deshalb einen Plan, kein geltendes Recht. Für Ihren Antrag und Ihren Bescheid gelten die Regeln unter ${h.a('wohngeld-2026', 'Wohngeld 2026')}. Zahlen, die in Medien als „neues Wohngeld“ kursieren, sind Schätzungen auf Grundlage dieses Entwurfs.</p>

<h2>Begründung der Bundesregierung</h2>
<p>Die Bundesregierung begründet den Entwurf mit zwei Zielen: den Bundeshaushalt zu entlasten und das Verfahren in den Wohngeldstellen zu vereinfachen. Mit dem Wohngeld-Plus-Gesetz habe sich die Zahl der Wohngeldhaushalte verdoppelt, der Aufwand in den Wohngeldstellen sei gestiegen und die Bearbeitungszeiten seien länger geworden. Die Einsparungen sollen vor allem aus drei Maßnahmen kommen: dem Aussetzen der regelmäßigen Fortschreibung, der Halbierung der Heizkostenkomponente und der Anhebung des Werts c. Zugleich rechnet der Entwurf mit höheren Ausgaben beim Grundsicherungsgeld und bei der Sozialhilfe, weil ein Teil der Haushalte dorthin wechseln würde.</p>

<h2>Was sich beim Betrag ändern würde</h2>
<h3>Keine Erhöhung zum Jahreswechsel</h3>
<p>Nach § 43 WoGG wird das Wohngeld regelmäßig an die Entwicklung von Mieten und Verbraucherpreisen angepasst; die nächste Anpassung stünde zum ${h.date(E.inkraftGeplant)} an. Der Entwurf fügt einen neuen Absatz ein: Zu diesem Datum findet keine Fortschreibung statt. Die Höchstbeträge blieben damit auf dem Stand vom ${h.date(W.letzteErhoehung)}.</p>
<h3>Halbierte Heizkostenkomponente</h3>
<p>Der Gesamtbetrag zur Entlastung bei den Heizkosten besteht aus einem Betrag wegen der CO2-Bepreisung und einer dauerhaften Heizkostenkomponente. Der Entwurf halbiert die dauerhafte Komponente; der CO2-Teil bliebe. Für eine Person sänke der Gesamtbetrag von ${h.m2(W.heizkosten[0])} auf ${h.m2(E.heizkosten[0])}.</p>
${h.table(['Personen', 'Heute', 'Nach Entwurf', 'Weniger'], heiz, `Gesamtbetrag zur Entlastung bei den Heizkosten im Monat. Entwurf: BT-Drucksache ${E.drucksache}, nicht beschlossen.`, ['l', 'r', 'r', 'r'])}
<p>Weil dieser Betrag in der Formel zur Miete addiert wird, sinkt das Wohngeld durch die Halbierung um etwas mehr als die Differenz, bei kleinen Einkommen fast im Verhältnis eins zu eins.</p>
<h3>Neuer Wert c in der Formel</h3>
<p>Die Formel aus § 19 WoGG enthält den Term c·Y·Y. Er sorgt dafür, dass das Wohngeld mit steigendem Einkommen immer schneller sinkt. Der Entwurf hebt c für alle Haushaltsgrößen an, die Werte a und b blieben. Nach der Begründung schont das Haushalte mit niedrigen Einkommen und trifft Haushalte mit höheren stärker.</p>
${h.table(['Personen', 'c heute (× 10⁻⁵)', 'c nach Entwurf (× 10⁻⁵)'], cTab, 'Werte c aus Anlage 2 WoGG heute und nach dem Entwurf.', ['l', 'r', 'r'])}
<h3>Neue Mietstufen</h3>
<p>Eine neue Anlage zur Wohngeldverordnung würde die Mietstufen auf Grundlage der ${E.datenMietstufen} neu festlegen. Manche Städte stiegen auf, andere ab. Welche großen Städte betroffen wären, zeigt die Seite ${h.a('mietstufen', 'Mietstufen')}.</p>

<h2>Beispielrechnungen: heute und nach Entwurf</h2>
${h.table(['Haushalt', 'Bruttokaltmiete', 'Wohngeld heute', 'Nach Entwurf', 'Unterschied'], bsp, `Eigene Berechnung: heute nach § 19 WoGG, Entwurf mit halbierter Heizkostenkomponente und neuen Werten c nach BT-Drucksache ${E.drucksache}; Mietstufe unverändert. Arbeitnehmer mit drei Abzügen. Nicht beschlossen.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Die Beispiele zeigen das Muster. Bei kleinem Einkommen kommt der Verlust vor allem aus der Heizkostenkomponente und liegt in der Größenordnung ihrer Halbierung. Bei höherem Einkommen kommt der neue Wert c hinzu, und der relative Verlust wird größer; für Haushalte nahe der heutigen Einkommensgrenze kann das Wohngeld ganz entfallen. In Gemeinden, die nach dem Entwurf in eine niedrigere Mietstufe rutschen, wäre der Verlust noch größer. Ein Beispiel aus Hamburg: Eine alleinstehende Person mit ${h.m(1600)} brutto und ${h.m(650)} Bruttokaltmiete bekäme heute in Stufe ${ROM[hh - 1]} ${h.m(hhA)}, nach dem Entwurf in Stufe ${ROM[hhN - 1]} ${h.m(hhE)}. Mehr dazu unter ${h.a('wohngeld-hamburg', 'Wohngeld in Hamburg')}.</p>
${h.box('Wie wir gerechnet haben', `<p>Die Spalte „Nach Entwurf“ verwendet die im Entwurf abgedruckten Werte: Heizkostenbeträge und Werte c nach den neuen Tabellen, alle übrigen Werte wie heute. Andere Änderungen des Entwurfs, etwa bei Werbungskosten oder Freibeträgen, sind nicht eingerechnet. Ändert der Bundestag den Entwurf, ändern sich auch die Ergebnisse.</p>`, 'warning')}

<h2>Wer besonders betroffen wäre</h2>
<p>Am stärksten träfe der Entwurf drei Gruppen. Erstens größere Haushalte mit mittlerem Einkommen: Bei ihnen wirkt der neue Wert c am deutlichsten, wie die vierköpfige Familie mit ${h.m(4000)} brutto in der Tabelle zeigt. Zweitens Haushalte in Gemeinden, die in eine niedrigere Mietstufe rutschen würden; unter den großen Städten sind das ${Object.entries(E.mietstufen as Record<string, number>).filter(([c, st]) => W.mietstufen[c] && st < W.mietstufen[c]).map(([c]) => c).join(', ')}. Dort sänke zusätzlich der Höchstbetrag. Drittens Beschäftigte mit hohen tatsächlichen Werbungskosten, etwa Pendler, weil nur noch die Pauschale zählen würde.</p>
<p>Weniger betroffen wären Haushalte mit sehr kleinem Einkommen: Bei ihnen spielt der Wert c kaum eine Rolle, und es bleibt im Wesentlichen der Verlust aus der Heizkostenkomponente. Gemeinden, die in eine höhere Stufe aufsteigen würden, etwa ${Object.entries(E.mietstufen as Record<string, number>).filter(([c, st]) => W.mietstufen[c] && st > W.mietstufen[c]).map(([c]) => c).join(', ')}, bekämen einen höheren Höchstbetrag, was die übrigen Kürzungen für Haushalte mit hoher Miete teilweise ausgleichen könnte.</p>

<h2>Wie es weitergeht</h2>
<p>Damit die Änderungen zum geplanten Datum wirken, müsste der Bundestag das Gesetz in zweiter und dritter Lesung beschließen, danach befasst sich der Bundesrat erneut, bevor das Gesetz ausgefertigt und im Bundesgesetzblatt verkündet wird. Im Verfahren kann sich der Inhalt noch ändern, etwa bei der Höhe der Heizkostenkomponente, den Werten c oder einzelnen Freibeträgen. Auch eine spätere Geltung ist möglich. Wir prüfen den Stand regelmäßig und passen die Seiten an, sobald ein Beschluss vorliegt.</p>

<h2>Was der Entwurf sonst vorsieht</h2>
<ul>
<li><strong>Werbungskosten:</strong> Beim Lohn würden nur noch die Pauschbeträge des Einkommensteuerrechts abgezogen, höhere tatsächliche Werbungskosten nicht mehr. Wer heute etwa wegen eines langen Arbeitswegs mehr absetzt, verlöre diesen Vorteil.</li>
<li><strong>Freibetrag bei Schwerbehinderung:</strong> Der Nachweis würde vereinfacht; maßgeblich wären ein Grad der Behinderung von 100 oder mindestens Pflegegrad 3.</li>
<li><strong>Wechselmodell:</strong> Für Kinder, die abwechselnd bei beiden getrennt lebenden Eltern wohnen, würde die Prüfung vereinfacht.</li>
<li><strong>Zahlung:</strong> Wohngeld würde nur noch auf ein Konto überwiesen.</li>
<li><strong>Übergang:</strong> Bereits bewilligtes Wohngeld bliebe bis zum Ende des laufenden Bewilligungszeitraums unverändert. Bei Anträgen, über die bis zum Jahresende noch nicht entschieden ist, bliebe es ab dem Stichtag beim höheren Betrag für Dezember, falls das neue Recht weniger ergibt.</li>
</ul>
<p>Der Bundesrat hat in seiner Stellungnahme unter anderem vorgeschlagen, den Freibetrag für Alleinerziehende anzuheben. Ob solche Vorschläge in das Gesetz eingehen, entscheidet der Bundestag.</p>

<h2>Was Sie jetzt tun können</h2>
<p>Solange der Entwurf nicht beschlossen ist, ändert sich für Ihren Antrag nichts. Wer Anspruch hat, sollte Wohngeld wie bisher beantragen, denn das geltende Recht gilt bis zum Inkrafttreten einer Änderung. Haushalte, die nach dem Entwurf aus dem Wohngeld fallen könnten, sollten prüfen, ob sie stattdessen Grundsicherungsgeld oder, mit Kindern, einen höheren Kinderzuschlag bekommen würden. Der ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')} zeigt den Vergleich nach heutigem Recht. Aus der Übergangsregel des Entwurfs folgt außerdem: Wohngeld, das vor dem ${h.date(E.inkraftGeplant)} bewilligt ist, bliebe bis zum Ende des Bewilligungszeitraums in der bisherigen Höhe, der bei gleichbleibenden Verhältnissen bis zu ${W.bewilligungMax} Monate dauern kann. Für Haushalte, die ohnehin einen Anspruch haben, ist ein Antrag im laufenden Jahr deshalb nicht von Nachteil. Diese Seite wird aktualisiert, sobald der Bundestag entschieden hat.</p>
`;
  },
});
