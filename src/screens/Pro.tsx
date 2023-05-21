import React, {useCallback, useEffect} from 'react';
import {Linking, StatusBar} from 'react-native';
import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';

const Pro = () => {
  const {t} = useTranslation();
  const {assets, colors, gradients, sizes} = useTheme();

  const handleWebLink = useCallback((url) => Linking.openURL(url), []);

  return (
      <Image
          background
          source={assets.grad}
          padding={sizes.padding}
          style={{flex: 1}}>
            <Block safe justify="center">
                <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
                    <Text h4 center semibold marginBottom={sizes.sm}>
                        Coffee Crawl 2023
                    </Text>

                    <Text marginBottom={sizes.padding} center>
                        The 2023 Tulsa Coffee Crawl is specifically designed to give you
                        the opportunity to explore new coffee shops and cafes across Tulsa.
                    </Text>

                    <Text center semibold>20+ Different Cafes</Text>
                    <Text center semibold>20+ Cups of Coffee</Text>
                    <Text center semibold>31 Days to Enjoy it All</Text>

                    <Text marginVertical={sizes.padding} center>
                        Soon you'll be all set to partake in some amazing coffee.
                        Each participating cafe is offering a coupon for a minimum of a free small iced coffee!
                    </Text>
                    
                    <Text center semibold>Simply present the coupon and enjoy your fresh local coffee.</Text>

                    <Button
                        gradient={gradients.primary}
                        marginVertical={sizes.m}>
                        <Text white bold transform="uppercase">
                            In-App Purchase Button
                        </Text>
                    </Button>

                    <Button padding={sizes.s} onPress={() => handleWebLink('http://coffeecrawl.club')}>
                        <Text color={colors.secondary}>I still have questions. Tell me more.</Text>
                    </Button>
                </Block>
            </Block>
        </Image>
    );
};

export default Pro;
