/* eslint-disable prettier/prettier */

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
import {JobDATA} from '../utils/cateList';

type JobItem = {
  id: string;
  name: string;
  image: any;
};

let numColumns = 2;

export default function Job() {
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
  const handleItemPress = async (item: JobItem) => {
    if (loaded && interstitialAd) {
      try {
        await interstitialAd.show();
        // After the ad is shown, navigate to the next screen
        navigation.navigate('Details', {
          id: item.id,
        });
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
    } else {
      // If the ad is not loaded yet, you can choose to navigate directly
      // to the next screen without showing the ad
      navigation.navigate('Details', {
        id: item.id,
      });
    }
  };

  return (
    <View style={[styles.mainview, styles.shadowProp]}>
      <Text style={styles.catHeading}>চাকরির বিজ্ঞপ্তি</Text>
      <FlatList
        data={JobDATA as JobItem[]}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleItemPress(item)}>
              <View style={styles.itemContent}>
                <Image
                  source={item.image}
                  style={styles.catImage}
                  resizeMode="cover"
                />
                <Text style={styles.title}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id}
        numColumns={numColumns}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainview: {
    backgroundColor: colors.white,
    marginHorizontal: 8,
    marginTop: 20,
    paddingBottom: 10,
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  catHeading: {
    color: colors.dark,
    fontSize: 20,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'kalpurush',
  },

  item: {
    flex: 1,
    margin: 4,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
  },
  catImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: colors.dark,
    alignItems: 'center',
    fontFamily: 'kalpurush',
  },
});
