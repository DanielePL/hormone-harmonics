// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wquzcrjmxgljacxaflmj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxdXpjcmpteGdsamFjeGFmbG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEwNjkzMTAsImV4cCI6MjA1NjY0NTMxMH0.apRO-NrIoQGUYT0c9kKW1XLl7YmDx6mMhBBvPasNHJ0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);