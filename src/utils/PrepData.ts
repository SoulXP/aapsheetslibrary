// Stefan Olivier
// Description: Utility functions for transforming and processing prep data

import { string_to_prep_entry_data, PrepEntryData } from '../common/PrepTypes';
import { get_type } from './Algorithm';

// Constants
const AAP_PREPLOG_V1_ENTRIES = 6;
const AAP_PREPLOG_V2_ENTRIES = 10;

export function valid_prep_data(entry: string | Date | boolean): boolean {
    if (   get_type(entry) === 'string' && string_to_prep_entry_data(entry as string) === PrepEntryData.valid
        || get_type(entry) === 'date'
        || get_type(entry) === 'boolean'   )
    {
        return true;
    }

    return false;
}

