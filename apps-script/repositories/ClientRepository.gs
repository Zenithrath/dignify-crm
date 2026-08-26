const ClientRepository = {
  findAll: function() {
    const sheet = getSheet('Clients');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const client = {};
      headers.forEach((header, idx) => {
        client[header] = row[idx];
      });
      return client;
    });
  },
  
  findById: function(id) {
    const sheet = getSheet('Clients');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const client = {};
        headers.forEach((header, idx) => {
          client[header] = data[i][idx];
        });
        return client;
      }
    }
    return null;
  },
  
  create: function(clientData) {
    const sheet = getSheet('Clients');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('CLI');
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      return clientData[header] || '';
    });
    
    sheet.appendRow(row);
    return this.findById(id);
  },
  
  update: function(id, clientData) {
    const sheet = getSheet('Clients');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const rowNum = i + 1;
        headers.forEach((header, idx) => {
          if (clientData.hasOwnProperty(header)) {
            sheet.getRange(rowNum, idx + 1).setValue(clientData[header]);
          }
        });
        return this.findById(id);
      }
    }
    return null;
  }
};
