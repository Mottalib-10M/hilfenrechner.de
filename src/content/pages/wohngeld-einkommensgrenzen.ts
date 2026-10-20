import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const STUFEN = [1, 2, 3, 4, 5, 6, 7];
type Art = 'lohn' | 'allein' | 'rente';
/** Höchstes Monatseinkommen (in 10-€-Schritten), bei dem noch Wohngeld gezahlt wird; Miete = Höchstbetrag + Klimakomponente. */
function grenze(h: Helpers, n: number, stufe: number, art: Art = 'lohn'): { brutto: number; Y: number } {
  const miete = h.WG.hoechstbetrag(n, stufe) + h.WG.klimaKomponente(n);
  let last = { brutto: 0, Y: 0 };
  for (let b = 10; b <= 15000; b += 10) {
    const einkommen = art === 'rente' ? [{ brutto: 0, sonstiges: b, abzuege: 1 }] : [{ brutto: b }];
    const r = h.WG.wohngeld({ personen: n, mietstufe: stufe, miete, einkommen, alleinerziehend: art === 'allein' });
    if (r.wohngeld > 0) last = { brutto: b, Y: r.Y };
    else if (last.brutto > 0) break;
  }
  return last;
}

export default definePage({
  id: 'wohngeld-einkommensgrenzen',
  group: 'wohngeld',
  order: 13,
  slug: 'wohngeld-einkommensgrenzen',
  nav: 'Einkommensgrenzen',
  card: 'Bis zu welchem Bruttolohn es noch Wohngeld gibt, je Haushaltsgröße und Mietstufe berechnet.',
  title: 'Wohngeld Einkommensgrenzen 2026: Höchstlohn je Haushalt',
  description: 'Wohngeld-Einkommensgrenzen 2026: bis zu welchem Bruttolohn 1 bis 5 Personen noch Wohngeld bekommen, je Mietstufe I bis VII berechnet, mit Rentenbeispiel.',
  h1: 'Einkommensgrenzen beim Wohngeld 2026',
  intro: 'Eine feste Einkommensgrenze nennt das Gesetz nicht. Wir haben sie für jede Haushaltsgröße und Mietstufe ausgerechnet.',
  mini: { kind: 'mini:wohngeld' },
  related: ['wohngeld-tabelle', 'wohngeld-rechner', 'mietstufen', 'wohngeld-rentner', 'wohngeld-2026'],
  sources: ['wogg_19', 'wogg_anl1', 'wogg_anl2', 'wogg_16', 'wogg_17', 'wogg_21'],
  resume: (h) => {
    const g1 = grenze(h, 1, 4), g2 = grenze(h, 2, 4), g4 = grenze(h, 4, 4);
    const g1a = grenze(h, 1, 1), g1g = grenze(h, 1, 7);
    return `Wohngeld bekommt, wessen Einkommen so niedrig ist, dass die Formel aus § 19 WoGG mindestens ${h.m(h.P.wohngeld.minimum)} im Monat ergibt. Daraus folgen Einkommensgrenzen, die mit der Zahl der Haushaltsmitglieder und der Mietstufe steigen. Für eine alleinstehende Arbeitnehmerin liegt die Grenze je nach Mietstufe zwischen etwa ${h.m(g1a.brutto)} (Stufe I) und ${h.m(g1g.brutto)} brutto im Monat (Stufe VII); in Mietstufe IV, zu der etwa Berlin gehört, bei rund ${h.m(g1.brutto)}. Ein Paar mit einem Verdienst kommt in Stufe IV auf rund ${h.m(g2.brutto)}, eine vierköpfige Familie auf rund ${h.m(g4.brutto)} brutto. Diese Werte gelten, wenn die Bruttokaltmiete den Höchstbetrag samt Klimakomponente erreicht und Steuern sowie Sozialabgaben gezahlt werden. Bei niedrigerer Miete liegt die Grenze tiefer, bei Freibeträgen höher. Es gibt auch eine Untergrenze: Wer so wenig verdient, dass Lohn und Wohngeld den Bedarf nach dem SGB II nicht decken, erhält Grundsicherungsgeld statt Wohngeld. Die Wohngeldstelle prüft beides im Einzelfall.`;
  },
  faqs: (h) => [
    { q: 'Gibt es beim Wohngeld eine feste Einkommensgrenze?', a: `Nein, das Gesetz nennt keinen Höchstbetrag für das Einkommen. Die Grenze ergibt sich aus der Formel: Steigt das Einkommen, sinkt das Wohngeld, bis es unter ${h.m(h.P.wohngeld.minimum)} im Monat fällt. Dann besteht nach § 21 WoGG kein Anspruch mehr. Wo genau das passiert, hängt von Miete, Haushaltsgröße, Mietstufe und Freibeträgen ab.` },
    { q: 'Zählt bei der Einkommensgrenze für Wohngeld das Brutto oder das Netto?', a: `Weder noch genau. Die Wohngeldstelle geht vom Brutto aus, zieht Werbungskosten ab, mindestens den Arbeitnehmer-Pauschbetrag, und dann pauschal je ${h.pc(h.P.wohngeld.abzugSatz)} für Steuern, Kranken- und Pflegeversicherung sowie Rente. Das tatsächliche Netto spielt keine Rolle. Bei einem normalen Arbeitsverhältnis bleiben so nach dem Pauschbetrag ${h.pc(1 - 3 * h.P.wohngeld.abzugSatz)} als Einkommen.` },
    { q: 'Erhöht ein Schwerbehindertenausweis die Einkommensgrenze beim Wohngeld?', a: `Ja, wenn der Grad der Behinderung 100 beträgt oder bei einem geringeren Grad häusliche Pflegebedürftigkeit besteht. Dann zieht die Wohngeldstelle ${h.m(h.P.wohngeld.freibetragSchwerbehindert)} im Jahr vom Einkommen ab, also ${h.m(h.P.wohngeld.freibetragSchwerbehindert / 12)} im Monat beim Gesamteinkommen. Die Einkommensgrenze verschiebt sich dadurch nach oben, beim Bruttolohn um etwas mehr als diesen Betrag, weil vorher die Pauschalen abgezogen werden.` },
    { q: 'Was passiert, wenn ich die Einkommensgrenze nur knapp überschreite?', a: `Dann ergibt die Formel einen Betrag unter ${h.m(h.P.wohngeld.minimum)}, und die Wohngeldstelle lehnt ab. Liegt Ihr Einkommen schwankend um die Grenze, etwa durch Überstunden, zählt die Prognose für die nächsten ${h.P.wohngeld.bewilligungMonate} Monate. Ein Antrag lohnt sich auch bei knappen Fällen, weil Weihnachts- und Urlaubsgeld oder Werbungskosten über dem Pauschbetrag den Ausschlag geben können.` },
  ],
  body: (h) => {
    const W = h.P.wohngeld;
    const kopf = ['Personen', ...STUFEN.map((s) => ROM[s - 1])];
    const lohn = [1, 2, 3, 4, 5].map((n) => [String(n), ...STUFEN.map((s) => h.m(grenze(h, n, s).brutto))]);
    const yTab = [1, 2, 3, 4, 5].map((n) => [String(n), ...STUFEN.map((s) => h.m(grenze(h, n, s).Y))]);
    const allein = [2, 3, 4].map((n) => [`${n} (${n - 1} ${n === 2 ? 'Kind' : 'Kinder'})`, ...STUFEN.map((s) => h.m(grenze(h, n, s, 'allein').brutto))]);
    const rente = [1, 2].map((n) => [String(n), ...STUFEN.map((s) => h.m(grenze(h, n, s, 'rente').brutto))]);
    const g1 = grenze(h, 1, 4); const g1a = grenze(h, 2, 4, 'allein'); const g2 = grenze(h, 2, 4);
    const r1 = grenze(h, 1, 3, 'rente');
    let unter = 0;
    let zwei = 0;
    const mix = h.WG.wohngeld({ personen: 2, mietstufe: 4, miete: h.WG.hoechstbetrag(2, 4) + h.WG.klimaKomponente(2), einkommen: [{ brutto: 1800 }, { brutto: 500 }] });
    for (let b = 20; b <= 15000; b += 20) { const r = h.WG.wohngeld({ personen: 2, mietstufe: 4, miete: h.WG.hoechstbetrag(2, 4) + h.WG.klimaKomponente(2), einkommen: [{ brutto: b / 2 }, { brutto: b / 2 }] }); if (r.wohngeld > 0) zwei = b; else if (zwei) break; }
    for (let b = 500; b <= 4000; b += 10) { const v = h.VG.vergleich({ paar: false, brutto: [b], kinder: [], unterhalt: 0, miete: 520, heizung: 80, mietstufe: W.mietstufen['Berlin'], elterngeld: 0, sonstiges: 0 }); if (v.empfehlung !== 'gsg') { unter = b; break; } }
    return `
<h2>Wie die Grenzen berechnet sind</h2>
<p>Für jede Kombination aus Haushaltsgröße und Mietstufe haben wir das Bruttoeinkommen in Schritten von ${h.m(10)} erhöht und jeweils das Wohngeld nach § 19 WoGG ausgerechnet, bis es unter den Mindestbetrag von ${h.m(W.minimum)} fiel. Angegeben ist der letzte Betrag, bei dem noch Wohngeld gezahlt wird. Die Annahmen sind bewusst günstig gewählt, damit die Tabelle die äußere Grenze zeigt:</p>
<ul>
<li>Die Bruttokaltmiete erreicht den Höchstbetrag der Mietstufe plus Klimakomponente. Wer weniger Miete zahlt, erreicht die Grenze früher.</li>
<li>Das ganze Einkommen ist Lohn einer Person aus einer sozialversicherungspflichtigen Beschäftigung. Abgezogen werden der Arbeitnehmer-Pauschbetrag von ${h.m(W.werbungskosten)} im Jahr und dreimal ${h.pc(W.abzugSatz)} nach § 16 WoGG.</li>
<li>Freibeträge sind nicht berücksichtigt, außer in der Tabelle für Alleinerziehende.</li>
<li>Kindergeld zählt beim Wohngeld nicht als Einkommen und ändert die Grenze deshalb nicht; Unterhalt und Unterhaltsvorschuss würden sie senken.</li>
</ul>

<h2>Grenzen für Arbeitnehmerhaushalte</h2>
${h.table(kopf, lohn, 'Höchster monatlicher Bruttolohn mit Wohngeldanspruch, ein Verdienst, Miete in Höhe des Höchstbetrags. Eigene Berechnung nach § 19 WoGG, Stand ' + h.date(h.TODAY) + '.', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Zwei Muster fallen auf. Mit jeder weiteren Person steigt die Grenze deutlich, weil Höchstbetrag und Heizkostenentlastung wachsen und die Formel für größere Haushalte weniger stark auf das Einkommen reagiert. Zwischen den Mietstufen ist der Abstand dagegen kleiner, als man vermuten könnte: Für eine Person liegen zwischen Stufe I und Stufe VII nur rund ${h.m(grenze(h, 1, 7).brutto - grenze(h, 1, 1).brutto)} Bruttolohn. Der Grund: Eine höhere Miete hebt zwar das Wohngeld bei kleinem Einkommen kräftig an, aber am oberen Ende entscheidet vor allem das Einkommen.</p>
<p>Ein Beispiel: Eine alleinstehende Person in Mietstufe IV bekommt bis etwa ${h.m(g1.brutto)} brutto Wohngeld, ein Paar mit einem Verdienst bis etwa ${h.m(g2.brutto)}. Verdienen beide Partner, zählt die Summe; weil jeder den Pauschbetrag erhält, liegt die gemeinsame Grenze etwas höher als in der Tabelle.</p>

<h2>Die Grenze als Gesamteinkommen</h2>
<p>Die Wohngeldstelle rechnet nicht mit dem Brutto, sondern mit dem monatlichen Gesamteinkommen, also dem Einkommen nach Pauschalen, Abzügen und Freibeträgen. Diese Größe ist unabhängig davon, woher das Geld stammt. Wer seine Lage nicht in der ersten Tabelle findet, etwa weil er Rente, Arbeitslosengeld oder mehrere Einkommensarten hat, kann sein Gesamteinkommen selbst schätzen und mit der folgenden Tabelle vergleichen.</p>
${h.table(kopf, yTab, 'Höchstes monatliches Gesamteinkommen (Y) mit Wohngeldanspruch, Miete in Höhe des Höchstbetrags. Eigene Berechnung.', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>So schätzen Sie Ihr Gesamteinkommen: Jahresbrutto aller Haushaltsmitglieder, minus Werbungskosten, davon je ${h.pc(W.abzugSatz)} weniger für jede Abgabe, die anfällt (Steuern, Kranken- und Pflegeversicherung, Rentenversicherung), minus Freibeträge, geteilt durch die Zahl der Monate im Jahr. Liegt das Ergebnis unter dem Wert Ihrer Zeile und Spalte, kommt Wohngeld in Betracht.</p>
<p>Ein Beispiel mit zwei Einkommensarten: Ein Paar in Mietstufe IV, sie verdient ${h.m(1800)} brutto in Teilzeit, er hat einen Minijob mit ${h.m(500)}. Ihr Lohn zählt nach Pauschbetrag und drei Abzügen, sein Minijob nach Pauschbetrag und einem Abzug. Zusammen ergibt das ein Gesamteinkommen von rund ${h.m(mix.Y)} im Monat. Die Grenze für zwei Personen in Stufe IV liegt laut Tabelle bei ${h.m(grenze(h, 2, 4).Y)}; das Paar liegt also darunter und bekommt bei einer Miete am Höchstbetrag ${h.m(mix.wohngeld)} Wohngeld. Ohne die Tabelle für Gesamteinkommen wäre dieser Fall schwer abzulesen, weil das Brutto allein nichts über die Abzüge verrät.</p>

<h2>Alleinerziehende</h2>
${h.table(['Personen', ...STUFEN.map((s) => ROM[s - 1])], allein, `Höchster monatlicher Bruttolohn mit Wohngeldanspruch, Alleinerziehende mit Freibetrag von ${h.m(W.freibetragAlleinerziehend)} im Jahr, ohne Unterhalt. Eigene Berechnung.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Alleinerziehende, die nur mit ihren minderjährigen Kindern wohnen, erhalten einen Freibetrag von ${h.m(W.freibetragAlleinerziehend)} im Jahr. Das hebt die Grenze um rund ${h.m(W.freibetragAlleinerziehend / 12)} beim Gesamteinkommen an. Eine Mutter mit einem Kind in Mietstufe IV bekommt so bis etwa ${h.m(g1a.brutto)} brutto Wohngeld. Die Tabelle setzt allerdings voraus, dass kein Unterhalt fließt. Unterhalt vom anderen Elternteil und Unterhaltsvorschuss zählen beim Wohngeld voll als Einkommen; ein Unterhaltsvorschuss von ${h.m(h.P.uvg.betraege[1])} senkt die Grenze beim Bruttolohn um deutlich mehr als diesen Betrag, weil vom Lohn vorher Pauschalen abgehen, vom Unterhalt aber nicht.</p>

<h2>Rentnerinnen und Rentner</h2>
${h.table(['Personen', ...STUFEN.map((s) => ROM[s - 1])], rente, `Höchste monatliche Rente mit Wohngeldanspruch, nur Abzug für Kranken- und Pflegeversicherung (${h.pc(W.abzugSatz)}), ohne Werbungskosten und ohne Grundrentenfreibetrag. Eigene Berechnung.`, ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Bei Renten fallen meist weder Lohnsteuer noch Rentenbeiträge an, wohl aber Beiträge zur Kranken- und Pflegeversicherung der Rentner. Die Wohngeldstelle zieht deshalb nur einmal ${h.pc(W.abzugSatz)} ab. Die Grenze liegt dadurch beim Bruttobetrag der Rente niedriger als beim Lohn: Eine alleinstehende Rentnerin in Mietstufe III erhält Wohngeld bis zu einer Rente von etwa ${h.m(r1.brutto)} im Monat. Wer mindestens ${W.grundrente.jahre} Jahre Grundrentenzeiten hat, bekommt zusätzlich den Freibetrag nach § 17a WoGG und liegt höher. Mehr dazu unter ${h.a('wohngeld-rentner', 'Wohngeld für Rentner')}.</p>

<h2>Zwei Verdienste, Minijob und Teilzeit</h2>
<p>Die erste Tabelle geht von einem Verdienst aus. Arbeiten in einem Paarhaushalt beide, ändert sich die Grenze kaum, solange beide sozialversicherungspflichtig beschäftigt sind: Jeder bekommt den Pauschbetrag, und für jeden gelten die drei Abzüge. Bei zwei Verdiensten in Mietstufe IV liegt die gemeinsame Grenze für ein Paar bei rund ${h.m(zwei)} brutto, also leicht über dem Wert mit einem Verdienst.</p>
<p>Anders bei einem Minijob bis ${h.m(W.geringfuegig)} im Monat. Hier fallen beim Beschäftigten weder Steuern noch Kranken- und Pflegeversicherungsbeiträge an, nur der Rentenbeitrag, sofern keine Befreiung beantragt wurde. Die Wohngeldstelle zieht deshalb nur einmal ${h.pc(W.abzugSatz)} ab. Ein Minijob zählt beim Wohngeld also stärker als ein gleich hoher Teil eines regulären Lohns. Wer neben einer Teilzeitstelle einen Minijob hat, sollte beide getrennt angeben; der Rechner und die Wohngeldstelle behandeln sie unterschiedlich.</p>

<h2>Prognose, Einmalzahlungen und Schwankungen</h2>
<p>Das Wohngeld rechnet mit dem Einkommen, das im Bewilligungszeitraum zu erwarten ist, in der Regel für ${W.bewilligungMonate} Monate. Grundlage sind meist die Lohnabrechnungen der letzten Monate und bekannte Änderungen. Weihnachtsgeld, Urlaubsgeld und andere Einmalzahlungen werden auf das Jahr verteilt. Wer also ${h.m(2200)} im Monat verdient und ein dreizehntes Gehalt bekommt, liegt rechnerisch höher als die Monatsabrechnung zeigt. Umgekehrt zählen Werbungskosten über dem Pauschbetrag, etwa für einen langen Arbeitsweg, und senken das Einkommen.</p>
<p>Steigt das Einkommen während des Bewilligungszeitraums um mehr als ${h.pc(W.amtswegenSchwelle)}, entscheidet die Wohngeldstelle neu; sinkt es um mehr als ${h.pc(W.neuAntragSchwelle)}, können Sie einen neuen Antrag stellen, der ein höheres Wohngeld bringt (§ 27 WoGG). Wer knapp über der Grenze liegt und mit weniger Stunden oder Kurzarbeit rechnet, sollte deshalb nicht zögern, später erneut zu beantragen.</p>

<h2>Die Untergrenze: wann das Jobcenter zuständig ist</h2>
<p>Neben der oberen gibt es eine untere Grenze, die nicht im Wohngeldgesetz steht, sondern aus dem Verhältnis zum Grundsicherungsgeld folgt. Wer mit Lohn und Wohngeld seinen Bedarf nach dem SGB II nicht decken kann, ist hilfebedürftig. Dann ist Wohngeld nach § 7 WoGG ausgeschlossen, und das Jobcenter zahlt Grundsicherungsgeld einschließlich der angemessenen Miete. Für eine alleinstehende Person in Berlin mit einer Bruttokaltmiete von ${h.m(520)} und ${h.m(80)} Heizung liegt diese Untergrenze nach unserer Rechnung bei rund ${h.m(unter)} brutto im Monat; darunter ist das Grundsicherungsgeld der maßgebliche Weg. Für Familien greift zusätzlich der Kinderzuschlag, der die Untergrenze nach unten verschiebt. Den genauen Punkt für Ihren Haushalt ermittelt der ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')}; die Regeln erklärt ${h.a('vorrangpruefung', 'Vorrangprüfung')}.</p>
${h.box('Wichtig', '<p>Die Tabellen zeigen, ab wann kein Wohngeld mehr möglich ist. Sie sagen nicht, dass bei niedrigerem Einkommen sicher Wohngeld gezahlt wird. Ob ein Anspruch besteht, entscheidet die Wohngeldstelle nach Prüfung aller Einkommen, der Miete und des Vermögens.</p>', 'warning')}
`;
  },
});
