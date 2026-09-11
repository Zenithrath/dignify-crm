import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { LeadsPage } from './pages/LeadsPage';
import { PipelinePage } from './pages/PipelinePage';
import { ClosingPage } from './pages/ClosingPage';
import { ClientsPage } from './pages/ClientsPage';
import { DevelopmentPage } from './pages/DevelopmentPage';
import { ContentPage } from './pages/ContentPage';
import { WhatsAppPage } from './pages/WhatsAppPage';
import { CalendarPage } from './pages/CalendarPage';
import { TeamPage } from './pages/TeamPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/leads" element={<LeadsPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/closing" element={<ClosingPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="/content" element={<ContentPage />} />
          <Route path="/followup" element={<WhatsAppPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
