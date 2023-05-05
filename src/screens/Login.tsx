import React, {useCallback, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import {useData, useTheme, useTranslation} from '../hooks/';
import * as regex from '../constants/regex';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';

import { supabase } from '../services/supabaseClient';

const isAndroid = Platform.OS === 'android';

const Login = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const {assets, colors, gradients, sizes} = useTheme();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if (error) Alert.alert(error.message);
        setLoading(false);
    }
    
    async function signUpWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signUp({
            email: email,
            password: password
        });
        
        if (error) Alert.alert(error.message);
        setLoading(false);
    }
    
    const imageLink = 'https://images.unsplash.com/photo-1525480122447-64809d765ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
    
    return (
        <Image
            background
            source={{uri: imageLink}}
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
                            placeholder="email@example.com"
                            success={null}
                            danger={null}
                            onChangeText={(text) => setEmail(text)}
                            value={email}
                            color={colors.dark}
                        />
                        <Input
                            secureTextEntry
                            autoCapitalize="none"
                            marginVertical={sizes.m}
                            label={t('common.password')}
                            placeholder="password"
                            onChangeText={(text) => setPassword(text)}
                            value={password}
                            success={null}
                            danger={null}
                            color={colors.dark}
                        />
                        <Button
                            gradient={gradients.primary}
                            shadow={!isAndroid}
                            marginTop={sizes.m}
                            marginBottom={sizes.s}
                            onPress={() => signInWithEmail()}>
                            <Text bold white transform="uppercase">
                                Log In
                            </Text>
                        </Button>
                        <Button
                            onPress={() => signUpWithEmail()}
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