import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

const NavigationBar = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link to="/">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationBar;
