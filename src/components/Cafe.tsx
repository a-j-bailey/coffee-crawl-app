import {React, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {Ionicons} from '@expo/vector-icons';
import Block from './Block';
import Image from './Image';
import Text from './Text';
import {useTheme, useTranslation} from '../hooks/';

const Cafe = ({cafe, locked, purchased}) => {
    const {id, image, name, linkLabel, location_short} = cafe;

    const visited = (cafe.user_coupons.length > 0);
    
    let type = 'vertical';

    const {t} = useTranslation();
    const {assets, colors, sizes, gradients} = useTheme();

    const isHorizontal = type !== 'vertical';
    const CARD_WIDTH = (sizes.width - sizes.padding * 2 - sizes.sm) / 2;
    
    const navigation = useNavigation();
    
    const handleNavigation = useCallback(
        (id) => {
            navigation.navigate('Profile', {cafe: cafe});
        },
        [navigation],
    );
    
    if (locked) {
        return (
            <Block
                backgroundColor={colors.card}
                borderRadius={sizes.cardRadius}
                padding={sizes.cardPadding}
                flex={0}
                row={isHorizontal}
                marginBottom={sizes.sm}
                width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}>
                <Image
                    background
                    borderRadius={sizes.cardRadius}
                    resizeMode="cover"
                    source={{uri: image}}
                    style={{
                      height: isHorizontal ? 114 : 110,
                      width: !isHorizontal ? '100%' : sizes.width / 2.435,
                    }}>
                    <Block center align="center" color="#FFFFFF90" borderRadius={sizes.cardRadius}>
                        {!purchased &&
                            <Ionicons
                                size={30}
                                name="lock-closed"
                                color={colors.black}
                            />
                        }
                    </Block>
                </Image>
                <Block
                    paddingTop={sizes.s}
                    justify="space-between"
                    paddingLeft={isHorizontal ? sizes.sm : 0}
                    paddingBottom={isHorizontal ? sizes.s : 0}>
                    <Block>
                        <Text p marginBottom={sizes.xxs} color={colors.gray}>
                            {name}
                        </Text>
                        <Text h6 marginBottom={sizes.xs} size={12} color={colors.gray}>{location_short}</Text>
                    </Block>
                </Block>
            </Block>
        );
    } else {
        return (
            <TouchableOpacity onPress={() => handleNavigation(id)}>
                <Block
                    card
                    flex={0}
                    row={isHorizontal}
                    marginBottom={sizes.sm}
                    width={isHorizontal ? CARD_WIDTH * 2 + sizes.sm : CARD_WIDTH}>
                    <Image
                        background
                        borderRadius={sizes.cardRadius}
                        resizeMode="cover"
                        source={{uri: image}}
                        style={{
                            height: isHorizontal ? 114 : 110,
                            width: !isHorizontal ? '100%' : sizes.width / 2.435,
                        }}>
                        {visited && 
                            <Block alignItems="flex-end" padding={sizes.s} borderRadius={sizes.cardRadius}>
                                <Ionicons color={colors.success} size={24} name="checkmark-circle"/>
                            </Block>
                        }
                    </Image>
                    <Block
                        paddingTop={sizes.s}
                        justify="space-between"
                        paddingLeft={isHorizontal ? sizes.sm : 0}
                        paddingBottom={isHorizontal ? sizes.s : 0}>
                        <Block>
                            <Text p marginBottom={sizes.xxs}>
                                {name}
                            </Text>
                            <Text h6 marginBottom={sizes.xs} size={12}>{location_short}</Text>
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
    }


  
};

export default Cafe;
