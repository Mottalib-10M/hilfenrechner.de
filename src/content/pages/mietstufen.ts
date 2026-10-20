import { definePage } from '../../lib/guide-types';

const ROM = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

export default definePage({
  id: 'mietstufen',
  group: 'wohngeld',
  order: 14,
  slug: 'mietstufen',
  nav: 'Mietstufen',
  card: 'Was die Mietstufen I bis VII bedeuten, welche Stufe große Städte haben und was 2027 geplant ist.',
  title: 'Mietstufen Wohngeld 2026: Liste der Städte und Höchstbeträge',
  description: 'Mietstufen beim Wohngeld: Stufen I bis VII erklärt, Liste großer Städte, Höchstbeträge je Stufe, Wirkung auf das Wohngeld und geplante neue Stufen ab 2027.',
  h1: 'Mietstufen beim Wohngeld: was sie bedeuten und welche gilt',
  intro: 'Jede Gemeinde in Deutschland ist einer von sieben Mietstufen zugeordnet. Die Stufe bestimmt, bis zu welcher Miete die Wohngeldstelle rechnet. Hier finden Sie die Stufen großer Städte und ihre Wirkung.',
  mini: { kind: 'mini:wohngeld' },
  related: ['wohngeld-2026', 'wohngeld-tabelle', 'wohngeld-reform-2027', 'wohngeld-berlin', 'wohngeld-muenchen'],
  sources: ['wogv_anlage', 'wogg_12', 'wogg_anl1', 'btd_21_8284'],
  resume: (h) => {
    const W = h.P.wohngeld; const G = W.mietstufenGrenzen as number[];
    return `Die Mietstufe einer Gemeinde gibt an, wie hoch dort die Mieten der Wohngeldhaushalte im Vergleich zum Bundesdurchschnitt sind. Das Wohngeldgesetz kennt ${ROM.length} Stufen (§ 12 Abs. 5 WoGG): Stufe I gilt für Orte, deren Mietenniveau mehr als ${-G[0]} % unter dem Durchschnitt liegt, Stufe VII für Orte mit ${G[5]} % und mehr darüber. Welche Stufe Ihr Wohnort hat, steht in der Anlage zur Wohngeldverordnung; Gemeinden ab ${h.num(W.einwohnerSchwelle)} Einwohnern sind einzeln aufgeführt, kleinere Orte übernehmen die Stufe ihres Kreises. Die Stufe bestimmt den Höchstbetrag für die Miete: Für eine Person sind es ${h.m(W.hoechstbetrag[0][0])} in Stufe I und ${h.m(W.hoechstbetrag[0][6])} in Stufe VII. Berlin hat Stufe ${ROM[W.mietstufen['Berlin'] - 1]}, Hamburg ${ROM[W.mietstufen['Hamburg'] - 1]}, München ${ROM[W.mietstufen['München'] - 1]}, Leipzig ${ROM[W.mietstufen['Leipzig'] - 1]}. Die geltende Zuordnung beruht auf der ${W.mietstufenDaten} und gilt seit dem ${h.date(W.mietstufenSeit)}. Neue Mietstufen ab ${h.date(W.entwurf2027.inkraftGeplant)} enthält ein Gesetzentwurf (BT-Drucksache ${W.entwurf2027.drucksache}); sie gelten erst, wenn das Gesetz beschlossen und verkündet ist.`;
  },
  faqs: (h) => [
    { q: 'Wo finde ich die Mietstufe meiner Gemeinde?', a: 'In der Anlage zu § 1 Abs. 3 der Wohngeldverordnung. Sie ist nach Ländern geordnet und nennt jede Gemeinde mit eigener Stufe. Steht Ihr Wohnort dort nicht, gilt die Stufe des Kreises, zu dem er gehört. Auch die Wohngeldstelle Ihrer Gemeinde nennt Ihnen die Stufe, ebenso der Bescheid, der sie ausdrücklich angibt.' },
    { q: 'Kann ich gegen die Mietstufe meiner Stadt Widerspruch einlegen?', a: 'Gegen die Einstufung selbst nicht, denn sie steht in einer Verordnung des Bundes und gilt für alle Haushalte des Ortes gleich. Ein Widerspruch gegen den Wohngeldbescheid ist möglich, wenn die Wohngeldstelle eine falsche Stufe angewendet hat, etwa nach einem Umzug in eine Nachbargemeinde. Die Frist steht in der Rechtsbehelfsbelehrung am Ende des Bescheids.' },
    { q: 'Ändert sich die Mietstufe, wenn die Mieten in meiner Stadt steigen?', a: `Nicht automatisch. Das Statistische Bundesamt stellt das Mietenniveau nur neu fest, wenn die Höchstbeträge angepasst werden oder das Wohngeld strukturell geändert wird (§ 12 Abs. 4 WoGG). Die aktuelle Zuordnung gilt seit dem ${h.date(h.P.wohngeld.mietstufenSeit)}. Neue Stufen sieht erst der Gesetzentwurf für ${h.date(h.P.wohngeld.entwurf2027.inkraftGeplant)} vor, der noch nicht beschlossen ist.` },
    { q: 'Gilt die Mietstufe auch für das Grundsicherungsgeld?', a: 'Nein. Das Jobcenter prüft die Miete nach den Angemessenheitsgrenzen der Kommune, die jeder Träger selbst festlegt, meist anhand eines schlüssigen Konzepts. Die Mietstufen gelten nur für das Wohngeld. Deshalb kann dieselbe Wohnung beim Wohngeld voll zählen und beim Grundsicherungsgeld als zu teuer gelten, oder umgekehrt.' },
  ],
  body: (h) => {
    const W = h.P.wohngeld; const G = W.mietstufenGrenzen as number[];
    const niveau = [`unter ${G[0]} %`, `${G[0]} % bis unter ${G[1]} %`, `${G[1]} % bis unter ${G[2]} %`, `${G[2]} % bis unter ${G[3]} %`, `${G[3]} % bis unter ${G[4]} %`, `${G[4]} % bis unter ${G[5]} %`, `${G[5]} % und mehr`];
    const staedte = Object.entries(W.mietstufen as Record<string, number>);
    const liste = ROM.map((r, i) => [`Stufe ${r}`, niveau[i], staedte.filter(([, s]) => s === i + 1).map(([c]) => c).sort((a, b) => a.localeCompare(b, 'de')).join(', ') || 'keine der aufgeführten Städte']);
    const hb = ROM.map((r, i) => [`Stufe ${r}`, ...[1, 2, 3, 4].map((n) => h.m(h.WG.hoechstbetrag(n, i + 1)))]);
    const wirkung = ROM.map((r, i) => { const x = h.WG.wohngeld({ personen: 1, mietstufe: i + 1, miete: 600, einkommen: [{ brutto: 1500 }] }); return [`Stufe ${r}`, h.m2(x.mieteBerueck), h.m(x.wohngeld)]; });
    const E = W.entwurf2027;
    const neu = Object.entries(E.mietstufen as Record<string, number>).filter(([c, s]) => W.mietstufen[c] && W.mietstufen[c] !== s).map(([c, s]) => [c, ROM[W.mietstufen[c] - 1], ROM[s - 1], s > W.mietstufen[c] ? 'höher' : 'niedriger']);
    const gleich = Object.entries(E.mietstufen as Record<string, number>).filter(([c, s]) => W.mietstufen[c] === s).map(([c]) => c);
    const hh = W.mietstufen['Hamburg'], hhNeu = E.mietstufen['Hamburg'];
    return `
<h2>Was eine Mietstufe ist</h2>
<p>Das Wohngeld soll überall in Deutschland ähnlich wirken, obwohl Mieten in München ganz andere sind als in Chemnitz. Dafür sorgen die Mietstufen. Grundlage ist das Mietenniveau: die durchschnittliche prozentuale Abweichung der Quadratmetermieten der Wohngeldhaushalte in einer Gemeinde vom Bundesdurchschnitt (§ 12 Abs. 2 WoGG). Das Statistische Bundesamt stellt diese Abweichung fest, für Gemeinden ab ${h.num(W.einwohnerSchwelle)} Einwohnern einzeln, für kleinere Gemeinden zusammengefasst nach Kreisen. Aus der Abweichung folgt die Stufe nach der Tabelle in § 12 Abs. 5 WoGG.</p>
<p>Wichtig ist, was das Mietenniveau nicht ist: Es ist kein Mietspiegel und keine Angemessenheitsgrenze. Es misst nur die Mieten der Haushalte, die bereits Wohngeld bekommen, und es wird nicht laufend aktualisiert. Die geltende Einstufung beruht auf der ${W.mietstufenDaten}. Mieten, die seither gestiegen sind, spiegelt sie nicht wider.</p>

<h2>Große Städte und ihre Mietstufen</h2>
${h.table(['Stufe', 'Mietenniveau', 'Städte'], liste, `Mietstufen ausgewählter Städte nach der Anlage zur Wohngeldverordnung, gültig seit ${h.date(W.mietstufenSeit)}.`, ['l', 'l', 'l'])}
<p>In der höchsten Stufe steht unter den großen Städten nur München. In Stufe VI finden sich die teuren Großstädte im Westen und Süden, darunter Hamburg, Köln, Frankfurt am Main, Stuttgart und Düsseldorf. Berlin liegt trotz stark gestiegener Angebotsmieten in Stufe ${ROM[W.mietstufen['Berlin'] - 1]}, weil die Einstufung nur die Mieten der Wohngeldhaushalte zum Stichtag misst, nicht die Preise neuer Mietverträge. Viele Städte im Ruhrgebiet und im Osten haben Stufe III oder darunter; Chemnitz ist die einzige Großstadt der Liste in Stufe I. Die vollständige Liste aller Gemeinden steht im ${h.src('wogv_anlage', 'Anhang der Wohngeldverordnung')}.</p>

<h2>Wie das Mietenniveau festgestellt wird</h2>
<p>Das Verfahren ist im Gesetz genau geregelt. Das Statistische Bundesamt wertet zwei aufeinanderfolgende Jahrgänge der Wohngeldstatistik aus, jeweils zum Stichtag im Dezember (§ 12 Abs. 4 WoGG). Für jede Gemeinde ab der Einwohnerschwelle ermittelt es die durchschnittliche Quadratmetermiete der Hauptmieter mit Mietzuschuss und vergleicht sie mit dem Bundesdurchschnitt. Für Gemeinden unter der Schwelle gibt es keinen eigenen Wert; sie werden mit allen anderen kleinen Gemeinden ihres Kreises zusammengefasst.</p>
<p>Neu festgestellt wird das Mietenniveau nur, wenn die Höchstbeträge angepasst oder das Wohngeld strukturell geändert wird. Darum blieb die Einstufung bei der Erhöhung zum ${h.date(W.letzteErhoehung)} unverändert: Die damalige Fortschreibungsverordnung hat die Anlage zur Wohngeldverordnung nicht angefasst. Eine Sonderregel gilt für Inseln ohne Festlandanschluss, etwa die Ostfriesischen Inseln, Helgoland oder Hiddensee: Sie bekommen ein gemeinsames Mietenniveau und eine gemeinsame Stufe (§ 12 Abs. 4a WoGG).</p>

<h2>Höchstbeträge je Mietstufe</h2>
${h.table(['Stufe', '1 Person', '2 Personen', '3 Personen', '4 Personen'], hb, 'Höchstbeträge für die Bruttokaltmiete im Monat nach Anlage 1 WoGG, ohne Klimakomponente.', ['l', 'r', 'r', 'r', 'r'])}
<p>Auf diese Höchstbeträge kommt die Klimakomponente, für eine Person ${h.m2(W.klima[0])}, für vier Personen ${h.m2(W.klima[3])}. Liegt Ihre Bruttokaltmiete darüber, rechnet die Wohngeldstelle mit dem Höchstbetrag plus Klimakomponente; den Rest tragen Sie selbst. Für größere Haushalte und alle Werte siehe ${h.a('wohngeld-2026', 'Wohngeld 2026')}.</p>
<p>Die gleichen Höchstbeträge gelten für Eigentümer, die einen Lastenzuschuss beantragen: § 12 Abs. 1 WoGG spricht ausdrücklich von Höchstbeträgen für Miete und Belastung. Statt der Bruttokaltmiete zählt dann die monatliche Belastung aus Zinsen, Tilgung und Bewirtschaftungskosten der selbst genutzten Wohnung oder des Hauses, ebenfalls nur bis zum Höchstbetrag der Mietstufe. Auch für Eigentümer im Umland einer teuren Stadt kann die Stufe der eigenen Gemeinde deshalb spürbar niedriger liegen als die der Stadt.</p>

<h2>Was die Stufe am Wohngeld ändert</h2>
<p>Wie stark die Mietstufe wirkt, zeigt ein einfaches Beispiel: eine alleinstehende Person mit ${h.m(1500)} brutto und ${h.m(600)} Bruttokaltmiete, gerechnet für jede Stufe.</p>
${h.table(['Stufe', 'Berücksichtigte Miete', 'Wohngeld im Monat'], wirkung, 'Eine Person, 1.500 € brutto, 600 € Bruttokaltmiete. Eigene Berechnung nach § 19 WoGG.', ['l', 'r', 'r'])}
<p>Die gleiche Wohnung zum gleichen Preis bringt in Stufe I deutlich weniger Wohngeld als in Stufe VII, weil in den unteren Stufen nur ein Teil der Miete zählt. Erst wenn der Höchstbetrag über der tatsächlichen Miete liegt, hört der Unterschied auf: Ab dieser Stufe ändert sich das Wohngeld nicht mehr, weil die volle Miete berücksichtigt wird. Für Ihre Miete und Ihr Einkommen rechnet der kleine Rechner oben.</p>

<h2>Geplante neue Mietstufen ab 2027 (Entwurf)</h2>
<p>Der Gesetzentwurf der Bundesregierung zur Vereinfachung und Fortentwicklung des Wohngeldgesetzes vom ${h.date(E.datum)} (${h.src('btd_21_8284', `BT-Drucksache ${E.drucksache}`)}) enthält eine neue Anlage mit Mietstufen ab ${h.date(E.inkraftGeplant)}, berechnet aus der ${E.datenMietstufen}. Am ${h.date(h.TODAY)} ist dieser Entwurf nicht beschlossen. Unter den Städten unserer Liste würden sich nach dem Entwurf folgende Stufen ändern:</p>
${h.table(['Stadt', 'Stufe heute', 'Stufe nach Entwurf', 'Richtung'], neu, `Gesetzentwurf, BT-Drucksache ${E.drucksache}, nicht beschlossen. Nur Städte, deren Stufe sich ändern würde.`, ['l', 'l', 'l', 'l'])}
<p>Unverändert blieben nach dem Entwurf ${gleich.length} der ${staedte.length} Städte, darunter ${gleich.slice(0, 8).join(', ')}. Am deutlichsten wäre die Wirkung in Hamburg: Mit Stufe ${ROM[hhNeu - 1]} statt ${ROM[hh - 1]} sänke der Höchstbetrag für eine Person von ${h.m(h.WG.hoechstbetrag(1, hh))} auf ${h.m(h.WG.hoechstbetrag(1, hhNeu))}. Weil der Entwurf zugleich die Heizkostenkomponente halbieren würde, sänke das Wohngeld dort für viele Haushalte doppelt. Was der Entwurf sonst ändern würde, steht unter ${h.a('wohngeld-reform-2027', 'Wohngeldreform 2027')}.</p>
${h.box('Stand des Verfahrens', `<p>Der Bundesrat hat am ${h.date(E.bundesratStellungnahme)} Stellung genommen, die Drucksache stammt vom ${h.date(E.datum)}. Bis ein Gesetz im Bundesgesetzblatt verkündet ist, gilt die bisherige Einstufung. Diese Seite wird aktualisiert, sobald sich das ändert.</p>`, 'warning')}

<h2>Die eigene Mietstufe nachschlagen</h2>
<ol>
<li>Öffnen Sie die Anlage zur Wohngeldverordnung und wählen Sie Ihr Land. Die Gemeinden stehen dort alphabetisch, mit dem Zusatz „Stadt“ bei Städten.</li>
<li>Steht Ihre Gemeinde in der Liste, gilt die Stufe dahinter. Achten Sie auf gleichnamige Orte: Münster gibt es in Nordrhein-Westfalen als Großstadt und in Hessen als kleine Gemeinde.</li>
<li>Steht sie nicht dort, suchen Sie im zweiten Teil der Länderliste Ihren Kreis. Dessen Stufe gilt für alle nicht einzeln genannten Gemeinden.</li>
<li>Tragen Sie die Stufe im Rechner ein oder wählen Sie Ihre Stadt aus der Liste. Im Zweifel nennt die Wohngeldstelle Ihnen die Stufe am Telefon.</li>
</ol>
<p>Für Ortsteile gilt immer die Stufe der Gemeinde, zu der sie gehören, nicht die eines benachbarten Stadtteils. Wer an der Stadtgrenze wohnt, sollte deshalb prüfen, welche Gemeinde in der Meldebescheinigung steht.</p>

<h2>Drei häufige Missverständnisse</h2>
<ul>
<li><strong>„Höhere Stufe heißt höheres Wohngeld.“</strong> Nur wenn die Miete den Höchstbetrag der niedrigeren Stufe übersteigt. Liegt Ihre Miete darunter, ist die Stufe für Ihr Wohngeld gleichgültig, wie die Tabelle oben zeigt.</li>
<li><strong>„Die Mietstufe ist die Grenze für eine angemessene Wohnung.“</strong> Nein. Beim Wohngeld gibt es keine Angemessenheitsprüfung; Sie dürfen teurer wohnen und bekommen dann eben kein höheres Wohngeld. Angemessenheitsgrenzen gibt es nur beim Grundsicherungsgeld, festgelegt von der Kommune, siehe ${h.a('grundsicherung-miete', 'Miete im Grundsicherungsgeld')}.</li>
<li><strong>„Die Stufe wird jedes Jahr angepasst.“</strong> Nein, sie bleibt, bis der Gesetzgeber eine neue Anlage beschließt. Die heutige Einstufung gilt seit dem ${h.date(W.mietstufenSeit)}.</li>
</ul>

<h2>Umzug und Mietstufe</h2>
<p>Wer innerhalb eines Kreises umzieht, kann trotzdem in eine andere Stufe wechseln, weil größere Gemeinden eigene Stufen haben. Ein Umzug aus einer Großstadt ins Umland führt oft in eine niedrigere Stufe; die Miete sinkt dann meist ebenfalls, aber auch der Höchstbetrag. Einen Umzug müssen Sie der Wohngeldstelle mitteilen. Ziehen Sie in eine andere Gemeinde, ist dort eine andere Wohngeldstelle zuständig, bei der Sie einen neuen Antrag stellen. Wie das geht, erklärt ${h.a('wohngeld-antrag', 'Wohngeld beantragen')}. Für die Städte Berlin, Hamburg, München und Köln gibt es eigene Seiten mit Beispielen: ${h.a('wohngeld-berlin', 'Berlin')}, ${h.a('wohngeld-hamburg', 'Hamburg')}, ${h.a('wohngeld-muenchen', 'München')}, ${h.a('wohngeld-koeln', 'Köln')}.</p>
`;
  },
});
