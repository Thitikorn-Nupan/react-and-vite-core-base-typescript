import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css';
import 'flowbite';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css'
import 'bootstrap/dist/js/bootstrap.min.js';
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
