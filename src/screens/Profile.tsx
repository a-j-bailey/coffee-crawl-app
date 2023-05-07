import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking, Alert} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/core';
import {Block, Button, Image, Text, Coupon} from '../components/';
import {useData, useTheme, useTranslation} from '../hooks/';

const isAndroid = Platform.OS === 'android';

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
    
  const {assets, colors, gradients, sizes} = useTheme();


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
            <Coupon {...route.params.cafe}/>
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
