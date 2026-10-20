import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'grundsicherungsgeld-rechner',
  group: 'grundsicherung',
  order: 10,
  slug: 'grundsicherungsgeld-rechner',
  nav: 'Grundsicherungsgeld-Rechner',
  card: 'Ihr Anspruch nach dem SGB II seit Juli 2026, mit Rechenweg und Vorrangprüfung.',
  title: 'Grundsicherungsgeld Rechner 2026: Anspruch mit Rechenweg',
  description: 'Grundsicherungsgeld berechnen: Regelbedarf, Mehrbedarf, Miete und Heizung minus Einkommen und Freibeträge, Recht seit 1. Juli 2026, mit Prüfung von Wohngeld.',
  h1: 'Grundsicherungsgeld-Rechner: Ihr Anspruch Zeile für Zeile',
  intro: 'Der Rechner stellt Ihren Bedarf nach dem SGB II Ihrem Einkommen gegenüber und prüft gleich mit, ob Wohngeld und Kinderzuschlag vorgehen.',
  tool: { kind: 'haushalt', props: { paar: false, kinder: '', brutto1: 0, miete: 480, heizung: 75, ort: 'Leipzig' } },
  related: ['buergergeld-2026', 'hinzuverdienst', 'grundsicherung-miete', 'mehrbedarf', 'vorrangpruefung', 'grundsicherung-antrag'],
  sources: ['sgb2_20', 'sgb2_21', 'sgb2_22', 'sgb2_11b', 'rbsfv_2026', 'bgbl_2026_107'],
  resume: (h) => {
    const g = h.GSG.grundsicherung({ erwachsene: [{ brutto: 0 }], kinder: [], miete: 480, heizung: 75 });
    return `Grundsicherungsgeld ist der Unterschied zwischen Bedarf und anrechenbarem Einkommen der Bedarfsgemeinschaft. Der Bedarf besteht aus den Regelbedarfen (${h.m(h.P.regelbedarf.rbs1)} für Alleinstehende, ${h.m(h.P.regelbedarf.rbs2)} je Partner, ${h.m(h.P.regelbedarf.rbs6)} bis ${h.m(h.P.regelbedarf.rbs4)} für Kinder nach Alter), den Mehrbedarfen, etwa für Alleinerziehende, und den Kosten für Unterkunft und Heizung. Vom Einkommen bleiben Freibeträge unberücksichtigt: ${h.m(h.P.gsg.freibetrag.grund)} Grundfreibetrag auf Lohn, dann ${h.pc((h.P.gsg.freibetrag.stufen as number[][])[0][2])}, ${h.pc((h.P.gsg.freibetrag.stufen as number[][])[1][2])} und ${h.pc((h.P.gsg.freibetrag.stufen as number[][])[2][2])} je nach Höhe. Kindergeld und Unterhalt zählen als Einkommen des Kindes. Eine alleinstehende Person ohne Einkommen mit ${h.m(480)} Bruttokaltmiete und ${h.m(75)} Heizkosten hat danach Anspruch auf ${h.m2(g.anspruch)} im Monat. Der Rechner nutzt das Recht, das seit dem ${h.date(h.P.reform.inkraft)} gilt (${h.P.reform.bgbl}); die Beträge des Regelbedarfs sind 2026 unverändert. Bescheid und Prüfung der Angemessenheit macht das Jobcenter.`;
  },
  faqs: (h) => [
    { q: 'Warum rechnet der Grundsicherungsgeld-Rechner mit meiner vollen Miete?', a: `Weil die Grenze der Angemessenheit jede Kommune selbst festlegt und sich nicht zuverlässig für ganz Deutschland abbilden lässt. Im ersten Jahr des Bezugs zahlt das Jobcenter die tatsächliche Miete, höchstens das ${h.dec(h.P.kdu.deckelFaktor, 1)}-fache der Grenze. Danach nur noch das Angemessene. Liegt Ihre Miete deutlich über dem örtlichen Wert, ist das Ergebnis zu hoch.` },
    { q: 'Zählt das Kindergeld beim Grundsicherungsgeld als Einkommen?', a: `Ja, als Einkommen des Kindes, soweit es dessen Bedarf deckt. Ein Kind unter 6 Jahren hat ${h.m(h.P.regelbedarf.rbs6)} Regelbedarf plus seinen Anteil an der Miete; das Kindergeld von ${h.m(h.P.kindergeld.betrag)} wird darauf angerechnet. Deckt das Kind seinen Bedarf schon mit Unterhalt, geht der Rest des Kindergeldes als Einkommen an den Elternteil.` },
    { q: 'Wie werden Partner ohne Trauschein gerechnet?', a: `Wie Ehepaare, wenn sie eine Verantwortungs- und Einstehensgemeinschaft bilden. Das wird vermutet, wenn sie länger als ein Jahr zusammenleben, ein gemeinsames Kind haben, Kinder im Haushalt versorgen oder über Einkommen des anderen verfügen. Dann gilt für beide der Regelbedarf von ${h.m(h.P.regelbedarf.rbs2)}, und das Einkommen beider wird zusammengerechnet.` },
  ],
  body: (h) => {
    const R = h.P.regelbedarf; const St = h.P.gsg.freibetrag.stufen as number[][];
    return `
<h2>Was in den Bedarf eingeht</h2>
${h.table(['Baustein', 'Betrag 2026', 'Rechtsgrundlage'], [
  ['Regelbedarf Stufe 1, alleinstehend oder alleinerziehend', h.m(R.rbs1), '§ 20 Abs. 2 SGB II'],
  ['Regelbedarf Stufe 2, je Partner', h.m(R.rbs2), '§ 20 Abs. 4'],
  ['Regelbedarf Stufe 3, Erwachsene unter 25 im Elternhaus', h.m(R.rbs3), '§ 20 Abs. 2 Satz 2'],
  ['Kinder von 14 bis 17 Jahren', h.m(R.rbs4), '§ 23 Nr. 1'],
  ['Kinder von 6 bis 13 Jahren', h.m(R.rbs5), '§ 23 Nr. 1'],
  ['Kinder unter 6 Jahren', h.m(R.rbs6), '§ 23 Nr. 1'],
  ['Mehrbedarf Alleinerziehende', `${h.pc(h.P.gsg.mehrbedarfAE.jeKind)} bis ${h.pc(h.P.gsg.mehrbedarfAE.max)} von Stufe 1`, '§ 21 Abs. 3'],
  ['Mehrbedarf Schwangerschaft ab der 13. Woche', `${h.pc(h.P.gsg.mehrbedarfSchwanger)} des Regelbedarfs`, '§ 21 Abs. 2'],
  ['Miete und Heizung', 'tatsächlich, soweit angemessen', '§ 22'],
], `Regelbedarfe nach der ${h.src('rbsfv_2026', 'Fortschreibungsverordnung 2026')}.`, ['l', 'r', 'l'])}
<p>Mehrbedarfe für Behinderung, kostenaufwendige Ernährung, dezentrale Warmwasserbereitung oder einen unabweisbaren Sonderbedarf sind im Rechner nicht enthalten. Sie stehen auf der Seite ${h.a('mehrbedarf', 'Mehrbedarf')}. Leistungen für Bildung und Teilhabe der Kinder kommen zusätzlich und werden gesondert beantragt.</p>

<h2>Was als Einkommen zählt</h2>
<p>Angerechnet wird das Netto aus Arbeit nach Abzug der Freibeträge. Die ersten ${h.m(h.P.gsg.freibetrag.grund)} bleiben frei; vom Teil zwischen ${h.m(St[0][0])} und ${h.m(St[0][1])} zusätzlich ${h.pc(St[0][2])}, zwischen ${h.m(St[1][0])} und ${h.m(St[1][1])} ${h.pc(St[1][2])} und darüber ${h.pc(St[2][2])} bis ${h.m(h.P.gsg.freibetrag.obenOhne)}, mit minderjährigem Kind bis ${h.m(h.P.gsg.freibetrag.obenKind)}. Der Rechner schätzt das Netto mit Lohnsteuer und Sozialversicherung 2026; im Übergangsbereich bis ${h.m(h.P.sv.uebergangBis)} mit den verminderten Beiträgen. Renten, Arbeitslosengeld und Krankengeld zählen ohne Freibetrag, Elterngeld über ${h.m(h.P.elterngeld.freibetragSgb2)} ebenfalls. Wie viel vom Lohn bleibt, zeigt die Seite ${h.a('hinzuverdienst', 'Hinzuverdienst')}.</p>

<h2>Drei Beispiele</h2>
${h.table(['Haushalt', 'Bedarf', 'Einkommen angerechnet', 'Grundsicherungsgeld'], [
  { n: 'Allein, ohne Lohn, 555 € Warmmiete', g: h.GSG.grundsicherung({ erwachsene: [{ brutto: 0 }], kinder: [], miete: 480, heizung: 75 }) },
  { n: 'Allein, Minijob 603 €, 555 € Warmmiete', g: h.GSG.grundsicherung({ erwachsene: [{ brutto: 603 }], kinder: [], miete: 480, heizung: 75 }) },
  { n: 'Paar, ein Kind (2), 1.200 € Lohn, 720 € Warmmiete', g: h.GSG.grundsicherung({ erwachsene: [{ brutto: 1200 }, { brutto: 0 }], kinder: [{ alter: 2 }], miete: 620, heizung: 100 }) },
].map((x) => [x.n, h.m2(x.g.bedarfSumme), h.m2(x.g.einkommenSumme), `<strong>${h.m2(x.g.zahlbetrag)}</strong>`]), `Ohne Prüfung des Vorrangs von Wohngeld und Kinderzuschlag; mit Kind einschließlich ${h.m(h.P.gsg.sofortzuschlag)} Sofortzuschlag.`, ['l', 'r', 'r', 'r'])}
<p>Im dritten Beispiel lohnt der Blick auf die Vorrangprüfung im Werkzeug oben: Mit Wohngeld und Kinderzuschlag kann der Bedarf gedeckt sein, dann ist das Jobcenter nicht zuständig.</p>

<h2>Antrag und Bescheid</h2>
<p>Der Antrag wirkt auf den Ersten des Monats zurück, in dem Sie ihn stellen (§ 37 SGB II). Ein formloser Satz an das Jobcenter genügt, die Formulare folgen. Bewilligt wird in der Regel für ${h.P.gsg.bewilligungMonate} Monate, bei unangemessener Miete oder vorläufiger Entscheidung für ${h.P.gsg.bewilligungKurzMonate}. Welche Unterlagen Sie brauchen, steht unter ${h.a('grundsicherung-antrag', 'Antrag auf Grundsicherungsgeld')}.</p>

<h2>So lesen Sie das Ergebnis</h2>
<p>Die große Zahl ist das Geld, das Ihrem Haushalt im Monat insgesamt zur Verfügung steht: Netto aus Arbeit, Kindergeld, Unterhalt und die Leistungen des empfohlenen Weges. Darunter stehen die einzelnen Leistungen mit der Stelle, die sie zahlt. Die Tabelle „Die Kombinationen im Vergleich“ zeigt, was der andere Weg bringen würde und warum er nicht oder nur wahlweise gilt. Unter „Rechenweg“ finden Sie die Rechnung nach dem SGB II: jede Zeile des Bedarfs, jede Zeile des Einkommens, der Anspruch und der Sofortzuschlag für Kinder. Mit „Link zu diesem Ergebnis kopieren“ können Sie Ihre Eingaben speichern oder einer Beratungsstelle schicken; die Zahlen stehen nur in der Adresse, nicht auf einem Server.</p>
<p>Der Rechner kennt keine Kinder über 24 Jahren im Haushalt. Sie bilden eine eigene Bedarfsgemeinschaft und teilen nur die Miete; geben Sie in diesem Fall nur Ihren Anteil an Miete und Heizung ein.</p>
`;
  },
});
