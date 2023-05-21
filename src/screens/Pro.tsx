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

const Pro = () => {
    const { t } = useTranslation();
    const { assets, colors, gradients, sizes } = useTheme();

    const handleWebLink = useCallback((url) => Linking.openURL(url), []);

    // ----------------------------------------------------------------------
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(true);
    const [clientSecret, setClientSecret] = useState<string>();
    const [paymentSheetEnabled, setPaymentSheetEnabled] = useState(false);

    const fetchPaymentSheetParams = async () => {
        // Use Supabase functions to fetch payment sheet parameters
        const { data, error } = await supabase.functions.invoke<FunctionResponse>(
            "payment-sheet"
        );

        console.log(data, error);

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

        // const address: PaymentSheet.Address = {
        //     city: "San Francisco",
        //     country: "AT",
        //     line1: "510 Townsend St.",
        //     line2: "123 Street",
        //     postalCode: "94102",
        //     state: "California",
        // };

        // const billingDetails: PaymentSheet.BillingDetails = {
        //     name: "Jane Doe",
        //     email: "foo@bar.com",
        //     phone: "555-555-555",
        //     address: address,
        // };

        const { error } = await initPaymentSheet({
            customerId: customer,
            customerEphemeralKeySecret: ephemeralKey,
            paymentIntentClientSecret: paymentIntent,
            customFlow: false,
            merchantDisplayName: "coffeecrawl.club",
            style: "automatic",
            returnURL: "stripe-example://stripe-redirect",
            allowsDelayedPaymentMethods: true,
        });
        if (!error) {
            setPaymentSheetEnabled(true);
        } else if (error.code === PaymentSheetError.Failed) {
            Alert.alert(
                `PaymentSheet init failed with error code: ${error.code}`,
                error.message
            );
        } else if (error.code === PaymentSheetError.Canceled) {
            Alert.alert(
                `PaymentSheet init was canceled with code: ${error.code}`,
                error.message
            );
        }
        setLoading(false);
    };

    const openPaymentSheet = async () => {
        console.log('openPaymentSheet');
        const { error } = await presentPaymentSheet();

        if (error) {
            Alert.alert(`Error code: ${error.code}`, error.message);
        } else {
            Alert.alert('Success', 'Your order is confirmed!');
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
