import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Builder from './pages/Builder';
import Renderer from './pages/Renderer';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/builder" element={<Builder />} />
        <Route path="/renderer/:slug" element={<Renderer />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
