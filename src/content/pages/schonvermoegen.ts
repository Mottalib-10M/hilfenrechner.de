import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const frei = (h: Helpers, alter: number) => (h.P.vermoegen.stufen as number[][]).find(([v, b]) => alter >= v && alter <= b)?.[2] ?? 0;

export default definePage({
  id: 'schonvermoegen',
  group: 'grundsicherung',
  order: 14,
  slug: 'schonvermoegen',
  nav: 'Schonvermögen seit Juli 2026',
  card: 'Freibeträge nach Alter, was geschützt bleibt und was für laufende Bescheide gilt.',
  title: 'Schonvermögen 2026 im Grundsicherungsgeld: Freibeträge',
  description: 'Schonvermögen im Grundsicherungsgeld seit 1. Juli 2026: Freibetrag nach Alter je Person, Übertragung im Haushalt, Auto, Wohnung, Altersvorsorge, Übergang.',
  h1: 'Schonvermögen: wie viel Sie behalten dürfen',
  intro: 'Seit Juli 2026 hängt der Vermögensfreibetrag im Grundsicherungsgeld nur noch vom Alter ab. Die Karenzzeit für Vermögen ist weggefallen. Der Rechner zeigt den Freibetrag Ihres Haushalts.',
  mini: { kind: 'mini:vermoegen' },
  related: ['neue-grundsicherung', 'grundsicherung-antrag', 'kinderzuschlag', 'vorrangpruefung', 'grundsicherungsgeld-rechner'],
  sources: ['sgb2_12', 'sgb2_65a', 'bgbl_2026_107', 'bkgg_6a', 'sgb2_9'],
  resume: (h) => {
    const S = h.P.vermoegen.stufen as number[][];
    return `Im Grundsicherungsgeld bleibt seit dem ${h.date(h.P.reform.inkraft)} für jede Person der Bedarfsgemeinschaft ein Freibetrag nach Lebensalter geschützt: ${h.m(S[0][2])} bis zum 30. Geburtstag, ${h.m(S[1][2])} ab 30, ${h.m(S[2][2])} ab 40 und ${h.m(S[3][2])} ab 50 Jahren (§ 12 Abs. 2 SGB II). Der höhere Betrag gilt ab dem Monat, in dem die Altersgrenze erreicht wird. Nicht ausgeschöpfte Freibeträge anderer Mitglieder werden übertragen; es zählt also die Summe des Haushalts. Ein Paar mit 35 und 52 Jahren und einem Kind darf zusammen ${h.m(frei(h, 35) + frei(h, 52) + frei(h, 8))} haben. Zusätzlich geschützt sind angemessener Hausrat, ein angemessenes Auto je erwerbsfähiger Person, staatlich geförderte Altersvorsorge und die selbst bewohnte Wohnung bis ${h.P.vermoegen.wohnungQm} oder das Haus bis ${h.P.vermoegen.hausQm} Quadratmeter. Die frühere Karenzzeit mit ${h.m(h.P.vermoegen.bis2026.karenzErste)} im ersten Jahr gilt nur noch für Bewilligungszeiträume, die vor dem ${h.date(h.P.reform.inkraft)} begonnen haben (§ 65a SGB II). Maßgeblich ist der Verkehrswert am Tag des Antrags.`;
  },
  faqs: (h) => [
    { q: 'Wann gilt die neue Vermögensgrenze für mich, wenn ich schon Bürgergeld bekomme?', a: `Ab Ihrem nächsten Bewilligungszeitraum, der nach dem 30. Juni 2026 beginnt. Für den laufenden Zeitraum bleibt § 12 in der alten Fassung anwendbar, mit der Karenzzeit und den Freibeträgen von ${h.m(h.P.vermoegen.bis2026.karenzErste)} und ${h.m(h.P.vermoegen.bis2026.karenzWeitere)}. Bei der Weiterbewilligung prüft das Jobcenter dann nach den neuen Freibeträgen nach Alter.` },
    { q: 'Zählt das Sparbuch meines Kindes zum Vermögen der Familie?', a: `Es zählt zum Vermögen des Kindes, und das Kind hat einen eigenen Freibetrag von ${h.m(frei(h, 8))}. Übersteigt das Vermögen einer Person ihren Freibetrag, werden nicht genutzte Freibeträge der anderen Personen der Bedarfsgemeinschaft auf sie übertragen. Erst wenn das Vermögen aller zusammen die Summe aller Freibeträge übersteigt, wird es angerechnet.` },
    { q: 'Muss ich mein Auto verkaufen, wenn ich Grundsicherungsgeld beantrage?', a: 'Nein, ein angemessenes Kraftfahrzeug für jede erwerbsfähige Person der Bedarfsgemeinschaft bleibt geschützt (§ 12 Abs. 1 Satz 2 Nr. 2 SGB II). Das Gesetz vermutet die Angemessenheit, wenn Sie sie im Antrag erklären. Das Jobcenter kann diese Vermutung nur mit konkreten Anhaltspunkten widerlegen, etwa bei einem offensichtlich sehr teuren Fahrzeug.' },
    { q: 'Was ist mit Erbschaften oder Abfindungen während des Bezugs?', a: 'Geld, das Sie während des Bezugs erhalten, ist zunächst Einkommen, nicht Vermögen. Es wird im Monat des Zuflusses angerechnet oder auf sechs Monate verteilt. Erst was danach übrig bleibt, wird ab dem Folgemonat zum Vermögen und mit den Freibeträgen nach Alter verglichen. Teilen Sie den Zufluss dem Jobcenter sofort mit.' },
  ],
  body: (h) => {
    const S = h.P.vermoegen.stufen as number[][];
    const bsp = [
      { n: 'Alleinstehend, 26 Jahre', a: [26] },
      { n: 'Alleinstehend, 45 Jahre', a: [45] },
      { n: 'Alleinerziehend, 33 Jahre, Kinder 4 und 9', a: [33, 4, 9] },
      { n: 'Paar, 38 und 41 Jahre, ein Kind 12', a: [38, 41, 12] },
      { n: 'Paar, 56 und 58 Jahre', a: [56, 58] },
    ];
    return `
<h2>Die Freibeträge nach Alter</h2>
${h.table(['Alter der Person', 'Freibetrag', 'Rechtsgrundlage'], S.map(([von, bis, b]) => [bis >= 200 ? `ab ${von} Jahren` : von === 0 ? `bis ${bis} Jahre (auch Kinder)` : `${von} bis ${bis} Jahre`, h.m(b), '§ 12 Abs. 2 SGB II']), `Fassung seit ${h.date(h.P.reform.inkraft)}, ${h.src('bgbl_2026_107', h.P.reform.bgbl)}.`, ['l', 'r', 'l'])}
<p>Das Gesetz formuliert die Grenzen als „bis zur Vollendung des 30. Lebensjahres“, „ab dem 31. Lebensjahr“ und so weiter. Das 31. Lebensjahr beginnt mit dem 30. Geburtstag. Wer im Mai 30 wird, hat ab dem 1. Mai den höheren Freibetrag; das Gesetz stellt ausdrücklich auf den Beginn des Monats ab, in dem die Grenze erreicht wird.</p>

<h2>Beispiele für ganze Haushalte</h2>
${h.table(['Haushalt', 'Freibeträge', 'Zusammen geschützt'], bsp.map((x) => [x.n, x.a.map((a) => h.m(frei(h, a))).join(' + '), `<strong>${h.m(x.a.reduce((s, a) => s + frei(h, a), 0))}</strong>`]), 'Ohne die geschützten Gegenstände wie Hausrat, Auto, Altersvorsorge und Wohneigentum.', ['l', 'l', 'r'])}

<h2>Was neben dem Freibetrag geschützt bleibt</h2>
<p>§ 12 Abs. 1 SGB II zählt Gegenstände auf, die gar nicht als Vermögen berücksichtigt werden. Sie kommen zum Freibetrag hinzu:</p>
<ul>
<li><strong>Hausrat</strong> in angemessenem Umfang: Möbel, Geräte, Kleidung.</li>
<li><strong>Ein Kraftfahrzeug</strong> für jede erwerbsfähige Person der Bedarfsgemeinschaft; die Angemessenheit wird vermutet, wenn Sie sie im Antrag erklären.</li>
<li><strong>Altersvorsorge</strong>: für die Altersvorsorge bestimmte Versicherungsverträge und Formen, die nach Bundesrecht ausdrücklich als Altersvorsorge gefördert werden; bei Selbständigen ohne gesetzliche Rentenversicherung außerdem weiteres als Altersvorsorge bestimmtes Vermögen bis zu einem Betrag je Jahr der Tätigkeit.</li>
<li><strong>Selbst genutztes Wohneigentum</strong>: eine Eigentumswohnung bis ${h.P.vermoegen.wohnungQm} oder ein Haus bis ${h.P.vermoegen.hausQm} Quadratmeter Wohnfläche; bei mehr als vier Bewohnern je weitere Person 20 Quadratmeter mehr.</li>
<li><strong>Vermögen für eine Wohnung für Menschen mit Behinderung oder Pflegebedarf</strong>, wenn es nachweislich dafür bestimmt ist.</li>
<li><strong>Sachen und Rechte</strong>, deren Verwertung für Sie eine besondere Härte bedeuten würde.</li>
</ul>
<p>Neu seit Juli: Während der Karenzzeit bei der Miete bleibt selbst bewohntes Wohneigentum ganz außer Betracht, unabhängig von der Größe. Nach der Karenzzeit gilt wieder die Flächengrenze.</p>

<h2>Wie das Jobcenter prüft</h2>
<p>Im Antrag geben Sie Konten, Bargeld, Wertpapiere, Lebens- und Rentenversicherungen mit Rückkaufswert, Bausparverträge, Fahrzeuge, Immobilien und sonstige Werte an. Maßgeblich ist der Verkehrswert am Tag des Antrags (§ 12 Abs. 3), bei späterem Erwerb am Tag des Erwerbs. Das Jobcenter darf Kontoauszüge der letzten Monate anfordern; Ausgaben für persönliche Zwecke dürfen Sie dabei schwärzen, Einnahmen nicht. Liegt das Vermögen über den Freibeträgen, entfällt der Anspruch, bis es verbraucht ist. Eine Pflicht, es in einer bestimmten Weise auszugeben, gibt es nicht; wer es aber absichtlich verschleudert, um Leistungen zu erhalten, begeht eine Pflichtverletzung (§ 31 Abs. 2 Nr. 1).</p>
${h.box('Härtefall', '<p>Sachen und Rechte, deren Verwertung eine besondere Härte bedeuten würde, bleiben geschützt (§ 12 Abs. 1 Satz 2 Nr. 7). Ob ein Härtefall vorliegt, entscheidet das Jobcenter im Einzelfall; begründen Sie ihn im Antrag schriftlich. Kann Vermögen nicht sofort verwertet werden, gibt es Grundsicherungsgeld als Darlehen (§ 9 Abs. 4, § 24 Abs. 5).</p>', 'info')}

<h2>Der Vergleich mit Kinderzuschlag und Wohngeld</h2>
<p>Die Vermögensgrenzen der Leistungen unterscheiden sich stark. Wer über dem Freibetrag des Grundsicherungsgeldes liegt, kann trotzdem Kinderzuschlag und Wohngeld bekommen:</p>
${h.table(['Leistung', 'Vermögensgrenze'], [
  ['Grundsicherungsgeld', `${h.m(S[0][2])} bis ${h.m(S[3][2])} je Person nach Alter`],
  ['Kinderzuschlag', `${h.m(h.P.kiz.vermoegenErste)} für die erste, ${h.m(h.P.kiz.vermoegenWeitere)} für jede weitere Person (§ 6a Abs. 3 BKGG)`],
  ['Wohngeld', 'kein fester Betrag im Gesetz; kein Anspruch bei erheblichem Vermögen (§ 21 Nr. 3 WoGG)'],
], undefined, ['l', 'l'])}
<p>Für eine 35-jährige Alleinerziehende mit einem Kind und ${h.m(18000)} Rücklagen heißt das: Grundsicherungsgeld gibt es erst, wenn das Vermögen unter ${h.m(frei(h, 35) + frei(h, 5))} gesunken ist; Kinderzuschlag und Wohngeld kommen sofort in Frage. Ob sie den Bedarf decken, zeigt der ${h.a('wohngeld-oder-grundsicherung', 'Vergleich der Leistungen')}.</p>

<h2>Bis Juni 2026: die Karenzzeit</h2>
<p>Unter dem Bürgergeld galt im ersten Jahr des Bezugs eine Karenzzeit für Vermögen: Geschützt waren ${h.m(h.P.vermoegen.bis2026.karenzErste)} für die leistungsberechtigte Person und ${h.m(h.P.vermoegen.bis2026.karenzWeitere)} für jede weitere Person, solange das Vermögen nicht „erheblich“ war. Nach dem ersten Jahr galten ${h.m(h.P.vermoegen.bis2026.nachKarenz)} je Person. Diese Regel ist mit dem ${h.P.reform.gesetz} entfallen. Sie gilt nur noch in Bewilligungszeiträumen, die vor dem ${h.date(h.P.reform.inkraft)} begonnen haben (${h.src('sgb2_65a', '§ 65a Abs. 1 SGB II')}). Für jüngere Menschen ist die neue Regel strenger, für Menschen ab 50 nach dem ersten Jahr großzügiger als die alte.</p>

<h2>Übertragung zwischen den Personen</h2>
<p>Der Freibetrag gehört jeder Person, aber das Gesetz lässt nicht genutzte Beträge wandern (§ 12 Abs. 2 Satz 3 SGB II). Ein Beispiel: Ein Paar mit 32 und 45 Jahren und einem Kind von 6 Jahren. Die Freibeträge betragen ${h.m(frei(h, 32))}, ${h.m(frei(h, 45))} und ${h.m(frei(h, 6))}, zusammen ${h.m(frei(h, 32) + frei(h, 45) + frei(h, 6))}. Hat nur die 32-jährige Person Ersparnisse, etwa ${h.m(20000)} auf einem Tagesgeldkonto, und die anderen nichts, bleibt das Vermögen trotzdem vollständig geschützt, weil die nicht genutzten Freibeträge des Partners und des Kindes übertragen werden. Erst wenn das Vermögen aller zusammen die Summe übersteigt, wird der Rest angerechnet.</p>

<h2>Einzelne Vermögensarten in der Praxis</h2>
<ul>
<li><strong>Girokonto</strong>: Das Guthaben am Antragstag ist Vermögen; das Geld, das im Antragsmonat als Lohn eingeht, ist dagegen Einkommen dieses Monats.</li>
<li><strong>Bausparvertrag, Tagesgeld, Festgeld</strong>: zählen mit dem Guthaben, ein Bausparvertrag mit dem Wert bei Kündigung.</li>
<li><strong>Kapitallebensversicherung</strong>: zählt mit dem Rückkaufswert, wenn sie nicht ausdrücklich für die Altersvorsorge bestimmt ist.</li>
<li><strong>Aktien, Fonds, Kryptowerte</strong>: zählen mit dem Kurswert am Antragstag.</li>
<li><strong>Schmuck, Sammlungen, zweites Auto</strong>: zählen mit dem Verkehrswert, soweit sie nicht als angemessener Hausrat gelten.</li>
<li><strong>Vermietete Immobilie, Grundstück</strong>: zählen mit dem Verkehrswert abzüglich der Schulden, die darauf lasten.</li>
</ul>
<p>Schulden werden bei der Prüfung grundsätzlich nicht vom Vermögen abgezogen, außer sie lasten unmittelbar auf dem Gegenstand, wie eine Grundschuld auf einer Immobilie. Wer ein Sparguthaben und gleichzeitig einen Ratenkredit hat, muss das Guthaben in der Regel zuerst verbrauchen.</p>

<h2>Vermögen im Antrag angeben</h2>
<p>In der Anlage Vermögen nennen Sie alle Konten, Depots, Versicherungen, Fahrzeuge und Immobilien aller Personen der Bedarfsgemeinschaft. Das Jobcenter darf Nachweise verlangen und einen automatischen Abgleich mit dem Bundeszentralamt für Steuern durchführen, das Kapitalerträge und Konten kennt. Wer Vermögen verschweigt, riskiert Rückforderungen und ein Bußgeld- oder Strafverfahren. Wer sich bei der Bewertung unsicher ist, gibt den Gegenstand an und schreibt dazu, warum er ihn für geschützt hält.</p>

<h2>Wenn das Vermögen knapp über der Grenze liegt</h2>
<p>Liegt Ihr Vermögen über der Summe der Freibeträge, gibt es kein Grundsicherungsgeld, bis Sie es verbraucht haben. Es gibt keine Vorschrift, wie schnell das gehen muss; Sie leben vom Ersparten und stellen den Antrag neu, wenn es unter die Grenze fällt. Größere Anschaffungen, die ohnehin nötig sind, wie ein Bett, ein Kühlschrank oder eine Reparatur am Auto für den Arbeitsweg, sind dabei unproblematisch. Riskant sind Schenkungen an Angehörige oder Ausgaben ohne nachvollziehbaren Grund kurz vor dem Antrag: Das Jobcenter kann darin eine absichtliche Verminderung des Vermögens sehen.</p>

<h2>Vermögen von Kindern und Jugendlichen</h2>
<p>Auch Kinder haben einen eigenen Freibetrag von ${h.m(frei(h, 10))}. Darunter fallen Sparbücher der Großeltern, Geldgeschenke zur Konfirmation oder Jugendweihe und Guthaben auf einem Jugendkonto. Ausbildungsversicherungen zählen mit ihrem Rückkaufswert. Weil nicht genutzte Freibeträge übertragen werden, kann das Sparbuch eines Kindes auch dann geschützt sein, wenn es den eigenen Freibetrag übersteigt, solange die Eltern ihre Freibeträge nicht ausschöpfen. Was das Kind aus eigenem Einkommen anspart, etwa aus einem Ferienjob, ist ab dem Folgemonat ebenfalls Vermögen.</p>
<p>Kurz gesagt: Rechnen Sie die Freibeträge aller Personen Ihres Haushalts zusammen und vergleichen Sie die Summe mit dem verwertbaren Vermögen aller. Liegt das Vermögen darunter, spielt es für den Anspruch keine Rolle.</p>
`;
  },
});
