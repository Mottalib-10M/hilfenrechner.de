/** llms.txt (RECETTE §21): was die Seite ist, woher ihre Zahlen kommen, ihre Seiten. Aus den Daten gebaut. */
import type { APIRoute } from 'astro';
import { PAGES } from '../lib/guides';
import { route } from '../i18n/routes';
import { SITE_URL, LAST_UPDATED } from '../data/site-config';
export const GET: APIRoute = () => {
  const lines = [
    '# Hilfenrechner',
    '',
    `> Sozialleistungen in Deutschland für einen Haushalt, im Browser gerechnet: Grundsicherungsgeld nach dem SGB II in der Fassung ab 1. Juli 2026 (BGBl. 2026 I Nr. 107), Wohngeld nach der Formel des § 19 WoGG mit Mietstufen der Wohngeldverordnung, Kinderzuschlag nach § 6a BKGG, Kindergeld, Unterhaltsvorschuss, Elterngeld und Mutterschaftsgeld, dazu die Vorrangprüfung nach § 12a SGB II (Wohngeld und Kinderzuschlag oder Grundsicherungsgeld) und die zuständige Stelle für jeden Antrag. Beträge 2026; Entwürfe für 2027 nur als angekündigt. Quellen gelesen am ${LAST_UPDATED}. Herausgeber: Radif Partners, unabhängig; keine Behörde, keine Rechtsberatung, keine Antragstellung.`,
    '',
    '## Rechner und Seiten',
    `- [Alle Leistungen im Vergleich](${SITE_URL}${route('home', 'de')}): Grundsicherungsgeld, Wohngeld, Kinderzuschlag, Kindergeld und Unterhaltsvorschuss für einen Haushalt, mit Vorrangprüfung.`,
    ...PAGES.map((p) => `- [${p.nav}](${SITE_URL}${route(p.id, 'de')}): ${p.card}`),
    '',
    '## Methode',
    `- [Rechenweg und Quellen](${SITE_URL}${route('method', 'de')})`,
    `- [Über uns](${SITE_URL}${route('about', 'de')})`,
  ];
  return new Response(lines.join('\n') + '\n', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
