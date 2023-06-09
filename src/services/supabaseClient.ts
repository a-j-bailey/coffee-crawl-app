import * as SecureStore from "expo-secure-store";
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';

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

export const supabase: SupabaseClient = createClient(
    Constants.expoConfig.extra.SUPABASE_URL,
    Constants.expoConfig.extra.SUPABASE_ANON_KEY,
    {
        auth: {
            storage: ExpoSecureStoreAdapter as any,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    }
);