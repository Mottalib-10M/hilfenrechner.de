import { definePage } from '../../lib/guide-types';

const MIETE = 700;
const HEIZ = 100;

export default definePage({
  id: 'elterngeld-und-sozialleistungen',
  group: 'eltern',
  order: 64,
  slug: 'elterngeld-und-sozialleistungen',
  nav: 'Elterngeld und Sozialleistungen',
  card: 'Wie Elterngeld auf Grundsicherungsgeld, Kinderzuschlag und Wohngeld angerechnet wird und welche Freibeträge gelten.',
  title: 'Elterngeld und Sozialleistungen: Anrechnung und Freibetrag',
  description: 'Elterngeld und Sozialleistungen 2026: Freibetrag 300 € beim Wohngeld, Anrechnung auf Grundsicherungsgeld und Kinderzuschlag, Elterngeld Plus, Mutterschaftsgeld.',
  h1: 'Elterngeld und Sozialleistungen: was angerechnet wird',
  intro: 'Elterngeld ist Einkommen. Ob und wie viel davon bei anderen Leistungen frei bleibt, hängt davon ab, um welche Leistung es geht und ob Sie vor der Geburt gearbeitet haben.',
  mini: { kind: 'mini:elterngeld' },
  related: ['elterngeld-rechner', 'elterngeld-plus', 'mutterschaftsgeld', 'kinderzuschlag', 'wohngeld-oder-grundsicherung', 'alleinerziehend-leistungen'],
  sources: ['beeg_10', 'beeg_3', 'muschg_19', 'sgb2_11b', 'bkgg_6a', 'ba_kiz_merkblatt', 'uvg_1'],
  resume: (h) => {
    const E = h.P.elterngeld;
    return `Elterngeld zählt bei Sozialleistungen grundsätzlich als Einkommen, aber mit Freibeträgen nach § 10 BEEG. Bei Leistungen wie dem Wohngeld bleiben bis zu ${h.m(E.freibetragSgb2)} im Monat unberücksichtigt, beim Elterngeld Plus bis zu ${h.m(E.freibetragSgb2Plus)}, unabhängig davon, ob Sie vor der Geburt gearbeitet haben. Strenger ist die Regel beim Grundsicherungsgeld, bei der Sozialhilfe und beim Kinderzuschlag: Dort bleibt Elterngeld nur in Höhe des Erwerbseinkommens vor der Geburt frei, höchstens ${h.m(E.freibetragSgb2)}, beim Elterngeld Plus höchstens ${h.m(E.freibetragSgb2Plus)}. Wer vor der Geburt nichts verdient hat, bekommt den Mindestbetrag von ${h.m(E.mindest)} zwar ausgezahlt, er wird aber voll auf das Grundsicherungsgeld angerechnet. Bei Mehrlingen vervielfachen sich die Freibeträge. Mutterschaftsgeld nach § 19 MuSchG bleibt im Grundsicherungsgeld ganz anrechnungsfrei. Umgekehrt werden Mutterschaftsgeld und Arbeitgeberzuschuss nach der Geburt auf das Elterngeld angerechnet, mit Ausnahme der einmaligen ${h.m(h.P.mutterschaft.bas)} des Bundesamts für Soziale Sicherung. Kindergeld bleibt von alldem unberührt. Für Familien kurz über der Grenze kann das Elterngeld entscheiden, ob Kinderzuschlag und Wohngeld reichen oder das Jobcenter zuständig ist.`;
  },
  faqs: (h) => [
    { q: 'Bekomme ich Elterngeld, wenn ich Grundsicherungsgeld beziehe?', a: `Ja. Den Anspruch auf Elterngeld hat jeder, der die Voraussetzungen erfüllt, auch im Grundsicherungsgeld; mindestens gibt es ${h.m(h.P.elterngeld.mindest)}. Das Jobcenter rechnet das Elterngeld aber als Einkommen an. Frei bleibt nur ein Betrag in Höhe Ihres Erwerbseinkommens vor der Geburt, höchstens ${h.m(h.P.elterngeld.freibetragSgb2)}. Beantragen Sie das Elterngeld trotzdem, denn das Jobcenter verlangt, dass vorrangige Leistungen genutzt werden.` },
    { q: 'Zählt Elterngeld beim Wohngeld als Einkommen?', a: `Ja, aber erst oberhalb von ${h.m(h.P.elterngeld.freibetragSgb2)} im Monat, beim Elterngeld Plus oberhalb von ${h.m(h.P.elterngeld.freibetragSgb2Plus)}. Dieser Freibetrag gilt beim Wohngeld unabhängig davon, ob Sie vor der Geburt gearbeitet haben. Wer nur den Mindestbetrag erhält, hat beim Wohngeld also kein zusätzliches Einkommen. Ein höheres Elterngeld kann das Wohngeld dagegen spürbar mindern.` },
    { q: 'Wird Mutterschaftsgeld beim Jobcenter angerechnet?', a: 'Das Mutterschaftsgeld nach dem Mutterschutzgesetz bleibt beim Grundsicherungsgeld in voller Höhe anrechnungsfrei. Das gilt sowohl für das Mutterschaftsgeld der Krankenkasse als auch für die Einmalzahlung des Bundesamts für Soziale Sicherung. Der Zuschuss des Arbeitgebers ist davon nicht ausdrücklich erfasst; klären Sie dessen Behandlung mit Ihrem Jobcenter.' },
    { q: 'Gilt der Elterngeld-Freibetrag bei Zwillingen doppelt?', a: `Ja. Bei Mehrlingsgeburten vervielfachen sich die anrechnungsfreien Beträge mit der Zahl der geborenen Kinder. Bei Zwillingen bleiben beim Wohngeld also bis zu ${h.m(2 * h.P.elterngeld.freibetragSgb2)} frei. Beim Grundsicherungsgeld und beim Kinderzuschlag gilt die Grenze des Einkommens vor der Geburt weiterhin; Elterngeld enthält bei Zwillingen zudem den Mehrlingszuschlag von ${h.m(h.P.elterngeld.mehrling)}.` },
  ],
  body: (h) => {
    const E = h.P.elterngeld;
    const rows = [
      ['Wohngeld und andere einkommensabhängige Leistungen', `bis ${h.m(E.freibetragSgb2)}`, `bis ${h.m(E.freibetragSgb2Plus)}`, 'nein'],
      ['Grundsicherungsgeld, Sozialhilfe, Kinderzuschlag', `bis ${h.m(E.freibetragSgb2)}, höchstens Erwerbseinkommen vor der Geburt`, `bis ${h.m(E.freibetragSgb2Plus)}, höchstens die Hälfte davon`, 'ja'],
    ];
    const mj = h.EG.elterngeld({ brutto: 400, stkl: 1 });
    const mjFrei = Math.min(mj.egNetto, E.freibetragSgb2);
    const allein = [0, E.mindest, 800].map((eg) => { const v = h.VG.vergleich({ paar: false, brutto: [0], kinder: [0], unterhalt: 0, miete: MIETE, heizung: HEIZ, mietstufe: 3, elterngeld: eg, sonstiges: 0 }); return [eg ? h.m(eg) : 'kein Elterngeld', h.m(v.gsg.anspruch), h.m(eg + v.gsg.anspruch)]; });
    const paar = [0, 900, 1500].map((eg) => { const v = h.VG.vergleich({ paar: true, brutto: [2400, 0], kinder: [0, 3], unterhalt: 0, miete: MIETE, heizung: HEIZ, mietstufe: 3, elterngeld: eg, sonstiges: 0 }); return [eg ? h.m(eg) : 'kein Elterngeld', h.m(v.wg.wohngeld), h.m(v.kiz.gesamt), h.m(eg + v.wg.wohngeld + v.kiz.gesamt)]; });
    return `
<h2>Die Freibeträge im Überblick</h2>
${h.table(['Leistung', 'Basiselterngeld frei', 'Elterngeld Plus frei', 'Abhängig vom Einkommen vor der Geburt?'], rows, 'Nach § 10 BEEG. Bei Mehrlingen vervielfachen sich die Beträge mit der Zahl der Kinder.', ['l', 'l', 'l', 'l'])}
<p>Der Freibetrag schützt nicht nur das Elterngeld selbst, sondern auch Leistungen, die auf das Elterngeld angerechnet wurden, etwa das Mutterschaftsgeld nach der Geburt. Zusammen bleiben höchstens ${h.m(E.freibetragSgb2)} frei. Bei Elterngeld Plus halbiert sich der Betrag, der nach Abzug anderer freigestellter Einnahmen übrig bleibt.</p>

<h2>Grundsicherungsgeld: nur das frühere Erwerbseinkommen ist geschützt</h2>
<p>Beim Grundsicherungsgeld, der Sozialhilfe, dem Kinderzuschlag und den Asylbewerberleistungen gilt eine Sonderregel. Frei bleibt das Elterngeld nur so weit, wie es dem Erwerbseinkommen entspricht, das der Elterngeldberechnung zugrunde lag, höchstens ${h.m(E.freibetragSgb2)}. Hintergrund: Das Elterngeld soll ausgefallenes Arbeitseinkommen ersetzen. Wer vorher nicht gearbeitet hat, hat nichts verloren, was zu ersetzen wäre; der Mindestbetrag von ${h.m(E.mindest)} wird dann voll angerechnet.</p>
${h.table(['Elterngeld im Monat', 'Grundsicherungsgeld', 'Zusammen'], allein, `Alleinerziehende Mutter mit Neugeborenem, kein Lohn, kein Unterhalt, Bruttokaltmiete ${h.m(MIETE)}, Heizung ${h.m(HEIZ)}. Annahme: Wer mehr als den Mindestbetrag erhält, hat vor der Geburt mindestens ${h.m(E.freibetragSgb2)} verdient. Eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['r', 'r', 'r'])}
<p>Die Tabelle zeigt die Wirkung: Mit dem Mindestbetrag hat die Mutter am Ende genauso viel wie ohne Elterngeld, weil das Jobcenter jeden Euro abzieht. Bei einem höheren Elterngeld nach früherer Arbeit bleiben ${h.m(E.freibetragSgb2)} zusätzlich in der Tasche. Unterhaltsvorschuss und Kindergeld sind in den Beträgen des Grundsicherungsgeldes bereits verrechnet. Hat die Mutter vor der Geburt zum Beispiel nur ${h.m(200)} im Monat verdient, bleiben auch nur ${h.m(200)} frei.</p>

<h2>Ein Minijob vor der Geburt</h2>
<p>Wie viel der frühere Verdienst ausmacht, zeigt ein Beispiel. Eine Mutter hatte vor der Geburt einen Minijob mit ${h.m(400)} im Monat. Ihr Elterngeld-Netto beträgt nach den Regeln des Gesetzes ${h.m2(mj.egNetto)}, ihr Basiselterngeld ${h.m2(mj.basis)}. Bezieht sie Grundsicherungsgeld, bleibt Elterngeld in Höhe des Einkommens vor der Geburt frei, hier ${h.m2(mjFrei)}. Angerechnet werden nur ${h.m2(mj.basis - mjFrei)}. Hätte sie vor der Geburt nicht gearbeitet, würde das Jobcenter die vollen ${h.m(E.mindest)} abziehen. Schon ein kleiner Verdienst vor der Geburt macht also einen Unterschied von fast ${h.m(E.mindest)} im Monat. Wählt sie Elterngeld Plus, halbiert sich der Freibetrag auf ${h.m2(mjFrei / 2)}.</p>

<h2>Kinderzuschlag und Wohngeld: Elterngeld kann den Ausschlag geben</h2>
${h.table(['Elterngeld im Monat', 'Wohngeld', 'Kinderzuschlag', 'Elterngeld + Wohngeld + KiZ'], paar, `Paar, ein Elternteil verdient ${h.m(2400)} brutto, der andere bezieht Elterngeld; Kinder 0 und 3 Jahre, Bruttokaltmiete ${h.m(MIETE)}, Heizung ${h.m(HEIZ)}, Mietstufe III. Eigene Berechnung.`, ['r', 'r', 'r', 'r'])}
<p>Bei Familien mit Erwerbseinkommen mindert das Elterngeld Wohngeld und Kinderzuschlag, aber nicht im Verhältnis eins zu eins. Beim Wohngeld zählt nur der Teil über ${h.m(E.freibetragSgb2)}, und das Wohngeld sinkt nur um einen Teil des zusätzlichen Einkommens. Beim Kinderzuschlag gilt das Elterngeld als anderes Einkommen der Eltern und mindert den Zuschlag stärker als Lohn. Unter dem Strich hat die Familie mit Elterngeld trotzdem mehr Geld. Das Elterngeld zählt außerdem beim Mindesteinkommen von ${h.m(h.P.kiz.mindestPaar)} für den Kinderzuschlag mit; in Familien, in denen niemand arbeitet, kann es damit den Weg zum Kinderzuschlag öffnen.</p>

<h2>Mutterschaftsgeld und Elterngeld</h2>
<p>In den ersten Wochen nach der Geburt bekommen angestellte Mütter Mutterschaftsgeld und den Zuschuss des Arbeitgebers. Beides wird auf das Elterngeld angerechnet, das für dieselben Tage zusteht, weshalb sich in dieser Zeit in der Regel kein oder nur wenig Elterngeld ergibt. Ausgenommen ist die Einmalzahlung von höchstens ${h.m(h.P.mutterschaft.bas)} des Bundesamts für Soziale Sicherung für nicht gesetzlich Versicherte. Lebensmonate mit Mutterschaftsleistungen gelten als Monate mit Basiselterngeld der Mutter; sie verbrauchen also Monatsbeträge.</p>
<p>Im Grundsicherungsgeld bleibt das Mutterschaftsgeld nach § 19 MuSchG voll anrechnungsfrei. Eine Mutter, die vor der Geburt gearbeitet hat und ergänzend Grundsicherungsgeld bezieht, behält es also neben der Leistung des Jobcenters. Wie das Mutterschaftsgeld berechnet wird, steht unter ${h.a('mutterschaftsgeld', 'Mutterschaftsgeld')}.</p>

<h2>Elterngeld Plus und Partnerschaftsbonus</h2>
<p>Beim Elterngeld Plus halbieren sich die Freibeträge: beim Wohngeld auf ${h.m(E.freibetragSgb2Plus)}, beim Grundsicherungsgeld und Kinderzuschlag auf höchstens ${h.m(E.freibetragSgb2Plus)} des früheren Erwerbseinkommens. Wer Grundsicherungsgeld bezieht und Elterngeld Plus wählt, verteilt den Betrag zwar über mehr Monate, behält aber in jedem Monat nur den halben Freibetrag. Über die gesamte Dauer kann sich der geschützte Betrag dadurch angleichen, weil der halbe Freibetrag doppelt so lange gilt. Im Partnerschaftsbonus, in dem beide Eltern arbeiten, wird zusätzlich der Lohn mit den Freibeträgen für Erwerbstätige angerechnet.</p>

<h2>Wohngeld oder Grundsicherungsgeld nach der Geburt</h2>
<p>Mit der Geburt ändert sich die Lage vieler Familien: Ein Einkommen fällt weg oder sinkt, Elterngeld und Kindergeld kommen hinzu, der Haushalt wird größer. Häufig wechselt dadurch die zuständige Leistung. Eine Familie, die vorher ohne Hilfe auskam, kann Anspruch auf Wohngeld und Kinderzuschlag bekommen; eine Familie mit Wohngeld kann in das Grundsicherungsgeld rutschen, wenn ein Gehalt durch ein niedriges Elterngeld ersetzt wird. Prüfen Sie Ihren Anspruch deshalb im Monat der Geburt neu. Beim Wohngeld gilt eine größere Haushaltsgröße als Anlass für einen neuen Antrag, beim Kinderzuschlag eine Geburt als Änderung, die Sie sofort melden müssen. Den Vergleich aller Wege für Ihren Haushalt macht ${h.a('wohngeld-oder-grundsicherung', 'Wohngeld oder Grundsicherung')}.</p>

<h2>Anträge rund um die Geburt</h2>
<ul>
<li><strong>Elterngeld:</strong> schriftlich bei der Elterngeldstelle des Landes; rückwirkend nur für ${E.rueckwirkendMonate} Lebensmonate.</li>
<li><strong>Kindergeld:</strong> bei der Familienkasse; rückwirkend für ${h.P.kindergeld.rueckwirkendMonate} Monate.</li>
<li><strong>Kinderzuschlag:</strong> Die Geburt ändert die Bedarfsgemeinschaft. Melden Sie sie der Familienkasse sofort. Hebt sie die laufende Bewilligung deshalb auf und stellen Sie unverzüglich einen neuen Antrag, beginnt der neue Bewilligungszeitraum direkt nach dem Monat der Geburt.</li>
<li><strong>Wohngeld:</strong> Ein weiteres Haushaltsmitglied rechtfertigt einen neuen Antrag bei der Wohngeldstelle.</li>
<li><strong>Grundsicherungsgeld:</strong> Melden Sie die Geburt und das beantragte Elterngeld dem Jobcenter. Der Bedarf des Kindes kommt hinzu, Kindergeld und Elterngeld werden angerechnet.</li>
</ul>

<h2>Wenn beide Eltern Elterngeld beziehen</h2>
<p>Der Freibetrag gilt für jede berechtigte Person gesondert. Beziehen beide Eltern gleichzeitig Elterngeld, etwa im Partnerschaftsbonus oder in einem gemeinsamen Monat, hat jeder seinen eigenen Freibetrag, beim Grundsicherungsgeld bemessen nach seinem eigenen Einkommen vor der Geburt. Ein Elternteil, der vor der Geburt gut verdient hat, behält also bis zu ${h.m(E.freibetragSgb2)}, der andere ohne frühere Arbeit nichts. Beim Wohngeld bleiben dagegen bei beiden bis zu ${h.m(E.freibetragSgb2)} frei.</p>

<h2>Elterngeld und Unterhaltsvorschuss</h2>
<p>Für den Unterhaltsvorschuss eines Kindes unter ${h.P.uvg.altersgrenzen[1]} Jahren spielt das Einkommen des alleinerziehenden Elternteils keine Rolle, also auch nicht sein Elterngeld. Bei älteren Geschwistern ab ${h.P.uvg.altersgrenzen[1]} Jahren, die Grundsicherungsgeld beziehen und durch den Vorschuss nicht davon unabhängig würden, zählt dagegen, ob der Elternteil mindestens ${h.m(h.P.uvg.mindesteinkommen12)} brutto im Monat hat; Kindergeld wird dabei nicht mitgerechnet, Elterngeld als Einkommen schon.</p>

<h2>Häufige Missverständnisse</h2>
<p><strong>„Das Mindestelterngeld bleibt beim Jobcenter immer frei.“</strong> Nein, nur wenn vor der Geburt mindestens so viel verdient wurde. <strong>„Elterngeld mindert das Kindergeld.“</strong> Nein, Kindergeld ist davon unabhängig. <strong>„Mit Elterngeld fällt das Wohngeld weg.“</strong> Nicht unbedingt; beim Wohngeld bleiben bis zu ${h.m(E.freibetragSgb2)} frei, und auch darüber sinkt das Wohngeld nur um einen Teil. <strong>„Mutterschaftsgeld wird vom Jobcenter verrechnet.“</strong> Das Mutterschaftsgeld nach § 19 MuSchG gerade nicht.</p>

<h2>Was die Freibeträge nicht abdecken</h2>
<p>Die Freibeträge gelten für Sozialleistungen, die vom Einkommen abhängen. Für Unterhaltspflichten gelten eigene Regeln des Unterhaltsrechts. Kindergeld wird durch das Elterngeld nicht berührt; es steht in jedem Fall zusätzlich zu. Lassen Sie sich im Einzelfall von Ihrem Jobcenter, der Familienkasse oder der Wohngeldstelle beraten, denn diese Stellen entscheiden verbindlich.</p>
`;
  },
});
