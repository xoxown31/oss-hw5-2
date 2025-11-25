import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import './Layout.css';

const Layout = () => {
  return (
    <div className="app-layout">
      <Header />
      <div className="main-content">
        <Sidebar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
