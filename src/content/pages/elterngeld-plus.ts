import { definePage } from '../../lib/guide-types';

const BRUTTO = 2800;
const TZ = 1000;

export default definePage({
  id: 'elterngeld-plus',
  group: 'eltern',
  order: 61,
  slug: 'elterngeld-plus',
  nav: 'Elterngeld Plus',
  card: 'Elterngeld Plus: halber Betrag, doppelte Dauer, und warum es sich vor allem bei Teilzeit lohnt. Mit Rechenbeispielen.',
  title: 'Elterngeld Plus 2026: Höhe, Dauer und Teilzeit im Vergleich',
  description: 'Elterngeld Plus 2026: halb so hoch wie Basiselterngeld, doppelt so lange, bis zum 32. Lebensmonat. Rechenbeispiele mit Teilzeit, Kombination und Regeln.',
  h1: 'Elterngeld Plus: länger beziehen, in Teilzeit mehr bekommen',
  intro: 'Elterngeld Plus streckt das Elterngeld über einen längeren Zeitraum. Ohne Einkommen nach der Geburt bringt es insgesamt gleich viel wie das Basiselterngeld, mit Teilzeit oft deutlich mehr.',
  mini: { kind: 'mini:elterngeld' },
  related: ['elterngeld-rechner', 'partnerschaftsbonus', 'elterngeld-und-sozialleistungen', 'mutterschaftsgeld', 'kindergeld-2026'],
  sources: ['beeg_4', 'beeg_4a', 'beeg_2', 'beeg_4b', 'beeg_10', 'beeg_7'],
  resume: (h) => {
    const E = h.P.elterngeld;
    const ohne = h.EG.elterngeld({ brutto: BRUTTO, stkl: 4 });
    const mit = h.EG.elterngeld({ brutto: BRUTTO, stkl: 4, nettoNachher: TZ });
    return `Elterngeld Plus ist die zweite Form des Elterngeldes nach § 4a BEEG. Es beträgt höchstens die Hälfte des Basiselterngeldes, das ohne Einkommen nach der Geburt zustünde, also zwischen ${h.m(E.plusMindest)} und ${h.m(E.hoechst / 2)} im Monat, und wird dafür doppelt so lange gezahlt: Statt eines Monats Basiselterngeld gibt es zwei Monate Elterngeld Plus. Basiselterngeld gibt es nur bis zum ${E.basisBisLebensmonat}. Lebensmonat des Kindes, Elterngeld Plus bis zum ${E.plusBisLebensmonat}., sofern es ab dem ${E.basisBisLebensmonat + 1}. Lebensmonat ohne Unterbrechung von mindestens einem Elternteil bezogen wird. Ohne Einkommen nach der Geburt ist die Summe gleich. Wer in Teilzeit arbeitet, gewinnt dagegen: Bei ${h.m(BRUTTO)} brutto vor der Geburt in Steuerklasse IV und ${h.m(TZ)} Netto aus Teilzeit beträgt das Basiselterngeld nach unserer Rechnung ${h.m2(mit.basis)} und das Elterngeld Plus ${h.m2(mit.plus)}, also gleich viel, aber für doppelt so viele Monate. Ohne Teilzeit wären es ${h.m2(ohne.basis)} Basiselterngeld oder ${h.m2(ohne.plus)} Elterngeld Plus. Beide Formen lassen sich kombinieren, und mit dem Partnerschaftsbonus kommen bis zu ${E.partnerschaftsbonusMonate[1]} weitere Monate Elterngeld Plus je Elternteil hinzu.`;
  },
  faqs: (h) => [
    { q: 'Kann ich Basiselterngeld und Elterngeld Plus kombinieren?', a: `Ja. Sie legen im Antrag für jeden Lebensmonat fest, welche Form Sie beziehen. Ein Monat Basiselterngeld entspricht dabei zwei Monaten Elterngeld Plus. Üblich ist zum Beispiel, zuerst einige Monate Basiselterngeld und danach Elterngeld Plus zu beziehen. Basiselterngeld muss aber bis zum ${h.P.elterngeld.basisBisLebensmonat}. Lebensmonat genommen werden; danach geht nur noch Elterngeld Plus.` },
    { q: 'Darf ich während Elterngeld Plus Vollzeit arbeiten?', a: `Nein. Elterngeld setzt voraus, dass Sie nicht voll erwerbstätig sind. Erlaubt sind höchstens ${h.P.elterngeld.maxWochenstunden} Wochenstunden im Durchschnitt des Lebensmonats. Eine Beschäftigung zur Berufsbildung und eine Tätigkeit als geeignete Tagespflegeperson gelten nicht als volle Erwerbstätigkeit. Das Einkommen aus der Teilzeit mindert das Elterngeld Plus, aber weniger stark als das Basiselterngeld.` },
    { q: 'Wie viele Monate Elterngeld Plus gibt es höchstens?', a: `Ein Elternteil kann höchstens ${h.P.elterngeld.basisMonate} Monatsbeträge Basiselterngeld beziehen, umgerechnet ${2 * h.P.elterngeld.basisMonate} Monate Elterngeld Plus. Beide Eltern zusammen haben ${h.P.elterngeld.basisMonate + h.P.elterngeld.partnerMonate} Monatsbeträge, wenn beide ihr Einkommen mindern, also bis zu ${2 * (h.P.elterngeld.basisMonate + h.P.elterngeld.partnerMonate)} Monate Elterngeld Plus. Mit dem Partnerschaftsbonus kommen je Elternteil bis zu ${h.P.elterngeld.partnerschaftsbonusMonate[1]} Monate hinzu.` },
    { q: 'Wird Elterngeld Plus beim Grundsicherungsgeld voll angerechnet?', a: `Grundsätzlich ja. Frei bleibt nur ein Betrag in Höhe des Einkommens vor der Geburt, beim Elterngeld Plus höchstens ${h.m(h.P.elterngeld.freibetragSgb2Plus)} im Monat, also die Hälfte des Freibetrags beim Basiselterngeld. Wer vor der Geburt nicht gearbeitet hat, bekommt keinen Freibetrag. Beim Wohngeld bleiben beim Elterngeld Plus bis zu ${h.m(h.P.elterngeld.freibetragSgb2Plus)} unabhängig vom früheren Einkommen frei.` },
  ],
  body: (h) => {
    const E = h.P.elterngeld;
    const ohne = h.EG.elterngeld({ brutto: BRUTTO, stkl: 4 });
    const mit = h.EG.elterngeld({ brutto: BRUTTO, stkl: 4, nettoNachher: TZ });
    const n = E.basisMonate;
    const vgl = [
      ['Kein Einkommen nach der Geburt', `${n} × ${h.m2(ohne.basis)} = ${h.m(n * ohne.basis)}`, `${2 * n} × ${h.m2(ohne.plus)} = ${h.m(2 * n * ohne.plus)}`],
      [`Teilzeit mit ${h.m(TZ)} netto`, `${n} × ${h.m2(mit.basis)} = ${h.m(n * mit.basis)}`, `${2 * n} × ${h.m2(mit.plus)} = ${h.m(2 * n * mit.plus)}`],
    ];
    const tzStufen = [600, 800, 1000, 1200, 1400].map((t) => { const r = h.EG.elterngeld({ brutto: BRUTTO, stkl: 4, nettoNachher: t }); return [h.m(t), h.m2(r.basis), h.m2(r.plus), h.m(2 * r.plus - r.basis)]; });
    const fg = E.fruehgeburt;
    return `
<h2>Basiselterngeld oder Elterngeld Plus: die Summe zählt</h2>
${h.table(['Situation', `Basiselterngeld, ${n} Monate`, `Elterngeld Plus, ${2 * n} Monate`], vgl, `Brutto vor der Geburt ${h.m(BRUTTO)}, Steuerklasse IV, ohne Kirchensteuer. Eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['l', 'r', 'r'])}
<p>Ohne Einkommen nach der Geburt ist Elterngeld Plus genau halb so hoch wie Basiselterngeld, läuft aber doppelt so lange; die Summe ist gleich. Es lohnt sich dann vor allem, wenn Sie das Geld über einen längeren Zeitraum verteilen möchten. Anders mit Teilzeit: Das Basiselterngeld ersetzt nur einen Teil des Einkommensverlusts, weil das Teilzeitnetto abgezogen wird. Das Elterngeld Plus ist auf die Hälfte des Basiselterngeldes ohne Einkommen begrenzt, und diese Grenze greift bei Teilzeit oft nicht mehr. Im Beispiel sind beide Monatsbeträge gleich, das Elterngeld Plus wird aber doppelt so lange gezahlt.</p>

<h2>Wie viel Teilzeit sich lohnt</h2>
${h.table(['Netto aus Teilzeit', 'Basiselterngeld', 'Elterngeld Plus', 'Vorteil Plus je Basismonat'], tzStufen, `Brutto vor der Geburt ${h.m(BRUTTO)}, Steuerklasse IV. Die letzte Spalte vergleicht zwei Monate Elterngeld Plus mit einem Monat Basiselterngeld. Eigene Berechnung.`, ['r', 'r', 'r', 'r'])}
<p>Bei wenig Teilzeit ist das Elterngeld Plus durch die Hälfte des Basiselterngeldes begrenzt. Mit steigendem Teilzeitnetto sinkt das Basiselterngeld, bis beide Monatsbeträge gleich hoch sind; dort ist der Vorteil am größten, denn zwei Monate Plus bringen dann doppelt so viel wie ein Monat Basis. Verdienen Sie noch mehr, sinken beide Beträge, und auch der Vorteil wird kleiner. Das Einkommen vor der Geburt zählt bei der Teilzeitrechnung höchstens mit ${h.m(E.kappungTeilzeit)}. Die Arbeitszeit darf ${E.maxWochenstunden} Wochenstunden im Monatsdurchschnitt nicht überschreiten.</p>

<h2>Der Rechenweg bei Teilzeit</h2>
<p>Bei Teilzeit rechnet die Elterngeldstelle mit dem Unterschied zwischen dem Elterngeld-Netto vor der Geburt und dem Netto nach der Geburt. Im Beispiel liegt das Elterngeld-Netto vor der Geburt bei ${h.m2(ohne.egNetto)}. Abzüglich ${h.m(TZ)} Teilzeitnetto bleibt ein Unterschied von ${h.m2(Math.min(ohne.egNetto, E.kappungTeilzeit) - TZ)}. Davon werden ${h.pc(ohne.rate)} ersetzt, das ergibt ${h.m2(mit.basis)} Basiselterngeld. Für das Elterngeld Plus gilt dieselbe Rechnung, gedeckelt auf die Hälfte des Basiselterngeldes ohne Teilzeit, hier ${h.m2(ohne.plus)}. Weil der so berechnete Betrag darunter liegt, ist das Elterngeld Plus genauso hoch wie das Basiselterngeld.</p>

<h2>Zeitliche Regeln</h2>
<ul>
<li><strong>Basiselterngeld</strong> kann ab der Geburt bis zum Ende des ${E.basisBisLebensmonat}. Lebensmonats bezogen werden.</li>
<li><strong>Elterngeld Plus</strong> kann bis zum Ende des ${E.plusBisLebensmonat}. Lebensmonats bezogen werden, wenn es ab dem ${E.basisBisLebensmonat + 1}. Lebensmonat in aufeinander folgenden Monaten von mindestens einem Elternteil genommen wird. Eine Lücke ab diesem Zeitpunkt beendet den Anspruch.</li>
<li><strong>Umrechnung:</strong> Statt eines Monats Basiselterngeld gibt es zwei Monate Elterngeld Plus.</li>
<li><strong>Mindestbezug:</strong> Jeder Elternteil muss Elterngeld für mindestens ${E.mindestBezugMonate} Lebensmonate beziehen.</li>
<li><strong>Gleichzeitiger Bezug:</strong> Basiselterngeld können beide Eltern nur in einem der ersten ${E.basisMonate} Lebensmonate gleichzeitig beziehen. Mit Elterngeld Plus ist gleichzeitiger Bezug dagegen ohne diese Grenze möglich.</li>
</ul>
<p>Elterngeld wird nach Lebensmonaten gezahlt, nicht nach Kalendermonaten. Ein Kind, das am 10. März geboren ist, hat seinen ersten Lebensmonat vom 10. März bis zum 9. April. Arbeitszeit und Einkommen werden für diese Monate betrachtet.</p>

<h2>Beispiele für die Aufteilung</h2>
<p>Die Aufteilung ist frei, solange die Grenzen eingehalten werden. Drei typische Modelle:</p>
<ul>
<li><strong>Ein Elternteil allein mit Basis und Plus:</strong> zuerst sechs Monate Basiselterngeld, danach zwölf Monate Elterngeld Plus. Das entspricht den ${n} Monatsbeträgen eines Elternteils und streckt das Geld bis ins zweite Lebensjahr.</li>
<li><strong>Beide Eltern nacheinander:</strong> ein Elternteil ${n} Monate Basiselterngeld, der andere danach ${2 * E.partnerMonate} Monate Elterngeld Plus statt der ${E.partnerMonate} Partnermonate.</li>
<li><strong>Beide Eltern gleichzeitig in Teilzeit:</strong> beide beziehen parallel Elterngeld Plus und arbeiten zwischen ${E.partnerschaftsbonusStunden[0]} und ${E.partnerschaftsbonusStunden[1]} Wochenstunden; dann kommen ${E.partnerschaftsbonusMonate[0]} bis ${E.partnerschaftsbonusMonate[1]} Monate Partnerschaftsbonus hinzu.</li>
</ul>
<p>Weil ein Elternteil allein höchstens ${n} Monatsbeträge Basiselterngeld bekommt, kann das Paar die ${E.partnerMonate} Partnermonate nur nutzen, wenn auch der zweite Elternteil in ${E.partnerMonate} Lebensmonaten weniger verdient als vor der Geburt. Alleinerziehende können die Partnermonate unter bestimmten Voraussetzungen selbst beziehen. Einzelheiten zum Bonus stehen unter ${h.a('partnerschaftsbonus', 'Partnerschaftsbonus')}.</p>

<h2>Alleinerziehende</h2>
<p>Alleinerziehende können die ${E.partnerMonate} Partnermonate selbst beziehen, wenn ihr Einkommen in diesen Monaten gemindert ist und sie die Voraussetzungen für den steuerlichen Entlastungsbetrag für Alleinerziehende erfüllen, während der andere Elternteil weder mit ihnen noch mit dem Kind zusammenlebt. Dasselbe gilt, wenn die Betreuung durch den anderen Elternteil das Kindeswohl gefährden würde oder unmöglich ist, etwa wegen schwerer Krankheit. Sie kommen so auf ${n + E.partnerMonate} Monatsbeträge Basiselterngeld oder ${2 * (n + E.partnerMonate)} Monate Elterngeld Plus. Arbeiten sie in ${E.partnerschaftsbonusMonate[0]} bis ${E.partnerschaftsbonusMonate[1]} aufeinander folgenden Lebensmonaten zwischen ${E.partnerschaftsbonusStunden[0]} und ${E.partnerschaftsbonusStunden[1]} Wochenstunden, erhalten sie für diese Monate zusätzlich Elterngeld Plus, wie beim Partnerschaftsbonus.</p>

<h2>Häufige Fehler bei der Planung</h2>
<ul>
<li><strong>Lücke nach dem ${E.basisBisLebensmonat}. Lebensmonat:</strong> Wer ab dem ${E.basisBisLebensmonat + 1}. Lebensmonat einen Monat ohne Elterngeld Plus lässt, verliert die restlichen Monate. Planen Sie die Übergänge zwischen den Eltern lückenlos.</li>
<li><strong>Basiselterngeld zu spät:</strong> Basismonate nach dem ${E.basisBisLebensmonat}. Lebensmonat sind nicht möglich und müssen in Elterngeld Plus umgewandelt werden.</li>
<li><strong>Zu viele Wochenstunden:</strong> Mehr als ${E.maxWochenstunden} Wochenstunden im Durchschnitt eines Lebensmonats gelten als volle Erwerbstätigkeit; dann fehlt eine Voraussetzung für das Elterngeld.</li>
<li><strong>Nur ein Monat für einen Elternteil:</strong> Jeder Elternteil muss mindestens ${E.mindestBezugMonate} Lebensmonate beziehen, sonst entfällt sein Anspruch.</li>
<li><strong>Antrag zu spät:</strong> Was mehr als ${E.rueckwirkendMonate} Lebensmonate vor dem Antragsmonat liegt, wird nicht mehr gezahlt.</li>
</ul>

<h2>Mindest- und Höchstbetrag</h2>
<p>Für das Elterngeld Plus halbieren sich der Mindestbetrag (${h.m(E.plusMindest)} statt ${h.m(E.mindest)}), der Mindestbetrag des Geschwisterbonus (${h.m(E.geschwisterMin / 2)} statt ${h.m(E.geschwisterMin)}) und der Mehrlingszuschlag (${h.m(E.mehrling / 2)} statt ${h.m(E.mehrling)}). Der höchste mögliche Betrag liegt bei ${h.m(E.hoechst / 2)}, der Hälfte des Höchstbetrags von ${h.m(E.hoechst)}. Auch die Beträge, die bei der Anrechnung anderer Entgeltersatzleistungen auf das Elterngeld frei bleiben, halbieren sich.</p>

<h2>Frühgeburten</h2>
<p>Kommt ein Kind mindestens ${fg.wochenVorher[0]} Wochen vor dem errechneten Termin zur Welt, erhöht sich der gemeinsame Anspruch auf ${fg.basisMonate[0]} Monatsbeträge Basiselterngeld, bei mindestens ${fg.wochenVorher[1]}, ${fg.wochenVorher[2]} oder ${fg.wochenVorher[3]} Wochen auf ${fg.basisMonate[1]}, ${fg.basisMonate[2]} oder ${fg.basisMonate[3]}. Entsprechend verschieben sich die Grenzen für das Basiselterngeld nach hinten. Für das Elterngeld Plus bleibt das Ende beim ${E.plusBisLebensmonat}. Lebensmonat; der ununterbrochene Bezug muss dann erst später beginnen. Jeder zusätzliche Monatsbetrag kann wiederum in zwei Monate Elterngeld Plus umgewandelt werden.</p>

<h2>Elterngeld Plus und andere Leistungen</h2>
<p>Bei einkommensabhängigen Sozialleistungen bleibt Elterngeld bis zu ${h.m(E.freibetragSgb2)} im Monat frei, beim Elterngeld Plus nur bis zur Hälfte, also ${h.m(E.freibetragSgb2Plus)}. Für Grundsicherungsgeld und Kinderzuschlag gilt eine strengere Regel: Frei bleibt nur, was dem Einkommen vor der Geburt entspricht. Wer Elterngeld Plus und Grundsicherungsgeld gleichzeitig bezieht, sollte deshalb rechnen, ob sich die längere Bezugsdauer lohnt, denn der größte Teil wird angerechnet. Mehr dazu unter ${h.a('elterngeld-und-sozialleistungen', 'Elterngeld und Sozialleistungen')}. Für die eigene Berechnung nutzen Sie den ${h.a('elterngeld-rechner', 'Elterngeld-Rechner')}.</p>

<h2>Antrag</h2>
<p>Im schriftlichen Antrag bei der Elterngeldstelle geben Sie an, für welche Lebensmonate Sie Basiselterngeld, Elterngeld Plus oder Partnerschaftsbonus beantragen. Sie können die Aufteilung bis zum Ende des Bezugs ändern; für Monate, in denen bereits Elterngeld Plus gezahlt wurde, kann nachträglich Basiselterngeld beantragt werden. Rückwirkend gibt es Elterngeld nur für ${E.rueckwirkendMonate} Lebensmonate vor dem Monat des Antrags. Da Elterngeld Plus oft weit über das erste Lebensjahr hinaus läuft, lohnt es sich, die Aufteilung früh mit dem anderen Elternteil zu planen.</p>
`;
  },
});
