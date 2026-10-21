import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';
import { P } from '../../lib/engine/params';

const haushalte = (h: Helpers) => [
  { n: 'Alleinstehend', e: 1, k: [] as number[] },
  { n: 'Alleinerziehend, Kind 3 Jahre', e: 1, k: [3] },
  { n: 'Alleinerziehend, Kinder 8 und 12', e: 1, k: [8, 12] },
  { n: 'Paar ohne Kinder', e: 2, k: [] as number[] },
  { n: 'Paar, Kinder 2 und 6', e: 2, k: [2, 6] },
  { n: 'Paar, Kinder 5, 10 und 15', e: 2, k: [5, 10, 15] },
].map((x) => {
  const rb = h.GSG.rbsErwachsene(x.e).reduce((a, b) => a + b, 0) + x.k.reduce((s, a) => s + h.GSG.rbsKind(a), 0);
  const mb = x.e === 1 ? h.GSG.mehrbedarfAlleinerziehend(x.k) : 0;
  return { ...x, rb, mb, kg: x.k.length * h.P.kindergeld.betrag, sz: x.k.length * h.P.gsg.sofortzuschlag };
});

export default definePage({
  id: 'buergergeld-2026',
  group: 'grundsicherung',
  order: 12,
  slug: 'buergergeld-2026',
  nav: 'Bürgergeld 2026: Regelsätze',
  card: 'Die sechs Regelsätze 2026, warum sie nicht gestiegen sind und was 2027 offen ist.',
  title: 'Bürgergeld 2026: Regelsätze, Nullrunde und neuer Name',
  description: `Bürgergeld 2026: Regelsatz ${P.regelbedarf.rbs1} € für Alleinstehende, alle sechs Stufen, warum es eine Nullrunde gab, Sofortzuschlag für Kinder und was für 2027 noch offen ist.`,
  h1: 'Bürgergeld 2026: Höhe der Regelsätze und was aus ihnen wird',
  intro: 'Die Regelsätze 2026 sind dieselben wie 2024 und 2025. Seit Juli heißt die Leistung Grundsicherungsgeld.',
  mini: { kind: 'mini:regelsatz' },
  related: ['neue-grundsicherung', 'buergergeld-rechner', 'mehrbedarf', 'bildung-und-teilhabe', 'grundsicherungsgeld-rechner'],
  sources: ['rbsfv_2026', 'sgb12_anlage', 'sgb2_20', 'sgb2_72', 'bgbl_2026_107', 'sgb2_42'],
  resume: (h) => {
    const R = h.P.regelbedarf;
    return `Der Regelsatz des Bürgergeldes beträgt 2026 für Alleinstehende und Alleinerziehende ${h.m(R.rbs1)} im Monat, für Partner je ${h.m(R.rbs2)}, für Erwachsene unter 25 Jahren im Haushalt der Eltern ${h.m(R.rbs3)}, für Jugendliche von 14 bis 17 Jahren ${h.m(R.rbs4)}, für Kinder von 6 bis 13 ${h.m(R.rbs5)} und für Kinder unter 6 ${h.m(R.rbs6)}. Das legt die ${h.src('rbsfv_2026', 'Regelbedarfsstufen-Fortschreibungsverordnung 2026')} fest. Die Beträge sind gegenüber 2025 nicht gestiegen, weil die gesetzliche Fortschreibung niedrigere Werte ergeben hätte und eine Kürzung ausgeschlossen ist. Seit dem ${h.date(h.P.reform.inkraft)} heißt die Leistung Grundsicherungsgeld (${h.P.reform.bgbl}); die Regelsätze hat diese Reform nicht verändert. Kinder erhalten zusätzlich einen Sofortzuschlag von ${h.m(h.P.gsg.sofortzuschlag)} im Monat (§ 72 SGB II). Miete und Heizung zahlt das Jobcenter getrennt, soweit sie angemessen sind. Für 2027 ist am ${h.date(h.TODAY)} noch keine neue Verordnung verkündet.`;
  },
  faqs: (h) => [
    { q: 'Wird der Regelsatz im Januar 2027 erhöht?', a: `Das entscheidet eine Verordnung, die bis ${h.date(h.TODAY)} nicht im Bundesgesetzblatt steht. Ein Entwurf des Haushaltsbegleitgesetzes 2027 liegt dem Bundestag vor. Solange nichts verkündet ist, rechnen Jobcenter und dieser Rechner mit ${h.m(h.P.regelbedarf.rbs1)} für Alleinstehende. Eine Senkung ist nach dem Gesetz ausgeschlossen, die Beträge können also nur gleich bleiben oder steigen.` },
    { q: 'Wann wird das Grundsicherungsgeld überwiesen?', a: `Monatlich im Voraus (§ 42 SGB II), in der Regel so, dass das Geld am ersten Werktag des Monats auf dem Konto ist. Auf Antrag kann das Jobcenter bis zu ${h.m(h.P.gsg.vorschussMax)} des nächsten Monats vorzeitig auszahlen; der Betrag wird dann im Folgemonat abgezogen. Das geht höchstens einmal in drei Monaten und nicht, wenn eine Minderung läuft.` },
    { q: 'Ist der Strom im Regelsatz enthalten?', a: 'Ja. Haushaltsstrom, Kleidung, Essen, Telefon und Internet, Körperpflege, Freizeit und kleine Anschaffungen zahlen Sie aus dem Regelsatz. Getrennt übernimmt das Jobcenter die Miete, die Heizung und warmes Wasser, wenn es zentral erzeugt wird. Wird das Wasser mit einem Boiler oder Durchlauferhitzer erwärmt, gibt es dafür einen Mehrbedarf.' },
    { q: 'Wer bekommt den Sofortzuschlag von 25 Euro?', a: `Jedes Kind und jeder junge Erwachsene unter 25 im Grundsicherungsgeld mit Regelbedarfsstufe 3 bis 6, also ${h.m(h.P.gsg.sofortzuschlag)} zusätzlich zum Regelbedarf. Auch Kinder, die nur Bildung und Teilhabe bekommen oder nur wegen des Kindergeldes keinen Anspruch haben, erhalten ihn. Im Kinderzuschlag steckt derselbe Betrag bereits im Höchstbetrag von ${h.m(h.P.kiz.hoechst)}.` },
  ],
  body: (h) => {
    const R = h.P.regelbedarf; const H = haushalte(h);
    return `
<h2>Die sechs Regelbedarfsstufen</h2>
${h.table(['Stufe', 'Für wen', 'Betrag 2026', 'Im Jahr'], [
  ['1', 'Alleinstehende, Alleinerziehende, Volljährige mit minderjährigem Partner', h.m(R.rbs1), h.m(R.rbs1 * 12)],
  ['2', 'Jede von zwei Partnerinnen oder Partnern in einer Bedarfsgemeinschaft', h.m(R.rbs2), h.m(R.rbs2 * 12)],
  ['3', 'Erwachsene unter 25 Jahren im Haushalt der Eltern, Erwachsene in Einrichtungen', h.m(R.rbs3), h.m(R.rbs3 * 12)],
  ['4', 'Jugendliche vom 14. bis zum 18. Geburtstag', h.m(R.rbs4), h.m(R.rbs4 * 12)],
  ['5', 'Kinder vom 6. bis zum 14. Geburtstag', h.m(R.rbs5), h.m(R.rbs5 * 12)],
  ['6', 'Kinder bis zum 6. Geburtstag', h.m(R.rbs6), h.m(R.rbs6 * 12)],
], `Quelle: ${h.src('rbsfv_2026', 'RBSFV 2026')}, gültig ab ${h.date(R.from)}.`, ['l', 'l', 'r', 'r'])}
<p>Die Altersgrenzen sind genau zu lesen: Stufe 6 gilt bis zum 6. Geburtstag, Stufe 5 vom 6. bis zum 14. Geburtstag, Stufe 4 vom 14. bis zum 18. Geburtstag. Das Gesetz spricht vom „Beginn des siebten bis zur Vollendung des 14. Lebensjahres“; das siebte Lebensjahr beginnt mit dem 6. Geburtstag. Tabellen, die „7 bis 14 Jahre“ schreiben, verschieben die Grenze um ein Jahr.</p>

<h2>Warum es 2026 keine Erhöhung gab</h2>
<p>Die Regelsätze werden jedes Jahr fortgeschrieben, nach einem Mischindex aus Preisen und Nettolöhnen. Seit 2023 kommt eine ergänzende Fortschreibung dazu, die die Preisentwicklung des letzten Halbjahres nachholt. In den Jahren 2023 und 2024 führte das zu großen Sprüngen, zusammen um mehr als ein Fünftel. Als die Inflation danach sank, hätte die Rechnung für 2025 und 2026 Beträge unter dem Stand von 2024 ergeben. Das Gesetz schützt davor: Ergibt die Fortschreibung einen niedrigeren Betrag, bleibt der bisherige (${h.src('sgb12_28a', '§ 28a Abs. 5 SGB XII')}). Deshalb gilt seit Januar 2024 derselbe Betrag von ${h.m(R.rbs1)} für Alleinstehende.</p>
<p>Für die Haushalte bedeutet das real weniger Kaufkraft: Die Preise sind weiter gestiegen, die Beträge nicht. Wer seinen Bedarf vergleicht, sollte deshalb nicht mit älteren Rechnern arbeiten, die noch Prognosen einer Erhöhung enthielten.</p>

<h2>Was ein Haushalt ohne Einkommen im Monat bekommt</h2>
<p>Die folgende Tabelle zeigt nur die Regelbedarfe, den Mehrbedarf für Alleinerziehende und den Sofortzuschlag für Kinder, ohne Miete und Heizung. Das Kindergeld steht daneben, weil es als Einkommen der Kinder angerechnet wird: Es erhöht das Geld des Haushalts nicht, sondern ersetzt einen Teil des Grundsicherungsgeldes.</p>
${h.table(['Haushalt', 'Regelbedarfe', 'Mehrbedarf', 'Sofortzuschlag', 'davon durch Kindergeld gedeckt'], H.map((x) => [x.n, h.m(x.rb), x.mb ? h.m2(x.mb) : '–', x.sz ? h.m(x.sz) : '–', x.kg ? h.m(x.kg) : '–']), 'Miete und Heizung kommen in tatsächlicher, angemessener Höhe dazu.', ['l', 'r', 'r', 'r', 'r'])}
<!--tool:mini:regelsatz-->

<h2>Was mit dem Regelsatz bezahlt wird</h2>
<p>Der Regelsatz ist eine Pauschale. Er deckt Ernährung, Kleidung und Schuhe, Haushaltsstrom und Wohnungsinstandhaltung, Möbel und Haushaltsgeräte, Gesundheitspflege, Verkehr, Telefon und Internet, Freizeit und Kultur, Bildung und Gaststätten. Wie viel für welchen Bereich vorgesehen ist, steht im Regelbedarfs-Ermittlungsgesetz; das Jobcenter fragt aber nicht nach, wofür Sie das Geld ausgeben. Sie können umschichten, etwa beim Essen sparen und dafür ein Gerät ersetzen.</p>
<p>Nicht im Regelsatz enthalten sind:</p>
<ul>
<li>Miete, Nebenkosten und Heizung (§ 22 SGB II).</li>
<li>Erstausstattung der Wohnung, Erstausstattung bei Schwangerschaft und Geburt, orthopädische Schuhe und Reparaturen therapeutischer Geräte (§ 24 Abs. 3).</li>
<li>Mehrbedarfe für Schwangere, Alleinerziehende, Menschen mit Behinderung, kostenaufwendige Ernährung, dezentrale Warmwasserbereitung und Schulbücher (${h.a('mehrbedarf', 'Mehrbedarf')}).</li>
<li>Leistungen für Bildung und Teilhabe der Kinder: Schulbedarf, Ausflüge, Klassenfahrten, Mittagessen, Lernförderung und Vereinsbeiträge (${h.a('bildung-und-teilhabe', 'Bildung und Teilhabe')}).</li>
</ul>
<p>Für einen unabweisbaren Bedarf, den der Regelsatz decken müsste, das Geld aber nicht reicht, etwa eine kaputte Waschmaschine, gibt das Jobcenter ein Darlehen (§ 24 Abs. 1). Es wird mit monatlich ${h.pc(h.P.gsg.darlehenAufrechnung)} des Regelbedarfs aufgerechnet (§ 42a Abs. 2).</p>

<h2>Der neue Name und die Übergangszeit</h2>
<p>Das Bürgergeld gab es vom 1. Januar 2023 bis zum 30. Juni 2026. Das ${h.P.reform.gesetz}, verkündet am ${h.date(h.P.reform.verkuendet)}, hat es in Grundsicherungsgeld umbenannt. Für den Zahlbetrag hat das keine Folgen; die neuen Regeln betreffen Vermögen, Miete, Pflichten und Minderungen (${h.a('neue-grundsicherung', 'neue Grundsicherung')}). Behörden dürfen bis ${h.date(h.P.reform.buergergeldBegriffBis)} weiter „Bürgergeld“ schreiben, und viele Formulare tragen noch den alten Namen. Ein Bescheid über „Bürgergeld“ aus dem Herbst 2026 ist deshalb kein Fehler.</p>

<h2>Was für 2027 offen ist</h2>
<p>Die Bundesregierung legt die Regelsätze für das folgende Jahr in der Regel im Herbst per Verordnung fest. Am ${h.date(h.TODAY)} ist die Verordnung für 2027 nicht verkündet. Im Bundestag liegt der Entwurf eines Haushaltsbegleitgesetzes 2027, der das Verfahren der Fortschreibung ändern würde. Diese Website nennt keine Prognose: Sobald ein Betrag im Bundesgesetzblatt steht, übernimmt ihn der Rechner mit dem Datum, ab dem er gilt. Bis dahin gilt ${h.m(R.rbs1)}.</p>

<h2>Regelsatz und Arbeit</h2>
<p>Wer arbeitet, behält einen Teil des Lohns zusätzlich zum Regelsatz, höchstens ${h.m(h.GSG.erwerbsfreibetrag(9999, false))} ohne und ${h.m(h.GSG.erwerbsfreibetrag(9999, true))} mit minderjährigem Kind. Ab einem bestimmten Lohn lohnt der Blick auf Wohngeld, das bei kleinem Einkommen oft vorgeht. Die Grenze für Ihren Haushalt zeigt der ${h.a('buergergeld-rechner', 'Bürgergeld-Rechner')} oder die Seite ${h.a('aufstocker', 'Aufstocken')}.</p>

<h2>Junge Erwachsene unter 25</h2>
<p>Wer zwischen 18 und 24 Jahre alt ist und bei den Eltern wohnt, gehört zu deren Bedarfsgemeinschaft und bekommt den Regelbedarf der Stufe 3 von ${h.m(R.rbs3)}. Zieht ein junger Mensch ohne Zusicherung des Jobcenters aus, bleibt es bis zum 25. Geburtstag bei diesem Betrag, und die Miete der neuen Wohnung wird in der Regel nicht übernommen (§ 20 Abs. 3, § 22 Abs. 5 SGB II). Die Zusicherung muss erteilt werden, wenn schwerwiegende soziale Gründe gegen das Wohnen bei den Eltern sprechen, wenn der Umzug für die Arbeit nötig ist oder bei einem ähnlich schwerwiegenden Grund. Wer mit Partnerin oder Partner einen eigenen Haushalt gründet, erhält ${h.m(R.rbs2)}, wer allein mit eigenem Kind lebt, ${h.m(R.rbs1)}.</p>

<h2>Regelsatz, Kindergeld und Kinderzuschlag nebeneinander</h2>
<p>Für Kinder gibt es drei Zahlen, die oft verwechselt werden. Der Regelbedarf des Kindes (${h.m(R.rbs6)} bis ${h.m(R.rbs4)}) ist der Betrag, den das Jobcenter für den Lebensunterhalt des Kindes ansetzt. Das Kindergeld von ${h.m(h.P.kindergeld.betrag)} bekommt jede Familie, es wird im Grundsicherungsgeld aber als Einkommen des Kindes angerechnet. Der Kinderzuschlag von bis zu ${h.m(h.P.kiz.hoechst)} ist für Familien gedacht, die mit ihrem Lohn den eigenen Bedarf decken, aber nicht den der Kinder. Kindergeld und Kinderzuschlag zusammen ergeben ${h.m(h.P.kindergeld.betrag + h.P.kiz.hoechst)} je Kind und sollen das sächliche Existenzminimum eines Kindes ohne Bildung und Teilhabe decken. Ob Grundsicherungsgeld oder Kinderzuschlag für Ihre Familie gilt, zeigt der ${h.a('wohngeld-oder-grundsicherung', 'Vergleich')}.</p>

<h2>Wie sich der Zahlbetrag zusammensetzt</h2>
<p>Auf dem Bescheid stehen die Regelbedarfe aller Personen, die Mehrbedarfe und die Kosten der Unterkunft, davon abgezogen das anrechenbare Einkommen. Der Zahlbetrag ist also fast nie die Summe der Regelsätze. Eine Familie mit Lohn erhält oft nur einen Teil davon, weil der Lohn nach Abzug der Freibeträge angerechnet wird. Umgekehrt kann eine alleinstehende Person ohne Einkommen in einer Stadt mit hohen Mieten mehr als das Doppelte des Regelsatzes erhalten, weil die Miete dazukommt. Wer seinen Bescheid prüfen will, vergleicht ihn Zeile für Zeile mit dem Rechenweg des ${h.a('grundsicherungsgeld-rechner', 'Grundsicherungsgeld-Rechners')}.</p>

<h2>Regelsatz und Grundsicherung im Alter</h2>
<p>Dieselben sechs Beträge gelten in der Sozialhilfe und der Grundsicherung im Alter und bei Erwerbsminderung nach dem Zwölften Buch, weil beide Gesetze auf dieselbe Anlage verweisen (${h.src('sgb12_anlage', 'Anlage zu § 28 SGB XII')}). Wer die Altersgrenze der Rente erreicht hat und mit seiner Rente unter dem Bedarf bleibt, bekommt also denselben Regelsatz von ${h.m(R.rbs1)}, aber vom Sozialamt und mit anderen Regeln für Vermögen. Für Rentnerinnen und Rentner mit kleiner Rente ist oft Wohngeld der günstigere Weg, weil es Vermögen nur bei erheblichen Beträgen berücksichtigt.</p>
<p>Wer wissen will, wie viel davon im eigenen Fall ankommt, rechnet mit dem Rechner oben: Er zieht vom Regelbedarf und der Miete das Einkommen ab und zeigt, ob überhaupt das Jobcenter zuständig ist.</p>
`;
  },
});
