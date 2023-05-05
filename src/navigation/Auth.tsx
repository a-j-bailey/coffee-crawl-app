import React, {useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';
import Menu from './Menu';
import Login from '../screens/Login';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js'

export default () => {
    const authenticated = false;
    
    const [session, setSession] = useState<Session | null>(null)
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
          setSession(session)
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
