import { definePage } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const FAKTOR = String(P.kdu.deckelFaktor).replace('.', ',');

export default definePage({
  id: 'grundsicherung-miete',
  group: 'grundsicherung',
  order: 17,
  slug: 'grundsicherung-miete',
  nav: 'Miete und Heizung im Grundsicherungsgeld',
  card: 'Karenzzeit mit Deckel, Angemessenheit, Mietpreisbremse, Umzug und Heizkosten.',
  title: 'Miete im Grundsicherungsgeld 2026: Karenzzeit mit Deckel',
  description: `Miete im Grundsicherungsgeld seit Juli 2026: Karenzzeit von einem Jahr mit Deckel beim ${FAKTOR}-fachen, Angemessenheit, Mietpreisbremse, Umzug, Heizkosten, Kaution.`,
  h1: 'Miete und Heizung: was das Jobcenter übernimmt',
  intro: 'Das Jobcenter zahlt Miete und Heizung zusätzlich zum Regelbedarf, aber nicht in jeder Höhe. Seit Juli 2026 gilt auch im ersten Jahr eine Obergrenze. Der Rechner zeigt, was übernommen wird.',
  mini: { kind: 'mini:karenz' },
  related: ['neue-grundsicherung', 'wohngeld-oder-grundsicherung', 'grundsicherungsgeld-rechner', 'wohngeld-2026', 'sanktionen'],
  sources: ['sgb2_22', 'bgbl_2026_107', 'sgb2_41', 'sgb2_21'],
  resume: (h) => `Das Jobcenter erkennt Miete und Heizung in Höhe der tatsächlichen Kosten an, soweit sie angemessen sind (§ 22 SGB II). Im ersten Jahr des Bezugs gilt eine Karenzzeit: Die Miete wird ohne Angemessenheitsprüfung übernommen. Seit dem ${h.date(h.P.reform.inkraft)} gilt das aber nur bis zum ${h.dec(h.P.kdu.deckelFaktor, 1)}-fachen der Grenze, die die Kommune als angemessen festgelegt hat; was darüber liegt, zahlt das Jobcenter auch im ersten Jahr nicht, außer in Haushalten mit Kindern oder wenn die Kosten unabweisbar sind. Liegt die Miete über der Mietpreisbremse oder über einer kommunalen Obergrenze je Quadratmeter, gilt sie sofort als unangemessen, und das Amt fordert Sie auf, den Verstoß beim Vermieter zu rügen. Nach der Karenzzeit zahlt das Jobcenter unangemessene Kosten in der Regel noch höchstens ${h.P.gsg.bewilligungKurzMonate} Monate, dann nur noch das Angemessene. Heizkosten sind von der Karenzzeit ausgenommen und werden immer auf Angemessenheit geprüft. Beispiel: Bei ${h.m(500)} angemessener Miete und ${h.m(800)} tatsächlicher Miete übernimmt das Jobcenter im ersten Jahr höchstens ${h.m(500 * h.P.kdu.deckelFaktor)}.`,
  faqs: (h) => [
    { q: 'Woher weiß ich, welche Miete in meiner Stadt angemessen ist?', a: 'Jede Kommune legt die Werte in einem schlüssigen Konzept fest, getrennt nach Haushaltsgröße, oft auch nach Stadtteil. Die Werte stehen in den Richtlinien zu den Kosten der Unterkunft, die viele Städte und Landkreise veröffentlichen. Das Jobcenter muss Ihnen mitteilen, wenn Ihre Miete darüber liegt, und Sie über Dauer und Voraussetzungen der Übernahme informieren.' },
    { q: 'Was passiert, wenn ich ohne Zustimmung umziehe?', a: 'Bei einem Umzug innerhalb desselben Vergleichsraums ohne notwendigen Grund übernimmt das Jobcenter höchstens die bisherige Miete. Bei einem Umzug in ein anderes Gebiet zahlt es höhere als angemessene Kosten nur, wenn das neue Jobcenter vorher schriftlich zugesichert hat. Holen Sie die Zusicherung vor der Unterschrift unter den Mietvertrag ein.' },
    { q: 'Übernimmt das Jobcenter die Nachzahlung aus der Nebenkostenabrechnung?', a: 'Ja, im Monat der Fälligkeit als Bedarf für Unterkunft und Heizung, soweit die Kosten angemessen sind. Reichen Sie die Abrechnung sofort ein. Ein Guthaben mindert umgekehrt die Kosten im Monat nach der Gutschrift. Rückzahlungen für Haushaltsstrom oder für Kosten, die das Jobcenter nicht übernommen hat, bleiben dabei außer Betracht.' },
    { q: 'Gilt die Karenzzeit neu, wenn ich zwischendurch gearbeitet habe?', a: `Wird der Bezug in der Karenzzeit für mindestens einen Monat unterbrochen, verlängert sie sich um die Monate ohne Leistung. Eine ganz neue Karenzzeit von einem Jahr beginnt erst, wenn Sie vorher mindestens ${h.P.gsg.neueKarenzNachJahren} Jahre keine Leistungen nach dem SGB II oder SGB XII bezogen haben.` },
  ],
  body: (h) => {
    const f = h.P.kdu.deckelFaktor;
    const bsp = [[450, 520], [450, 700], [600, 850], [600, 1000], [800, 1300]].map(([a, t]) => [h.m(a), h.m(t), h.m(Math.min(t, a * f)), h.m(Math.max(0, t - a * f)), h.m(Math.min(t, a))]);
    return `
<h2>Die drei Phasen</h2>
${h.table(['Phase', 'Was übernommen wird', 'Rechtsgrundlage'], [
  [`Karenzzeit (erste ${h.P.gsg.karenzMieteMonate} Monate)`, `tatsächliche Miete, höchstens das ${h.dec(f, 1)}-fache des Angemessenen; mit Kindern oder bei Unabweisbarkeit im Einzelfall mehr`, '§ 22 Abs. 1 Satz 2 bis 7'],
  ['Kostensenkung nach der Karenzzeit', `tatsächliche Miete, solange ein Umzug nicht möglich oder zumutbar ist, in der Regel höchstens ${h.P.gsg.bewilligungKurzMonate} Monate`, '§ 22 Abs. 1 Satz 9 und 10'],
  ['danach', 'nur noch die angemessene Miete; den Rest zahlen Sie selbst', '§ 22 Abs. 1 Satz 1'],
], undefined, ['l', 'l', 'l'])}
<p>Heizkosten fallen nicht unter die Karenzzeit. Sie werden von Anfang an übernommen, soweit sie angemessen sind; sind sie es nicht, gilt dieselbe Frist zur Kostensenkung wie für die Miete.</p>

<h2>Der Deckel in Zahlen</h2>
${h.table(['Angemessen', 'Tatsächlich', 'Im ersten Jahr übernommen', 'Selbst zu zahlen', 'Nach der Senkungsfrist'], bsp, `Deckel: ${h.dec(f, 1)}-faches der abstrakt angemessenen Unterkunftskosten. Beträge im Monat.`, ['r', 'r', 'r', 'r', 'r'])}
<p>Vor Juli 2026 hätten alle fünf Haushalte im ersten Jahr die volle Miete bekommen. Heute zahlen die Haushalte in den Zeilen mit sehr hoher Miete schon ab dem ersten Monat einen Teil selbst. Haushalte mit Kindern können im Einzelfall mehr erhalten; das Gesetz nennt sie ausdrücklich, ohne einen Betrag zu bestimmen.</p>

<h2>Sofort unangemessen: Mietpreisbremse und Quadratmeter-Obergrenze</h2>
<p>Zwei neue Regeln schalten die Karenzzeit ganz aus. Die tatsächlichen Kosten gelten von Anfang an als unangemessen, soweit</p>
<ul>
<li>die Kommune eine Obergrenze je Quadratmeter Wohnfläche bestimmt hat und Ihre Miete darüber liegt, oder</li>
<li>die vereinbarte Miete die nach der Mietpreisbremse (§§ 556d bis 556g BGB) zulässige Höhe übersteigt.</li>
</ul>
<p>Im zweiten Fall muss Sie die Kommune auffordern, den Verstoß gegenüber dem Vermieter zu rügen. Das hat einen Zweck: Mit einer Rüge können Mieterinnen und Mieter zu viel gezahlte Miete zurückverlangen und die Miete auf das zulässige Maß senken (§ 556g BGB). Wer die Rüge ausspricht, verkleinert also die Lücke, die er sonst selbst tragen müsste.</p>

<h2>Umzug, Kaution, Genossenschaftsanteile</h2>
<p>Vor einem Umzug sollten Sie die Zusicherung des Jobcenters am neuen Ort einholen (§ 22 Abs. 4). Ist die neue Wohnung angemessen und liegt sie in einem anderen Vergleichsraum, muss das Jobcenter zusichern. Für Umzugskosten und Wohnungsbeschaffung ist das Jobcenter am alten Ort zuständig, für Kaution und Genossenschaftsanteile das am neuen Ort; beide Kosten werden nach vorheriger Zusicherung übernommen, Kaution und Anteile als Darlehen. Für junge Menschen unter 25 gilt eine strengere Regel: Ziehen sie ohne Zusicherung aus dem Elternhaus aus, übernimmt das Jobcenter die Miete in der Regel nicht.</p>

<h2>Mietschulden und Zahlung an den Vermieter</h2>
<p>Bestehen Mietrückstände, die zur Kündigung berechtigen, oder Energieschulden, die zur Sperre führen, zahlt das Jobcenter die Miete direkt an den Vermieter oder Versorger (§ 22 Abs. 7). Auf Ihren Antrag macht es das auch ohne Rückstände. Schulden kann das Jobcenter übernehmen, wenn das zur Sicherung der Wohnung gerechtfertigt ist, in der Regel als Darlehen.</p>

<h2>Miete im Vergleich mit dem Wohngeld</h2>
<p>Im Wohngeld zählt die Miete nur bis zum Höchstbetrag der Mietstufe, dazu feste Beträge für Heizung und Klima; die tatsächlichen Heizkosten spielen keine Rolle. Das Jobcenter dagegen zahlt die tatsächliche, angemessene Miete und die tatsächliche Heizung. In teuren Städten mit hohen Angemessenheitsgrenzen ist das Grundsicherungsgeld deshalb oft großzügiger bei der Miete. Welcher Weg für Sie gilt, zeigt der ${h.a('wohngeld-oder-grundsicherung', 'Vergleich')}; die Höchstbeträge stehen unter ${h.a('wohngeld-2026', 'Wohngeld 2026')}.</p>

<h2>Wie Kommunen die Angemessenheit festlegen</h2>
<p>Was angemessen ist, steht nicht im Gesetz, sondern in einem schlüssigen Konzept der Kommune oder des Landkreises. Es legt für jede Haushaltsgröße eine Wohnfläche und einen Quadratmeterpreis für einfachen Standard fest und multipliziert beides zur Obergrenze, der Bruttokaltmiete. Die Wohnflächen orientieren sich an den Regeln des Landes für den sozialen Wohnungsbau. Viele Kommunen veröffentlichen diese Tabellen in einer Richtlinie zu den Kosten der Unterkunft; das Jobcenter muss sie Ihnen auf Nachfrage nennen. Einige Länder erlauben Satzungen mit Pauschalen. Liegt Ihre Miete über dem Wert, zählt der Teil darüber nach der Karenzzeit nicht mehr, es sei denn, eine günstigere Wohnung ist tatsächlich nicht zu finden.</p>

<h2>Ein Jahr Karenzzeit im Beispiel</h2>
<p>Eine Alleinerziehende mit zwei Kindern zieht im Januar nicht um und beantragt Grundsicherungsgeld. Ihre Bruttokaltmiete beträgt ${h.m(1050)}, die Kommune hält für drei Personen ${h.m(720)} für angemessen. Der Deckel liegt bei ${h.m(720 * f)}. Weil Kinder im Haushalt leben, kann das Jobcenter im ersten Jahr auch mehr anerkennen; tut es das nicht, zahlt sie ${h.m(Math.max(0, 1050 - 720 * f))} im Monat selbst. Im Dezember erhält sie die Aufforderung, die Kosten zu senken. Ab Januar des Folgejahres läuft die Frist zur Kostensenkung von in der Regel ${h.P.gsg.bewilligungKurzMonate} Monaten; danach zahlt das Jobcenter nur noch ${h.m(720)}. Findet sie trotz nachgewiesener Suche keine günstigere Wohnung, muss das Jobcenter die höhere Miete weiter übernehmen.</p>

<h2>Wohnen bei Eltern, in einer WG oder zur Untermiete</h2>
<p>Leben mehrere Personen in einer Wohnung, teilt das Jobcenter die Kosten in der Regel nach Köpfen auf. Wer bei den Eltern wohnt und keine Miete zahlt, hat keinen Bedarf für Unterkunft; wer einen schriftlichen Untermietvertrag hat und die Miete tatsächlich zahlt, schon. In einer Wohngemeinschaft ohne Partnerschaft zählt nur der eigene Mietanteil. Bei einer Untervermietung an Dritte mindern die Einnahmen die Kosten.</p>

<h2>Wohneigentum: Zinsen statt Miete</h2>
<p>Wer in einer eigenen Wohnung oder einem eigenen Haus lebt, hat Kosten der Unterkunft in Form von Schuldzinsen, Grundsteuer, Gebäudeversicherung, Nebenkosten und Heizung. Das Jobcenter übernimmt sie im selben Rahmen wie eine Miete. Die Tilgung von Krediten zählt grundsätzlich nicht dazu, weil sie Vermögen aufbaut; Ausnahmen gibt es, wenn das Eigentum sonst verloren ginge. Für Reparaturen am selbst bewohnten Eigentum gibt es unabweisbare Aufwendungen als Bedarf, darüber hinaus ein Darlehen (§ 22 Abs. 2).</p>

<h2>Heizkosten: wann sie zu hoch sind</h2>
<p>Für Heizkosten gibt es keine Karenzzeit. Viele Jobcenter vergleichen die Kosten mit einem bundesweiten oder kommunalen Heizspiegel und gehen bei Werten über der Grenze für „zu hoch“ von unangemessenem Verbrauch aus. Das ist nur ein Anhaltspunkt: Schlechte Dämmung, alte Heizung, Erdgeschoss, kleine Kinder oder Krankheit können höhere Kosten begründen. Nachzahlungen aus der Jahresabrechnung übernimmt das Jobcenter im Monat der Fälligkeit; heizen Sie mit Öl, Holz oder Kohle, zahlt es die angemessene Bevorratung.</p>

<h2>Kosten der Unterkunft in Ihrem Bescheid</h2>
<p>Im Bescheid stehen die Kosten der Unterkunft getrennt nach Grundmiete, Nebenkosten und Heizung, aufgeteilt auf die Personen der Bedarfsgemeinschaft. Diesen Teil zahlt rechtlich die Kommune, den Regelbedarf der Bund; deshalb erscheinen manchmal zwei Zahlungen. Prüfen Sie, ob alle Bestandteile Ihrer Miete berücksichtigt sind, etwa Kabelanschluss, Aufzug oder Hausmeister, wenn sie im Mietvertrag stehen. Fehlt etwas, legen Sie innerhalb eines Monats Widerspruch ein. Wer mit der Miete im Rückstand ist, sollte nicht warten: Mietschulden gefährden die Wohnung schneller als jeder andere Rückstand, und das Jobcenter kann nur helfen, solange die Wohnung noch zu sichern ist.</p>

<h2>Umzug in eine günstigere Wohnung</h2>
<p>Fordert das Jobcenter Sie auf, die Kosten zu senken, müssen Sie sich nachweisbar um eine günstigere Wohnung bemühen: Wohnungsanzeigen, Anfragen bei Wohnungsbaugesellschaften, Absagen. Bewahren Sie alles auf. Findet sich in der Frist keine angemessene Wohnung, muss das Jobcenter die höhere Miete weiter übernehmen. Ein Umzug, den das Jobcenter veranlasst, löst die Übernahme der Umzugskosten aus; holen Sie vorher die Zusicherung ein.</p>
<p>Halten Sie Mietvertrag, die letzte Nebenkostenabrechnung und jede Mieterhöhung griffbereit. Das Jobcenter prüft die Angemessenheit in jedem Bewilligungszeitraum neu und braucht dafür die aktuellen Zahlen. Eine Nachforderung aus der Nebenkostenabrechnung reichen Sie sofort ein, denn sie gehört zum Bedarf des Monats, in dem sie fällig wird. Ein Guthaben mindert umgekehrt die Kosten der Unterkunft im Monat nach der Gutschrift.</p>
`;
  },
});
