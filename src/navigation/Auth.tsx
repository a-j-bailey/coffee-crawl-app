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
    
    async function updateUser(event, thisSession) {
        console.log(event)
        if (event == 'SIGNED_IN') {
            try {
                const jsonValue = JSON.stringify(thisSession.user)
                await AsyncStorage.setItem('@user', jsonValue)
            } catch (e) {
                console.log('failed to store user');
            }
        } else if (event == 'SIGNED_OUT') {
            try {
                await AsyncStorage.removeItem('@user')
            } catch (e) {
                console.log('failed to remove user');
            }
        }
        
//        await AsyncStorage.removeItem('@user').then(() => {
//            
//        })
    }
    
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
//            updateUser();
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
