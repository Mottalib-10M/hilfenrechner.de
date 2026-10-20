import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'wohngeld-antrag',
  group: 'wohngeld',
  order: 15,
  slug: 'wohngeld-antrag',
  nav: 'Wohngeld beantragen',
  card: 'Wo und wann Sie Wohngeld beantragen, welche Unterlagen nötig sind und wie es weitergeht.',
  title: 'Wohngeld Antrag 2026: Unterlagen, Fristen und Weiterleistung',
  description: 'Wohngeld beantragen: zuständige Wohngeldstelle, Unterlagen, Beginn der Bewilligung, Weiterleistungsantrag, Änderungen melden und Verhältnis zum Jobcenter.',
  h1: 'Wohngeld beantragen: Ablauf, Unterlagen und Fristen',
  intro: 'Wohngeld gibt es frühestens ab dem Monat, in dem der Antrag eingeht. Wer auf alle Unterlagen wartet, verliert Geld.',
  mini: { kind: 'mini:wohngeld' },
  related: ['wohngeld-rechner', 'wohngeld-2026', 'wohngeld-oder-grundsicherung', 'vorrangpruefung', 'kinderzuschlag'],
  sources: ['wogg_22', 'wogg_25', 'wogg_27', 'wogg_7', 'sgb2_12a', 'btd_21_8284'],
  resume: (h) => {
    const W = h.P.wohngeld;
    return `Wohngeld beantragt die wohngeldberechtigte Person für den ganzen Haushalt bei der Wohngeldstelle ihrer Stadt, Gemeinde oder ihres Kreises (§ 22 WoGG). Der Bewilligungszeitraum beginnt am Ersten des Monats, in dem der Antrag eingeht (§ 25 Abs. 2 WoGG); für frühere Monate gibt es grundsätzlich nichts. Es genügt, zunächst einen formlosen oder unvollständigen Antrag zu stellen und die Nachweise nachzureichen. Bewilligt wird in der Regel für ${W.bewilligungMonate} Monate, bei absehbar gleichen Verhältnissen für bis zu ${W.bewilligungMax} Monate. Einen Weiterleistungsantrag stellen Sie rechtzeitig vor Ablauf, frühestens ${W.weiterAntragMonateVorher} Monate vorher; ein noch früherer Antrag gilt als zu diesem Zeitpunkt gestellt (§ 22 Abs. 4 WoGG). Steigt im laufenden Zeitraum die Miete um mehr als ${h.pc(W.neuAntragSchwelle)} oder sinkt das Einkommen um mehr als ${h.pc(W.neuAntragSchwelle)}, lohnt ein neuer Antrag; steigt das Einkommen um mehr als ${h.pc(W.amtswegenSchwelle)}, müssen Sie das melden (§ 27 WoGG). Wer Grundsicherungsgeld bezieht, ist vom Wohngeld ausgeschlossen. Lehnt das Jobcenter ab, sollte der Wohngeldantrag bis zum Ende des Folgemonats gestellt werden, damit er rückwirkend gilt.`;
  },
  faqs: (h) => [
    { q: 'Kann ich Wohngeld rückwirkend für die letzten Monate bekommen?', a: `In der Regel nicht. Der Bewilligungszeitraum beginnt mit dem Monat, in dem der Antrag bei der Wohngeldstelle eingeht. Eine Ausnahme gilt nach Ablehnung einer Leistung wie Grundsicherungsgeld: Stellen Sie den Wohngeldantrag bis zum Ende des Monats, der auf die Kenntnis der Ablehnung folgt, beginnt das Wohngeld ab dem Monat, für den die andere Leistung abgelehnt wurde (§ 25 Abs. 3 WoGG).` },
    { q: 'Was passiert, wenn ich Unterlagen für den Wohngeldantrag nicht rechtzeitig nachreiche?', a: 'Die Wohngeldstelle setzt Ihnen eine Frist. Reichen Sie die Nachweise nicht ein, kann sie den Antrag wegen fehlender Mitwirkung ablehnen. Holen Sie die Unterlagen später nach, kann die Behörde die Leistung nachträglich erbringen, muss es aber nicht. Wer eine Frist nicht halten kann, etwa weil der Arbeitgeber die Verdienstbescheinigung nicht ausstellt, sollte das kurz schriftlich mitteilen.' },
    { q: 'Wer unterschreibt den Wohngeldantrag in einem Paarhaushalt?', a: 'Den Antrag stellt eine Person für alle Haushaltsmitglieder. Die Wohngeldstelle vermutet, dass die übrigen Mitglieder diese Person als Antragstellerin bestimmt haben (§ 22 Abs. 2 WoGG). Alle Erwachsenen müssen aber Angaben zu ihrem Einkommen machen, und viele Formulare sehen eine Unterschrift der volljährigen Haushaltsmitglieder vor, damit deren Daten verwendet werden dürfen.' },
    { q: 'Muss ich nach einer Lohnerhöhung sofort die Wohngeldstelle informieren?', a: `Ja, wenn das Gesamteinkommen dadurch nicht nur vorübergehend um mehr als ${h.pc(h.P.wohngeld.amtswegenSchwelle)} steigt (§ 27 Abs. 3 WoGG). Die Wohngeldstelle entscheidet dann neu ab dem Monat der Erhöhung und fordert zu viel gezahltes Wohngeld zurück. Kleinere Erhöhungen müssen Sie nicht melden; sie ändern das Wohngeld bis zum Ende des Bewilligungszeitraums nicht.` },
    { q: 'Wird Wohngeld auf ein Konto oder an den Vermieter gezahlt?', a: `Grundsätzlich an die wohngeldberechtigte Person, monatlich im Voraus auf ein Konto (§ 26 WoGG). Mit ihrer schriftlichen Einwilligung oder, wenn es im Einzelfall geboten ist, auch ohne sie kann die Wohngeldstelle direkt an den Vermieter zahlen. Der Gesetzentwurf in der BT-Drucksache ${h.P.wohngeld.entwurf2027.drucksache} will die Zahlung künftig nur noch auf ein Konto zulassen; das ist am ${h.date(h.TODAY)} nicht beschlossen.` },
  ],
  body: (h) => {
    const W = h.P.wohngeld; const E = W.entwurf2027;
    return `
<h2>Wer zuständig ist</h2>
<p>Wohngeld ist eine Leistung, die Bund und Länder je zur Hälfte bezahlen, die aber vor Ort bewilligt wird. Zuständig ist die Wohngeldstelle der Stadt oder Gemeinde, in der die Wohnung liegt; in vielen ländlichen Gegenden ist es die Kreisverwaltung. Der Name der Behörde wechselt: Wohngeldbehörde, Amt für Wohnungswesen, Bürgeramt oder Sozialamt. Die Formulare stellt das jeweilige Land bereit, viele Länder und Städte bieten auch einen Online-Antrag an. Welche Stelle für Ihre Adresse zuständig ist, steht auf der Internetseite Ihrer Stadt oder Ihres Kreises.</p>
<p>Den Antrag stellt eine Person für den ganzen Haushalt, die wohngeldberechtigte Person. Das ist meist die Mieterin oder der Mieter laut Vertrag. Untermieter, die nicht zum Haushalt gehören, stellen einen eigenen Antrag für ihren Teil der Wohnung.</p>

<h2>Der richtige Zeitpunkt</h2>
<p>Weil der Bewilligungszeitraum mit dem Monat beginnt, in dem der Antrag eingeht, ist der Zeitpunkt das Wichtigste. Ein Antrag, der am letzten Tag eines Monats eingeht, bringt Wohngeld für diesen ganzen Monat. Ein Antrag, der einen Tag später eingeht, kostet einen Monatsbetrag. Stellen Sie den Antrag deshalb sofort, wenn sich Ihre Lage ändert: bei Geburt eines Kindes, Trennung, Umzug, Kurzarbeit, Renteneintritt oder einer Mieterhöhung. Fehlende Nachweise können Sie nachreichen; das Datum des Eingangs bleibt erhalten. Lassen Sie sich den Eingang bestätigen, etwa durch einen Stempel auf einer Kopie, ein Fax-Protokoll oder die Bestätigung des Online-Antrags. Im Streitfall müssen Sie nachweisen können, wann der Antrag bei der Behörde war; ein Brief, der verloren geht, hilft Ihnen nicht.</p>
<p>Einen Sonderfall regelt § 25 Abs. 3 WoGG: Wer zunächst Grundsicherungsgeld oder eine andere Leistung nach § 7 WoGG beantragt hat und abgelehnt wurde, kann Wohngeld ab dem Monat bekommen, für den die Ablehnung gilt. Voraussetzung ist, dass der Wohngeldantrag bis zum Ende des Monats eingeht, der auf die Kenntnis der Ablehnung folgt. Bekommen Sie den Ablehnungsbescheid des Jobcenters also im März, muss der Wohngeldantrag spätestens Ende April bei der Wohngeldstelle sein.</p>

<h2>Welche Unterlagen Sie brauchen</h2>
<ul>
<li><strong>Antragsformular</strong> mit den Angaben zu allen Haushaltsmitgliedern, unterschrieben.</li>
<li><strong>Mietvertrag</strong> und eine aktuelle <strong>Mietbescheinigung</strong> des Vermieters mit Grundmiete, kalten Nebenkosten und Heizkosten. Bei Eigentum Nachweise über Zinsen, Tilgung und Bewirtschaftungskosten.</li>
<li><strong>Einkommensnachweise</strong> aller Haushaltsmitglieder: Lohnabrechnungen der letzten Monate oder eine Verdienstbescheinigung des Arbeitgebers, Rentenbescheide, Bescheide über Arbeitslosengeld, Krankengeld, Elterngeld, Unterhalt oder Unterhaltsvorschuss.</li>
<li>bei Selbständigen den letzten Steuerbescheid und eine Prognose des Gewinns.</li>
<li>Nachweise für Freibeträge, etwa den Schwerbehindertenausweis oder den Bescheid über einen Pflegegrad.</li>
<li>Angaben zum Vermögen, wenn das Formular sie verlangt, und die Bankverbindung.</li>
</ul>
<p>Welche Nachweise im Einzelfall nötig sind, ergibt sich aus dem Formular Ihres Landes. Wer unsicher ist, reicht den Antrag mit dem ein, was vorliegt, und wartet die Nachforderung der Behörde ab.</p>

<h2>Bewilligungszeitraum und Weiterleistungsantrag</h2>
<p>Das Wohngeld wird für einen festen Zeitraum bewilligt, in der Regel ${W.bewilligungMonate} Monate. Bei Verhältnissen, die sich voraussichtlich nicht ändern, etwa bei einer festen Rente, kann die Wohngeldstelle bis zu ${W.bewilligungMax} Monate bewilligen; bei absehbaren Änderungen, etwa einem befristeten Arbeitsvertrag, auch kürzer (§ 25 Abs. 1 WoGG). Das Wohngeld läuft nicht automatisch weiter. Für die Zeit danach stellen Sie einen Weiterleistungsantrag. Er sollte vor Ablauf des Zeitraums eingehen, damit keine Lücke entsteht. Zu früh geht nicht: Ein Antrag, der eher als ${W.weiterAntragMonateVorher} Monate vor Ablauf eingeht, gilt als am Ersten des ${W.weiterAntragMonateVorher}. Monats vor Ablauf gestellt (§ 22 Abs. 4 WoGG). Am besten stellen Sie ihn also im vorletzten Monat des laufenden Zeitraums.</p>

<h2>Änderungen während des Bezugs</h2>
${h.table(['Änderung', 'Folge', 'Was Sie tun'], [
  [`Miete steigt um mehr als ${h.pc(W.neuAntragSchwelle)}`, 'höheres Wohngeld möglich, auch rückwirkend ab Beginn des Zeitraums', 'neuen Antrag stellen'],
  [`Einkommen sinkt um mehr als ${h.pc(W.neuAntragSchwelle)}`, 'höheres Wohngeld möglich', 'neuen Antrag stellen'],
  ['Haushalt wird größer, etwa durch Geburt', 'höheres Wohngeld möglich', 'neuen Antrag stellen'],
  [`Einkommen steigt um mehr als ${h.pc(W.amtswegenSchwelle)}`, 'Neuberechnung ab der Änderung, Rückforderung', 'unverzüglich melden'],
  [`Miete sinkt um mehr als ${h.pc(W.amtswegenSchwelle)}`, 'Neuberechnung ab der Änderung', 'unverzüglich melden'],
  ['Haushaltsmitglied zieht aus', 'Neuberechnung ab dem Tag nach dem Auszug', 'unverzüglich melden'],
], 'Änderungen im laufenden Bewilligungszeitraum nach § 27 WoGG.', ['l', 'l', 'l'])}
<p>Die Schwellen sind asymmetrisch: Zu Ihren Gunsten wirkt eine Änderung schon ab ${h.pc(W.neuAntragSchwelle)}, aber nur auf Antrag. Zu Ihren Lasten wirkt sie erst ab ${h.pc(W.amtswegenSchwelle)}, dann aber von Amts wegen, und Sie müssen sie melden. Wer eine Meldung versäumt, muss das zu viel gezahlte Wohngeld zurückzahlen; eine vorsätzlich oder leichtfertig unterlassene Mitteilung ist außerdem eine Ordnungswidrigkeit (§ 37 WoGG).</p>

<h2>Den Bescheid prüfen</h2>
<p>Der Bescheid nennt die Werte, mit denen gerechnet wurde. Prüfen Sie vor allem fünf Punkte: die Zahl der berücksichtigten Haushaltsmitglieder, die Mietstufe Ihrer Gemeinde, die berücksichtigte Miete im Vergleich zum Höchstbetrag, das angesetzte Jahreseinkommen jedes Mitglieds und die abgezogenen Freibeträge. Häufige Fehler sind ein vergessener Freibetrag für Alleinerziehende, ein zu hoch geschätzter Lohn, weil Überstunden eines einzelnen Monats hochgerechnet wurden, oder Unterhalt, der zwar zugesagt, aber nicht gezahlt wird. Stimmt etwas nicht, legen Sie Widerspruch ein und begründen ihn mit den richtigen Zahlen. Mit dem ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')} können Sie nachrechnen, ob das Ergebnis plausibel ist.</p>

<h2>Typische Fehler, die Geld kosten</h2>
<ul>
<li><strong>Abwarten:</strong> Wer erst alle Unterlagen sammelt, verliert die Monate bis zum Eingang. Der Antrag zählt ab Eingang, nicht ab Vollständigkeit.</li>
<li><strong>Weiterleistung vergessen:</strong> Endet der Bewilligungszeitraum ohne neuen Antrag, entsteht eine Lücke, die sich nicht nachholen lässt.</li>
<li><strong>Mieterhöhung nicht nutzen:</strong> Eine Erhöhung um mehr als ${h.pc(W.neuAntragSchwelle)} kann rückwirkend ab Beginn des Zeitraums zu mehr Wohngeld führen, aber nur mit Antrag bis zum Ende des Monats nach der Kenntnis.</li>
<li><strong>Kinderzuschlag nicht beantragen:</strong> Familien, die Wohngeld bekommen, erfüllen oft auch die Voraussetzungen für den Kinderzuschlag der Familienkasse. Beide Leistungen werden getrennt beantragt.</li>
</ul>

<h2>Wohngeld und Jobcenter</h2>
<p>Wohngeld und Grundsicherungsgeld schließen sich aus (§ 7 WoGG). Welche Leistung gilt, hängt davon ab, ob der Haushalt mit Wohngeld und gegebenenfalls Kinderzuschlag seinen Bedarf nach dem SGB II decken kann. Wenn ja, gehen diese Leistungen vor, und das Jobcenter darf auf sie verweisen (§ 12a SGB II). Wenn nein, zahlt das Jobcenter Grundsicherungsgeld und übernimmt die angemessenen Kosten für Unterkunft und Heizung. Unklare Fälle sind häufig; dann ist es sinnvoll, beide Anträge parallel zu stellen. Leistet das Jobcenter vorläufig und wird später Wohngeld bewilligt, rechnen die Behörden untereinander ab.</p>
<p>Ob Ihr Haushalt eher Wohngeld oder Grundsicherungsgeld bekommt, zeigt der ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')} mit seinem Vergleich. Die Regeln erklärt ${h.a('wohngeld-oder-grundsicherung', 'Wohngeld oder Grundsicherungsgeld')}. Familien sollten zugleich den Kinderzuschlag bei der Familienkasse beantragen; mehr unter ${h.a('kinderzuschlag', 'Kinderzuschlag')}.</p>

<h2>Bearbeitungszeit und was geplant ist</h2>
<p>Die Bearbeitung dauert vielerorts mehrere Wochen bis Monate. Die Bundesregierung schreibt in der Begründung ihres Gesetzentwurfs vom ${h.date(E.datum)} selbst, dass sich die Bearbeitungszeiten seit der Ausweitung des Wohngelds verlängert haben (${h.src('btd_21_8284', `BT-Drucksache ${E.drucksache}`)}). Der Entwurf will das Verfahren vereinfachen, etwa durch mehr Pauschalen bei der Einkommensermittlung, einfachere Nachweise für den Freibetrag bei Schwerbehinderung oder Pflegebedürftigkeit und die Zahlung nur noch auf ein Konto. Er ist am ${h.date(h.TODAY)} nicht beschlossen. Für Sie gilt bis dahin: Antrag früh stellen, Unterlagen vollständig nachreichen, Eingang bestätigen lassen.</p>
${h.box('Kein Rechtsrat', '<p>Diese Seite erklärt das Verfahren allgemein. Ob und wie viel Wohngeld Sie bekommen, entscheidet die Wohngeldstelle. Bei Ablehnung können Sie Widerspruch einlegen; die Frist steht im Bescheid. Unabhängige Beratung bieten Mietervereine und Sozialberatungsstellen.</p>')}
`;
  },
});
