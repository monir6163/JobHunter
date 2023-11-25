/**
 * @format
 */
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {AppRegistry, Platform, Vibration} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
//messaging background handler for android
messaging().setBackgroundMessageHandler(async remoteMessage => {
  if (Platform.OS === 'android') {
    Vibration.vibrate(1000);
    console.log('Message handled in the background!', remoteMessage);
  }
});
//notifee onBackgroundEvent handler
notifee.onBackgroundEvent(async ({type, detail}) => {
  console.log('Received background event: ', type, detail);
});
AppRegistry.registerComponent(appName, () => App);
