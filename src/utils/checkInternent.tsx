/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';
import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {colors} from '../theme/colors';

const {width, height} = Dimensions.get('window');

export default function Checkinternent({isConnected, setIsConnected}) {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [setIsConnected]);

  if (isConnected) {
    return null;
  }

  return (
    <View style={styles.checkInternent}>
      <View>
        <LottieView
          source={require('../../assets/images/internent.json')}
          style={{width: width, height: height / 2.5}}
          autoPlay
          loop
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: colors.darkGrey,
          padding: 10,
          borderRadius: 5,
          width: width / 2,
          alignSelf: 'center',
        }}
        onPress={() => {
          NetInfo.fetch().then(state => {
            console.log('Connection type', state.type);
            console.log('Is connected?', state.isConnected);
            if (state.isConnected === false) {
              showMessage({
                message: 'Internet connection still not available',
                type: 'default',
                backgroundColor: '#ff9800',
                color: '#fff',
                animated: true,
                icon: 'danger',
              });
            }
            setIsConnected(state.isConnected);
          });
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.white,
            fontSize: 20,
          }}>
          Check Again
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  checkInternent: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});
