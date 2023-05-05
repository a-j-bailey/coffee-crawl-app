import React, {useCallback, useEffect, useState} from 'react';
import {Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';

const isAndroid = Platform.OS === 'android';

interface IRegistration {
  name: string;
  email: string;
  password: string;
  agreed: boolean;
}
interface IRegistrationValidation {
  name: boolean;
  email: boolean;
  password: boolean;
  agreed: boolean;
}

const Login = () => {
  const {isDark} = useData();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState<IRegistrationValidation>({
    name: false,
    email: false,
    password: false,
    agreed: false,
  });
  const [registration, setRegistration] = useState<IRegistration>({
    name: '',
    email: '',
    password: '',
    agreed: false,
  });
  const {assets, colors, gradients, sizes} = useTheme();

  const handleChange = useCallback(
    (value) => {
      setRegistration((state) => ({...state, ...value}));
    },
    [setRegistration],
  );

  const handleSignUp = useCallback(() => {
    if (!Object.values(isValid).includes(false)) {
      /** send/save registratin data */
      console.log('handleSignUp', registration);
    }
  }, [isValid, registration]);

  useEffect(() => {
    setIsValid((state) => ({
      ...state,
      name: regex.name.test(registration.name),
      email: regex.email.test(registration.email),
      password: regex.password.test(registration.password),
      agreed: registration.agreed,
    }));
  }, [registration, setIsValid]);
    
    return (
        <Image
            background
            source={assets.card1}
            paddingHorizontal={sizes.padding}
            style={{flex: 1}}>
            <Block safe>
                <Block
                    blur
                    intensity={90}
                    flex={0}
                    radius={sizes.sm}
                    overflow="hidden"
                    tint={colors.blurTint}
                    padding={sizes.padding}
                    marginVertical={sizes.l}
                    marginHorizontal={sizes.padding}>
                    <Block paddingHorizontal={sizes.sm} flex={0}>
                        <Text h4 center color={colors.primary} margin={sizes.md}>
                            Login
                        </Text>
                        <Input
                            autoCapitalize="none"
                            marginVertical={sizes.m}
                            label={t('common.email')}
                            keyboardType="email-address"
                            placeholder={t('common.emailPlaceholder')}
                            success={Boolean(registration.email && isValid.email)}
                            danger={Boolean(registration.email && !isValid.email)}
                            onChangeText={(value) => handleChange({email: value})}
                        />
                        <Input
                            secureTextEntry
                            autoCapitalize="none"
                            marginVertical={sizes.m}
                            label={t('common.password')}
                            placeholder={t('common.passwordPlaceholder')}
                            onChangeText={(value) => handleChange({password: value})}
                            success={Boolean(registration.password && isValid.password)}
                            danger={Boolean(registration.password && !isValid.password)}
                        />
                        <Button
                            gradient={gradients.primary}
                            shadow={!isAndroid}
                            marginTop={sizes.m}
                            marginBottom={sizes.s}
                            onPress={() => navigation.navigate('Pro')}>
                            <Text bold white transform="uppercase">
                                Log In
                            </Text>
                        </Button>
                        <Button
                            onPress={() => navigation.navigate('Screens', {screen: 'Register'})}
                            marginHorizontal={sizes.sm}>
                            <Text bold primary transform="uppercase">
                                Sign Up
                            </Text>
                        </Button>
                    </Block>
                </Block>
            </Block>
    </Image>
    )
};

export default Login;