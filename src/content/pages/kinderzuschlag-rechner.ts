import { definePage } from '../../lib/guide-types';

const ORT = 'Dortmund';

export default definePage({
  id: 'kinderzuschlag-rechner',
  group: 'kinder',
  order: 41,
  slug: 'kinderzuschlag-rechner',
  nav: 'Kinderzuschlag-Rechner',
  card: 'Kinderzuschlag mit Wohngeld und Kindergeld berechnen und mit dem Grundsicherungsgeld vergleichen.',
  title: 'Kinderzuschlag-Rechner 2026: KiZ mit Wohngeld berechnen',
  description: 'Kinderzuschlag-Rechner 2026: KiZ bis 297 € je Kind zusammen mit Wohngeld und Kindergeld berechnen, mit Mindesteinkommen und Vergleich zum Grundsicherungsgeld.',
  h1: 'Kinderzuschlag berechnen',
  intro: 'Der Rechner prüft Kinderzuschlag, Wohngeld und Grundsicherungsgeld gemeinsam, denn der Kinderzuschlag hängt davon ab, ob die Familie mit ihm und dem Wohngeld ohne Jobcenter auskommt. Vorbelegt ist ein Paar mit zwei Kindern in Dortmund.',
  tool: { kind: 'haushalt', props: { paar: true, kinder: '4, 8', brutto1: 2400, brutto2: 0, miete: 750, heizung: 110, ort: ORT } },
  related: ['kinderzuschlag', 'kinderzuschlag-einkommensgrenze', 'wohngeld-oder-grundsicherung', 'kindergeld-2026', 'bildung-und-teilhabe'],
  sources: ['bkgg_6a', 'ba_kiz_merkblatt', 'familienportal_kiz', 'wogg_19'],
  resume: (h) => {
    const K = h.P.kiz; const s = h.P.wohngeld.mietstufen[ORT];
    const v = h.VG.vergleich({ paar: true, brutto: [2400, 0], kinder: [4, 8], unterhalt: 0, miete: 750, heizung: 110, mietstufe: s, elterngeld: 0, sonstiges: 0 });
    return `Der Kinderzuschlag der Familienkasse beträgt 2026 bis zu ${h.m(K.hoechst)} im Monat für jedes Kind unter ${K.altersgrenze} Jahren, das im Haushalt lebt und für das Kindergeld gezahlt wird; der Sofortzuschlag von ${h.m(K.sofortzuschlag)} ist darin enthalten. Voraussetzung ist ein Bruttoeinkommen von mindestens ${h.m(K.mindestPaar)} bei Paaren und ${h.m(K.mindestAllein)} bei Alleinerziehenden. Außerdem muss die Familie mit Einkommen, Kindergeld, Wohngeld und Kinderzuschlag ihren Bedarf nach dem Grundsicherungsgeld decken; fehlen höchstens ${h.m(K.luecke)}, gibt es einen erweiterten Zugang. Einkommen der Eltern über ihrem eigenen Bedarf mindert den Zuschlag zu ${h.pc(K.anrechnungEltern)}. Ein Beispiel mit den Vorgaben des Rechners: Ein Paar in ${ORT} mit Kindern von 4 und 8 Jahren, ${h.m(2400)} brutto aus einem Verdienst und ${h.m(750)} Bruttokaltmiete bekommt nach unserer Rechnung ${h.m(v.kiz.gesamt)} Kinderzuschlag, ${h.m(v.wg.wohngeld)} Wohngeld und ${h.m(v.kindergeld)} Kindergeld im Monat. Bewilligt wird der Kinderzuschlag für ${K.bewilligung} Monate ab dem Antragsmonat.`;
  },
  faqs: (h) => [
    { q: 'Warum rechnet der Kinderzuschlag-Rechner auch Wohngeld und Grundsicherungsgeld?', a: `Weil das Gesetz den Kinderzuschlag nur zahlt, wenn die Familie mit ihm und dem Wohngeld nicht mehr auf das Jobcenter angewiesen ist. Die Familienkasse setzt dafür das Wohngeld an, das voraussichtlich zu bewilligen wäre. Erst der Vergleich mit dem Bedarf im Grundsicherungsgeld zeigt, ob der Kinderzuschlag zusteht oder ob das Jobcenter zuständig ist; fehlen höchstens ${h.m(h.P.kiz.luecke)}, besteht ein Wahlrecht.` },
    { q: 'Welche Miete gebe ich im Kinderzuschlag-Rechner ein?', a: 'Die Bruttokaltmiete, also Grundmiete mit kalten Nebenkosten, und die Heizkosten getrennt, so wie sie im Mietvertrag oder in der letzten Abrechnung stehen. Für den Kinderzuschlag zählt die Warmmiete des Antragsmonats, beim Wohngeld nur die Bruttokaltmiete bis zum Höchstbetrag. Der Rechner verwendet beide Werte an der jeweils richtigen Stelle.' },
    { q: 'Wie genau ist das Ergebnis des Kinderzuschlag-Rechners?', a: `Es ist eine Schätzung. Die Familienkasse rechnet mit dem Durchschnitt der ${h.P.kiz.bemessungMonate} Monate vor dem Antrag, mit tatsächlichen Abzügen wie Fahrtkosten und mit Ihrem Vermögen. Der Rechner nimmt den eingegebenen Monatslohn, schätzt Steuern und Sozialbeiträge und prüft kein Vermögen. Abweichungen von einigen Euro sind deshalb normal; maßgeblich ist allein der Bescheid.` },
  ],
  body: (h) => {
    const K = h.P.kiz; const s = h.P.wohngeld.mietstufen[ORT];
    const rows = [900, 1200, 1500, 2100, 2700, 3400, 4200, 4600].map((b) => {
      const v = h.VG.vergleich({ paar: true, brutto: [b, 0], kinder: [4, 8], unterhalt: 0, miete: 750, heizung: 110, mietstufe: s, elterngeld: 0, sonstiges: 0 });
      const weg = v.empfehlung === 'gsg' ? (v.wahlrecht ? 'Wahl: Jobcenter oder KiZ' : 'Grundsicherungsgeld') : v.empfehlung === 'vorrang' ? (v.kiz.gesamt > 0 ? 'Kinderzuschlag + Wohngeld' : 'nur Wohngeld') : 'nur Kindergeld';
      return [h.m(b), h.m(v.kiz.gesamt), h.m(v.wg.wohngeld), weg];
    });
    const uv = h.UV.uvgBetrag(6);
    const v12 = h.VG.vergleich({ paar: true, brutto: [1200, 0], kinder: [4, 8], unterhalt: 0, miete: 750, heizung: 110, mietstufe: s, elterngeld: 0, sonstiges: 0 });
    return `
<h2>Kinderzuschlag nach Einkommen für die Beispielfamilie</h2>
${h.table(['Brutto im Monat', 'Kinderzuschlag', 'Wohngeld', 'Maßgeblicher Weg'], rows, `Paar, Kinder 4 und 8 Jahre, ein Verdienst, Bruttokaltmiete ${h.m(750)}, Heizung ${h.m(110)}, ${ORT} (Mietstufe ${['I','II','III','IV','V','VI','VII'][s - 1]}). Eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['r', 'r', 'r', 'l'])}
<p>Die Tabelle zeigt die drei Bereiche, in denen sich jede Familie wiederfindet. Bei sehr kleinem Lohn reichen Kinderzuschlag und Wohngeld nicht aus, um den Bedarf zu decken; die Beträge in diesen Zeilen sind nur rechnerisch, zuständig ist das Jobcenter. Bei ${h.m(1200)} brutto fehlen der Familie nach unserer Rechnung noch ${h.m(v12.luecke)}; das liegt unter der Grenze von ${h.m(K.luecke)}, deshalb kann sie zwischen Grundsicherungsgeld und dem erweiterten Zugang zum Kinderzuschlag wählen. Im mittleren Bereich gibt es den vollen Kinderzuschlag. Steigt der Lohn weiter, mindert jeder zusätzliche Euro an anrechenbarem Einkommen den Zuschlag um ${h.pc(K.anrechnungEltern)} eines Euros, bis er ausläuft; das Wohngeld läuft noch etwas länger.</p>

<h2>Wenn Sie allein erziehen</h2>
<p>Stellen Sie im Rechner auf einen Erwachsenen um und tragen Sie den Unterhalt ein, den das Kind tatsächlich erhält. Fehlt Unterhalt, setzt der Rechner den Unterhaltsvorschuss an. Beides ist Einkommen des Kindes und mindert dessen Kinderzuschlag um ${h.pc(K.anrechnungKind)} des Betrags. Für ein Kind von 6 Jahren mit vollem Unterhaltsvorschuss von ${h.m(uv)} bleiben so höchstens ${h.m(Math.round(K.hoechst - K.anrechnungKind * uv))} Kinderzuschlag. Dafür kommt beim Bedarf der Mehrbedarf für Alleinerziehende hinzu, und das Mindesteinkommen liegt mit ${h.m(K.mindestAllein)} niedriger als bei Paaren.</p>

<h2>So rechnet der Rechner</h2>
<p>Für jedes Kind setzt er den Höchstbetrag von ${h.m(K.hoechst)} an und zieht ${h.pc(K.anrechnungKind)} des Einkommens des Kindes ab, etwa von Unterhalt oder Unterhaltsvorschuss. Kindergeld und Wohngeld zählen dabei nicht. Danach ermittelt er den Bedarf der Eltern: ihre Regelbedarfe, bei Alleinerziehenden den Mehrbedarf und ihren Anteil an Miete und Heizung. Dieser Anteil hängt von der Zahl der Kinder ab und liegt bei einem Paar mit zwei Kindern bei ${h.pc(K.wohnanteil.paar[1] / 100)}. Das Einkommen der Eltern nach Steuern, Sozialbeiträgen und Erwerbstätigenfreibetrag wird mit diesem Bedarf verglichen. Liegt es darüber, mindert der übersteigende Teil den Kinderzuschlag aller Kinder zusammen. Zum Schluss prüft der Rechner, ob die Familie mit allen Leistungen ihren Bedarf deckt.</p>

<h2>Nach der Rechnung</h2>
<p>Zeigt der Rechner einen Anspruch, stellen Sie den Antrag bei der Familienkasse, online oder auf Papier. Den Wohngeldantrag stellen Sie gleichzeitig bei der Wohngeldstelle. Für Monate vor dem Antrag gibt es in der Regel keinen Kinderzuschlag. Wer Kinderzuschlag bekommt, hat außerdem Anspruch auf Leistungen für ${h.a('bildung-und-teilhabe', 'Bildung und Teilhabe')}. Wie die Familienkasse rechnet und welche Unterlagen nötig sind, steht unter ${h.a('kinderzuschlag', 'Kinderzuschlag')}; ab welchem Einkommen der Anspruch beginnt und endet, unter ${h.a('kinderzuschlag-einkommensgrenze', 'Einkommensgrenzen beim Kinderzuschlag')}.</p>
`;
  },
});
