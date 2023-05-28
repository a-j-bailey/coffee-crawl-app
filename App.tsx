import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';

export default function App() {

	const { handleURLCallback } = useStripe();

	const handleDeepLink = useCallback(
		async (url: string | null) => {
			if (url) {
				const stripeHandled = await handleURLCallback(url);
				if (stripeHandled) {
					// This was a Stripe URL - you can return or add extra handling here as you see fit
					console.log('Stripe URL handled');
				} else {
					// This was NOT a Stripe URL – handle as you normally would
					console.log('Not a Stripe URL');
				}
			}
		},
		[handleURLCallback]
	);

	useEffect(() => {
		const getUrlAsync = async () => {
			const initialUrl = await Linking.getInitialURL();
			handleDeepLink(initialUrl);
		};

		getUrlAsync();

		const deepLinkListener = Linking.addEventListener(
			'url',
			(event: { url: string }) => {
				handleDeepLink(event.url);
			}
		);

		return () => deepLinkListener.remove();
	}, [handleDeepLink]);

	return (
		<DataProvider>
			<AppNavigation />
		</DataProvider>
	);
}
