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
import {colors} from '../theme/colors';
import {NoticeDATA} from '../utils/cateList';

let noticecolumns = 3;

export default function Notice() {
  const navigation = useNavigation();
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
                navigation.navigate('Details', {
                  item,
                });
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
    marginTop: 30,
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
