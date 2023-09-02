/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

interface HeaderProps {
  title?: string;
  backBtn?: boolean;
}
export default function Header({title = 'Job Hunter', backBtn}: HeaderProps) {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.container}>
        {backBtn && (
          <Pressable
            style={[
              backBtn && {
                marginRight: 10,
              },
            ]}
            onPress={() => {
              navigation.goBack();
            }}>
            <Text style={{color: '#fff'}}>Back</Text>
          </Pressable>
        )}
        <Text style={styles.header}>{title}</Text>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#435B66',
  },
  header: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});
