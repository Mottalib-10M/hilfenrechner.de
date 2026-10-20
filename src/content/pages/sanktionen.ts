import { definePage } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const PROZ = Math.round(P.sanktion.pflichtverletzung.satz * 100);
const MON = ['null', 'einen', 'zwei', 'drei', 'vier', 'fünf', 'sechs'][P.sanktion.pflichtverletzung.monate];

export default definePage({
  id: 'sanktionen',
  group: 'grundsicherung',
  order: 16,
  slug: 'sanktionen',
  nav: 'Minderungen und Sanktionen',
  card: 'Wann das Jobcenter kürzt, um wie viel, wie lange, und was Miete und Kinder schützt.',
  title: `Sanktionen Grundsicherungsgeld 2026: Minderung um ${PROZ} Prozent`,
  description: `Sanktionen im Grundsicherungsgeld seit Juli 2026: Minderung um ${PROZ} Prozent für ${MON} Monate, Meldeversäumnis, Wegfall bei abgelehnter Arbeit, Nichterreichbarkeit.`,
  h1: 'Minderungen: was das Jobcenter seit Juli 2026 kürzen darf',
  intro: 'Das Gesetz vom April 2026 hat die Minderungen neu geordnet. Diese Seite zeigt jede Stufe mit Betrag, Dauer und den Grenzen, die das Gesetz zieht.',
  mini: { kind: 'mini:sanktion' },
  related: ['neue-grundsicherung', 'grundsicherung-antrag', 'buergergeld-rechner', 'grundsicherung-miete', 'vorrangpruefung'],
  sources: ['sgb2_31', 'sgb2_31a', 'sgb2_31b', 'sgb2_32', 'sgb2_7b', 'sgb2_65a', 'bgbl_2026_107'],
  resume: (h) => {
    const S = h.P.sanktion; const R = h.P.regelbedarf;
    return `Seit dem ${h.date(h.P.reform.inkraft)} mindert das Jobcenter das Grundsicherungsgeld bei einer Pflichtverletzung um ${h.pc(S.pflichtverletzung.satz)} des Regelbedarfs für ${S.pflichtverletzung.monate} Monate (§ 31a, § 31b SGB II); bei einer alleinstehenden Person sind das ${h.m2(R.rbs1 * S.pflichtverletzung.satz)} im Monat. Pflichtverletzungen sind etwa fehlende Eigenbemühungen, eine abgelehnte zumutbare Arbeit oder ein abgebrochener Kurs ohne wichtigen Grund. Wer wiederholt Meldetermine versäumt, verliert jeweils ${h.pc(S.meldeversaeumnis.satz)} für ${S.meldeversaeumnis.monate} Monat (§ 32). Nach ${S.nichtErreichbarTermine} aufeinanderfolgenden versäumten Terminen gilt man als nicht erreichbar, der Anspruch entfällt, bis man sich persönlich meldet (§ 7b Abs. 4). Wer eine zumutbare, sofort mögliche Arbeit willentlich nicht aufnimmt, verliert den Regelbedarf ganz (§ 31a Abs. 7). Miete und Heizung werden durch eine Minderung nie gekürzt. Mehrere Minderungen zusammen sind auf ${h.pc(S.hoechstSatz)} begrenzt, außer beim Wegfall nach abgelehnter Arbeit. Für Verstöße vor dem ${h.date(h.P.reform.inkraft)} gilt das alte Recht.`;
  },
  faqs: (h) => [
    { q: 'Kann das Jobcenter die Miete kürzen, wenn ich einen Termin verpasse?', a: 'Nein. § 31a Abs. 4 SGB II verbietet ausdrücklich, dass eine Minderung die Zahlbeträge für Unterkunft und Heizung verringert. Gekürzt wird nur der Regelbedarf. Auch beim vollständigen Wegfall des Regelbedarfs nach einer abgelehnten Arbeit zahlt das Jobcenter die Miete weiter, dann aber direkt an den Vermieter.' },
    { q: 'Wie werde ich eine Minderung wieder los?', a: `Bei einer Pflichtverletzung hebt das Jobcenter die Minderung auf, sobald Sie die Pflicht erfüllen oder sich ernsthaft und nachhaltig dazu bereit erklären, frühestens nach einem Monat. Beim Wegfall wegen abgelehnter Arbeit endet die Minderung nach einem Monat, wenn die Stelle nicht mehr frei ist, spätestens nach ${h.P.sanktion.arbeitVerweigert.hoechstMonate} Monaten.` },
    { q: 'Gibt es Ausnahmen bei psychischen Erkrankungen?', a: 'Ja, mehrere. Das Jobcenter soll Sie persönlich anhören, bevor es eine Minderung feststellt, wenn ihm psychische Erkrankungen bekannt sind oder Anhaltspunkte dafür vorliegen. Bei einem ersten Meldeversäumnis mit solchen Anhaltspunkten kann es eine ärztliche oder psychologische Untersuchung anordnen. Und eine Minderung unterbleibt ganz, wenn sie eine außergewöhnliche Härte wäre.' },
    { q: 'Was bekommen meine Kinder, wenn ich sanktioniert werde?', a: 'Die Minderung trifft nur die Person, die ihre Pflicht verletzt hat, und nur deren Regelbedarf. Die Regelbedarfe der Kinder, ihr Sofortzuschlag und ihr Anteil an der Miete bleiben unverändert. Bei jungen Menschen unter 25 soll das Jobcenter innerhalb von vier Wochen nach der Minderung ein Beratungsgespräch anbieten.' },
  ],
  body: (h) => {
    const S = h.P.sanktion; const R = h.P.regelbedarf;
    const z = (rb: number, s: number) => h.m2(rb * s);
    return `
<h2>Alle Rechtsfolgen auf einen Blick</h2>
${h.table(['Anlass', 'Minderung', 'Dauer', 'Allein (Stufe 1)', 'Partner (Stufe 2)'], [
  ['Pflichtverletzung (§ 31)', `${h.pc(S.pflichtverletzung.satz)} des Regelbedarfs`, `${S.pflichtverletzung.monate} Monate`, z(R.rbs1, S.pflichtverletzung.satz), z(R.rbs2, S.pflichtverletzung.satz)],
  ['Wiederholtes Meldeversäumnis (§ 32)', `${h.pc(S.meldeversaeumnis.satz)} des Regelbedarfs`, `${S.meldeversaeumnis.monate} Monat`, z(R.rbs1, S.meldeversaeumnis.satz), z(R.rbs2, S.meldeversaeumnis.satz)],
  [`${S.nichtErreichbarTermine} Meldetermine in Folge versäumt (§ 7b Abs. 4)`, 'Regelbedarf entfällt einen Monat, dann der ganze Anspruch', 'bis zur persönlichen Meldung', h.m(R.rbs1), h.m(R.rbs2)],
  ['Zumutbare Arbeit willentlich nicht aufgenommen (§ 31a Abs. 7)', 'Regelbedarf entfällt', `${S.arbeitVerweigert.mindestMonate} bis ${S.arbeitVerweigert.hoechstMonate} Monate`, h.m(R.rbs1), h.m(R.rbs2)],
], 'Beträge je Monat; Miete und Heizung bleiben unberührt. Wenn rechnerisch nichts mehr bliebe, werden 1 € Grundsicherungsgeld bewilligt, damit Kranken- und Pflegeversicherung weiterlaufen.', ['l', 'l', 'l', 'r', 'r'])}

<h2>Pflichtverletzungen: was zählt</h2>
<p>§ 31 SGB II nennt die Fälle. Eine Pflicht verletzt, wer trotz schriftlicher Belehrung über die Rechtsfolgen</p>
<ul>
<li>die geforderten Eigenbemühungen nicht nachweist, etwa die vereinbarten Bewerbungen,</li>
<li>sich weigert, eine zumutbare Arbeit, Ausbildung oder geförderte Beschäftigung aufzunehmen oder fortzuführen, oder ihre Anbahnung durch sein Verhalten verhindert,</li>
<li>eine zumutbare Maßnahme, einen Integrationskurs oder einen Berufssprachkurs nicht antritt oder abbricht.</li>
</ul>
<p>Als Pflichtverletzung gilt außerdem, wer nach dem 18. Geburtstag Einkommen oder Vermögen absichtlich vermindert, um Leistungen zu bekommen, wer trotz Belehrung unwirtschaftlich weiter wirtschaftet oder wer eine Sperrzeit beim Arbeitslosengeld ausgelöst hat. In allen Fällen gilt: Wer einen wichtigen Grund darlegt und nachweist, wird nicht sanktioniert. Wichtige Gründe sind etwa Krankheit mit Attest, fehlende Kinderbetreuung, die Pflege eines Angehörigen oder eine Arbeit, die gegen Arbeitsschutz oder Mindestlohn verstößt.</p>

<h2>Meldeversäumnisse und Nichterreichbarkeit</h2>
<p>Die Reform unterscheidet zwei Stufen. Wer einer Einladung zum Jobcenter oder zu einer ärztlichen oder psychologischen Untersuchung wiederholt ohne wichtigen Grund nicht folgt, erhält jeweils eine Minderung von ${h.pc(S.meldeversaeumnis.satz)} für einen Monat. Wer ${S.nichtErreichbarTermine} Meldeaufforderungen hintereinander ignoriert, gilt als nicht erreichbar (§ 7b Abs. 4 SGB II). Dann entfällt der Leistungsanspruch ab dem Monat nach der Feststellung des dritten Versäumnisses: im ersten Monat wird nur noch die Miete gezahlt, danach nichts mehr. Wer sich innerhalb dieses Monats persönlich im Jobcenter meldet, gilt als durchgehend erreichbar und bekommt den Regelbedarf in geminderter Höhe nach. Die Nichterreichbarkeit endet spätestens mit dem ursprünglichen Bewilligungszeitraum oder früher durch persönliche Meldung.</p>
${h.box('Wichtig', '<p>Eine Einladung, die nicht ankommt, ist kein Versäumnis. Wer umzieht, verreist oder ins Krankenhaus muss, teilt das dem Jobcenter vorher mit. Abwesenheiten außerhalb des näheren Bereichs brauchen eine Zustimmung, außer für eine Arbeit; ohne wichtigen Grund gibt es sie in der Regel für bis zu drei Wochen im Jahr.</p>', 'warning')}

<h2>Wegfall des Regelbedarfs bei abgelehnter Arbeit</h2>
<p>Die schärfste Rechtsfolge gilt schon seit dem ${h.date(h.P.reform.inkraftSanktionArbeit)}, dem Tag nach der Verkündung. Nimmt eine erwerbsfähige Person eine zumutbare Arbeit nicht auf, die tatsächlich und unmittelbar möglich ist, und verweigert sie das willentlich, entfällt der Regelbedarf vollständig (§ 31a Abs. 7). Die Miete zahlt das Jobcenter für die ganze Bedarfsgemeinschaft dann an den Vermieter. Der Wegfall wird nach einem Monat aufgehoben, wenn die Stelle nicht mehr besetzt werden kann, spätestens nach ${S.arbeitVerweigert.hoechstMonate} Monaten. Eine Härteprüfung und die persönliche Anhörung gelten auch hier.</p>

<h2>Ablauf: Anhörung, Bescheid, Beginn</h2>
<ol>
<li>Das Jobcenter schickt eine Anhörung und fragt nach dem Grund. Auf Wunsch findet sie persönlich statt; bei bekannten psychischen Erkrankungen und vor der Prüfung eines dritten Meldeversäumnisses soll sie persönlich stattfinden.</li>
<li>Es stellt die Minderung durch Bescheid fest, und zwar innerhalb von ${S.fristFeststellungMonate} Monaten nach der Pflichtverletzung (§ 31b Abs. 1).</li>
<li>Die Minderung beginnt mit dem Monat nach dem Bescheid.</li>
<li>Gegen den Bescheid können Sie innerhalb eines Monats Widerspruch einlegen. Der Widerspruch hat keine aufschiebende Wirkung; in dringenden Fällen hilft ein Eilantrag beim Sozialgericht.</li>
</ol>

<h2>Grenzen, die das Gesetz zieht</h2>
<ul>
<li>Mehrere Minderungen aus Pflichtverletzungen und Meldeversäumnissen zusammen höchstens ${h.pc(S.hoechstSatz)} des Regelbedarfs (§ 31a Abs. 4), außer beim Wegfall nach abgelehnter Arbeit.</li>
<li>Keine Minderung bei außergewöhnlicher Härte (§ 31a Abs. 3).</li>
<li>Unterkunft und Heizung werden nie gemindert.</li>
<li>Bleibt rechnerisch kein Anspruch, wird 1 € im Monat bewilligt, damit die Versicherung über das Jobcenter bestehen bleibt.</li>
<li>Während einer Minderung gibt es keine ergänzende Hilfe zum Lebensunterhalt vom Sozialamt.</li>
</ul>

<h2>Altes und neues Recht</h2>
<p>Für Pflichtverletzungen und Meldeversäumnisse vor dem ${h.date(h.P.reform.inkraft)} gelten die Rechtsfolgen in der alten Fassung, also die gestaffelten Minderungen des Bürgergeldes (${h.src('sgb2_65a', '§ 65a Abs. 2 SGB II')}). Eigenbemühungen, über deren Folgen Sie nach altem Recht belehrt wurden, werden ebenfalls nach altem Recht beurteilt. Wer im Herbst 2026 einen Bescheid erhält, sollte deshalb auf das Datum des Verstoßes schauen.</p>

<h2>Was zumutbar ist</h2>
<p>Ob eine Ablehnung eine Pflichtverletzung ist, hängt davon ab, ob die Arbeit zumutbar war. § 10 SGB II ist streng: Grundsätzlich ist jede Arbeit zumutbar. Ausnahmen gelten, wenn Sie körperlich, geistig oder seelisch dazu nicht in der Lage sind, wenn die Arbeit die Erziehung eines Kindes gefährden würde, wenn sie mit der Pflege eines Angehörigen nicht vereinbar ist und die Pflege nicht anders sichergestellt werden kann, oder wenn ein sonstiger wichtiger Grund entgegensteht. Die Erziehung eines Kindes ab dem vollendeten ${h.P.gsg.kinderbetreuungAbLebensmonat}. Lebensmonat gilt in der Regel nicht als gefährdet, wenn die Betreuung gesichert ist. Nicht unzumutbar ist eine Arbeit nur deshalb, weil sie schlechter bezahlt ist als früher, nicht dem erlernten Beruf entspricht oder weiter entfernt liegt.</p>

<h2>Eine Familie im Beispiel</h2>
<p>Ein Paar mit zwei Kindern erhält Grundsicherungsgeld. Der Vater versäumt ohne Grund den vereinbarten Nachweis von Bewerbungen. Gemindert wird nur sein Regelbedarf der Stufe 2: ${h.pc(S.pflichtverletzung.satz)} von ${h.m(R.rbs2)} sind ${h.m2(R.rbs2 * S.pflichtverletzung.satz)} im Monat, für ${S.pflichtverletzung.monate} Monate zusammen ${h.m2(R.rbs2 * S.pflichtverletzung.satz * S.pflichtverletzung.monate)}. Der Regelbedarf der Mutter, die Regelbedarfe und Sofortzuschläge der Kinder und die Miete bleiben gleich. Holt der Vater die Bewerbungen nach oder erklärt er sich ernsthaft dazu bereit, wird die Minderung nach dem ersten Monat aufgehoben.</p>

<h2>Was in eine Antwort auf die Anhörung gehört</h2>
<ul>
<li>Den Grund, warum Sie den Termin, die Bewerbung oder die Maßnahme nicht wahrgenommen haben, mit Datum.</li>
<li>Nachweise: Arbeitsunfähigkeitsbescheinigung, Bestätigung der Kita, Nachweis einer Pflege, Schreiben eines Arbeitgebers.</li>
<li>Hinweise auf gesundheitliche, insbesondere psychische Einschränkungen, wenn sie eine Rolle spielen; Sie können eine persönliche Anhörung verlangen.</li>
<li>Ihre Bereitschaft, die Pflicht künftig zu erfüllen. Das verkürzt eine Minderung auf einen Monat.</li>
</ul>
<p>Antworten Sie innerhalb der Frist, auch wenn Sie noch nicht alle Unterlagen haben. Fehlende Nachweise können Sie nachreichen. Eine Sozialberatung oder ein Anwalt für Sozialrecht kann helfen; mit einem Beratungsschein vom Amtsgericht kostet die anwaltliche Beratung höchstens eine kleine Gebühr.</p>

<h2>Minderung und Kranken- und Pflegeversicherung</h2>
<p>Solange ein Anspruch auf Grundsicherungsgeld besteht, bleiben Sie über das Jobcenter kranken- und pflegeversichert. Damit das auch bei einer Minderung so bleibt, bewilligt das Jobcenter mindestens ${h.m(1)} im Monat, wenn rechnerisch nichts übrig bliebe (§ 31a Abs. 4 Satz 3). Anders ist es bei Nichterreichbarkeit: Entfällt der ganze Anspruch, endet auch die Versicherung über das Jobcenter, und Sie müssen sich selbst um den Schutz kümmern. Ein Grund mehr, sich nach drei verpassten Terminen sofort persönlich zu melden.</p>

<h2>Leistungen zur Eingliederung statt Druck</h2>
<p>Das Gesetz kennt neben den Minderungen auch Unterstützung: Weiterbildung, Coaching, Einstiegsgeld für eine Arbeitsaufnahme, Lohnkostenzuschüsse für Arbeitgeber und Hilfen bei Schulden, Sucht oder psychischen Problemen. Wer Hindernisse hat, sollte sie im Gespräch offen ansprechen; sie gehören in den Kooperationsplan und schützen vor Pflichten, die Sie nicht erfüllen können.</p>

<p>Und noch ein Hinweis: Eine Minderung ist kein Grund, den Kontakt zum Jobcenter abzubrechen. Wer reagiert, Nachweise schickt und Termine wahrnimmt, beendet die Minderung oft nach dem ersten Monat.</p>
<p>Wichtig für die Planung: Die Minderung trifft den Regelbedarf, nicht die Miete. Das Jobcenter zahlt die Kosten für Unterkunft und Heizung weiter; entfällt der Regelbedarf ganz, weil eine zumutbare Arbeit verweigert wurde, überweist es die Miete direkt an den Vermieter. Kinder in der Bedarfsgemeinschaft behalten ihren eigenen Regelbedarf. Lesen Sie den Bescheid genau: Er muss Grund, Höhe und Zeitraum der Minderung nennen.</p>
`;
  },
});
