// Types
export type prepentry_t = [Date, number, string, Date, Date, Date];
export type entrycount_t = [string, Date, number];

// Functions
export function count_prep_entries(entries: prepentry_t[]): entrycount_t[] {
    if (entries.length === 0) return [];

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

    // Count date occurrences
    let last_date: Date = new Date();
    let last_employee: string = '';
    let count: number = 0;
    let reduced: entrycount_t[] = [];
    let entry: entrycount_t = [last_employee, last_date, count];

    for (const r of sorted_entries) {
        const date: Date = r[0];
        const employee: string = r[2];

        if (last_employee === '') {
            last_date = date;
            last_employee = employee;
            count++;
            continue;
        }

        if (employee === last_employee) {
            entry[0] = employee;
            
            if (date === last_date) {
                count++;
            }

            entry[1] = date;
            entry[2] = count;
            
            continue;
        }

        reduced.push(entry);
        count = 0;
        last_employee = employee;
        last_date = date;
        entry = [last_employee, last_date, count];
    }
    
    Logger.log(`Date: ${sorted_entries[0][0]}`);
    return reduced;
}