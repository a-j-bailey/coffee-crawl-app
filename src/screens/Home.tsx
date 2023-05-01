import React, {useCallback, useState, useEffect} from 'react';

import {useData, useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Input, Cafe, Text} from '../components/';

import { supabase } from '../services/supabaseClient';

const Home = () => {
    const {t} = useTranslation();
    const [tab, setTab] = useState<number>(0);
    const {following, trending} = useData();
    const [cafes, setCafes] = useState(following);
    const {assets, colors, fonts, gradients, sizes} = useTheme();

    const [cafes2, setCafes2] = useState([]);

    useEffect(() => {
        getCountries();
    }, []);

    async function getCountries() {        
        let { data: cafes2, error } = await supabase.from('cafes').select('*')

        setCountries(cafes2);
        console.log('cafes: '+cafes2);
        console.log('error: '+error);
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
      {/* search input */}
      {/*<Block color={colors.card} flex={0} padding={sizes.padding}>
        <Input search placeholder={t('common.search')} />
      </Block>*/}

      {/* toggle products list */}
      {/*<Block
        row
        flex={0}
        align="center"
        justify="center"
        color={colors.card}
        paddingBottom={sizes.sm}>
        <Button onPress={() => handleProducts(0)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 0 ? 'primary' : 'secondary']}>
              <Image source={assets.extras} color={colors.white} radius={0} />
            </Block>
            <Text p font={fonts?.[tab === 0 ? 'medium' : 'normal']}>
              {t('home.following')}
            </Text>
          </Block>
        </Button>
        <Block
          gray
          flex={0}
          width={1}
          marginHorizontal={sizes.sm}
          height={sizes.socialIconSize}
        />
        <Button onPress={() => handleProducts(1)}>
          <Block row align="center">
            <Block
              flex={0}
              radius={6}
              align="center"
              justify="center"
              marginRight={sizes.s}
              width={sizes.socialIconSize}
              height={sizes.socialIconSize}
              gradient={gradients?.[tab === 1 ? 'primary' : 'secondary']}>
              <Image
                radius={0}
                color={colors.white}
                source={assets.documentation}
              />
            </Block>
            <Text p font={fonts?.[tab === 1 ? 'medium' : 'normal']}>
              {t('home.trending')}
            </Text>
          </Block>
        </Button>
      </Block> */}

      {/* cafe list */}
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
            <Block row wrap="wrap" justify="space-between" marginTop={sizes.sm}>
              {cafes?.map((cafe) => (
                <Cafe cafe={cafe} key={`card-${cafe?.id}`} />
              ))}
            </Block>
            <Block
                flex={0}
                height={1}
                marginRight={sizes.md}
                marginVertical={sizes.sm}
                gradient={gradients.menu}
            />
            <Text center>
                ☕
            </Text>
      </Block>
    </Block>
  );
};

export default Home;
