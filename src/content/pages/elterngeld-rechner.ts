import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'elterngeld-rechner',
  group: 'eltern',
  order: 60,
  slug: 'elterngeld-rechner',
  nav: 'Elterngeld-Rechner',
  card: 'Basiselterngeld und Elterngeld Plus aus dem Bruttolohn vor der Geburt berechnen, mit Teilzeit, Geschwisterbonus und Mehrlingen.',
  title: 'Elterngeld-Rechner 2026: Basiselterngeld und Elterngeld Plus',
  description: 'Elterngeld-Rechner 2026: Basiselterngeld und Elterngeld Plus aus dem Brutto vor der Geburt, Ersatzrate 65 bis 100 %, 300 bis 1.800 €, Teilzeit und Bonus.',
  h1: 'Elterngeld berechnen',
  intro: 'Geben Sie Ihren durchschnittlichen Bruttolohn vor der Geburt und Ihre Steuerklasse ein. Der Rechner ermittelt das Elterngeld-Netto nach den Pauschalen des Gesetzes und daraus Basiselterngeld und Elterngeld Plus.',
  tool: { kind: 'elterngeld', props: { brutto: 2800, stkl: '4' } },
  related: ['elterngeld-plus', 'partnerschaftsbonus', 'elterngeld-und-sozialleistungen', 'mutterschaftsgeld', 'kinderzuschlag-rechner'],
  sources: ['beeg_2', 'beeg_2a', 'beeg_2b', 'beeg_2e', 'beeg_2f', 'beeg_4a', 'beeg_7'],
  resume: (h) => {
    const E = h.P.elterngeld;
    const r = h.EG.elterngeld({ brutto: 2800, stkl: 4 });
    return `Elterngeld ersetzt einen Teil des Einkommens, das nach der Geburt wegfällt. Grundlage ist das Elterngeld-Netto: der durchschnittliche Bruttolohn der ${E.bemessungMonate} Kalendermonate vor dem Geburtsmonat, abzüglich pauschaler Steuern und Sozialabgaben. Davon zahlt die Elterngeldstelle in der Regel ${h.pc(E.rate)}; bei einem Elterngeld-Netto unter ${h.m(E.rateGrenzeUnten)} steigt die Rate bis ${h.pc(1)}, über ${h.m(E.rateGrenzeOben)} sinkt sie bis ${h.pc(E.rateMin)}. Das Basiselterngeld beträgt mindestens ${h.m(E.mindest)} und höchstens ${h.m(E.hoechst)} im Monat, Elterngeld Plus die Hälfte, dafür doppelt so lange. Mit den Vorgaben des Rechners, ${h.m(2800)} brutto in Steuerklasse IV, ergibt sich ein Elterngeld-Netto von ${h.m2(r.egNetto)}, ein Basiselterngeld von ${h.m2(r.basis)} und ein Elterngeld Plus von ${h.m2(r.plus)} im Monat. Der Rechner verwendet die Lohnsteuer nach dem Programmablaufplan 2026; maßgeblich ist er für Geburten ab 2027, bei Geburten 2026 kann das Ergebnis leicht abweichen. Den Antrag stellen Sie bei der Elterngeldstelle Ihres Landes; rückwirkend zahlt sie nur für ${E.rueckwirkendMonate} Lebensmonate vor dem Antragsmonat.`;
  },
  faqs: (h) => [
    { q: 'Welches Brutto gebe ich im Elterngeld-Rechner ein?', a: `Den Durchschnitt Ihres laufenden Bruttolohns aus den ${h.P.elterngeld.bemessungMonate} Kalendermonaten vor dem Geburtsmonat. Monate mit Mutterschutz, Mutterschaftsgeld oder einer schwangerschaftsbedingten Krankheit werden übersprungen, dafür gehen frühere Monate ein. Einmalzahlungen wie Urlaubs- oder Weihnachtsgeld zählen beim Elterngeld nicht mit. Selbstständige rechnen mit dem Gewinn des letzten Veranlagungszeitraums.` },
    { q: 'Warum zeigt der Elterngeld-Rechner ein anderes Netto als meine Lohnabrechnung?', a: 'Weil das Elterngeld-Netto nicht Ihr tatsächliches Netto ist. Das Gesetz zieht Steuern nach festen Regeln und Sozialabgaben als Pauschalen ab und berücksichtigt einen Arbeitnehmer-Pauschbetrag. Zusatzbeiträge, private Versicherungen oder Freibeträge auf der Lohnsteuerkarte spielen keine Rolle. Deshalb liegt das Elterngeld-Netto oft etwas unter dem Netto Ihrer Abrechnung.' },
    { q: 'Lohnt sich ein Wechsel der Steuerklasse vor der Geburt?', a: 'Er kann das Elterngeld erhöhen, weil eine günstigere Steuerklasse das Elterngeld-Netto steigert. Maßgeblich ist die Steuerklasse, die im Bemessungszeitraum überwiegend galt, ein Wechsel muss deshalb früh erfolgen. Ob er sich unter dem Strich lohnt, hängt auch von der Steuer im ganzen Jahr ab. Lassen Sie sich im Zweifel beim Finanzamt oder einer Beratungsstelle beraten.' },
  ],
  body: (h) => {
    const E = h.P.elterngeld;
    const rows = [600, 1000, 1500, 2000, 2800, 3500, 4500].map((b) => {
      const r = h.EG.elterngeld({ brutto: b, stkl: 1 });
      return [h.m(b), h.m2(r.egNetto), h.pc(r.rate, 1), h.m2(r.basis), h.m2(r.plus)];
    });
    const st = [3, 4, 5].map((s) => { const r = h.EG.elterngeld({ brutto: 2800, stkl: s as 3 | 4 | 5 }); return [['', '', '', 'III', 'IV', 'V'][s], h.m2(r.egNetto), h.m2(r.basis)]; });
    const tz = h.EG.elterngeld({ brutto: 2800, stkl: 4, nettoNachher: 1000 });
    const kein = h.EG.elterngeld({ brutto: 2800, stkl: 4 });
    return `
<h2>Elterngeld nach Bruttolohn</h2>
${h.table(['Brutto vor der Geburt', 'Elterngeld-Netto', 'Ersatzrate', 'Basiselterngeld', 'Elterngeld Plus'], rows, `Steuerklasse I, ohne Kirchensteuer, kein Einkommen nach der Geburt. Berechnet mit dem Rechenkern dieser Website, Stand ${h.date(h.TODAY)}.`, ['r', 'r', 'r', 'r', 'r'])}
<p>Bei kleinen Einkommen steigt die Ersatzrate: Für je ${h.m(E.rateSchrittEuro)}, die das Elterngeld-Netto unter ${h.m(E.rateGrenzeUnten)} liegt, kommen ${h.dec(E.rateSchrittPunkte * 100, 1)} Prozentpunkte hinzu, bis höchstens ${h.pc(1)}. Über ${h.m(E.rateGrenzeOben)} sinkt die Rate im gleichen Schritt bis auf ${h.pc(E.rateMin)}. Ab einem Elterngeld-Netto von rund ${h.m(E.hoechst / E.rateMin)} ist der Höchstbetrag von ${h.m(E.hoechst)} erreicht; mehr gibt es auch bei hohem Lohn nicht. Wer vor der Geburt nichts verdient hat, bekommt den Mindestbetrag von ${h.m(E.mindest)}.</p>

<h2>Einfluss der Steuerklasse</h2>
${h.table(['Steuerklasse', 'Elterngeld-Netto', 'Basiselterngeld'], st, `Brutto ${h.m(2800)}, ohne Kirchensteuer. Eigene Berechnung.`, ['l', 'r', 'r'])}
<p>Bei gleichem Brutto unterscheidet sich das Elterngeld je nach Steuerklasse deutlich, weil die Lohnsteuer das Elterngeld-Netto mindert. Maßgeblich ist die Steuerklasse, die im Bemessungszeitraum am längsten galt. Wer kirchensteuerpflichtig ist, hat zusätzlich einen pauschalen Abzug von ${h.pc(E.kirchensteuer)} Kirchensteuer; auch das lässt sich im Rechner einstellen.</p>

<h2>Teilzeit, Geschwister, Mehrlinge</h2>
<p>Arbeiten Sie nach der Geburt in Teilzeit, höchstens ${E.maxWochenstunden} Wochenstunden, ersetzt das Elterngeld einen Teil des Unterschieds zwischen dem Einkommen vorher und nachher; das Einkommen vorher zählt dabei höchstens mit ${h.m(E.kappungTeilzeit)}. Bei ${h.m(2800)} brutto in Steuerklasse IV und ${h.m(1000)} Netto aus Teilzeit sinkt das Basiselterngeld von ${h.m2(kein.basis)} auf ${h.m2(tz.basis)}; das Elterngeld Plus beträgt dann ebenfalls ${h.m2(tz.plus)}, läuft aber doppelt so lange. Leben im Haushalt ein weiteres Kind unter ${E.geschwisterAlter.zweiKinderUnter} Jahren oder zwei weitere unter ${E.geschwisterAlter.dreiKinderUnter}, gibt es den Geschwisterbonus von ${h.pc(E.geschwister)}, mindestens ${h.m(E.geschwisterMin)}. Für Zwillinge und weitere Mehrlinge kommen je ${h.m(E.mehrling)} hinzu. Alle drei Fälle können Sie im Rechner einstellen.</p>
<h2>Antrag und Einkommensgrenze</h2>
<p>Elterngeld gibt es nur auf schriftlichen Antrag bei der Elterngeldstelle Ihres Landes. Im Antrag legen Sie fest, für welche Lebensmonate Sie Basiselterngeld, Elterngeld Plus oder Partnerschaftsbonus beziehen möchten; diese Aufteilung können Sie bis zum Ende des Bezugs noch ändern, für bereits ausgezahlte Monate aber nur in Härtefällen. Rückwirkend zahlt die Elterngeldstelle höchstens für ${E.rueckwirkendMonate} Lebensmonate vor dem Monat, in dem der Antrag eingeht. Keinen Anspruch hat, wer im letzten abgeschlossenen Veranlagungszeitraum vor der Geburt ein zu versteuerndes Einkommen von mehr als ${h.m(E.einkommensgrenze)} hatte; bei Paaren zählt die Summe beider.</p>
<p>Wie Elterngeld Plus und der Partnerschaftsbonus funktionieren, steht unter ${h.a('elterngeld-plus', 'Elterngeld Plus')} und ${h.a('partnerschaftsbonus', 'Partnerschaftsbonus')}. Wie das Elterngeld auf Grundsicherungsgeld, Kinderzuschlag und Wohngeld angerechnet wird, erklärt ${h.a('elterngeld-und-sozialleistungen', 'Elterngeld und Sozialleistungen')}.</p>
`;
  },
});
