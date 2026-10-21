import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'mutterschaftsgeld',
  group: 'eltern',
  order: 66,
  slug: 'mutterschaftsgeld',
  nav: 'Mutterschaftsgeld',
  card: 'Mutterschaftsgeld 2026: 13 € am Tag von der Krankenkasse, Zuschuss des Arbeitgebers, 210 € für privat Versicherte und Schutzfristen nach Fehlgeburt.',
  title: 'Mutterschaftsgeld 2026: Höhe, Arbeitgeberzuschuss, Antrag',
  description: 'Mutterschaftsgeld 2026: bis 13 € am Tag von der Krankenkasse plus Arbeitgeberzuschuss, 210 € für privat Versicherte, Schutzfristen, Fehlgeburt und Elterngeld.',
  h1: 'Mutterschaftsgeld-Rechner: wie lange, wie viel, wo beantragen',
  intro: 'In den Schutzfristen ersetzen Mutterschaftsgeld und Arbeitgeberzuschuss zusammen etwa das bisherige Netto.',
  mini: { kind: 'mini:mutterschaft' },
  related: ['elterngeld-rechner', 'elterngeld-und-sozialleistungen', 'elterngeld-plus', 'kindergeld-2026', 'mehrbedarf'],
  sources: ['muschg_3', 'muschg_19', 'muschg_20', 'sgb5_24i', 'bgbl_2025_59', 'beeg_3'],
  resume: (h) => {
    const M = h.P.mutterschaft;
    const r = h.MU.mutterschaftsgeld({ nettoMonat: 1800, versicherung: 'gkv' });
    return `Mutterschaftsgeld wird für die Schutzfristen gezahlt: ${M.vorher / 7} Wochen vor dem errechneten Termin, den Tag der Entbindung und ${M.nachher / 7} Wochen danach, bei Früh- und Mehrlingsgeburten und, auf Antrag, bei einer ärztlich festgestellten Behinderung des Kindes ${M.nachherLang / 7} Wochen danach. Gesetzlich versicherte Arbeitnehmerinnen erhalten von ihrer Krankenkasse höchstens ${h.m(M.kasseProTag)} je Kalendertag. Der Arbeitgeber zahlt den Unterschied zum durchschnittlichen Nettoverdienst der letzten ${M.bemessungMonate} abgerechneten Monate vor der Schutzfrist. Wer nicht selbst gesetzlich versichert ist, also privat oder familienversichert, bekommt vom Bundesamt für Soziale Sicherung einmalig höchstens ${h.m(M.bas)} und ebenfalls den Arbeitgeberzuschuss. Ein Beispiel: Bei ${h.m(1800)} Netto im Monat sind das ${h.m2(r.proTag)} am Tag, davon ${h.m(r.kasseTag)} von der Kasse und ${h.m2(r.agTag)} vom Arbeitgeber; für die ${r.tage} Tage der regulären Schutzfristen ergibt das nach unserer Rechnung ${h.m(r.gesamt)}, der Entbindungstag kommt hinzu. Seit dem ${h.date(M.fehlgeburtFrom)} gibt es auch nach einer Fehlgeburt ab der ${M.fehlgeburt[0][0]}. Schwangerschaftswoche eine Schutzfrist. Mutterschaftsgeld und Zuschuss werden nach der Geburt auf das Elterngeld angerechnet, im Grundsicherungsgeld bleibt das Mutterschaftsgeld dagegen frei.`;
  },
  faqs: (h) => [
    { q: 'Wo beantrage ich das Mutterschaftsgeld?', a: 'Gesetzlich versicherte Arbeitnehmerinnen beantragen es bei ihrer Krankenkasse. Dafür brauchen Sie ein Zeugnis der Ärztin, des Arztes oder der Hebamme über den voraussichtlichen Entbindungstag. Privat oder familienversicherte Arbeitnehmerinnen beantragen die Einmalzahlung beim Bundesamt für Soziale Sicherung. Den Zuschuss zahlt der Arbeitgeber mit der Gehaltsabrechnung.' },
    { q: 'Bekomme ich Mutterschaftsgeld, wenn ich arbeitslos bin?', a: 'Wer bei Beginn der Schutzfrist Arbeitslosengeld bezieht und gesetzlich versichert ist, erhält von der Krankenkasse Mutterschaftsgeld in Höhe des Krankengeldes. Ein Arbeitgeberzuschuss entfällt, weil kein Arbeitsverhältnis besteht. Wer Grundsicherungsgeld bezieht und nicht anders versichert ist, hat in der Regel keinen Anspruch auf Mutterschaftsgeld, aber auf einen Mehrbedarf bei Schwangerschaft.' },
    { q: 'Was gilt nach einer Fehlgeburt für den Mutterschutz?', a: `Seit ${h.date(h.P.mutterschaft.fehlgeburtFrom)} gibt es auch nach einer Fehlgeburt eine Schutzfrist: ab der ${h.P.mutterschaft.fehlgeburt[0][0]}. Schwangerschaftswoche ${h.P.mutterschaft.fehlgeburt[0][1] / 7} Wochen, ab der ${h.P.mutterschaft.fehlgeburt[1][0]}. ${h.P.mutterschaft.fehlgeburt[1][1] / 7} Wochen und ab der ${h.P.mutterschaft.fehlgeburt[2][0]}. ${h.P.mutterschaft.fehlgeburt[2][1] / 7} Wochen. Die Frau darf in dieser Zeit nur arbeiten, wenn sie sich ausdrücklich dazu bereit erklärt; diese Erklärung kann sie jederzeit widerrufen.` },
    { q: 'Bekommen Selbstständige Mutterschaftsgeld?', a: 'Nur, wenn sie Mitglied einer gesetzlichen Krankenkasse sind und dort Anspruch auf Krankengeld haben, etwa weil sie diesen bei einer freiwilligen Versicherung gewählt haben. Dann zahlt die Kasse Mutterschaftsgeld in Höhe des Krankengeldes. Einen Arbeitgeberzuschuss gibt es nicht. Selbstständige ohne Krankengeldanspruch erhalten kein Mutterschaftsgeld der Kasse; private Versicherungen regeln ihre Leistungen im Vertrag.' },
  ],
  body: (h) => {
    const M = h.P.mutterschaft;
    const rows = [1200, 1800, 2500, 3500].map((n) => { const g = h.MU.mutterschaftsgeld({ nettoMonat: n, versicherung: 'gkv' }); const p = h.MU.mutterschaftsgeld({ nettoMonat: n, versicherung: 'privat' }); return [h.m(n), h.m2(g.proTag), h.m(g.kasse), h.m(g.arbeitgeber), h.m(g.gesamt), h.m(p.gesamt)]; });
    const lang = h.MU.mutterschaftsgeld({ nettoMonat: 1800, versicherung: 'gkv', lang: true });
    const fg = M.fehlgeburt.map(([w, t]: number[]) => [`ab der ${w}. Schwangerschaftswoche`, `${t / 7} Wochen`]);
    const bsp = h.MU.mutterschaftsgeld({ nettoMonat: 1800, versicherung: 'gkv' });
    const klein = h.MU.mutterschaftsgeld({ nettoMonat: 350, versicherung: 'gkv' });
    return `
<h2>Höhe nach Nettoverdienst</h2>
${h.table(['Netto im Monat', 'Netto je Kalendertag', 'Krankenkasse', 'Arbeitgeber', 'Zusammen (gesetzlich)', 'Zusammen (privat)'], rows, `Reguläre Schutzfristen von ${M.vorher / 7} plus ${M.nachher / 7} Wochen (${M.vorher + M.nachher} Tage), ohne Entbindungstag. Kalendertäglich = Monatsnetto der letzten ${M.bemessungMonate} abgerechneten Monate geteilt durch ${M.tageJeMonat}. Eigene Berechnung, Stand ${h.date(h.TODAY)}.`, ['r', 'r', 'r', 'r', 'r', 'r'])}
<p>Für gesetzlich versicherte Arbeitnehmerinnen trägt die Krankenkasse höchstens ${h.m(M.kasseProTag)} am Tag, den Rest bis zum bisherigen Nettoverdienst zahlt der Arbeitgeber als Zuschuss. Bei privat oder familienversicherten Arbeitnehmerinnen entfällt der Anteil der Kasse; sie bekommen stattdessen einmalig höchstens ${h.m(M.bas)} vom Bundesamt für Soziale Sicherung, der Arbeitgeberzuschuss wird aber genauso berechnet. Bei einem geringen Verdienst unter ${h.m(M.kasseProTag * M.tageJeMonat)} netto im Monat gibt es keinen Zuschuss, und die Kasse zahlt nur das Netto. Bei ${h.m(350)} netto im Monat sind das zum Beispiel ${h.m2(klein.proTag)} am Tag.</p>

<h2>Ein Rechenbeispiel</h2>
<p>Eine gesetzlich versicherte Angestellte hat in den letzten ${M.bemessungMonate} abgerechneten Monaten vor der Schutzfrist im Schnitt ${h.m(1800)} netto verdient. Geteilt durch ${M.tageJeMonat} ergibt das ${h.m2(bsp.proTag)} je Kalendertag. Die Krankenkasse zahlt davon ${h.m(bsp.kasseTag)}, der Arbeitgeber die übrigen ${h.m2(bsp.agTag)}. Für die ${bsp.tage} Tage der regulären Schutzfristen sind das ${h.m(bsp.kasse)} von der Kasse und ${h.m(bsp.arbeitgeber)} vom Arbeitgeber, zusammen ${h.m(bsp.gesamt)}. Für den Entbindungstag kommen noch einmal ${h.m2(bsp.proTag)} hinzu. Wäre dieselbe Frau privat versichert, entfiele der Anteil der Kasse; sie erhielte stattdessen einmalig ${h.m(M.bas)}, der Arbeitgeberzuschuss bliebe gleich.</p>

<h2>Die Schutzfristen</h2>
<p>Vor der Entbindung beginnt die Schutzfrist ${M.vorher / 7} Wochen vor dem voraussichtlichen Termin, wie er im Zeugnis der Ärztin, des Arztes oder der Hebamme steht. In dieser Zeit darf die Frau nur arbeiten, wenn sie es ausdrücklich erklärt; die Erklärung kann sie jederzeit widerrufen. Kommt das Kind früher oder später, verkürzt oder verlängert sich die Frist vor der Geburt entsprechend.</p>
<p>Nach der Entbindung besteht ein Beschäftigungsverbot von ${M.nachher / 7} Wochen. Es verlängert sich auf ${M.nachherLang / 7} Wochen bei Frühgeburten, bei Mehrlingsgeburten und, wenn die Mutter es beantragt, wenn vor Ablauf von ${M.nachher / 7} Wochen eine Behinderung des Kindes ärztlich festgestellt wird. Bei einer vorzeitigen Entbindung verlängert sich die Frist nach der Geburt zusätzlich um die Tage, die vor der Geburt verloren gingen. Mit ${M.nachherLang / 7} Wochen nach der Geburt steigt das Mutterschaftsgeld bei ${h.m(1800)} Netto auf ${h.m(lang.gesamt)}.</p>

<h2>Wenn das Kind früher kommt</h2>
<p>Kommt das Kind zum Beispiel zehn Tage vor dem errechneten Termin, ohne dass medizinisch eine Frühgeburt vorliegt, endet die Schutzfrist vor der Geburt entsprechend früher. Die zehn Tage gehen aber nicht verloren: Die Frist nach der Geburt verlängert sich um genau diese Zeit, auf ${M.nachher / 7} Wochen plus zehn Tage. Insgesamt bleibt es also bei mindestens ${(M.vorher + M.nachher) / 7} Wochen Schutz. Liegt eine Frühgeburt im medizinischen Sinn vor, gilt nach der Geburt die längere Frist von ${M.nachherLang / 7} Wochen, ebenfalls verlängert um die verlorenen Tage. Kommt das Kind später, verlängert sich die Frist vor der Geburt, und das Mutterschaftsgeld wird für die zusätzlichen Tage weitergezahlt.</p>

<h2>Schutzfristen nach einer Fehlgeburt</h2>
${h.table(['Fehlgeburt', 'Schutzfrist'], fg, `Nach § 3 Abs. 5 MuSchG, in Kraft seit ${h.date(M.fehlgeburtFrom)}.`, ['l', 'l'])}
<p>Seit ${h.date(M.fehlgeburtFrom)} gilt auch nach einer Fehlgeburt eine gestaffelte Schutzfrist. Die Frau darf in dieser Zeit nur beschäftigt werden, wenn sie sich ausdrücklich dazu bereit erklärt. Weil Mutterschaftsgeld und Arbeitgeberzuschuss für die Schutzfristen nach § 3 MuSchG gezahlt werden, kommt auch für diese Zeit Mutterschaftsgeld in Betracht. Wie die Krankenkasse im Einzelfall rechnet, erfragen Sie bei ihr. Nach einer Fehlgeburt besteht kein Anspruch auf Elterngeld, weil kein Kind im Haushalt lebt.</p>

<h2>Wer welchen Anspruch hat</h2>
<ul>
<li><strong>Gesetzlich versicherte Arbeitnehmerinnen:</strong> Mutterschaftsgeld der Krankenkasse bis ${h.m(M.kasseProTag)} am Tag und Zuschuss des Arbeitgebers.</li>
<li><strong>Privat oder familienversicherte Arbeitnehmerinnen, auch Minijobberinnen ohne eigene Mitgliedschaft:</strong> einmalig bis ${h.m(M.bas)} vom Bundesamt für Soziale Sicherung und Zuschuss des Arbeitgebers.</li>
<li><strong>Andere Mitglieder einer gesetzlichen Krankenkasse mit Anspruch auf Krankengeld</strong>, etwa freiwillig versicherte Selbstständige mit Krankengeldwahl oder Bezieherinnen von Arbeitslosengeld: Mutterschaftsgeld in Höhe des Krankengeldes.</li>
<li><strong>Frauen, deren Arbeitsverhältnis unmittelbar vor der Schutzfrist endet</strong> und die am letzten Tag Mitglied einer Krankenkasse waren, erhalten ebenfalls Mutterschaftsgeld.</li>
</ul>
<p>Endet das Arbeitsverhältnis während der Schwangerschaft durch eine Kündigung, die die Behörde ausnahmsweise für zulässig erklärt hat, zahlt die für das Mutterschaftsgeld zuständige Stelle auch den Zuschuss. Dasselbe gilt, wenn der Arbeitgeber zahlungsunfähig ist. Beamtinnen erhalten während der Schutzfristen ihre Dienstbezüge nach eigenen Vorschriften des Beamtenrechts; diese werden nach der Geburt ebenfalls auf das Elterngeld angerechnet. Gezahlt wird das Mutterschaftsgeld für jeden Kalendertag, also auch für Wochenenden und Feiertage.</p>

<h2>Wie der Zuschuss berechnet wird</h2>
<p>Grundlage ist das um die gesetzlichen Abzüge verminderte Arbeitsentgelt der letzten ${M.bemessungMonate} abgerechneten Kalendermonate vor Beginn der Schutzfrist, umgerechnet auf den Kalendertag. Davon ziehen Arbeitgeber und Kasse die ${h.m(M.kasseProTag)} ab, die die Krankenkasse trägt. Arbeitet eine Frau für mehrere Arbeitgeber, werden die Entgelte zusammengerechnet, und jeder Arbeitgeber zahlt seinen Anteil. Mutterschaftsgeld ruht, solange die Frau beitragspflichtiges Entgelt erhält, etwa wenn sie in der Schutzfrist vor der Geburt freiwillig weiterarbeitet. Einmalzahlungen bleiben dabei außer Betracht.</p>

<h2>Mutterschaftsgeld und Elterngeld</h2>
<p>Die Schutzfrist nach der Geburt fällt in die ersten Lebensmonate des Kindes. Mutterschaftsgeld und Arbeitgeberzuschuss, die für die Zeit ab der Geburt zustehen, werden auf das Elterngeld der Mutter angerechnet. Ausgenommen ist nur die Einmalzahlung des Bundesamts für Soziale Sicherung. In der Praxis bedeutet das: In den ersten beiden Lebensmonaten zahlt die Elterngeldstelle der Mutter meist wenig oder nichts, und diese Monate gelten trotzdem als Monate mit Basiselterngeld. Wer das Elterngeld plant, sollte das berücksichtigen. Die Monate vor der Geburt, in denen Mutterschaftsgeld gezahlt wurde, bleiben bei der Berechnung des Elterngeldes außen vor; stattdessen zählen frühere Monate. Den Betrag berechnen Sie mit dem ${h.a('elterngeld-rechner', 'Elterngeld-Rechner')}.</p>

<h2>Mutterschaftsgeld und Sozialleistungen</h2>
<p>Im Grundsicherungsgeld bleibt das Mutterschaftsgeld nach § 19 MuSchG in voller Höhe anrechnungsfrei. Auch beim Kinderzuschlag zählt Mutterschaftsgeld nicht als Einkommen. Schwangere im Grundsicherungsgeld erhalten zudem einen Mehrbedarf bei Schwangerschaft von ${h.pc(h.P.gsg.mehrbedarfSchwanger)} des Regelbedarfs und auf Antrag Leistungen für die Erstausstattung; mehr unter ${h.a('mehrbedarf', 'Mehrbedarf')}. Wie das Elterngeld bei diesen Leistungen angerechnet wird, steht unter ${h.a('elterngeld-und-sozialleistungen', 'Elterngeld und Sozialleistungen')}.</p>

<h2>Checkliste vor der Schutzfrist</h2>
<ul>
<li>Arbeitgeber über die Schwangerschaft und den voraussichtlichen Entbindungstag informieren.</li>
<li>Zeugnis über den voraussichtlichen Entbindungstag bei Ärztin, Arzt oder Hebamme ausstellen lassen.</li>
<li>Mutterschaftsgeld bei der Krankenkasse beantragen, bei privater oder Familienversicherung beim Bundesamt für Soziale Sicherung.</li>
<li>Elterngeld planen: Wer wann Basiselterngeld oder Elterngeld Plus bezieht und wie die Monate mit Mutterschaftsgeld darin liegen.</li>
<li>Bei geringem Einkommen prüfen, ob nach der Geburt Kinderzuschlag, Wohngeld oder Grundsicherungsgeld in Frage kommen.</li>
</ul>

<h2>Antrag</h2>
<p>Den Antrag bei der Krankenkasse stellen Sie mit dem Zeugnis über den voraussichtlichen Entbindungstag; welche Nachweise die Kasse nach der Geburt braucht, teilt sie Ihnen mit. Das Bundesamt für Soziale Sicherung zahlt nur auf Antrag. Dem Arbeitgeber teilen Sie den Beginn der Schutzfrist rechtzeitig mit, damit er den Zuschuss mit der Gehaltsabrechnung zahlen kann. Für Kindergeld und Elterngeld sind nach der Geburt eigene Anträge bei der Familienkasse und der Elterngeldstelle nötig.</p>
`;
  },
});
