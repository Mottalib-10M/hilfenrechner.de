import { definePage } from '../../lib/guide-types';
import { P } from '../../lib/engine/params';

const pz = (x: number) => Math.round(x * 100);

export default definePage({
  id: 'mehrbedarf',
  group: 'grundsicherung',
  order: 18,
  slug: 'mehrbedarf',
  nav: 'Mehrbedarf: Alleinerziehende, Schwangere, Warmwasser',
  card: 'Alle Mehrbedarfe des § 21 SGB II mit Prozentsatz und Betrag 2026.',
  title: 'Mehrbedarf Grundsicherungsgeld 2026: Beträge und Anspruch',
  description: `Mehrbedarf im Grundsicherungsgeld 2026: Alleinerziehende ${pz(P.gsg.mehrbedarfAE.jeKind)} bis ${pz(P.gsg.mehrbedarfAE.max)} Prozent, Schwangere ${pz(P.gsg.mehrbedarfSchwanger)} Prozent, Behinderung, Ernährung, Warmwasser, Schulbücher, Beträge.`,
  h1: 'Mehrbedarf: Zuschläge zum Regelbedarf',
  intro: 'Wer besondere Ausgaben hat, die der Regelbedarf nicht deckt, bekommt einen Mehrbedarf. Für Alleinerziehende rechnet der kleine Rechner den Betrag aus.',
  mini: { kind: 'mini:mehrbedarf' },
  related: ['alleinerziehend-leistungen', 'buergergeld-2026', 'grundsicherungsgeld-rechner', 'bildung-und-teilhabe', 'mutterschaftsgeld'],
  sources: ['sgb2_21', 'sgb2_20', 'rbsfv_2026', 'sgb2_24'],
  resume: (h) => {
    const M = h.P.gsg.mehrbedarfAE; const R = h.P.regelbedarf;
    return `Mehrbedarfe nach § 21 SGB II werden zusätzlich zum Regelbedarf anerkannt. Alleinerziehende erhalten ${h.pc(M.hoch)} des Regelbedarfs der Stufe 1 (${h.m2(R.rbs1 * M.hoch)}), wenn sie mit einem Kind unter 7 Jahren oder mit zwei oder drei Kindern unter 16 zusammenleben; sonst ${h.pc(M.jeKind)} je minderjährigem Kind (${h.m2(R.rbs1 * M.jeKind)}), wenn das mehr ergibt, höchstens ${h.pc(M.max)} (${h.m2(R.rbs1 * M.max)}). Schwangere bekommen ab der 13. Schwangerschaftswoche bis zum Ende des Entbindungsmonats ${h.pc(h.P.gsg.mehrbedarfSchwanger)} ihres Regelbedarfs, bei Stufe 1 also ${h.m2(R.rbs1 * h.P.gsg.mehrbedarfSchwanger)}. Erwerbsfähige Menschen mit Behinderung, die Leistungen zur Teilhabe am Arbeitsleben erhalten, bekommen ${h.pc(h.P.gsg.mehrbedarfBehinderung)}. Dazu kommen Mehrbedarfe für kostenaufwendige Ernährung in angemessener Höhe, für dezentrale Warmwasserbereitung (${h.pc(h.P.gsg.warmwasser.kind0bis6)} bis ${h.pc(h.P.gsg.warmwasser.erwachsen)} des Regelbedarfs), für Schulbücher und für einen unabweisbaren laufenden Sonderbedarf. Die Mehrbedarfe für Schwangerschaft, Alleinerziehung, Behinderung und Ernährung dürfen zusammen den Regelbedarf nicht übersteigen.`;
  },
  faqs: (h) => [
    { q: 'Bekomme ich den Mehrbedarf für Alleinerziehende auch beim Wechselmodell?', a: 'Bei einem echten Wechselmodell, in dem das Kind etwa gleich viel Zeit bei beiden Eltern verbringt, wird der Mehrbedarf nach der Rechtsprechung des Bundessozialgerichts in der Regel hälftig aufgeteilt. Betreut ein Elternteil das Kind überwiegend, steht ihm der volle Mehrbedarf zu. Entscheidend ist, wer tatsächlich die Pflege und Erziehung allein trägt.' },
    { q: 'Ab wann gilt der Mehrbedarf für Schwangere?', a: `Nach der zwölften Schwangerschaftswoche, also ab der 13. Woche, bis zum Ende des Monats, in den die Entbindung fällt. Reichen Sie den Mutterpass oder eine ärztliche Bescheinigung mit dem errechneten Termin ein. Der Betrag beträgt ${h.pc(h.P.gsg.mehrbedarfSchwanger)} des eigenen Regelbedarfs: bei einer alleinstehenden Schwangeren ${h.m2(h.P.regelbedarf.rbs1 * h.P.gsg.mehrbedarfSchwanger)}, bei einer Partnerin ${h.m2(h.P.regelbedarf.rbs2 * h.P.gsg.mehrbedarfSchwanger)}.` },
    { q: 'Wie wird der Mehrbedarf für Warmwasser berechnet?', a: `Nur wenn das Warmwasser in der Wohnung erzeugt wird, etwa mit Boiler oder Durchlauferhitzer, und deshalb nicht in den Heizkosten steckt. Je Person gibt es einen Prozentsatz ihres Regelbedarfs: ${h.pc(h.P.gsg.warmwasser.erwachsen)} für Erwachsene, ${h.pc(h.P.gsg.warmwasser.jahr15)} für Jugendliche von 14 bis 17, ${h.pc(h.P.gsg.warmwasser.kind7bis14)} von 6 bis 13 und ${h.pc(h.P.gsg.warmwasser.kind0bis6)} unter 6 Jahren.` },
  ],
  body: (h) => {
    const R = h.P.regelbedarf; const M = h.P.gsg.mehrbedarfAE; const W = h.P.gsg.warmwasser;
    const ae = [[[3], 'Ein Kind, 3 Jahre'], [[9], 'Ein Kind, 9 Jahre'], [[8, 12], 'Zwei Kinder, 8 und 12'], [[10, 17], 'Zwei Kinder, 10 und 17'], [[4, 9, 14], 'Drei Kinder, 4, 9 und 14'], [[8, 11, 14, 16], 'Vier Kinder, 8 bis 16'], [[2, 5, 8, 11, 14], 'Fünf Kinder']] as Array<[number[], string]>;
    return `
<h2>Mehrbedarf für Alleinerziehende</h2>
<p>Der Mehrbedarf steht Personen zu, die mit einem oder mehreren minderjährigen Kindern zusammenleben und allein für deren Pflege und Erziehung sorgen (§ 21 Abs. 3 SGB II). Die Regel hat zwei Rechenwege; das Jobcenter nimmt den günstigeren.</p>
${h.table(['Kinder', 'Satz', 'Betrag im Monat'], ae.map(([k, n]) => { const b = h.GSG.mehrbedarfAlleinerziehend(k); return [n, h.pc(b / R.rbs1), h.m2(b)]; }), `Bezugsgröße: Regelbedarf Stufe 1, ${h.m(R.rbs1)}.`, ['l', 'r', 'r'])}
<p>Erster Weg: ${h.pc(M.hoch)}, wenn mindestens ein Kind unter 7 Jahren oder zwei oder drei Kinder unter 16 Jahren im Haushalt leben. Zweiter Weg: ${h.pc(M.jeKind)} für jedes minderjährige Kind, wenn das mehr ergibt, höchstens ${h.pc(M.max)}. Ein einzelnes Kind ab 7 Jahren bringt also nur ${h.pc(M.jeKind)}; zwei Kinder von 16 und 17 Jahren ${h.pc(M.jeKind * 2)}. Ab fünf Kindern ist die Grenze von ${h.pc(M.max)} erreicht.</p>

<h2>Weitere Mehrbedarfe</h2>
${h.table(['Mehrbedarf', 'Höhe', 'Voraussetzung'], [
  ['Schwangerschaft', `${h.pc(h.P.gsg.mehrbedarfSchwanger)} des Regelbedarfs`, 'ab der 13. Schwangerschaftswoche bis zum Ende des Entbindungsmonats (§ 21 Abs. 2)'],
  ['Behinderung', `${h.pc(h.P.gsg.mehrbedarfBehinderung)} des Regelbedarfs`, 'erwerbsfähig und Leistungen zur Teilhabe am Arbeitsleben oder Eingliederungshilfe (§ 21 Abs. 4), auch eine Übergangszeit danach'],
  ['Kostenaufwendige Ernährung', 'angemessene Höhe', 'aus medizinischen Gründen, mit ärztlicher Bescheinigung (§ 21 Abs. 5)'],
  ['Unabweisbarer laufender Sonderbedarf', 'tatsächlicher Bedarf', 'erheblich über dem Durchschnitt und nicht anders gedeckt, etwa Fahrtkosten zum Umgang mit Kindern (§ 21 Abs. 6)'],
  ['Schulbücher', 'tatsächliche Kosten', 'wenn die Schule Anschaffung oder Ausleihe vorschreibt (§ 21 Abs. 6a)'],
  ['Dezentrale Warmwasserbereitung', `${h.pc(W.kind0bis6)} bis ${h.pc(W.erwachsen)} je Person`, 'Warmwasser wird in der Wohnung erzeugt (§ 21 Abs. 7)'],
], undefined, ['l', 'l', 'l'])}
<p>Die Mehrbedarfe für Schwangerschaft, Alleinerziehung, Behinderung und Ernährung dürfen zusammen nicht höher sein als der Regelbedarf der Person (§ 21 Abs. 8). Die Mehrbedarfe für Sonderbedarf, Schulbücher und Warmwasser zählen nicht zu dieser Grenze.</p>

<h2>Warmwasser je Person</h2>
${h.table(['Person', 'Regelbedarf', 'Satz', 'Mehrbedarf'], [
  ['Alleinstehend (Stufe 1)', R.rbs1, W.erwachsen], ['Partner (Stufe 2)', R.rbs2, W.erwachsen], ['Erwachsen unter 25 bei Eltern (Stufe 3)', R.rbs3, W.erwachsen],
  ['Jugendlich 14 bis 17 (Stufe 4)', R.rbs4, W.jahr15], ['Kind 6 bis 13 (Stufe 5)', R.rbs5, W.kind7bis14], ['Kind unter 6 (Stufe 6)', R.rbs6, W.kind0bis6],
].map(([n, rb, s]) => [n as string, h.m(rb as number), h.pc(s as number, 1), h.m2((rb as number) * (s as number))]), 'Höhere Kosten nur mit separater Messeinrichtung.', ['l', 'r', 'r', 'r'])}

<h2>Was kein Mehrbedarf ist</h2>
<p>Einmalige Anschaffungen wie die Erstausstattung einer Wohnung, Babyausstattung, Umstandskleidung oder orthopädische Schuhe sind keine Mehrbedarfe, sondern eigene Leistungen nach § 24 Abs. 3 SGB II. Sie werden gesondert beantragt und oft als Pauschale gezahlt. Leistungen für Bildung und Teilhabe der Kinder, etwa Klassenfahrten oder Mittagessen, stehen in § 28 und auf der Seite ${h.a('bildung-und-teilhabe', 'Bildung und Teilhabe')}. Und eine kaputte Waschmaschine gehört zum Regelbedarf; hier hilft nur ein Darlehen.</p>

<h2>Mehrbedarf und die Wahl zwischen den Leistungen</h2>
<p>Der Mehrbedarf für Alleinerziehende erhöht den Bedarf im Grundsicherungsgeld. Beim Kinderzuschlag geht er in den Bedarf der Eltern ein und erhöht damit die Grenze, ab der Einkommen den Kinderzuschlag mindert. Das Wohngeld kennt keinen Mehrbedarf, aber einen Freibetrag für Alleinerziehende. Wer allein mit einem kleinen Kind lebt, bleibt durch den Mehrbedarf häufiger beim Grundsicherungsgeld als ein Paar mit gleichem Einkommen. Der Rechner auf der Seite ${h.a('alleinerziehend-leistungen', 'Leistungen für Alleinerziehende')} zeigt den Übergang für verschiedene Löhne.</p>

<h2>Antrag</h2>
<p>Den Mehrbedarf für Alleinerziehende berücksichtigt das Jobcenter automatisch, wenn aus dem Antrag hervorgeht, dass Sie allein mit Kindern leben. Für Schwangerschaft, Behinderung, Ernährung und Warmwasser brauchen Sie Nachweise: Mutterpass, Bescheid über Teilhabeleistungen, ärztliche Bescheinigung oder Angaben zur Warmwasserbereitung aus dem Mietvertrag oder der Nebenkostenabrechnung. Ein vergessener Mehrbedarf kann mit einem Überprüfungsantrag nachträglich geltend gemacht werden.</p>

<h2>Ein Haushalt mit mehreren Mehrbedarfen</h2>
<p>Mehrbedarfe addieren sich. Eine schwangere Alleinerziehende mit einem Kind von 3 Jahren erhält den Mehrbedarf für Alleinerziehende von ${h.m2(h.GSG.mehrbedarfAlleinerziehend([3]))} und ab der 13. Schwangerschaftswoche den Mehrbedarf für Schwangere von ${h.m2(R.rbs1 * h.P.gsg.mehrbedarfSchwanger)}, zusammen ${h.m2(h.GSG.mehrbedarfAlleinerziehend([3]) + R.rbs1 * h.P.gsg.mehrbedarfSchwanger)} im Monat zusätzlich zu ihrem Regelbedarf von ${h.m(R.rbs1)}. Wird in der Wohnung das Warmwasser mit einem Durchlauferhitzer erzeugt, kommen für sie ${h.m2(R.rbs1 * W.erwachsen)} und für das Kind ${h.m2(R.rbs6 * W.kind0bis6)} dazu. Nach der Geburt fällt der Mehrbedarf für Schwangere mit dem Ende des Entbindungsmonats weg; mit zwei Kindern unter 7 bleibt es beim Mehrbedarf für Alleinerziehende von ${h.pc(M.hoch)}, für die Erstausstattung des Babys gibt es eine eigene Leistung.</p>

<h2>Kostenaufwendige Ernährung</h2>
<p>Das Gesetz nennt keine Beträge, sondern „angemessene Höhe“. Die Jobcenter orientieren sich an den Empfehlungen des Deutschen Vereins für öffentliche und private Fürsorge, die für bestimmte Erkrankungen einen Mehrbedarf als Prozentsatz des Regelbedarfs vorsehen, etwa bei Zöliakie, Mukoviszidose oder bestimmten schweren Erkrankungen mit Mangelernährung. Für häufige Erkrankungen wie Diabetes oder Bluthochdruck sehen die Empfehlungen in der Regel keinen Mehrbedarf vor, weil eine gesunde Vollkost ausreicht. Entscheidend ist die ärztliche Bescheinigung mit Diagnose und der Begründung, warum eine besondere Ernährung nötig ist.</p>

<h2>Unabweisbarer laufender Sonderbedarf</h2>
<p>§ 21 Abs. 6 SGB II ist eine Auffangregel für Bedarfe, die nicht im Regelbedarf vorgesehen sind und erheblich vom Durchschnitt abweichen. Die Gerichte haben ihn unter anderem anerkannt für Fahrtkosten, um getrennt lebende Kinder zu sehen, für besondere Hygieneartikel bei bestimmten Erkrankungen und für nicht verschreibungspflichtige Arznei, die medizinisch notwendig ist und von der Kasse nicht bezahlt wird. Auch einmalige Bedarfe können darunter fallen, wenn ein Darlehen nicht zumutbar ist. Beantragen Sie den Mehrbedarf schriftlich mit einer Aufstellung der Kosten.</p>

<h2>Mehrbedarf wegen Behinderung</h2>
<p>Den Mehrbedarf von ${h.pc(h.P.gsg.mehrbedarfBehinderung)} gibt es nicht schon wegen einer anerkannten Schwerbehinderung, sondern nur, wenn Sie als erwerbsfähige Person Leistungen zur Teilhabe am Arbeitsleben erhalten, etwa eine Umschulung, eine Ausbildung in einem Berufsbildungswerk oder eine unterstützte Beschäftigung. Er kann nach dem Ende der Maßnahme für eine Übergangszeit weiterlaufen, vor allem während der Einarbeitung. Nicht erwerbsfähige Menschen mit dem Merkzeichen G erhalten einen ähnlichen Mehrbedarf nach dem Zwölften Buch beim Sozialamt.</p>

<h2>Erstausstattung: keine Mehrbedarfe, aber eigene Leistungen</h2>
<p>Viele verwechseln Mehrbedarfe mit den einmaligen Leistungen nach § 24 Abs. 3 SGB II. Diese gibt es für die Erstausstattung einer Wohnung mit Haushaltsgeräten, etwa nach einer Trennung, einem Wohnungsbrand oder dem ersten eigenen Haushalt, für die Erstausstattung mit Bekleidung, für die Ausstattung bei Schwangerschaft und Geburt, also Umstandskleidung, Kinderwagen, Babybett und Erstlingsausstattung, und für orthopädische Schuhe sowie Reparaturen therapeutischer Geräte. Die Jobcenter zahlen dafür meist Pauschalen, die jede Kommune selbst festlegt. Das Besondere: Diese Leistungen gibt es auch für Menschen, die sonst kein Grundsicherungsgeld bekommen, wenn sie den Bedarf aus eigenem Einkommen nicht decken können. Das Jobcenter darf dann Einkommen der folgenden sechs Monate berücksichtigen. Beantragen Sie die Erstausstattung, bevor Sie die Dinge kaufen.</p>

<h2>Mehrbedarf und Kinderzuschlag</h2>
<p>Beim Kinderzuschlag rechnet die Familienkasse den Bedarf der Eltern nach den Regeln des SGB II, und dazu gehören die Mehrbedarfe. Der Mehrbedarf für Alleinerziehende erhöht deshalb den Bedarf, bis zu dem das Einkommen den Kinderzuschlag nicht mindert. Für eine Alleinerziehende mit einem Kind unter 7 Jahren sind das ${h.m2(h.GSG.mehrbedarfAlleinerziehend([3]))} mehr Spielraum. Ein Mehrbedarf für Schwangerschaft wird ebenfalls berücksichtigt, wenn Sie ihn der Familienkasse nachweisen. Der Rechner auf dieser Website rechnet den Mehrbedarf für Alleinerziehende beim Kinderzuschlag automatisch ein, die übrigen Mehrbedarfe nicht.</p>

<h2>Nachträglich geltend machen</h2>
<p>Wurde ein Mehrbedarf im Bescheid vergessen, können Sie innerhalb eines Monats Widerspruch einlegen. Ist die Frist vorbei, stellen Sie einen Überprüfungsantrag nach § 44 SGB X; im Grundsicherungsgeld zahlt das Jobcenter dann für das laufende und das vorangegangene Kalenderjahr nach. Bei Schwangerschaft melden Sie die Schwangerschaft mit dem Mutterpass, sobald die zwölfte Woche vorbei ist; dann zahlt das Jobcenter den Mehrbedarf ohne Umweg über einen Widerspruch.</p>

<h2>Welche Nachweise welcher Mehrbedarf braucht</h2>
${h.table(['Mehrbedarf', 'Nachweis'], [
  ['Alleinerziehende', 'Angaben im Antrag, bei Bedarf Meldebescheinigung der Kinder'],
  ['Schwangerschaft', 'Mutterpass oder ärztliche Bescheinigung mit errechnetem Termin'],
  ['Behinderung', 'Bescheid über Leistungen zur Teilhabe am Arbeitsleben'],
  ['Ernährung', 'ärztliche Bescheinigung mit Diagnose und Begründung'],
  ['Warmwasser', 'Mietvertrag oder Nebenkostenabrechnung, aus der die Art der Warmwasserbereitung hervorgeht'],
  ['Sonderbedarf', 'Aufstellung der Kosten mit Belegen, etwa Fahrkarten für den Umgang'],
], undefined, ['l', 'l'])}
<p>Der Rechner auf dieser Website berücksichtigt nur den Mehrbedarf für Alleinerziehende automatisch, weil er sich aus den Angaben zum Haushalt ergibt. Alle anderen Mehrbedarfe erhöhen Ihren Anspruch zusätzlich; rechnen Sie sie zu dem Ergebnis hinzu, wenn sie bei Ihnen vorliegen. Bei der Vorrangprüfung können sie den Ausschlag geben, ob Wohngeld und Kinderzuschlag den Bedarf decken.</p>
<h2>Mehrbedarf und die anderen Leistungen</h2>
<p>Das Wohngeld kennt keine Mehrbedarfe: Es rechnet nur mit Miete, Einkommen und Zahl der Haushaltsmitglieder. Beim Kinderzuschlag zählen Mehrbedarfe der Eltern dagegen zu deren Bedarf, an dem die Familienkasse das Einkommen misst. Deshalb kann ein Mehrbedarf eine Familie, die sonst knapp mit Wohngeld und Kinderzuschlag auskommt, wieder in die Zuständigkeit des Jobcenters bringen. Prüfen Sie in diesem Fall beide Wege mit dem Haushaltsrechner und rechnen Sie den Mehrbedarf zum Bedarf hinzu; entscheiden wird am Ende das Jobcenter. Wer von einer Leistung zur anderen wechselt, stellt den neuen Antrag, bevor der alte Bescheid endet, damit kein Monat ohne Geld bleibt.</p>
`;
  },
});
