/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable prettier/prettier */
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Info from './src/component/info';
import Rate from './src/component/rate';
import Home from './src/screens/home';

const Tab = createBottomTabNavigator();

const BottomTabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#6F2ED6',
        tabBarInactiveTintColor: '#435B66',
      }}>
      <Tab.Screen
        name="Home2"
        component={Home}
        options={{
          tabBarLabel: 'হোম',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'Kalpurush',
          },
        }}
      />
      <Tab.Screen
        name="Rate"
        component={Rate}
        options={{
          tabBarLabel: 'রেটিং',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={focused ? 'star' : 'star-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'Kalpurush',
          },
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: 'তথ্য',
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name={
                focused ? 'information-circle' : 'information-circle-outline'
              }
              color={color}
              size={size}
            />
          ),
          tabBarLabelStyle: {
            fontSize: 16,
            fontFamily: 'Kalpurush',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNav;
