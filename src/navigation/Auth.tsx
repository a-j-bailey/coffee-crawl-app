import React, {useEffect, useState} from 'react';
import Menu from './Menu';
import Login from '../screens/Login';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases'

export default () => {
    const authenticated = false;
    
    const [session, setSession] = useState<Session | null>(null)
    
    async function updateUser(event, thisSession) {
        if (event == 'SIGNED_IN') {
            try {
                const jsonValue = JSON.stringify(thisSession.user)
                await AsyncStorage.setItem('@user', jsonValue)
            } catch (e) {
                console.log('failed to store user');
                console.log(e);
            }
        } else if (event == 'SIGNED_OUT') {
            try {
                await AsyncStorage.removeItem('@user')
            } catch (e) {
                console.log('failed to remove user');
            }
        }
    }
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            updateUser(_event, session);
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
