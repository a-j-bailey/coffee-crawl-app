import { createClient, SupabaseClient } from '@supabase/supabase-js';
//import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const supabase: SupabaseClient = createClient(
    'https://mwtonofdrluhknmwqcud.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dG9ub2Zkcmx1aGtubXdxY3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4ODk0MDQsImV4cCI6MTk5ODQ2NTQwNH0.E0a31YuUwf5lK_puGwxCZtNgpMSBZ733c2c0R7m_Bns',
    {
        localStorage: AsyncStorage,
    },
);