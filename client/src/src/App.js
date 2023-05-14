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
        <Routes>
          <Route exact path="/">
            
          </Route>
          <Route path="/auth" component={Auth} />
          <Route path="/events" component={Events} />
          <Route path="/about" component={About} />
          <Route path="/bookings" component={Bookings} />
      
        </Routes>
      </main>
    </Router>
  );
};

export default App;
