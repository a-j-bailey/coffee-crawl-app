import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import {Articles, Components, Home, Profile, Register, Login} from '../screens';
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
                name="Components"
                component={Components}
                options={screenOptions.components}
            />

            <Stack.Screen
                name="Articles"
                component={Articles}
                options={{title: t('navigation.articles')}}
            />

            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};
