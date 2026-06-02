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
              <Route path="/profile/:userId" element={<Profile />} />
              {/* Catch-all route to redirect unknown URLs to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <CommandPalette />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
