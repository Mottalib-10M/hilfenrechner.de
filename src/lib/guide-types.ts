/**
 * One page = ONE data file in `src/content/pages/<id>.ts`: URL, snippets, H1, standfirst, citable block,
 * FAQ, body, sources, tool. How to add one: CONTRIBUTING-PAGES.md at the repository root.
 */
import type { SourceKey } from './engine/params';
import type { Helpers } from './helpers';

export type Group = 'vergleich' | 'grundsicherung' | 'wohngeld' | 'kinder' | 'eltern';
export interface FAQ { q: string; a: string }
/**
 * Werkzeuge: `haushalt` (alle Leistungen eines Haushalts, Vergleich der Kombinationen), `mini:<art>` (kleiner
 * Rechner zu einem Thema, siehe lib/mini-specs.ts). `props` setzt die Vorgaben der Seite.
 */
export interface ToolDef { kind: string; props?: Record<string, string | number | boolean> }

export interface PageDef {
  id: string;
  group: Group;
  order: number;
  /** Main tool, first screen: the page is a tool page (`data-outil`, 500–700 words are enough). */
  tool?: ToolDef;
  /** Secondary tool placed right after the citable block of a reading page (guide, ≥ 1,200 words). */
  mini?: ToolDef;
  related: string[];
  sources: SourceKey[];
  slug: string;
  nav: string;
  card: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  /** Citable block, 120 words or more, one paragraph (RECETTE §21). */
  resume: (h: Helpers) => string;
  faqs: (h: Helpers) => FAQ[];
  /** HTML. A tool can be placed inside with `<!--tool:mini:regelsatz-->` or `<!--tool:haushalt|{"erwachsene":1}-->`. */
  body: (h: Helpers) => string;
}
export const definePage = (g: PageDef): PageDef => g;
