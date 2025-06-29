import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wkcwtaxpchcqstklccfh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrY3d0YXhwY2hjcXN0a2xjY2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMjQyMjIsImV4cCI6MjA2NjgwMDIyMn0.FR1eM1XDim6ypzIsjqMlu3jGbcgy81513xkCjWcbiZs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 