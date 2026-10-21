import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'kinderzuschlag',
  group: 'kinder',
  order: 42,
  slug: 'kinderzuschlag',
  nav: 'Kinderzuschlag',
  card: 'Kinderzuschlag (KiZ) 2026: Voraussetzungen, Berechnung mit den Beispielen der Familienkasse, Antrag und Zusatzleistungen.',
  title: 'Kinderzuschlag 2026: Voraussetzungen, Höhe und Antrag',
  description: 'Kinderzuschlag 2026: bis zu 297 € je Kind, Mindesteinkommen, Anrechnung von Lohn und Unterhalt, Beispiele der Familienkasse, Antrag und Bildung und Teilhabe.',
  h1: 'Kinderzuschlag: wer ihn bekommt, Berechnung, Antrag',
  intro: 'Der Kinderzuschlag ist für Eltern gedacht, die für sich selbst genug verdienen, deren Einkommen aber nicht für die ganze Familie reicht. Er wird zusätzlich zum Kindergeld von der Familienkasse gezahlt.',
  mini: { kind: 'mini:kiz' },
  related: ['kinderzuschlag-rechner', 'kinderzuschlag-einkommensgrenze', 'bildung-und-teilhabe', 'wohngeld-oder-grundsicherung', 'kindergeld-2026', 'alleinerziehend-leistungen'],
  sources: ['bkgg_6a', 'ba_kiz_merkblatt', 'familienportal_kiz', 'bkgg_6b'],
  resume: (h) => {
    const K = h.P.kiz; const B = K.beispiele;
    return `Den Kinderzuschlag (KiZ) zahlt die Familienkasse nach § 6a BKGG an Eltern mit kleinem Einkommen. Er beträgt 2026 bis zu ${h.m(K.hoechst)} im Monat je Kind, einschließlich des Sofortzuschlags von ${h.m(K.sofortzuschlag)}, und kommt zum Kindergeld von ${h.m(h.P.kindergeld.betrag)} hinzu. Anspruch haben Eltern für unverheiratete Kinder unter ${K.altersgrenze} Jahren im eigenen Haushalt, wenn sie mindestens ${h.m(K.mindestPaar)} brutto als Paar oder ${h.m(K.mindestAllein)} als Alleinerziehende verdienen und die Familie mit Kinderzuschlag und Wohngeld nicht auf das Jobcenter angewiesen ist. Einkommen der Kinder, etwa Unterhalt, mindert ihren Zuschlag zu ${h.pc(K.anrechnungKind)}. Erwerbseinkommen der Eltern über ihrem eigenen Bedarf mindert ihn ebenfalls zu ${h.pc(K.anrechnungEltern)}. Nach den Beispielen der Familienkasse bekommt ein Paar mit ${B.b1.kinder} Kindern und ${h.m(B.b1.einkommen)} anrechenbarem Einkommen ${h.m(B.b1.ergebnis)} im Monat, ein Paar mit ${B.b2.kinder} Kind und ${h.m(B.b2.einkommen)} noch ${h.m(B.b2.ergebnis)}. Bewilligt wird für ${K.bewilligung} Monate ab dem Antragsmonat, rückwirkend gibt es in der Regel nichts. Mit dem Kinderzuschlag öffnen sich außerdem die Leistungen für Bildung und Teilhabe.`;
  },
  faqs: (h) => [
    { q: 'Bekomme ich Kinderzuschlag, wenn ich gerade Grundsicherungsgeld beziehe?', a: `Nicht gleichzeitig. Der Kinderzuschlag soll den Bezug von Grundsicherungsgeld gerade vermeiden. Wenn Ihr Lohn gestiegen ist, kann der Wechsel aber möglich sein: Reicht das Einkommen mit Kinderzuschlag und Wohngeld für den Bedarf der Familie, beantragen Sie beides und melden sich beim Jobcenter ab. Fehlen höchstens ${h.m(h.P.kiz.luecke)}, haben Sie die Wahl, sofern Sie kein Grundsicherungsgeld beantragt haben oder beziehen.` },
    { q: 'Muss ich der Familienkasse jede Lohnänderung während des Kinderzuschlags melden?', a: 'Nein. Der Kinderzuschlag wird für sechs Monate fest bewilligt; Änderungen beim Einkommen oder bei der Miete in dieser Zeit wirken sich nicht aus und müssen nicht gemeldet werden. Melden müssen Sie aber sofort, wenn jemand ein- oder auszieht, ein Kind geboren wird, ein Kind heiratet oder die Familie ins Ausland zieht.' },
    { q: 'Zählt Unterhaltsvorschuss beim Kinderzuschlag als Einkommen des Kindes?', a: `Ja. Unterhalt und Unterhaltsvorschuss sind Einkommen des Kindes und mindern den Kinderzuschlag dieses Kindes zu ${h.pc(h.P.kiz.anrechnungKind)}. Erhält ein Kind zum Beispiel ${h.m(300)} Unterhalt, bleiben höchstens ${h.m(h.P.kiz.hoechst - h.P.kiz.anrechnungKind * 300)}. Das Einkommen eines Kindes wirkt sich nicht auf die Geschwister aus und wird nicht mit dem Einkommen der Eltern zusammengerechnet.` },
    { q: 'Wie viel Vermögen darf man beim Kinderzuschlag haben?', a: `Vermögen zählt erst, wenn es ${h.m(h.P.kiz.vermoegenErste)} für die antragstellende Person und ${h.m(h.P.kiz.vermoegenWeitere)} für jedes weitere Mitglied der Bedarfsgemeinschaft übersteigt. Für eine Familie mit drei Personen sind das ${h.m(h.P.kiz.vermoegenErste + 2 * h.P.kiz.vermoegenWeitere)}. Selbst bewohntes Wohneigentum, angemessener Hausrat, ein angemessenes Auto je erwerbsfähiger Person und geförderte Altersvorsorge bleiben außen vor.` },
    { q: 'Gibt es Kinderzuschlag auch für volljährige Kinder in Ausbildung?', a: `Ja, solange das Kind unter ${h.P.kiz.altersgrenze} Jahre alt ist, unverheiratet im Haushalt der Eltern lebt und für es Kindergeld gezahlt wird. Eine Ausbildungsvergütung oder BAföG ist aber Einkommen des Kindes und mindert seinen Kinderzuschlag. Kinder müssen sich zudem um vorrangige Leistungen wie BAföG oder Unterhalt bemühen, sonst entfällt der Zuschlag für sie.` },
  ],
  body: (h) => {
    const K = h.P.kiz; const R = h.P.regelbedarf; const B = K.beispiele;
    const anteile = K.wohnanteil.paar.map((p: number, i: number) => [String(i + 1), h.pc(K.wohnanteil.allein[i] / 100), h.pc(p / 100)]);
    const e1Bedarf = 2 * R.rbs2 + B.b1.miete * K.wohnanteil.paar[B.b1.kinder - 1] / 100;
    const e1 = h.KIZ.kizAusEinkommen(Array(B.b1.kinder).fill(K.hoechst), e1Bedarf, B.b1.einkommen, 0);
    const e2Bedarf = 2 * R.rbs2 + B.b2.miete * K.wohnanteil.paar[B.b2.kinder - 1] / 100;
    const e2 = h.KIZ.kizAusEinkommen(Array(B.b2.kinder).fill(K.hoechst), e2Bedarf, B.b2.einkommen, 0);
    return `
<h2>Voraussetzungen</h2>
<p>Den Kinderzuschlag bekommen Sie für ein Kind, wenn alle folgenden Bedingungen erfüllt sind:</p>
<ul>
<li>Das Kind lebt in Ihrem Haushalt, ist unter ${K.altersgrenze} Jahre alt, nicht verheiratet und hat kein eigenes Kind.</li>
<li>Sie bekommen für das Kind Kindergeld oder eine vergleichbare Leistung, etwa aus dem Ausland. Kinderzuschlag erhält immer die Person, die auch das Kindergeld bezieht.</li>
<li>Ihr Einkommen erreicht im Durchschnitt der ${K.bemessungMonate} Monate vor dem Antrag mindestens ${h.m(K.mindestPaar)} brutto als Paar oder ${h.m(K.mindestAllein)} als Alleinerziehende. Wohngeld, Kindergeld und Kinderzuschlag zählen dabei nicht mit, Arbeitslosengeld oder Krankengeld dagegen schon.</li>
<li>Mit Ihrem Einkommen, dem Kindergeld, dem Wohngeld und dem Kinderzuschlag deckt die Familie ihren Bedarf nach dem Grundsicherungsgeld. Fehlen höchstens ${h.m(K.luecke)}, gilt der erweiterte Zugang (siehe unten).</li>
<li>Das anrechenbare Einkommen ist nicht so hoch, dass der Zuschlag auf null sinkt.</li>
</ul>
<p>Wer nur Grundsicherungsgeld, Sozialhilfe oder Asylbewerberleistungen und sonst kein Einkommen hatte, erreicht das Mindesteinkommen nicht. Die Grenze soll sicherstellen, dass der Kinderzuschlag erwerbstätige Eltern unterstützt.</p>

<h2>Wie der Betrag entsteht</h2>
<p>Die Berechnung läuft in drei Schritten. Zuerst bekommt jedes Kind den Höchstbetrag von ${h.m(K.hoechst)}. Davon zieht die Familienkasse ${h.pc(K.anrechnungKind)} des Einkommens des Kindes ab, also etwa von Unterhalt, Unterhaltsvorschuss, Ausbildungsvergütung oder BAföG. Kindergeld, Wohngeld und Kinderzuschlag gehören nicht zum Einkommen des Kindes. Die Summe aller Kinder ist der Gesamtkinderzuschlag.</p>
<p>Im zweiten Schritt wird der Bedarf der Eltern bestimmt: ihre Regelbedarfe (${h.m(R.rbs1)} für Alleinerziehende, ${h.m(2 * R.rbs2)} für ein Paar), gegebenenfalls Mehrbedarfe und ein fester Anteil an Miete und Heizung. Diesen Anteil legt das Gesetz nach dem Existenzminimumbericht fest; die Familienkasse verwendet folgende Werte:</p>
${h.table(['Kinder', 'Anteil der Eltern, alleinerziehend', 'Anteil der Eltern, Paar'], anteile, 'Anteil der Eltern an den Wohnkosten beim Kinderzuschlag. Quelle: Merkblatt Kinderzuschlag der Familienkasse.', ['l', 'r', 'r'])}
<p>Im dritten Schritt vergleicht die Familienkasse das anrechenbare Einkommen der Eltern mit diesem Bedarf. Anrechenbar ist das Einkommen nach Steuern, Sozialbeiträgen, Werbungskosten und dem Freibetrag für Erwerbstätige, der mit Kind bis zu ${h.m(K.erwerbsfreibetragMax)} beträgt. Liegt es nicht über dem Bedarf, gibt es den vollen Gesamtkinderzuschlag. Liegt es darüber, mindert der übersteigende Betrag den Zuschlag: Erwerbseinkommen zu ${h.pc(K.anrechnungEltern)}, anderes Einkommen wie Arbeitslosengeld oder Krankengeld in voller Höhe.</p>

<h2>Zwei Beispiele der Familienkasse</h2>
<p>Die folgenden Fälle stammen aus dem Merkblatt Kinderzuschlag der Familienkasse; wir haben sie mit den Werten von 2026 nachgerechnet.</p>
${h.box('Beispiel 1 der Familienkasse', `<p>Ein Ehepaar mit ${B.b1.kinder} Kindern von 8, 10 und 12 Jahren zahlt ${h.m(B.b1.miete)} Miete. Das anrechenbare Einkommen beider Eltern beträgt ${h.m(B.b1.einkommen)}. Ihr Bedarf: ${h.m(2 * R.rbs2)} Regelbedarf plus ${h.pc(K.wohnanteil.paar[B.b1.kinder - 1] / 100)} der Miete, zusammen ${h.m(e1Bedarf)}. Das Einkommen liegt ${h.m(B.b1.einkommen - e1Bedarf)} darüber; ${h.pc(K.anrechnungEltern)} davon, also ${h.m2(e1.kuerzung)}, werden vom Gesamtkinderzuschlag von ${h.m(B.b1.kinder * K.hoechst)} abgezogen. Die Familie erhält ${h.m(e1.gesamt)} im Monat.</p>`, 'example')}
${h.box('Beispiel 2 der Familienkasse', `<p>Ein Ehepaar mit einem Kind von 8 Jahren zahlt ${h.m(B.b2.miete)} Miete, der Vater verdient, die Mutter hat kein Einkommen. Anrechenbar sind ${h.m(B.b2.einkommen)}. Der Bedarf der Eltern beträgt ${h.m(2 * R.rbs2)} plus ${h.pc(K.wohnanteil.paar[B.b2.kinder - 1] / 100)} der Miete, zusammen ${h.m(e2Bedarf)}. Vom Überschuss von ${h.m(B.b2.einkommen - e2Bedarf)} werden ${h.m2(e2.kuerzung)} angerechnet. Vom Höchstbetrag von ${h.m(K.hoechst)} bleiben ${h.m(e2.gesamt)} im Monat.</p>`, 'example')}
<p>Das zweite Beispiel zeigt, dass auch ein Haushalt mit einem durchschnittlichen Lohn noch einen kleinen Kinderzuschlag bekommen kann, wenn die Miete hoch ist. Der Zuschlag ist dann zwar gering, öffnet aber die Leistungen für Bildung und Teilhabe und die Befreiung von Kita-Gebühren.</p>

<h2>Was als Einkommen zählt und was nicht</h2>
<p>Einkommen ist grundsätzlich jede Einnahme in Geld: Lohn, Gewinn aus Selbstständigkeit, Unterhalt, Unterhaltsvorschuss, Arbeitslosengeld, Krankengeld, Renten, Zinsen und Mieteinnahmen. Auch Elterngeld zählt, wobei für Eltern, die vor der Geburt gearbeitet haben, bis zu ${h.m(h.P.elterngeld.freibetragSgb2)} im Monat frei bleiben, bei Elterngeld Plus bis zu ${h.m(h.P.elterngeld.freibetragSgb2Plus)}. Nicht angerechnet werden Kindergeld, Wohngeld, der Kinderzuschlag selbst, Mutterschaftsgeld, Leistungen der Pflegeversicherung und die Studienstarthilfe. Maßgeblich ist das durchschnittliche Einkommen der ${K.bemessungMonate} Monate vor dem Antrag, nicht der Lohn im Antragsmonat.</p>

<h2>Der erweiterte Zugang</h2>
<p>Manchmal fehlt nur wenig, damit die Familie ihren Bedarf ohne Jobcenter deckt. Fehlen mit Erwerbseinkommen, Kinderzuschlag und Wohngeld höchstens ${h.m(K.luecke)}, kann sie trotzdem Kinderzuschlag bekommen, wenn sie kein Grundsicherungsgeld bezieht oder beantragt hat und die Freibeträge aus Erwerbstätigkeit mindestens ${h.m(K.luecke)} ausmachen. Die Familie hat dann die Wahl. Wer sich für den Kinderzuschlag entscheidet, verzichtet auf das Grundsicherungsgeld und damit auch auf Vergünstigungen wie die Befreiung vom Rundfunkbeitrag. Ob sich das lohnt, zeigt der ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')}.</p>

<h2>Bewilligungszeitraum und Antrag</h2>
<p>Bewilligt wird der Kinderzuschlag immer für ${K.bewilligung} Monate. Der Zeitraum beginnt in dem Monat, in dem der Antrag eingeht. Ein Antrag vom 15. eines Monats wirkt also ab dem Ersten dieses Monats; für frühere Monate gibt es in der Regel keinen Kinderzuschlag. Danach ist ein neuer Antrag nötig, bei unveränderten Verhältnissen genügt ein Kurzantrag. Den Antrag stellen Sie online über das Portal der Familienkasse, mit BundID auch ohne Unterschrift, oder auf Papier. Fehlende Nachweise können Sie nachreichen. Der Kinderzuschlag wird zusammen mit dem Kindergeld ausgezahlt.</p>
<p>Weil die Familienkasse prüft, ob der Bedarf mit Wohngeld gedeckt ist, sollten Sie den Wohngeldantrag gleichzeitig stellen. Das Wohngeld berechnet die Familienkasse dafür vorab so, wie es voraussichtlich bewilligt würde. Beide Stellen entscheiden getrennt und mit eigenen Bescheiden: Ein Bescheid über Kinderzuschlag ersetzt nicht den Wohngeldbescheid, und umgekehrt.</p>

<h2>Häufige Gründe für eine Ablehnung</h2>
<p>Ein abgelehnter Antrag hat meist einen von wenigen Gründen, und nicht jeder ist endgültig:</p>
<ul>
<li><strong>Mindesteinkommen nicht erreicht.</strong> Maßgeblich ist der Durchschnitt der letzten ${K.bemessungMonate} Monate. Wer erst kürzlich eine Arbeit aufgenommen hat, kann später erneut beantragen, wenn der Durchschnitt die Grenze erreicht.</li>
<li><strong>Bedarf nicht gedeckt.</strong> Reichen Einkommen, Kindergeld, Wohngeld und Kinderzuschlag nicht für den Bedarf der Familie und fehlen mehr als ${h.m(K.luecke)}, ist das Jobcenter zuständig. Der Grundsicherungsgeldantrag sollte dann zügig gestellt werden.</li>
<li><strong>Einkommen zu hoch.</strong> Dann ist der Zuschlag rechnerisch auf null gesunken. Ändert sich die Lage, etwa durch ein weiteres Kind oder eine Mieterhöhung, lohnt ein neuer Antrag.</li>
<li><strong>Vorrangige Ansprüche des Kindes nicht verfolgt.</strong> Wer keinen Unterhalt einfordert und keinen Unterhaltsvorschuss beantragt, bekommt für dieses Kind keinen Kinderzuschlag.</li>
<li><strong>Fehlende Nachweise.</strong> Die Familienkasse kann ablehnen, wenn angeforderte Unterlagen nicht kommen. Nachreichen ist online möglich.</li>
</ul>

<h2>Leistungen, die mit dem Kinderzuschlag kommen</h2>
<p>Familien mit Kinderzuschlag haben Anspruch auf die Leistungen für Bildung und Teilhabe: ${h.m(h.P.but.schulbedarfJahr)} im Schuljahr für Schulbedarf, ${h.m(h.P.but.teilhabe)} im Monat für Sport, Musik oder Freizeiten, kostenloses Mittagessen in Kita und Schule, Ausflüge, Klassenfahrten und Lernförderung. Diese Leistungen beantragen Sie bei der zuständigen Stelle Ihrer Kommune, nicht bei der Familienkasse; Einzelheiten unter ${h.a('bildung-und-teilhabe', 'Bildung und Teilhabe')}. Außerdem können Sie beim Jugendamt die Befreiung von Kita-Gebühren beantragen. Beginnt ein Kind unter ${K.altersgrenze} Jahren erstmals ein Studium und wurde im Monat davor Kinderzuschlag bezogen, kann es eine Studienstarthilfe von ${h.m(h.P.but.studienstarthilfe)} beantragen; die Antragsfrist ist kurz.</p>
`;
  },
});
