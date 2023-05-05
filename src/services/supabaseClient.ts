import * as SecureStore from "expo-secure-store";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key);
    },

    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value);
    },

    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key);
    },
};

const supabaseUrl = 'https://mwtonofdrluhknmwqcud.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13dG9ub2Zkcmx1aGtubXdxY3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4ODk0MDQsImV4cCI6MTk5ODQ2NTQwNH0.E0a31YuUwf5lK_puGwxCZtNgpMSBZ733c2c0R7m_Bns'

export const supabase: SupabaseClient = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            storage: ExpoSecureStoreAdapter as any,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);