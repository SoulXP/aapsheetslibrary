// Types 
export type timecode_t = string;

// Globals for module
const MICROSECONDS_TICKS: number = 10000000.0;
const NANOSECONDS_TICKS: number = 1000000000.0;
const TICK_RATE: number = MICROSECONDS_TICKS;

// TODO: Fix precision/rounding error for floats
export function float_to_tc(n: number, tick_rate: number = TICK_RATE): timecode_t {
    if (n === 0) return '00:00:00';

    let h: number = 0.0;
    let m: number = 0.0;
    let s: number = 0.0;

    if (n >= 60.0 * 60.0 * tick_rate) {
        h = n / (60.0 * 60.0 * tick_rate);
        h = Math.trunc(h);
        n = n % (60.0 * 60.0 * tick_rate);
    }
    
    if (n >= 60.0 * tick_rate) {
        m = n / (60.0 * tick_rate);
        m = Math.trunc(m);
        n = n % (60.0 * tick_rate);
    }
    
    if (n >= tick_rate) {
        s = n / tick_rate;
        s = Math.trunc(s);
        n = n % tick_rate;
    }

    const hs: string = (h.toString().length === 1) ? '0' + h.toString() : h.toString();
    const ms: string = (m.toString().length === 1) ? '0' + m.toString() : m.toString();
    const ss: string = (s.toString().length === 1) ? '0' + s.toString() : s.toString();

    return `${hs}:${ms}:${ss}`;
}

export function tc_to_float(tc: timecode_t, tick_rate: number = TICK_RATE): number {
    let h: number = 0.0;
    let m: number = 0.0;
    let s: number = 0.0;

    const chunks: string[] = tc.split(':') // TODO: Handle drop-frame with ; delimiter
    
    h = parseFloat(chunks[0]) * 60.0 * 60.0;
    m = parseFloat(chunks[1]) * 60.0;
    s = parseFloat(chunks[2]);

    return (h + m + s) * tick_rate;
}

export function tc_string_duration(a: timecode_t, b: timecode_t, tick_rate: number = TICK_RATE): timecode_t {
    const an: number = tc_to_float(a, tick_rate);
    const bn: number = tc_to_float(b, tick_rate);
    const m: number = Math.min(an, bn);
    const n: number = Math.max(an, bn);
    return float_to_tc(n - m, tick_rate);
}

export enum TimecodeFormat {
    HMSF,
    MSF,
    HMS,
    MS,
    HM,
};

export function tc_format(): TimecodeFormat {
    // TODO: Actual implementation
    return TimecodeFormat.HMS;
}