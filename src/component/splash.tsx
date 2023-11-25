/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */

import LottieView from 'lottie-react-native';
import React, {useState} from 'react';
import {View} from 'react-native'; // Import View from react-native

import App from '../../App';

export default function Splash() {
  const [animationFinished, setAnimationFinished] = useState(false);
  const onAnimationFinish = () => {
    setAnimationFinished(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: '#6F2ED6'}}>
      {animationFinished ? (
        <App />
      ) : (
        <LottieView
          source={require('../../assets/images/splash.json')}
          autoPlay
          loop={false}
          speed={0.5}
          onAnimationFinish={onAnimationFinish}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </View>
  );
}
