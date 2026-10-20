import { describe, it, expect } from 'vitest';
import { lohnsteuer } from '../src/lib/engine/lohnsteuer';
import FIX from './fixtures/lst2026-bmf.json';
/** Fixtures: answers of the BMF interface (LSt2026ext) read on 2026-10-20, in cents. */
describe('Lohnsteuer 2026 = BMF', () => {
  for (const f of FIX as Array<{ in: Record<string, number>; LSTLZZ: number; SOLZLZZ: number; BK: number }>) {
    const c = f.in;
    it(JSON.stringify(c), () => {
      const r = lohnsteuer({ lzz: c.LZZ as 1 | 2, re4: c.RE4 / 100, stkl: c.STKL as 1, zkf: c.ZKF ?? 0, church: c.R === 1, kvz: 2.9, pvs: c.PVS === 1, pvz: c.PVZ === 1, pva: c.PVA ?? 0, pkv: c.PKV === 1, pkpv: (c.PKPV ?? 0) / 100, pkpvAgz: (c.PKPVAGZ ?? 0) / 100, noRv: c.KRV === 1, noAlv: c.ALV === 1 });
      expect(Math.round(r.lst * 100)).toBe(f.LSTLZZ);
      expect(Math.round(r.soli * 100)).toBe(f.SOLZLZZ);
      expect(Math.round(r.bk * 100)).toBe(f.BK);
    });
  }
});

import { sonstigerBezug } from '../src/lib/engine/lohnsteuer';
import SON from './fixtures/sonst2026-bmf.json';
describe('Sonstiger Bezug 2026 = BMF', () => {
  for (const f of SON as Array<{ in: Record<string, number>; STS: number; SOLZS: number; BKS: number }>) {
    const c = f.in;
    it(JSON.stringify(c), () => {
      const r = sonstigerBezug({ jahresLohn: c.JRE4 / 100, bezug: c.SONSTB / 100, stkl: c.STKL as 1, zkf: c.ZKF ?? 0, church: c.R === 1, kvz: 2.9, pvz: c.PVZ === 1, pva: c.PVA ?? 0, pkv: c.PKV === 1, pkpv: (c.PKPV ?? 0) / 100, noRv: c.KRV === 1, noAlv: c.ALV === 1 });
      expect(Math.round(r.lst * 100)).toBe(f.STS);
      expect(Math.round(r.soli * 100)).toBe(f.SOLZS);
      expect(Math.round(r.bk * 100)).toBe(f.BKS);
    });
  }
});
