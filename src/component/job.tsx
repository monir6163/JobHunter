/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors} from '../theme/colors';

type JobItem = {
  id: string;
  name: string;
  image: any;
};

let numColumns = 2;

export default function Job() {
  const navigation = useNavigation();
  const [catData, setCatData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        'https://jobhunter.btebresultsbd.com/category/getAllCategories',
      );
      const json = await response.json();
      setCatData(json?.categories);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <View style={styles.mainview}>
      <Text style={styles.catHeading}>চাকরির বিজ্ঞপ্তি</Text>
      {loading && (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      <FlatList
        data={catData as JobItem[]}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.item}
              key={item.id}
              onPress={() => {
                navigation.navigate('Details', {
                  id: item.id,
                });
              }}>
              <View style={styles.itemContent}>
                <Image
                  source={{uri: item.image}}
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
    backgroundColor: '#8ED6FF',
    marginHorizontal: 8,
    marginTop: 20,
    paddingBottom: 10,
    borderRadius: 8,
  },
  catHeading: {
    color: colors.dark,
    fontSize: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.grey,
    marginBottom: 10,
    fontFamily: 'kalpurush',
  },

  item: {
    flex: 1,
    margin: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#435B66',
  },
  itemContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  catImage: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: colors.white,
    alignItems: 'center',
    fontFamily: 'kalpurush',
  },
});
