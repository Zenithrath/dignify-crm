// Leads API
function getLeads() {
  try {
    return { success: true, data: LeadRepository.findAll() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function getLeadById(id) {
  try {
    const lead = LeadRepository.findById(id);
    if (!lead) return { success: false, error: 'Lead not found' };
    return { success: true, data: lead };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function createLead(data) {
  try {
    const lead = LeadService.createLead(data);
    return { success: true, data: lead };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function updateLead(id, data) {
  try {
    const lead = LeadService.updateLead(id, data);
    return { success: true, data: lead };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function updateLeadStage(id, stage) {
  try {
    const lead = LeadService.updateStage(id, stage);
    return { success: true, data: lead };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function addLeadActivity(leadId, activityData) {
  try {
    const activity = ActivityRepository.create({
      leadId: leadId,
      ...activityData,
      createdBy: Session.getActiveUser().getEmail()
    });
    return { success: true, data: activity };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function getLeadActivities(leadId) {
  try {
    const activities = ActivityRepository.findByLeadId(leadId);
    return { success: true, data: activities };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Clients API
function getClients() {
  try {
    return { success: true, data: ClientRepository.findAll() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function getClientById(id) {
  try {
    const client = ClientRepository.findById(id);
    if (!client) return { success: false, error: 'Client not found' };
    return { success: true, data: client };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function convertLeadToClient(leadId) {
  try {
    const client = LeadService.convertToClient(leadId);
    return { success: true, data: client };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Projects API
function getProjects() {
  try {
    return { success: true, data: ProjectRepository.findAll() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function getProjectById(id) {
  try {
    const project = ProjectRepository.findById(id);
    if (!project) return { success: false, error: 'Project not found' };
    return { success: true, data: project };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function createProject(data) {
  try {
    const project = ProjectService.createProject(data);
    return { success: true, data: project };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function updateProject(id, data) {
  try {
    const project = ProjectService.updateProject(id, data);
    return { success: true, data: project };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Tasks API
function getTasks() {
  try {
    return { success: true, data: TaskRepository.findAll() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function getTaskById(id) {
  try {
    const task = TaskRepository.findById(id);
    if (!task) return { success: false, error: 'Task not found' };
    return { success: true, data: task };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function createTask(data) {
  try {
    const task = TaskRepository.create(data);
    return { success: true, data: task };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function updateTask(id, data) {
  try {
    const task = TaskRepository.update(id, data);
    return { success: true, data: task };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Payments API
function getPayments() {
  try {
    return { success: true, data: PaymentRepository.findAll() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function createPayment(data) {
  try {
    const payment = PaymentService.recordPayment(data);
    return { success: true, data: payment };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Services API
function getServices() {
  try {
    const sheet = getSheet('Services');
    const data = sheet.getDataRange().getValues();
    const headers = data[0];
    
    const services = data.slice(1).map(row => {
      const service = {};
      headers.forEach((header, idx) => {
        service[header] = row[idx];
      });
      return service;
    });
    
    return { success: true, data: services };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Dashboard API
function getDashboardData() {
  try {
    const data = DashboardService.getData();
    return { success: true, data: data };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

// Follow-ups API
function getFollowUps() {
  try {
    return { success: true, data: FollowUpRepository.findAll() };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function createFollowUp(data) {
  try {
    const followUp = FollowUpRepository.create(data);
    return { success: true, data: followUp };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function updateFollowUp(id, data) {
  try {
    const followUp = FollowUpRepository.update(id, data);
    return { success: true, data: followUp };
  } catch (e) {
    return { success: false, error: e.message };
  }
}
