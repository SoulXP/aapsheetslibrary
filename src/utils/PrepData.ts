// Stefan Olivier
// Description: Utility functions for transforming and processing prep data

import { string_to_prep_data_type, is_prep_valid, is_prep_empty, PrepSingleSourceData, PrepEntryDataType, PrepSingleSourceEntry } from '../common/PrepTypes';
import { is_string, is_date, is_boolean } from './Algorithm';

// Constants
const AAP_PREPLOG_V1_ENTRIES = 6;
const AAP_PREPLOG_V2_ENTRIES = 10;

export function valid_prep_data(entry: PrepSingleSourceData): boolean {
    if (   is_string(entry) && is_prep_valid(entry as string)
        || is_date(entry)
        || is_boolean(entry)   )
    {
        return true;
    }

    return false;
}

export function is_complete_entry(entry: PrepSingleSourceData): boolean {
    if (is_string(entry as string) && !is_prep_empty(entry as string)) {
        return true;
    }

    if (is_date(entry as Date) || is_boolean(entry as boolean)) {
        return true;
    }

    return false;
}

