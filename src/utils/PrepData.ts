// Types
export type prepentry_t = [Date, number | string, string, Date, Date, Date, Date];
export type entry_t = {
    date: Date,
    location: number | string,
    employee: string,
    start: Date,
    tcin: Date,
    tcout: Date,
    tcdur: Date,
    end: Date,
};


const AAP_PREPLOG_V1_ENTRIES = 6;
const AAP_PREPLOG_V2_ENTRIES = 10;

// Functions
export function count_prep_entries(entries: prepentry_t[]): prepentry_t[] {
    if (entries.length === 0) return [];
    if (entries[0].length % AAP_PREPLOG_V1_ENTRIES !== 0) throw '[ERROR] insufficient prep entries';

    // Collapse columns to total prep entries
    let i: number = 0;
    const collapsed_entries: prepentry_t[] = [];
    const entry: entry_t = { date: new Date(), location: 0, employee: '', start: new Date(), end: new Date(), tcin: new Date(), tcout: new Date(), tcdur: new Date() };
    for (const r of entries) {
        let { date, location, employee, start, end, tcin, tcout, tcdur }: entry_t = entry;
        for (const c of r) {
            switch (i) {
                case 0: date = c; break;
            }
        }
    }

    // Sort by date
    const sorted_entries = [...entries].sort((a: prepentry_t, b: prepentry_t): number => {
        if (a[0] === b[0]) return 0;
        if (a[0] < b[0]) return -1;
        return 1;
    });

    // Sort by employee
    sorted_entries.sort((a: prepentry_t, b: prepentry_t): number => {
        if (a[2] === b[2]) return 0;
        if (a[2] < b[2]) return -1;
        return 1;
    });

    return sorted_entries;
}

