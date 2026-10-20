import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'unterhaltsvorschuss',
  group: 'kinder',
  order: 44,
  slug: 'unterhaltsvorschuss',
  nav: 'Unterhaltsvorschuss',
  card: 'Unterhaltsvorschuss 2026: Beträge nach Alter, Voraussetzungen, Regeln ab 12 Jahren und Anrechnung auf andere Leistungen.',
  title: 'Unterhaltsvorschuss 2026: Beträge, Voraussetzungen, Antrag',
  description: 'Unterhaltsvorschuss 2026: 227 €, 299 € oder 394 € je nach Alter, Voraussetzungen, Regeln für Kinder ab 12, Antrag beim Jugendamt und Anrechnung auf Leistungen.',
  h1: 'Unterhaltsvorschuss: Beträge und Regeln 2026',
  intro: 'Zahlt der andere Elternteil keinen oder zu wenig Unterhalt, springt der Staat ein. Die Höhe hängt vom Alter des Kindes ab.',
  mini: { kind: 'mini:uvg' },
  related: ['alleinerziehend-leistungen', 'kinderzuschlag', 'kindergeld-2026', 'mehrbedarf', 'wohngeld-oder-grundsicherung'],
  sources: ['uvg_1', 'uvg_2', 'uvg_4', 'uvg_7', 'bgbl_2024_359', 'uvg_9'],
  resume: (h) => {
    const U = h.P.uvg; const A = U.altersgrenzen;
    return `Den Unterhaltsvorschuss nach dem Unterhaltsvorschussgesetz (UVG) bekommen Kinder, die bei einem alleinerziehenden Elternteil leben und vom anderen Elternteil keinen oder nicht regelmäßig Unterhalt in Höhe des Vorschusses erhalten. Seit dem ${h.date(U.from)} beträgt er ${h.m(U.betraege[0])} im Monat für Kinder unter ${A[0]} Jahren, ${h.m(U.betraege[1])} von ${A[0]} bis ${A[1] - 1} Jahren und ${h.m(U.betraege[2])} von ${A[1]} bis ${A[2] - 1} Jahren. Das ist der gesetzliche Mindestunterhalt der Altersstufe (${h.m(U.mindestunterhalt[0])}, ${h.m(U.mindestunterhalt[1])}, ${h.m(U.mindestunterhalt[2])}) minus das volle Kindergeld von ${h.m(h.P.kindergeld.betrag)}; die Beträge haben wir selbst nach § 2 UVG berechnet. Zahlt der andere Elternteil einen Teil, wird dieser abgezogen. Für Kinder ab ${A[1]} Jahren gilt eine Zusatzbedingung: Das Kind bezieht kein Grundsicherungsgeld oder wird durch den Vorschuss davon unabhängig, oder der Elternteil verdient mindestens ${h.m(U.mindesteinkommen12)} brutto. Eine Höchstdauer gibt es nicht mehr; gezahlt wird bis zum ${A[2]}. Geburtstag. Den Antrag stellen Sie schriftlich beim Jugendamt, rückwirkend gilt er höchstens für ${U.rueckwirkendMonate} Monat.`;
  },
  faqs: (h) => [
    { q: 'Bekomme ich Unterhaltsvorschuss, wenn ich mit einem neuen Partner zusammenlebe?', a: 'Ja, solange Sie nicht mit dem neuen Partner verheiratet sind. Das Gesetz verlangt, dass der Elternteil, bei dem das Kind lebt, ledig, verwitwet, geschieden oder dauernd getrennt ist. Eine Lebensgemeinschaft ohne Trauschein ändert daran nichts. Heiraten Sie, endet der Anspruch. Leben Sie wieder mit dem anderen Elternteil des Kindes zusammen, entfällt er ebenfalls.' },
    { q: 'Muss der andere Elternteil den Unterhaltsvorschuss zurückzahlen?', a: 'Ja, soweit er leistungsfähig ist. Der Unterhaltsanspruch des Kindes geht in Höhe des gezahlten Vorschusses auf das Land über, das ihn beim anderen Elternteil einfordert, notfalls gerichtlich. Dafür darf die Unterhaltsvorschussstelle Auskünfte beim Arbeitgeber, bei Versicherungen und beim Finanzamt einholen.' },
    { q: 'Wird der Unterhaltsvorschuss beim Grundsicherungsgeld angerechnet?', a: 'Ja, in voller Höhe als Einkommen des Kindes. Er mindert also den Bedarf des Kindes im Grundsicherungsgeld, und das Jobcenter zahlt entsprechend weniger. Das Jobcenter verlangt deshalb, dass Sie den Vorschuss beantragen. Beim Kinderzuschlag mindert er den Zuschlag des Kindes zu einem Teil, beim Wohngeld zählt er zum Haushaltseinkommen.' },
    { q: 'Was muss ich der Unterhaltsvorschussstelle melden?', a: 'Alle Änderungen, die für die Leistung wichtig sind, und zwar unverzüglich: wenn der andere Elternteil Unterhalt zahlt, wenn Sie heiraten oder mit dem anderen Elternteil zusammenziehen, wenn das Kind auszieht oder Sie umziehen. Wer Änderungen nicht meldet oder falsche Angaben macht, muss zu Unrecht gezahlten Vorschuss zurückzahlen.' },
  ],
  body: (h) => {
    const U = h.P.uvg; const A = U.altersgrenzen; const kg = h.P.kindergeld.betrag;
    const stufen = [`unter ${A[0]} Jahre`, `${A[0]} bis ${A[1] - 1} Jahre`, `${A[1]} bis ${A[2] - 1} Jahre`].map((t, i) => [t, h.m(U.mindestunterhalt[i]), h.m(kg), h.m(U.betraege[i])]);
    const teil = [0, 100, 200, 300].map((u) => { const r = h.UV.unterhaltsvorschuss({ alter: 8, unterhalt: u }); return [h.m(u), h.m(r.betrag), h.m(u + r.betrag)]; });
    const v400 = h.VG.vergleich({ paar: false, brutto: [400], kinder: [13], unterhalt: 0, miete: 520, heizung: 80, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
    const v700 = h.VG.vergleich({ paar: false, brutto: [700], kinder: [13], unterhalt: 0, miete: 520, heizung: 80, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
    const v5 = h.VG.vergleich({ paar: false, brutto: [1500], kinder: [5], unterhalt: 0, miete: 520, heizung: 80, mietstufe: 3, elterngeld: 0, sonstiges: 0 });
    const kgNeu = h.P.kindergeld.next.betrag2027;
    return `
<h2>Beträge 2026 nach Alter</h2>
${h.table(['Alter des Kindes', 'Mindestunterhalt', 'Minus Kindergeld', 'Unterhaltsvorschuss'], stufen, `Beträge im Monat seit ${h.date(U.from)}. Mindestunterhalt nach der Mindestunterhaltsverordnung; Unterhaltsvorschuss nach § 2 UVG von uns berechnet.`, ['l', 'r', 'r', 'r'])}
<p>Der Vorschuss richtet sich nach dem Mindestunterhalt, den ein Elternteil seinem Kind mindestens schuldet. Davon wird das volle Kindergeld für ein erstes Kind abgezogen, auch wenn das Kind ein zweites oder drittes Kind ist. Der Betrag wird monatlich im Voraus gezahlt und auf volle Euro aufgerundet; unter ${h.m(U.mindestZahlung)} wird nichts ausgezahlt.</p>

<h2>Voraussetzungen</h2>
<p>Anspruch hat ein Kind, das</p>
<ul>
<li>in Deutschland bei einem Elternteil lebt, der ledig, verwitwet, geschieden oder dauernd getrennt lebend ist,</li>
<li>vom anderen Elternteil keinen oder nicht regelmäßig Unterhalt mindestens in Höhe des Vorschusses erhält, oder nach dessen Tod keine ausreichenden Waisenbezüge,</li>
<li>jünger als ${A[2]} Jahre ist; ab ${A[1]} Jahren gelten zusätzlich die Regeln im nächsten Abschnitt.</li>
</ul>
<p>Kein Anspruch besteht, wenn der alleinerziehende Elternteil mit dem anderen Elternteil zusammenlebt, wenn er sich weigert, Auskunft zu geben oder bei der Feststellung der Vaterschaft oder des Aufenthalts des anderen Elternteils mitzuwirken, und für Monate, in denen der andere Elternteil seinen Unterhalt im Voraus gezahlt hat. Auf das Einkommen des alleinerziehenden Elternteils kommt es bei Kindern unter ${A[1]} Jahren nicht an. Auch wer gut verdient, bekommt den Vorschuss, solange der Unterhalt ausbleibt.</p>

<h2>Kinder von ${A[1]} bis ${A[2] - 1} Jahren</h2>
<p>Für ältere Kinder gibt es den Vorschuss nur, wenn eine von zwei Bedingungen erfüllt ist. Entweder bezieht das Kind kein Grundsicherungsgeld, oder es würde durch den Vorschuss unabhängig davon. Oder der alleinerziehende Elternteil hat ein eigenes Einkommen von mindestens ${h.m(U.mindesteinkommen12)} brutto im Monat, das Kindergeld nicht mitgerechnet. Grundlage der Prüfung ist der Bescheid des Jobcenters für den Monat, in dem das Kind ${A[1]} wird, bei einem späteren Antrag der Bescheid für den Antragsmonat. Das Ergebnis gilt bis zur nächsten Überprüfung. Erfüllt der Haushalt die Bedingung zunächst nicht, etwa weil der Lohn noch unter ${h.m(U.mindesteinkommen12)} liegt, lohnt ein neuer Antrag, sobald sich das ändert, zum Beispiel nach Aufnahme einer Arbeit mit höherem Verdienst.</p>
${h.box('Beispiel', `<p>Eine Mutter lebt mit ihrer 13-jährigen Tochter in einer Wohnung mit ${h.m(520)} Bruttokaltmiete und ${h.m(80)} Heizung, der Vater zahlt nichts. Mit einem Minijob von ${h.m(400)} brutto ist sie auf Grundsicherungsgeld angewiesen, und der Lohn liegt unter ${h.m(U.mindesteinkommen12)}: Die Tochter bekommt ${v400.uvgSumme ? h.m(v400.uvgSumme) : 'keinen'} Unterhaltsvorschuss. Verdient die Mutter ${h.m(700)} brutto, ist die Bedingung erfüllt, und die Tochter erhält ${h.m(v700.uvgSumme)} im Monat. Nach unserer Rechnung zahlt dann die Familienkasse ${h.m(v700.kiz.gesamt)} Kinderzuschlag und die Wohngeldstelle ${h.m(v700.wg.wohngeld)} Wohngeld, sodass die Familie ohne Jobcenter auskommt.</p>`, 'example')}

<h2>Wenn der andere Elternteil einen Teil zahlt</h2>
${h.table(['Gezahlter Unterhalt', 'Unterhaltsvorschuss', 'Zusammen'], teil, `Kind ${8} Jahre. Eigene Berechnung nach § 2 Abs. 3 UVG.`, ['r', 'r', 'r'])}
<p>Gezahlter Unterhalt wird in voller Höhe vom Vorschuss abgezogen. Zusammen erhält das Kind also immer mindestens den Betrag des Vorschusses. Zahlt der andere Elternteil unregelmäßig, kann das Jugendamt den Vorschuss für die Monate ohne Zahlung leisten. Für Kinder, die keine allgemeinbildende Schule mehr besuchen, zählt außerdem ein eigenes Einkommen, etwa eine Ausbildungsvergütung, zur Hälfte.</p>

<h2>Antrag, Beginn und Dauer</h2>
<p>Den Antrag stellt der Elternteil, bei dem das Kind lebt, schriftlich bei der Unterhaltsvorschussstelle, die meist beim Jugendamt der Stadt oder des Kreises angesiedelt ist. Gezahlt wird ab dem Antragsmonat, wenn die Voraussetzungen am Monatsanfang vorlagen. Rückwirkend gibt es höchstens ${U.rueckwirkendMonate} Monat vor dem Antragsmonat, und nur, wenn Sie sich zuvor bemüht haben, den anderen Elternteil zum Zahlen zu bewegen. Wer zögert, verliert also Geld. Eine Höchstdauer gibt es nicht: Der Vorschuss läuft, bis eine Voraussetzung entfällt, spätestens bis zum ${A[2]}. Geburtstag.</p>
<p>Halten Sie für den Antrag bereit, was Sie über den anderen Elternteil wissen, etwa Name, letzte Anschrift und Arbeitgeber, sowie Nachweise über bisher gezahlten Unterhalt. Ausgeschlossen ist der Anspruch nur, wenn Sie die Auskunft oder die Mitwirkung verweigern; dass Sie den Aufenthalt des anderen Elternteils nicht kennen, schließt ihn nicht aus. Welche Unterlagen genau verlangt werden, steht im Antragsformular Ihrer Stelle.</p>

<h2>Rückgriff beim anderen Elternteil</h2>
<p>Der Vorschuss ist kein Geschenk an den Unterhaltspflichtigen. Mit der Zahlung geht der Unterhaltsanspruch des Kindes in dieser Höhe auf das Land über. Die Unterhaltsvorschussstelle fordert den anderen Elternteil zur Auskunft über sein Einkommen auf, darf beim Arbeitgeber, bei Versicherungen und beim Finanzamt nachfragen und kann den Unterhalt gerichtlich durchsetzen. Für die Vergangenheit kann sie ihn ab dem Zeitpunkt in Anspruch nehmen, an dem er vom Antrag erfahren hat und über die Folgen belehrt wurde. Kann der andere Elternteil wegen geringen Einkommens nicht zahlen, bleibt der Vorschuss trotzdem bestehen.</p>

<h2>Unterhaltsvorschuss und andere Leistungen</h2>
<p>Der Vorschuss ist Einkommen des Kindes. Im Grundsicherungsgeld wird er voll auf den Bedarf des Kindes angerechnet, im Kinderzuschlag zu ${h.pc(h.P.kiz.anrechnungKind)}, im Wohngeld zählt er zum Jahreseinkommen des Haushalts. Das Kindergeld bleibt daneben unverändert bestehen. Alleinerziehende sollten deshalb immer prüfen, ob der Haushalt mit Unterhaltsvorschuss, Kindergeld, Wohngeld und Kinderzuschlag ohne Jobcenter auskommt; mehr dazu unter ${h.a('alleinerziehend-leistungen', 'Leistungen für Alleinerziehende')}.</p>

<h2>Ein Rechenbeispiel mit allen Familienleistungen</h2>
<p>Eine alleinerziehende Mutter mit einem fünfjährigen Sohn verdient ${h.m(1500)} brutto und zahlt ${h.m(520)} Bruttokaltmiete und ${h.m(80)} Heizung in einer Gemeinde der Mietstufe III. Der Vater zahlt keinen Unterhalt. Nach unserer Rechnung kommen zum Lohn ${h.m(v5.uvgSumme)} Unterhaltsvorschuss, ${h.m(v5.kindergeld)} Kindergeld, ${h.m(v5.kiz.gesamt)} Kinderzuschlag und ${h.m(v5.wg.wohngeld)} Wohngeld im Monat. Der Kinderzuschlag ist niedriger als der Höchstbetrag von ${h.m(h.P.kiz.hoechst)}, weil der Vorschuss ihn zu ${h.pc(h.P.kiz.anrechnungKind)} mindert. Vier Leistungen kommen hier von drei Stellen: Jugendamt, Familienkasse und Wohngeldstelle. Jede braucht einen eigenen Antrag.</p>

<h2>Rückzahlung durch den Elternteil, bei dem das Kind lebt</h2>
<p>Auch der alleinerziehende Elternteil kann zur Rückzahlung verpflichtet sein. Das gilt, wenn der Vorschuss gezahlt wurde, weil er vorsätzlich oder fahrlässig falsche oder unvollständige Angaben gemacht oder eine Änderung nicht gemeldet hat, oder wenn er wusste oder hätte wissen müssen, dass die Voraussetzungen fehlten. Typisch sind nicht gemeldete Unterhaltszahlungen des anderen Elternteils, eine Heirat oder der Einzug des anderen Elternteils. Hat das Kind nach dem Antrag eigenes Einkommen erzielt, das nicht berücksichtigt wurde, muss der Betrag insoweit ebenfalls zurückgezahlt werden.</p>

<h2>Wenn das Kind ${A[2]} wird</h2>
<p>Mit dem ${A[2]}. Geburtstag endet der Vorschuss. Der Unterhaltsanspruch des Kindes gegen den anderen Elternteil bleibt aber bestehen und muss dann direkt geltend gemacht werden. Kindergeld gibt es weiter, solange das Kind in Ausbildung ist, längstens bis ${h.P.kindergeld.altersgrenzeAusbildung}. Auch der Kinderzuschlag kann bis zu diesem Alter weiterlaufen, wenn das Kind im Haushalt lebt. Planen Sie den Übergang rechtzeitig, damit keine Lücke entsteht.</p>

<h2>Was 2027 geplant ist</h2>
<p>Der Regierungsentwurf zum Einkommensteuerreformgesetz 2027 sieht ein Kindergeld von ${h.m(kgNeu)} vor; er ist noch nicht beschlossen. Weil der Vorschuss den Mindestunterhalt um das Kindergeld mindert, würde er bei gleichem Mindestunterhalt um ${h.m(kgNeu - kg)} sinken. Der Mindestunterhalt für 2027 ist aber noch nicht festgelegt. Neue Beträge stehen erst fest, wenn beides veröffentlicht ist.</p>
`;
  },
});
