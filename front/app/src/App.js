import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Authentification from './pages/Authentification';
import Inscription from './pages/Inscription';
import './css/App.css'; // Main App styles

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Authentification />} />
          <Route path="/inscri" element={<Inscription />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
