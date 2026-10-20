import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'kindergeld-2026',
  group: 'kinder',
  order: 40,
  slug: 'kindergeld-2026',
  nav: 'Kindergeld 2026',
  card: 'Kindergeld 2026: Betrag, Antrag bei der Familienkasse, Altersgrenzen und Anrechnung auf andere Leistungen.',
  title: 'Kindergeld 2026: Betrag, Antrag und Anrechnung im Überblick',
  description: 'Kindergeld 2026: Betrag je Kind, Antrag bei der Familienkasse, Zahlung bis 25 in Ausbildung, Kinderfreibetrag, Anrechnung auf Leistungen und Pläne 2027.',
  h1: 'Kindergeld 2026: was Familien wissen müssen',
  intro: 'Kindergeld gibt es für jedes Kind in gleicher Höhe, unabhängig vom Einkommen der Eltern. Wie es mit anderen Leistungen zusammenwirkt, ist dagegen sehr unterschiedlich geregelt.',
  mini: { kind: 'mini:kindergeld' },
  related: ['kinderzuschlag', 'unterhaltsvorschuss', 'kinderzuschlag-rechner', 'bildung-und-teilhabe', 'alleinerziehend-leistungen'],
  sources: ['estg_66', 'bkgg_6', 'estg_32', 'ba_kg_merkblatt', 'btd_21_8235', 'bkgg_5', 'estg_64'],
  resume: (h) => {
    const K = h.P.kindergeld;
    return `Das Kindergeld beträgt seit dem ${h.date(K.from)} ${h.m(K.betrag)} im Monat für jedes Kind, gleich ob erstes, zweites oder fünftes Kind (§ 66 EStG). Für zwei Kinder sind das ${h.m(2 * K.betrag)} im Monat und ${h.m(2 * K.betrag * 12)} im Jahr. Zuständig ist die Familienkasse; sie zahlt bis zum 18. Geburtstag ohne weitere Bedingungen, danach bis zum ${K.altersgrenzeAusbildung}. Geburtstag, solange das Kind in Ausbildung oder Studium ist, und bis zum ${K.altersgrenzeArbeitsuchend}. Geburtstag, wenn es arbeitsuchend gemeldet ist. Rückwirkend zahlt die Familienkasse höchstens für die letzten ${K.rueckwirkendMonate} Monate vor dem Antrag. Das Kindergeld ist steuerlich eine Vorauszahlung: Das Finanzamt prüft, ob der Kinderfreibetrag von ${h.m(K.kinderfreibetragElternteil)} und der Freibetrag für Betreuung und Erziehung von ${h.m(K.beaElternteil)} je Elternteil günstiger wären. Beim Grundsicherungsgeld zählt Kindergeld als Einkommen des Kindes, beim Wohngeld und beim Kinderzuschlag nicht. Für 2027 und 2028 sieht ein Gesetzentwurf ${h.m(K.next.betrag2027)} und ${h.m(K.next.betrag2028)} vor; beschlossen ist das nicht.`;
  },
  faqs: (h) => [
    { q: 'Bekommen Eltern für das dritte Kind mehr Kindergeld als für das erste?', a: `Nein. Es gibt für jedes Kind denselben Betrag, 2026 sind es ${h.m(h.P.kindergeld.betrag)} im Monat. Eine Familie mit drei Kindern bekommt also ${h.m(3 * h.P.kindergeld.betrag)} im Monat. Mehr Geld für größere Familien gibt es über den Kinderzuschlag, wenn das Einkommen knapp ist.` },
    { q: 'Wie lange zahlt die Familienkasse Kindergeld für ein Kind in Ausbildung?', a: `Bis zum ${h.P.kindergeld.altersgrenzeAusbildung}. Geburtstag, solange das Kind für einen Beruf ausgebildet wird, etwa in einer Lehre, einem Studium oder einer Schulausbildung. Nach Abschluss einer ersten Ausbildung darf das Kind daneben höchstens ${h.P.kindergeld.erwerbStundenMax} Stunden in der Woche arbeiten, sonst entfällt der Anspruch. Für Kinder mit Behinderung, die sich nicht selbst unterhalten können, kann Kindergeld auch länger gezahlt werden.` },
    { q: 'Was passiert mit dem Kindergeld, wenn ich Grundsicherungsgeld beziehe?', a: `Es wird als Einkommen des Kindes angerechnet, aber nur bis zur Höhe seines eigenen Bedarfs. Für ein Kind von 8 Jahren besteht der Bedarf aus dem Regelbedarf von ${h.m(h.P.regelbedarf.rbs5)} und einem Anteil an Miete und Heizung. Deckt das Kindergeld mit Unterhalt diesen Bedarf nicht, wird es voll angerechnet; ein Rest, der übrig bleibt, zählt als Einkommen des Elternteils.` },
    { q: 'Steigt das Kindergeld 2027?', a: `Geplant ist es. Der Gesetzentwurf der Bundesregierung in der BT-Drucksache 21/8235 vom ${h.date(h.P.kindergeld.next.datum)} sieht ${h.m(h.P.kindergeld.next.betrag2027)} ab Januar 2027 und ${h.m(h.P.kindergeld.next.betrag2028)} ab Januar 2028 vor. Am ${h.date(h.TODAY)} ist er nicht beschlossen. Erst wenn das Gesetz verkündet ist, ändert die Familienkasse die Zahlung; einen Antrag müssen Sie dafür nicht stellen.` },
  ],
  body: (h) => {
    const K = h.P.kindergeld;
    const tab = [1, 2, 3, 4].map((n) => [String(n), h.m(n * K.betrag), h.m(n * K.betrag * 12), h.m(n * K.next.betrag2027), h.m(n * K.next.betrag2028)]);
    const proKind = K.kinderfreibetragElternteil + K.beaElternteil;
    const gsg = h.GSG.grundsicherung({ erwachsene: [{ brutto: 0 }], kinder: [{ alter: 8 }], miete: 600, heizung: 100 });
    const v = h.VG.vergleich({ paar: false, brutto: [0], kinder: [8], unterhalt: 0, miete: 600, heizung: 100, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
    return `
<h2>Kindergeld nach Zahl der Kinder</h2>
${h.table(['Kinder', 'Im Monat 2026', 'Im Jahr 2026', 'Monat 2027 (Entwurf)', 'Monat 2028 (Entwurf)'], tab, `Kindergeld nach § 66 EStG. Beträge 2027 und 2028 nach dem Gesetzentwurf BT-Drucksache 21/8235, nicht beschlossen.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Das Kindergeld wird monatlich gezahlt, für jeden Monat, in dem die Voraussetzungen an mindestens einem Tag vorlagen. Wird ein Kind am 30. eines Monats geboren, gibt es also schon für diesen Monat den vollen Betrag. Ausgezahlt wird an einen Elternteil, in der Regel an den, in dessen Haushalt das Kind lebt; leben beide Eltern mit dem Kind zusammen, bestimmen sie, wer es bekommt.</p>

<h2>Antrag bei der Familienkasse</h2>
<p>Kindergeld gibt es nur auf Antrag. Zuständig ist die Familienkasse der Bundesagentur für Arbeit; für Beschäftigte im öffentlichen Dienst kann eine eigene Familienkasse zuständig sein. Am einfachsten ist der Online-Antrag. Die Familienkasse braucht die steuerliche Identifikationsnummer des Kindes und des antragstellenden Elternteils; ohne sie wird ein Kind steuerlich nicht berücksichtigt. Für Kinder über 18 Jahren kommen Nachweise hinzu, etwa die Schul- oder Ausbildungsbescheinigung oder die Immatrikulationsbescheinigung.</p>
<p>Wichtig ist die Frist: Rückwirkend zahlt die Familienkasse höchstens für die letzten ${K.rueckwirkendMonate} Kalendermonate vor dem Monat, in dem der Antrag eingeht (§ 5 Abs. 2 BKGG). Nach der Geburt sollten Sie den Antrag deshalb stellen, sobald die Geburtsurkunde und die Identifikationsnummer des Kindes vorliegen. Fallen die Voraussetzungen weg, etwa weil die Ausbildung endet, müssen Sie das der Familienkasse mitteilen.</p>

<h2>Bis zu welchem Alter es Kindergeld gibt</h2>
<ul>
<li><strong>Bis 18 Jahre:</strong> für jedes Kind, ohne weitere Voraussetzungen. Die Zahlung endet mit dem Monat, in dem das Kind 18 wird.</li>
<li><strong>Bis ${K.altersgrenzeArbeitsuchend} Jahre:</strong> wenn das Kind nicht beschäftigt und bei einer Agentur für Arbeit oder einem Jobcenter arbeitsuchend gemeldet ist. Ein Minijob schadet nicht.</li>
<li><strong>Bis ${K.altersgrenzeAusbildung} Jahre:</strong> während einer Schul- oder Berufsausbildung oder eines Studiums, in einer Übergangszeit zwischen zwei Ausbildungsabschnitten von höchstens ${K.uebergangMonate} Monaten, wenn das Kind keinen Ausbildungsplatz findet, oder während eines Freiwilligendienstes.</li>
<li><strong>Ohne Altersgrenze:</strong> für Kinder mit Behinderung, die außerstande sind, sich selbst zu unterhalten, wenn die Behinderung vor dem ${K.altersgrenzeAusbildung}. Geburtstag eingetreten ist.</li>
</ul>
<p>Nach einer ersten abgeschlossenen Ausbildung oder einem Erststudium gilt eine zusätzliche Bedingung: Das Kind darf nicht mehr als ${K.erwerbStundenMax} Stunden in der Woche arbeiten. Ein Minijob und ein Ausbildungsverhältnis sind unschädlich. Die Höhe des eigenen Verdienstes eines volljährigen Kindes prüft die Familienkasse dabei nicht, maßgeblich ist die Wochenarbeitszeit.</p>

<h2>Kindergeld und Kinderfreibetrag</h2>
<p>Steuerlich ist das Kindergeld eine Vorauszahlung auf die Freibeträge für Kinder. Jedem Elternteil stehen 2026 ein Kinderfreibetrag von ${h.m(K.kinderfreibetragElternteil)} und ein Freibetrag für Betreuungs-, Erziehungs- oder Ausbildungsbedarf von ${h.m(K.beaElternteil)} zu, zusammen ${h.m(proKind)}; für zusammen veranlagte Eltern sind das ${h.m(K.kinderfreibetragPaar)} je Kind (§ 32 Abs. 6 EStG). Bei der Einkommensteuererklärung prüft das Finanzamt in der Günstigerprüfung, ob die Steuerersparnis durch diese Freibeträge höher ist als das Kindergeld des Jahres, für ein Kind ${h.m(K.betrag * 12)}. Ist sie höher, werden die Freibeträge abgezogen und das Kindergeld der Steuer hinzugerechnet; Sie behalten das Kindergeld trotzdem. Das lohnt sich erst bei höheren Einkommen. Für die Leistungen auf dieser Website, die sich an Familien mit kleinem und mittlerem Einkommen richten, ist das Kindergeld fast immer die günstigere Variante.</p>

<h2>Wie Kindergeld auf andere Leistungen wirkt</h2>
${h.table(['Leistung', 'Zählt Kindergeld?', 'Wie'], [
  ['Grundsicherungsgeld', 'ja', 'als Einkommen des Kindes bis zu dessen Bedarf, ein Überschuss beim Elternteil'],
  ['Wohngeld', 'nein', 'gehört nicht zum Jahreseinkommen nach § 14 WoGG'],
  ['Kinderzuschlag', 'nein', 'bleibt außer Betracht; ist im Höchstbetrag schon mitgedacht'],
  ['Unterhaltsvorschuss', 'indirekt', `der Vorschuss ist der Mindestunterhalt minus das Kindergeld für ein erstes Kind`],
  ['Elterngeld', 'nein', 'kein Einfluss'],
], 'Anrechnung des Kindergelds auf andere Leistungen, Stand ' + h.date(h.TODAY) + '.', ['l', 'l', 'l'])}
<p>Beim Grundsicherungsgeld ist die Regel am kompliziertesten. Kindergeld gilt dort als Einkommen des Kindes, soweit das Kind es zur Deckung seines eigenen Bedarfs braucht (§ 11 Abs. 1 SGB II). Der Bedarf eines Kindes besteht aus seinem Regelbedarf, ${h.m(h.P.regelbedarf.rbs6)} unter 6 Jahren, ${h.m(h.P.regelbedarf.rbs5)} von 6 bis 13 und ${h.m(h.P.regelbedarf.rbs4)} von 14 bis 17 Jahren, und seinem Kopfanteil an Miete und Heizung. Kindergeld und Unterhalt werden darauf angerechnet. Bekommt ein Kind zum Beispiel Unterhalt und Kindergeld, die zusammen seinen Bedarf übersteigen, wird der überschießende Teil des Kindergelds dem Elternteil als Einkommen zugerechnet. Im Ergebnis erhöht das Kindergeld das verfügbare Geld einer Familie im Grundsicherungsgeld nicht; es verringert den Betrag, den das Jobcenter zahlt.</p>
<p>Anders beim Wohngeld und beim Kinderzuschlag: Dort ist Kindergeld kein Einkommen, es kommt voll oben drauf. Für Familien an der Grenze zwischen Grundsicherungsgeld und diesen Leistungen ist das einer der Gründe, warum sich der Wechsel zu Wohngeld und Kinderzuschlag oft lohnt. Wie die Rechnung für Ihre Familie ausgeht, zeigt der ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')}.</p>

<h2>Ein Rechenbeispiel aus dem Grundsicherungsgeld</h2>
<p>Eine alleinerziehende Mutter ohne Einkommen lebt mit ihrem achtjährigen Sohn in einer Wohnung mit ${h.m(600)} Bruttokaltmiete und ${h.m(100)} Heizkosten; Unterhalt bekommt sie nicht. Der Bedarf des Kindes im Grundsicherungsgeld besteht aus dem Regelbedarf von ${h.m(h.P.regelbedarf.rbs5)} und der Hälfte der Wohnkosten, zusammen ${h.m(gsg.kinderBedarf[0])}. Darauf werden das Kindergeld von ${h.m(K.betrag)} und der Unterhaltsvorschuss angerechnet; den Rest zahlt das Jobcenter. Der Haushalt hat insgesamt einen Bedarf von ${h.m(gsg.bedarfSumme)} einschließlich des Mehrbedarfs für Alleinerziehende, und das Jobcenter zahlt nach Abzug von Kindergeld und Vorschuss ${h.m(v.gsg.anspruch)}. Das Kindergeld fließt also vollständig in die Rechnung ein: Mehr Kindergeld hieße hier weniger Grundsicherungsgeld, nicht mehr Geld für die Familie.</p>

<h2>Wer das Kindergeld bekommt, wenn Eltern getrennt leben</h2>
<p>Für jedes Kind wird Kindergeld nur an eine Person gezahlt. Leben die Eltern getrennt, bekommt es der Elternteil, in dessen Haushalt das Kind lebt. Leben beide Eltern mit dem Kind zusammen, bestimmen sie untereinander, wer es erhält; können sie sich nicht einigen, entscheidet auf Antrag das Familiengericht. Lebt das Kind im gemeinsamen Haushalt von Eltern und Großeltern, geht ein Elternteil vor; ein Großelternteil bekommt das Kindergeld nur, wenn der Elternteil gegenüber der Familienkasse schriftlich auf seinen Vorrang verzichtet. Lebt das Kind in keinem Haushalt eines Berechtigten, etwa in einer eigenen Wohnung am Studienort, erhält es derjenige, der dem Kind Unterhalt zahlt, bei mehreren der mit dem höchsten Unterhalt. Bei einem Wechsel des Kindes in den Haushalt des anderen Elternteils muss dieser einen eigenen Antrag stellen.</p>

<h2>Geplante Erhöhung 2027 und 2028</h2>
<p>Die Bundesregierung hat am ${h.date(K.next.datum)} den Entwurf eines Einkommensteuerreformgesetzes 2027 eingebracht (${h.src('btd_21_8235', 'BT-Drucksache 21/8235')}). Er sieht vor, das Kindergeld zum 1. Januar 2027 auf ${h.m(K.next.betrag2027)} und zum 1. Januar 2028 auf ${h.m(K.next.betrag2028)} anzuheben und den Kinderfreibetrag je Elternteil auf ${h.m(K.next.kinderfreibetragElternteil2027)} und ${h.m(K.next.kinderfreibetragElternteil2028)} zu erhöhen; der Freibetrag für Betreuung und Erziehung bliebe bei ${h.m(K.beaElternteil)}. Am ${h.date(h.TODAY)} ist der Entwurf nicht beschlossen.</p>
<p>Eine Erhöhung des Kindergelds hätte Folgewirkungen. Weil der Unterhaltsvorschuss um das Kindergeld für ein erstes Kind gemindert wird, sänke er bei gleichem Mindestunterhalt um denselben Betrag, um den das Kindergeld steigt. Für die Mindestunterhaltsbeträge ab 2027 ist noch keine Verordnung verkündet. Auch der Höchstbetrag des Kinderzuschlags hängt rechnerisch vom Kindergeld ab; ein Betrag für 2027 steht noch nicht fest. Diese Seite nennt deshalb nur die Beträge, die im Entwurf stehen.</p>
${h.box('Kindergeld und Unterhalt', `<p>Leben die Eltern getrennt, erhält das Kindergeld der Elternteil, bei dem das Kind lebt. Wie der Unterhaltsvorschuss einspringt, wenn kein Unterhalt kommt, steht unter ${h.a('unterhaltsvorschuss', 'Unterhaltsvorschuss')}.</p>`)}
`;
  },
});
