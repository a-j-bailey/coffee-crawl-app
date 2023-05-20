import React, {useState} from 'react';
import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Image, Text, Checkbox} from '../components/';
import { supabase } from '../services/supabaseClient';

const isAndroid = Platform.OS === 'android';

const Login = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const {assets, colors, gradients, sizes} = useTheme();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [otp, setOTP] = useState('');
    const [loading, setLoading] = useState(false);
    
    const [view, setView] = useState('SignUp');
    
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
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                full_name: name,
              }
            }
        });
        
        if (error) Alert.alert(error.message);
        setLoading(false);
    }

    async function resetPassword() {
        console.log(email);
        const { data, error } = await supabase.auth.resetPasswordForEmail(email);

        if (error) {
            console.log(error);
            Alert.alert(
                'Reset Failed',
                'Please contact us for help.'
            )
        } else if (data) {
            console.log(data);
            Alert.alert(
                'A password recovery link has been sent to the email on file.'
            )
            setView('OTP')
        }
    }

    async function loginWithOTP() {
        setLoading(true);
        let token = otp;
        const { data, error } = await supabase.auth.verifyOtp({ email, token, type: 'email'})
        console.log(data);
        console.log(error);
        
        if (error) Alert.alert(error.message);
        setLoading(false);
    }
    
    const imageLink = 'https://images.unsplash.com/photo-1525480122447-64809d765ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
    
    if (view == 'Login') {
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
                                onPress={() => setView('SignUp')}
                                marginTop={sizes.m}>
                                <Text center h6>
                                    New to the club?
                                </Text>
                                <Text bold primary center h6>
                                    Sign Up
                                </Text>
                            </Button>
                        </Block>
                        
                    </Block>
                    <Button
                        onPress={() => setView('Forgot Password')}>
                        <Text white bold>
                            Forgot Password
                        </Text>
                    </Button>
                </Block>
        </Image>
        )
    } else if (view == 'Forgot Password') {
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
                                Reset Password
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
                            <Button
                                gradient={gradients.dark}
                                shadow={!isAndroid}
                                marginTop={sizes.m}
                                marginBottom={sizes.s}
                                onPress={() => resetPassword()}>
                                <Text bold white transform="uppercase">
                                    Reset Password
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                    <Button
                        onPress={() => setView('Login')}>
                        <Text white bold>
                            Nevermind, I remember it now.
                        </Text>
                    </Button>
                </Block>
            </Image>
        )
    } else if (view == 'OTP') {
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
                                Reset Password
                            </Text>
                            <Text center>
                                A one-time password has been sent to your email. Enter that below to log in.
                            </Text>
                            <Input
                                secureTextEntry
                                autoCapitalize="none"
                                marginVertical={sizes.m}
                                label={'One Time Password'}
                                keyboardType="numeric"
                                placeholder="######"
                                onChangeText={(text) => setOTP(text)}
                                value={otp}
                                color={colors.dark}
                            />
                            <Button
                                gradient={gradients.dark}
                                shadow={!isAndroid}
                                marginTop={sizes.m}
                                marginBottom={sizes.s}
                                onPress={() => loginWithOTP()}>
                                <Text bold white transform="uppercase">
                                    Reset Password
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Image>
        )
    } else {
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
                                Sign Up
                            </Text>
                            <Input
                                autoCapitalize="words"
                                marginVertical={sizes.m}
                                label={t('common.name')}
                                placeholder="Elon Musk"
                                success={null}
                                danger={null}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                color={colors.dark}
                            />
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
                            <Block row flex={0} align="center" marginTop={sizes.sm}>
                                <Checkbox
                                    marginRight={sizes.sm}
                                    checked={false}
                                    onPress={(value) => handleChange({agreed: value})}
                                />
                                    <Text paddingRight={sizes.s}>
                                        {t('common.agree')}
                                        <Text
                                            semibold
                                            onPress={() => {
                                              Linking.openURL('https://www.creative-tim.com/terms');
                                            }}>
                                            {t('common.terms')}
                                          </Text>
                                    </Text>
                                </Block>
                            <Button
                                gradient={gradients.primary}
                                shadow={!isAndroid}
                                marginTop={sizes.m}
                                marginBottom={sizes.s}
                                onPress={() => signUpWithEmail()}>
                                <Text bold white transform="uppercase">
                                    Sign Up
                                </Text>
                            </Button>
                            <Button
                                onPress={() => setView('Login')}
                                marginTop={sizes.m}>
                                <Text center h6>
                                    Already have an account?
                                </Text>
                                <Text bold primary center h6>
                                    Log In
                                </Text>
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Image>
        )
    }
};

export default Login;