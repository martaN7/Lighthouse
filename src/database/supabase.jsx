import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ioifchjlehkyfimceton.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlvaWZjaGpsZWhreWZpbWNldG9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUzOTI2NDAsImV4cCI6MTk4MDk2ODY0MH0.6hXtfhmh-YKDcX6Xnv4BwprwVj_p9vWOmYbJUhJoCec";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase }