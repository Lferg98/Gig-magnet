import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');


const root = createRoot(rootElement);

// Render your React app using root.render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
