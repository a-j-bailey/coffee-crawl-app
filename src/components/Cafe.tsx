import {React, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';

import Block from './Block';
import Image from './Image';
import Text from './Text';
import {IProduct} from '../constants/types';
import {useTheme, useTranslation} from '../hooks/';

const Cafe = ({id, image, title, type, linkLabel, location}: IProduct) => {
    const {t} = useTranslation();
    const {assets, colors, sizes} = useTheme();

    const isHorizontal = type !== 'vertical';
    const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;
    
    const navigation = useNavigation();
    
    const handleNavigation = useCallback(
        (id) => {
            console.log(id)
            navigation.navigate('Profile', {id: id});
        },
        [navigation],
    );


  return (
      <TouchableOpacity onPress={() => handleNavigation({id})}>
        <Block
            card
            flex={0}
            row={isHorizontal}
            marginBottom={sizes.sm}
            width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}>
      <Image
        resizeMode="cover"
        source={{uri: image}}
        style={{
          height: isHorizontal ? 114 : 110,
          width: !isHorizontal ? '100%' : sizes.width / 2.435,
        }}
      />
      <Block
        paddingTop={sizes.s}
        justify="space-between"
        paddingLeft={isHorizontal ? sizes.sm : 0}
        paddingBottom={isHorizontal ? sizes.s : 0}>
          <Block>
                <Text p marginBottom={sizes.xxs}>
                    {title}
                </Text>
                <Text h6 marginBottom={sizes.xs} size={12}>{location}</Text>
          </Block>
        
          <Block row flex={0} align="center">
            <Text
              p
              color={colors.link}
              semibold
              size={sizes.linkSize}
              marginRight={sizes.s}>
              Explore
            </Text>
            <Image source={assets.arrow} color={colors.link} />
          </Block>
        
      </Block>
    </Block>
  </TouchableOpacity>
  );
};

export default Cafe;
