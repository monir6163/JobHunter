/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import LottieView from 'lottie-react-native';
import React from 'react';
import {
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width, height} = Dimensions.get('window');
export default function Rate() {
  return (
    <ScrollView>
      <View style={styles.ratemain}>
        <View style={styles.box}>
          <Image
            source={require('../../assets/images/potrika.png')}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 20,
            }}
          />
          <Text style={styles.reviewText}>
            আমাদের অ্যাপটি যদি আপনাদের ভালো লাগে ও উপকারে আসে তাহলে আমাদের
            অ্যাপটিতে রেটিং দিতে ভুলবেন না।
          </Text>
        </View>
        <LottieView
          source={require('../../assets/images/review.json')}
          style={{width: width, height: height / 2.5, alignSelf: 'center'}}
          autoPlay
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL(
              'https://play.google.com/store/apps/details?id=com.jobhunterbd',
            );
          }}>
          <Text style={styles.text}> রেটিং দিন </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ratemain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: width - 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reviewText: {
    fontSize: 20,
    fontFamily: 'Kalpurush',
    textAlign: 'center',
    color: '#435B66',
    borderColor: '#435B66',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    width: width / 1.5,
    padding: 10,
    marginHorizontal: 20,
    backgroundColor: '#6F2ED6',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontFamily: 'Kalpurush',
    color: '#fff',
  },
});
