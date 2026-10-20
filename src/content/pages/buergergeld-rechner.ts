import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'buergergeld-rechner',
  group: 'grundsicherung',
  order: 11,
  slug: 'buergergeld-rechner',
  nav: 'Bürgergeld-Rechner (neues Recht)',
  card: 'Der frühere Bürgergeld-Rechner, umgestellt auf das Grundsicherungsgeld seit Juli 2026.',
  title: 'Bürgergeld Rechner 2026: so viel zahlt das Jobcenter jetzt',
  description: 'Bürgergeld Rechner 2026 nach neuem Recht: seit 1. Juli heißt die Leistung Grundsicherungsgeld. Regelsatz, Miete, Freibeträge und Wohngeld für Ihren Haushalt.',
  h1: 'Bürgergeld-Rechner 2026, gerechnet nach dem neuen Recht',
  intro: 'Viele suchen noch „Bürgergeld“. Gemeint ist seit Juli 2026 das Grundsicherungsgeld. Der Rechner nutzt das geltende Recht und vergleicht gleich mit Wohngeld und Kinderzuschlag.',
  tool: { kind: 'haushalt', props: { paar: false, kinder: '7', brutto1: 900, miete: 560, heizung: 85, ort: 'Dortmund' } },
  related: ['neue-grundsicherung', 'buergergeld-2026', 'grundsicherungsgeld-rechner', 'alleinerziehend-leistungen', 'sanktionen'],
  sources: ['bgbl_2026_107', 'sgb2_65a', 'rbsfv_2026', 'sgb2_20', 'sgb2_12'],
  resume: (h) => {
    const v = h.VG.vergleich({ paar: false, brutto: [900], kinder: [7], unterhalt: 0, miete: 560, heizung: 85, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
    return `Ein Bürgergeld-Rechner im Oktober 2026 muss mit dem Recht rechnen, das seit dem ${h.date(h.P.reform.inkraft)} gilt. Das ${h.P.reform.gesetz} hat das Bürgergeld in Grundsicherungsgeld umbenannt und Vermögen, Miete und Minderungen neu geregelt; die Regelbedarfe sind dieselben: ${h.m(h.P.regelbedarf.rbs1)} für Alleinstehende und Alleinerziehende, ${h.m(h.P.regelbedarf.rbs2)} je Partner, für Kinder ${h.m(h.P.regelbedarf.rbs6)}, ${h.m(h.P.regelbedarf.rbs5)} oder ${h.m(h.P.regelbedarf.rbs4)} nach Alter. Bescheide dürfen bis ${h.date(h.P.reform.buergergeldBegriffBis)} noch „Bürgergeld“ heißen. Ein Beispiel mit dem Rechner oben: Eine Alleinerziehende mit einem Kind von 7 Jahren, ${h.m(900)} brutto und ${h.m(645)} Warmmiete hätte ${h.m(v.gsg.anspruch)} Grundsicherungsgeld; mit Wohngeld (${h.m(v.wg.wohngeld)}), Kinderzuschlag (${h.m(v.kiz.gesamt)}) und Unterhaltsvorschuss (${h.m(v.uvgSumme)}) ergibt sich ${v.empfehlung === 'vorrang' ? 'ein vorrangiger Weg ohne Jobcenter' : 'trotzdem ein Anspruch beim Jobcenter'}. Verbindlich ist der Bescheid.`;
  },
  faqs: (h) => [
    { q: 'Rechnen ältere Bürgergeld-Rechner noch richtig?', a: `Für den Betrag des Regelbedarfs meist ja, weil er 2026 nicht gestiegen ist. Bei Vermögen, Miete im ersten Jahr und Minderungen rechnen sie nach altem Recht. Seit dem ${h.date(h.P.reform.inkraft)} gelten Freibeträge nach Alter statt der Karenzzeit für Vermögen, ein Deckel für hohe Mieten und Minderungen von ${h.pc(h.P.minderung.satz)} für ${h.P.minderung.monate} Monate.` },
    { q: 'Bekomme ich wegen der Umbenennung weniger Geld?', a: 'Nein, die Umbenennung allein ändert keinen Betrag. Weniger kann es geben, wenn Ihre Miete über dem Eineinhalbfachen der örtlichen Grenze liegt, wenn Ihr Vermögen über dem neuen Freibetrag liegt oder wenn das Jobcenter eine Minderung feststellt. Für Vermögen gilt die neue Regel erst ab einem Bewilligungszeitraum, der nach dem 30. Juni 2026 beginnt.' },
    { q: 'Steigt das Bürgergeld 2027?', a: `Das steht noch nicht fest. Die Verordnung, die die Regelbedarfe für 2027 festlegt, ist am ${h.date(h.TODAY)} nicht verkündet; im Bundestag liegt ein Haushaltsbegleitgesetz, das die Methode ändern würde. Dieser Rechner rechnet bis zur Verkündung mit den Beträgen von 2026 und nennt keine Prognose.` },
  ],
  body: (h) => `
<h2>Was der Name ändert und was nicht</h2>
<p>Der Name Bürgergeld galt vom 1. Januar 2023 bis zum 30. Juni 2026. Seitdem steht im Gesetz Grundsicherungsgeld, das Zweite Buch heißt wieder „Grundsicherung für Arbeitsuchende“. Für Sie ändert der Name nichts am Zahlbetrag, an der Zuständigkeit des Jobcenters oder am laufenden Bescheid. Geändert haben sich Inhalte, die in diesem Rechner stecken oder als Hinweis im Ergebnis stehen:</p>
<ul>
<li><strong>Vermögen</strong>: Freibeträge von ${h.m((h.P.vermoegen.stufen as number[][])[0][2])} bis ${h.m((h.P.vermoegen.stufen as number[][])[3][2])} je Person nach Alter (${h.a('schonvermoegen', 'Schonvermögen')}).</li>
<li><strong>Miete</strong>: im ersten Jahr nur bis zum ${h.dec(h.P.kdu.deckelFaktor, 1)}-fachen der Angemessenheitsgrenze (${h.a('grundsicherung-miete', 'Miete und Heizung')}).</li>
<li><strong>Pflichten</strong>: Minderung um ${h.pc(h.P.minderung.satz)} des Regelbedarfs für ${h.P.minderung.monate} Monate, Wegfall des Regelbedarfs bei abgelehnter Arbeit (${h.a('sanktionen', 'Minderungen')}).</li>
<li><strong>Kinderbetreuung</strong>: Arbeit gilt schon ab dem vollendeten ${h.P.gsg.kinderbetreuungAbLebensmonat}. Lebensmonat des Kindes als zumutbar, wenn die Betreuung gesichert ist (§ 10 SGB II).</li>
</ul>

<h2>So nutzen Sie den Rechner</h2>
<p>Wählen Sie „Allein“ oder „Paar“ und tragen Sie das Alter der Kinder ein, getrennt durch Komma. Bruttolohn heißt der Lohn vor Steuern und Sozialabgaben; der Rechner schätzt daraus das Netto und zieht die Freibeträge ab. Bei der Miete zählt die Kaltmiete mit den kalten Nebenkosten, die Heizkosten tragen Sie getrennt ein. Der Wohnort bestimmt die Mietstufe für das Wohngeld. Unter „Mehr“ stehen Elterngeld und anderes Einkommen. Das Ergebnis zeigt den Weg, der nach dem Gesetz gilt, das Geld, das dem Haushalt insgesamt bleibt, und darunter den vollständigen Rechenweg nach dem SGB II.</p>

<h2>Die sechs Regelbedarfsstufen 2026</h2>
${h.table(['Stufe', 'Wer', '2026'], [
  ['1', 'Alleinstehende, Alleinerziehende', h.m(h.P.regelbedarf.rbs1)],
  ['2', 'Partner in der Bedarfsgemeinschaft', h.m(h.P.regelbedarf.rbs2)],
  ['3', 'Erwachsene unter 25 bei den Eltern', h.m(h.P.regelbedarf.rbs3)],
  ['4', 'Jugendliche von 14 bis 17', h.m(h.P.regelbedarf.rbs4)],
  ['5', 'Kinder von 6 bis 13', h.m(h.P.regelbedarf.rbs5)],
  ['6', 'Kinder unter 6', h.m(h.P.regelbedarf.rbs6)],
], 'Die Beträge 2026 entsprechen denen von 2025 (Nullrunde nach der Besitzschutzregel).', ['l', 'l', 'r'])}
<p>Die Beträge sind seit Januar 2024 gleich. Rechnerisch hätte die Fortschreibung für 2025 und 2026 niedrigere Werte ergeben; das Gesetz verbietet aber eine Kürzung, deshalb blieb es bei den alten Beträgen. Ausführlich: ${h.a('buergergeld-2026', 'Bürgergeld 2026')}.</p>

<h2>Wann der Rechner nicht reicht</h2>
<p>Bei selbständigem Einkommen, schwankendem Lohn, Einkommen aus dem Ausland, Studium mit BAföG-Anspruch oder Erwerbsminderung rechnet das Jobcenter mit eigenen Regeln. Auch Personen über der Altersgrenze der Rente fallen nicht unter das SGB II, sondern unter die Grundsicherung im Alter beim Sozialamt. In diesen Fällen hilft eine Sozialberatung vor Ort.</p>

<h2>Warum der Rechner auch Wohngeld zeigt</h2>
<p>Ein reiner Bürgergeld-Rechner beantwortet nur die Frage, wie viel das Jobcenter zahlen würde. Für viele Haushalte mit Lohn ist das die falsche Frage, weil Wohngeld und Kinderzuschlag vorgehen. Deshalb rechnet dieser Rechner beide Wege und sagt, welcher gilt.</p>
`,
});
