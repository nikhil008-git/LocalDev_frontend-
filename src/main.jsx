import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WaitlistProvider } from './context/WaitlistContext';  // ✅ import new context
import App from './App.jsx';
import './index.css';

// Get root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WaitlistProvider>  
          <App />
        </WaitlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);

// Hot Module Replacement (HMR)
if (import.meta.hot) {
  import.meta.hot.accept();
}
