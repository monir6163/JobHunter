/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {AdEventType, InterstitialAd} from 'react-native-google-mobile-ads';
import {colors} from '../theme/colors';
import adsDataFetch from '../utils/admob';
import {NoticeDATA} from '../utils/cateList';

type item = {
  id: string;
  name: string;
  image: any;
};

let noticecolumns = 3;

export default function Notice() {
  const navigation = useNavigation() as any;
  const [loaded, setLoaded] = useState(false);
  const [interstitialAd, setInterstitialAd] = useState(null as any);

  useEffect(() => {
    // Function to fetch ad unit ID from the API
    async function fetchAdUnitId() {
      try {
        const adUnitId = await adsDataFetch();

        // Create the interstitial ad with the fetched ad unit ID
        const ad = InterstitialAd.createForAdRequest(
          adUnitId.ads[0].interstail,
          {
            requestNonPersonalizedAdsOnly: true,
            keywords: ['fashion', 'clothing'],
          },
        );

        // Listen for the LOADED event
        const unsubscribeLoaded = ad.addAdEventListener(
          AdEventType.LOADED,
          () => {
            setLoaded(true);
          },
        );

        // Listen for the CLOSED event and reset the loaded state
        const unsubscribeClosed = ad.addAdEventListener(
          AdEventType.CLOSED,
          () => {
            setLoaded(false);
            // Preload next interstitial
            ad.load();
          },
        );

        // Start loading the interstitial straight away
        if (adUnitId.ads[0].intersActive === '1') {
          ad.load();
        }

        setInterstitialAd(ad);

        // Unsubscribe from events on unmount
        return () => {
          unsubscribeLoaded();
          unsubscribeClosed();
        };
      } catch (error) {
        showMessage({
          message: 'Internet connection error',
          type: 'default',
          backgroundColor: '#ff9800',
          color: '#fff',
          icon: 'danger',
          autoHide: true,
        });
      }
    }
    // Fetch ad unit ID and create the interstitial ad
    fetchAdUnitId();
  }, []);

  // Function to handle item press
  const handleItemPress = async (item: item) => {
    if (loaded && interstitialAd) {
      try {
        await interstitialAd.show();
        // After the ad is shown, navigate to the next screen
        navigation.navigate('AllNotice', {
          id: item.id,
        });
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
    } else {
      // If the ad is not loaded yet, you can choose to navigate directly
      // to the next screen without showing the ad
      navigation.navigate('AllNotice', {
        id: item.id,
      });
    }
  };
  return (
    <View style={styles.noticemain}>
      <FlatList
        data={NoticeDATA}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.noticeitem}
              key={item.id}
              onPress={() => {
                handleItemPress(item);
              }}>
              <Image
                source={item.image}
                style={styles.noticeImage}
                resizeMode="cover"
              />
              <Text style={styles.noticetitle}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        numColumns={noticecolumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  noticemain: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginTop: 10,
    borderRadius: 8,
  },
  noticeitem: {
    flex: 1,
    margin: 5,
    paddingVertical: 8,
  },
  noticeImage: {
    width: 30,
    height: 30,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignSelf: 'center',
  },
  noticetitle: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
    textAlign: 'center',
    fontFamily: 'kalpurush',
  },
});
