import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'grundsicherung-antrag',
  group: 'grundsicherung',
  order: 19,
  slug: 'grundsicherung-antrag',
  nav: 'Antrag auf Grundsicherungsgeld',
  card: 'Wo, wann und mit welchen Unterlagen, Bewilligung, Weiterbewilligung und Widerspruch.',
  title: 'Grundsicherungsgeld Antrag 2026: Unterlagen, Fristen, Ablauf',
  description: 'Grundsicherungsgeld beantragen: formloser Antrag beim Jobcenter, Rückwirkung auf den Monatsersten, Unterlagen, Bewilligung, Weiterbewilligung, Widerspruch.',
  h1: 'Grundsicherungsgeld beantragen: Schritt für Schritt',
  intro: 'Der Antrag ist einfacher, als die Formulare aussehen. Wichtig ist vor allem, ihn rechtzeitig zu stellen. Diese Seite zeigt den Ablauf vom ersten Satz bis zum Bescheid.',
  mini: { kind: 'mini:regelsatz' },
  related: ['grundsicherungsgeld-rechner', 'schonvermoegen', 'grundsicherung-miete', 'vorrangpruefung', 'sanktionen', 'wohngeld-antrag'],
  sources: ['sgb2_37', 'sgb2_41', 'sgb2_15', 'sgb2_12a', 'sgb2_42', 'sgb2_65a'],
  resume: (h) => `Grundsicherungsgeld gibt es nur auf Antrag beim Jobcenter am Wohnort (§ 37 SGB II). Der Antrag wirkt auf den Ersten des Monats zurück, in dem er gestellt wird: Wer am 28. eines Monats einen formlosen Satz schreibt, erhält Leistungen ab dem 1. dieses Monats. Für Zeiten davor gibt es nichts. Der Antrag kann online über jobcenter.digital, schriftlich, telefonisch oder persönlich gestellt werden; das Jobcenter schickt danach den Hauptantrag und die Anlagen. Gebraucht werden Ausweis, Mietvertrag und Nachweise über Heizkosten, Lohnabrechnungen, Kontoauszüge, Nachweise über Vermögen, Kindergeld und Unterhalt. Bewilligt wird in der Regel für ${h.P.gsg.bewilligungMonate} Monate, bei unangemessener Miete oder vorläufiger Entscheidung für ${h.P.gsg.bewilligungKurzMonate}. Das Geld kommt monatlich im Voraus. Vor Ablauf des Zeitraums stellen Sie einen Weiterbewilligungsantrag. Gegen einen Bescheid können Sie innerhalb eines Monats Widerspruch einlegen. Seit dem ${h.date(h.P.reform.inkraft)} heißt die Leistung Grundsicherungsgeld; Formulare mit „Bürgergeld“ bleiben gültig.`,
  faqs: (h) => [
    { q: 'Reicht eine E-Mail an das Jobcenter als Antrag?', a: 'Ja. Für die Wirkung des Antrags genügt jede Erklärung, aus der hervorgeht, dass Sie Leistungen wollen, auch per E-Mail, Telefon oder über das Kontaktformular von jobcenter.digital. Bewahren Sie einen Nachweis auf, etwa die gesendete E-Mail oder eine Eingangsbestätigung. Die ausgefüllten Formulare und Unterlagen dürfen Sie innerhalb der gesetzten Frist nachreichen.' },
    { q: 'Was passiert, wenn ich die Unterlagen nicht vollständig einreiche?', a: 'Das Jobcenter fordert fehlende Nachweise mit Frist an. Reichen Sie sie nicht ein, kann es die Leistung wegen fehlender Mitwirkung ganz oder teilweise versagen (§ 66 SGB I). Holen Sie das nach, kann es die Leistung nachträglich erbringen. Können Sie einen Nachweis nicht beschaffen, sagen Sie das schriftlich mit Begründung, statt die Frist verstreichen zu lassen.' },
    { q: 'Muss ich zuerst Arbeitslosengeld beantragen?', a: 'Wenn Sie Anspruch auf Arbeitslosengeld haben, ja, weil es vorgeht. Reicht es nicht zum Leben, beantragen Sie zusätzlich Grundsicherungsgeld; beide Anträge können Sie zur selben Zeit stellen. Auch Wohngeld, Kinderzuschlag, Unterhaltsvorschuss und Renten gehen vor, Wohngeld und Kinderzuschlag aber nur, wenn sie den Bedarf decken.' },
    { q: 'Wann muss ich die Weiterbewilligung beantragen?', a: `Vor Ablauf des Bewilligungszeitraums, am besten einen Monat vorher. Das Jobcenter schickt meist eine Erinnerung. Ein verspäteter Antrag wirkt nur auf den Ersten des Monats zurück, in dem er eingeht; ein Monat ohne Antrag ist verloren. Für Bewilligungszeiträume ab dem ${h.date(h.P.reform.inkraft)} prüft das Jobcenter das Vermögen nach den neuen Freibeträgen.` },
  ],
  body: (h) => `
<h2>Der Ablauf in sieben Schritten</h2>
<ol>
<li><strong>Antrag stellen</strong>: formlos beim Jobcenter Ihres Wohnorts, online, schriftlich, telefonisch oder persönlich. Das Datum zählt.</li>
<li><strong>Formulare erhalten</strong>: Hauptantrag, Anlage zu Unterkunft und Heizung, Anlage Einkommen, Anlage Vermögen, Anlage Kinder, bei Bedarf weitere.</li>
<li><strong>Unterlagen einreichen</strong>: innerhalb der gesetzten Frist, am einfachsten als Upload in jobcenter.digital.</li>
<li><strong>Prüfung</strong>: das Jobcenter prüft Bedarf, Einkommen, Vermögen und vorrangige Leistungen; es kann Sie auffordern, Wohngeld, Kinderzuschlag oder Unterhaltsvorschuss zu beantragen.</li>
<li><strong>Bescheid</strong>: über die Leistungen für ${h.P.gsg.bewilligungMonate} Monate, vorläufig oft für ${h.P.gsg.bewilligungKurzMonate}.</li>
<li><strong>Erstgespräch</strong>: persönlich im Jobcenter für die Potenzialanalyse und den Kooperationsplan (§ 15 SGB II).</li>
<li><strong>Zahlung</strong>: monatlich im Voraus auf Ihr Konto.</li>
</ol>

<h2>Unterlagen-Checkliste</h2>
${h.table(['Thema', 'Nachweise'], [
  ['Person', 'Personalausweis oder Pass, Aufenthaltstitel, Meldebescheinigung, Steuer-ID, Krankenversicherung'],
  ['Wohnung', 'Mietvertrag, letzte Mieterhöhung, Nebenkostenabrechnung, Abschlag für Heizung und Warmwasser'],
  ['Einkommen', 'Lohnabrechnungen der letzten Monate, Arbeitsvertrag, Bescheide über Arbeitslosengeld, Rente, Elterngeld, Krankengeld'],
  ['Kinder', 'Geburtsurkunden, Kindergeldbescheid, Unterhaltstitel oder Nachweis über Unterhalt, Bescheid über Unterhaltsvorschuss'],
  ['Vermögen', 'Kontoauszüge der letzten drei Monate aller Konten, Sparverträge, Versicherungen mit Rückkaufswert, Fahrzeugschein'],
  ['Besonderes', 'Mutterpass bei Schwangerschaft, ärztliche Bescheinigungen für Mehrbedarfe, Nachweise über Schulden bei Miet- oder Energierückständen'],
], 'Was im Einzelfall verlangt wird, steht in der Aufforderung des Jobcenters.', ['l', 'l'])}
<p>Auf Kontoauszügen dürfen Sie bei Ausgaben den Empfänger schwärzen, wenn er besonders geschützte Daten verrät, etwa eine Partei, Gewerkschaft oder Religionsgemeinschaft; der Betrag muss lesbar bleiben. Einnahmen dürfen nicht geschwärzt werden.</p>

<h2>Wer zur Bedarfsgemeinschaft gehört</h2>
<p>Den Antrag stellt eine erwerbsfähige Person für alle Mitglieder der Bedarfsgemeinschaft: Partnerin oder Partner, auch ohne Trauschein in einer Verantwortungs- und Einstehensgemeinschaft, und die unverheirateten Kinder unter 25 im Haushalt, solange sie ihren Bedarf nicht selbst decken. Wer mit Eltern, Geschwistern oder Freunden zusammenwohnt, ohne Partner zu sein, bildet eine eigene Bedarfsgemeinschaft; geteilt wird nur die Miete. Erwachsene unter 25, die bei den Eltern wohnen, gehören zur Bedarfsgemeinschaft der Eltern und erhalten den Regelbedarf der Stufe 3 von ${h.m(h.P.regelbedarf.rbs3)}.</p>

<h2>Bewilligung, Änderungen, Weiterbewilligung</h2>
<p>Der Bescheid gilt für den Bewilligungszeitraum, in der Regel ${h.P.gsg.bewilligungMonate} Monate (§ 41 SGB II). Bei schwankendem Einkommen oder ungeklärten Fragen entscheidet das Jobcenter vorläufig und rechnet am Ende ab. Jede Änderung müssen Sie sofort mitteilen: neuer Job, Lohnerhöhung, Umzug, Geburt, Auszug, Erbschaft, Krankenhausaufenthalt. Zu viel gezahlte Leistungen fordert das Jobcenter zurück. Vor Ablauf des Zeitraums stellen Sie einen Weiterbewilligungsantrag; das Formular ist kürzer als der Erstantrag.</p>
<p>Laufende Bescheide aus der Zeit des Bürgergeldes behalten ihre Gültigkeit. Für sie gilt bis zum Ende des Zeitraums die alte Vermögensregel (§ 65a SGB II); erst mit der Weiterbewilligung gelten die Freibeträge nach Alter (${h.a('schonvermoegen', 'Schonvermögen')}).</p>

<h2>Widerspruch und Überprüfungsantrag</h2>
<p>Gegen jeden Bescheid können Sie innerhalb eines Monats nach Bekanntgabe Widerspruch einlegen, schriftlich oder zur Niederschrift beim Jobcenter. Eine Begründung können Sie nachreichen. Ist die Frist abgelaufen, hilft ein Überprüfungsantrag nach § 44 SGB X: Das Jobcenter muss einen falschen Bescheid zurücknehmen und zu wenig gezahlte Leistungen nachzahlen, im Grundsicherungsgeld in der Regel für das laufende und das vorangegangene Jahr. Widerspruch und Klage beim Sozialgericht kosten keine Gerichtsgebühren.</p>
${h.box('Vor dem Antrag rechnen', `<p>Prüfen Sie vorher, ob Wohngeld und Kinderzuschlag den Bedarf decken. Dann ist das Jobcenter nicht zuständig, und Sie sparen sich den Weg. Der ${h.a('home', 'Vergleich aller Leistungen')} zeigt das in einer Rechnung.</p>`, 'tip')}

<h2>Notfall: kein Geld bis zum Bescheid</h2>
<p>Wenn Sie bis zur Entscheidung kein Geld zum Leben haben, sagen Sie das bei der Antragstellung. Das Jobcenter kann einen Vorschuss zahlen oder eine Barauszahlung veranlassen. Ist die Wohnung durch Mietschulden bedroht, kann es Schulden übernehmen, meist als Darlehen. Bei einem laufenden Bezug kann es auf Antrag bis zu ${h.m(h.P.gsg.vorschussMax)} des nächsten Monats vorzeitig zahlen (§ 42 Abs. 2 SGB II).</p>

<h2>Das Erstgespräch und der Kooperationsplan</h2>
<p>Nach dem Antrag lädt das Jobcenter erwerbsfähige Personen zu einem ersten Gespräch ein, das in der Regel persönlich stattfindet (§ 15 Abs. 4 SGB II). Darin erstellt es eine Potenzialanalyse: berufliche Fähigkeiten, Stärken, Hindernisse wie Kinderbetreuung, Pflege oder Gesundheit. Daraus entsteht der Kooperationsplan, den Sie in Textform erhalten. Er hält das Ziel fest, etwa eine Stelle in einem bestimmten Bereich, die Eigenbemühungen, die Sie mindestens unternehmen sollen, und die Leistungen, die das Jobcenter anbietet. Der Plan wird spätestens alle sechs Monate überprüft. Bringen Sie zum Gespräch Lebenslauf, Zeugnisse und Nachweise über Einschränkungen mit.</p>

<h2>Kranken- und Pflegeversicherung</h2>
<p>Wer Grundsicherungsgeld bezieht, ist in der Regel über das Jobcenter gesetzlich kranken- und pflegeversichert; das Jobcenter zahlt die Beiträge. Familienangehörige ohne eigenes Einkommen sind meist familienversichert. Privat Versicherte bleiben in ihrer Versicherung, das Jobcenter übernimmt einen Zuschuss bis zur Höhe des halben Basistarifs. Geben Sie im Antrag Ihre Krankenkasse an; bei einem Wechsel melden Sie das Jobcenter dort als Zahlstelle.</p>

<h2>Welches Jobcenter zuständig ist</h2>
<p>Zuständig ist das Jobcenter, in dessen Bezirk Sie Ihren gewöhnlichen Aufenthalt haben. Ziehen Sie um, wechselt die Zuständigkeit mit dem Umzug; stellen Sie beim neuen Jobcenter einen Antrag und teilen Sie dem alten den Umzug mit. Für Umzugskosten ist das alte Jobcenter zuständig, für die Kaution das neue. Wohnungslose Menschen stellen den Antrag beim Jobcenter des Ortes, an dem sie sich tatsächlich aufhalten.</p>

<h2>Online oder vor Ort</h2>
<p>Über jobcenter.digital können Sie den Antrag stellen, Unterlagen hochladen, Veränderungen mitteilen und Bescheide abrufen. Das spart Wege und dokumentiert den Eingang. Wer lieber persönlich kommt, kann den Antrag im Eingangsbereich abgeben und sich den Eingang auf einer Kopie bestätigen lassen. Für Gespräche können Sie eine Begleitperson als Beistand mitbringen. Wer wenig Deutsch spricht, sollte bei der Einladung nach Sprachmittlung fragen.</p>

<h2>Besondere Gruppen</h2>
<p><strong>Studierende und Auszubildende</strong> mit einer dem Grunde nach förderfähigen Ausbildung sind vom Grundsicherungsgeld in der Regel ausgeschlossen, weil BAföG oder Berufsausbildungsbeihilfe vorgehen. Ausnahmen gibt es etwa für Auszubildende, die bei den Eltern wohnen, und für Mehrbedarfe. <strong>Menschen über der Altersgrenze</strong> der Rente beantragen Grundsicherung im Alter beim Sozialamt. <strong>Nicht erwerbsfähige Menschen</strong>, die mit einer erwerbsfähigen Person zusammenleben, erhalten als Teil der Bedarfsgemeinschaft Leistungen vom Jobcenter; leben sie allein, ist das Sozialamt zuständig. <strong>Ausländische Staatsangehörige</strong> haben je nach Aufenthaltsstatus Anspruch; in den ersten drei Monaten eines Aufenthalts und bei einem Aufenthalt nur zur Arbeitssuche gibt es Ausschlüsse.</p>

<h2>Häufige Fehler beim Antrag</h2>
<ul>
<li>Zu spät stellen, weil die Unterlagen noch fehlen. Das Datum des formlosen Antrags zählt, die Unterlagen kommen danach.</li>
<li>Den Partner nicht angeben, weil man nicht verheiratet ist. Lebt eine Verantwortungs- und Einstehensgemeinschaft, gehört er dazu; Verschweigen führt zu Rückforderungen.</li>
<li>Wohngeld und Kinderzuschlag vergessen. Das Jobcenter fordert Sie ohnehin auf, sie zu beantragen, wenn sie den Bedarf decken könnten.</li>
<li>Änderungen nicht melden. Ein neuer Job oder eine Lohnerhöhung muss sofort mitgeteilt werden.</li>
<li>Den Weiterbewilligungsantrag vergessen. Ohne ihn endet die Zahlung mit dem Bewilligungszeitraum.</li>
</ul>

<h2>Nach dem Bescheid: Geld prüfen</h2>
<p>Vergleichen Sie die erste Zahlung mit dem Bescheid. Regelbedarfe, Mehrbedarfe und Kosten der Unterkunft stehen dort einzeln. Weicht die Zahlung ab, etwa weil eine Aufrechnung läuft oder die Miete direkt an den Vermieter geht, steht das im Bescheid. Bewahren Sie Bescheide und Kontoauszüge mindestens bis zum Ende des folgenden Jahres auf; bei einer abschließenden Entscheidung nach einem vorläufigen Bescheid brauchen Sie die Nachweise noch.</p>
<h2>Wenn Unterlagen fehlen</h2>
<p>Fehlen Nachweise, fordert das Jobcenter sie schriftlich mit einer Frist an. Erst wenn es dabei auf die Folgen hingewiesen hat und die Frist ungenutzt verstreicht, darf es die Leistung wegen fehlender Mitwirkung versagen (§ 66 SGB I). Reichen Sie die Unterlagen später nach, prüft es den Antrag erneut. Können Sie ein Dokument nicht rechtzeitig beschaffen, etwa weil die Bank den Kontoauszug noch nicht geschickt hat, schreiben Sie das vor Fristende mit Begründung und behalten eine Kopie des Schreibens.</p>
`,
});
