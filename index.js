import { registerRootComponent } from 'expo';
import { vexo } from 'vexo-analytics';

import App from './App';

// if (!__DEV__) {
    vexo('375ade05-5f0f-4167-b717-6ecf77d0a596');
// }

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
