import React, {useEffect, useState} from 'react';
import AppLoading from 'expo-app-loading';

import Menu from './Menu';
import Login from '../screens/Login';

export default () => {
    const authenticated = false;

    if (authenticated) {
        return (
            <Menu />
        )
    }

    return (
        <Login />
    );
};
