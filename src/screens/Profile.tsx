import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';

import {Block, Button, Image, Text} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';

/* drawer menu screens navigation */

const CouponContainer = ({id, image, title, type, linkLabel, location, logo} ) => {
    const {assets, colors, gradients, sizes} = useTheme();

    const [status, setStatus] = useState('Available');
    
    function activateCoupon() {
        setStatus('Active');
    };
    
    const confirmActivate = useCallback(
        () => {
            Alert.alert(
                'Activate Coupon?',
                'Coupons expire after 15 minutes and cannot be reused.',
                [
                    {
                        text: 'Cancel',
                        onPress: () => {},
                        style: 'cancel',
                    },
                    {
                        text: 'Activate',
                        onPress: () => activateCoupon(),
                        style: 'default',
                    },
                ],
                {
                    cancelable: true,
                    onDismiss: () => {},
                },
            );
        },
        [],
    );
    
    if (status == 'Available') {
        return (
            <Block padding={sizes.padding}>
                <Button
                    flex={1}
                    gradient={gradients.primary}
                    marginBottom={sizes.base}
                    shadow
                    onPress={() => confirmActivate()}>
                  <Text white bold transform="uppercase">
                    Activate Coupon
                  </Text>
                </Button>
                <Text center size={10} lineHeight={12}>
                    Don't activate the coupon until you're ready to use.
                    Coupons are only redeemable for 15 minutes once activated.
                </Text>
            </Block>
        );
    } else if (status == 'Active') {
        return (
            <Block padding={sizes.l}>
                <Block
                    card
                    padding={0}
                    marginTop={sizes.sm}>
                    <Image
                      background
                      resizeMode="cover"
                      source={assets.background}
                      radius={sizes.cardRadius}>
                        <Block color="rgba(0,0,0,0.1)" padding={sizes.xl} align="center">
                            <Image source={{uri: logo}} width={80} height={80} center/>
                            <Text white h4 margin={sizes.m}>15:00</Text>
                            <Text white h6>Tulsa Coffee Crawl</Text>
                            <Text white p center size={sizes.s}>1 Free Small Iced or Hot Coffee</Text>
                        </Block>
                    </Image>
                </Block>
            </Block>
        );
    } else if (status == 'Expired') {
        return (
            <Block padding={sizes.padding}>
                <Text gradient={gradients.success} bold transform="uppercase" center>
                    <Ionicons size={16} name="checkmark-circle-outline"/> Coupon Used
                </Text>
                <Block marginTop={sizes.s}>
                    <Text dark bold center>
                        I hope you enjoyed your coffee!
                    </Text>
                    <Text dark center>
                        Don't forget to leave a review!
                    </Text>
                    <Button flex={1} gradient={gradients.dark} margin={sizes.s}>
                        <Text white bold marginHorizontal={sizes.s}>
                            Review on RSTRS App
                        </Text>
                    </Button>
                </Block>
            </Block>
        );
    }

    
};

const Profile = ({navigation, route}) => {
    const {
        id,
        image,
        name,
        type,
        linkLabel,
        location_short,
        location_address,
        logo,
        coupon_value
    } = route.params.cafe;

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
                  <Ionicons
                    size={30}
                    name="chevron-back-outline"
                    color={colors.white}
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
                    <Image
                        source={{uri: logo}}
                        width={80}
                        height={80}
                        />
                  <Text h4 center white>
                    {name}
                  </Text>
                  <Text p center white>
                    {location_short}
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
            marginHorizontal={sizes.padding}
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
                <Text>{coupon_value}</Text>
              </Block>
            </Block>
          </Block>

          {/*Activate Button*/}
            <CouponContainer {...route.params.cafe}/>
            <Block padding={sizes.padding}>
                <Text bold transform="uppercase" marginTop={sizes.s}>Address</Text>
                <Text>{location_address}</Text>
                <Text bold transform="uppercase" marginTop={sizes.s}>Hours</Text>
                <Text>Mon: 10am - 6pm</Text>
                <Text>Tue: 10am - 6pm</Text>
                <Text>Wed: 10am - 6pm</Text>
                <Text>Thu: 10am - 6pm</Text>
                <Text>Fri: 10am - 6pm</Text>
                <Text>Sat: 10am - 6pm</Text>
                <Text>Sun: Closed</Text>
            </Block>
            {/*Mock Coupon*/}
            
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
