import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking, Alert, ActivityIndicator} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';
import CountDown from 'react-native-countdown-fixed';
import { supabase } from '../services/supabaseClient';
import { Session } from '@supabase/supabase-js'

const Coupon = ({id, image, title, type, linkLabel, location, logo}) => {
    const {assets, colors, gradients, sizes} = useTheme();
    const [status, setStatus] = useState('Loading');
    const [expireTime, setExpireTime] = useState();
    const [userId, setUserId] = useState('');
    const [couponData, setCouponData] = useState(null);
    const [remaining, setRemaining] = useState(900);
    
    useEffect(() => {
        getUserData()
    }, [])
    
    // Get user data.
    async function getUserData() {
        console.log('-----GET USER-----')
        const { data: { user } } = await supabase.auth.getUser()
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
        console.log('----GET COUPON----')
        console.log(userId);
        const { data, error } = await supabase.from('user_coupons')
            .select('*')
            .eq('cafe_id', id)
            .eq('user_id', userId)

        console.log(data);
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
        console.log('---PARSE COUPON---')
        const activated = new Date(couponData.activated);
        const now = new Date()
        const elapsed = Math.floor((now.getTime() - activated.getTime())/1000)
        const remains = 900 - elapsed;
        if (remains > 0) {
            setRemaining(remains)
            setStatus('Active')
        } else {
            setStatus('Expired')
        }
        console.log('remaining'+elapsed);
    }, [couponData])

 
    async function activate() {
        setStatus('Active');
        let now = new Date();
        
        // Set display time.
        expireAt = new Date(now.getTime() + 15*60000)
        setExpireTime(expireAt.toLocaleTimeString());
        
        console.log('userId: '+userId)
        
        // Create coupon in DB.
        const { data, error } = await supabase
          .from('user_coupons')
          .insert([{
              user_id: userId,
              cafe_id: id,
          }])
        console.log('data '+data)
        console.log(error)
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
        [],
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
            <Block padding={sizes.l}>
                <Block
                    card
                    padding={0}
                    marginTop={sizes.sm}>
                    <Image
                      background
                      resizeMode="cover"
                      source={assets.background}
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
                            <Text white h6>Tulsa Coffee Crawl</Text>
                            <Text white p center size={sizes.s}>1 Free Small Iced or Hot Coffee</Text>
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
                    <Text dark center>
                        Don't forget to leave a review!
                    </Text>
                    <Button flex={1} gradient={gradients.dark} margin={sizes.s}>
                        <Text white bold marginHorizontal={sizes.s}>
                            Review on RSTRS App
                        </Text>
                    </Button>
                </Block>
            </Block>
        );
    }
};

export default Coupon;
