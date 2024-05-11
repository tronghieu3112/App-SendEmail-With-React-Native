// import { registerRootComponent } from 'expo';

// import App from './App';

// // registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// // It also ensures that whether you load the app in Expo Go or in a native build,
// // the environment is set up appropriately
// registerRootComponent(App);


import { registerRootComponent } from 'expo';
import AppNavigator from './AppNavigator'; // Đảm bảo đường dẫn đến AppNavigator đúng

// Đăng ký AppNavigator làm root component
registerRootComponent(AppNavigator);
