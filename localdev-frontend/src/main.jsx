import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { GoogleOAuthProvider } from "@react-oauth/google";

// Get root element
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>
);

// Hot Module Replacement (HMR)
if (import.meta.hot) {
  import.meta.hot.accept();
}
