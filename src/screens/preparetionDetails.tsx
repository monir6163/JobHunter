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
import General from '../../assets/images/genarel.png';
import Source from '../../assets/images/source.png';
import BannerAds from '../component/admob/bannerAds';
import {colors} from '../theme/colors';

export default function PreparetionDetails({route}: any) {
  const {id, image} = route.params?.PreparetionDetails;
  const [preparetionDetails, setPreparetionDetails] = React.useState({} as any);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://jobhunter.btebresultsbd.com/preparetionDetails/${id}`,
        );
        const json = await response.json();
        setPreparetionDetails(json?.notice);
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

  function catName(catId: any) {
    if (catId === '1') {
      return <Text style={styles.circularCat}>বাংলা</Text>;
    } else if (catId === '2') {
      return <Text style={styles.circularCat}>ইংরেজি</Text>;
    } else if (catId === '3') {
      return <Text style={styles.circularCat}>গণিত</Text>;
    } else if (catId === '4') {
      return <Text style={styles.circularCat}>সাধারণ জ্ঞান</Text>;
    }
  }
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
    const image_URL = image;

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

  const postImage = image?.map(
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
              <Text style={styles.title}> {preparetionDetails?.title} </Text>
              <Text style={styles.source}>
                <Image source={Source} style={{width: 20, height: 20}} /> টপিক:{' '}
                {preparetionDetails?.source}
              </Text>
              <Text style={styles.subject}>
                <Image source={General} style={{width: 20, height: 20}} /> বিষয়:{' '}
                {catName(preparetionDetails?.catId)}
              </Text>
            </View>

            <View style={styles.detailsview}>
              <RenderHtml
                contentWidth={width}
                source={{html: preparetionDetails?.content}}
                baseStyle={{
                  fontSize: 16,
                  color: colors.white,
                  marginBottom: 10,
                  lineHeight: 35,
                }}
              />
              {postImage}
            </View>
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
  source: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
    fontFamily: 'kalpurush',
  },
  subject: {
    fontSize: 18,
    color: 'green',
    marginTop: 10,
    fontFamily: 'kalpurush',
  },
  detailsview: {
    padding: 10,
    marginTop: 10,
  },
  details: {
    fontSize: 16,
    color: colors.white,
    padding: 10,
    lineHeight: 35,
    fontFamily: 'kalpurush',
  },
  circularCat: {
    fontSize: 18,
    color: colors.green,
    fontFamily: 'kalpurush',
  },
});
