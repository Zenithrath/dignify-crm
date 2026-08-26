const LeadService = {
  createLead: function(data) {
    return LeadRepository.create({
      businessName: data.businessName,
      contactPerson: data.contactPerson,
      whatsapp: data.whatsapp,
      email: data.email,
      instagramWebsite: data.instagramWebsite || '',
      category: data.category || 'Other',
      leadSource: data.leadSource || 'Other',
      interestedService: data.interestedService || '',
      pic: data.pic || '',
      estimatedValue: data.estimatedValue || 0,
      priority: data.priority || 'Medium',
      pipelineStage: data.pipelineStage || 'Prospect',
      lastContact: formatDate(new Date()),
      nextFollowUp: data.nextFollowUp || '',
      nextAction: data.nextAction || '',
      notes: data.notes || ''
    });
  },
  
  updateLead: function(id, data) {
    return LeadRepository.update(id, data);
  },
  
  updateStage: function(id, stage) {
    const lead = LeadRepository.findById(id);
    if (!lead) throw new Error('Lead not found');
    
    ActivityRepository.create({
      leadId: id,
      type: 'Status Change',
      description: `Stage changed from ${lead.pipelineStage} to ${stage}`,
      createdBy: Session.getActiveUser().getEmail()
    });
    
    return LeadRepository.update(id, {
      pipelineStage: stage,
      lastContact: formatDate(new Date())
    });
  },
  
  convertToClient: function(leadId) {
    const lead = LeadRepository.findById(leadId);
    if (!lead) throw new Error('Lead not found');
    if (lead.pipelineStage !== 'Won') throw new Error('Lead must be Won to convert');
    
    const client = ClientRepository.create({
      businessName: lead.businessName,
      contactPerson: lead.contactPerson,
      whatsapp: lead.whatsapp,
      email: lead.email,
      industry: lead.category,
      pic: lead.pic,
      clientSince: formatDate(new Date()),
      totalProjectValue: 0,
      notes: lead.notes
    });
    
    ActivityRepository.create({
      leadId: leadId,
      clientId: client.id,
      type: 'Status Change',
      description: `Lead converted to client ${client.id}`,
      createdBy: Session.getActiveUser().getEmail()
    });
    
    return client;
  }
};

const ProjectService = {
  calculateProgress: function(stage) {
    const progressMap = {
      'Waiting Brief': 5,
      'Discovery': 15,
      'Wireframe': 25,
      'UI Design': 40,
      'Development': 65,
      'Testing': 80,
      'Revision': 90,
      'Deployment': 95,
      'Completed': 100
    };
    return progressMap[stage] || 0;
  },
  
  createProject: function(data) {
    return ProjectRepository.create({
      projectName: data.projectName,
      clientId: data.clientId,
      service: data.service,
      pic: data.pic,
      teamMembers: data.teamMembers || [],
      startDate: data.startDate || formatDate(new Date()),
      deadline: data.deadline,
      stage: data.stage || 'Waiting Brief',
      status: data.status || 'Not Started',
      progress: this.calculateProgress(data.stage || 'Waiting Brief'),
      projectValue: data.projectValue || 0,
      driveLink: data.driveLink || '',
      notes: data.notes || ''
    });
  },
  
  updateProject: function(id, data) {
    if (data.stage) {
      data.progress = this.calculateProgress(data.stage);
    }
    return ProjectRepository.update(id, data);
  },
  
  detectDelayedProjects: function() {
    const projects = ProjectRepository.findAll();
    const today = new Date();
    
    return projects.filter(project => {
      if (project.status === 'Completed') return false;
      
      const deadline = new Date(project.deadline);
      const daysUntilDeadline = Math.ceil((deadline - today) / (1000 * 60 * 60 * 24));
      
      if (daysUntilDeadline < 0 && project.progress < 100) {
        return true; // Delayed
      }
      
      if (daysUntilDeadline <= 7 && project.progress < 50) {
        return true; // At Risk
      }
      
      return false;
    });
  }
};

const PaymentService = {
  recordPayment: function(data) {
    const payment = PaymentRepository.create({
      projectId: data.projectId,
      clientId: data.clientId,
      type: data.type,
      amount: data.amount,
      dueDate: data.dueDate,
      paidDate: data.paidDate || '',
      status: data.status || 'Pending',
      paymentMethod: data.paymentMethod || '',
      notes: data.notes || ''
    });
    
    if (data.status === 'Paid') {
      ActivityRepository.create({
        clientId: data.clientId,
        type: 'Internal Note',
        description: `Payment ${payment.id} recorded: Rp ${data.amount.toLocaleString()} (${data.type})`,
        createdBy: Session.getActiveUser().getEmail()
      });
    }
    
    return payment;
  },
  
  calculateOutstanding: function(clientId) {
    const payments = PaymentRepository.findAll()
      .filter(p => p.clientId === clientId && p.status !== 'Paid' && p.status !== 'Cancelled');
    
    return payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  },
  
  calculateProjectPayments: function(projectId) {
    const payments = PaymentRepository.findAll()
      .filter(p => p.projectId === projectId && p.status === 'Paid');
    
    return payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  }
};

const DashboardService = {
  getData: function() {
    const leads = LeadRepository.findAll();
    const clients = ClientRepository.findAll();
    const projects = ProjectRepository.findAll();
    const payments = PaymentRepository.findAll();
    const followUps = FollowUpRepository.findAll();
    
    const today = new Date().toISOString().split('T')[0];
    
    const totalLeads = leads.length;
    const qualifiedLeads = leads.filter(l => 
      ['Qualified', 'Meeting', 'Proposal', 'Negotiation'].includes(l.pipelineStage)
    ).length;
    const dealsWon = leads.filter(l => l.pipelineStage === 'Won').length;
    const conversionRate = totalLeads > 0 ? Math.round((dealsWon / totalLeads) * 100) : 0;
    
    const pipelineValue = leads
      .filter(l => !['Won', 'Lost'].includes(l.pipelineStage))
      .reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
    
    const activeProjects = projects.filter(p => p.status !== 'Completed').length;
    
    const revenueReceived = payments
      .filter(p => p.status === 'Paid')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const outstandingPayment = payments
      .filter(p => p.status !== 'Paid' && p.status !== 'Cancelled')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const followUpsToday = followUps.filter(f => 
      f.date === today && f.status === 'Scheduled'
    ).length;
    
    const overdueFollowUps = followUps.filter(f => 
      f.date < today && f.status === 'Scheduled'
    ).length;
    
    // Pipeline by stage
    const pipelineByStage = {};
    const stages = ['Prospect', 'Contacted', 'Responded', 'Qualified', 'Meeting', 'Proposal', 'Negotiation', 'Won'];
    stages.forEach(stage => {
      pipelineByStage[stage] = leads.filter(l => l.pipelineStage === stage).length;
    });
    
    // Lead by source
    const leadBySource = {};
    leads.forEach(l => {
      leadBySource[l.leadSource] = (leadBySource[l.leadSource] || 0) + 1;
    });
    
    // Monthly revenue (mock data for now)
    const monthlyRevenue = [
      { month: 'Jan', revenue: 50000000 },
      { month: 'Feb', revenue: 45000000 },
      { month: 'Mar', revenue: 80000000 },
      { month: 'Apr', revenue: 55000000 },
      { month: 'May', revenue: 90000000 },
      { month: 'Jun', revenue: 70000000 },
      { month: 'Jul', revenue: 85000000 },
      { month: 'Aug', revenue: revenueReceived }
    ];
    
    return {
      totalLeads,
      qualifiedLeads,
      dealsWon,
      conversionRate,
      pipelineValue,
      activeProjects,
      revenueReceived,
      outstandingPayment,
      followUpsToday,
      overdueFollowUps,
      pipelineByStage,
      leadBySource,
      monthlyRevenue,
      upcomingActions: [] // Will implement later
    };
  }
};
