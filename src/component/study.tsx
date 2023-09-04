/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type JobPreparationItem = {
  id: string;
  name: string;
  image: any;
};

import {colors} from '../theme/colors';
import {jobPreparetion} from '../utils/cateList';

let numColumns = 2;

export default function Study() {
  const navigation = useNavigation();
  return (
    <View style={styles.mainview}>
      <Text style={styles.catHeading}>চাকরির প্রস্তুতি</Text>
      <FlatList
        data={jobPreparetion as JobPreparationItem[]}
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
    backgroundColor: '#8ED6FF',
    marginHorizontal: 8,
    marginTop: 20,
    paddingBottom: 10,
    borderRadius: 8,
    marginBottom: 20,
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
