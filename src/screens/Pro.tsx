import React, {useCallback, useEffect} from 'react';
import {Linking, StatusBar} from 'react-native';

import {useTheme, useTranslation} from '../hooks/';
import {Block, Button, Image, Text} from '../components/';

const Pro = () => {
  const {t} = useTranslation();
  const {assets, colors, gradients, sizes} = useTheme();

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    return () => {
      StatusBar.setBarStyle('dark-content');
    };
  }, []);

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

                    <Text marginBottom={sizes.padding}>
                        The 2023 Tulsa Coffee Crawl was specifically designed to give you
                        the opportunity to explore new coffee shops and cafes across town.
                    </Text>

                    <Text semibold>- 20+ Different Cafes</Text>
                    <Text semibold>- 20+ Cups of Coffee</Text>
                    <Text semibold>- 30 Days to Enjoy it All</Text>
                    <Text semibold>- 1 Low Price</Text>

                    <Text marginVertical={sizes.padding}>
                        Once you've purchased you're ticket you'll be all set to partake in some amazing coffee.
                        You'll receive a coupon for one free hot or iced coffee from each cafe.
                    </Text>
                    
                    <Text semibold>Simply present the coupon and enjoy your fresh local coffee.</Text>

                    
                    <Button
                        gradient={gradients.primary}
                        marginVertical={sizes.s}
                        onPress={() =>
                            handleWebLink(
                                'https://www.creative-tim.com/product/soft-ui-pro-react-native',
                            )
                        }>
                        <Text white bold transform="uppercase">
                            In-App Purchase Button
                        </Text>
                    </Button>

                    <Button title="Learn More" padding={sizes.s} onPress={() => handleWebLink('http://coffeecrawl.club')}>
                        <Text color={colors.secondary}>I still have questions. Tell me more.</Text>
                    </Button>
                </Block>
            </Block>
        </Image>
    );
};

export default Pro;
