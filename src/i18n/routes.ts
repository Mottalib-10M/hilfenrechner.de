import { makeRouter, type RouteDef } from './routes-core';
import { PAGES } from '../lib/guides';
export const LOCALES = ['de'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'de';
const R = (id: string, de: string, noindex = false): RouteDef<Locale> => ({ id, paths: { de: `/de/${de}/` }, ...(noindex ? { noindex } : {}) });
const CORE: RouteDef<Locale>[] = [
  { id: 'home', paths: { de: '/de/' } },
  R('method', 'methodik'),
  R('about', 'ueber-uns'),
  R('widget', 'widget', true),
  R('contact', 'kontakt', true),
  R('editorial', 'redaktionsgrundsaetze', true),
  R('privacy', 'datenschutz', true),
  R('terms', 'impressum', true),
  R('cookies', 'cookies', true),
];
export const ROUTES: RouteDef<Locale>[] = [CORE[0], ...PAGES.map((p) => R(p.id, p.slug)), ...CORE.slice(1)];
export const { NOINDEX_PATHS, route, altPaths } = makeRouter(LOCALES, ROUTES);
