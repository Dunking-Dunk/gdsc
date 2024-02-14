import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { FontAwesome } from '@expo/vector-icons';

import HomeScreen from "./caregiver/Home";
import ProfileScreen from "./caregiver/Profile";

const Tab = createBottomTabNavigator();

const Main = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} >
        
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" size={size} color={color} />
          )}}/>
        <Tab.Screen name="Profile" component={ProfileScreen}
        options={{
            tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),}}
        />
      </Tab.Navigator>
    )
}

export default Main
