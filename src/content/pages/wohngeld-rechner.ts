import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'wohngeld-rechner',
  group: 'wohngeld',
  order: 10,
  slug: 'wohngeld-rechner',
  nav: 'Wohngeld-Rechner',
  card: 'Wohngeld nach Haushalt, Miete und Mietstufe, mit Vergleich zum Grundsicherungsgeld.',
  title: 'Wohngeld-Rechner 2026: Anspruch prüfen und Vorrang klären',
  description: 'Wohngeld-Rechner nach dem Recht seit Januar 2025: Höchstbetrag der Mietstufe, Heizkostenkomponente, Einkommen nach WoGG und Vergleich mit Grundsicherungsgeld.',
  h1: 'Wohngeld-Rechner 2026 mit Vergleich zum Grundsicherungsgeld',
  intro: 'Geben Sie Haushalt, Bruttolohn, Bruttokaltmiete und Wohnort ein. Der Rechner ermittelt das Wohngeld nach § 19 WoGG und prüft zugleich, ob für Ihren Haushalt das Grundsicherungsgeld vom Jobcenter vorgeht.',
  tool: { kind: 'haushalt', props: { kinder: '', brutto1: 1500, miete: 520, heizung: 80, ort: 'Berlin' } },
  related: ['wohngeld-2026', 'wohngeld-tabelle', 'mietstufen', 'wohngeld-antrag', 'wohngeld-oder-grundsicherung'],
  sources: ['wogg_19', 'wogg_anl1', 'wogg_12', 'wogg_7', 'sgb2_12a'],
  resume: (h) => {
    const r = h.WG.wohngeld({ personen: 1, mietstufe: h.P.wohngeld.mietstufen['Berlin'], miete: 520, einkommen: [{ brutto: 1500 }] });
    return `Der Wohngeld-Rechner wendet die Formel aus § 19 WoGG mit den Werten an, die seit dem ${h.date(h.P.wohngeld.from)} gelten; für 2026 gab es keine Anpassung. Gerechnet wird mit drei Größen: der Zahl der Haushaltsmitglieder, der Bruttokaltmiete bis zum Höchstbetrag Ihrer Mietstufe (zuzüglich Klimakomponente) und dem Gesamteinkommen nach Abzug von Pauschalen und Freibeträgen. Dazu kommt ein fester Betrag zur Entlastung bei den Heizkosten, für eine Person ${h.m2(h.P.wohngeld.heizkosten[0])}; die tatsächlichen Heizkosten spielen für das Wohngeld keine Rolle. Ein Beispiel mit den Vorgaben oben: Eine alleinstehende Person in Berlin (Mietstufe ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][h.P.wohngeld.mietstufen['Berlin'] - 1]}) mit ${h.m(1500)} brutto und ${h.m(520)} Bruttokaltmiete kommt auf rund ${h.m(r.wohngeld)} Wohngeld im Monat. Liegt das Ergebnis unter ${h.m(h.P.wohngeld.minimum)}, wird nichts gezahlt (§ 21 WoGG). Weil Wohngeld und Grundsicherungsgeld sich ausschließen, rechnet das Werkzeug beide Wege und zeigt, welcher nach dem Gesetz gilt. Den Bescheid erlässt die Wohngeldstelle Ihrer Stadt oder Gemeinde.`;
  },
  faqs: (h) => [
    { q: 'Welche Miete gebe ich im Wohngeld-Rechner ein?', a: `Die Bruttokaltmiete: Grundmiete plus kalte Nebenkosten wie Wasser, Müllabfuhr, Hausreinigung und Grundsteuer. Heizung und Warmwasser gehören nicht dazu, weil das Wohngeld dafür einen festen Betrag ansetzt (für zwei Personen ${h.m2(h.P.wohngeld.heizkosten[1])}). Liegt Ihre Miete über dem Höchstbetrag der Mietstufe, rechnet das Werkzeug mit dem Höchstbetrag und weist darauf hin.` },
    { q: 'Warum zeigt der Rechner Grundsicherungsgeld statt Wohngeld an?', a: 'Wenn Ihr Einkommen zusammen mit dem Wohngeld Ihren Bedarf nach dem SGB II nicht deckt, sind Sie hilfebedürftig. Dann ist das Jobcenter zuständig, und Wohngeld ist nach § 7 WoGG ausgeschlossen. Das Werkzeug zeigt deshalb das Grundsicherungsgeld als maßgeblichen Weg und nennt den Betrag, der mit Wohngeld noch fehlen würde.' },
    { q: 'Rechnet das Werkzeug Freibeträge für Schwerbehinderung oder Grundrente mit?', a: `Nein. Der Freibetrag von ${h.m(h.P.wohngeld.freibetragSchwerbehindert)} im Jahr für Haushaltsmitglieder mit einem Grad der Behinderung von 100 oder mit Pflegebedarf bei häuslicher Pflege und der Grundrentenfreibetrag nach § 17a WoGG fehlen in der Eingabe. Wer sie hat, bekommt eher mehr Wohngeld als angezeigt. Der Freibetrag für Alleinerziehende und die Abzüge für Steuern und Sozialversicherung sind dagegen eingerechnet.` },
    { q: 'Wie genau ist das Ergebnis des Wohngeld-Rechners?', a: `Die Formel, die Höchstbeträge und die Rundungsschritte sind die des Gesetzes. Ungenau wird es beim Einkommen: Die Wohngeldstelle schätzt das Einkommen der nächsten ${h.P.wohngeld.bewilligungMonate} Monate und berücksichtigt Sonderzahlungen wie Weihnachtsgeld. Geben Sie deshalb einen Monatsdurchschnitt inklusive Einmalzahlungen ein. Abweichungen von einigen Euro sind normal; der Bescheid ist verbindlich.` },
  ],
  body: (h) => {
    const stufe = h.P.wohngeld.mietstufen['Berlin'];
    const zeilen = [900, 1200, 1500, 1800, 2100].map((b) => {
      const v = h.VG.vergleich({ paar: false, brutto: [b], kinder: [], unterhalt: 0, miete: 520, heizung: 80, mietstufe: stufe, elterngeld: 0, sonstiges: 0 });
      const weg = v.empfehlung === 'gsg' ? 'Grundsicherungsgeld' : v.empfehlung === 'vorrang' ? 'Wohngeld' : 'keine Leistung';
      return [h.m(b), h.m(v.wg.wohngeld), h.m(v.gsg.anspruch), weg];
    });
    return `
<h2>Was der Rechner im Hintergrund prüft</h2>
<p>Das Werkzeug rechnet nicht nur das Wohngeld aus. Es stellt zwei Wege nebeneinander: Wohngeld (bei Kindern zusammen mit dem Kinderzuschlag) oder Grundsicherungsgeld. Das ist nötig, weil beide Leistungen sich ausschließen. Wer Grundsicherungsgeld bezieht, ist vom Wohngeld ausgeschlossen (§ 7 Abs. 1 WoGG), und das Jobcenter darf Sie nach § 12a SGB II nur dann auf das Wohngeld verweisen, wenn es Ihre Hilfebedürftigkeit tatsächlich beendet. Bleibt mit Wohngeld eine Lücke zum Bedarf, ist das Grundsicherungsgeld der richtige Weg, auch wenn ein positiver Wohngeldbetrag angezeigt wird. Mehr zu dieser Abgrenzung steht unter ${h.a('wohngeld-oder-grundsicherung', 'Wohngeld oder Grundsicherungsgeld')} und ${h.a('vorrangpruefung', 'Vorrangprüfung')}.</p>
${h.table(['Bruttolohn', 'Wohngeld', 'Grundsicherungsgeld', 'Maßgeblicher Weg'], zeilen, `Alleinstehend in Berlin (Mietstufe ${['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'][stufe - 1]}), ${h.m(520)} Bruttokaltmiete, ${h.m(80)} Heizung. Berechnet mit den Rechenkernen dieser Website, Stand ${h.date(h.TODAY)}.`, ['r', 'r', 'r', 'l'])}
<p>Die Tabelle zeigt den typischen Verlauf. Bei kleinem Lohn ist der Bedarf nach dem SGB II höher als Lohn plus Wohngeld, also bleibt es beim Jobcenter. Mit steigendem Lohn sinkt das Grundsicherungsgeld schneller als das Wohngeld, bis das Wohngeld allein ausreicht. Dazwischen liegt ein schmaler Bereich, in dem beide Beträge ähnlich hoch sind; dort lohnt der genaue Vergleich. Oberhalb einer bestimmten Grenze fällt auch das Wohngeld weg; wo diese Grenze liegt, zeigt ${h.a('wohngeld-einkommensgrenzen', 'Wohngeld-Einkommensgrenzen')}.</p>

<h2>Die Eingaben richtig wählen</h2>
<ul>
<li><strong>Haushalt:</strong> Zählen Sie alle Personen, die mit Ihnen dauerhaft wohnen und wirtschaften, auch Kinder. Die Zahl der Haushaltsmitglieder bestimmt Höchstbetrag, Heizkostenbetrag und die Werte der Formel.</li>
<li><strong>Bruttolohn:</strong> Das monatliche Brutto vor Abzügen. Das Werkzeug zieht den Arbeitnehmer-Pauschbetrag von ${h.m(h.P.wohngeld.werbungskosten)} im Jahr ab und dann je ${h.pc(h.P.wohngeld.abzugSatz)} für Steuern, Kranken- und Pflegeversicherung sowie Rentenversicherung (§ 16 WoGG). Bei einem Minijob bis ${h.m(h.P.wohngeld.geringfuegig)} fällt nur der Abzug für die Rentenversicherung an.</li>
<li><strong>Miete:</strong> Bruttokaltmiete laut Mietvertrag. Heizkosten tragen Sie getrennt ein; sie zählen nur für den Vergleich mit dem Grundsicherungsgeld, das die tatsächlichen Heizkosten übernimmt.</li>
<li><strong>Wohnort:</strong> Wählen Sie Ihre Stadt oder direkt die Mietstufe. Welche Stufe für Ihre Gemeinde gilt, steht in der Anlage zur Wohngeldverordnung; eine Übersicht großer Städte finden Sie unter ${h.a('mietstufen', 'Mietstufen')}.</li>
</ul>

<h2>Grenzen des Werkzeugs</h2>
<p>Selbständige, Studierende mit BAföG-Anspruch und Haushalte, in denen nur einzelne Mitglieder Grundsicherungsgeld beziehen, kann der Rechner nicht abbilden. Auch Grundsicherung im Alter nach dem SGB XII rechnet er nicht; für Rentnerinnen und Rentner gibt es eine eigene Seite: ${h.a('wohngeld-rentner', 'Wohngeld für Rentner')}. Vermögen prüft das Werkzeug nicht. Beim Wohngeld schließt erhebliches Vermögen den Anspruch aus (§ 21 Nr. 3 WoGG); eine feste Euro-Grenze nennt das Gesetz selbst nicht.</p>
${h.box('Hinweis', `<p>Das Ergebnis ist eine Schätzung nach den Angaben, die Sie machen. Verbindlich ist allein der Bescheid der Wohngeldstelle. Wie Sie den Antrag stellen und welche Unterlagen nötig sind, steht unter ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}.</p>`)}
<p>Wer Kinder hat, sollte zusätzlich den ${h.a('kinderzuschlag-rechner', 'Kinderzuschlag-Rechner')} nutzen: Kinderzuschlag und Wohngeld werden meist zusammen bezogen, und erst beide zusammen beenden oft die Hilfebedürftigkeit. Die Beträge und Regeln des laufenden Jahres stehen unter ${h.a('wohngeld-2026', 'Wohngeld 2026')}.</p>
`;
  },
});
