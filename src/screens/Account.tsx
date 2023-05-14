import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';

import {useData, useTheme} from '../hooks/';
import {Block, Button, Input, Text} from '../components/';

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
                    paddingHorizontal={sizes.padding}>
                    <Text h4>Account</Text>
                </Block>
                <Block padding={sizes.padding}>
                    <Input
                        autoCapitalize="none"
                        label='Name'
                        success={null}
                        danger={null}
                        disabled={locked}
                        onChangeText={(text) => setName(text)}
                        value={name}
                        marginVertical={sizes.sm}
                    />
                    <Input
                        autoCapitalize="none"
                        label='Email'
                        keyboardType="email-address"
                        placeholder="email@example.com"
                        success={null}
                        danger={null}
                        disabled={locked}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </Block>
            </Block>
            <Button title="Sign Out" onPress={() => logout()} paddingBottom={sizes.l}>
                <Text color={colors.danger}>Sign Out</Text>
            </Button>
        </Block>
    );
};

export default Account;
