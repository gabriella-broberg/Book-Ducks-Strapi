// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // Importera globala stilar
import './App.css'; // Importera temastilar
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container); // Skapa en rot för React 18

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
