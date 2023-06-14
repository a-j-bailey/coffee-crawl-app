import React, { useCallback, useEffect, useState } from 'react';
import { Linking, Alert, ActivityIndicator } from 'react-native';
import { useTheme, useTranslation } from '../hooks/';
import { Block, Button, Image, Text } from '../components/';
import {
    initStripe,
    useStripe,
    PaymentSheet,
    PaymentSheetError,
  } from "@stripe/stripe-react-native";
import { supabase } from '../services/supabaseClient';
import {useNavigation} from '@react-navigation/core';

const Pro = () => {
    const { t } = useTranslation();
    const { assets, colors, gradients, sizes } = useTheme();

    const handleWebLink = useCallback((url) => Linking.openURL(url), []);

    const navigation = useNavigation();

    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState<string>();
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);

    const fetchPaymentSheetParams = async () => {
        // Use Supabase functions to fetch payment sheet parameters
        const { data, error } = await supabase.functions.invoke<FunctionResponse>(
            "payment-sheet"
        );

        if (!data || error) {
            Alert.alert(`Error: ${error?.message ?? "no data"}`);
            return {};
        }

        const { paymentIntent, ephemeralKey, customer, stripe_pk } = data;
        setClientSecret(paymentIntent);

        return {
            paymentIntent,
            ephemeralKey,
            customer,
            stripe_pk,
        };
    };

    const initializePaymentSheet = async () => {
        const {
            paymentIntent,
            ephemeralKey,
            customer,
            stripe_pk,
        } = await fetchPaymentSheetParams();

        setLoading(true);

        await initStripe({
            publishableKey: stripe_pk,
            merchantIdentifier: "merchant.com.stripe.react.native",
            urlScheme: "supabase-stripe-example",
            // setUrlSchemeOnAndroid: true,
        });

        const { data } = await supabase.auth.getSession();

        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            customFlow: false,
            merchantDisplayName: "coffeecrawl.club",
            style: "automatic",
            returnURL: "coffee-crawl://stripe-redirect",
            allowsDelayedPaymentMethods: true,
            billingDetailsCollectionConfiguration: {
                name: PaymentSheet.CollectionMode.ALWAYS,
                email: PaymentSheet.CollectionMode.ALWAYS,
                address: PaymentSheet.AddressCollectionMode.NEVER,
                attachDefaultsToPaymentMethod: true
            },
            defaultBillingDetails: {
                email: data.session?.user.email,
            },
            applePay: {
                merchantCountryCode: 'US',
            },
        });

        if (!error) {
            setPaymentSheetEnabled(true);
        } else if (error.code === PaymentSheetError.Failed) {
            Alert.alert(
                `PaymentSheet init failed with error code: ${error.code}`,
                error.message
            );
        } else if (error.code === PaymentSheetError.Canceled) {
        }
        setLoading(false);
    };

    const openPaymentSheet = async () => {
        const { error } = await presentPaymentSheet();

        if (error) {
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
            navigation.navigate('Home');
        }
    };

    useEffect(() => {
        initializePaymentSheet();
    }, []);
    // ----------------------------------------------------------------------

    return (
        <Image
            background
            source={assets.grad}
            padding={sizes.padding}
            style={{ flex: 1 }}>
            <Block safe justify="center">
                <Block card flex={0} padding={sizes.sm} marginBottom={sizes.sm}>
                    <Text h4 center semibold marginBottom={sizes.sm}>
                        Tulsa Coffee Crawl
                    </Text>

                    <Text marginBottom={sizes.padding} center>
                        The 2023 Tulsa Coffee Crawl is specifically designed to give you
                        the opportunity to explore new coffee shops and cafes across Tulsa.
                    </Text>

                    <Text marginBottom={sizes.padding} center>
                        Each participating coffee shop is offering a coupon for a free coffee which you'll
                        be able to redeem at any point in August.
                    </Text>

                    <Text center semibold>
                        Simply present the coupon and enjoy your fresh local coffee.
                        That's all there is to it.
                    </Text>

                    {loading 
                        ? <ActivityIndicator />
                        : <Button
                            gradient={gradients.primary}
                            marginVertical={sizes.m}
                            onPress={() => openPaymentSheet()}>
                                <Text white bold transform="uppercase">
                                    Purchase
                                </Text>
                        </Button>
                    }
                    <Button padding={sizes.s} onPress={() => handleWebLink('http://coffeecrawl.club')}>
                        <Text color={colors.secondary}>I still have questions. Tell me more.</Text>
                    </Button>
                </Block>
            </Block>
        </Image>
    );
};

export default Pro;
