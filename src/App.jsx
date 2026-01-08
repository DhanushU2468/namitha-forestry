import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Plantation from './pages/Plantation';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plantation" element={<Plantation />} />
      </Routes>
    </Router>
  );
}

export default App;
