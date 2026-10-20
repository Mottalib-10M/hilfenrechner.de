import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
/** Wohngeld bei Miete in Höhe des Höchstbetrags plus Klimakomponente, Arbeitnehmer mit allen drei Abzügen. */
const voll = (h: Helpers, n: number, stufe: number, brutto: number[], allein = false) =>
  h.WG.wohngeld({ personen: n, mietstufe: stufe, miete: h.WG.hoechstbetrag(n, stufe) + h.WG.klimaKomponente(n), einkommen: brutto.map((b) => ({ brutto: b })), alleinerziehend: allein }).wohngeld;
const zelle = (h: Helpers, x: number) => (x > 0 ? h.m(x) : '–');

export default definePage({
  id: 'wohngeld-tabelle',
  group: 'wohngeld',
  order: 12,
  slug: 'wohngeld-tabelle',
  nav: 'Wohngeld-Tabelle',
  card: 'Wohngeld nach Einkommen, Haushaltsgröße und Mietstufe, mit der Formel des Gesetzes berechnet.',
  title: 'Wohngeld Tabelle 2026: Beträge nach Einkommen und Mietstufe',
  description: 'Wohngeld-Tabelle 2026 für Singles, Paare, Alleinerziehende und Familien: Wohngeld im Monat nach Bruttolohn und Mietstufe I bis VII, berechnet nach § 19 WoGG.',
  h1: 'Wohngeld-Tabelle 2026 nach Einkommen und Mietstufe',
  intro: 'Wohngeld nach Bruttolohn, wenn die Miete den Höchstbetrag der Mietstufe erreicht, berechnet mit der Formel aus § 19 WoGG.',
  mini: { kind: 'mini:wohngeld' },
  related: ['wohngeld-rechner', 'wohngeld-einkommensgrenzen', 'mietstufen', 'wohngeld-2026', 'kinderzuschlag-rechner'],
  sources: ['wogg_19', 'wogg_anl1', 'wogg_anl2', 'wogg_anl3', 'wogg_12', 'wogg_16'],
  resume: (h) => {
    const a = voll(h, 1, 4, [1500]); const b = voll(h, 2, 4, [2000]); const c = voll(h, 4, 4, [3000]);
    return `Wie viel Wohngeld ein Haushalt 2026 bekommt, hängt vom Bruttolohn, von der Zahl der Haushaltsmitglieder und von der Mietstufe des Wohnorts ab. Die Tabellen auf dieser Seite sind mit der amtlichen Formel und den Werten berechnet, die seit dem ${h.date(h.P.wohngeld.from)} gelten. Sie gehen von einer Bruttokaltmiete in Höhe des Höchstbetrags plus Klimakomponente aus und von Arbeitnehmern, bei denen Steuern, Kranken- und Pflegeversicherung und Rentenbeiträge anfallen. Drei Beispiele aus Mietstufe IV, zu der etwa Berlin gehört: Eine alleinstehende Person mit ${h.m(1500)} brutto erhält ${h.m(a)} im Monat, ein Paar mit einem Verdienst von ${h.m(2000)} erhält ${h.m(b)}, eine vierköpfige Familie mit ${h.m(3000)} brutto ${h.m(c)}. In Mietstufe VII liegt das Wohngeld bei gleichem Einkommen deutlich höher, in Mietstufe I deutlich niedriger. Ist Ihre Miete niedriger als der Höchstbetrag, fällt auch das Wohngeld niedriger aus; den genauen Betrag liefert der Rechner. Unter ${h.m(h.P.wohngeld.minimum)} im Monat wird nichts ausgezahlt; diese Felder sind in den Tabellen mit einem Strich markiert.`;
  },
  faqs: (h) => [
    { q: 'Warum steht in der Wohngeld-Tabelle bei niedrigem Einkommen ein hoher Betrag?', a: `Weil die Formel bei kleinem Einkommen den größten Teil der Miete übernimmt. In der Praxis reicht Lohn plus Wohngeld dann aber oft nicht für den Lebensunterhalt. Dann ist nach § 7 WoGG das Grundsicherungsgeld vorrangig zuständig, und Wohngeld wird nicht gezahlt. Ob das bei Ihnen so ist, zeigt der Vergleich im Wohngeld-Rechner dieser Seite.` },
    { q: 'Gilt die Wohngeld-Tabelle auch, wenn meine Miete unter dem Höchstbetrag liegt?', a: `Nur als Obergrenze. Die Tabellen setzen die höchste berücksichtigungsfähige Miete an. Zahlen Sie weniger, ist M in der Formel kleiner, und das Wohngeld sinkt ungefähr um den gleichen Betrag, um den Ihre Miete unter dem Höchstbetrag liegt, bei hohem Einkommen etwas weniger. Die Tabelle zur Miete weiter unten zeigt das an einem Beispiel.` },
    { q: 'Sind in der Wohngeld-Tabelle Kindergeld und Kinderzuschlag enthalten?', a: 'Nein. Die Tabellen zeigen nur das Wohngeld. Kindergeld zählt beim Wohngeld nicht als Einkommen und wird zusätzlich gezahlt. Der Kinderzuschlag der Familienkasse kommt ebenfalls oben drauf und wird beim Wohngeld nicht angerechnet. Familien mit kleinem Einkommen erhalten deshalb oft beide Leistungen zusammen, was die Tabellenwerte deutlich übersteigt.' },
    { q: 'Wie wird ein Bruttolohn zwischen zwei Tabellenzeilen umgerechnet?', a: 'Das Wohngeld verläuft zwischen den Zeilen fast gerade, Sie können also grob in der Mitte ablesen. Genauer ist der kleine Rechner oben auf der Seite, der die Formel mit Ihrem Bruttolohn und Ihrer Miete rechnet. Für Haushalte mit Elterngeld, Unterhalt oder Renten ist der vollständige Rechner nötig, weil diese Einkommen anders behandelt werden.' },
  ],
  body: (h) => {
    const W = h.P.wohngeld;
    const stufen = [1, 2, 3, 4, 5, 6, 7];
    const kopf = ['Brutto im Monat', ...stufen.map((s) => ROM[s - 1])];
    const t1 = [1000, 1200, 1400, 1600, 1800, 2000, 2200].map((b) => [h.m(b), ...stufen.map((s) => zelle(h, voll(h, 1, s, [b])))]);
    const t2 = [1400, 1800, 2200, 2600, 3000].map((b) => [h.m(b), ...stufen.map((s) => zelle(h, voll(h, 2, s, [b])))]);
    const t3 = [1200, 1600, 2000, 2400, 2800].map((b) => [h.m(b), ...stufen.map((s) => zelle(h, voll(h, 2, s, [b], true)))]);
    const t4 = [2000, 2500, 3000, 3500, 4000, 4500].map((b) => [h.m(b), ...stufen.map((s) => zelle(h, voll(h, 4, s, [b])))]);
    const hb4 = h.WG.hoechstbetrag(1, 4);
    const mieten = [hb4 - 150, hb4 - 75, hb4, hb4 + 100];
    const t5 = [1000, 1400, 1800].map((b) => [h.m(b), ...mieten.map((mi) => zelle(h, h.WG.wohngeld({ personen: 1, mietstufe: 4, miete: mi, einkommen: [{ brutto: b }] }).wohngeld))]);
    const paarMit = voll(h, 2, 3, [2200]); const allein = voll(h, 2, 3, [2200], true);
    const minimumFeld = voll(h, 1, 1, [2200]);
    return `
<h2>So lesen Sie die Tabellen</h2>
<p>Jede Tabelle steht für einen Haushaltstyp. Die Zeilen sind Bruttolöhne im Monat, die Spalten die Mietstufen I bis VII. In jedem Feld steht das Wohngeld im Monat in Euro, gerundet wie im Bescheid. Ein Strich bedeutet: Die Formel ergibt weniger als ${h.m(W.minimum)}, es besteht also kein Anspruch. Für alle Werte gelten dieselben Annahmen:</p>
<ul>
<li>Die Bruttokaltmiete entspricht genau dem Höchstbetrag der Mietstufe zuzüglich der Klimakomponente. Höhere Mieten bringen kein höheres Wohngeld.</li>
<li>Das Einkommen ist Arbeitslohn. Abgezogen werden der Arbeitnehmer-Pauschbetrag von ${h.m(W.werbungskosten)} im Jahr und drei Pauschalen von je ${h.pc(W.abzugSatz)} nach § 16 WoGG.</li>
<li>Es gibt kein weiteres Einkommen: keine Rente, kein Elterngeld, keinen Unterhalt. Kindergeld spielt beim Wohngeld keine Rolle.</li>
<li>Freibeträge sind nur dort eingerechnet, wo es gesagt wird, etwa der Freibetrag für Alleinerziehende von ${h.m(W.freibetragAlleinerziehend)} im Jahr.</li>
</ul>
<p>Die Tabellen sind ein Orientierungsrahmen. Ihr tatsächliches Wohngeld kann niedriger sein, wenn Ihre Miete unter dem Höchstbetrag liegt, oder höher, wenn Freibeträge für Schwerbehinderung oder Grundrente greifen. Und sie sagen nichts darüber, ob Sie Wohngeld bekommen oder stattdessen Grundsicherungsgeld; darauf geht der letzte Abschnitt ein.</p>

<h2>Alleinstehende</h2>
${h.table(kopf, t1, 'Eine Person, Wohngeld im Monat nach Mietstufe. Eigene Berechnung nach § 19 WoGG.', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Für eine alleinstehende Person liegt der Höchstbetrag zwischen ${h.m(W.hoechstbetrag[0][0])} und ${h.m(W.hoechstbetrag[0][6])}. Das erklärt den großen Abstand zwischen den Spalten: Bei ${h.m(1400)} brutto bekommt man in Stufe I ${zelle(h, voll(h, 1, 1, [1400]))}, in Stufe VII ${zelle(h, voll(h, 1, 7, [1400]))}. Mit jedem zusätzlichen Euro Lohn sinkt das Wohngeld um einen Teil davon, nicht um den vollen Betrag. Arbeit lohnt sich also auch im Wohngeldbezug. Ab etwa ${h.m(2200)} brutto ist in den unteren Stufen Schluss: In Stufe I ergibt die Formel dann ${minimumFeld > 0 ? h.m(minimumFeld) : `weniger als ${h.m(W.minimum)}`}. Wer genau wissen will, bei welchem Lohn die Grenze liegt, findet die Werte unter ${h.a('wohngeld-einkommensgrenzen', 'Wohngeld-Einkommensgrenzen')}.</p>

<h2>Paare ohne Kinder</h2>
${h.table(kopf, t2, 'Zwei Personen, eine Person verdient, Wohngeld im Monat nach Mietstufe. Eigene Berechnung.', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Bei Paaren rechnet die Tabelle mit einem Verdienst. Verdienen beide, ändert sich am Wohngeld wenig, solange die Summe der Bruttolöhne gleich bleibt und beide sozialversicherungspflichtig arbeiten; jeder bekommt dann den Pauschbetrag, was das Einkommen sogar etwas senkt. Anders bei einem Minijob: Hier fallen keine Steuern und keine Krankenversicherungsbeiträge an, deshalb zieht die Wohngeldstelle nur ${h.pc(W.abzugSatz)} statt ${h.pc(3 * W.abzugSatz)} ab, und der Minijob zählt stärker.</p>

<h2>Alleinerziehende mit einem Kind</h2>
${h.table(kopf, t3, `Zwei Personen, Alleinerziehende mit Freibetrag von ${h.m(W.freibetragAlleinerziehend)} im Jahr, Wohngeld im Monat. Eigene Berechnung.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Für Alleinerziehende mit Kindern unter 18 Jahren zieht die Wohngeldstelle zusätzlich ${h.m(W.freibetragAlleinerziehend)} im Jahr vom Einkommen ab. Der Unterschied zum Paar mit gleichem Lohn ist sichtbar, aber nicht groß: Bei ${h.m(2200)} brutto in Stufe III sind es ${zelle(h, allein)} statt ${zelle(h, paarMit)}. Wichtiger ist in der Praxis, dass Unterhalt und Unterhaltsvorschuss für das Kind beim Wohngeld als Einkommen zählen. Mit einem Unterhaltsvorschuss von ${h.m(h.P.uvg.betraege[1])} für ein Schulkind sinkt das Wohngeld spürbar. Wer Unterhalt bekommt, rechnet deshalb besser mit dem ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')}, der diese Zahlungen berücksichtigt. Weitere Leistungen für diese Familien stehen unter ${h.a('alleinerziehend-leistungen', 'Leistungen für Alleinerziehende')}.</p>

<h2>Familien mit zwei Kindern</h2>
${h.table(kopf, t4, 'Vier Personen, ein Verdienst, Wohngeld im Monat nach Mietstufe. Eigene Berechnung.', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Bei vier Personen reicht das Wohngeld weit in mittlere Einkommen hinein. Eine Familie mit ${h.m(3500)} brutto bekommt in Mietstufe IV noch ${zelle(h, voll(h, 4, 4, [3500]))} im Monat. Hinzu kommen Kindergeld von ${h.m(2 * h.P.kindergeld.betrag)} für zwei Kinder und gegebenenfalls Kinderzuschlag bis zu ${h.m(2 * h.P.kiz.hoechst)}. Wie Wohngeld und Kinderzuschlag zusammenwirken, zeigt der ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')}.</p>

<h2>Was eine niedrigere Miete ausmacht</h2>
${h.table(['Brutto im Monat', `${h.m(mieten[0])} Miete`, `${h.m(mieten[1])} Miete`, `${h.m(mieten[2])} Miete`, `${h.m(mieten[3])} Miete`], t5, 'Eine Person, Mietstufe IV, Wohngeld im Monat bei verschiedenen Bruttokaltmieten. Eigene Berechnung.', ['l', 'r', 'r', 'r', 'r'])}
<p>Die Tabelle zeigt drei Dinge. Erstens: Liegt die Miete unter dem Höchstbetrag, sinkt das Wohngeld etwa im gleichen Maß. Zweitens: Eine Miete über dem Höchstbetrag bringt nur bis zur Klimakomponente von ${h.m2(W.klima[0])} mehr, darüber nichts. Drittens: Bei kleinem Einkommen ist der Einfluss der Miete stärker als bei höherem, weil die Formel dann einen größeren Teil der Miete trägt.</p>\n<p>Für die Wohnungssuche heißt das: Eine Wohnung, deren Bruttokaltmiete den Höchstbetrag deutlich übersteigt, wird durch das Wohngeld nicht bezahlbarer als eine Wohnung genau am Höchstbetrag. Den Unterschied tragen Sie vollständig selbst. Wer umzieht, sollte die Höchstbeträge seiner Haushaltsgröße kennen; sie stehen für alle Stufen unter ${h.a('wohngeld-2026', 'Wohngeld 2026')}. Ziehen Sie in eine andere Gemeinde, kann sich mit dem Ort auch die Mietstufe ändern, und damit die ganze Spalte, aus der Sie ablesen.</p>

<h2>Wie stark das Wohngeld bei einer Lohnerhöhung sinkt</h2>
<p>Aus den Tabellen lässt sich ablesen, wie viel von einer Lohnerhöhung beim Haushalt ankommt. Steigt das Brutto einer alleinstehenden Person in Mietstufe IV von ${h.m(1400)} auf ${h.m(1600)}, sinkt das Wohngeld von ${zelle(h, voll(h, 1, 4, [1400]))} auf ${zelle(h, voll(h, 1, 4, [1600]))}, also um ${h.m(voll(h, 1, 4, [1400]) - voll(h, 1, 4, [1600]))}. Von ${h.m(200)} mehr brutto gehen damit gut ein Drittel an Wohngeld verloren, dazu kommen Steuern und Sozialabgaben. Bei der vierköpfigen Familie ist der Rückgang je ${h.m(500)} Lohn mit ${h.m(voll(h, 4, 4, [3000]) - voll(h, 4, 4, [3500]))} etwas schwächer, weil die Werte der Formel für größere Haushalte flacher verlaufen. Unterm Strich bleibt in beiden Beispielen von einer Lohnerhöhung mehr übrig, als durch das geringere Wohngeld verloren geht.</p>
<p>Ganz anders liegt es beim Grundsicherungsgeld. Dort bleiben vom Lohn über ${h.m(h.P.gsg.freibetrag.stufen[1][1])} brutto nur noch ${h.pc(h.P.gsg.freibetrag.stufen[1][2])} oder weniger übrig, der Rest wird angerechnet. Für Haushalte an der Grenze zwischen beiden Leistungen ist das ein wichtiger Unterschied: Wer mit etwas mehr Arbeit ins Wohngeld wechselt, behält von jedem zusätzlichen Euro deutlich mehr.</p>

<h2>Drei Haushalte, drei Ergebnisse</h2>
<p><strong>Eine Pflegehelferin in Leipzig</strong> (Mietstufe ${ROM[h.P.wohngeld.mietstufen['Leipzig'] - 1]}) verdient ${h.m(1800)} brutto und zahlt eine Bruttokaltmiete, die den Höchstbetrag erreicht. Laut Tabelle bekommt sie ${zelle(h, voll(h, 1, h.P.wohngeld.mietstufen['Leipzig'], [1800]))} Wohngeld im Monat.</p>
<p><strong>Ein Paar in Hannover</strong> (Mietstufe ${ROM[h.P.wohngeld.mietstufen['Hannover'] - 1]}), sie arbeitet in Vollzeit mit ${h.m(2600)} brutto, er ist in Ausbildung ohne eigenes Einkommen. Das Wohngeld beträgt ${zelle(h, voll(h, 2, h.P.wohngeld.mietstufen['Hannover'], [2600]))}.</p>
<p><strong>Eine Familie mit zwei Kindern in Frankfurt am Main</strong> (Mietstufe ${ROM[h.P.wohngeld.mietstufen['Frankfurt am Main'] - 1]}) mit ${h.m(4000)} brutto aus einem Verdienst erhält ${zelle(h, voll(h, 4, h.P.wohngeld.mietstufen['Frankfurt am Main'], [4000]))} Wohngeld, dazu Kindergeld und, je nach Miete, Kinderzuschlag.</p>
<p>In allen drei Fällen gilt: Liegt die tatsächliche Miete niedriger, ist auch das Wohngeld niedriger. Ein Gang zum Rechner mit den eigenen Zahlen ersetzt die Tabelle nicht, er macht sie konkret.</p>

<h2>Wohngeld oder Grundsicherungsgeld?</h2>
<p>Die oberen Zeilen der Tabellen zeigen hohe Beträge. Ob ein Haushalt sie tatsächlich bekommt, ist eine andere Frage. Wohngeld gibt es nur, wenn Lohn und Wohngeld zusammen den Bedarf nach dem SGB II decken; sonst ist das Jobcenter zuständig, und Wohngeld ist ausgeschlossen. Für eine alleinstehende Person liegt dieser Bedarf beim Regelbedarf von ${h.m(h.P.regelbedarf.rbs1)} plus Miete und Heizung, abzüglich der Freibeträge auf den Lohn. Bei sehr kleinen Löhnen kippt die Rechnung deshalb zum Grundsicherungsgeld, bei mittleren Löhnen zum Wohngeld. Die Seite ${h.a('wohngeld-oder-grundsicherung', 'Wohngeld oder Grundsicherungsgeld')} erklärt die Grenze, der ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')} prüft sie für Ihren Haushalt.</p>
${h.box('Methode', `<p>Alle Werte berechnet der Rechenkern dieser Website mit der Formel aus § 19 WoGG, den Höchstbeträgen aus Anlage 1, den Werten a, b und c aus Anlage 2 und den Rechenschritten aus Anlage 3. Stand der Berechnung: ${h.date(h.TODAY)}. Einzelheiten unter ${h.a('method', 'Methodik')}.</p>`)}
`;
  },
});
