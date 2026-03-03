import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Plantation from './pages/Plantation';
import RealEstate from './pages/RealEstate';
import Roadside from './pages/Roadside';
import Landscaping from './pages/Landscaping';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plantation" element={<Plantation />} />
        <Route path="/real-estate" element={<RealEstate />} />
        <Route path="/roadside" element={<Roadside />} />
        <Route path="/landscaping" element={<Landscaping />} />
      </Routes>
    </Router>
  );
}

export default App;

