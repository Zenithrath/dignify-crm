const LeadRepository = {
  findAll: function() {
    const sheet = getSheet('Leads');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const lead = {};
      headers.forEach((header, idx) => {
        lead[header] = row[idx];
      });
      return lead;
    });
  },
  
  findById: function(id) {
    const sheet = getSheet('Leads');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const lead = {};
        headers.forEach((header, idx) => {
          lead[header] = data[i][idx];
        });
        return lead;
      }
    }
    return null;
  },
  
  create: function(leadData) {
    const sheet = getSheet('Leads');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('LEAD');
    const now = new Date().toISOString();
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      if (header === 'createdAt') return now;
      if (header === 'updatedAt') return now;
      return leadData[header] || '';
    });
    
    sheet.appendRow(row);
    return this.findById(id);
  },
  
  update: function(id, leadData) {
    const sheet = getSheet('Leads');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const rowNum = i + 1;
        headers.forEach((header, idx) => {
          if (leadData.hasOwnProperty(header)) {
            sheet.getRange(rowNum, idx + 1).setValue(leadData[header]);
          }
        });
        sheet.getRange(rowNum, headers.indexOf('updatedAt') + 1)
          .setValue(new Date().toISOString());
        return this.findById(id);
      }
    }
    return null;
  }
};
