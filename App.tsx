import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import BottomTabNav from './BottomTabNav';
import Details from './src/screens/details';
import JobView from './src/screens/jobview';
import {displayNotification} from './src/utils/notify';

const Stack = createNativeStackNavigator();

function App() {
  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    const token = await messaging().getToken();
    console.log('token', token);
    return token;
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      displayNotification(remoteMessage);
    });

    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabNav}
          options={{
            title: 'Job Hunter',
            headerStyle: {
              backgroundColor: '#6a1b9a',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: 'Job Hunter',
            headerStyle: {
              backgroundColor: '#6a1b9a',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="JobView"
          component={JobView}
          options={{
            title: 'Job Hunter',
            headerStyle: {
              backgroundColor: '#6a1b9a',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
