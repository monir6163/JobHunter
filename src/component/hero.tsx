/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import Notice from './notice';

export default function Hero() {
  return (
    <>
      <View style={styles.heroConiter}>
        <View style={styles.imageContainer}>
          <View style={styles.imagelottie}>
            <LottieView
              source={require('../../assets/images/hero.json')}
              autoPlay
              style={styles.heroImage}
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.texthead}>
              সর্বদা সাথে থাকুন আপনার স্বপ্নের জব খুঁজুন
            </Text>
            <Text style={styles.subHead}>Job Hunter</Text>
          </View>
        </View>
        <Notice />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heroConiter: {
    backgroundColor: colors.purple,
  },
  imageContainer: {
    flexDirection: 'row',
  },
  imagelottie: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  heroImage: {
    width: 100,
    height: 100,
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  texthead: {
    color: colors.white,
    fontSize: 14,
    marginBottom: 5,
    fontFamily: 'Kalpurush',
  },
  subHead: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
