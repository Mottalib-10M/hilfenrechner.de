import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

/** Beispielhaushalte, mit dem Rechenkern verglichen. */
const faelle = (h: Helpers) => [
  { name: 'Alleinstehend, Teilzeit 1.300 €, Stufe III', i: { paar: false, brutto: [1300], kinder: [], unterhalt: 0, miete: 480, heizung: 70, mietstufe: 3, elterngeld: 0, sonstiges: 0 } },
  { name: 'Alleinerziehend, ein Kind (5), 1.600 €, Stufe IV', i: { paar: false, brutto: [1600], kinder: [5], unterhalt: 0, miete: 620, heizung: 90, mietstufe: 4, elterngeld: 0, sonstiges: 0 } },
  { name: 'Paar, zwei Kinder (3, 9), 2.400 €, Stufe IV', i: { paar: true, brutto: [2400, 0], kinder: [3, 9], unterhalt: 0, miete: 780, heizung: 120, mietstufe: 4, elterngeld: 0, sonstiges: 0 } },
  { name: 'Paar, drei Kinder (2, 6, 11), 1.700 €, Stufe V', i: { paar: true, brutto: [1700, 0], kinder: [2, 6, 11], unterhalt: 0, miete: 950, heizung: 140, mietstufe: 5, elterngeld: 0, sonstiges: 0 } },
].map((f) => ({ ...f, v: h.VG.vergleich(f.i) }));

export default definePage({
  id: 'wohngeld-oder-grundsicherung',
  group: 'vergleich',
  order: 1,
  slug: 'wohngeld-oder-grundsicherung',
  nav: 'Wohngeld oder Grundsicherungsgeld?',
  card: 'Welche Kombination für Ihren Haushalt gilt und wie viel Geld sie im Monat bringt.',
  title: 'Wohngeld oder Grundsicherungsgeld: Vergleich mit Ihrem Lohn',
  description: 'Wohngeld oder Grundsicherungsgeld 2026: Vergleich für Ihren Haushalt mit Kinderzuschlag, Kindergeld und Unterhaltsvorschuss, Vorrang nach § 12a SGB II.',
  h1: 'Wohngeld oder Grundsicherungsgeld: was für Ihren Haushalt gilt',
  intro: 'Geben Sie Haushalt, Lohn, Miete und Wohnort ein. Der Rechner prüft beide Wege und zeigt, welcher nach dem Gesetz gilt und wie viel Geld im Monat bleibt.',
  tool: { kind: 'haushalt', props: { paar: true, kinder: '3, 9', brutto1: 2400, brutto2: 0, miete: 780, heizung: 120, ort: 'Hannover' } },
  related: ['vorrangpruefung', 'grundsicherungsgeld-rechner', 'wohngeld-rechner', 'kinderzuschlag-rechner', 'aufstocker'],
  sources: ['sgb2_12a', 'bkgg_6a', 'wogg_19', 'wogg_7', 'sgb2_9', 'bkgg_5', 'bgbl_2026_107'],
  resume: (h) => {
    const f = faelle(h)[2];
    return `Wohngeld und Kinderzuschlag gehen dem Grundsicherungsgeld vor, wenn sie zusammen mit Ihrem Einkommen den Bedarf des ganzen Haushalts decken. Das steht in § 12a SGB II: Wer Grundsicherungsgeld beantragt, muss vorrangige Leistungen in Anspruch nehmen, aber nur, wenn sie die Hilfebedürftigkeit aller Mitglieder für mindestens ${h.P.gsg.vorrangDreiMonate} Monate beseitigen. Reichen sie nicht, zahlt das Jobcenter Grundsicherungsgeld, und Wohngeld und Kinderzuschlag entfallen. Fehlen höchstens ${h.m(h.P.kiz.luecke)} zum Bedarf und haben die Eltern Erwerbseinkommen, gibt es den Kinderzuschlag trotzdem (§ 6a Abs. 1a BKGG); dann dürfen Sie wählen. Kindergeld (${h.m(h.P.kindergeld.betrag)} je Kind) und Unterhaltsvorschuss kommen in jedem Fall dazu. Ein Beispiel: Ein Paar mit zwei Kindern, ${h.m(2400)} brutto und ${h.m(900)} Warmmiete in Mietstufe IV erhält nach dieser Rechnung ${h.m(f.v.wg.wohngeld)} Wohngeld und ${h.m(f.v.kiz.gesamt)} Kinderzuschlag statt ${h.m(f.v.gsg.anspruch)} Grundsicherungsgeld. Die Entscheidung treffen Wohngeldstelle, Familienkasse und Jobcenter; der Rechner zeigt, womit Sie rechnen können.`;
  },
  faqs: (h) => [
    { q: 'Darf ich Wohngeld und Grundsicherungsgeld gleichzeitig bekommen?', a: `Nein. Wer Grundsicherungsgeld bezieht, ist vom Wohngeld ausgeschlossen, weil die Miete schon im Bedarf des Jobcenters steckt (§ 7 WoGG). Möglich ist nur ein Wechsel: Ändert sich Ihr Einkommen, kann der andere Weg günstiger oder vorgeschrieben werden. Kindergeld und Unterhaltsvorschuss laufen in beiden Fällen weiter, werden aber im Grundsicherungsgeld als Einkommen der Kinder angerechnet.` },
    { q: 'Muss ich zum Jobcenter, wenn Wohngeld und Kinderzuschlag nicht reichen?', a: `Sie müssen nicht, aber Sie sollten den Anspruch prüfen lassen. Reichen Wohngeld und Kinderzuschlag nicht, um den Bedarf des Haushalts zu decken, steht Ihnen Grundsicherungsgeld zu, das dann mehr ausmacht. Fehlen nur bis zu ${h.m(h.P.kiz.luecke)} und Sie arbeiten, dürfen Sie beim Kinderzuschlag mit Wohngeld bleiben und ersparen sich die Pflichten gegenüber dem Jobcenter.` },
    { q: 'Warum zeigt der Rechner manchmal weniger Geld beim vorgeschriebenen Weg?', a: 'Weil das Gesetz nicht fragt, welcher Weg mehr bringt, sondern ob die vorrangigen Leistungen den Bedarf decken. Decken Wohngeld und Kinderzuschlag den Bedarf knapp, kann Grundsicherungsgeld rechnerisch ein paar Euro mehr ergeben, ist aber trotzdem ausgeschlossen. Dafür entfallen Vermögensprüfung nach SGB II, Kooperationsplan und Meldepflichten.' },
    { q: 'Welche Angaben braucht der Vergleich, damit das Ergebnis stimmt?', a: 'Das Bruttogehalt jedes Erwachsenen, das Alter jedes Kindes, die Bruttokaltmiete, also Kaltmiete mit kalten Nebenkosten, die Heizkosten und den Wohnort. Unter „Mehr“ kommen Elterngeld, Renten oder Arbeitslosengeld dazu. Unterhalt für die Kinder tragen Alleinerziehende im eigenen Feld ein; fehlt er, prüft der Rechner den Unterhaltsvorschuss.' },
  ],
  body: (h) => {
    const F = faelle(h);
    const rows = F.map((f) => {
      const gsg = f.v.optionen.find((o) => o.id === 'gsg')!; const vor = f.v.optionen.find((o) => o.id === 'vorrang')!;
      return [f.name, h.m(f.v.gsg.anspruch), `${h.m(f.v.wg.wohngeld)} / ${h.m(f.v.kiz.gesamt)}`, f.v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : f.v.empfehlung === 'vorrang' ? (f.v.kiz.gesamt ? 'Wohngeld und Kinderzuschlag' : 'Wohngeld') : 'keine', h.m(Math.max(gsg.zulaessig ? gsg.verfuegbar : 0, vor.zulaessig ? vor.verfuegbar : 0) || f.v.optionen[0].verfuegbar)];
    });
    return `
<h2>Vier Haushalte, zwei Wege</h2>
<p>Die Tabelle rechnet vier typische Haushalte mit demselben Rechenkern wie das Werkzeug oben. Die Spalte „Grundsicherungsgeld“ zeigt, was das Jobcenter zahlen würde, wenn es keinen Vorrang gäbe; „Wohngeld / Kinderzuschlag“ zeigt die beiden vorrangigen Leistungen. Welche Seite gilt, steht in der vorletzten Spalte, das gesamte Geld des Haushalts mit Lohn, Kindergeld und Leistungen in der letzten.</p>
${h.table(['Haushalt', 'Grundsicherungsgeld', 'Wohngeld / Kinderzuschlag', 'Gilt', 'Geld im Monat'], rows, `Bruttolohn je Monat, Warmmiete nach Mietstufe, Steuerklasse nach Haushalt; Recht am ${h.date(h.TODAY)}.`, ['l', 'r', 'r', 'l', 'r'])}
<p>Das Muster ist typisch. Bei Alleinstehenden ohne Kinder entscheidet fast nur das Wohngeld, weil es keinen Kinderzuschlag gibt; schon ein Teilzeitlohn reicht oft, damit Wohngeld den Bedarf deckt. Familien mit mittlerem Lohn landen meist beim Kinderzuschlag mit Wohngeld. Große Familien mit kleinem Lohn und hoher Miete bleiben dagegen beim Grundsicherungsgeld, weil die Regelbedarfe aller Kinder und die volle Miete zusammen mehr ergeben, als Wohngeld und Kinderzuschlag decken können.</p>

<h2>So prüft der Rechner den Vorrang</h2>
<ol>
<li>Er rechnet den Bedarf nach dem SGB II: Regelbedarfe, Mehrbedarf für Alleinerziehende, Miete und Heizung in tatsächlicher Höhe.</li>
<li>Er zieht das Einkommen ab: Netto aus Arbeit minus Freibeträge, Kindergeld und Unterhalt bis zum Bedarf der Kinder, Elterngeld über dem Freibetrag.</li>
<li>Er rechnet Wohngeld nach § 19 WoGG mit der Mietstufe Ihres Ortes und den Kinderzuschlag nach § 6a BKGG.</li>
<li>Er prüft, ob mit Wohngeld und Kinderzuschlag noch ein Bedarf nach dem SGB II offen bleibt. Bleibt keiner, gelten diese beiden Leistungen; bleiben bis zu ${h.m(h.P.kiz.luecke)} offen und gibt es Erwerbseinkommen, dürfen Sie wählen; sonst gilt Grundsicherungsgeld.</li>
</ol>
<p>Die genaue Regel und ihre Ausnahmen stehen auf der Seite zur ${h.a('vorrangpruefung', 'Vorrangprüfung')}. Wer schon weiß, dass nur das Jobcenter in Frage kommt, findet den ${h.a('grundsicherungsgeld-rechner', 'Grundsicherungsgeld-Rechner')} mit dem Rechenweg Zeile für Zeile.</p>

<h2>Was der Vergleich nicht wissen kann</h2>
<p>Die Angemessenheit der Miete legt jede Kommune selbst fest. Im ersten Jahr übernimmt das Jobcenter die tatsächliche Miete, höchstens bis zum ${h.dec(h.P.kdu.deckelFaktor, 1)}-fachen der Grenze; danach nur noch das Angemessene. Der Rechner setzt die Miete in voller Höhe an und sagt das im Ergebnis. Vermögen prüft er nicht: Für das Grundsicherungsgeld gelten Freibeträge nach Alter (${h.a('schonvermoegen', 'Schonvermögen')}), für den Kinderzuschlag eigene Grenzen, für das Wohngeld die Frage, ob erhebliches Vermögen vorliegt. Auch Mehrbedarfe wegen Schwangerschaft, Behinderung oder Ernährung sind nicht enthalten. Liegt Ihr Ergebnis knapp an einer Grenze, stellen Sie beide Anträge; die Ämter stimmen sich ab, und ein abgelehnter Wohngeldantrag hilft dem Jobcenter bei der Prüfung.</p>

<h2>Wo Sie welchen Antrag stellen</h2>
${h.table(['Leistung', 'Zuständig', 'Wirkung des Antrags'], [
  ['Grundsicherungsgeld', h.VG.STELLE.gsg, 'ab dem Ersten des Antragsmonats (§ 37 SGB II)'],
  ['Wohngeld', h.VG.STELLE.wg, 'ab dem Ersten des Antragsmonats (§ 25 WoGG)'],
  ['Kinderzuschlag', h.VG.STELLE.kiz, 'ab dem Antragsmonat, nicht rückwirkend (§ 5 BKGG)'],
  ['Kindergeld', h.VG.STELLE.kg, `bis zu ${h.P.antrag.kindergeldRueckMonate} Monate rückwirkend (§ 5 BKGG, § 66 EStG)`],
  ['Unterhaltsvorschuss', h.VG.STELLE.uvg, `ab dem Antragsmonat, höchstens ${h.P.antrag.uvgRueckMonate} Monat rückwirkend (§ 4 UVG)`],
], undefined, ['l', 'l', 'l'])}
<p>Stellen Sie den Antrag lieber früh und unvollständig als spät: Fehlende Unterlagen dürfen Sie nachreichen, verlorene Monate holt niemand nach.</p>
`;
  },
});
