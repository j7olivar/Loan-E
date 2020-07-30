import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import Rai from '../screens/Rai';

import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import FavoriteMealScreen from '../screens/FavoriteMealScreen';
import FilterScreen from '../screens/FilterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function Stacker() {
	return (
		<NavigationContainer>
			<Tab.Navigator>
				<Tab.Screen name="Loan Calculator" component={HomeScreen} />
				<Tab.Screen name="Resources" component={Rai} />
				<Tab.Screen name="SECRET DONT LOOK" component={FavoriteMealScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default Stacker;
