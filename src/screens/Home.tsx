import React, { useCallback, useState, useEffect } from 'react';
import { TouchableOpacity, ScrollView, RefreshControl, Linking } from 'react-native';
import { useData, useTheme, useTranslation } from '../hooks/';
import { Block, Button, Image, Input, Cafe, Text } from '../components/';
import CountDown from 'react-native-countdown-fixed';
import { useNavigation } from '@react-navigation/core';
import { supabase } from '../services/supabaseClient';

const Home = () => {
    const { assets, colors, fonts, gradients, sizes } = useTheme();

    const [cafes, setCafes] = useState([]);
    const [counterId, setCounterId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [locked, setLocked] = useState(true);
    const [purchased, setPurchased] = useState(false);
    const [remaining, setRemaining] = useState(0);
    const [refreshing, setRefreshing] = useState(true);

    const [eventEnded, setEventEnded] = useState(false);

    const navigation = useNavigation();

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        getEvent();
        setRefreshing(false);
    }, [refreshing]);

    useEffect(() => {
        getEvent();
    }, []);

    async function getPurchased() {
        let { data, error } = await supabase
            .from('profiles')
            .select('*, user_receipts(*)')
            .order('created_at', { foreignTable: 'user_receipts', ascending: false })
            .eq('user_receipts.event_id', 1)
            .in('user_receipts.payment_status', ['pending', 'succeeded']);

        if (data && data[0].user_receipts.length > 0) {
            setPurchased(true);
            return true;
        } else {
            setPurchased(false);
            return false;
        }
    }

    function calcRemainingTime(event) {
        // Calculate time till event starts.
        const start = new Date(event.start)
        const now = new Date()
        const remains = Math.floor((start.getTime() - now.getTime()) / 1000)

        setRemaining(remains);
        setCounterId(remains.toString());

        return remains;
    }

    function isEventCurrent(event) {
        const start = new Date(event.start);
        const end = new Date(event.end);
        const now = new Date();

        let isCurrent = false;

        isCurrent = (
            // Is current time greater than start time?
            now.getTime() >= start.getTime()
            // Is current time less than end time?
            && now.getTime() <= end.getTime()
        );

        if (!(now.getTime() <= end.getTime())) {
            setEventEnded(true);
        }

        return isCurrent;
    }

    // Get cafe data.
    async function getEvent() {
        let purchased = await getPurchased();

        let { data, error } = await supabase
            .from('events')
            .select('*, cafes (*)')
            .order('name', { foreignTable: 'cafes', ascending: true });

        if (data) {
            setCafes(data[0].cafes);
        }

        const remains = calcRemainingTime(data[0]);

        const eventIsCurrent = isEventCurrent(data[0]);

        // Set event title in page header.
        setTitle(data[0].name)
        // Set event description in page header.
        setDescription(data[0].description)

        setLocked((!eventIsCurrent || !purchased));

        // if (remains > 0 || !purchased) {
        //     setLocked(true)
        // } else {
        //     setLocked(false)
        // }

        setRefreshing(false);
    };

    if (eventEnded) {
        return (
            <Block padding={sizes.padding}>
                {purchased && <Text p center primary semibold>I hope you had a great time!</Text>}
                <Text h4 center>The {title} has ended.</Text>
                <Text center h5>
                    This party may have ended but don't go anywhere! We're working on bringing more
                    great events to town!
                </Text>
                <Block
                    flex={0}
                    height={1}
                    marginRight={sizes.md}
                    marginVertical={sizes.sm}
                    gradient={gradients.menu}
                />
                {purchased &&
                    <Button 
                        gradient={gradients.primary}
                        marginBottom={sizes.base}
                        shadow
                        onPress={() => Linking.openURL('https://coffeecrawl.framer.website/support')}>
                        <Text p center white semibold>Submit Feedback</Text>
                    </Button>
                }
            </Block>
        )
    }

    return (
        <Block>
            <ScrollView
                paddingHorizontal={sizes.padding}
                marginVertical={sizes.sm}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: sizes.l }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor={colors.secondary}
                    />
                }>
                <Text h5 center>Welcome to the</Text>
                <Text h4 center paddingHorizontal={sizes.l}>{title}</Text>
                <Text center>
                    {description}
                </Text>
                <Block
                    flex={0}
                    height={1}
                    marginRight={sizes.md}
                    marginVertical={sizes.sm}
                    gradient={gradients.menu}
                />
                {!purchased &&
                    <TouchableOpacity onPress={() => navigation.navigate('Pro')}>
                        <Block card white padding={0} marginVertical={sizes.sm}>
                            <Image
                                background
                                resizeMode="cover"
                                radius={sizes.cardRadius}
                                source={assets.background}>
                                <Block color={colors.overlay} padding={sizes.padding}>
                                    <Text h5 white>
                                        Purchase your ticket to unlock!
                                    </Text>
                                </Block>
                            </Image>
                        </Block>
                    </TouchableOpacity>
                }
                {(locked && purchased) &&
                    <Block>
                        <Image
                            background
                            resizeMode="cover"
                            radius={sizes.cardRadius}
                            source={assets.grad}>
                            <Block padding={sizes.padding}>
                                <Text h4 white center>You're In!</Text>
                                <Block padding={sizes.s}>
                                    <CountDown
                                        id={counterId}
                                        until={remaining}
                                        onFinish={() => { onRefresh() }}
                                        digitStyle={{ backgroundColor: '#FFF' }}
                                        timeToShow={['D', 'H', 'M', 'S']}
                                        timeLabels={{ d: 'Days', h: 'Hours', m: 'Minutes', s: 'Seconds' }}
                                        timeLabelsStyle={{}}
                                        size={15}
                                    />
                                </Block>
                                <Text p size={sizes.sm} white center>Get ready for some great coffee!</Text>
                            </Block>
                        </Image>
                    </Block>
                }
                <Block row wrap="wrap" justify="space-between" marginVertical={sizes.sm}>
                    {cafes?.map((cafe) => (
                        <Cafe cafe={cafe} locked={locked} purchased={purchased} key={`card-${JSON.stringify(cafe)}`} />
                    ))}
                </Block>
                <Block
                    row
                    flex={0}
                    align="center"
                    justify="center"
                    marginBottom={sizes.sm}
                    paddingHorizontal={sizes.xxl}>
                    <Block
                        flex={0}
                        height={1}
                        width="50%"
                        end={[1, 0]}
                        start={[0, 1]}
                        gradient={gradients.divider} />
                    <Text center marginHorizontal={sizes.s}>
                        ☕
                    </Text>
                    <Block
                        flex={0}
                        height={1}
                        width="50%"
                        end={[0, 1]}
                        start={[1, 0]}
                        gradient={gradients.divider}
                    />
                </Block>
            </ScrollView>
        </Block>
    );
};

export default Home;
