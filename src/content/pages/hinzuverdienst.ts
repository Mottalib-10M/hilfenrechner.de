import { definePage } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';
import { erwerbsfreibetrag } from '../../lib/engine/grundsicherung';

const ST = P.gsg.freibetrag.stufen as number[][];

export default definePage({
  id: 'hinzuverdienst',
  group: 'grundsicherung',
  order: 15,
  slug: 'hinzuverdienst',
  nav: 'Hinzuverdienst und Freibeträge',
  card: 'Wie viel vom Lohn neben dem Grundsicherungsgeld bleibt, Stufe für Stufe.',
  title: 'Hinzuverdienst Grundsicherungsgeld 2026: was vom Lohn bleibt',
  description: `Hinzuverdienst im Grundsicherungsgeld: Grundfreibetrag ${P.gsg.freibetrag.grund} €, dann ${ST.map((s) => Math.round(s[2] * 100)).join(', ').replace(/, (\d+)$/, ' und $1')} Prozent, höchstens ${erwerbsfreibetrag(9999, false)} € oder ${erwerbsfreibetrag(9999, true)} € mit Kind, Minijob, unter 25 Jahren.`,
  h1: 'Hinzuverdienst: wie viel Sie vom Lohn behalten',
  intro: 'Wer neben dem Grundsicherungsgeld arbeitet, behält einen Teil des Lohns. Der kleine Rechner zeigt Ihren Freibetrag.',
  mini: { kind: 'mini:hinzuverdienst' },
  related: ['aufstocker', 'grundsicherungsgeld-rechner', 'wohngeld-oder-grundsicherung', 'buergergeld-2026', 'elterngeld-und-sozialleistungen'],
  sources: ['sgb2_11b', 'sgb2_11a', 'sgb2_11', 'sgb4_8', 'sgb4_20', 'ba_weisung_202604002'],
  resume: (h) => {
    const F = h.P.gsg.freibetrag; const S = F.stufen as number[][];
    return `Vom Lohn bleiben im Grundsicherungsgeld zuerst ${h.m(F.grund)} im Monat frei; dieser Grundfreibetrag ersetzt die Pauschalen für Versicherungen, Altersvorsorge und Fahrtkosten. Vom Bruttolohn zwischen ${h.m(S[0][0])} und ${h.m(S[0][1])} bleiben zusätzlich ${h.pc(S[0][2])}, zwischen ${h.m(S[1][0])} und ${h.m(S[1][1])} ${h.pc(S[1][2])}, zwischen ${h.m(S[2][0])} und ${h.m(F.obenOhne)} ${h.pc(S[2][2])}; mit einem minderjährigen Kind reicht die letzte Stufe bis ${h.m(F.obenKind)}. Der höchste Freibetrag liegt damit bei ${h.m(h.GSG.erwerbsfreibetrag(9999, false))} ohne und ${h.m(h.GSG.erwerbsfreibetrag(9999, true))} mit Kind (§ 11b SGB II). Alles, was vom Netto darüber hinaus bleibt, wird angerechnet. Ein Minijob von ${h.m(h.P.sv.geringfuegig)} bringt damit ${h.m2(h.GSG.erwerbsfreibetrag(h.P.sv.geringfuegig, false))} mehr im Monat, ein Lohn von ${h.m(1200)} brutto ${h.m2(h.GSG.erwerbsfreibetrag(1200, false))}. Für Schülerinnen und Schüler, Auszubildende, Studierende und Freiwilligendienstleistende unter 25 Jahren ersetzt die Minijob-Grenze von ${h.m(h.P.sv.geringfuegig)} den Grundfreibetrag. Die Stufen hat die Reform vom Juli 2026 nicht verändert.`;
  },
  faqs: (h) => [
    { q: 'Rechnet das Jobcenter den Freibetrag vom Brutto oder vom Netto?', a: `Die Stufen werden am Bruttolohn gemessen, abgezogen wird der Freibetrag aber vom Nettolohn, also nach Steuern und Sozialabgaben. Bei ${h.m(1000)} brutto beträgt der Freibetrag ${h.m(h.GSG.erwerbsfreibetrag(1000, false))}. Ist das Netto ${h.m(Math.round(h.NT.netto({ brutto: 1000 }).netto))}, werden ${h.m(Math.round(h.NT.netto({ brutto: 1000 }).netto - h.GSG.erwerbsfreibetrag(1000, false)))} als Einkommen angerechnet. Der Freibetrag ist nie höher als das Netto selbst.` },
    { q: 'Kann ich höhere Fahrtkosten als 100 Euro geltend machen?', a: `Ja, wenn Ihr Lohn über ${h.m(h.P.gsg.freibetragGrundNachweisAb)} brutto liegt. Dann können Sie statt des Grundfreibetrags die tatsächlichen Kosten für Fahrten, Versicherungen und Altersvorsorge nachweisen, wenn sie zusammen mehr als ${h.m(h.P.gsg.freibetrag.grund)} ausmachen (§ 11b Abs. 2 Satz 2). Darunter gilt immer die Pauschale, auch wenn die Kosten höher sind.` },
    { q: 'Wird ein Ferienjob meines Kindes angerechnet?', a: 'Einnahmen von Schülerinnen und Schülern allgemein- oder berufsbildender Schulen aus Ferienjobs bleiben nach § 11a Abs. 7 SGB II anrechnungsfrei. Für Arbeit außerhalb der Ferien gilt der höhere Freibetrag für junge Menschen unter 25, also die Minijob-Grenze statt des Grundfreibetrags. Auch drei Monate nach dem Schulabschluss gilt diese Regel noch.' },
    { q: 'Lohnt es sich, von 520 auf 1.000 Euro Lohn zu gehen?', a: `Ja, in diesem Bereich bleibt am meisten: ${h.pc((h.P.gsg.freibetrag.stufen as number[][])[1][2])} jedes zusätzlichen Bruttoeuros, abzüglich der Sozialabgaben im Übergangsbereich. Der Freibetrag steigt von ${h.m(h.GSG.erwerbsfreibetrag(520, false))} auf ${h.m(h.GSG.erwerbsfreibetrag(1000, false))}. Zugleich steigen Ihre Rentenansprüche, und ab einem bestimmten Lohn kann Wohngeld günstiger werden als Grundsicherungsgeld, weil es den Lohn weniger stark anrechnet.` },
  ],
  body: (h) => {
    const stufen = [100, 300, 520, 603, 800, 1000, 1200, 1500, 2000];
    const rows = stufen.map((b) => { const n = h.NT.netto({ brutto: b }).netto; const f = Math.min(n, h.GSG.erwerbsfreibetrag(b, false)); const fk = Math.min(h.NT.netto({ brutto: b, kinder: 1 }).netto, h.GSG.erwerbsfreibetrag(b, true)); return [h.m(b), h.m2(n), h.m2(f), h.m2(fk), h.m2(n - f)]; });
    const F = h.P.gsg.freibetrag; const S = F.stufen as number[][];
    return `
<h2>Die Stufen des Freibetrags</h2>
${h.table(['Teil des Bruttolohns', 'Davon frei', 'Höchstens in der Stufe'], [
  [`bis ${h.m(F.grund)}`, h.pc(1), h.m(F.grund)],
  [`${h.m(S[0][0])} bis ${h.m(S[0][1])}`, h.pc(S[0][2]), h.m((S[0][1] - S[0][0]) * S[0][2])],
  [`${h.m(S[1][0])} bis ${h.m(S[1][1])}`, h.pc(S[1][2]), h.m((S[1][1] - S[1][0]) * S[1][2])],
  [`${h.m(S[2][0])} bis ${h.m(F.obenOhne)} (mit Kind ${h.m(F.obenKind)})`, h.pc(S[2][2]), `${h.m((F.obenOhne - S[2][0]) * S[2][2])} (${h.m((F.obenKind - S[2][0]) * S[2][2])})`],
  ['darüber', h.pc(0), '–'],
], `§ 11b Abs. 2 und 3 SGB II. ${h.src('sgb2_11b', 'Gesetzestext')}.`, ['l', 'r', 'r'])}

<h2>Was bei welchem Lohn bleibt</h2>
<p>Die Tabelle zeigt für typische Löhne das geschätzte Netto (Steuerklasse I, gesetzlich versichert), den Freibetrag ohne und mit minderjährigem Kind und den Betrag, der ohne Kind auf das Grundsicherungsgeld angerechnet wird.</p>
${h.table(['Brutto', 'Netto', 'Freibetrag', 'mit Kind', 'angerechnet'], rows, `Netto mit Lohnsteuer und Sozialversicherung 2026; Minijob mit eigenem Rentenbeitrag, Übergangsbereich bis ${h.m(h.P.sv.uebergangBis)}.`, ['r', 'r', 'r', 'r', 'r'])}
<p>Beim Minijob bleibt mehr vom Netto übrig, weil vom Lohn bis ${h.m(h.P.sv.geringfuegig)} nur der eigene Rentenbeitrag abgeht; wer sich davon befreien lässt, hat ein etwas höheres Netto, aber der Freibetrag ändert sich nicht. Ab dem Übergangsbereich steigen die Abzüge langsam. Ab ${h.m(F.obenOhne)} brutto (mit Kind ${h.m(F.obenKind)}) bleibt vom zusätzlichen Lohn nichts mehr im Grundsicherungsgeld; jeder weitere Euro senkt den Anspruch um das, was netto davon ankommt. Ab hier lohnt der Blick auf das Wohngeld (${h.a('aufstocker', 'Aufstocken')}).</p>
<!--tool:haushalt|{"paar":false,"kinder":"","brutto1":800,"miete":470,"heizung":70,"ort":"stufe-3"}-->

<h2>Sonderregel für junge Menschen unter 25</h2>
<p>Seit 2023 gilt für junge Menschen in Ausbildung ein höherer Freibetrag (§ 11b Abs. 2b SGB II). Wer das 25. Lebensjahr noch nicht vollendet hat und</p>
<ul>
<li>eine nach BAföG oder SGB III förderfähige Ausbildung macht oder studiert,</li>
<li>eine berufsvorbereitende Maßnahme oder Einstiegsqualifizierung besucht,</li>
<li>einen Bundesfreiwilligendienst oder ein freiwilliges soziales oder ökologisches Jahr leistet, oder</li>
<li>als Schülerin oder Schüler außerhalb der Ferien arbeitet, auch bis drei Monate nach der Schule,</li>
</ul>
<p>bekommt statt der ${h.m(F.grund)} einen Grundfreibetrag in Höhe der Minijob-Grenze von ${h.m(h.P.sv.geringfuegig)}. Darüber gelten die normalen Stufen. Ein Azubi mit ${h.m(900)} Ausbildungsvergütung behält so deutlich mehr als eine erwachsene Person mit gleichem Lohn. Ferienjobs von Schülerinnen und Schülern bleiben ganz frei.</p>

<h2>Was nicht als Erwerbseinkommen zählt</h2>
<p>Die Freibeträge gelten nur für Einkommen aus Arbeit, also Lohn, Gehalt, Ausbildungsvergütung und Gewinn aus selbständiger Tätigkeit. Arbeitslosengeld, Krankengeld, Renten, Unterhalt und Elterngeld sind kein Erwerbseinkommen; die gestaffelten Freibeträge gelten dafür nicht. Beim Elterngeld bleibt ein Betrag bis zur Höhe des Einkommens vor der Geburt frei, höchstens ${h.m(h.P.elterngeld.freibetragSgb2)} (${h.a('elterngeld-und-sozialleistungen', 'Elterngeld und Sozialleistungen')}). Mutterschaftsgeld vom Bundesamt für Soziale Sicherung zählt gar nicht.</p>

<h2>Schwankender Lohn und vorläufige Bescheide</h2>
<p>Wer jeden Monat anders verdient, etwa mit Schichtzulagen oder auf Abruf, bekommt meist einen vorläufigen Bescheid für ${h.P.gsg.bewilligungKurzMonate} Monate. Das Jobcenter schätzt den Lohn und zahlt danach. Am Ende rechnet es mit den tatsächlichen Abrechnungen ab: Haben Sie mehr verdient, müssen Sie zurückzahlen, haben Sie weniger verdient, gibt es eine Nachzahlung. Reichen Sie die Lohnabrechnungen deshalb jeden Monat ein, dann bleiben die Beträge klein.</p>

<h2>Freibetrag und Wechsel in Wohngeld oder Kinderzuschlag</h2>
<p>Der Freibetrag spielt auch beim Kinderzuschlag eine Rolle. Dort zählt das Einkommen der Eltern ebenfalls erst nach Abzug der Freibeträge nach § 11b; was über dem Bedarf der Eltern liegt, mindert den Kinderzuschlag nur zu ${h.pc(h.P.kiz.anrechnungEltern)}. Das ist einer der Gründe, warum Familien mit steigendem Lohn vom Grundsicherungsgeld in den Kinderzuschlag wechseln. Beim Wohngeld gibt es keine Freibeträge in Stufen, aber pauschale Abzüge von 10 Prozent je gezahlter Steuer- und Sozialversicherungsart.</p>

<h2>Rechenbeispiel Schritt für Schritt</h2>
<p>Eine alleinstehende Person verdient ${h.m(900)} brutto in Teilzeit. So rechnet das Jobcenter:</p>
<ol>
<li>Netto aus dem Lohn: etwa ${h.m2(h.NT.netto({ brutto: 900 }).netto)} nach den Abzügen im Übergangsbereich.</li>
<li>Grundfreibetrag: ${h.m(F.grund)}.</li>
<li>Zweite Stufe: ${h.pc(S[0][2])} von ${h.m(S[0][1] - S[0][0])} (dem Teil zwischen ${h.m(S[0][0])} und ${h.m(S[0][1])}) = ${h.m2((S[0][1] - S[0][0]) * S[0][2])}.</li>
<li>Dritte Stufe: ${h.pc(S[1][2])} von ${h.m(900 - S[1][0])} (dem Teil zwischen ${h.m(S[1][0])} und ${h.m(900)}) = ${h.m2((900 - S[1][0]) * S[1][2])}.</li>
<li>Freibetrag zusammen: ${h.m2(h.GSG.erwerbsfreibetrag(900, false))}.</li>
<li>Angerechnet: Netto minus Freibetrag = ${h.m2(h.NT.netto({ brutto: 900 }).netto - h.GSG.erwerbsfreibetrag(900, false))}.</li>
</ol>
<p>Das Grundsicherungsgeld sinkt um den angerechneten Betrag. Im Vergleich zu einem Monat ohne Arbeit hat die Person den Freibetrag mehr im Geldbeutel.</p>

<h2>Paare: zwei Freibeträge</h2>
<p>Arbeiten beide Partner, bekommt jede Person ihren eigenen Freibetrag, berechnet aus ihrem eigenen Bruttolohn. Zwei Teilzeitstellen von je ${h.m(600)} bringen deshalb mehr als eine Stelle mit ${h.m(1200)}: zweimal ${h.m2(h.GSG.erwerbsfreibetrag(600, true))} statt einmal ${h.m2(h.GSG.erwerbsfreibetrag(1200, true))}, wenn ein minderjähriges Kind im Haushalt lebt. Das Jobcenter wird trotzdem eher auf eine Ausweitung der Stunden drängen, weil sie die Hilfebedürftigkeit stärker senkt.</p>

<h2>Selbständige</h2>
<p>Bei selbständiger Arbeit zählt der Gewinn, also die Betriebseinnahmen minus die notwendigen Ausgaben, verteilt auf den Bewilligungszeitraum. Das Jobcenter entscheidet fast immer vorläufig auf Grundlage Ihrer Prognose und rechnet nach Ablauf mit der abschließenden Erklärung ab. Auf den Gewinn gelten dieselben Freibeträge wie auf Lohn. Nach einem Jahr ununterbrochenen Bezugs prüft das Jobcenter, ob die Selbständigkeit die Hilfebedürftigkeit absehbar beenden kann; sonst kann es auf eine Beschäftigung verweisen (§ 10 Abs. 2 Nr. 5 SGB II).</p>

<h2>Ehrenamt und steuerfreie Aufwandsentschädigung</h2>
<p>Aufwandsentschädigungen aus nebenberuflicher Tätigkeit, die nach dem Einkommensteuergesetz als Übungsleiter- oder Ehrenamtspauschale steuerfrei sind, bleiben bis zur Höhe der Übungsleiterpauschale im Jahr anrechnungsfrei (§ 11a Abs. 1 Nr. 5 SGB II). Das betrifft etwa Trainerinnen im Sportverein, Chorleiter oder Ehrenamtliche in der Pflege. Was darüber liegt, wird wie Lohn behandelt.</p>

<h2>Einkommen aus Minijob: was der Arbeitgeber trägt</h2>
<p>Im Minijob bis ${h.m(h.P.sv.geringfuegig)} zahlt der Arbeitgeber Pauschalbeiträge zur Renten- und Krankenversicherung und meist eine Pauschalsteuer. Sie selbst zahlen nur den Unterschied zum vollen Rentenbeitrag, wenn Sie sich nicht befreien lassen. Der Mindestlohn von ${h.m2(h.P.sv.mindestlohn)} gilt auch im Minijob; bei ${h.m(h.P.sv.geringfuegig)} im Monat sind das höchstens ${Math.floor(h.P.sv.geringfuegig / h.P.sv.mindestlohn)} Stunden. Für das Jobcenter zählt das Netto, also der Lohn abzüglich Ihres Rentenanteils.</p>

<h2>Wie die Anrechnung im Monat funktioniert</h2>
<p>Das Jobcenter rechnet Lohn in dem Monat an, in dem er auf dem Konto eingeht, nicht in dem Monat, für den er gezahlt wird. Wer Ende Januar den Lohn für Januar bekommt, hat ihn im Januar als Einkommen; wer ihn Mitte Februar bekommt, im Februar. Bei einer neuen Stelle gibt es deshalb oft einen Monat ohne Lohn und einen Monat mit Lohn; der Bescheid wird entsprechend angepasst. Nachzahlungen für frühere Monate, etwa eine Tariferhöhung rückwirkend, zählen als einmalige Einnahme im Monat des Zuflusses. Würde der Anspruch dadurch in diesem Monat ganz entfallen, verteilt das Jobcenter die Einnahme auf sechs Monate.</p>

<h2>Lohn, Kinderzuschlag und Wohngeld im Vergleich</h2>
<p>Ab welchem Lohn sich der Wechsel aus dem Grundsicherungsgeld lohnt, hängt an der Anrechnung. Im Grundsicherungsgeld wird jeder Euro über dem Freibetrag voll angerechnet; im Kinderzuschlag mindern Einkommen über dem Bedarf der Eltern den Zuschlag nur zu ${h.pc(h.P.kiz.anrechnungEltern)}; beim Wohngeld sinkt die Leistung mit dem Einkommen nach der Formel des § 19 WoGG, meist um weniger als die Hälfte des zusätzlichen Einkommens. Wer zwischen den Wegen steht, behält im Wohngeld und im Kinderzuschlag mehr von einer Lohnerhöhung.</p>

<h2>Freibetrag und Kinderzuschlag</h2>
<p>Die Freibeträge gelten nicht nur im Grundsicherungsgeld. Beim Kinderzuschlag rechnet die Familienkasse das Einkommen der Eltern ebenfalls nach Abzug der Freibeträge des § 11b, bevor sie es mit dem Bedarf der Eltern vergleicht. Und die 100-Euro-Regel des Kinderzuschlags setzt voraus, dass sich aus dem Erwerbseinkommen Absetzbeträge von mindestens ${h.m(h.P.kiz.luecke)} ergeben. Wer arbeitet, erfüllt diese Voraussetzung schon mit einem kleinen Lohn. Die Seite ${h.a('vorrangpruefung', 'Vorrangprüfung')} erklärt, wie diese Regel die Wahl zwischen den Leistungen öffnet.</p>
`;
  },
});
