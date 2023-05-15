import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HeaderNav from './components/HeaderNav';

import Events from './pages/Events';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Auth from './pages/Auth';
import './App.css';

const App = () => {
  return (
    <Router>
      <HeaderNav />
      <main>
        <div className="container">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
