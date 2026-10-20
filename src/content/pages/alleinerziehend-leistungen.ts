import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const reihe = (h: Helpers) => [0, 603, 1000, 1400, 1800, 2200, 2600].map((b) => {
  const v = h.VG.vergleich({ paar: false, brutto: [b], kinder: [4], unterhalt: 0, miete: 560, heizung: 90, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
  const best = v.optionen.find((o) => o.id === v.empfehlung)!;
  return { b, v, best };
});

export default definePage({
  id: 'alleinerziehend-leistungen',
  group: 'vergleich',
  order: 3,
  slug: 'alleinerziehend-leistungen',
  nav: 'Alleinerziehend: alle Leistungen',
  card: 'Unterhaltsvorschuss, Kindergeld, Kinderzuschlag, Wohngeld oder Grundsicherungsgeld mit Mehrbedarf.',
  title: 'Alleinerziehend Leistungen 2026: was Ihnen zusteht, in Euro',
  description: 'Alleinerziehend 2026: Kindergeld, Unterhaltsvorschuss, Kinderzuschlag, Wohngeld oder Grundsicherungsgeld mit Mehrbedarf, berechnet für Ihren Lohn und Ihre Miete',
  h1: 'Leistungen für Alleinerziehende: alles in einer Rechnung',
  intro: 'Alleinerziehende haben Anspruch auf mehr Leistungen als andere Haushalte, und sie greifen ineinander. Der Rechner setzt sie für Ihren Fall zusammen.',
  tool: { kind: 'haushalt', props: { paar: false, kinder: '4', brutto1: 1400, unterhalt: 0, miete: 560, heizung: 90, ort: 'Dresden' } },
  related: ['unterhaltsvorschuss', 'mehrbedarf', 'kinderzuschlag', 'wohngeld-oder-grundsicherung', 'kindergeld-2026'],
  sources: ['sgb2_21', 'uvg_1', 'uvg_2', 'bkgg_6a', 'wogg_17', 'estg_66'],
  resume: (h) => {
    const r = reihe(h).find((x) => x.b === 1400)!;
    return `Alleinerziehende bekommen für jedes Kind ${h.m(h.P.kindergeld.betrag)} Kindergeld und, wenn der andere Elternteil keinen oder zu wenig Unterhalt zahlt, Unterhaltsvorschuss vom Jugendamt: ${h.m(h.P.uvg.betraege[0])} für Kinder unter 6, ${h.m(h.P.uvg.betraege[1])} von 6 bis 11 und ${h.m(h.P.uvg.betraege[2])} von 12 bis 17 Jahren. Dazu kommt je nach Lohn entweder Wohngeld mit Kinderzuschlag oder Grundsicherungsgeld. Im Grundsicherungsgeld erhöht der Mehrbedarf für Alleinerziehende den Bedarf um ${h.pc(h.P.gsg.mehrbedarfAE.jeKind)} bis ${h.pc(h.P.gsg.mehrbedarfAE.max)} des Regelbedarfs; beim Wohngeld gibt es einen Freibetrag von ${h.m(h.P.wohngeld.freibetragAlleinerziehend)} im Jahr; den Kinderzuschlag gibt es schon ab ${h.m(h.P.kiz.mindestAllein)} brutto. Eine Mutter mit einem Kind von 4 Jahren, ${h.m(1400)} brutto und ${h.m(650)} Warmmiete in Mietstufe III kommt nach dieser Rechnung auf ${h.m(r.best.verfuegbar)} im Monat, davon ${h.m(r.best.leistungenSumme)} aus Leistungen (${r.best.titel}, Kindergeld, Unterhaltsvorschuss). Die Ämter entscheiden über jeden Antrag einzeln.`;
  },
  faqs: (h) => [
    { q: 'Wird der Unterhaltsvorschuss auf das Grundsicherungsgeld angerechnet?', a: 'Ja, vollständig, als Einkommen des Kindes. Er senkt das Grundsicherungsgeld um denselben Betrag, Ihr Geld im Monat bleibt gleich. Trotzdem müssen Sie ihn beantragen, weil er vorrangig ist. Beim Wohngeld zählt er ebenfalls als Einkommen, beim Kinderzuschlag mindert er den Betrag für das Kind um 45 Prozent des Vorschusses.' },
    { q: 'Gibt es den Mehrbedarf für Alleinerziehende auch beim Wohngeld?', a: `Nein, den Mehrbedarf gibt es nur im Grundsicherungsgeld und indirekt beim Kinderzuschlag, wo er in den Bedarf der Eltern eingeht. Das Wohngeld kennt stattdessen einen Freibetrag von ${h.m(h.P.wohngeld.freibetragAlleinerziehend)} im Jahr, wenn Sie allein mit mindestens einem Kind unter 18 Jahren wohnen, für das Kindergeld gezahlt wird (§ 17 Nr. 3 WoGG).` },
    { q: 'Ab welchem Alter des Kindes muss ich wieder arbeiten?', a: `Im Grundsicherungsgeld gilt eine Arbeit als zumutbar, sobald das Kind den ${h.P.gsg.kinderbetreuungAbLebensmonat}. Lebensmonat vollendet hat und die Betreuung in einer Kita, bei einer Tagesmutter oder anders gesichert ist (§ 10 Abs. 1 Nr. 3 SGB II). Die Kommune soll Ihnen vorrangig einen Platz anbieten. Fehlt die Betreuung, ist die Arbeit nicht zumutbar.` },
  ],
  body: (h) => {
    const R = reihe(h);
    return `
<h2>Ein Kind, sieben Löhne</h2>
<p>Was am Monatsende bleibt, hängt bei Alleinerziehenden weniger vom Lohn ab, als man denkt. Die Tabelle rechnet eine Mutter mit einem Kind von 4 Jahren, ohne Unterhalt vom Vater, mit ${h.m(560)} Bruttokaltmiete und ${h.m(90)} Heizung in Mietstufe III.</p>
${h.table(['Brutto', 'Netto', 'Weg', 'Leistungen', 'Geld im Monat'], R.map((x) => [h.m(x.b), h.m(x.v.nettoSumme), x.best.titel, h.m(x.best.leistungenSumme), `<strong>${h.m(x.best.verfuegbar)}</strong>`]), 'Leistungen einschließlich Kindergeld und Unterhaltsvorschuss. Steuerklasse II.', ['r', 'r', 'l', 'r', 'r'])}
<p>Zwischen keinem Lohn und einem Minijob steigt das Geld um den Freibetrag. Danach wächst es langsamer, weil das Grundsicherungsgeld mit jedem verdienten Euro sinkt. Wo der Haushalt zu Wohngeld und Kinderzuschlag wechselt, kann das verfügbare Geld leicht sinken, weil der Mehrbedarf wegfällt; dafür entfallen die Pflichten gegenüber dem Jobcenter.</p>

<h2>Die Leistungen im Überblick</h2>
${h.table(['Leistung', 'Höhe 2026', 'Wo beantragen'], [
  ['Kindergeld', `${h.m(h.P.kindergeld.betrag)} je Kind`, h.VG.STELLE.kg],
  ['Unterhaltsvorschuss', `${h.m(h.P.uvg.betraege[0])} / ${h.m(h.P.uvg.betraege[1])} / ${h.m(h.P.uvg.betraege[2])} nach Alter`, h.VG.STELLE.uvg],
  ['Kinderzuschlag', `bis ${h.m(h.P.kiz.hoechst)} je Kind`, h.VG.STELLE.kiz],
  ['Wohngeld', 'nach Miete, Einkommen, Mietstufe', h.VG.STELLE.wg],
  ['Grundsicherungsgeld', `Regelbedarf ${h.m(h.P.regelbedarf.rbs1)} plus Mehrbedarf, Kinder, Miete`, h.VG.STELLE.gsg],
  ['Bildung und Teilhabe', 'Schulbedarf, Ausflüge, Mittagessen, Vereinsbeitrag', 'Jobcenter oder Kommune'],
], undefined, ['l', 'l', 'l'])}

<h2>Steuerklasse II und der Entlastungsbetrag</h2>
<p>Der Rechner rechnet Alleinerziehende mit Steuerklasse II. Sie enthält den Entlastungsbetrag für Alleinerziehende und senkt die Lohnsteuer; das Netto ist dadurch höher als in Klasse I. Den Entlastungsbetrag gibt es nur, wenn keine andere erwachsene Person im Haushalt lebt. Beim Grundsicherungsgeld bringt das höhere Netto wenig, weil es angerechnet wird; beim Kinderzuschlag und beim Wohngeld zählt es stärker.</p>

<h2>Wenn der andere Elternteil zahlt</h2>
<p>Tragen Sie den gezahlten Unterhalt im Feld neben dem Lohn ein, für alle Kinder zusammen. Der Rechner verteilt ihn gleichmäßig, zieht ihn vom Unterhaltsvorschuss ab und rechnet ihn beim Grundsicherungsgeld als Einkommen der Kinder an. Zahlt der andere Elternteil weniger als den Unterhaltsvorschuss, stockt das Jugendamt bis zu diesem Betrag auf. Für Kinder von 12 bis 17 Jahren gibt es den Vorschuss nur, wenn das Kind kein Grundsicherungsgeld bezieht oder Sie mindestens ${h.m(h.P.uvg.mindesteinkommen12)} brutto verdienen. Mehr dazu unter ${h.a('unterhaltsvorschuss', 'Unterhaltsvorschuss')}.</p>

<h2>Umgang, Wechselmodell und neue Partnerschaft</h2>
<p>Verbringt das Kind regelmäßig Zeit beim anderen Elternteil, kann dort für diese Tage eine zeitweise Bedarfsgemeinschaft entstehen; das Jobcenter teilt dann den Regelbedarf des Kindes tageweise auf. Beim Wechselmodell mit etwa gleichen Anteilen wird auch der Mehrbedarf für Alleinerziehende geteilt. Zieht eine neue Partnerin oder ein neuer Partner ein, entfallen Mehrbedarf, Steuerklasse II und der Wohngeld-Freibetrag für Alleinerziehende, und das Einkommen beider zählt zusammen; der Rechner zeigt das, wenn Sie auf „Paar“ umschalten.</p>
<p>Ein Tipp für die Praxis: Notieren Sie, welcher Elternteil das Kindergeld bezieht. Es zählt im Grundsicherungsgeld als Einkommen des Kindes bei dem Elternteil, bei dem das Kind lebt, auch wenn es auf ein anderes Konto fließt.</p>
`;
  },
});
