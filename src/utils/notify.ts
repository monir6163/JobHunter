/* eslint-disable prettier/prettier */
import notifee, {AndroidImportance} from '@notifee/react-native';
import {Platform} from 'react-native';

export const displayNotification = async data => {
  // Request permissions (required for iOS)
  if (Platform.OS === 'ios') {
    await notifee.requestPermission();
  }

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default1',
    name: 'Default Channel1',
    sound: 'default',
    vibration: true,
    vibrationPattern: [300, 500],
    importance: AndroidImportance.HIGH,
  });

  // Display a notification
  await notifee.displayNotification({
    title: data.notification.title,
    body: data.notification.body,
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon',
      pressAction: {
        id: 'default',
      },
    },
  });
};
