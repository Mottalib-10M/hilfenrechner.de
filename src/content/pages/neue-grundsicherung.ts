import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'neue-grundsicherung',
  group: 'grundsicherung',
  order: 20,
  slug: 'neue-grundsicherung',
  nav: 'Neue Grundsicherung ab Juli 2026',
  card: 'Was das Gesetz vom 16. April 2026 ändert und welche Teile erst 2027 und 2029 gelten.',
  title: 'Neue Grundsicherung 2026: was sich ab 1. Juli ändert',
  description: 'Neue Grundsicherung statt Bürgergeld: Gesetz vom 16. April 2026, in Kraft seit 1. Juli, Vermögen, Miete, Minderungen und was 2027 und 2029 noch kommt.',
  h1: 'Neue Grundsicherung: was seit dem 1. Juli 2026 gilt',
  intro: 'Das Bürgergeld heißt jetzt Grundsicherungsgeld. Der Betrag für den Lebensunterhalt ist gleich geblieben; geändert haben sich Vermögen, Miete, Pflichten und Minderungen.',
  mini: { kind: 'mini:vermoegen' },
  related: ['grundsicherungsgeld-rechner', 'schonvermoegen', 'sanktionen', 'grundsicherung-miete', 'buergergeld-2026'],
  sources: ['bgbl_2026_107', 'sgb2_12', 'rbsfv_2026', 'sgb2_12a'],
  resume: (h) => `Die „neue Grundsicherung“ ist das ${h.P.reform.gesetz} vom ${h.date(h.P.reform.vom)}, verkündet am ${h.date(h.P.reform.verkuendet)} im ${h.src('bgbl_2026_107', h.P.reform.bgbl)}. Es tritt im Kern am ${h.date(h.P.reform.inkraft)} in Kraft. Aus dem Bürgergeld wird das Grundsicherungsgeld, aus dem Gesetzestitel „Bürgergeld, Grundsicherung für Arbeitsuchende“ wird „Grundsicherung für Arbeitsuchende“. Am Geld für den Lebensunterhalt ändert das Gesetz nichts: Der Regelbedarf bleibt ${h.m(h.P.regelbedarf.rbs1)} für Alleinstehende und ${h.m(h.P.regelbedarf.rbs2)} je Partner, so wie ihn die Fortschreibungsverordnung für 2026 festgelegt hat. Neu sind ein Schonvermögen, das nur noch vom Alter abhängt (${h.m((h.P.vermoegen.stufen as number[][])[0][2])} bis ${h.m((h.P.vermoegen.stufen as number[][])[3][2])} je Person), eine Obergrenze für Mieten über dem Eineinhalbfachen des Angemessenen auch im ersten Jahr, Minderungen von ${h.pc(h.P.minderung.satz)} des Regelbedarfs für ${h.P.minderung.monate} Monate und der Wegfall des Regelbedarfs, wenn jemand eine zumutbare Arbeit ablehnt. Wer schon Bürgergeld bekam, muss nichts neu beantragen; Behörden dürfen den alten Namen bis ${h.date(h.P.reform.buergergeldBegriffBis)} weiter verwenden.`,
  faqs: (h) => [
    { q: 'Muss ich das Grundsicherungsgeld neu beantragen, wenn ich Bürgergeld bekommen habe?', a: `Nein. Das Gesetz benennt die Leistung um, es beendet keine Bewilligung. Ihr laufender Bescheid gilt bis zum Ende des Bewilligungszeitraums weiter, danach stellen Sie wie bisher einen Weiterbewilligungsantrag beim Jobcenter. Bescheide und Schreiben dürfen bis ${h.date(h.P.reform.buergergeldBegriffBis)} noch „Bürgergeld“ heißen; gemeint ist dieselbe Leistung.` },
    { q: 'Gilt die neue Vermögensgrenze sofort für meinen laufenden Bescheid?', a: `Nicht für einen Bewilligungszeitraum, der vor dem ${h.date(h.P.reform.inkraft)} begonnen hat: Für ihn bleibt § 12 SGB II in der alten Fassung anwendbar, mit der Karenzzeit für Vermögen (§ 65a Abs. 1 SGB II). Die Freibeträge nach Alter gelten ab dem nächsten Bewilligungszeitraum, also spätestens bei der Weiterbewilligung im kommenden Jahr.` },
    { q: 'Wurde mit der Reform auch der Regelsatz gesenkt?', a: `Nein. Die Euro-Beträge stehen nicht in diesem Gesetz, sondern in der Regelbedarfsstufen-Fortschreibungsverordnung 2026. Sie hat die Beträge von 2025 fortgeführt, weil die Rechnung niedrigere Werte ergab und das Gesetz eine Kürzung ausschließt. Für 2027 ist noch keine Verordnung verkündet; bis dahin gelten ${h.m(h.P.regelbedarf.rbs1)} für Alleinstehende.` },
    { q: 'Welche Teile der Reform kommen erst später?', a: `Einige Änderungen zur Arbeitsförderung im SGB III und SGB VIII und eine Regel zu Eingliederungsleistungen treten am ${h.date(h.P.reform.inkraft2027)} in Kraft, eine weitere Änderung des § 16 SGB II am ${h.date(h.P.reform.inkraft2029)}. Für die Höhe der Leistung spielen diese späteren Daten keine Rolle; alles, was den Betrag bestimmt, gilt seit Juli 2026.` },
  ],
  body: (h) => `
<h2>Drei Daten, die man kennen muss</h2>
<p>Artikel 12 des Gesetzes legt fest, wann welcher Teil gilt. Grundsätzlich ist es der ${h.date(h.P.reform.inkraft)}. Zwei Ausnahmen kamen früher: Die Regel, dass der Regelbedarf ganz wegfällt, wenn jemand eine zumutbare Arbeit willentlich nicht aufnimmt, und eine Änderung im SGB IV galten schon ab dem Tag nach der Verkündung, dem ${h.date(h.P.reform.inkraftSanktionArbeit)}. Zwei Teile kommen später, am ${h.date(h.P.reform.inkraft2027)} und am ${h.date(h.P.reform.inkraft2029)}; sie betreffen die Förderung von Arbeit und Ausbildung, nicht den Zahlbetrag.</p>
${h.table(['Ab', 'Was gilt', 'Fundstelle'], [
  [h.date(h.P.reform.inkraftSanktionArbeit), 'Regelbedarf entfällt bei willentlicher Ablehnung einer zumutbaren, sofort möglichen Arbeit; Miete wird an den Vermieter gezahlt', '§ 31a Abs. 7, § 31b Abs. 3 SGB II'],
  [h.date(h.P.reform.inkraft), 'Name Grundsicherungsgeld, Vermögen nach Alter, Mietdeckel, Minderung 30 %, Vermittlungsvorrang', 'Art. 1 des Gesetzes'],
  [h.date(h.P.reform.buergergeldBegriffBis), 'Letzter Tag, an dem Behörden noch „Bürgergeld“ schreiben dürfen', '§ 65a Abs. 4 SGB II'],
  [h.date(h.P.reform.inkraft2027), 'Änderungen zur Arbeitsförderung (SGB III, SGB VIII, § 16 SGB II)', 'Art. 12 Abs. 3'],
  [h.date(h.P.reform.inkraft2029), 'Weitere Änderung des § 16 SGB II', 'Art. 12 Abs. 4'],
], `Quelle: ${h.P.reform.bgbl}, Artikel 12. Stand ${h.date(h.TODAY)}.`, ['l', 'l', 'l'])}

<h2>Vermögen: ein Freibetrag nach Alter statt der Karenzzeit</h2>
<p>Bis Juni 2026 blieb im ersten Jahr des Bezugs Vermögen bis ${h.m(h.P.vermoegen.bis2026.karenzErste)} für die erste Person und ${h.m(h.P.vermoegen.bis2026.karenzWeitere)} für jede weitere geschützt; danach galten ${h.m(h.P.vermoegen.bis2026.nachKarenz)} je Person. Diese Karenzzeit für Vermögen gibt es nicht mehr. Seit Juli wird von dem verwertbaren Vermögen für jede Person der Bedarfsgemeinschaft ein Freibetrag abgezogen, der nur vom Alter abhängt. Der höhere Betrag gilt ab dem Monat, in dem die Altersgrenze erreicht wird.</p>
${h.table(['Alter', 'Freibetrag je Person'], (h.P.vermoegen.stufen as Array<[number, number, number]>).map(([von, bis, b]) => [bis >= 200 ? `ab ${von} Jahren` : von === 0 ? `bis ${bis} Jahre` : `${von} bis ${bis} Jahre`, h.m(b)]), '§ 12 Abs. 2 SGB II in der Fassung ab 1. Juli 2026.', ['l', 'r'])}
<p>Ein Paar mit 34 und 52 Jahren darf also zusammen ${h.m((h.P.vermoegen.stufen as number[][])[1][2] + (h.P.vermoegen.stufen as number[][])[3][2])} behalten, eine Alleinerziehende mit 28 Jahren und einem Kind von 6 Jahren ${h.m((h.P.vermoegen.stufen as number[][])[0][2] * 2)}. Unverändert geschützt bleiben angemessener Hausrat, ein angemessenes Auto je erwerbsfähiger Person, ausdrücklich geförderte Altersvorsorge und die selbst genutzte Wohnung bis ${h.P.vermoegen.wohnungQm} oder das Haus bis ${h.P.vermoegen.hausQm} Quadratmeter. Neu ist: Während der Karenzzeit bei der Miete zählt das selbst bewohnte Eigentum gar nicht als Vermögen. Für den Kinderzuschlag gilt eine eigene, höhere Grenze von ${h.m(h.P.kiz.vermoegenErste)} für die berechtigte Person und ${h.m(h.P.kiz.vermoegenWeitere)} für jedes weitere Mitglied (§ 6a Abs. 3 BKGG). Mehr auf der Seite ${h.a('schonvermoegen', 'Schonvermögen')}.</p>

<h2>Miete: die Karenzzeit bleibt, aber mit Deckel</h2>
<p>Im ersten Jahr übernimmt das Jobcenter die tatsächliche Miete weiterhin ohne Angemessenheitsprüfung, aber nicht mehr unbegrenzt. Kosten der Unterkunft, die mehr als das ${h.dec(h.P.kdu.deckelFaktor, 1)}-fache des abstrakt Angemessenen betragen, werden nicht anerkannt. Nur im Einzelfall sind höhere Kosten möglich, wenn sie unabweisbar sind oder Kinder im Haushalt leben. Ebenfalls neu: Liegt die Miete über der Mietpreisbremse oder über einer kommunalen Obergrenze je Quadratmeter, gilt sie sofort als unangemessen, und das Amt fordert Sie auf, die Miete beim Vermieter zu rügen. Wer ohne Not innerhalb derselben Stadt umzieht, bekommt höchstens die bisherige Miete. Einzelheiten und Beispiele: ${h.a('grundsicherung-miete', 'Miete im Grundsicherungsgeld')}.</p>

<h2>Pflichten und Minderungen</h2>
<p>Das Gesetz stellt die Vermittlung in Arbeit vor andere Leistungen (§ 3a). Der Kooperationsplan bleibt, wird aber verbindlicher: Wer eine Einladung ohne wichtigen Grund verpasst, kann per Verwaltungsakt zu Bewerbungen oder Maßnahmen verpflichtet werden. Bei einer Pflichtverletzung mindert sich das Grundsicherungsgeld um ${h.pc(h.P.minderung.satz)} des Regelbedarfs, für ${h.P.minderung.monate} Monate; bei einer alleinstehenden Person sind das ${h.m(h.P.regelbedarf.rbs1 * h.P.minderung.satz)} im Monat. Wer drei Termine in Folge ohne Grund versäumt, gilt als nicht erreichbar und verliert zunächst den Regelbedarf, ab dem Folgemonat den ganzen Anspruch, bis er sich persönlich meldet. Wer eine zumutbare Arbeit, die tatsächlich sofort möglich wäre, willentlich nicht aufnimmt, verliert den Regelbedarf ganz; die Miete zahlt das Jobcenter dann direkt an den Vermieter. Liegen Anzeichen einer psychischen Erkrankung vor, soll das Jobcenter persönlich anhören. Rechenbeispiele stehen unter ${h.a('sanktionen', 'Minderungen')}.</p>

<h2>Was gleich bleibt</h2>
<ul>
<li>Die Regelbedarfe: ${h.m(h.P.regelbedarf.rbs1)}, ${h.m(h.P.regelbedarf.rbs2)}, ${h.m(h.P.regelbedarf.rbs3)}, ${h.m(h.P.regelbedarf.rbs4)}, ${h.m(h.P.regelbedarf.rbs5)} und ${h.m(h.P.regelbedarf.rbs6)} in den Stufen 1 bis 6.</li>
<li>Die Freibeträge auf Lohn: wer arbeitet, behält einen Teil des Verdienstes (${h.a('hinzuverdienst', 'Hinzuverdienst')}).</li>
<li>Die Mehrbedarfe, etwa für Alleinerziehende, Schwangere und Menschen mit Behinderung.</li>
<li>Der Vorrang von Wohngeld und Kinderzuschlag nach § 12a SGB II: Das Jobcenter darf Sie nur dorthin schicken, wenn diese Leistungen die Hilfebedürftigkeit des ganzen Haushalts für mindestens drei Monate beenden.</li>
</ul>

<h2>Was die Reform für die Wahl zwischen den Leistungen bedeutet</h2>
<p>Für Familien mit kleinem Einkommen ist die Frage oft nicht, ob Grundsicherungsgeld, sondern ob Wohngeld mit Kinderzuschlag die bessere Lösung ist. Die Reform verschiebt diese Rechnung an zwei Stellen. Wer Ersparnisse über dem neuen Freibetrag hat, etwa eine 35-jährige Alleinerziehende mit ${h.m(18000)} Rücklagen, bekäme früher im ersten Jahr Grundsicherung und heute nicht mehr; der Kinderzuschlag mit seiner Grenze von ${h.m(h.P.kiz.vermoegenErste)} bleibt ihr offen. Und wer in einer teuren Wohnung lebt, kann im Grundsicherungsgeld schon im ersten Jahr auf den Deckel stoßen, während das Wohngeld mit festen Höchstbeträgen nach Mietstufe rechnet. Der ${h.a('home', 'Vergleich aller Leistungen')} rechnet beide Wege für Ihren Haushalt nebeneinander.</p>

<h2>Was noch offen ist</h2>
<p>Die Regelbedarfe für 2027 stehen noch nicht fest: Die Fortschreibungsverordnung für 2027 ist am ${h.date(h.TODAY)} nicht verkündet. Im Bundestag liegt der Entwurf eines Haushaltsbegleitgesetzes 2027, der die Methode der jährlichen Anpassung ändern würde. Bis eine Verordnung im Bundesgesetzblatt steht, rechnet diese Seite mit den Beträgen von 2026 und nennt keine Prognose.</p>

<h2>Wen die Reform betrifft und wen nicht</h2>
<p>Das Gesetz ändert das Zweite Buch Sozialgesetzbuch, also die Leistungen der Jobcenter für erwerbsfähige Menschen zwischen 15 Jahren und der Altersgrenze der Rente und für die Menschen, die mit ihnen in einer Bedarfsgemeinschaft leben. Nicht betroffen sind Rentnerinnen und Rentner sowie dauerhaft voll erwerbsgeminderte Menschen mit Grundsicherung im Alter und bei Erwerbsminderung nach dem Zwölften Buch: Für sie bleibt das Sozialamt zuständig, ihre Vermögensgrenzen und Pflichten richten sich weiter nach dem SGB XII. Ebenfalls nicht betroffen sind Wohngeld und Kinderzuschlag; ihre Beträge und Regeln stehen in eigenen Gesetzen. Für den Kinderzuschlag gelten eigene Vermögensgrenzen im Bundeskindergeldgesetz: ${h.m(h.P.kiz.vermoegenErste)} für die berechtigte Person und ${h.m(h.P.kiz.vermoegenWeitere)} für jede weitere Person der Bedarfsgemeinschaft.</p>

<h2>Was Sie jetzt tun sollten</h2>
<ul>
<li><strong>Laufender Bezug</strong>: nichts sofort. Prüfen Sie bei der nächsten Weiterbewilligung, ob Ihr Vermögen unter dem Freibetrag nach Alter liegt.</li>
<li><strong>Hohe Miete</strong>: Fragen Sie beim Jobcenter oder der Kommune nach der Angemessenheitsgrenze für Ihre Haushaltsgröße. Liegt Ihre Miete über dem ${h.dec(h.P.kdu.deckelFaktor, 1)}-fachen, zahlt das Jobcenter den Teil darüber auch im ersten Jahr nicht.</li>
<li><strong>Neuer Antrag</strong>: Rechnen Sie vorher, ob Wohngeld und Kinderzuschlag den Bedarf decken. Dann ist das Jobcenter nicht zuständig.</li>
<li><strong>Termine</strong>: Nehmen Sie Einladungen ernst und melden Sie Verhinderungen vorher, mit Nachweis. Drei versäumte Termine in Folge lassen den Anspruch entfallen.</li>
<li><strong>Bescheid mit Minderung</strong>: Schauen Sie auf das Datum des Verstoßes. Lag er vor dem ${h.date(h.P.reform.inkraft)}, gilt das alte Recht.</li>
</ul>
<p>Wer unsicher ist, ob ein Bescheid stimmt, kann innerhalb eines Monats Widerspruch einlegen. Sozialberatungsstellen der Wohlfahrtsverbände, Erwerbslosenberatungen und Sozialverbände helfen kostenlos oder gegen einen kleinen Mitgliedsbeitrag.</p>
<p>Für die Rechnung auf dieser Website heißt das: Alle Rechner nutzen seit dem Inkrafttreten das neue Recht. Wer eine Zahl aus einem älteren Bescheid vergleicht, sollte prüfen, aus welchem Bewilligungszeitraum sie stammt.</p>
<p>Sobald neue Beträge verkündet sind, stehen sie hier mit Datum und Fundstelle.</p>
`,
});
