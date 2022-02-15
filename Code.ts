import { count_prep_entries } from './src/utils/aapprep';
import { tc_to_float, float_to_tc, tc_string_duration } from './src/utils/timecode';

function onOpen(): void {
    Logger.log('Hello, World!');

    const ui: GoogleAppsScript.Base.Ui = SpreadsheetApp.getUi();
    ui.createMenu('AAP Tools')
        .addItem('Hello World', 'hello_world')
        .addToUi();
}