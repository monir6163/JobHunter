/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import ImageZoom from 'react-native-image-pan-zoom';
import RenderHtml from 'react-native-render-html';
import RNFetchBlob from 'rn-fetch-blob';
import Clock from '../../assets/images/clock.png';
import Location from '../../assets/images/location.gif';
import Source from '../../assets/images/source.png';
import BannerAds from '../component/admob/bannerAds';
import {colors} from '../theme/colors';
export default function JobView({route}: any) {
  const {id, imageUrl} = route.params?.jobDetails;
  const [jobDetails, setJobDetails] = React.useState({} as any);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jobhunter.btebresultsbd.com/postdetails/${id}`,
        );
        const json = await response.json();
        setJobDetails(json?.post);
        setLoading(false);
      } catch (error) {
        showMessage({
          message: 'ডাটা লোড করা যাচ্ছে না | দয়া করে আবার চেষ্টা করুন',
          type: 'danger',
          animated: true,
          autoHide: true,
          duration: 3000,
        });
      }
    }
    fetchData();
  }, [id]);

  const {width, height} = Dimensions.get('window');
  //image download
  const checkPermission = async (index: any) => {
    if (Platform.OS === 'android') {
      downloadImage(index);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          } as any,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Once user grant the permission start downloading
          console.log('Storage Permission Granted.');
          downloadImage(index);
        } else {
          // If permission denied then show alert
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const downloadImage = (index: number) => {
    const date = new Date();
    const image_URL = imageUrl;

    if (index < 0 || index >= image_URL.length) {
      // Invalid index, do nothing
      return;
    }

    const item = image_URL[index];
    let ext = getExtention(item) as any;
    ext = '.' + ext[0];
    const {config, fs} = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/image_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          ext,
        description: 'Image',
      },
    };

    config(options)
      .fetch('GET', item)
      .then(res => {
        showMessage({
          message: 'ছবি ডাউনলোড হয়েছে',
          type: 'success',
          animated: true,
          autoHide: true,
          duration: 3000,
        });
      })
      .catch(error => {
        showMessage({
          message: 'ডাউনলোড করা যাচ্ছে না',
          type: 'danger',
          animated: true,
          autoHide: true,
          duration: 3000,
        });
      });
  };

  const getExtention = (filename: any) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  //image download end

  const postImage = imageUrl?.map(
    (item: string | string[], index: React.Key | null | undefined) => {
      // check if the image is an extension of an image (png, jpg, jpeg)
      if (
        item.includes('.png') ||
        item.includes('.jpg') ||
        item.includes('.jpeg')
      ) {
        return (
          <View key={index}>
            <ImageZoom
              cropWidth={width}
              cropHeight={height}
              imageWidth={width}
              imageHeight={height}
              style={{marginBottom: 10}}
              useNativeDriver={true}
              useHardwareTextureAndroid={true}>
              <Image
                style={{width: width, height: height, resizeMode: 'stretch'}}
                source={{
                  uri: item as string,
                }}
              />
            </ImageZoom>
            <TouchableOpacity style={{alignItems: 'center', marginBottom: 10}}>
              <Button
                title="ডাউনলোড করুন"
                color={colors.blue}
                onPress={() => checkPermission(index)}
              />
            </TouchableOpacity>
          </View>
        );
      }
      return null;
    },
  );

  return (
    <>
      <BannerAds />
      <ScrollView style={styles.mainContainer}>
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              alignContent: 'center',
              marginTop: 300,
            }}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          <>
            <View style={styles.mainBox}>
              <Text style={styles.title}>{jobDetails?.title}</Text>
              <View style={styles.inlineContainer}>
                <View style={styles.inlineItem}>
                  <Image source={Location} style={styles.icon} />
                  <Text style={styles.address}>
                    ঠিকানা: {jobDetails?.address}
                  </Text>
                </View>
                <View style={styles.inlineItem}>
                  <Image source={Source} style={styles.icon} />
                  <Text style={styles.tag}>সূত্র: {jobDetails?.tags}</Text>
                </View>
                <View style={styles.inlineItem}>
                  <Image source={Clock} style={styles.icon} />
                  <Text style={styles.enddate}>
                    আবেদনের শেষ তারিখ: {jobDetails?.endDate}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.detailsview}>
              <RenderHtml
                contentWidth={width}
                source={{html: jobDetails?.content}}
                baseStyle={{
                  fontSize: 16,
                  color: colors.white,
                  paddingBottom: 10,
                  lineHeight: 35,
                }}
              />
            </View>
            {postImage}
          </>
        )}
      </ScrollView>
      <BannerAds />
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  mainBox: {
    backgroundColor: colors.white,
    padding: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    color: colors.blue,
    marginTop: 10,
    fontFamily: 'kalpurush',
  },
  address: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
    fontFamily: 'kalpurush',
  },
  tag: {
    fontSize: 16,
    color: colors.purple,
    marginBottom: 10,
    fontFamily: 'kalpurush',
  },
  enddate: {
    fontSize: 16,
    color: colors.blue,
    marginBottom: 10,
    fontFamily: 'kalpurush',
  },
  detailsview: {
    paddingHorizontal: 10,
    marginTop: 10,
  },

  inlineContainer: {
    marginTop: 20,
  },
  inlineItem: {
    flexDirection: 'row',
    marginRight: 20,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
});
