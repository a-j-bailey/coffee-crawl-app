import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking, Alert, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import {useData, useTheme, useTranslation} from '../hooks/';
import CountDown from 'react-native-countdown-fixed';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Block from './Block';
import Button from './Button';
import Image from './Image';
import Text from './Text';

const Coupon = (
    {
        id,
        image,
        title,
        type,
        linkLabel,
        location,
        logo,
        follow_up_link,
        follow_up_text,
        coupon_value
    }) => {
    const {assets, colors, gradients, sizes} = useTheme();
    const [status, setStatus] = useState('Loading');
    const [userId, setUserId] = useState(null);
    const [couponData, setCouponData] = useState(null);
    const [remaining, setRemaining] = useState(900);
    const [expireTime, setExpireTime] = useState('');
    
    useEffect(() => {
        getUserData()
    }, [])
    
    // Get user data.
    async function getUserData() {
        let user = await AsyncStorage.getItem('@user')
        user = JSON.parse(user)
        setUserId(user.id);
    }
    
    //TODO Get coupon data.
    useEffect(() => {
        getCouponData()
    }, [userId])
    
    async function getCouponData() {
        if (!userId) {
            return
        }
        const { data, error } = await supabase.from('user_coupons')
            .select('*')
            .eq('cafe_id', id)
            .eq('user_id', userId)

        if (data.length > 0) {
            // Set data and parse coupon status.
            setCouponData(data[0]);
        } else {
            // Coupon hasn't been used. Set as available.
            setStatus('Available');
        }
    }
    
    // When coupon data is changed
    useEffect(() => {
        if (!couponData) {
            return
        }
        const activated = new Date(couponData.activated);
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - activated.getTime())/1000)
        const remains = 900 - elapsed;
        expireAt = new Date(activated.getTime() + 15*60000)
        setExpireTime(expireAt.toLocaleTimeString());
        if (remains > 0) {
            setRemaining(remains)
            setStatus('Active')
        } else {
            setStatus('Expired')
        }
    }, [couponData])

 
    async function activate() {
        if (!userId) {
            getUserData()
            return
        }
        setStatus('Active');
        let now = new Date();
        
        // Set display time.
        expireAt = new Date(now.getTime() + 15*60000)
        setExpireTime(expireAt.toLocaleTimeString());
        
        // Create coupon in DB.
        const { data, error } = await supabase
          .from('user_coupons')
          .insert([{
              user_id: userId,
              cafe_id: id,
          }])
    };
    
    function expire() {
        setStatus('Expired');
    };
    
    const confirmActivate = useCallback(
        () => {
            Alert.alert(
                'Activate Coupon?',
                'Coupons expire after 15 minutes and cannot be reused.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: 'Activate',
                        onPress: () => activate(),
                        style: 'default',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        },
        [userId],
    );
    
    
    if (status == 'Loading') {
        return (
            <Block padding={sizes.l}>
                <ActivityIndicator size="small" color="#212121" />
            </Block>
        )
    } else if (status == 'Available') {
        return (
            <Block padding={sizes.padding}>
                <Button
                    flex={1}
                    gradient={gradients.primary}
                    marginBottom={sizes.base}
                    shadow
                    onPress={() => confirmActivate()}>
                  <Text white bold transform="uppercase">
                    Activate Coupon
                  </Text>
                </Button>
                <Text center size={10} lineHeight={12}>
                    Don't activate the coupon until you're ready to use.
                    Coupons are only redeemable for 15 minutes once activated.
                </Text>
            </Block>
        );
    } else if (status == 'Active') {
        return (
            <Block padding={sizes.padding}>
                <Block
                    card
                    padding={0}
                    marginTop={sizes.sm}>
                    <Image
                      background
                      resizeMode="cover"
                      source={assets.couponBackground}
                      radius={sizes.cardRadius}>
                        <Block color="rgba(0,0,0,0.1)" padding={sizes.xl} align="center">
                            <Image source={{uri: logo}} width={80} height={80} center/>
                            <Block padding={sizes.padding}>
                                <CountDown
                                    until={remaining}
                                    onFinish={() => expire()}
                                    digitStyle={{backgroundColor: '#FFF'}}
                                    timeToShow={['M', 'S']}
                                    timeLabels={{}}
                                    size={20}
                                />
                            </Block>
                            <Text white p center size={sizes.s}>{coupon_value}</Text>
                        </Block>
                    </Image>
                </Block>
                <Text paddingTop={sizes.padding} center secondary>
                    Expires at {expireTime}
                </Text>
            </Block>
        );
    } else if (status == 'Expired') {
        return (
            <Block padding={sizes.padding}>
                <Text gradient={gradients.success} bold transform="uppercase" center>
                    <Ionicons size={16} name="checkmark-circle-outline"/> Coupon Used
                </Text>
                <Block marginTop={sizes.s}>
                    <Text dark bold center>
                        I hope you enjoyed your coffee!
                    </Text>
                    { (follow_up_link && follow_up_text) && <Button flex={1} gradient={gradients.dark} margin={sizes.s} onPress={() => Linking.openURL(follow_up_link)}>
                        <Text white bold marginHorizontal={sizes.s}>
                            {follow_up_text}
                        </Text>
                    </Button> }
                </Block>
            </Block>
        );
    }
};

export default Coupon;
