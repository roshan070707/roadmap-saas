import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RoadmapGenerator from './pages/RoadmapGenerator';
import Dashboard from './pages/Dashboard';
import RoadmapView from './pages/RoadmapView';

function App() {
  return (
    <Router>
      <div className="relative w-full overflow-x-hidden min-h-screen bg-luxury-bg text-text-main font-sans selection:bg-luxury-purple/30 selection:text-white flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<RoadmapGenerator />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/roadmap/:id" element={<RoadmapView />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
