import { count_prep_entries } from './utils/PrepData';
import { tc_to_float, float_to_tc, tc_string_duration } from './utils/Timecode';
import * as CollapsePrepData from './sheets/CollapsePrepData';


// Entry points for Google App Script
function onOpen(): void {
    Logger.log('Hello, World!');

    const ui: GoogleAppsScript.Base.Ui = SpreadsheetApp.getUi();
    ui.createMenu('AAP Tools')
        .addItem('Hello World', 'hello_world')
        .addToUi();
}

// Global declarations for Google Apps scripts:
global.onOpen = onOpen;
global.tc_string_duration = tc_string_duration;
global.collapse_data = CollapsePrepData.collapse_data;
