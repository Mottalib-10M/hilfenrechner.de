import { definePage } from '../../lib/guide-types';
import type { Helpers } from '../../lib/helpers';

const STUFE = 3;
const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
const SCHRITT = 50;

/** Kleinster und größter Bruttolohn (ein Verdienst), bei dem der Haushalt Kinderzuschlag erhält. */
function grenzen(h: Helpers, paar: boolean, kinder: number[], miete: number, heizung: number) {
  let lo = 0, hi = 0, wahl = 0;
  const min = paar ? h.P.kiz.mindestPaar : h.P.kiz.mindestAllein;
  for (let b = min; b <= 9000; b += SCHRITT) {
    const v = h.VG.vergleich({ paar, brutto: paar ? [b, 0] : [b], kinder, unterhalt: 0, miete, heizung, mietstufe: STUFE, elterngeld: 0, sonstiges: 0 });
    if (v.kiz.gesamt <= 0) { if (hi) break; continue; }
    if (v.wahlrecht && !wahl && !lo) wahl = b;
    if (v.empfehlung === 'vorrang') { if (!lo) lo = b; hi = b; }
  }
  return { lo, hi, wahl };
}

export default definePage({
  id: 'kinderzuschlag-einkommensgrenze',
  group: 'kinder',
  order: 43,
  slug: 'kinderzuschlag-einkommensgrenze',
  nav: 'KiZ-Einkommensgrenzen',
  card: 'Ab welchem und bis zu welchem Einkommen es Kinderzuschlag gibt, berechnet für typische Familien.',
  title: 'Kinderzuschlag Einkommensgrenze 2026: Untergrenze und Ende',
  description: 'Kinderzuschlag-Einkommensgrenzen 2026: Mindesteinkommen von 900 € und 600 €, berechnete Höchsteinkommen für Paare und Alleinerziehende und Einfluss der Miete.',
  h1: 'Einkommensgrenzen beim Kinderzuschlag',
  intro: 'Für den Kinderzuschlag gibt es eine Untergrenze, aber keine feste Obergrenze. Die Tabellen zeigen sie für typische Familien.',
  mini: { kind: 'mini:kiz' },
  related: ['kinderzuschlag', 'kinderzuschlag-rechner', 'wohngeld-einkommensgrenzen', 'wohngeld-oder-grundsicherung', 'aufstocker'],
  sources: ['bkgg_6a', 'ba_kiz_merkblatt', 'sgb2_11b'],
  resume: (h) => {
    const K = h.P.kiz;
    const p2 = grenzen(h, true, [4, 8], 750, 110);
    const a1 = grenzen(h, false, [6], 550, 80);
    return `Die untere Einkommensgrenze des Kinderzuschlags ist gesetzlich festgelegt: Eltern brauchen im Durchschnitt der letzten ${K.bemessungMonate} Monate mindestens ${h.m(K.mindestPaar)} brutto als Paar oder ${h.m(K.mindestAllein)} brutto als Alleinerziehende. Wohngeld, Kindergeld und Kinderzuschlag zählen dabei nicht mit. Eine feste Obergrenze gibt es dagegen nicht. Der Zuschlag sinkt um ${h.pc(K.anrechnungEltern)} des Erwerbseinkommens, das den Bedarf der Eltern übersteigt, und endet, wenn er auf null gefallen ist. Nach unserer Rechnung für Mietstufe ${ROM[STUFE - 1]} bekommt ein Paar mit zwei Kindern, ${h.m(750)} Bruttokaltmiete und einem Verdienst Kinderzuschlag ab rund ${h.m(p2.lo)} bis rund ${h.m(p2.hi)} brutto im Monat. Für eine Alleinerziehende mit einem Kind ohne Unterhalt und ${h.m(550)} Miete reicht der Bereich von rund ${h.m(a1.lo)} bis ${h.m(a1.hi)}. Darunter ist meist das Jobcenter zuständig, weil das Einkommen trotz Kinderzuschlag und Wohngeld nicht für den Bedarf reicht. Höhere Miete und mehr Kinder schieben die Obergrenze nach oben, Unterhalt für das Kind schiebt sie nach unten.`;
  },
  faqs: (h) => [
    { q: 'Zählt beim Mindesteinkommen für den Kinderzuschlag das Brutto oder das Netto?', a: `Das Brutto. Die Grenze von ${h.m(h.P.kiz.mindestPaar)} für Paare und ${h.m(h.P.kiz.mindestAllein)} für Alleinerziehende wird ohne Abzug von Steuern, Sozialbeiträgen und Freibeträgen geprüft. Mitgezählt werden neben Lohn auch Arbeitslosengeld, Krankengeld oder Elterngeld. Wohngeld, Kindergeld und der Kinderzuschlag selbst zählen nicht. Bei Paaren werden die Einkommen beider Partner zusammengerechnet.` },
    { q: 'Gibt es beim Kinderzuschlag eine feste Höchstgrenze für das Einkommen?', a: `Nein. Das Gesetz nennt keine Höchstgrenze. Der Zuschlag sinkt mit steigendem Einkommen und endet, wenn er rechnerisch null erreicht. Wo das passiert, hängt vom Bedarf der Eltern ab, also vor allem von der Miete, und von der Zahl der Kinder: Jedes Kind bringt bis zu ${h.m(h.P.kiz.hoechst)}, die erst abgeschmolzen werden müssen. Deshalb reicht der Anspruch bei großen Familien bis weit in mittlere Einkommen.` },
    { q: 'Warum endet mein Kinderzuschlag als Alleinerziehende früher als bei Paaren?', a: 'Weil Unterhalt oder Unterhaltsvorschuss das Einkommen des Kindes sind und den Zuschlag des Kindes schon vorab mindern. Es bleibt weniger übrig, das durch Ihren Lohn abgeschmolzen werden kann. Gleichzeitig ist Ihr eigener Bedarf als einzelner Erwachsener niedriger als der eines Paares. Beides zusammen führt dazu, dass der Anspruch bei geringerem Bruttolohn ausläuft.' },
    { q: 'Was passiert, wenn mein Einkommen im Bewilligungszeitraum über die Grenze steigt?', a: `Nichts. Der Kinderzuschlag ist für ${h.P.kiz.bewilligung} Monate fest bewilligt, Änderungen beim Einkommen werden in dieser Zeit nicht berücksichtigt und müssen nicht gemeldet werden. Erst beim nächsten Antrag zählt das höhere Einkommen. Anders ist es nur, wenn sich die Familie ändert, etwa durch Geburt, Einzug oder Auszug.` },
  ],
  body: (h) => {
    const K = h.P.kiz;
    const fams: Array<[string, boolean, number[], number, number]> = [
      ['Paar, 1 Kind (6)', true, [6], 650, 90],
      ['Paar, 2 Kinder (4, 8)', true, [4, 8], 750, 110],
      ['Paar, 3 Kinder (3, 7, 11)', true, [3, 7, 11], 850, 130],
      ['Alleinerziehend, 1 Kind (6)', false, [6], 550, 80],
      ['Alleinerziehend, 2 Kinder (4, 8)', false, [4, 8], 650, 100],
    ];
    const zeilen = fams.map(([t, paar, k, mi, hz]) => { const g = grenzen(h, paar, k, mi, hz); return [t, h.m(mi), g.wahl ? `ab ${h.m(g.wahl)}` : '–', h.m(g.lo), h.m(g.hi)]; });
    const mieten = [550, 750, 950, 1150].map((mi) => { const g = grenzen(h, true, [4, 8], mi, 110); return [h.m(mi), h.m(g.lo), h.m(g.hi)]; });
    const v = h.VG.vergleich({ paar: true, brutto: [3000, 0], kinder: [4, 8], unterhalt: 0, miete: 750, heizung: 110, mietstufe: STUFE, elterngeld: 0, sonstiges: 0 });
    const v2 = h.VG.vergleich({ paar: true, brutto: [1800, 1200], kinder: [4, 8], unterhalt: 0, miete: 750, heizung: 110, mietstufe: STUFE, elterngeld: 0, sonstiges: 0 });
    const bisNull = v.kiz.elternBedarf + (2 * K.hoechst) / K.anrechnungEltern;
    const uv = h.UV.uvgBetrag(6);
    const alterSet = [3, 7, 11, 5];
    const kinderRows = [1, 2, 3, 4].map((n) => { const g = grenzen(h, true, alterSet.slice(0, n), 850, 130); return [String(n), h.m(n * K.hoechst), h.m(g.lo), h.m(g.hi)]; });
    return `
<h2>Die untere Grenze: Mindesteinkommen</h2>
<p>Der Kinderzuschlag ist eine Leistung für erwerbstätige Eltern. Deshalb verlangt das Gesetz ein Mindesteinkommen von ${h.m(K.mindestPaar)} brutto im Monat für Paare und ${h.m(K.mindestAllein)} für Alleinerziehende. Geprüft wird der Durchschnitt der ${K.bemessungMonate} Monate vor dem Antragsmonat, nicht der aktuelle Monat. Mitgezählt werden Erwerbseinkommen, aber auch Arbeitslosengeld, Krankengeld oder Elterngeld. Wohngeld, Kindergeld und Kinderzuschlag zählen nicht. Wer in dieser Zeit nur Grundsicherungsgeld bezogen hat, erreicht die Grenze nicht.</p>
<p>Das Mindesteinkommen allein reicht aber selten. Die zweite Hürde ist, dass die Familie mit Kinderzuschlag und Wohngeld ihren Bedarf deckt. Bei einer Familie mit zwei Kindern und durchschnittlicher Miete gelingt das erst mit einem deutlich höheren Lohn. Faktisch liegt die untere Grenze deshalb meist über dem Mindesteinkommen.</p>
<p>Für Familien in Elternzeit ist wichtig: Auch das Elterngeld zählt beim Mindesteinkommen mit, denn das Gesetz nimmt nur Wohngeld, Kindergeld und Kinderzuschlag aus. Ein Paar, bei dem ein Elternteil Elterngeld bezieht und der andere arbeitet, kann die Grenze von ${h.m(K.mindestPaar)} deshalb gemeinsam erreichen. Für die Höhe des Zuschlags zählt das Elterngeld dann als Einkommen der Eltern, abzüglich des Elterngeld-Freibetrags für Eltern, die vor der Geburt gearbeitet haben; mehr dazu unter ${h.a('elterngeld-und-sozialleistungen', 'Elterngeld und Sozialleistungen')}.</p>

<h2>Berechnete Grenzen für typische Familien</h2>
${h.table(['Haushalt', 'Bruttokaltmiete', 'Wahlrecht (erweiterter Zugang)', 'KiZ statt Jobcenter ab', 'KiZ bis'], zeilen, `Ein Verdienst, Arbeitnehmer, Mietstufe ${ROM[STUFE - 1]}, Heizung je nach Haushalt ${h.m(80)} bis ${h.m(130)}, Alleinerziehende ohne Unterhalt mit Unterhaltsvorschuss. Bruttolöhne im Monat, in Schritten von ${h.m(SCHRITT)}. Eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>Die Spalte zum Wahlrecht zeigt, ab welchem Lohn der Familie mit allen Leistungen höchstens ${h.m(K.luecke)} zum Bedarf fehlen. In diesem Bereich kann sie statt Grundsicherungsgeld den Kinderzuschlag wählen. Ab der vierten Spalte reicht das Geld ohne Jobcenter, und der Kinderzuschlag geht vor. Die letzte Spalte ist der höchste Bruttolohn, bei dem noch ein Zuschlag übrig bleibt. Die Werte gelten für die angegebenen Mieten; jede Familie liegt anders.</p>

<h2>Warum es keine feste Obergrenze gibt</h2>
<p>Der Kinderzuschlag endet nicht an einer Einkommensgrenze, sondern dann, wenn er vollständig abgeschmolzen ist. Rechnerisch ist das der Fall, wenn das anrechenbare Einkommen der Eltern ihren Bedarf um den Gesamtkinderzuschlag geteilt durch ${h.pc(K.anrechnungEltern)} übersteigt. Für die Familie mit zwei Kindern aus der Tabelle beträgt der Bedarf der Eltern ${h.m(v.kiz.elternBedarf)}. Zwei volle Zuschläge von je ${h.m(K.hoechst)} sind aufgezehrt, wenn das anrechenbare Einkommen rund ${h.m(bisNull)} erreicht. Anrechenbar heißt: nach Steuern, Sozialbeiträgen und Erwerbstätigenfreibetrag. Brutto entspricht das einem deutlich höheren Betrag, wie die Tabelle zeigt.</p>
<p>Daraus folgen drei Regeln. Erstens: Je mehr Kinder, desto höher die Grenze, denn jedes Kind bringt einen weiteren Zuschlag mit, der abgeschmolzen werden muss. Zweitens: Je höher die Miete, desto höher der Bedarf der Eltern und damit die Grenze. Drittens: Einkommen des Kindes, etwa Unterhalt, senkt die Grenze, weil es den Zuschlag des Kindes schon vorher mindert.</p>

<h2>Eine Rechnung Schritt für Schritt</h2>
<p>Wie nah eine Familie an der Grenze ist, lässt sich nachvollziehen. Nehmen wir das Paar mit zwei Kindern, ${h.m(750)} Bruttokaltmiete und ${h.m(110)} Heizung, und einen Lohn von ${h.m(3000)} brutto. Nach Steuern und Sozialbeiträgen bleiben netto rund ${h.m(v.nettoSumme)}. Davon zieht die Familienkasse den Freibetrag für Erwerbstätige ab; anrechenbar sind dann rund ${h.m(v.kiz.erwerbAnrechenbar)}. Der Bedarf der Eltern besteht aus ${h.m(2 * h.P.regelbedarf.rbs2)} Regelbedarf und ${h.pc(v.kiz.wohnanteil)} der Warmmiete, zusammen ${h.m(v.kiz.elternBedarf)}. Das anrechenbare Einkommen liegt ${h.m(v.kiz.erwerbAnrechenbar - v.kiz.elternBedarf)} darüber; ${h.pc(K.anrechnungEltern)} davon, rund ${h.m(v.kiz.kuerzung)}, werden von den zwei Höchstbeträgen abgezogen. Es bleiben ${h.m(v.kiz.gesamt)} Kinderzuschlag. Jeder weitere Euro anrechenbares Einkommen kostet ${h.dec(K.anrechnungEltern)} Euro Kinderzuschlag, bis nichts mehr übrig ist.</p>

<h2>Mehr Kinder, höhere Grenze</h2>
${h.table(['Kinder', 'Höchstens Kinderzuschlag', 'KiZ statt Jobcenter ab', 'KiZ bis'], kinderRows, `Paar, ein Verdienst, Bruttokaltmiete ${h.m(850)}, Heizung ${h.m(130)}, Mietstufe ${ROM[STUFE - 1]}, Kinder von 3 bis 11 Jahren. Eigene Berechnung.`, ['l', 'r', 'r', 'r'])}
<p>Bei gleicher Wohnung steigt die Obergrenze mit jedem Kind kräftig, weil ein weiterer Höchstbetrag von ${h.m(K.hoechst)} hinzukommt, der erst abgeschmolzen werden muss. Das wiegt schwerer als der Umstand, dass der Anteil der Eltern an der Miete mit jedem Kind kleiner wird. Die untere Grenze sinkt dagegen: Mit jedem Kind wachsen Kindergeld, Kinderzuschlag und Wohngeld stärker als der zusätzliche Bedarf, sodass schon ein geringerer Lohn reicht, um ohne Jobcenter auszukommen.</p>

<h2>Zwei Verdienste statt einem</h2>
<p>Die Tabellen rechnen mit einem Verdienst. Arbeiten beide Eltern, verschiebt sich die Grenze. Jeder Erwerbstätige hat einen eigenen Freibetrag, und die Steuer fällt bei getrennten Einkommen anders aus. Für das Paar mit zwei Kindern und ${h.m(750)} Miete ergibt ein Lohn von ${h.m(3000)} aus einem Verdienst ${h.m(v.kiz.gesamt)} Kinderzuschlag; verteilt auf ${h.m(1800)} und ${h.m(1200)} sind es nach unserer Rechnung ${h.m(v2.kiz.gesamt)}. Bei zwei Verdiensten liegt das anrechenbare Einkommen also ${v2.kiz.erwerbAnrechenbar < v.kiz.erwerbAnrechenbar ? 'niedriger' : 'höher'}, und der Anspruch reicht entsprechend ${v2.kiz.erwerbAnrechenbar < v.kiz.erwerbAnrechenbar ? 'weiter' : 'weniger weit'}. Im Rechner können Sie beide Löhne getrennt eingeben.</p>

<h2>Wie die Miete die Grenze verschiebt</h2>
${h.table(['Bruttokaltmiete', 'KiZ statt Jobcenter ab', 'KiZ bis'], mieten, `Paar, Kinder 4 und 8 Jahre, ein Verdienst, Heizung ${h.m(110)}, Mietstufe ${ROM[STUFE - 1]}. Eigene Berechnung.`, ['r', 'r', 'r'])}
<p>Eine höhere Miete hebt beide Grenzen an. Die untere steigt, weil auch der Bedarf der ganzen Familie steigt und mehr Lohn nötig ist, um ihn mit Kinderzuschlag und Wohngeld zu decken. Die obere steigt, weil der Anteil der Eltern an den Wohnkosten wächst und erst mehr Einkommen ihren Bedarf übersteigt. Familien in teuren Städten bekommen deshalb auch mit einem mittleren Lohn noch Kinderzuschlag.</p>

<h2>Wenn der Lohn um die Grenze schwankt</h2>
<p>Für die Höhe des Kinderzuschlags zählt der Durchschnitt der ${K.bemessungMonate} Monate vor dem Antragsmonat. Ein einzelner Monat mit Überstunden schiebt eine Familie also nicht über die Grenze, ein dauerhaft höherer Lohn aber schon beim nächsten Antrag. Während des Bewilligungszeitraums von ${K.bewilligung} Monaten bleibt der Betrag gleich, auch wenn der Lohn steigt oder sinkt. Sinkt das Einkommen stark, etwa durch Kurzarbeit oder Krankheit, und reicht es mit Kinderzuschlag nicht mehr für den Bedarf, kann zusätzlich Grundsicherungsgeld beim Jobcenter beantragt werden.</p>
<p>Oft endet der Kinderzuschlag früher als das Wohngeld. Eine Familie knapp über der Grenze des Kinderzuschlags hat deshalb häufig noch Anspruch auf Wohngeld und damit, über das Wohngeld, auch auf die Leistungen für Bildung und Teilhabe.</p>

<h2>Alleinerziehende und Unterhalt</h2>
<p>Bei Alleinerziehenden ist die Obergrenze niedriger. Erhält ein sechsjähriges Kind den Unterhaltsvorschuss von ${h.m(uv)}, mindert das seinen Kinderzuschlag schon vor jeder Anrechnung von Lohn um ${h.m(K.anrechnungKind * uv)} auf ${h.m(K.hoechst - K.anrechnungKind * uv)}. Was übrig bleibt, ist mit dem Lohn schneller aufgezehrt. Dafür liegt das Mindesteinkommen niedriger, und der Mehrbedarf für Alleinerziehende erhöht den Bedarf. Wer Unterhalt vom anderen Elternteil bekommt, gibt den tatsächlich gezahlten Betrag im ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')} ein.</p>

<h2>Brutto, Netto und anrechenbares Einkommen</h2>
<p>Für die Untergrenze zählt das Brutto. Für die Höhe des Zuschlags zählt das anrechenbare Einkommen: Vom Brutto gehen Steuern, Sozialbeiträge, Werbungskosten, Beiträge zu angemessenen Versicherungen und der Freibetrag für Erwerbstätige ab, mit Kind bis zu ${h.m(K.erwerbsfreibetragMax)}. Wer hohe Fahrtkosten hat oder titulierten Unterhalt für ein anderes Kind zahlt, hat ein niedrigeres anrechenbares Einkommen und damit eine höhere Grenze. Die Tabellen auf dieser Seite rechnen ohne solche individuellen Abzüge; Ihr Ergebnis kann deshalb abweichen.</p>
<p>Wer knapp über der Grenze liegt, sollte trotzdem rechnen lassen: Bereits ein Kinderzuschlag von wenigen Euro öffnet die Leistungen für ${h.a('bildung-und-teilhabe', 'Bildung und Teilhabe')} und die Befreiung von Kita-Gebühren. Wo das Wohngeld endet, steht unter ${h.a('wohngeld-einkommensgrenzen', 'Wohngeld-Einkommensgrenzen')}.</p>
`;
  },
});
