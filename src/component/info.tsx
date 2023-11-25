/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import LottieView from 'lottie-react-native';
import React from 'react';
import {Dimensions, ScrollView, StyleSheet, Text, View} from 'react-native';
import {colors} from '../theme/colors';
import Feature from './feature';

const {width} = Dimensions.get('window');

export default function Info() {
  return (
    <ScrollView>
      <View style={styles.infomain}>
        <View>
          <Text style={styles.appname}>Job Hunter</Text>
          <LottieView
            source={require('../../assets/images/info.json')}
            autoPlay
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: colors.purple,
            fontWeight: 'bold',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.purple,
            paddingBottom: 10,
          }}>
          আমাদের অ্যাপের বৈশিষ্ট্যসমূহ :
        </Text>
        <View style={styles.featurebox}>
          <Feature />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  infomain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  appname: {
    fontSize: 20,
    color: colors.purple,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  featurebox: {
    width: width - 20,
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.purple,
    padding: 10,
    marginTop: 10,
  },
});
