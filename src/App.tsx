import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { LeadsPage } from './pages/LeadsPage';
import { LeadDetailPage } from './pages/LeadDetailPage';
import { ClientsPage } from './pages/ClientsPage';
import { ClientDetailPage } from './pages/ClientDetailPage';
import { TasksPage } from './pages/TasksPage';
import { PaymentsPage } from './pages/PaymentsPage';
import { ServicesPage } from './pages/ServicesPage';
import { TeamPage } from './pages/TeamPage';
import { SettingsPage } from './pages/SettingsPage';
import { ContentSchedulePage } from './pages/ContentSchedulePage';
import { WorkPage } from './pages/WorkPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { CalendarPage } from './pages/CalendarPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/leads/:id" element={<LeadDetailPage />} />
          <Route path="/pipeline" element={<Navigate to="/work" replace />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/clients/:id" element={<ClientDetailPage />} />
          <Route path="/projects" element={<Navigate to="/work" replace />} />
          <Route path="/projects/:id" element={<Navigate to="/work" replace />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/content" element={<ContentSchedulePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:id" element={<WorkDetailPage />} />
          <Route path="/payments" element={<PaymentsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
