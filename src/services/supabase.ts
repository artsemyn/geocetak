import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://demo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'demo-key';
const isDevelopment = import.meta.env.VITE_DEV_MODE === 'true';

// Create Supabase client with development mode handling
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: !isDevelopment, // Disable session persistence in dev mode
  },
});

// Export development mode flag for other services
export const isDevMode = isDevelopment;