/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '../theme/colors';

export default function Feature() {
  return (
    <>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>
          সকল সরকারি ও বেসরকারি চাকরির বিজ্ঞপ্তি।
        </Text>
      </View>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>চাকরির প্রস্তুতির বিষয় ভিত্তিক পাঠ।</Text>
      </View>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>সকল চাকরির আপডেট নোটিফিকেশন।</Text>
      </View>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>সাপ্তাহিক চাকরির বিজ্ঞপ্তি।</Text>
      </View>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>
          চাকরির পরীক্ষার জন্য গুরুত্বপূর্ণ প্রশ্ন ও উত্তর।
        </Text>
      </View>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>চাকরির পরীক্ষার নোটিফিকেশন।</Text>
      </View>
      <View style={styles.flexBox}>
        <Ionicons name="checkmark" size={20} color={colors.purple} />
        <Text style={styles.boxtext}>চাকরির পরীক্ষার ফলাফল নোটিফিকেশন।</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  flexBox: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  boxtext: {
    fontSize: 16,
    color: colors.purple,
    fontFamily: 'Kalpurush',
  },
});
