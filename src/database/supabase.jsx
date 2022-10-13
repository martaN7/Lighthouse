import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ioifchjlehkyfimceton.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_PUBLIC_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export { supabase }