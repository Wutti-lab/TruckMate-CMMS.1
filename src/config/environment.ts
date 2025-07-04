export const ENV = {
  // Detect environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  
  // App URLs based on environment
  APP_URL: import.meta.env.PROD 
    ? 'https://8f3f18ac-c0e8-4018-b72e-b0263934d823.lovableproject.com'
    : 'http://localhost:3000',
    
  // Supabase configuration
  SUPABASE_URL: "https://mnigsoflxmqoitfwwkrt.supabase.co",
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaWdzb2ZseG1xb2l0Znd3a3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjMxMzQsImV4cCI6MjA2MDczOTEzNH0.060WTA-9P7qt1L_9Y45KclqifQGkCnK0nKYcf6g8Svg"
};