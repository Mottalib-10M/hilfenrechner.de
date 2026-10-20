/**
 * Arbeitnehmeranteile zur Sozialversicherung 2026 (Monat): Rente 9,3 %, Arbeitslosenversicherung 1,3 %,
 * Krankenversicherung 7,0 % + halber Zusatzbeitrag, Pflege 1,8 % (Sachsen 2,3 %), + 0,6 % ohne Kinder,
 * − 0,25 % je Kind vom zweiten bis zum fünften Kind unter 25. Bemessungsgrenzen 101.400 € (RV, AV) und
 * 69.750 € (KV, PV) im Jahr. Quellen: PAP 2026, BAnz AT 10.11.2025 B7, § 55 SGB XI.
 */
import { P } from './params';
export interface SvInput { kvz?: number; sachsen?: boolean; kinder?: number; kinderlos?: boolean }
export interface SvResult { rv: number; av: number; kv: number; pv: number; total: number; pvRate: number; kvRate: number }
const r2 = (x: number) => Math.round(x * 100 + 1e-9) / 100;
export function pvRate(i: SvInput): number {
  const S = P.sv; const k = i.kinder ?? 0;
  let r = i.sachsen ? S.pvAnSachsen : S.pvAn;
  if (i.kinderlos ?? k === 0) r += S.pvKinderlos;
  else if (k >= 2) r -= S.pvAbschlag * Math.min(k - 1, 4);
  return Math.round(r * 100000) / 100000;
}
export const kvRate = (kvz = P.sv.zusatzDurchschnitt) => Math.round((P.sv.kvAllgAn + kvz / 200) * 100000) / 100000;
/** Beiträge auf ein Monatsentgelt; `rvBase`/`kvBase` erlauben eine reduzierte Bemessungsgrundlage (Einmalzahlung). */
export function sv(gross: number, i: SvInput, rvBase = Math.min(gross, P.sv.bbgRv / 12), kvBase = Math.min(gross, P.sv.bbgKv / 12)): SvResult {
  const S = P.sv; const pr = pvRate(i), kr = kvRate(i.kvz);
  const rv = r2(rvBase * S.rvAn), av = r2(rvBase * S.avAn), kv = r2(kvBase * kr), pv = r2(kvBase * pr);
  return { rv, av, kv, pv, total: r2(rv + av + kv + pv), pvRate: pr, kvRate: kr };
}
