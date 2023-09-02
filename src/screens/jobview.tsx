/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import RenderHtml from 'react-native-render-html';
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
  const postImage = imageUrl?.map((item: any) => {
    return <Image key={item} source={{uri: item}} style={styles.imageStyle} />;
  });
  const {width} = useWindowDimensions();
  return (
    <ScrollView style={styles.mainContainer}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
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
    fontWeight: 'bold',
    color: colors.blue,
    marginTop: 10,
  },
  address: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
  tag: {
    fontSize: 16,
    color: colors.purple,
    marginBottom: 10,
  },
  enddate: {
    fontSize: 16,
    color: colors.blue,
    marginBottom: 10,
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
  },
  imageStyle: {
    width: '100%',
    height: 400,
    resizeMode: 'stretch',
    marginBottom: 10,
  },
});
