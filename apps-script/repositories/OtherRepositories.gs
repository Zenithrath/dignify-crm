const ProjectRepository = {
  findAll: function() {
    const sheet = getSheet('Projects');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const project = {};
      headers.forEach((header, idx) => {
        project[header] = row[idx];
      });
      return project;
    });
  },
  
  findById: function(id) {
    const sheet = getSheet('Projects');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const project = {};
        headers.forEach((header, idx) => {
          project[header] = data[i][idx];
        });
        return project;
      }
    }
    return null;
  },
  
  create: function(projectData) {
    const sheet = getSheet('Projects');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('PRJ');
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      return projectData[header] || '';
    });
    
    sheet.appendRow(row);
    return this.findById(id);
  },
  
  update: function(id, projectData) {
    const sheet = getSheet('Projects');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const rowNum = i + 1;
        headers.forEach((header, idx) => {
          if (projectData.hasOwnProperty(header)) {
            sheet.getRange(rowNum, idx + 1).setValue(projectData[header]);
          }
        });
        return this.findById(id);
      }
    }
    return null;
  }
};

const TaskRepository = {
  findAll: function() {
    const sheet = getSheet('Tasks');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const task = {};
      headers.forEach((header, idx) => {
        task[header] = row[idx];
      });
      return task;
    });
  },
  
  findById: function(id) {
    const sheet = getSheet('Tasks');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const task = {};
        headers.forEach((header, idx) => {
          task[header] = data[i][idx];
        });
        return task;
      }
    }
    return null;
  },
  
  create: function(taskData) {
    const sheet = getSheet('Tasks');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('TASK');
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      return taskData[header] || '';
    });
    
    sheet.appendRow(row);
    return this.findById(id);
  },
  
  update: function(id, taskData) {
    const sheet = getSheet('Tasks');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const rowNum = i + 1;
        headers.forEach((header, idx) => {
          if (taskData.hasOwnProperty(header)) {
            sheet.getRange(rowNum, idx + 1).setValue(taskData[header]);
          }
        });
        return this.findById(id);
      }
    }
    return null;
  }
};

const PaymentRepository = {
  findAll: function() {
    const sheet = getSheet('Payments');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const payment = {};
      headers.forEach((header, idx) => {
        payment[header] = row[idx];
      });
      return payment;
    });
  },
  
  findById: function(id) {
    const sheet = getSheet('Payments');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const payment = {};
        headers.forEach((header, idx) => {
          payment[header] = data[i][idx];
        });
        return payment;
      }
    }
    return null;
  },
  
  create: function(paymentData) {
    const sheet = getSheet('Payments');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('PAY');
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      return paymentData[header] || '';
    });
    
    sheet.appendRow(row);
    return this.findById(id);
  },
  
  update: function(id, paymentData) {
    const sheet = getSheet('Payments');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const rowNum = i + 1;
        headers.forEach((header, idx) => {
          if (paymentData.hasOwnProperty(header)) {
            sheet.getRange(rowNum, idx + 1).setValue(paymentData[header]);
          }
        });
        return this.findById(id);
      }
    }
    return null;
  }
};

const ActivityRepository = {
  findAll: function() {
    const sheet = getSheet('Activities');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const activity = {};
      headers.forEach((header, idx) => {
        activity[header] = row[idx];
      });
      return activity;
    });
  },
  
  findByLeadId: function(leadId) {
    const all = this.findAll();
    return all.filter(a => a.leadId === leadId);
  },
  
  create: function(activityData) {
    const sheet = getSheet('Activities');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('ACT');
    const now = new Date().toISOString();
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      if (header === 'createdAt') return now;
      return activityData[header] || '';
    });
    
    sheet.appendRow(row);
    return { id, ...activityData, createdAt: now };
  }
};

const FollowUpRepository = {
  findAll: function() {
    const sheet = getSheet('FollowUps');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    return data.slice(1).map(row => {
      const followUp = {};
      headers.forEach((header, idx) => {
        followUp[header] = row[idx];
      });
      return followUp;
    });
  },
  
  findByLeadId: function(leadId) {
    const all = this.findAll();
    return all.filter(f => f.leadId === leadId);
  },
  
  create: function(followUpData) {
    const sheet = getSheet('FollowUps');
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const id = generateId('FUP');
    
    const row = headers.map(header => {
      if (header === 'id') return id;
      return followUpData[header] || '';
    });
    
    sheet.appendRow(row);
    return { id, ...followUpData };
  },
  
  update: function(id, followUpData) {
    const sheet = getSheet('FollowUps');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    const idCol = headers.indexOf('id');
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][idCol] === id) {
        const rowNum = i + 1;
        headers.forEach((header, idx) => {
          if (followUpData.hasOwnProperty(header)) {
            sheet.getRange(rowNum, idx + 1).setValue(followUpData[header]);
          }
        });
        return { id, ...followUpData };
      }
    }
    return null;
  }
};
