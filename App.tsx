import 'react-native-gesture-handler';
import React, { useEffect, useCallback } from 'react';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';
import { Linking } from 'react-native';
import { useStripe } from '@stripe/stripe-react-native';
import { vexo } from 'vexo-analytics';

export default function App() {

	// if (!__DEV__) {
		vexo('375ade05-5f0f-4167-b717-6ecf77d0a596');
	// }

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
