/** Die Parameterdatei, typisiert. Jede amtliche Zahl, die eine Seite zeigt oder ein Rechner nutzt, kommt von hier. */
import RAW from '../../data/params-2026.json';
export type SourceKey = keyof typeof RAW.sources;
export const P = RAW as typeof RAW & Record<string, any>;
export const TODAY: string = RAW.today;
