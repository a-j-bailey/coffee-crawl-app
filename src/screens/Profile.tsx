import React, {useCallback, useEffect, useState} from 'react';
import {Platform, Linking, Alert, TouchableOpacity} from 'react-native';
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
        website,
        coupon_value,
        social_links,
        hours_of_operation
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
                      {(website) && (
                          <Button
                          shadow={false}
                          radius={sizes.m}
                          color="rgba(255,255,255,0.2)"
                          outlined={String(colors.white)}
                          onPress={() => Linking.openURL(website)}
                          marginHorizontal={sizes.s}>
                              <Ionicons
                                size={18}
                                name="globe-outline"
                                color={colors.white}
                              />
                          </Button>
                      )}
                      {(social_links) && Object.keys(social_links).map((k, i) => (
                          <Button
                          key={k}
                          shadow={false}
                          radius={sizes.m}
                          marginHorizontal={sizes.s}
                          color="rgba(255,255,255,0.2)"
                          outlined={String(colors.white)}
                          onPress={() => Linking.openURL(social_links[k])}>
                              <Ionicons
                                size={18}
                                name={"logo-"+k}
                                color={colors.white}
                              />
                          </Button>
                      ))}
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
          <Coupon {...route.params.cafe}/>
          <Block padding={sizes.s}>
                {location_address && <Block>
                  <Text h5 bold marginLeft={sizes.xs}>Address</Text>
                  <Block
                      backgroundColor={colors.card}
                      borderRadius={sizes.s}
                      padding={sizes.cardPadding}
                      marginBottom={sizes.m}>
                      <TouchableOpacity onPress={() => Linking.openURL('http://maps.apple.com/?address='+location_address)}>
                          <Block
                              row
                              justify="space-between">
                              <Text>{location_address}</Text>
                              <Ionicons
                                  size={18}
                                  name="navigate"
                                  color={colors.gray}
                                />
                          </Block>
                      </TouchableOpacity>
                  </Block>
                </Block>
                }
                { (hours_of_operation.length > 0) && <Block>
                  <Text h5 bold marginLeft={sizes.xs}>Hours</Text>
                  <Block
                      backgroundColor={colors.card}
                      borderRadius={sizes.s}
                      padding={sizes.cardPadding}
                      marginBottom={sizes.m}>
                      {(hours_of_operation) && Object.keys(hours_of_operation).map((k, i) => (
                          <Block row justify="space-between" key={i}>
                              <Text>{hours_of_operation[k].days}</Text>
                              <Text align="right">{hours_of_operation[k].hours}</Text>
                          </Block>
                      ))}
                  </Block>
                </Block>
                }
            </Block>
            <Button onPress={() => Linking.openURL('https://coffeecrawl.framer.website/support')}>
              <Text size={12} color={colors.gray} center marginLeft={sizes.xs}>Report An Issue</Text>
            </Button>
        </Block>
      </Block>
    </Block>
  );
};

export default Profile;
