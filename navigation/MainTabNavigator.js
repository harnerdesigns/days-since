import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import AddItemScreen from '../screens/AddItemScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

HomeStack.navigationOptions = {
    tabBarLabel: 'Days Since',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-clock`
          : 'md-clock'
      }
    />
    ),
};


const AddItemStack = createStackNavigator({
    AddItem: AddItemScreen,
});

AddItemStack.navigationOptions = {
    tabBarLabel: 'Add Item',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-add`
          : 'md-add'
      }
    />
    ),
};


const SettingsStack = createStackNavigator({
    Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
    tabBarLabel: 'Settings',
    tabBarIcon: ({ focused }) => (
        <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
    ),
};

export default createBottomTabNavigator({
    HomeStack,
    AddItemStack,
    SettingsStack,
});