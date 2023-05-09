import React, {useCallback, useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Cafe, Text} from '../components/';
import CountDown from 'react-native-countdown-fixed';

import { supabase } from '../services/supabaseClient';

const Home = () => {
    const {t} = useTranslation();
    const [tab, setTab] = useState<number>(0);
    const {following, trending} = useData();
    const {assets, colors, fonts, gradients, sizes} = useTheme();

    const [cafes, setCafes] = useState([]);
    const [title, setTitle] = useState('');
    const [locked, setLocked] = useState(true);
    const [purchased, setPurchased] = useState(false);
    const [remaining, setRemaining] = useState(0);
    
    useEffect(() => {
        getUserData();
        getCafes();
    }, [])


    // Get user data.
    async function getUserData() {
        let { data, error } = await supabase.from('profiles').select('*')
        console.log('purchased: '+data[0].purchased)
        if (data && data[0].purchased) {
            setPurchased(true)
        }
    }

    // Get cafe data.
    async function getCafes() {
        let { data, error } = await supabase.from('events').select('*, cafes (*)')
        if (data) {
            setCafes(data[0].cafes)
        }
        setTitle(data[0].name)
        const start = new Date(data[0].start)
        const now = new Date()
        const remains = Math.floor((start.getTime() - now.getTime())/1000)
        setRemaining(remains)
    };

  return (
    <Block>
      <Block
          scroll
          paddingHorizontal={sizes.padding}
          marginVertical={sizes.sm}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: sizes.l}}>
            <Text h5 center>Welcome to the</Text>
            <Text h4 center paddingHorizontal={sizes.l}>{title}</Text>
            <Text center>
                Your ticket to a whole month of coffee from the greatest coffee shops in Tulsa.
            </Text>
            <Block
                flex={0}
                height={1}
                marginRight={sizes.md}
                marginVertical={sizes.sm}
                gradient={gradients.menu}
            />
            {!purchased &&
                <TouchableOpacity onPress={() => setPurchased(!purchased)}>
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
            {(!locked || purchased) && 
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
                                        until={remaining}
                                        onFinish={() => expire()}
                                        digitStyle={{backgroundColor: '#FFF'}}
                                        timeToShow={['D', 'H', 'M', 'S']}
                                        timeLabels={{d:'Days', h:'Hours', m:'Minutes', s:'Seconds'}}
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
                <Cafe cafe={cafe} locked={locked} purchased={purchased} key={`card-${cafe?.id}`} />
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
                    gradient={gradients.divider}/>
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
      </Block>
    </Block>
  );
};

export default Home;
