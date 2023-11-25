/* eslint-disable prettier/prettier */
import notifee, {AndroidImportance} from '@notifee/react-native';

export const displayNotification = async data => {
  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default2',
    name: 'Default Channel2',
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
