import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'vorrangpruefung',
  group: 'vergleich',
  order: 2,
  slug: 'vorrangpruefung',
  nav: 'Vorrangprüfung nach § 12a SGB II',
  card: 'Wann das Jobcenter Sie zu Wohngeld und Kinderzuschlag schicken darf und wann nicht.',
  title: 'Vorrangprüfung § 12a SGB II: Wohngeld vor Grundsicherung',
  description: 'Vorrangprüfung nach § 12a SGB II: wann Wohngeld und Kinderzuschlag vor dem Grundsicherungsgeld gelten, die Drei-Monats-Regel, die 100-Euro-Grenze, Beispiele.',
  h1: 'Vorrangprüfung: wann Wohngeld und Kinderzuschlag vorgehen',
  intro: 'Das Jobcenter darf Sie nur dann an Wohngeldstelle und Familienkasse verweisen, wenn deren Leistungen Ihren Bedarf wirklich decken. Diese Seite erklärt die Regel und rechnet sie durch.',
  mini: { kind: 'mini:kiz' },
  related: ['wohngeld-oder-grundsicherung', 'kinderzuschlag', 'wohngeld-2026', 'grundsicherungsgeld-rechner', 'aufstocker'],
  sources: ['sgb2_12a', 'bkgg_6a', 'sgb2_9', 'wogg_7', 'wogg_25', 'sgb2_11b'],
  resume: (h) => `Die Vorrangprüfung folgt aus § 12a SGB II. Wer Grundsicherungsgeld bekommt oder beantragt, muss Leistungen anderer Träger in Anspruch nehmen, wenn sie die Hilfebedürftigkeit vermeiden, beseitigen, verkürzen oder verringern. Für Wohngeld und Kinderzuschlag gilt eine wichtige Ausnahme: Diese beiden muss niemand beantragen, wenn sie nicht die Hilfebedürftigkeit aller Mitglieder der Bedarfsgemeinschaft für einen zusammenhängenden Zeitraum von mindestens ${h.P.gsg.vorrangDreiMonate} Monaten beseitigen. Das Jobcenter darf Sie also nicht auf ein Wohngeld von ${h.m(150)} verweisen, wenn danach immer noch ${h.m(200)} zum Bedarf fehlen. Umgekehrt muss die Familienkasse beim Kinderzuschlag prüfen, ob mit Kinderzuschlag und Wohngeld kein Bedarf nach dem SGB II offen bleibt (§ 6a Abs. 1 Nr. 3 BKGG). Fehlen höchstens ${h.m(h.P.kiz.luecke)}, und haben die Eltern Erwerbseinkommen mit mindestens ${h.m(h.P.kiz.luecke)} Freibetrag, gibt es den Kinderzuschlag trotzdem (§ 6a Abs. 1a BKGG); dann können Sie zwischen den Wegen wählen. Bildung und Teilhabe bleiben bei dieser Prüfung außer Betracht.`,
  faqs: (h) => [
    { q: 'Was bedeutet „Hilfebedürftigkeit aller Mitglieder“ bei der Vorrangprüfung?', a: 'Die Prüfung schaut auf die ganze Bedarfsgemeinschaft, nicht auf einzelne Personen. Es reicht nicht, wenn Wohngeld und Kinderzuschlag den Bedarf der Kinder decken, aber bei den Eltern noch etwas fehlt. Erst wenn das Einkommen aller zusammen mit diesen Leistungen den gesamten Bedarf nach dem SGB II deckt, darf das Jobcenter Sie verweisen.' },
    { q: 'Darf das Jobcenter meinen Antrag auf Grundsicherungsgeld ablehnen, solange über das Wohngeld nicht entschieden ist?', a: 'Nein, wenn Sie hilfebedürftig sind, muss es leisten. Es kann Sie auffordern, Wohngeld oder Kinderzuschlag zu beantragen, und vorläufig entscheiden. Wird das Wohngeld später bewilligt, rechnen die Ämter untereinander ab: Das Jobcenter holt sich seine Zahlung bei der Wohngeldstelle zurück, Sie zahlen nichts doppelt zurück.' },
    { q: 'Was passiert, wenn mein Wohngeldantrag abgelehnt wird, weil ich zum Jobcenter gehöre?', a: 'Dann beginnt ein späterer Wohngeldantrag nicht erst mit dem neuen Antragsmonat. Stellen Sie ihn vor Ende des Monats nach der Kenntnis einer Ablehnung durch das Jobcenter, beginnt der Bewilligungszeitraum mit dem Monat, ab dem das Grundsicherungsgeld abgelehnt wurde (§ 25 Abs. 3 WoGG). So entsteht keine Lücke zwischen den Leistungen.' },
    { q: 'Gilt die 100-Euro-Regel auch für das Wohngeld allein, ohne Kinder?', a: 'Nein. Die Regel steht nur im Bundeskindergeldgesetz und betrifft den Kinderzuschlag. Ein Haushalt ohne Kinder bekommt entweder Wohngeld, wenn es den Bedarf deckt, oder Grundsicherungsgeld. Fehlt mit Wohngeld noch etwas, besteht keine Pflicht, Wohngeld zu beantragen, und das Jobcenter zahlt das Grundsicherungsgeld in voller Höhe.' },
    { q: 'Wie oft wird der Vorrang neu geprüft?', a: `Mit jedem neuen Bewilligungszeitraum und bei jeder wesentlichen Änderung: neuer Job, höhere Miete, Geburt, Auszug eines Kindes. Grundsicherungsgeld wird in der Regel für ${h.P.gsg.bewilligungMonate} Monate bewilligt, Wohngeld meist für ${h.P.antrag.wohngeldBewilligungMonate}, der Kinderzuschlag für ${h.P.kiz.bewilligung}. Rechnen Sie nach jeder Änderung neu, ob sich der Weg dreht.` },
  ],
  body: (h) => {
    const basis = { paar: true, kinder: [4, 8], unterhalt: 0, miete: 760, heizung: 110, mietstufe: 4, elterngeld: 0, sonstiges: 0 };
    const reihe = [1200, 1600, 2000, 2400, 2800, 3200, 3600].map((b) => { const v = h.VG.vergleich({ ...basis, brutto: [b, 0] }); return [h.m(b), h.m(v.gsg.anspruch), h.m(v.wg.wohngeld), h.m(v.kiz.gesamt), v.luecke > 0.005 ? h.m(v.luecke) : 'keine', v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : v.empfehlung === 'vorrang' ? (v.wahlrecht ? 'Wahl' : 'Wohngeld + KiZ') : 'nur Kindergeld']; });
    return `
<h2>Die Regel in drei Sätzen</h2>
<p>Erstens: Sozialleistungen anderer Träger gehen dem Grundsicherungsgeld vor. Das gilt für Arbeitslosengeld, Krankengeld, Renten, Unterhaltsvorschuss und eben auch für Wohngeld und Kinderzuschlag. Zweitens: Für Wohngeld und Kinderzuschlag gilt diese Pflicht nur, wenn sie zusammen mit dem übrigen Einkommen die Hilfebedürftigkeit der ganzen Bedarfsgemeinschaft für mindestens ${h.P.gsg.vorrangDreiMonate} Monate am Stück beenden. Drittens: Wer diese Leistungen bekommt, ist vom Grundsicherungsgeld ausgeschlossen, und wer Grundsicherungsgeld bekommt, vom Wohngeld (§ 7 WoGG). Ein Nebeneinander gibt es nicht.</p>
<p>Seit dem ${h.date(h.P.reform.inkraft)} heißt das Bürgergeld Grundsicherungsgeld; an der Vorrangregel hat das ${h.src('bgbl_2026_107', h.P.reform.bgbl)} nichts geändert. Geändert hat sich nur der Teil zur vorzeitigen Altersrente: Bis ${h.date(h.P.reform.buergergeldBegriffBis)} muss niemand eine Altersrente vorzeitig beantragen, danach erst ab 63 Jahren.</p>

<h2>Ein Paar mit zwei Kindern bei steigendem Lohn</h2>
<p>Die Tabelle rechnet ein Paar mit Kindern von 4 und 8 Jahren in einer Wohnung mit ${h.m(760)} Bruttokaltmiete und ${h.m(110)} Heizkosten in Mietstufe IV. Nur eine Person arbeitet, Steuerklasse III. Spalte für Spalte: was das Jobcenter ohne Vorrang zahlen würde, Wohngeld, Kinderzuschlag, die Lücke zum Bedarf, wenn beide vorrangigen Leistungen gezahlt werden, und welcher Weg gilt.</p>
${h.table(['Brutto', 'Grundsicherungsgeld', 'Wohngeld', 'Kinderzuschlag', 'Lücke', 'Es gilt'], reihe, `Rechenkern dieser Website, Recht am ${h.date(h.TODAY)}. Kindergeld kommt in jedem Fall dazu.`, ['r', 'r', 'r', 'r', 'r', 'l'])}
<p>Man sieht den Übergang. Bei kleinem Lohn decken Wohngeld und Kinderzuschlag den Bedarf nicht, die Lücke ist groß, also zahlt das Jobcenter. Mit steigendem Lohn sinkt das Grundsicherungsgeld schneller als die vorrangigen Leistungen, weil vom Lohn über den Freibetrag hinaus alles angerechnet wird, beim Kinderzuschlag aber nur ${h.pc(h.P.kiz.anrechnungEltern)}. Ab einer bestimmten Schwelle schließt sich die Lücke, und der Haushalt wechselt zu Wohngeld und Kinderzuschlag. Bei hohem Lohn fällt zuerst der Kinderzuschlag weg, dann das Wohngeld.</p>

<h2>Die 100-Euro-Regel beim Kinderzuschlag</h2>
<p>Zwischen „Lücke“ und „keine Lücke“ liegt ein Bereich, in dem das Gesetz die Wahl lässt. § 6a Abs. 1a BKGG gewährt den Kinderzuschlag auch dann, wenn mit Kinderzuschlag und Wohngeld noch höchstens ${h.m(h.P.kiz.luecke)} zum Bedarf fehlen. Drei Bedingungen müssen zusammen erfüllt sein:</p>
<ul>
<li>Die Lücke beträgt höchstens ${h.m(h.P.kiz.luecke)} im Monat.</li>
<li>Die Eltern haben Erwerbseinkommen, von dem nach § 11b Abs. 2 bis 3 SGB II mindestens ${h.m(h.P.kiz.luecke)} als Freibetrag abzusetzen wären. Das ist ab ${h.m(h.P.gsg.freibetrag.grund)} Bruttolohn der Fall.</li>
<li>Niemand im Haushalt bezieht oder beantragt Leistungen nach dem SGB II oder SGB XII.</li>
</ul>
<p>Wer diese Bedingungen erfüllt, kann beim Jobcenter Grundsicherungsgeld beantragen und bekommt dann etwas mehr Geld, oder bleibt bei Kinderzuschlag und Wohngeld. Viele Familien wählen den zweiten Weg: Es gibt keinen Kooperationsplan, keine Meldetermine, keine Prüfung der Wohnungsgröße und eine höhere Vermögensgrenze von ${h.m(h.P.kiz.vermoegenErste)} für die erste Person. Der Rechner auf der Seite ${h.a('wohngeld-oder-grundsicherung', 'Wohngeld oder Grundsicherungsgeld')} zeigt in diesem Fall beide Wege mit dem Unterschied in Euro.</p>

<h2>Wie die Familienkasse das Wohngeld einrechnet</h2>
<p>Beim Kinderzuschlag gibt es ein Henne-Ei-Problem: Die Familienkasse muss wissen, ob mit Wohngeld kein Bedarf mehr offen bleibt, aber das Wohngeld ist oft noch nicht beantragt. Das Gesetz löst es so: Bezieht der Haushalt kein Wohngeld und könnte die Hilfebedürftigkeit mit Wohngeld und Kinderzuschlag vermieden werden, setzt die Familienkasse das Wohngeld in der Höhe an, in der es voraussichtlich bewilligt würde (§ 6a Abs. 1 Satz 3 BKGG). Für Sie heißt das: Stellen Sie beide Anträge zur selben Zeit. Die Wohngeldstelle rechnet den Kinderzuschlag nicht als Einkommen an, die Familienkasse rechnet das voraussichtliche Wohngeld ein.</p>
${h.box('Praxis', `<p>Fordert Sie das Jobcenter auf, Wohngeld und Kinderzuschlag zu beantragen, tun Sie es innerhalb der gesetzten Frist. Wer den Antrag nicht stellt, riskiert, dass das Jobcenter ihn selbst stellt oder die Leistung wegen fehlender Mitwirkung versagt. Halten Sie die Rechnung des Jobcenters für falsch, weil Wohngeld und Kinderzuschlag nicht für ${h.P.gsg.vorrangDreiMonate} Monate reichen, schreiben Sie das mit Ihren Zahlen in die Antwort.</p>`, 'tip')}

<h2>Was zur Bedarfsgemeinschaft zählt</h2>
<p>Die Prüfung umfasst alle Personen der Bedarfsgemeinschaft nach § 7 SGB II: die erwerbsfähige Person, ihre Partnerin oder ihren Partner, unverheiratete Kinder unter 25 Jahren, die im Haushalt leben und ihren Bedarf nicht selbst decken. Ein Kind, das mit eigenem Einkommen, Kindergeld und Unterhalt seinen Bedarf deckt, fällt aus der Bedarfsgemeinschaft heraus; seine Überschüsse aus Kindergeld gehen an den Elternteil. Großeltern, erwachsene Geschwister oder Mitbewohner gehören nicht zur Bedarfsgemeinschaft, können aber beim Wohngeld zum Haushalt zählen. Deshalb kann das Wohngeld mit mehr Personen rechnen als das Jobcenter.</p>

<h2>Unterschiede, die den Ausschlag geben</h2>
${h.table(['Frage', 'Grundsicherungsgeld', 'Wohngeld und Kinderzuschlag'], [
  ['Miete', `tatsächlich, im ersten Jahr bis zum ${h.dec(h.P.kdu.deckelFaktor, 1)}-fachen der Grenze, danach angemessen`, 'pauschal nach Höchstbetrag der Mietstufe'],
  ['Heizung', 'tatsächlich, soweit angemessen', 'feste Heizkosten- und Klimakomponente'],
  ['Lohn', `Freibetrag bis ${h.m(h.GSG.erwerbsfreibetrag(9999, false))} oder ${h.m(h.GSG.erwerbsfreibetrag(9999, true))} mit Kind, Rest voll angerechnet`, `beim Kinderzuschlag nur ${h.pc(h.P.kiz.anrechnungEltern)} des Überschusses angerechnet`],
  ['Vermögen', `Freibetrag nach Alter, ${h.m((h.P.vermoegen.stufen as number[][])[0][2])} bis ${h.m((h.P.vermoegen.stufen as number[][])[3][2])} je Person`, `${h.m(h.P.kiz.vermoegenErste)} für die erste, ${h.m(h.P.kiz.vermoegenWeitere)} für jede weitere Person`],
  ['Pflichten', 'Kooperationsplan, Meldetermine, Minderungen', 'Änderungen mitteilen'],
  ['Kranken- und Pflegeversicherung', 'über das Jobcenter, wenn nicht anders versichert', 'eigene Versicherung bleibt'],
], undefined, ['l', 'l', 'l'])}
<p>Die Unterschiede bei der Miete wiegen am schwersten. In teuren Wohnungen deckt das Jobcenter oft mehr als das Wohngeld, solange die Kosten als angemessen gelten. In günstigen Wohnungen ist der Unterschied klein, und schon ein moderater Lohn reicht für den Wechsel zum Wohngeld. Wer über einen Umzug nachdenkt, sollte deshalb nicht nur die Miete vergleichen, sondern im Rechner prüfen, ob sich durch die neue Miete der Weg ändert.</p>

<h2>Grenzen dieser Rechnung</h2>
<p>Die Ämter rechnen mit Durchschnittswerten aus den letzten Monaten, mit Ihren tatsächlichen Abzügen vom Lohn und mit der Angemessenheitsgrenze Ihrer Kommune. Der Vergleich auf dieser Website arbeitet mit dem geschätzten Netto nach Steuerklasse und mit der Miete in voller Höhe. Liegt Ihr Ergebnis nahe an der Grenze, entscheidet die genaue Rechnung der Behörde. Er ersetzt keinen Bescheid und keine Beratung, etwa durch eine Sozialberatungsstelle oder den Sozialverband.</p>

<h2>Typische Missverständnisse</h2>
<p><strong>„Das Jobcenter hat mich zum Wohngeld geschickt, also bekomme ich kein Grundsicherungsgeld mehr.“</strong> Das stimmt nur, wenn Wohngeld und Kinderzuschlag Ihren Bedarf decken. Reichen sie nicht, besteht der Anspruch auf Grundsicherungsgeld weiter, und Sie sind nicht verpflichtet, Wohngeld zu beantragen. Fordert das Jobcenter Sie trotzdem dazu auf, lassen Sie sich die Rechnung zeigen.</p>
<p><strong>„Wohngeld ist immer weniger als Grundsicherungsgeld.“</strong> Für den einzelnen Monat oft ja, für den Haushalt nicht unbedingt. Mit Wohngeld und Kinderzuschlag behalten Sie mehr von Lohnerhöhungen, Vermögen bis zu höheren Grenzen und eine Miete, die das Jobcenter nach der Karenzzeit vielleicht nicht mehr voll zahlen würde.</p>
<p><strong>„Kinderzuschlag gibt es nur mit Wohngeld.“</strong> Nein, der Kinderzuschlag ist eine eigene Leistung der Familienkasse. Wohngeld wird bei der Prüfung nur eingerechnet, damit klar ist, ob der Bedarf gedeckt ist. Wer kein Wohngeld bekommt, weil seine Miete niedrig oder sein Einkommen zu hoch ist, kann trotzdem Kinderzuschlag erhalten.</p>
<p><strong>„Wer einmal beim Jobcenter ist, bleibt dort.“</strong> Die Prüfung wiederholt sich bei jeder Änderung. Eine Lohnerhöhung, ein zweites Einkommen oder ein Kind, das älter wird, kann den Weg drehen. Rechnen Sie nach jeder Änderung neu.</p>

<h2>Die Rechnung für Haushalte ohne Kinder</h2>
<p>Ohne Kinder gibt es keinen Kinderzuschlag, und die Vorrangprüfung vergleicht nur Wohngeld mit Grundsicherungsgeld. Die Grenze liegt meist zwischen Teilzeit und Vollzeit zum Mindestlohn, abhängig von der Miete. Wer allein lebt und eine günstige Wohnung hat, kommt oft schon mit einem Teilzeitlohn ins Wohngeld; wer in einer teuren Stadt wohnt, bleibt länger beim Jobcenter. Für Rentnerinnen und Rentner gilt dieselbe Logik im Verhältnis zur Grundsicherung im Alter beim Sozialamt.</p>
`;
  },
});
