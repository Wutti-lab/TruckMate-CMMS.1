-- Enable pg_cron extension for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule maintenance alerts to run daily at 8:00 AM
SELECT cron.schedule(
  'daily-maintenance-alerts',
  '0 8 * * *', -- Every day at 8:00 AM
  $$
  SELECT
    net.http_post(
        url:='https://mnigsoflxmqoitfwwkrt.supabase.co/functions/v1/maintenance-alerts',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uaWdzb2ZseG1xb2l0Znd3a3J0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxNjMxMzQsImV4cCI6MjA2MDczOTEzNH0.060WTA-9P7qt1L_9Y45KclqifQGkCnK0nKYcf6g8Svg"}'::jsonb,
        body:='{"scheduled": true}'::jsonb
    ) as request_id;
  $$
);