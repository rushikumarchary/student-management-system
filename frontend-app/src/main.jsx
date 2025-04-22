import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { initKeycloak } from './services/keycloakService';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Initialize Keycloak
initKeycloak().then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}).catch(error => {
  console.error('Failed to initialize Keycloak:', error);
  // Render app anyway to show error state or login page
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});