import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CategoriesScreen from '../Screens/Main Screens/FavoriteMealScreen';
import CategoryMealsScreen from '../Screens/Old/CategoryMealsScreen';
import MealDetailScreen from '../Screens/Old/MealDetailScreen';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../Screens/Main Screens/HomeScreen';
import Rai from '../Screens/Main Screens/Rai';
import Pei from '../Screens/Main Screens/Pei';


import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import FavoriteMealScreen from '../Screens/Main Screens/FavoriteMealScreen';
import FilterScreen from '../Screens/Old/FilterScreen';
import {Ionicons} from '@expo/vector-icons'
import BudgetScreen from '../Screens/BudgetScreens/Budget';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Stacker = (props) => {
	return (
		<Tab.Navigator
			tabBarOptions={{
				activeTintColor:'#086620'
			}}
		>
			<Tab.Screen 
				name="Loans" 
				component={() => <HomeScreen {...props} />} 
				options={{tabBarIcon: (props)=> <Ionicons name = 'ios-calculator' size={props.size} color = {props.color}/>}}/>
			<Tab.Screen 
				name="Budgeting" 
				component={() => <BudgetScreen {...props} />} 
				options={{tabBarIcon: (props)=> <Ionicons name = 'ios-egg' size={props.size} color = {props.color}/>}}/>
			<Tab.Screen 
				name="Resources" 
				component={() => <Rai {...props} />} 
				options={{tabBarIcon: (props)=> <Ionicons name = 'ios-information-circle-outline' size={props.size} color = {props.color}/>}}/>
		
			<Tab.Screen 
				name="Profile" 
				component={() => <Pei {...props} />} 
				options={{tabBarIcon: (props)=> <Ionicons name = 'ios-contact' size={props.size} color = {props.color}/>}}/>
		</Tab.Navigator>
	);
};

export default Stacker;
