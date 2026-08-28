import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { PipelinePage } from './pages/PipelinePage';
import { DevelopmentPage } from './pages/DevelopmentPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/pipeline" element={<PipelinePage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="*" element={<DashboardPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
