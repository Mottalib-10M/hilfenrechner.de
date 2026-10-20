import { definePage } from '../../lib/guide-types';

const A = { brutto: 3200, tz: 1500 };
const B = { brutto: 2400, tz: 1200 };

export default definePage({
  id: 'partnerschaftsbonus',
  group: 'eltern',
  order: 62,
  slug: 'partnerschaftsbonus',
  nav: 'Partnerschaftsbonus',
  card: 'Partnerschaftsbonus: zwei bis vier zusätzliche Monate Elterngeld Plus, wenn beide Eltern gleichzeitig 24 bis 32 Stunden arbeiten.',
  title: 'Partnerschaftsbonus 2026: Stunden, Monate und Rechenbeispiel',
  description: 'Partnerschaftsbonus beim Elterngeld: 2 bis 4 Extramonate Elterngeld Plus je Elternteil bei 24 bis 32 Wochenstunden beider Eltern, Regeln und Beispiel.',
  h1: 'Partnerschaftsbonus beim Elterngeld',
  intro: 'Eltern, die gleichzeitig in Teilzeit arbeiten, bekommen zusätzliche Monate Elterngeld Plus, mit engen Stundengrenzen.',
  mini: { kind: 'mini:elterngeld' },
  related: ['elterngeld-plus', 'elterngeld-rechner', 'elterngeld-und-sozialleistungen', 'mutterschaftsgeld', 'alleinerziehend-leistungen'],
  sources: ['beeg_4b', 'beeg_4c', 'beeg_4', 'beeg_4a', 'beeg_2', 'beeg_8', 'beeg_15'],
  resume: (h) => {
    const E = h.P.elterngeld; const M = E.partnerschaftsbonusMonate; const S = E.partnerschaftsbonusStunden;
    const a = h.EG.elterngeld({ brutto: A.brutto, stkl: 4, nettoNachher: A.tz });
    const b = h.EG.elterngeld({ brutto: B.brutto, stkl: 4, nettoNachher: B.tz });
    return `Den Partnerschaftsbonus nach § 4b BEEG bekommen Eltern, die beide gleichzeitig nicht weniger als ${S[0]} und nicht mehr als ${S[1]} Wochenstunden im Durchschnitt des Lebensmonats arbeiten und die übrigen Voraussetzungen für Elterngeld erfüllen. Jeder Elternteil erhält dann für jeden dieser Lebensmonate einen zusätzlichen Monatsbetrag Elterngeld Plus. Der Bonus muss für mindestens ${M[0]} und darf für höchstens ${M[1]} Lebensmonate je Elternteil bezogen werden, und zwar von beiden gleichzeitig und in aufeinander folgenden Monaten. Die Höhe richtet sich nach den Regeln für Elterngeld Plus mit Teilzeit: ersetzt wird ein Teil des Unterschieds zwischen dem Einkommen vor der Geburt und dem Teilzeitnetto, mindestens ${h.m(E.plusMindest)}. In unserem Beispiel, ein Elternteil mit ${h.m(A.brutto)} und einer mit ${h.m(B.brutto)} brutto vor der Geburt, beide in Teilzeit mit ${h.m(A.tz)} und ${h.m(B.tz)} netto, bringt der Bonus zusammen ${h.m2(a.plus + b.plus)} im Monat, über ${M[1]} Monate ${h.m(M[1] * (a.plus + b.plus))}. Alleinerziehende können unter bestimmten Voraussetzungen den Bonus allein beziehen. Wird festgestellt, dass die Bedingungen nicht in allen Monaten erfüllt waren, bleiben die übrigen Monate grundsätzlich bestehen.`;
  },
  faqs: (h) => [
    { q: 'Wie werden die Wochenstunden für den Partnerschaftsbonus gezählt?', a: `Maßgeblich ist der Durchschnitt im jeweiligen Lebensmonat des Kindes, nicht der Kalendermonat und nicht die einzelne Woche. Beide Eltern müssen in diesem Durchschnitt mindestens ${h.P.elterngeld.partnerschaftsbonusStunden[0]} und höchstens ${h.P.elterngeld.partnerschaftsbonusStunden[1]} Wochenstunden arbeiten. Eine Woche mit Überstunden schadet also nicht, solange der Monatsdurchschnitt im Rahmen bleibt. Selbstständige müssen die Stunden ebenfalls einhalten.` },
    { q: 'Was passiert, wenn ein Elternteil im Bonusmonat mehr als 32 Stunden gearbeitet hat?', a: 'Dann sind die Voraussetzungen für diesen Monat nicht erfüllt, und der Bonus für diesen Monat muss in der Regel erstattet werden. Das Gesetz schützt aber die übrigen Monate: Das Erfordernis aufeinander folgender Monate gilt als erfüllt, auch wenn sich später herausstellt, dass die Voraussetzungen nicht in allen beantragten Monaten vorlagen.' },
    { q: 'Können wir den Partnerschaftsbonus nach dem zweiten Geburtstag nehmen?', a: `Der Bonus ist Elterngeld Plus und folgt dessen zeitlichen Regeln. Elterngeld Plus kann bis zum Ende des ${h.P.elterngeld.plusBisLebensmonat}. Lebensmonats bezogen werden, wenn ab dem ${h.P.elterngeld.basisBisLebensmonat + 1}. Lebensmonat mindestens ein Elternteil ohne Lücke Elterngeld bezieht. Ein Bonus im dritten Lebensjahr ist daher möglich, wenn die Monate davor lückenlos belegt sind.` },
    { q: 'Was gilt, wenn wir uns während des Partnerschaftsbonus trennen?', a: 'Treten während des Bonus die Voraussetzungen für einen alleinigen Bezug ein, etwa weil ein Elternteil als Alleinerziehender den steuerlichen Entlastungsbetrag erhält und der andere nicht mehr mit ihm und dem Kind zusammenlebt, kann ein Elternteil den Bonus allein fortführen. Melden Sie die Trennung der Elterngeldstelle sofort.' },
  ],
  body: (h) => {
    const E = h.P.elterngeld; const M = E.partnerschaftsbonusMonate; const S = E.partnerschaftsbonusStunden;
    const a = h.EG.elterngeld({ brutto: A.brutto, stkl: 4, nettoNachher: A.tz });
    const b = h.EG.elterngeld({ brutto: B.brutto, stkl: 4, nettoNachher: B.tz });
    const a0 = h.EG.elterngeld({ brutto: A.brutto, stkl: 4 });
    const b0 = h.EG.elterngeld({ brutto: B.brutto, stkl: 4 });
    const tzRows = [1000, 1300, 1500, 1700, 1900].map((t) => { const r = h.EG.elterngeld({ brutto: A.brutto, stkl: 4, nettoNachher: t }); return [h.m(t), h.m2(r.plus), h.m(M[1] * r.plus)]; });
    const rows = [
      ['Elternteil 1', h.m(A.brutto), h.m2(a0.egNetto), h.m(A.tz), h.m2(a.plus), h.m(M[1] * a.plus)],
      ['Elternteil 2', h.m(B.brutto), h.m2(b0.egNetto), h.m(B.tz), h.m2(b.plus), h.m(M[1] * b.plus)],
    ];
    const stunden = [[`${S[0]} Stunden`, `${S[0] / 3} Stunden an 3 Tagen oder ${S[0] / 4} Stunden an 4 Tagen`], [`${S[1]} Stunden`, `${S[1] / 4} Stunden an 4 Tagen oder ${h.dec(S[1] / 5, 1)} Stunden an 5 Tagen`]];
    return `
<h2>Die Voraussetzungen im Überblick</h2>
<ul>
<li>Beide Eltern arbeiten gleichzeitig zwischen ${S[0]} und ${S[1]} Wochenstunden im Durchschnitt des Lebensmonats.</li>
<li>Beide erfüllen die allgemeinen Voraussetzungen für Elterngeld: Wohnsitz in Deutschland, Kind im Haushalt, eigene Betreuung, keine volle Erwerbstätigkeit, Einkommen unterhalb der Grenze von ${h.m(E.einkommensgrenze)}.</li>
<li>Der Bonus wird von beiden gleichzeitig bezogen, in aufeinander folgenden Lebensmonaten.</li>
<li>Jeder Elternteil bezieht ihn für mindestens ${M[0]} und höchstens ${M[1]} Lebensmonate.</li>
</ul>
${h.table(['Wochenstunden', 'Beispiele für die Verteilung'], stunden, 'Mögliche Verteilungen der Arbeitszeit; maßgeblich ist nur der Durchschnitt im Lebensmonat.', ['l', 'l'])}
<p>Die Stundengrenzen gelten für beide Eltern. Arbeitet ein Elternteil ${S[1]} Stunden und der andere nur 20, gibt es keinen Bonus. Auch wer nicht angestellt, sondern selbstständig ist, muss die Stunden einhalten; das Einkommen aus der Selbstständigkeit wird dann wie Teilzeiteinkommen angerechnet.</p>

<h2>Ein Rechenbeispiel</h2>
${h.table(['', 'Brutto vor der Geburt', 'Elterngeld-Netto vorher', 'Teilzeitnetto im Bonus', 'Bonus im Monat', `Bonus in ${M[1]} Monaten`], rows, `Beide Steuerklasse IV, ohne Kirchensteuer. Eigene Berechnung nach §§ 2 und 4a BEEG, Stand ${h.date(h.TODAY)}.`, ['l', 'r', 'r', 'r', 'r', 'r'])}
<p>Der Bonus ersetzt bei jedem Elternteil ${h.pc(a.rate)} des Unterschieds zwischen dem Elterngeld-Netto vor der Geburt und dem Teilzeitnetto. Er ist aber höchstens so hoch wie das Elterngeld Plus ohne Teilzeit, hier ${h.m2(a0.plus)} und ${h.m2(b0.plus)}, und mindestens ${h.m(E.plusMindest)}. Zusammen erhalten die Eltern ${h.m2(a.plus + b.plus)} im Monat und über ${M[1]} Monate ${h.m(M[1] * (a.plus + b.plus))}, zusätzlich zu ihrem Teilzeitlohn. Der Bonus kommt zu den übrigen Monaten Basiselterngeld oder Elterngeld Plus hinzu; er verbraucht keinen der regulären Monatsbeträge.</p>

<h2>Wie das Teilzeitnetto den Bonus verändert</h2>
${h.table(['Teilzeitnetto', 'Bonus im Monat', `Bonus in ${M[1]} Monaten`], tzRows, `Elternteil mit ${h.m(A.brutto)} brutto vor der Geburt, Steuerklasse IV. Eigene Berechnung.`, ['r', 'r', 'r'])}
<p>Je weniger der Teilzeitlohn hinter dem früheren Einkommen zurückbleibt, desto kleiner wird der Bonus, bis der Mindestbetrag von ${h.m(E.plusMindest)} erreicht ist. Unter diesen Betrag fällt er nicht. Wer viele Stunden im erlaubten Rahmen arbeitet, bekommt also weniger Bonus, aber mehr Lohn; in der Summe hat der Haushalt trotzdem meist mehr Geld zur Verfügung.</p>

<h2>Bonus und Partnermonate: zwei verschiedene Dinge</h2>
<p>Die Partnermonate und der Partnerschaftsbonus werden oft verwechselt. Die ${E.partnerMonate} Partnermonate sind zusätzliche Monatsbeträge Basiselterngeld für das Paar; sie gibt es, wenn auch der zweite Elternteil in ${E.partnerMonate} Lebensmonaten weniger verdient. Eine Mindestzahl an Arbeitsstunden gibt es dafür nicht, der Elternteil darf auch ganz zu Hause bleiben. Der Partnerschaftsbonus dagegen setzt voraus, dass beide gleichzeitig arbeiten, und zwar zwischen ${S[0]} und ${S[1]} Wochenstunden. Er wird als Elterngeld Plus gezahlt und kommt zu den Partnermonaten hinzu. Ein Paar kann also beides nutzen.</p>

<h2>Teilzeit mit dem Arbeitgeber vereinbaren</h2>
<p>Wer in Elternzeit ist, darf höchstens ${E.maxWochenstunden} Wochenstunden im Monatsdurchschnitt arbeiten; das passt zur Obergrenze des Bonus. Die Teilzeit muss mit dem Arbeitgeber vereinbart werden, bei einem anderen Arbeitgeber oder in Selbstständigkeit braucht es seine Zustimmung. Klären Sie Arbeitszeit und Beginn deshalb frühzeitig, bevor Sie die Bonusmonate im Elterngeldantrag festlegen. Beide Eltern müssen ihre Stunden so planen, dass sie in jedem Bonusmonat im Durchschnitt mindestens ${S[0]} Stunden erreichen.</p>

<h2>Wann sich der Bonus lohnt</h2>
<p>Finanziell bringt der Bonus am meisten, wenn das Teilzeitnetto deutlich unter dem Einkommen vor der Geburt liegt. Wer vor der Geburt gut verdient hat und in Teilzeit nur einen Teil davon bekommt, erhält einen spürbaren Ausgleich. Wer dagegen schon vor der Geburt in Teilzeit gearbeitet hat und die Stunden beibehält, verliert kaum Einkommen; dann gibt es oft nur den Mindestbetrag. Auch der lohnt sich aber, denn ${M[1]} Monate mit je ${h.m(E.plusMindest)} für beide Eltern summieren sich auf ${h.m(2 * M[1] * E.plusMindest)}. Die Obergrenze Ihres Bonus, das Elterngeld Plus ohne Teilzeit, zeigt der kleine Rechner oben, wenn Sie Ihren Bruttolohn vor der Geburt eingeben.</p>
<p>Außerhalb des Geldes ist der Bonus ein Anreiz, die Betreuung partnerschaftlich zu teilen und den Wiedereinstieg in den Beruf schrittweise zu gestalten.</p>

<h2>Einen Plan aufstellen</h2>
<p>Ein Beispiel für die Aufteilung eines Paares: Elternteil 1 bezieht in den Lebensmonaten 1 bis ${E.basisMonate} Basiselterngeld, Elternteil 2 nimmt die Lebensmonate ${E.basisMonate + 1} bis ${E.basisMonate + E.partnerMonate} als Basiselterngeld, die beiden Partnermonate. Ab dem ${E.basisMonate + E.partnerMonate + 1}. Lebensmonat arbeiten beide in Teilzeit und beziehen für ${M[1]} Monate den Partnerschaftsbonus. Damit sind die Monatsbeträge beider Eltern ausgeschöpft, und das Elterngeld reicht bis zum Ende des ${E.basisMonate + E.partnerMonate + M[1]}. Lebensmonats. Gleichzeitiges Basiselterngeld beider Eltern wäre nur in einem der ersten ${E.basisMonate} Lebensmonate möglich; deshalb folgen die Partnermonate hier nacheinander. Wichtig ist, dass der Bezug ab dem ${E.basisBisLebensmonat + 1}. Lebensmonat lückenlos ist und Basiselterngeld nur bis zum ${E.basisBisLebensmonat}. Lebensmonat genommen wird.</p>
<p>Ändern sich die Pläne, kann die Aufteilung bis zum Ende des Bezugs geändert werden, für bereits ausgezahlte Monate aber nur in Härtefällen. Rückwirkend gibt es Elterngeld nur für ${E.rueckwirkendMonate} Lebensmonate vor dem Antragsmonat; der Antrag sollte deshalb rechtzeitig vor Beginn des Bonus gestellt oder geändert werden.</p>

<h2>Geschwister und Mehrlinge</h2>
<p>Auch im Bonus gelten Geschwisterbonus und Mehrlingszuschlag, und zwar in der Höhe, die für Elterngeld Plus vorgesehen ist: Der Geschwisterbonus beträgt ${h.pc(E.geschwister)}, mindestens ${h.m2(E.geschwisterMin / 2)}, der Mehrlingszuschlag ${h.m(E.mehrling / 2)} für jedes weitere Kind. Bei Zwillingen bekommen also beide Eltern im Bonusmonat je ${h.m(E.mehrling / 2)} zusätzlich.</p>

<h2>Wenn es nicht wie geplant klappt</h2>
<p>Kann ein Elternteil die Stunden in einem Bonusmonat nicht einhalten, etwa weil der Arbeitgeber mehr verlangt oder die Kinderbetreuung ausfällt, sind die Voraussetzungen für diesen Monat nicht erfüllt. Das Gesetz sorgt aber dafür, dass die übrigen Monate nicht an der Bedingung der aufeinander folgenden Monate scheitern. Teilen Sie die Abweichung der Elterngeldstelle mit, damit sie den betroffenen Monat neu bewertet, statt später eine größere Summe zurückzufordern.</p>

<h2>Alleinerziehende</h2>
<p>Alleinerziehende können den Bonus allein beziehen. Voraussetzung ist, dass sie die Bedingungen für den steuerlichen Entlastungsbetrag für Alleinerziehende erfüllen und der andere Elternteil weder mit ihnen noch mit dem Kind zusammenlebt, oder dass die Betreuung durch den anderen Elternteil das Kindeswohl gefährden würde oder unmöglich ist. Sie müssen dann in ${M[0]} bis ${M[1]} aufeinander folgenden Lebensmonaten zwischen ${S[0]} und ${S[1]} Wochenstunden arbeiten und erhalten für diese Monate zusätzliche Monatsbeträge Elterngeld Plus.</p>

<h2>Bonus und Sozialleistungen</h2>
<p>Der Partnerschaftsbonus ist Elterngeld Plus. Bei Wohngeld bleibt davon bis zu ${h.m(E.freibetragSgb2Plus)} im Monat anrechnungsfrei. Bei Grundsicherungsgeld und Kinderzuschlag bleibt nur ein Betrag in Höhe des Einkommens vor der Geburt frei, höchstens ${h.m(E.freibetragSgb2Plus)}. Da im Bonus beide Eltern arbeiten, wird zusätzlich der Lohn angerechnet, mit den Freibeträgen für Erwerbstätige. Einzelheiten unter ${h.a('elterngeld-und-sozialleistungen', 'Elterngeld und Sozialleistungen')}.</p>

<h2>Nachweise und Kontrolle</h2>
<p>Im Antrag geben Sie die geplanten Bonusmonate und die vereinbarte Arbeitszeit an. Weil die Höhe vom Teilzeiteinkommen abhängt, entscheidet die Elterngeldstelle zunächst vorläufig nach Ihren glaubhaften Angaben. Nach dem Bezug weisen Sie das tatsächliche Einkommen nach; weicht es ab, wird nachgezahlt oder zurückgefordert. Beide Eltern sind dabei zur Mitwirkung verpflichtet. Den Antrag unterschreibt in der Regel die Person, die ihn stellt, und zur Kenntnisnahme auch der andere Elternteil; dieser kann gleichzeitig seinen eigenen Antrag stellen. Melden Sie Änderungen der Arbeitszeit deshalb sofort. Die eigene Berechnung machen Sie mit dem ${h.a('elterngeld-rechner', 'Elterngeld-Rechner')}, indem Sie dort das Netto aus Teilzeit eintragen; der ausgewiesene Betrag für Elterngeld Plus entspricht dann dem Bonus.</p>
`;
  },
});
