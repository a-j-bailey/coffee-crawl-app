import React, {useCallback} from 'react';
import {Platform, Linking} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';

const Profile = ({navigation, route}) => {
    const {id, image, title, type, linkLabel, location} = route.params.cafe;
    
    console.log('profile: '+title);
  const {user} = useData();
  const {t} = useTranslation();
//  const navigation = useNavigation();
  const {assets, colors, gradients, sizes} = useTheme();

  const IMAGE_SIZE = (sizes.width - (sizes.padding + sizes.sm) * 2) / 3;
  const IMAGE_VERTICAL_SIZE =
    (sizes.width - (sizes.padding + sizes.sm) * 2) / 2;
  const IMAGE_MARGIN = (sizes.width - IMAGE_SIZE * 3 - sizes.padding * 2) / 2;
  const IMAGE_VERTICAL_MARGIN =
    (sizes.width - (IMAGE_VERTICAL_SIZE + sizes.sm) * 2) / 2;

  const handleSocialLink = useCallback(
    (type: 'twitter' | 'dribbble') => {
      const url =
        type === 'twitter'
          ? `https://twitter.com/${user?.social?.twitter}`
          : `https://dribbble.com/${user?.social?.dribbble}`;

      try {
        Linking.openURL(url);
      } catch (error) {
//        alert(`Cannot open URL: ${url}`);
      }
    },
    [user],
  );

  return (
      <Block safe marginTop={sizes.md}>
          <Block
            scroll
            paddingHorizontal={sizes.s}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: sizes.padding}}>
        <Block flex={0}>
          <Image
            background
            resizeMode="cover"
            radius={sizes.cardRadius}
            source={{uri: image}}>
              <Block color="rgba(0,0,0,0.5)" padding={sizes.padding} paddingBottom={sizes.l}>
                <Button
                  row
                  flex={0}
                  justify="flex-start"
                  onPress={() => navigation.goBack()}>
                  <Image
                    radius={0}
                    width={10}
                    height={18}
                    color={colors.white}
                    source={assets.arrow}
                    transform={[{rotate: '180deg'}]}
                  />
                  <Text p white marginLeft={sizes.s}>{/*back nav text*/}</Text>
                </Button>
                <Block flex={0} align="center">
                  {/*<Image
                    width={64}
                    height={64}
                    marginBottom={sizes.sm}
                    source={{uri: user?.avatar}}
                  />*/}
                  <Text h4 center white>
                    {title}
                  </Text>
                  <Text p center white>
                    {location}
                  </Text>
                  <Block row marginVertical={sizes.m}>
                    <Button
                      shadow={false}
                      radius={sizes.m}
                      marginHorizontal={sizes.sm}
                      color="rgba(255,255,255,0.2)"
                      outlined={String(colors.white)}
                      onPress={() => handleSocialLink('twitter')}>
                      <Ionicons
                        size={18}
                        name="logo-instagram"
                        color={colors.white}
                      />
                    </Button>
                    <Button
                      shadow={false}
                      radius={sizes.m}
                      color="rgba(255,255,255,0.2)"
                      outlined={String(colors.white)}
                      onPress={() => handleSocialLink('dribbble')}>
                      <Ionicons
                        size={18}
                        name="globe-outline"
                        color={colors.white}
                      />
                    </Button>
                      <Button
                      shadow={false}
                      radius={sizes.m}
                      marginHorizontal={sizes.sm}
                      color="rgba(255,255,255,0.2)"
                      outlined={String(colors.white)}
                      onPress={() => handleSocialLink('twitter')}>
                      <Ionicons
                        size={18}
                        name="logo-facebook"
                        color={colors.white}
                      />
                    </Button>
                  </Block>
            </Block>
              </Block>
          </Image>

          {/* profile: stats */}
          <Block
            flex={0}
            radius={sizes.sm}
            shadow={!isAndroid} // disabled shadow on Android due to blur overlay + elevation issue
            marginTop={-sizes.m}
            marginHorizontal="8%"
            color="rgba(255,255,255,0.2)">
            <Block
              row
              blur
              flex={0}
              intensity={100}
              radius={sizes.sm}
              overflow="hidden"
              tint={colors.blurTint}
              justify="space-evenly"
              paddingVertical={sizes.sm}
              renderToHardwareTextureAndroid>
              <Block align="center">
                <Text>1 Small Iced Coffee.</Text>
              </Block>
            </Block>
          </Block>

          {/* profile: about me */}
          <Block paddingHorizontal={sizes.sm}>
            <Text h5 semibold marginBottom={sizes.s} marginTop={sizes.sm}>
              {t('profile.aboutMe')}
            </Text>
            <Text p lineHeight={26}>
              {user?.about}
            </Text>
          </Block>
            {/*Activate Button*/}
            <Block padding={sizes.padding}>
                <Button flex={1} gradient={gradients.primary} marginBottom={sizes.base} shadow>
                  <Text white bold transform="uppercase">
                    Activate Coupon
                  </Text>
                </Button>
                <Text center size={10}>
                    Don't activate the coupon until you're ready to use.
                    Couponse are only redeemable for 15 minutes once activated.
                </Text>
            </Block>
            {/*Mock Coupon*/}
            <Block padding={sizes.l}>
                <Block card padding={0} marginTop={sizes.sm}>
                    <Image
                      background
                      resizeMode="cover"
                      source={assets.background}
                      radius={sizes.cardRadius}>
                        <Block color="rgba(0,0,0,0.1)" padding={sizes.l} height={400}>
                        </Block>
                    </Image>
                </Block>
            </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
