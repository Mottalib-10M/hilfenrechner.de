import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'aufstocker',
  group: 'vergleich',
  order: 4,
  slug: 'aufstocker',
  nav: 'Aufstocken trotz Arbeit',
  card: 'Wer arbeitet und trotzdem zu wenig hat: Grundsicherungsgeld, Wohngeld oder Kinderzuschlag.',
  title: 'Aufstocken 2026: Grundsicherungsgeld oder Wohngeld zum Lohn',
  description: 'Aufstocken trotz Job: ab welchem Lohn Grundsicherungsgeld, Wohngeld oder Kinderzuschlag aufstocken, wie viel vom Verdienst bleibt und wo Sie den Antrag stellen.',
  h1: 'Aufstocken: wenn der Lohn nicht reicht',
  intro: 'Wer Vollzeit oder Teilzeit arbeitet und trotzdem unter dem Bedarf bleibt, hat Anspruch auf ergänzende Leistungen. Welche, hängt vom Lohn, der Miete und den Kindern ab.',
  tool: { kind: 'haushalt', props: { paar: false, kinder: '', brutto1: 1100, miete: 520, heizung: 80, ort: 'Bremen' } },
  related: ['hinzuverdienst', 'wohngeld-oder-grundsicherung', 'vorrangpruefung', 'wohngeld-rechner', 'grundsicherungsgeld-rechner'],
  sources: ['sgb2_11b', 'sgb2_12a', 'wogg_19', 'sgb4_20', 'ba_weisung_202604002'],
  resume: (h) => {
    const v = h.VG.vergleich({ paar: false, brutto: [1100], kinder: [], unterhalt: 0, miete: 520, heizung: 80, mietstufe: 4, elterngeld: 0, sonstiges: 0 });
    return `Aufstocken heißt: Der Lohn deckt den Bedarf nicht, und eine Sozialleistung gleicht die Lücke aus. Bis Juni 2026 war damit meist Bürgergeld gemeint, heute Grundsicherungsgeld; oft ist aber Wohngeld der richtige Weg, weil es vorgeht, sobald es den Bedarf deckt. Vom Lohn bleiben im Grundsicherungsgeld ${h.m(h.P.gsg.freibetrag.grund)} frei, vom Teil darüber gestaffelt ${(h.P.gsg.freibetrag.stufen as number[][]).map((s) => h.pc(s[2])).join(', ').replace(/, ([^,]*)$/, ' und $1')}, höchstens ${h.m(h.GSG.erwerbsfreibetrag(9999, false))} ohne und ${h.m(h.GSG.erwerbsfreibetrag(9999, true))} mit Kind. Beispiel: Eine alleinstehende Person mit ${h.m(1100)} brutto (Netto etwa ${h.m(v.nettoSumme)}) und ${h.m(600)} Warmmiete in Mietstufe IV hätte ${h.m(v.gsg.anspruch)} Grundsicherungsgeld, aber ${h.m(v.wg.wohngeld)} Wohngeld; ${v.empfehlung === 'vorrang' ? 'das Wohngeld deckt den Bedarf, also gilt Wohngeld' : 'das Wohngeld reicht nicht, also bleibt das Jobcenter zuständig'}. Mit dem Mindestlohn von ${h.m2(h.P.sv.mindestlohn)} je Stunde brauchen vor allem Teilzeitkräfte, Familien und Menschen mit hoher Miete eine Ergänzung zum eigenen Lohn.`;
  },
  faqs: (h) => [
    { q: 'Lohnt sich ein Minijob neben dem Grundsicherungsgeld?', a: `Ein Minijob bis ${h.m(h.P.sv.geringfuegig)} bringt Ihnen ${h.m(h.GSG.erwerbsfreibetrag(h.P.sv.geringfuegig, false))} mehr im Monat, weil die ersten ${h.m(h.P.gsg.freibetrag.grund)} und ein Teil darüber frei bleiben. Der Rest wird angerechnet. Wer mehr Stunden arbeitet, behält mehr in Euro, aber einen kleineren Anteil jedes zusätzlichen Euros. Für Schüler, Azubis und Studierende unter 25 gelten höhere Freibeträge.` },
    { q: 'Muss ich als Aufstocker Bewerbungen schreiben?', a: 'Ja, wenn Sie Grundsicherungsgeld bekommen und erwerbsfähig sind, gilt der Kooperationsplan auch für Sie. Das Jobcenter kann verlangen, dass Sie sich um eine Stelle mit mehr Stunden oder höherem Lohn bemühen. Wer Wohngeld und Kinderzuschlag bekommt, hat diese Pflichten nicht; das ist für viele ein Grund, diesen Weg zu wählen.' },
    { q: 'Was ist mit Weihnachtsgeld und Nachzahlungen?', a: 'Einmalige Einnahmen wie Weihnachtsgeld zählen im Grundsicherungsgeld im Monat des Zuflusses. Würde der Anspruch dadurch in diesem Monat entfallen, verteilt das Jobcenter sie auf sechs Monate. Beim Wohngeld wird das Jahreseinkommen geschätzt, Sonderzahlungen gehören also von vornherein dazu und sollten im Antrag stehen.' },
  ],
  body: (h) => {
    const rows = [700, 1000, 1300, 1600, 1900, 2200].map((b) => { const v = h.VG.vergleich({ paar: false, brutto: [b], kinder: [], unterhalt: 0, miete: 520, heizung: 80, mietstufe: 4, elterngeld: 0, sonstiges: 0 }); return [h.m(b), h.m(v.nettoSumme), h.m(v.gsg.anspruch), h.m(v.wg.wohngeld), v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : v.empfehlung === 'vorrang' ? 'Wohngeld' : 'keine Leistung']; });
    const stunden = (b: number) => Math.round(b / h.P.sv.mindestlohn / 4.33);
    return `
<h2>Ab welchem Lohn Wohngeld statt Grundsicherungsgeld</h2>
<p>Für eine alleinstehende Person mit ${h.m(520)} Bruttokaltmiete und ${h.m(80)} Heizkosten in Mietstufe IV sieht der Übergang so aus:</p>
${h.table(['Brutto', 'Netto', 'Grundsicherungsgeld', 'Wohngeld', 'Es gilt'], rows, 'Steuerklasse I, Recht am ' + h.date(h.TODAY) + '.', ['r', 'r', 'r', 'r', 'l'])}
<p>Mit dem Mindestlohn entsprechen ${h.m(1000)} brutto etwa ${stunden(1000)} Wochenstunden, ${h.m(1600)} etwa ${stunden(1600)} Stunden. Im Bereich dazwischen wechselt der Weg: Das Wohngeld rechnet mit festen Höchstbeträgen für die Miete und lässt mehr vom Lohn übrig, das Grundsicherungsgeld deckt die Miete genauer, rechnet den Lohn aber stärker an. Die Grenze verschiebt sich mit der Miete; im Rechner oben sehen Sie Ihren Punkt.</p>

<h2>Midijob: weniger Abzüge bis ${h.m(h.P.sv.uebergangBis)}</h2>
<p>Zwischen ${h.m(h.P.sv.geringfuegig)} und ${h.m(h.P.sv.uebergangBis)} brutto liegt der Übergangsbereich. Die Beiträge zur Sozialversicherung steigen dort langsam an, weil sie nur auf einen verminderten Betrag berechnet werden (§ 20 Abs. 2a SGB IV). Der Rechner berücksichtigt das beim Netto. Für Aufstocker heißt das: Ein Lohn knapp über der Minijobgrenze kostet kaum mehr Abgaben, und die Rente zählt voll.</p>

<h2>Was Sie vor dem Antrag klären sollten</h2>
<ul>
<li>Lohnabrechnungen der letzten Monate und, bei schwankendem Lohn, eine Schätzung für die nächsten sechs Monate.</li>
<li>Mietvertrag, aktuelle Nebenkostenabrechnung, Abschlag für Heizung.</li>
<li>Kontoauszüge, Nachweise über Vermögen, bei Kindern Kindergeld und Unterhalt.</li>
</ul>
<p>Stellen Sie im Zweifel den Wohngeldantrag und den Antrag beim Jobcenter zur selben Zeit. Lehnt das Jobcenter ab, weil Wohngeld vorgeht, verlieren Sie keinen Monat; lehnt die Wohngeldstelle ab, weil das Jobcenter zuständig ist, ebenso nicht. Die genaue Regel steht unter ${h.a('vorrangpruefung', 'Vorrangprüfung')}, die Rechnung des Freibetrags unter ${h.a('hinzuverdienst', 'Hinzuverdienst')}.</p>

<h2>Mit Kindern sieht die Rechnung anders aus</h2>
<p>Für Eltern kommt der Kinderzuschlag dazu, und der Freibetrag auf den Lohn reicht mit minderjährigem Kind bis ${h.m(h.P.gsg.freibetrag.obenKind)} brutto. Familien mit mittlerem Lohn wechseln deshalb oft schon früher vom Grundsicherungsgeld zu Kinderzuschlag und Wohngeld als Alleinstehende. Wer Kinder hat, sollte den Rechner oben mit dem Alter der Kinder füllen oder direkt den ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')} nutzen. Für Alleinerziehende mit Unterhaltsvorschuss gibt es eine eigene Seite: ${h.a('alleinerziehend-leistungen', 'Leistungen für Alleinerziehende')}.</p>
<p>Wichtig für alle, die neu anfangen zu arbeiten: Der erste Lohn kommt oft erst am Ende des Monats oder im Folgemonat. Das Jobcenter rechnet Einkommen in dem Monat an, in dem es zufließt. Wer im Antrag den Zuflusstermin angibt, vermeidet Rückforderungen.</p>
<p>Bei Fragen zur Zuständigkeit hilft die Wohngeldstelle Ihrer Stadt oder das Jobcenter; beide müssen Anträge annehmen und weiterleiten.</p>
`;
  },
});
