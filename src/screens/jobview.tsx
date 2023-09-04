/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
import RNFetchBlob from 'rn-fetch-blob';
import Clock from '../../assets/images/clock.png';
import Location from '../../assets/images/location.gif';
import Source from '../../assets/images/source.png';
import {colors} from '../theme/colors';

export default function JobView({route}: any) {
  const {id, imageUrl} = route.params?.jobDetails;
  const [jobDetails, setJobDetails] = React.useState({} as any);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://jobhunter.btebresultsbd.com/postdetails/${id}`,
      );
      const json = await response.json();
      setJobDetails(json?.post);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  const {width} = useWindowDimensions();
  //image download
  const checkPermission = async index => {
    if (Platform.OS === 'android') {
      downloadImage(index);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message: 'App needs access to your storage to download Photos',
          },
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
  const downloadImage = index => {
    const date = new Date();
    const image_URL = imageUrl;

    if (index < 0 || index >= image_URL.length) {
      // Invalid index, do nothing
      return;
    }

    const item = image_URL[index];
    let ext = getExtention(item);
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
        Alert.alert('Image Downloaded Successfully.');
      })
      .catch(error => {
        Alert.alert('Error downloading image.');
      });
  };

  const getExtention = (filename: any) => {
    // To get the file extension
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };
  //image download end

  const postImage = imageUrl?.map((item, index) => {
    return (
      <View key={item}>
        <Image source={{uri: item}} style={styles.imageStyle} />
        <TouchableOpacity
          style={{alignItems: 'center', marginBottom: 10}}
          // Pass the index when the button is pressed
        >
          <Button
            title="ছবি ডাউনলোড করুন"
            color={colors.blue}
            onPress={() => checkPermission(index)}
          />
        </TouchableOpacity>
      </View>
    );
  });

  return (
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
            <Text style={styles.title}> {jobDetails?.title} </Text>
            <View
              style={{
                marginTop: 30,
              }}>
              <Text style={styles.address}>
                <Image source={Location} style={{width: 20, height: 20}} />{' '}
                ঠিকানা: {jobDetails?.address}
              </Text>
              <Text style={styles.tag}>
                <Image source={Source} style={{width: 20, height: 20}} /> সূত্র:{' '}
                {jobDetails?.tags}{' '}
              </Text>
              <Text style={styles.enddate}>
                <Image source={Clock} style={{width: 20, height: 20}} /> আবেদনের
                শেষ তারিখ: {jobDetails?.endDate}{' '}
              </Text>
            </View>
          </View>

          <View style={styles.detailsview}>
            <RenderHtml
              contentWidth={width}
              source={{html: jobDetails?.content}}
              baseStyle={{
                fontSize: 16,
                color: colors.white,
                marginBottom: 10,
                lineHeight: 35,
                textAlign: 'justify',
              }}
            />
            {postImage}
          </View>
        </>
      )}
    </ScrollView>
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
    fontSize: 18,
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
  imageStyle: {
    width: '100%',
    height: 400,
    resizeMode: 'stretch',
    marginBottom: 10,
  },
});
