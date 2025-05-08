
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Wait for the device to be ready when running as a native app
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the app
  createRoot(document.getElementById("root")!).render(<App />);
});
