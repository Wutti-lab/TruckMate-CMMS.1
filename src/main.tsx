
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx';
import './index.css';

const PUBLISHABLE_KEY = "pk_test_dG9sZXJhbnQtc3RhcmxpbmctNDguY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")!).render(
  <ClerkProvider 
    publishableKey={PUBLISHABLE_KEY}
    appearance={{
      variables: {
        colorPrimary: "#10B981" // Matching fleet-500 color
      }
    }}
  >
    <App />
  </ClerkProvider>
);
