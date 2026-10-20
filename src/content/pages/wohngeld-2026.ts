import { definePage } from '../../lib/guide-types';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default definePage({
  id: 'wohngeld-2026',
  group: 'wohngeld',
  order: 11,
  slug: 'wohngeld-2026',
  nav: 'Wohngeld 2026',
  card: 'Höchstbeträge, Heizkostenkomponente, Freibeträge und Formel: was beim Wohngeld 2026 gilt.',
  title: 'Wohngeld 2026: Höchstbeträge, Formel und Freibeträge',
  description: 'Wohngeld 2026 ohne Erhöhung: Werte seit Januar 2025, Höchstbeträge je Mietstufe, Heiz- und Klimakomponente, Freibeträge nach § 17 WoGG und ein Rechenbeispiel.',
  h1: 'Wohngeld 2026: Beträge und Regeln im Überblick',
  intro: 'Für 2026 hat sich beim Wohngeld nichts an den Beträgen geändert. Diese Seite fasst zusammen, welche Höchstbeträge, Zuschläge und Freibeträge gelten und wie die Wohngeldstelle daraus den Zahlbetrag errechnet.',
  mini: { kind: 'mini:wohngeld' },
  related: ['wohngeld-rechner', 'wohngeld-tabelle', 'mietstufen', 'wohngeld-reform-2027', 'wohngeld-antrag'],
  sources: ['bgbl_2024_314', 'wogg_anl1', 'wogg_12', 'wogg_16', 'wogg_17', 'wogg_21', 'wogg_19'],
  resume: (h) => {
    const W = h.P.wohngeld;
    return `Beim Wohngeld gelten 2026 dieselben Werte wie 2025. Die letzte Erhöhung trat am ${h.date(W.letzteErhoehung)} mit der ${h.src('bgbl_2024_314', 'Zweiten Wohngeld-Fortschreibungsverordnung')} in Kraft; eine Anpassung zum Jahresbeginn 2026 war im Gesetz nicht vorgesehen. Der Zahlbetrag hängt von drei Größen ab: der Zahl der Haushaltsmitglieder, der berücksichtigten Miete und dem Gesamteinkommen. Die Miete zählt höchstens bis zum Höchstbetrag der Mietstufe, für eine Person zwischen ${h.m(W.hoechstbetrag[0][0])} (Stufe I) und ${h.m(W.hoechstbetrag[0][6])} (Stufe VII), zuzüglich einer Klimakomponente von ${h.m2(W.klima[0])}. Hinzu kommt ein pauschaler Betrag für die Heizkosten von ${h.m2(W.heizkosten[0])} für eine Person bis ${h.m2(W.heizkosten[4])} für fünf. Vom Bruttoeinkommen gehen der Arbeitnehmer-Pauschbetrag und bis zu dreimal ${h.pc(W.abzugSatz)} für Steuern und Sozialabgaben ab, außerdem Freibeträge, etwa ${h.m(W.freibetragAlleinerziehend)} im Jahr für Alleinerziehende. Ergibt die Formel weniger als ${h.m(W.minimum)} im Monat, wird kein Wohngeld gezahlt. Für den ${h.date(W.entwurf2027.inkraftGeplant)} liegt ein Gesetzentwurf vor, der das Wohngeld kürzen würde; beschlossen ist er nicht.`;
  },
  faqs: (h) => [
    { q: 'Steigt das Wohngeld zum 1. Januar 2026?', a: `Nein. Die Beträge wurden zuletzt zum ${h.date(h.P.wohngeld.letzteErhoehung)} angehoben und gelten 2026 unverändert. Das Wohngeldgesetz sieht in § 43 eine regelmäßige Fortschreibung vor; die nächste wäre zum ${h.date(h.P.wohngeld.entwurf2027.inkraftGeplant)} fällig. Der Regierungsentwurf in der BT-Drucksache ${h.P.wohngeld.entwurf2027.drucksache} will genau diese Fortschreibung aussetzen. Ob es so kommt, entscheidet der Bundestag.` },
    { q: 'Zählt das Kindergeld beim Wohngeld als Einkommen?', a: 'Nein. Das Kindergeld gehört nicht zu den Einnahmen, die § 14 WoGG zum Jahreseinkommen rechnet. Anders ist es beim Unterhalt für die Kinder und beim Unterhaltsvorschuss: beide zählen als Einkommen des Haushalts. Auch der Kinderzuschlag bleibt beim Wohngeld außer Betracht. Darum lohnt es sich für Familien, beide Leistungen gleichzeitig zu beantragen.' },
    { q: 'Was ist die Klimakomponente beim Wohngeld?', a: `Ein Zuschlag auf den Höchstbetrag der Miete nach § 12 Abs. 7 WoGG. Er soll höhere Mieten nach energetischer Sanierung abfedern und gilt für alle Wohnungen, egal ob saniert wurde. Für eine Person sind es ${h.m2(h.P.wohngeld.klima[0])}, für vier Personen ${h.m2(h.P.wohngeld.klima[3])}. Er hilft nur, wenn Ihre Miete über dem Höchstbetrag liegt.` },
    { q: 'Wie hoch ist der Freibetrag für Kinder mit eigenem Lohn beim Wohngeld?', a: `Verdient ein Kind unter 25 Jahren selbst, etwa in der Ausbildung oder im Nebenjob, bleiben davon bis zu ${h.m(h.P.wohngeld.freibetragKindErwerb)} im Jahr außer Ansatz (§ 17 Nr. 3 WoGG). Der Rest zählt zum Haushaltseinkommen, nach den gleichen Abzügen wie bei den Eltern. Ein Ausbildungsgehalt kann das Wohngeld deshalb deutlich senken, ohne es ganz zu beenden.` },
    { q: 'Muss ich Wohngeld zurückzahlen, wenn mein Einkommen steigt?', a: `Steigt das Gesamteinkommen nicht nur vorübergehend um mehr als ${h.pc(h.P.wohngeld.amtswegenSchwelle)}, entscheidet die Wohngeldstelle neu, ab dem Monat der Änderung (§ 27 Abs. 2 WoGG). Zu viel gezahltes Wohngeld wird dann zurückgefordert. Sie müssen eine solche Erhöhung unverzüglich melden. Kleinere Schwankungen innerhalb des Bewilligungszeitraums ändern das Wohngeld nicht.` },
  ],
  body: (h) => {
    const W = h.P.wohngeld;
    const hb = (W.hoechstbetrag as number[][]).map((r, i) => [`${i + 1}`, ...r.map((x) => h.m(x))]);
    hb.push(['je weitere Person', ...(W.hoechstbetragMehr as number[]).map((x) => '+ ' + h.m(x))]);
    const komp = [1, 2, 3, 4, 5].map((n) => [String(n), h.m2(h.WG.heizEntlastung(n)), h.m2(h.WG.klimaKomponente(n))]);
    komp.push(['je weitere Person', '+ ' + h.m2(W.heizkostenMehr), '+ ' + h.m2(W.klimaMehr)]);
    const bsp = h.WG.wohngeld({ personen: 2, mietstufe: 3, miete: 600, einkommen: [{ brutto: 2000 }] });
    const jahrBrutto = 2000 * 12;
    return `
<h2>Höchstbeträge für die Miete</h2>
<p>Die Miete zählt beim Wohngeld nicht unbegrenzt. Anlage 1 zum Wohngeldgesetz legt für jede Haushaltsgröße und jede der ${(W.hoechstbetrag as number[][])[0].length} Mietstufen einen Höchstbetrag fest. Die Mietstufe richtet sich nach dem örtlichen Mietniveau Ihrer Gemeinde im Vergleich zum Bundesdurchschnitt. Höher ist die Miete, die berücksichtigt wird, nur um die Klimakomponente. Was darüber liegt, zahlen Sie allein. Die Werte gelten seit dem ${h.date(W.from)}.</p>
${h.table(['Personen', ...ROM.map((s) => `Stufe ${s}`)], hb, 'Höchstbeträge für die Bruttokaltmiete im Monat, Anlage 1 zum WoGG in der Fassung der Zweiten Wohngeld-Fortschreibungsverordnung.', ['l', 'r', 'r', 'r', 'r', 'r', 'r', 'r'])}
<p>Gemeint ist immer die Bruttokaltmiete: Grundmiete und kalte Betriebskosten wie Wasser, Abwasser, Müll, Straßenreinigung, Hausmeister und Versicherungen. Kosten für Heizung und Warmwasser bleiben draußen, ebenso Zuschläge für Möbel oder eine Garage. Wer im eigenen Haus oder in der eigenen Wohnung lebt, bekommt statt Mietzuschuss einen Lastenzuschuss; dort tritt die monatliche Belastung aus Zins, Tilgung und Bewirtschaftung an die Stelle der Miete. Welche Stufe für die großen Städte gilt, zeigt die Seite ${h.a('mietstufen', 'Mietstufen')}.</p>

<h2>Heizkostenkomponente und Klimakomponente</h2>
<p>Das Wohngeld enthält zwei feste Bausteine, die nicht von der tatsächlichen Miete abhängen. Der Gesamtbetrag zur Entlastung bei den Heizkosten (§ 12 Abs. 6 WoGG) setzt sich aus einem Betrag wegen der CO2-Bepreisung und einer dauerhaften Heizkostenkomponente zusammen; er wird zur Miete addiert, bevor die Formel rechnet. Die Klimakomponente (§ 12 Abs. 7 WoGG) erhöht dagegen nur die Obergrenze, bis zu der die Miete zählt. Beide Beträge steigen mit der Zahl der Personen.</p>
${h.table(['Personen', 'Heizkosten-Entlastung', 'Klimakomponente'], komp, '§ 12 Abs. 6 und 7 WoGG, Beträge im Monat.', ['l', 'r', 'r'])}
<p>Die Heizkostenentlastung bekommen alle Wohngeldhaushalte, auch wer mit Strom heizt oder dessen Heizung in der Miete pauschal enthalten ist. Umgekehrt erstattet das Wohngeld keine hohe Heizkostennachzahlung; dafür ist allenfalls das Jobcenter zuständig, wenn im Monat der Fälligkeit Hilfebedürftigkeit entsteht.</p>

<h2>Wer Wohngeld bekommen kann</h2>
<p>Wohngeld ist ein Zuschuss für Menschen, die ihre Wohnkosten aus eigenem Einkommen bestreiten, aber nur knapp. Mieterinnen und Mieter erhalten ihn als Mietzuschuss, Eigentümer einer selbst bewohnten Wohnung oder eines Hauses als Lastenzuschuss. Antragsberechtigt ist eine Person für den ganzen Haushalt; zum Haushalt zählen alle, die mit ihr in einer Wohn- und Wirtschaftsgemeinschaft leben, also Ehe- und Lebenspartner, Kinder und andere Angehörige, die dort ihren Lebensmittelpunkt haben. Untermieter oder Mitbewohner in einer reinen Wohngemeinschaft gehören nicht dazu; sie stellen gegebenenfalls einen eigenen Antrag.</p>
<p>Typische Wohngeldhaushalte sind Beschäftigte mit kleinem oder mittlerem Lohn, Familien mit mehreren Kindern, Alleinerziehende, Rentnerinnen und Rentner mit kleiner Rente sowie Menschen mit Arbeitslosengeld oder Krankengeld. Wohngeld ist keine Leistung der Sozialhilfe: Es gibt keine Pflicht zur Arbeitssuche, keine Termine beim Amt und keine Prüfung, ob die Wohnung angemessen ist. Dafür muss das eigene Einkommen den Lebensunterhalt zusammen mit dem Wohngeld decken. Bewilligt wird in der Regel für ${W.bewilligungMonate} Monate, bei gleichbleibenden Verhältnissen für bis zu ${W.bewilligungMax} Monate (§ 25 WoGG); wie der Antrag abläuft, steht unter ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}.</p>

<h2>Welches Einkommen zählt</h2>
<p>Das Wohngeld rechnet mit dem Jahreseinkommen aller Haushaltsmitglieder, geschätzt für die kommenden ${W.bewilligungMonate} Monate. Grundlage sind die positiven Einkünfte im Sinne des Einkommensteuerrechts: beim Lohn also das Brutto abzüglich Werbungskosten, mindestens des Arbeitnehmer-Pauschbetrags von ${h.m(W.werbungskosten)} im Jahr. Hinzu kommen steuerfreie Einnahmen, die § 14 Abs. 2 WoGG aufzählt, etwa der steuerfreie Teil von Renten, Arbeitslosengeld, Krankengeld, Unterhalt und Unterhaltsvorschuss. Elterngeld zählt nur, soweit es ${h.m(h.P.elterngeld.freibetragSgb2)} im Monat übersteigt (§ 10 Abs. 1 BEEG); beim Elterngeld Plus bleibt die Hälfte frei.</p>
<p>Von diesem Jahreseinkommen zieht § 16 WoGG pauschal je ${h.pc(W.abzugSatz)} ab, wenn Steuern vom Einkommen, Pflichtbeiträge zur Kranken- und Pflegeversicherung oder Pflichtbeiträge zur Rentenversicherung anfallen. Ein Arbeitnehmer mit vollem Lohn hat alle drei Abzüge, zusammen ${h.pc(3 * W.abzugSatz)}. Eine Rentnerin ohne Steuerlast hat meist nur den Abzug für die Krankenversicherung, ein Minijobber nur den für die Rente. Anschließend kommen die Freibeträge aus § 17 und § 17a WoGG.</p>
<ul>
<li><strong>${h.m(W.freibetragSchwerbehindert)} im Jahr</strong> für jedes Haushaltsmitglied mit einem Grad der Behinderung von 100 oder mit einem geringeren Grad und häuslicher Pflegebedürftigkeit.</li>
<li><strong>${h.m(W.freibetragAlleinerziehend)} im Jahr</strong> für Alleinerziehende, die nur mit eigenen Kindern unter 18 Jahren zusammenwohnen.</li>
<li><strong>bis ${h.m(W.freibetragKindErwerb)} im Jahr</strong> vom eigenen Erwerbseinkommen jedes Kindes unter 25 Jahren.</li>
<li><strong>Grundrentenfreibetrag</strong> für Rentnerinnen und Rentner mit mindestens ${W.grundrente.jahre} Jahren Grundrentenzeiten: ${h.m(W.grundrente.grund)} im Jahr plus ${h.pc(W.grundrente.satz)} der übrigen gesetzlichen Rente, höchstens ${h.pc(W.grundrente.maxAnteilRbs1)} der Regelbedarfsstufe 1 im Monat (§ 17a WoGG).</li>
</ul>
<p>Kindergeld und Kinderzuschlag gehören nicht zum Einkommen. Das Ergebnis, auf den Monat umgerechnet, ist das Gesamteinkommen Y der Formel.</p>

<h2>Die Formel und ein Rechenbeispiel</h2>
<p>Das ungerundete Wohngeld beträgt nach § 19 WoGG das ${h.dec(W.formelFaktor)}-Fache von M minus (a + b·M + c·Y)·Y. M ist die berücksichtigte Miete einschließlich Heizkostenentlastung, Y das monatliche Gesamteinkommen, a, b und c sind Werte aus Anlage 2, die mit der Haushaltsgröße wechseln. Liegen M oder Y unter den Mindestwerten aus Anlage 3, wird mit den Mindestwerten gerechnet; am Ende wird auf volle Euro gerundet.</p>
<p>Ein Beispiel: Ein Paar ohne Kinder in einer Gemeinde der Mietstufe III zahlt ${h.m(600)} Bruttokaltmiete; eine Person verdient ${h.m(2000)} brutto im Monat, die andere nichts. Der Höchstbetrag für zwei Personen liegt in Stufe III bei ${h.m(bsp.hoechst)}, mit Klimakomponente bei ${h.m2(bsp.hoechst + bsp.klima)}; berücksichtigt werden also ${h.m2(bsp.mieteBerueck)}. Dazu kommt die Heizkostenentlastung von ${h.m2(bsp.heiz)}, zusammen M = ${h.m2(bsp.M)}. Beim Einkommen: ${h.m(jahrBrutto)} Jahresbrutto minus ${h.m(W.werbungskosten)} Pauschbetrag, davon ${h.pc(1 - 3 * W.abzugSatz)} nach den drei Abzügen, ergibt ${h.m(bsp.jahresEink)} im Jahr oder Y = ${h.m2(bsp.Y)} im Monat. Die Formel ergibt ein Wohngeld von ${h.m(bsp.wohngeld)} im Monat.</p>
${h.box('Rechnen statt rechnen lassen', `<p>Den gleichen Weg geht der kleine Rechner oben auf dieser Seite. Für Haushalte mit Kindern, Elterngeld oder Unterhalt ist der ${h.a('wohngeld-rechner', 'Wohngeld-Rechner')} genauer, weil er Freibeträge und den Vergleich mit dem Grundsicherungsgeld einbezieht.</p>`, 'tip')}

<h2>Wann kein Wohngeld gezahlt wird</h2>
<p>Drei Fälle schließen den Anspruch aus. Erstens, wenn die Formel weniger als ${h.m(W.minimum)} im Monat ergibt (§ 21 Nr. 1 WoGG). Zweitens, wenn alle Haushaltsmitglieder Leistungen beziehen, bei denen die Unterkunftskosten schon berücksichtigt sind: Grundsicherungsgeld, Grundsicherung im Alter und bei Erwerbsminderung, Hilfe zum Lebensunterhalt oder Asylbewerberleistungen (§ 7 WoGG). Drittens, wenn die Inanspruchnahme missbräuchlich wäre, insbesondere bei erheblichem Vermögen (§ 21 Nr. 3 WoGG). Wer Grundsicherungsgeld beantragt hat und abgelehnt wurde, kann Wohngeld rückwirkend ab dem Monat der Ablehnung bekommen, wenn er den Antrag rechtzeitig stellt (§ 25 Abs. 3 WoGG).</p>
<p>Ob sich statt Wohngeld das Grundsicherungsgeld lohnt oder umgekehrt, ist keine freie Wahl. Deckt das Wohngeld zusammen mit dem Einkommen den Bedarf nach dem SGB II, geht es vor; reicht es nicht, ist das Jobcenter zuständig. Die Seite ${h.a('wohngeld-oder-grundsicherung', 'Wohngeld oder Grundsicherungsgeld')} erklärt die Abgrenzung mit Beispielen.</p>

<h2>Was ab 2027 kommen könnte</h2>
<p>Die Bundesregierung hat am ${h.date(W.entwurf2027.datum)} den Entwurf eines Gesetzes zur Vereinfachung und Fortentwicklung des Wohngeldgesetzes vorgelegt (${h.src('btd_21_8284', `BT-Drucksache ${W.entwurf2027.drucksache}`)}). Er würde die Fortschreibung zum ${h.date(W.entwurf2027.inkraftGeplant)} aussetzen, die Heizkostenkomponente halbieren, den Wert c der Formel anheben und neue Mietstufen einführen. Am ${h.date(h.TODAY)} ist der Entwurf nicht beschlossen; bis zu einer Verkündung im Bundesgesetzblatt gilt alles auf dieser Seite weiter. Einzelheiten und Beispielrechnungen stehen unter ${h.a('wohngeld-reform-2027', 'Wohngeldreform 2027')}.</p>
`;
  },
});
