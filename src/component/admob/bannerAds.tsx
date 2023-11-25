/* eslint-disable prettier/prettier */
import React from 'react';
import {View} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import adsDataFetch from '../../utils/admob';

export default function BannerAds() {
  const [liveBannerAds, setLiveBannerAds] = React.useState('' as any);
  const [status, setStatus] = React.useState('' as any);
  async function fetchDataAndLog() {
    try {
      const {ads} = await adsDataFetch();
      if (ads[0].banner) {
        setLiveBannerAds(ads[0].banner);
        setStatus(ads[0].bannerActive);
      }
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
  fetchDataAndLog();

  return (
    <View>
      {status === '1' && (
        <BannerAd
          unitId={liveBannerAds}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
        />
      )}
    </View>
  );
}
