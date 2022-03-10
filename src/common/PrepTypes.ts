// Stefan Olivier
// Description: Common types for AAP production related data

import { is_string } from "../utils/Algorithm";

export enum PrepSuites {
    ws_one = 1,
    ws_two,
    ws_three,
    ws_four,
    ws_five,
    ws_six,
    ws_seven,
    ws_eight,
    ws_nine,
    ws_ten,
    east,
    south,
    west,
    unknown,
};

export function string_to_prep_suite(suite: string): PrepSuites {
    const sanitized = suite.toLowerCase().trim();
    switch (sanitized) {
        case '1': return PrepSuites.ws_one;
        case '2': return PrepSuites.ws_two;
        case '3': return PrepSuites.ws_three;
        case '4': return PrepSuites.ws_four;
        case '5': return PrepSuites.ws_five;
        case '6': return PrepSuites.ws_six;
        case '7': return PrepSuites.ws_seven;
        case '8': return PrepSuites.ws_eight;
        case '9': return PrepSuites.ws_nine;
        case '10': return PrepSuites.ws_ten;
        case 'w': case 'west': return PrepSuites.west;
        case 's': case 'south': return PrepSuites.south;
        case 'e': case 'east': return PrepSuites.east;
        case 'unknown': return PrepSuites.unknown;
        default: throw new Error(`[ERROR] could not determine prep suite from string value ${suite}`);
    }
}

export enum PrepEntryDataType {
    skip,
    invalid,
    valid,
    empty
};

export function string_to_prep_data_type(type: string): PrepEntryDataType {
    const sanitized: string = type.toLowerCase().trim();
    switch (sanitized) {
        case '':
            return PrepEntryDataType.empty;
        case '>>>':
        case '>>':
        case '>':
        case 'v':
            return PrepEntryDataType.skip;
        default:
            return PrepEntryDataType.valid;
    }
}

export function is_prep_empty(value: string): boolean {
    return string_to_prep_data_type(value) === PrepEntryDataType.empty;
}

export function is_prep_skip(value: string): boolean {
    return string_to_prep_data_type(value) === PrepEntryDataType.skip;
}

export function is_prep_valid(value: string): boolean {
    return string_to_prep_data_type(value) === PrepEntryDataType.valid;
}

export enum PrepType {
    v1,
    v2,
    unknown,
}

export type PrepSingleSourceData  = string | Date | boolean;
export type PrepSingleSourceEntry = PrepSingleSourceData[];
export type PrepMultiSourceEntry  = PrepSingleSourceEntry[];
export type PrepSingleParsedEntry = [Date, string, string, string, string, string, string, string];
export type PrepMultiParsedEntry  = PrepSingleParsedEntry[];

export interface IPrepEntry {
    date: Date,
    type: PrepType,
    suite: PrepSuites,
    employee: string,
    start: string,
    tcin: string,
    tcout: string,
    end: string,
};

export type PrepEntry = IPrepEntry;

export function create_prep_entry(date =  new Date(),
                                  type = PrepType.unknown,
                                  suite = PrepSuites.unknown,
                                  employee = '',
                                  start =  '',
                                  end =  '',
                                  tcin =  '',
                                  tcout =  ''): PrepEntry
{
    return { date, type, suite, employee, start, end, tcin, tcout };  
}
