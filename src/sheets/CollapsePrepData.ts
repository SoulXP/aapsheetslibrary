// Stefan Olivier
// Description: Scripts for manipulating and transforming prep related data on Google spreadsheets

import * as GoogleTypes from '../common/GoogleSheets';
import { valid_prep_data } from '../utils/PrepData';

const PREP_V1_SIZE: number    = 6;
const PREP_V2_SIZE: number    = 10;
const PREP_ENTRY_SIZE: number = 7;

type PrepMultiEntry     = (string | Date | boolean)[];
type PrepRawEntry       = PrepMultiEntry[];
type PrepCollapsedEntry = [Date, string, string, string, string, string, string, string];
type PrepCollapsedData  = PrepCollapsedEntry[];

export function collapse_data(sheet_name: string,
                              row: number = 2,
                              column: number = 1,
                              num_rows: number = 40,
                              num_columns: number = PREP_ENTRY_SIZE * PREP_V1_SIZE): PrepCollapsedData | undefined
{
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
    const prep_data: PrepRawEntry = sheet.getRange(row, column, last_row, PREP_ENTRY_SIZE * (PREP_V1_SIZE + PREP_V2_SIZE)).getValues();

    type PrepColumn = Date | string | boolean;
    // const data_collapsed: PrepEntry[] = [];
    const data_collapsed: PrepCollapsedData = [];
    let entry_group: number = 0;
    let entry_position: number = 0;
    let new_entry: boolean = false;

    prep_data.forEach((c_row: PrepMultiEntry): void => {
        // const row_collapsed: PrepEntry = create_prep_entry();
        const row_collapsed: PrepCollapsedEntry = [
            new Date(),
            '',
            '',
            '',
            '',
            '',
            '',
            ''
        ];

        c_row.forEach((c_column: PrepColumn, j: number): void => {
            const column_index = j - (entry_group * PREP_ENTRY_SIZE);

            if (valid_prep_data(c_column)) {
                new_entry = true;
                switch (column_index) {
                    case 0:                     row_collapsed[0] = new Date(c_column as Date);                                                                break;
                    case 1:                     row_collapsed[1] = (j < PREP_ENTRY_SIZE * PREP_V1_SIZE) ? 'V1' : 'V2'; row_collapsed[2] = c_column as string; break;
                    case 2:                     row_collapsed[3] = c_column as string;                                                                        break;
                    case 3:                     row_collapsed[4] = c_column as string;                                                                        break;
                    case 4:                     row_collapsed[5] = c_column as string;                                                                        break;
                    case 5:                     row_collapsed[6] = c_column as string;                                                                        break;
                    case 6:                     row_collapsed[7] = c_column as string;                                                                        break;
                    default: new_entry = false;                                                                                                               break;
                }
            }

            entry_position++;
            if (entry_position === PREP_ENTRY_SIZE) {
                entry_group++;
                entry_position = 0;

                if (new_entry) {
                    data_collapsed.push([...row_collapsed]);
                    new_entry = false;
                }
            }
        });
        
        entry_group = 0;
        entry_position = 0;
    });

    return data_collapsed;
} 
