import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Login, Account, Pro, ResetPassword} from '../screens';
import {useScreenOptions, useTranslation} from '../hooks';

const Stack = createStackNavigator();

export default () => {
    const {t} = useTranslation();
    const screenOptions = useScreenOptions();
    
//    const authenticated = false;
//    
//    if (!authenticated) {
//        return (
//            <Stack.Navigator
//                screenOptions={screenOptions.stack}
//            >
//                <Stack.Screen
//                    name="Login"
//                    component={Login}
//                    options={{headerShown: false}}
//                />
//                <Stack.Screen
//                    name="Register"
//                    component={Register}
//                    options={{headerShown: false}}
//                />
//            </Stack.Navigator>
//        )
//    }
    

    return (
        <Stack.Navigator
            screenOptions={screenOptions.stack}
        >
            <Stack.Screen
                name="Home"
                component={Home}
                options={{title: t('navigation.home')}}
            />
            
            <Stack.Screen
                name="Account"
                component={Account}
                options={{title: ''}}
            />
    
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
            />
            
            <Stack.Screen
                name="Pro"
                component={Pro}
                options={screenOptions.pro}
            />

            <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={screenOptions.pro}
            />
        </Stack.Navigator>
    );
};
