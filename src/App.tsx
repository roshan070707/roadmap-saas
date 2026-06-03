import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RoadmapGenerator from './pages/RoadmapGenerator';
import Dashboard from './pages/Dashboard';
import RoadmapView from './pages/RoadmapView';
import CreateRoadmap from './pages/CreateRoadmap';
import Leaderboard from './pages/Leaderboard';
import Explore from './pages/Explore';
import Community from './pages/Community';
import ShareView from './pages/ShareView';
import Profile from './pages/Profile';
import Methodology from './pages/Methodology';
import Integrations from './pages/Integrations';
import Pricing from './pages/Pricing';
import Documentation from './pages/Documentation';
import ApiReference from './pages/ApiReference';
import Blog from './pages/Blog';
import About from './pages/About';
import Careers from './pages/Careers';
import Changelog from './pages/Changelog';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import NotFound from './pages/NotFound';
import Team from './pages/Team';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import { ThemeProvider } from './components/ThemeProvider';
import { CommandPalette } from './components/CommandPalette';

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="roadmap-ui-theme">
      <Router>
        <div className="relative w-full overflow-x-hidden min-h-screen bg-luxury-bg text-text-main font-sans selection:bg-luxury-purple/30 selection:text-white flex flex-col transition-colors duration-300">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/generator" element={<RoadmapGenerator />} />
              <Route path="/create" element={<CreateRoadmap />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/roadmap/:id" element={<RoadmapView />} />
              <Route path="/share/:id" element={<ShareView />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/discover" element={<Navigate to="/explore" replace />} />
              <Route path="/community" element={<Community />} />
              <Route path="/profile/:identifier" element={<Profile />} />
              {/* New Pages */}
              <Route path="/methodology" element={<Methodology />} />
              <Route path="/integrations" element={<Integrations />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/api-reference" element={<ApiReference />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/changelog" element={<Changelog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/team" element={<Team />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/settings" element={<Settings />} />
              {/* Catch-all route for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <CommandPalette />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
