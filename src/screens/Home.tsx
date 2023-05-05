import React, {useCallback, useState, useEffect} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Cafe, Text} from '../components/';

import { supabase } from '../services/supabaseClient';

const Home = () => {
    const {t} = useTranslation();
    const [tab, setTab] = useState<number>(0);
    const {following, trending} = useData();
//    const [cafes, setCafes] = useState(following);
    const {assets, colors, fonts, gradients, sizes} = useTheme();

    const [cafes, setCafes] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {        
        let { data: cafes, error } = await supabase.from('cafes').select('*')
        setCafes(cafes);
        cafes.forEach((cafe) => {
            console.log(cafe.name);
        })
//        console.log('cafes: '+cafes2);
//        console.log('error: '+error);
    };
    
    


    
//  const handleProducts = useCallback(
//    (tab: number) => {
//      setTab(tab);
//      setCafes(tab === 0 ? following : trending);
//    },
//    [following, trending, setTab, setCafes],
//  );

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
            <Block row wrap="wrap" justify="space-between" marginVertical={sizes.sm}>
              {cafes?.map((cafe) => (
                <Cafe cafe={cafe} key={`card-${cafe?.id}`} />
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
