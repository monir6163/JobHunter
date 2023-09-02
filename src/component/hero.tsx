/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Search from '../../assets/images/search.gif';
import {colors} from '../theme/colors';
import Notice from './notice';

export default function Hero() {
  return (
    <>
      <View style={styles.heroConiter}>
        <View style={styles.hero}>
          <Image source={Search} style={styles.heroImage} />
          <Text style={styles.texthead}>
            Stay Always And Find Your Dream Job
          </Text>
        </View>
        <Text style={styles.subHead}>Job Hunter App</Text>
        <Notice />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  heroConiter: {
    backgroundColor: colors.purple,
  },
  hero: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 10,
  },

  heroImage: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  texthead: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  subHead: {
    color: colors.white,
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'right',
    paddingHorizontal: 10,
    marginTop: -20,
  },
});
