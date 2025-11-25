import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><NavLink to="/list" className={({ isActive }) => isActive ? "active" : ""}>Student List</NavLink></li>
          <li><NavLink to="/create" className={({ isActive }) => isActive ? "active" : ""}>Add Student</NavLink></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
