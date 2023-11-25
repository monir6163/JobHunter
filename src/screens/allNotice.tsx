/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Notice from '../../assets/images/notice.png';
import {NoticeType} from '../../type';
import BannerAds from '../component/admob/bannerAds';
import {colors} from '../theme/colors';

export default function AllNotice({route}: any) {
  const {id} = route.params;
  const [notice, setNotice] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const navigation = useNavigation() as any;
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `https://jobhunter.btebresultsbd.com/getallNotice/${id}`,
      );
      const json = await response.json();
      setNotice(json?.notices);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  function catName(catId: any) {
    if (catId === '1') {
      return <Text style={styles.circularCat}>নোটিশ</Text>;
    } else if (catId === '2') {
      return <Text style={styles.circularCat}>ফলাফল</Text>;
    } else if (catId === '3') {
      return <Text style={styles.circularCat}>প্রশ্ন ও উত্তর</Text>;
    }
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchData() {
      const response = await fetch(
        `https://jobhunter.btebresultsbd.com/getallNotice/${id}`,
      );
      const json = await response.json();
      setNotice(json?.notices);
      setLoading(false);
    }
    fetchData();
    setRefreshing(false);
  }, [id]);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={[colors.purple, colors.lightGreen, colors.green]}
            />
          }
          data={notice as NoticeType[]}
          renderItem={({item}) => {
            return (
              <>
                <TouchableOpacity
                  style={styles.notes}
                  onPress={() => {
                    navigation.navigate('NoticeDetails', {
                      NoticeDetails: item,
                    });
                  }}>
                  <View style={styles.rowContainer}>
                    <View style={styles.imageContainer}>
                      <Image
                        source={Notice}
                        resizeMode="contain"
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{item.title}</Text>
                      {catName(item.catId)}
                      <Text
                        style={{
                          color: colors.green,
                          fontFamily: 'kalpurush',
                        }}>
                        মোট ভিউ : {item.viewCount}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            );
          }}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.contentContainerStyle}
        />
      )}
      <BannerAds />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dark,
  },
  contentContainerStyle: {
    paddingBottom: 10,
  },
  notes: {
    flex: 1,
    paddingVertical: 15,
    backgroundColor: '#435B66',
    marginTop: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
    color: '#fff',
    paddingBottom: 5,
    fontFamily: 'kalpurush',
  },
  circularCat: {
    fontSize: 12,
    color: '#ddfe34',
    fontFamily: 'kalpurush',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
    marginRight: 2,
  },
});
