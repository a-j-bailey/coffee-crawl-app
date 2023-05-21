import 'react-native-url-polyfill/auto'
import React, {useEffect, useState} from 'react';
import {Platform, StatusBar, View, Text} from 'react-native';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import AuthProvider from './Auth';
import {useData, ThemeProvider, TranslationProvider} from '../hooks';
import { StripeProvider } from '@stripe/stripe-react-native';

export default () => {
  const {isDark, theme, setTheme} = useData();

  /* set the status bar based on isDark constant */
  useEffect(() => {
    Platform.OS === 'android' && StatusBar.setTranslucent(true);
    StatusBar.setBarStyle(isDark ? 'light-content' : 'dark-content');
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, [isDark]);

  // load custom fonts
  const [fontsLoaded] = useFonts({
    'OpenSans-Light': theme.assets.OpenSansLight,
    'OpenSans-Regular': theme.assets.OpenSansRegular,
    'OpenSans-SemiBold': theme.assets.OpenSansSemiBold,
    'OpenSans-ExtraBold': theme.assets.OpenSansExtraBold,
    'OpenSans-Bold': theme.assets.OpenSansBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const navigationTheme = {
    ...DefaultTheme,
    dark: isDark,
    colors: {
      ...DefaultTheme.colors,
      border: 'rgba(0,0,0,0)',
      text: String(theme.colors.text),
      card: String(theme.colors.card),
      primary: String(theme.colors.primary),
      notification: String(theme.colors.primary),
      background: String(theme.colors.background),
    },
  };

  return (
    <TranslationProvider>
      <ThemeProvider theme={theme} setTheme={setTheme}>
        <NavigationContainer theme={navigationTheme}>
          <StripeProvider
            publishableKey="pk_test_51NA2BtDcpCAUl72SgmEbdCpFVpOjyeSLV6MeaItvdTTr0fKtlKjbZhdDiOrSyOFW1jI1i6Jj7zO4UMUyKJOj0vwc00UcUptHBX"
            // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
            // merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
            >
            <AuthProvider />
          </StripeProvider>
        </NavigationContainer>
      </ThemeProvider>
    </TranslationProvider>
  );
};
