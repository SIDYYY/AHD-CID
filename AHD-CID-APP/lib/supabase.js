// constants/supabase.js
import { createClient } from '@supabase/supabase-js';

// Get these from your Supabase project settings
const SUPABASE_URL = 'https://dgtpualxyzlljybwbudc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRndHB1YWx4eXpsbGp5YndidWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0MDAzNTQsImV4cCI6MjA4NTk3NjM1NH0.vCceuKcv7jGYbKxX3baaoMBBVbbX_y_6nNh-dH-XmJU';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
