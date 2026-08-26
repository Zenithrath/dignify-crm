const SS_ID = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');

function getSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SS_ID);
  const sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    throw new Error(`Sheet "${sheetName}" not found`);
  }
  return sheet;
}

function getOrCreateSheet(sheetName) {
  const ss = SpreadsheetApp.openById(SS_ID);
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }
  return sheet;
}

function generateId(prefix) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);
    
    const sheet = getSheet('Settings');
    const data = sheet.getDataRange().getValues();
    
    let currentYear = new Date().getFullYear();
    let counter = 1;
    
    // Find existing counter for this prefix and year
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === `${prefix}_${currentYear}`) {
        counter = data[i][1] + 1;
        sheet.getRange(i + 1, 2).setValue(counter);
        break;
      }
    }
    
    // Create new counter if not found
    if (counter === 1) {
      sheet.appendRow([`${prefix}_${currentYear}`, 1]);
      counter = 1;
    }
    
    return `${prefix}-${currentYear}-${String(counter).padStart(4, '0')}`;
  } finally {
    lock.releaseLock();
  }
}

function formatDate(date) {
  if (!date) return '';
  return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy-MM-dd');
}

function formatDateTime(date) {
  if (!date) return '';
  return Utilities.formatDate(new Date(date), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
}
