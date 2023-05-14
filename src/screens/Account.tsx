import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {useData, useTheme} from '../hooks/';
import {Block, Button, Input, Text} from '../components/';
import {Ionicons} from '@expo/vector-icons';

const Account = () => {
    const {colors, gradients, sizes} = useTheme();
    
    const [locked, setLocked] = useState(true);
    const [name, setName] = useState('Adam Bailey');
    const [email, setEmail] = useState('ajbailey564@gmail.com');
    

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
                    <Button
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
                </Block>
                <Block padding={sizes.padding}>
                    <Block
                        row
                        display={'flex'}
                        justifyContent="space-between"
                        alignItems="center">
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
                                marginVertical={sizes.sm}
                                color={locked ? colors.light : colors.secondary}
                            />
                        </Block>
                    </Block>
                    <Block
                        row
                        display={'flex'}
                        justifyContent="space-between"
                        alignItems="center">
                        <Text bold>Email:</Text>
                        <Block marginLeft={sizes.m}>
                            <Input
                                autoCapitalize="none"
                                textAlign="right"
                                keyboardType="email-address"
                                placeholder="email@example.com"
                                success={null}
                                danger={null}
                                disabled={locked}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                color={locked ? colors.light : colors.secondary}
                            />
                        </Block>
                    </Block>
                    {!locked &&
                        <Block paddingVertical={sizes.sm}>
                            <Button gradient={gradients.success}>
                                <Text white semibold>Save</Text>
                            </Button>
                        </Block>
                    }
                </Block>
            </Block>
            {locked
                ? <Button title="Sign Out" onPress={() => logout()} paddingBottom={sizes.l}>
                    <Text color={colors.danger}>Sign Out</Text>
                </Button>
                : <Button title="Sign Out" onPress={() => logout()} paddingBottom={sizes.l}>
                    <Text color={colors.danger}>Delete Account</Text>
                </Button>
            }
        </Block>
    );
};

export default Account;
