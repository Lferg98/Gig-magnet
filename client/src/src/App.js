import React from 'react';
import { Router, Routes, Route } from 'react-router-dom';



import Header from './pages/Header';
import Home from './pages/Home';
import Events from './pages/Events';
import About from './pages/About';
import Bookings from './pages/Bookings';
import Auth from './pages/Auth';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route exact path="/">
            <Auth />
          </Route>
          <Route path="/header" component={Header} />
          <Route path="/home" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/about" component={About} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/auth" component={Auth} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
