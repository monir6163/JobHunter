import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import SplashScreen from 'react-native-splash-screen';
import BottomTabNav from './BottomTabNav';
import AllNotice from './src/screens/allNotice';
import AllPreparetion from './src/screens/allPreparetion';
import Details from './src/screens/details';
import JobView from './src/screens/jobview';
import NoticeDetails from './src/screens/noticeDetails';
import PreparetionDetails from './src/screens/preparetionDetails';
import Checkinternent from './src/utils/checkInternent';
import {displayNotification} from './src/utils/notify';

const Stack = createNativeStackNavigator();

function App() {
  const [isConnected, setIsConnected] = React.useState(true);

  useEffect(() => {
    SplashScreen.hide();
  }, []);
  useEffect(() => {
    const registerForPushNotifications = async () => {
      const token = await messaging().getToken();

      fetch('https://jobhunter.btebresultsbd.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
        }),
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
        .catch(_error => {
          showMessage({
            message: 'Internet connection error',
            type: 'default',
            backgroundColor: '#ff9800',
            color: '#fff',
            animated: true,
            animationDuration: 500,
            icon: 'danger',
            duration: 3000,
          });
        });
    };
    registerForPushNotifications();
    // Register for push notifications
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      displayNotification(remoteMessage);
    });
    return unsubscribeOnMessage;
  }, []);

  return (
    <>
      <Checkinternent
        isConnected={isConnected}
        setIsConnected={setIsConnected}
      />
      {isConnected === true && (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={BottomTabNav}
              options={{
                title: 'Job Hunter',
                headerStyle: {
                  backgroundColor: '#435B66',
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
                  backgroundColor: '#6F2ED6',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="AllNotice"
              component={AllNotice}
              options={{
                title: 'Job Hunter',
                headerStyle: {
                  backgroundColor: '#6F2ED6',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="AllPreparetion"
              component={AllPreparetion}
              options={{
                title: 'Job Hunter',
                headerStyle: {
                  backgroundColor: '#6F2ED6',
                },
                headerTintColor: '#fff',
              }}
            />
            {/* details view page */}
            <Stack.Screen
              name="NoticeDetails"
              component={NoticeDetails}
              options={{
                title: 'Job Hunter',
                headerStyle: {
                  backgroundColor: '#6F2ED6',
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
                  backgroundColor: '#6F2ED6',
                },
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="PreparetionDetails"
              component={PreparetionDetails}
              options={{
                title: 'Job Hunter',
                headerStyle: {
                  backgroundColor: '#6F2ED6',
                },
                headerTintColor: '#fff',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}

      <FlashMessage position="top" />
    </>
  );
}

export default App;
