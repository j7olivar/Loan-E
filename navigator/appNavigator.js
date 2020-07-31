import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../Screens/FavoriteMealScreen';
import CategoryMealsScreen from '../Screens/CategoryMealsScreen';
import MealDetailScreen from '../Screens/MealDetailScreen';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../Screens/HomeScreen';
import Rai from '../Screens/Rai';

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import FavoriteMealScreen from '../Screens/FavoriteMealScreen';
import FilterScreen from '../Screens/FilterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Stacker = (props) => {
	return (
		<Tab.Navigator>
			<Tab.Screen name="Loan Calculator" {...props} component={() => <HomeScreen {...props} />} />
			<Tab.Screen name="Resources" {...props} component={() => <Rai {...props} />} />
			<Tab.Screen name="SECRET DONT LOOK" {...props} component={() => <FavoriteMealScreen {...props} />} />
		</Tab.Navigator>
	);
};

export default Stacker;
