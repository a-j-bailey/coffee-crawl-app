import React, {useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';
import Menu from './Menu';
import Login from '../screens/Login';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default () => {
    const authenticated = false;
    
    const [session, setSession] = useState<Session | null>(null)
    
    async function storeUser() {
        try {
            const jsonValue = JSON.stringify(session.user)
            await AsyncStorage.setItem('@user', jsonValue)
        } catch (e) {
            console.log('failed to store user');
        }
    }
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            storeUser();
        })

        supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
        })
    }, [])

    if (session && session.user) {
        return (
            <Menu />
        )
    }

    return (
        <Login />
    );
};
