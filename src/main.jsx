import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import Countries from './Countries.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/all" element={<Countries />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);
