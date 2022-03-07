// Stefan Olivier
// Description: Scripts for manipulating and transforming prep related data on Google spreadsheets

import * as GoogleTypes from '../common/GoogleSheets';
import { create_prep_entry, PrepEntry, string_to_prep_suite } from '../common/PrepTypes';

const PREP_V1_SIZE: number    = 6;
const PREP_V2_SIZE: number    = 10;
const PREP_ENTRY_SIZE: number = 7;

type PrepRawEntry = (string | Date | boolean)[][];

type PrepMultiEntry = (string | Date | boolean)[];

export function collapse_data(sheet_name: string, row: number = 2, column: number = 1): PrepEntry[] | undefined {
    if (row < 1) {
        Logger.log(`[ERROR] row position must be greater than 0`);
        return;
    }

    if (column < 1) {
        Logger.log(`[ERROR] column position must be greater than 0`);
        return;
    }

    const sheet: GoogleTypes.Sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet_name);

    if (sheet === null) {
        Logger.log(`[ERROR] sheet of name ${sheet_name} does not exist`);
        return;
    }

    const last_row: number = sheet.getLastRow();
    const prep_data: PrepRawEntry = sheet.getRange(row, column, last_row, PREP_ENTRY_SIZE * PREP_V1_SIZE).getValues();

    type PrepColumn = Date | string | boolean;
    const data_collapsed: PrepEntry[] = [];
    let entry_group: number = 0;
    let entry_position: number = 0;

    prep_data.forEach((c_row: PrepMultiEntry): void => {
        const row_collapsed: PrepEntry = create_prep_entry();

        c_row.forEach((c_column: PrepColumn, j: number): void => {
            const column_index = j - (entry_group * PREP_ENTRY_SIZE);
            switch (column_index) {
                case 0: row_collapsed['date'] = new Date(c_column as Date);                break;
                case 1: row_collapsed['suite'] = string_to_prep_suite(c_column as string); break;
                case 2: row_collapsed['employee'] = c_column as string;                    break;
                case 3: row_collapsed['start'] = new Date(c_column as Date);               break;
                case 4: row_collapsed['tcin'] = new Date(c_column as Date);                break;
                case 5: row_collapsed['tcout'] = new Date(c_column as Date);               break;
                case 6: row_collapsed['end'] = new Date(c_column as Date);                 break;
            }

            entry_position++;
            if (entry_position === PREP_ENTRY_SIZE) {
                entry_group++;
                entry_position = 0;
            }
        });

        data_collapsed.push(row_collapsed);
    });

    return data_collapsed;
} 
