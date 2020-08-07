import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Colors } from '../../components/Resources/Colors';
import Faq from '../../components/Resources/Faq';
import Links from '../../components/HomeScreen/Links';
import About from '../../components/Resources/About';

function ResourcesPage({ navigation }) {
	return (
		<View>
			
			<View style={styles.box}>
				<Text style={styles.text}>FAQ</Text>
				<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color={Colors.DARKGRAY}
					onPress={() => navigation.navigate('FAQ')}
				/>
			</View>
			<View style={{ padding: 10 }} />
			<View style={styles.box}>
				<Text style={styles.text}>LINKS</Text>
				<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color={Colors.DARKGRAY}
					onPress={() => navigation.navigate('Links')}
				/>
			</View>
			<View style={{ padding: 10 }} />
			<View style={styles.box}>
				<Text style={styles.text}>ABOUT</Text>
				<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color={Colors.DARKGRAY}
					onPress={() => navigation.navigate('About')}
				/>
			</View>
		</View>
	);
}

function FaqPage() {
	return <Faq />;
}

function LinksPage() {
	return <Links />;
}

function AboutPage() {
	return <About />;
}

const Stack = createStackNavigator();

function Rai() {
	return (
		//<NavigationContainer>
		<Stack.Navigator>
			<Stack.Screen name="Resources" component={ResourcesPage} />
			<Stack.Screen name="FAQ" component={FaqPage} />
			<Stack.Screen name="Links" component={LinksPage} />
			<Stack.Screen name="About" component={AboutPage} />
		</Stack.Navigator>
		//	</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	box: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 58,
		paddingLeft: 22,
		paddingRight: 18,
		
		alignItems: 'center',
		backgroundColor: Colors.WHITE,
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	text: {
		fontWeight: 'bold',
		color: '#426FFE',
		fontSize: 16
	}
});

export default Rai;
