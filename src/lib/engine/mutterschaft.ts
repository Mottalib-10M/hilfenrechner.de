/**
 * Mutterschaftsgeld und Arbeitgeberzuschuss während der Schutzfristen (§ 3 MuSchG): 6 Wochen vor und 8 Wochen
 * nach der Entbindung, 12 Wochen nach Früh- oder Mehrlingsgeburt. Gesetzlich Versicherte mit eigenem Anspruch auf
 * Krankengeld: höchstens 13 € je Kalendertag von der Krankenkasse (§ 24i SGB V), der Arbeitgeber zahlt den
 * Unterschied zum durchschnittlichen Nettoarbeitsentgelt (§ 20 MuSchG). Privat oder familienversicherte
 * Arbeitnehmerinnen: einmalig höchstens 210 € vom Bundesamt für Soziale Sicherung (§ 19 Abs. 2 MuSchG) und
 * ebenfalls der Arbeitgeberzuschuss. Kalendertäglich = Monatsnetto der letzten drei Monate / 30.
 */
import { P } from './params';

export type MuVersicherung = 'gkv' | 'privat';
export interface MuInput { nettoMonat: number; versicherung: MuVersicherung; lang?: boolean }
export interface MuResult { tage: number; proTag: number; kasseTag: number; agTag: number; kasse: number; arbeitgeber: number; bas: number; gesamt: number }

const r2 = (x: number) => Math.round(x * 100) / 100;
export function mutterschaftsgeld(i: MuInput): MuResult {
  const M = P.mutterschaft;
  const tage = M.vorher + (i.lang ? M.nachherLang : M.nachher);
  const proTag = r2(Math.max(0, i.nettoMonat) / 30);
  const kasseTag = i.versicherung === 'gkv' ? Math.min(M.kasseProTag, proTag) : 0;
  // Der Zuschuss ist der Unterschied zwischen 13 € und dem Nettoentgelt, auch bei privat Versicherten.
  const agTag = r2(Math.max(0, proTag - M.kasseProTag));
  const kasse = r2(kasseTag * tage), arbeitgeber = r2(agTag * tage);
  const bas = i.versicherung === 'privat' && i.nettoMonat > 0 ? M.bas : 0;
  return { tage, proTag, kasseTag, agTag, kasse, arbeitgeber, bas, gesamt: r2(kasse + arbeitgeber + bas) };
}
