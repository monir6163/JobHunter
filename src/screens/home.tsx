/* eslint-disable prettier/prettier */

/* eslint-disable prettier/prettier */
import React from 'react';
import {SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-virtualized-view';
import Hero from '../component/hero';
import Job from '../component/job';
import Study from '../component/study';

export default function Home() {
  return (
    <SafeAreaView>
      <ScrollView>
        <Hero />
        <Job />
        <Study />
      </ScrollView>
    </SafeAreaView>
  );
}
