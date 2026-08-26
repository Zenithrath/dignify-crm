/**
 * Google Sheets Database Setup Script
 * Run this once to create all required sheets with headers
 */

function setupDatabase() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  
  const sheets = {
    'Users': ['id', 'name', 'email', 'role', 'active'],
    'Leads': [
      'id', 'businessName', 'contactPerson', 'whatsapp', 'email',
      'instagramWebsite', 'category', 'leadSource', 'interestedService',
      'pic', 'estimatedValue', 'priority', 'pipelineStage', 'lastContact',
      'nextFollowUp', 'nextAction', 'notes', 'createdAt', 'updatedAt'
    ],
    'Activities': ['id', 'leadId', 'clientId', 'type', 'description', 'createdBy', 'createdAt'],
    'FollowUps': ['id', 'leadId', 'date', 'time', 'action', 'pic', 'status', 'notes'],
    'Clients': [
      'id', 'businessName', 'contactPerson', 'whatsapp', 'email',
      'industry', 'pic', 'clientSince', 'totalProjectValue', 'notes'
    ],
    'Projects': [
      'id', 'projectName', 'clientId', 'service', 'pic', 'teamMembers',
      'startDate', 'deadline', 'stage', 'status', 'progress',
      'projectValue', 'driveLink', 'notes'
    ],
    'Tasks': [
      'id', 'title', 'description', 'projectId', 'assignedTo',
      'priority', 'status', 'dueDate', 'createdAt'
    ],
    'Services': [
      'id', 'category', 'serviceName', 'level', 'minimumPrice',
      'maximumPrice', 'estimatedDuration', 'description', 'active'
    ],
    'Payments': [
      'id', 'projectId', 'clientId', 'type', 'amount', 'dueDate',
      'paidDate', 'status', 'paymentMethod', 'notes'
    ],
    'Settings': ['key', 'value'],
    'AuditLog': ['timestamp', 'user', 'action', 'entity', 'recordId', 'details']
  };
  
  for (const [sheetName, headers] of Object.entries(sheets)) {
    let sheet = ss.getSheetByName(sheetName);
    
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#f3f4f6');
      headerRange.setBorder(true, true, true, true, true, true);
      
      // Auto-resize columns
      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }
    }
  }
  
  // Add initial settings
  const settingsSheet = ss.getSheetByName('Settings');
  const settingsData = settingsSheet.getDataRange().getValues();
  
  const defaultSettings = [
    ['ID_COUNTER_LEAD', '0'],
    ['ID_COUNTER_CLIENT', '0'],
    ['ID_COUNTER_PROJECT', '0'],
    ['ID_COUNTER_TASK', '0'],
    ['ID_COUNTER_ACTIVITY', '0'],
    ['ID_COUNTER_PAYMENT', '0'],
    ['ID_COUNTER_FOLLOWUP', '0'],
    ['CURRENT_YEAR', new Date().getFullYear().toString()],
  ];
  
  for (const [key, value] of defaultSettings) {
    if (!settingsData.some(row => row[0] === key)) {
      settingsSheet.appendRow([key, value]);
    }
  }
  
  Logger.log('Database setup complete!');
  SpreadsheetApp.getUi().alert('Database setup complete! All sheets have been created.');
}
