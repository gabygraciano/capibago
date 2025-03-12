// src/services/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Substitua pelo seu Project URL e sua anon key
const supabaseUrl = 'https://fecthykxcryvyhxcdhau.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlY3RoeWt4Y3J5dnloeGNkaGF1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3NjY0NDMsImV4cCI6MjA1NzM0MjQ0M30.6SQ8WV7F9fwJRNezalMLudKB_CvwNUtlygjtfSwgaW0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);