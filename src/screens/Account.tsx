import React, {useEffect, useState, useCallback} from 'react';
import {FlatList, ActivityIndicator, Alert} from 'react-native';
import {useData, useTheme} from '../hooks/';
import {Block, Button, Input, Text} from '../components/';
import {Ionicons} from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';
import {useNavigation} from '@react-navigation/core';

const Account = () => {
    const {colors, gradients, sizes} = useTheme();
    
    const [locked, setLocked] = useState(true);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [uid, setUid] = useState('');
    
    const navigation = useNavigation();

    useEffect(() => {
        getUserData();
    }, [])


    // Get user data.
    async function getUserData() {
        await supabase.auth.getUser().then((data) => {
            setEmail(data.data.user.email);
            setUid(data.data.user.id);
        })
        await supabase.from('profiles').select('*').then((data) => {
            setName(data.data[0].full_name)
        })
        setLoading(false)
    }
    
    async function updateAccount() {
        setLoading(true)
        const { data, error } = await supabase.auth.updateUser({
            email: email,
        })

        if (error) {
            alert('Failed to save. Please try again later.')
        } else if (data.user.new_email){
            Alert.alert(
                'Verification email sent.',
                'Please click the link in your verification email to complete the update.'
            )
        }
        setLoading(false);
        setLocked(true);
        getUserData();
    }
    
    const confirmDelete = useCallback(
        () => {
            Alert.alert(
                'Are you sure you want to delete your account?',
                'All your data will be deleted permanently. This action cannot be undone.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: 'Delete',
                        onPress: () => deleteUser(),
                        style: 'default',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        },
        [],
    );
    
    async function deleteUser() {
        setLoading(true)
        const { data, error } = await supabase.functions.invoke<FunctionResponse>("delete-user");

        // console.log(data);
        // console.log(error);

        await supabase.auth.signOut().then(() => {
            Alert.alert(
                'Successfully deleted account.',
                "I'm really sorry to see you go."
            )
        });
    }
    
    function logout() {
        supabase.auth.signOut()
    }

    return (
        <Block>
            <Block scroll>
                <Block
                    row
                    display={'flex'}
                    justifyContent="space-between"
                    alignItems="center"
                    paddingHorizontal={sizes.padding}>
                    <Text h4>Account</Text>
                    {loading
                        ? <ActivityIndicator />
                        : <Button
                            onPress={() => setLocked(!locked)}
                            >
                            {locked ?
                                <Ionicons
                                    size={18}
                                    name="lock-closed"
                                    color={colors.gray}
                                />
                                : <Ionicons
                                    size={18}
                                    name="lock-open"
                                    color={colors.primary}
                                />
                            }
                        </Button>
                    }
                </Block>
                <Block padding={sizes.padding}>
                    {/*<Block
                        row
                        display={'flex'}
                        justifyContent="space-between"
                        alignItems="center"
                        paddingVertical={sizes.s}>
                        <Text bold>Name:</Text>
                        <Block marginLeft={sizes.m}>
                            <Input
                                autoCapitalize="none"
                                textAlign="right"
                                success={null}
                                danger={null}
                                disabled={locked}
                                onChangeText={(text) => setName(text)}
                                value={name}
                                color={locked ? colors.light : colors.secondary}
                            />
                        </Block>
                    </Block>*/}
                    <Block
                        row
                        display={'flex'}
                        justifyContent="space-between"
                        alignItems="center"
                        paddingVertical={sizes.s}>
                        <Text bold>Email:</Text>
                        <Block marginLeft={sizes.m}>
                            <Input
                                autoCapitalize="none"
                                textAlign="right"
                                keyboardType="email-address"
                                disabled={locked}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                color={locked ? colors.light : colors.secondary}
                            />
                        </Block>
                    </Block>
                    {!locked &&
                        <Block paddingVertical={sizes.sm}>
                            {loading
                                ? <ActivityIndicator />
                                : <Button gradient={gradients.success} onPress={() => updateAccount()}>
                                    <Text white semibold>Save</Text>
                                </Button>
                            }
                            
                        </Block>
                    }
                </Block>
                <Button onPress={() => navigation.navigate('ResetPassword')} paddingBottom={sizes.l}>
                    <Text>Reset Password</Text>
                </Button>
            </Block>
            {locked
                ? <Button onPress={() => logout()} paddingBottom={sizes.l}>
                    <Text color={colors.danger}>Sign Out</Text>
                </Button>
                : <Button onPress={() => confirmDelete()} paddingBottom={sizes.l}>
                    <Text color={colors.danger}>Delete Account</Text>
                </Button>
            }
        </Block>
    );
};

export default Account;
