import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import ListPage from './components/Pages/ListPage';
import CreatePage from './components/Pages/CreatePage';
import UpdatePage from './components/Pages/UpdatePage';
import DetailPage from './components/Pages/DetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/list" />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/update/:id" element={<UpdatePage />} />
        <Route path="/detail/:id" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;