import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'bildung-und-teilhabe',
  group: 'kinder',
  order: 46,
  slug: 'bildung-und-teilhabe',
  nav: 'Bildung und Teilhabe',
  card: 'Bildungspaket 2026: Schulbedarf, Mittagessen, Klassenfahrten, Lernförderung und 15 € für Verein oder Musik, und wer es bekommt.',
  title: 'Bildung und Teilhabe 2026: Leistungen, Berechtigte, Antrag',
  description: 'Bildung und Teilhabe 2026: Schulbedarf 195 €, 15 € im Monat für Verein und Musik, Mittagessen, Klassenfahrten, Lernförderung sowie Anspruch und Antrag.',
  h1: 'Leistungen für Bildung und Teilhabe',
  intro: 'Das Bildungspaket ergänzt den Regelbedarf von Kindern um Leistungen für Schule, Kita und Freizeit. Es steht nicht nur Familien im Grundsicherungsgeld zu, sondern auch Familien mit Kinderzuschlag oder Wohngeld.',
  mini: { kind: 'mini:regelsatz' },
  related: ['kinderzuschlag', 'wohngeld-2026', 'mehrbedarf', 'grundsicherung-antrag', 'kinderzuschlag-rechner'],
  sources: ['sgb2_28', 'bkgg_6b', 'sgb2_29', 'sgb2_37', 'ba_kiz_merkblatt', 'sgb12_34'],
  resume: (h) => {
    const B = h.P.but; const R = h.P.regelbedarf;
    return `Leistungen für Bildung und Teilhabe bekommen Kinder in Familien, die Grundsicherungsgeld, Sozialhilfe, Kinderzuschlag oder Wohngeld beziehen. Für Schülerinnen und Schüler unter ${B.bildungBisAlter} Jahren ohne Ausbildungsvergütung gibt es ${h.m(B.schulbedarfJahr)} im Schuljahr für Schulbedarf, ausgezahlt als ${h.m(R.schulbedarf1)} zum ersten und ${h.m(R.schulbedarf2)} zum zweiten Halbjahr. Die tatsächlichen Kosten werden übernommen für eintägige Ausflüge, mehrtägige Klassen- und Kitafahrten, das gemeinschaftliche Mittagessen in Schule, Kita oder Tagespflege, die Fahrt zur nächstgelegenen Schule und angemessene Lernförderung, auch ohne Versetzungsgefahr. Kinder unter ${B.teilhabeBisAlter} Jahren erhalten zusätzlich ${h.m(B.teilhabe)} im Monat für Verein, Musikunterricht oder Freizeiten, wenn solche Kosten anfallen. Zuständig ist bei Grundsicherungsgeld das Jobcenter, bei Kinderzuschlag und Wohngeld die Stelle der Stadt oder des Kreises, nicht die Familienkasse. Die Leistungen werden als Gutschein, als Zahlung direkt an den Anbieter oder als Geld erbracht; Schulbedarf und Schülerbeförderung immer als Geld. Bei Kinderzuschlag und Wohngeld verjähren Ansprüche ${B.verjaehrungMonate} Monate nach Ablauf des Monats, in dem sie entstanden sind.`;
  },
  faqs: (h) => [
    { q: 'Bekommen Kinder von Wohngeldbeziehern auch das Bildungspaket?', a: 'Ja. Wird dem Haushalt Wohngeld bewilligt und ist das Kind dabei als Haushaltsmitglied berücksichtigt, hat es Anspruch auf alle Leistungen für Bildung und Teilhabe. Der Antrag läuft nicht über die Wohngeldstelle, sondern über die für Bildung und Teilhabe zuständige Stelle der Stadt oder des Kreises. Den Wohngeldbescheid brauchen Sie dafür als Nachweis.' },
    { q: 'Muss für das Schulmittagessen ein Eigenanteil bezahlt werden?', a: 'Nein. Für die gemeinschaftliche Mittagsverpflegung in Schule, Kita oder Kindertagespflege werden die entstehenden Kosten vollständig berücksichtigt. Bei Schulkindern muss das Essen in schulischer Verantwortung angeboten oder über eine Kooperation zwischen Schule und Hort organisiert sein. Häufig rechnet die Stelle direkt mit dem Anbieter ab, sodass die Familie nichts auslegen muss.' },
    { q: 'Gibt es Nachhilfe auch ohne Versetzungsgefährdung?', a: 'Ja. Eine angemessene Lernförderung wird übernommen, wenn sie geeignet und zusätzlich erforderlich ist, um die wesentlichen Lernziele zu erreichen. Eine Versetzungsgefährdung ist nicht nötig. In der Regel bestätigt die Schule den Förderbedarf. Wer Grundsicherungsgeld bezieht, muss die Lernförderung gesondert beim Jobcenter beantragen; sie ist im allgemeinen Antrag nicht enthalten.' },
    { q: 'Wofür können die 15 Euro Teilhabe im Monat verwendet werden?', a: `Für Mitgliedsbeiträge in Sport, Spiel, Kultur und Geselligkeit, für Unterricht in künstlerischen Fächern wie Musik und vergleichbare angeleitete Angebote der kulturellen Bildung und für Freizeiten. Voraussetzung ist, dass solche Kosten tatsächlich anfallen und das Kind unter ${h.P.but.teilhabeBisAlter} ist. Darüber hinaus können im Einzelfall weitere Kosten übernommen werden, etwa für Ausrüstung, wenn sie aus Pauschale und Regelbedarf nicht zu tragen sind.` },
  ],
  body: (h) => {
    const B = h.P.but; const R = h.P.regelbedarf;
    const rows = [
      ['Eintägige Ausflüge (Schule, Kita, Tagespflege)', 'tatsächliche Kosten', 'Schulkinder und Kitakinder'],
      ['Mehrtägige Klassen- und Kitafahrten', 'tatsächliche Kosten', 'Schulkinder und Kitakinder'],
      ['Persönlicher Schulbedarf', `${h.m(R.schulbedarf1)} + ${h.m(R.schulbedarf2)} = ${h.m(B.schulbedarfJahr)} im Schuljahr`, `Schülerinnen und Schüler unter ${B.bildungBisAlter}`],
      ['Schülerbeförderung', 'tatsächliche Kosten, soweit nicht von Dritten übernommen', `Schülerinnen und Schüler unter ${B.bildungBisAlter}`],
      ['Lernförderung', 'angemessene Kosten', `Schülerinnen und Schüler unter ${B.bildungBisAlter}`],
      ['Gemeinschaftliches Mittagessen', 'tatsächliche Kosten', 'Schulkinder, Kitakinder, Kinder in Tagespflege'],
      ['Teilhabe (Verein, Musik, Freizeiten)', `${h.m(B.teilhabe)} im Monat`, `Kinder und Jugendliche unter ${B.teilhabeBisAlter}`],
    ];
    const zweiKinder = 2 * B.schulbedarfJahr + 2 * B.teilhabe * 12;
    return `
<h2>Die Leistungen im Überblick</h2>
${h.table(['Leistung', 'Höhe', 'Für wen'], rows, `Nach § 28 SGB II, für Familien mit Kinderzuschlag oder Wohngeld nach § 6b BKGG. Stand ${h.date(h.TODAY)}.`, ['l', 'l', 'l'])}
<p>Als Schülerin oder Schüler gilt, wer unter ${B.bildungBisAlter} Jahre alt ist, eine allgemein- oder berufsbildende Schule besucht und keine Ausbildungsvergütung erhält. Auch Berufsschüler in einer schulischen Ausbildung gehören dazu, Auszubildende mit Vergütung dagegen nicht. Für die Teilhabe gilt eine andere Altersgrenze: Sie endet mit dem ${B.teilhabeBisAlter}. Geburtstag.</p>

<h2>Wer Anspruch hat</h2>
<p>Das Bildungspaket ist an den Bezug bestimmter Leistungen gebunden. Anspruch haben Kinder in Familien, die</p>
<ul>
<li>Grundsicherungsgeld vom Jobcenter beziehen (§ 28 SGB II),</li>
<li>Sozialhilfe beziehen (§ 34 SGB XII),</li>
<li>für das Kind Kinderzuschlag erhalten (§ 6b BKGG) oder</li>
<li>Wohngeld erhalten, wenn das Kind und der Kindergeldberechtigte im Wohngeld als Haushaltsmitglieder berücksichtigt sind (§ 6b BKGG).</li>
</ul>
<p>Ist nur das Kind im Wohngeld berücksichtigt, während der kindergeldberechtigte Elternteil selbst Grundsicherungsgeld oder Sozialhilfe bezieht, besteht der Anspruch nach § 6b BKGG ebenfalls. Wird das Kindergeld direkt an das Kind oder an eine andere Person ausgezahlt, die dem Kind Unterhalt gewährt, stehen die Leistungen dieser Person oder dem Kind zu.</p>
<p>Gerade die letzten beiden Gruppen nutzen die Leistungen oft nicht, weil sie das Bildungspaket für eine Leistung des Jobcenters halten. Auch ein kleiner Kinderzuschlag von wenigen Euro reicht aus, um den vollen Anspruch auf alle Leistungen zu eröffnen. Ob Ihre Familie Kinderzuschlag oder Wohngeld bekommen kann, zeigt der ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')}.</p>

<h2>Was eine Familie im Jahr bekommen kann</h2>
<p>Für zwei Schulkinder unter ${B.teilhabeBisAlter} Jahren, die beide in einem Sportverein sind, ergeben allein Schulbedarf und Teilhabepauschale ${h.m(zweiKinder)} im Jahr: zweimal ${h.m(B.schulbedarfJahr)} Schulbedarf und zweimal zwölf Monate zu ${h.m(B.teilhabe)}. Hinzu kommen das Mittagessen an jedem Schultag, Ausflüge und die Klassenfahrt in voller Höhe sowie gegebenenfalls Fahrtkosten und Nachhilfe. Bei täglichem Schulessen ist der Wert des Mittagessens oft der größte Posten. Diese Leistungen kommen zum Regelbedarf des Kindes hinzu; beim Kinderzuschlag zählen sie ausdrücklich nicht als Einkommen.</p>

<h2>Bildungspaket und Regelbedarf</h2>
<p>Der Regelbedarf eines Kindes deckt Essen, Kleidung und den Alltag, aber nicht die Kosten, die Schule und Freizeit verursachen. Diese Lücke soll das Bildungspaket schließen. Ein Kind von 8 Jahren hat im Grundsicherungsgeld einen Regelbedarf von ${h.m(R.rbs5)} im Monat. Auf den Monat umgerechnet kommen allein aus Schulbedarf und Teilhabepauschale rund ${h.m(B.schulbedarfJahr / 12 + B.teilhabe)} hinzu, dazu die Kosten für Mittagessen, Ausflüge und Fahrten. Weil diese Leistungen nicht mit dem Regelbedarf verrechnet werden, lohnt es sich, jede einzelne zu beantragen. Den Regelbedarf Ihres Haushalts zeigt der Rechner oben.</p>

<h2>Schulbedarf: wann und wie viel</h2>
<p>Den persönlichen Schulbedarf, etwa für Ranzen, Hefte, Stifte oder einen Taschenrechner, gibt es in zwei Teilen: ${h.m(R.schulbedarf1)} für das erste Schulhalbjahr, in der Regel zum 1. August, und ${h.m(R.schulbedarf2)} für das zweite, in der Regel zum 1. Februar. Im Grundsicherungsgeld ist er mit dem Hauptantrag beantragt und wird mit der Leistung gezahlt. Familien mit Kinderzuschlag oder Wohngeld beantragen ihn bei der zuständigen Stelle. Der Schulbedarf wird immer als Geld ausgezahlt und nicht als Gutschein.</p>

<h2>Einschulung oder Schulbeginn mitten im Schuljahr</h2>
<p>Kommt ein Kind erst im Laufe des Schuljahres an eine Schule, etwa nach einem Umzug aus dem Ausland, gelten Sonderregeln. Beginnt der Schulbesuch nach dem Start des ersten Halbjahres, aber vor dem zweiten, gibt es den Betrag für das erste Halbjahr von ${h.m(R.schulbedarf1)}. Beginnt er im oder nach dem Monat, in dem das zweite Halbjahr anfängt, werden beide Teilbeträge zusammen gezahlt, also ${h.m(B.schulbedarfJahr)}. Wird der Schulbesuch unterbrochen und erst nach Beginn des zweiten Halbjahres wieder aufgenommen, gibt es den zweiten Teilbetrag.</p>

<h2>Mittagessen, Ausflüge und Klassenfahrten</h2>
<p>Für das gemeinschaftliche Mittagessen werden die gesamten Kosten übernommen, ohne Eigenanteil. Das gilt in der Kita, in der Kindertagespflege und in der Schule, wenn die Schule das Essen verantwortet oder mit einem Hort kooperiert. Auch eintägige Ausflüge und mehrtägige Fahrten der Schule oder Kita werden in tatsächlicher Höhe bezahlt. Häufig zahlt die Stelle direkt an die Schule, die Kita oder den Caterer. Schulen können die Kosten für Ausflüge auch gesammelt für alle berechtigten Kinder abrechnen.</p>

<h2>Lernförderung und Schülerbeförderung</h2>
<p>Lernförderung gibt es, wenn sie geeignet und zusätzlich zum Unterricht erforderlich ist, um die wesentlichen Lernziele zu erreichen. Eine Versetzungsgefährdung ist keine Voraussetzung. Die Schule bestätigt den Bedarf in der Regel. Fahrtkosten zur Schule werden übernommen, wenn das Kind für den Weg zur nächstgelegenen Schule des gewählten Bildungsgangs auf Beförderung angewiesen ist und niemand anders, etwa der Schulträger, die Kosten trägt. Als nächstgelegen gilt auch eine Schule mit besonderem Profil, etwa sprachlich, musisch, sportlich oder bilingual, oder eine Ganztagsschule.</p>

<h2>Teilhabe am sozialen und kulturellen Leben</h2>
<p>Die Pauschale von ${h.m(B.teilhabe)} im Monat ist für Mitgliedsbeiträge in Sportvereinen, Musikschulen, Kunst- oder Theaterkursen und für Freizeiten gedacht. Sie wird berücksichtigt, wenn solche Kosten tatsächlich entstehen. Kosten darüber hinaus, etwa für Ausrüstung oder Fahrten zu Wettkämpfen, können im Einzelfall zusätzlich übernommen werden, wenn sie aus der Pauschale und dem Regelbedarf nicht zu tragen sind. Die Pauschale endet mit dem ${B.teilhabeBisAlter}. Geburtstag.</p>

<h2>Antrag und Form der Leistung</h2>
<p>Wer Grundsicherungsgeld bezieht, hat mit dem Hauptantrag die Leistungen für Bildung und Teilhabe weitgehend mitbeantragt. Nur die Lernförderung muss gesondert beantragt werden. Familien mit Kinderzuschlag oder Wohngeld stellen einen Antrag bei der zuständigen Stelle ihrer Stadt oder ihres Kreises; den Bescheid über Kinderzuschlag oder Wohngeld legen sie als Nachweis bei. Welche Stelle zuständig ist, regeln die Länder und Kommunen unterschiedlich.</p>
<p>Die Kommune entscheidet, ob sie die Leistungen als personalisierten Gutschein, als Zahlung direkt an den Anbieter oder als Geld erbringt. Schulbedarf und Schülerbeförderung werden immer als Geld gezahlt. Wird Geld gezahlt, geschieht das monatlich oder nachträglich als Erstattung verauslagter Beträge. Im Einzelfall kann ein Nachweis verlangt werden, dass das Geld zweckentsprechend verwendet wurde. Bei Kinderzuschlag und Wohngeld verjähren die Ansprüche ${B.verjaehrungMonate} Monate nach Ablauf des Monats, in dem sie entstanden sind. Belege für Ausflüge, Vereinsbeiträge oder Fahrkarten sollten Sie deshalb zeitnah einreichen.</p>

<h2>Schritt für Schritt für Familien mit Wohngeld oder Kinderzuschlag</h2>
<ol>
<li>Beantragen Sie zuerst Wohngeld oder Kinderzuschlag; der Bescheid ist später Ihr Nachweis.</li>
<li>Erkundigen Sie sich bei Ihrer Stadt oder Ihrem Kreis, welche Stelle die Leistungen für Bildung und Teilhabe bearbeitet.</li>
<li>Stellen Sie den Antrag für jedes Kind und jede Leistung, die Sie brauchen, und fügen Sie Belege bei: Elternbrief zur Klassenfahrt, Vertrag mit dem Caterer, Beitragsrechnung des Vereins, Bestätigung der Schule zur Lernförderung.</li>
<li>Reichen Sie Belege zeitnah ein; nach ${B.verjaehrungMonate} Monaten verjähren die Ansprüche.</li>
<li>Endet der Bezug von Wohngeld oder Kinderzuschlag, endet auch der Anspruch. Mit einem neuen Bescheid können Sie erneut beantragen.</li>
</ol>

<h2>Weitere Vergünstigungen</h2>
<p>Mit dem Kinderzuschlag können Sie zusätzlich beim Jugendamt die Befreiung von Kita-Gebühren beantragen. Beginnt ein Kind unter ${h.P.kiz.altersgrenze} Jahren erstmals ein Studium und wurde im Monat davor eine Sozialleistung wie der Kinderzuschlag bezogen, kommt eine Studienstarthilfe von ${h.m(B.studienstarthilfe)} in Betracht. Mehr zum Kinderzuschlag selbst steht unter ${h.a('kinderzuschlag', 'Kinderzuschlag')}.</p>
`;
  },
});
