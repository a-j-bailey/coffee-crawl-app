import React, {useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Input, Text} from '../components/';
import { supabase } from '../services/supabaseClient';

const ResetPassword = () => {
    const {t} = useTranslation();
    const navigation = useNavigation();
    const {assets, colors, gradients, sizes} = useTheme();

    const [loading, setLoading] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    async function resetPassword() {
        setLoading(true)
        if (password === passwordConfirm) {
            const { data, error } = await supabase.auth.updateUser({password: password})
            if (error) {
                Alert.alert(error.message)
            } else {
                console.log(data);
                navigation.navigate('Account');
            }
        }
        setLoading(false)
    }
    
    return (
        <Block safe>
            <Block marginTop={sizes.md}>
                <Block padding={sizes.padding}>
                    <Text center h4>Reset Password:</Text>
                    <Input
                        secureTextEntry
                        marginTop={sizes.s}
                        autoCapitalize="none"
                        placeholder='Password'
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        color={colors.secondary}
                    />
                    <Input
                        secureTextEntry
                        marginTop={sizes.s}
                        autoCapitalize="none"
                        placeholder='Confirm Password'
                        onChangeText={(text) => setPasswordConfirm(text)}
                        value={passwordConfirm}
                        color={colors.secondary}
                    />
                    <Block paddingVertical={sizes.sm}>
                        {loading
                            ? <ActivityIndicator />
                            : <Button gradient={gradients.success} onPress={() => resetPassword()}>
                                <Text white semibold>Reset</Text>
                            </Button>
                        }
                    </Block>
                </Block>
            </Block>
        </Block>
    );
};

export default ResetPassword;