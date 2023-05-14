import React from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderNav.css';

const HeaderNav = (props) => {
  return (
    <header className="navbar">
      <div className="navbar-title">
        <h1>Gigmagnet</h1>
      </div>
      <nav className="navbar-items">
        <ul>
          <li>
            <NavLink to="/auth">Log In</NavLink>
          </li>
          <li>
            <NavLink to="/events">Events</NavLink>
          </li>
          <li>
            <NavLink to="/bookings">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
