import type { 
  Lead, Client, Project, Task, Payment, 
  Activity, FollowUp, DashboardData 
} from '../../types';

declare const google: {
  script: {
    run: {
      withSuccessHandler: (callback: (result: any) => void) => {
        withFailureHandler: (callback: (error: any) => void) => {
          [key: string]: (...args: any[]) => void;
        };
      };
    };
  };
};

function callScript<T>(functionName: string, ...args: any[]): Promise<T> {
  return new Promise((resolve, reject) => {
    google.script.run
      .withSuccessHandler((result: { success: boolean; data?: T; error?: string }) => {
        if (result.success) {
          resolve(result.data as T);
        } else {
          reject(new Error(result.error));
        }
      })
      .withFailureHandler((error) => {
        reject(error);
      })
      [functionName](...args);
  });
}

// Leads API
export const leadApi = {
  getAll: () => callScript<Lead[]>('getLeads'),
  getById: (id: string) => callScript<Lead>('getLeadById', id),
  create: (data: Partial<Lead>) => callScript<Lead>('createLead', data),
  update: (id: string, data: Partial<Lead>) => callScript<Lead>('updateLead', id, data),
  updateStage: (id: string, stage: string) => callScript<Lead>('updateLeadStage', id, stage),
  addActivity: (leadId: string, activity: Partial<Activity>) => 
    callScript<Activity>('addLeadActivity', leadId, activity),
  getActivities: (leadId: string) => callScript<Activity[]>('getLeadActivities', leadId),
};

// Clients API
export const clientApi = {
  getAll: () => callScript<Client[]>('getClients'),
  getById: (id: string) => callScript<Client>('getClientById', id),
  convertFromLead: (leadId: string) => callScript<Client>('convertLeadToClient', leadId),
};

// Projects API
export const projectApi = {
  getAll: () => callScript<Project[]>('getProjects'),
  getById: (id: string) => callScript<Project>('getProjectById', id),
  create: (data: Partial<Project>) => callScript<Project>('createProject', data),
  update: (id: string, data: Partial<Project>) => callScript<Project>('updateProject', id, data),
};

// Tasks API
export const taskApi = {
  getAll: () => callScript<Task[]>('getTasks'),
  getById: (id: string) => callScript<Task>('getTaskById', id),
  create: (data: Partial<Task>) => callScript<Task>('createTask', data),
  update: (id: string, data: Partial<Task>) => callScript<Task>('updateTask', id, data),
};

// Payments API
export const paymentApi = {
  getAll: () => callScript<Payment[]>('getPayments'),
  create: (data: Partial<Payment>) => callScript<Payment>('createPayment', data),
};

// Services API
export const serviceApi = {
  getAll: () => callScript<any[]>('getServices'),
};

// Dashboard API
export const dashboardApi = {
  getData: () => callScript<DashboardData>('getDashboardData'),
};

// Follow-ups API
export const followUpApi = {
  getAll: () => callScript<FollowUp[]>('getFollowUps'),
  create: (data: Partial<FollowUp>) => callScript<FollowUp>('createFollowUp', data),
  update: (id: string, data: Partial<FollowUp>) => callScript<FollowUp>('updateFollowUp', id, data),
};
