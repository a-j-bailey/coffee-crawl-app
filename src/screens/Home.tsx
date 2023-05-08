import React, {useCallback, useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native';
import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Cafe, Text} from '../components/';

import { supabase } from '../services/supabaseClient';

const Home = () => {
    const {t} = useTranslation();
    const [tab, setTab] = useState<number>(0);
    const {following, trending} = useData();
    const {assets, colors, fonts, gradients, sizes} = useTheme();

    const [cafes, setCafes] = useState([]);
    
    const [locked, setLocked] = useState(true);
    
    useEffect(() => {
        getUserData();
        getCafes();
    }, [])

    async function getUserData() {
        let { data, error } = await supabase.from('profiles').select('*')
        if (data && data[0].purchased) {
            setLocked(false)
        }
    }

    async function getCafes() {
        let { data: cafes, error } = await supabase.from('cafes').select('*, user_coupons (*)')
        setCafes(cafes);
//        cafes.forEach((cafe) => {
//            console.log('----'+cafe.name+'----')
//            console.log(cafe);
//        })
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
            <Text h4 center>2024 Tulsa Coffee Crawl</Text>
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
            <TouchableOpacity onPress={() => setLocked(!locked)}>
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
            <Block row wrap="wrap" justify="space-between" marginVertical={sizes.sm}>
              {cafes?.map((cafe) => (
                <Cafe cafe={cafe} locked={locked} key={`card-${cafe?.id}`} />
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
