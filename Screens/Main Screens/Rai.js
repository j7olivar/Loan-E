import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../../components/Resources/Colors';

function ResourcesPage({ navigation }) {

	const onFooterLinkPress1 = () => {
        navigation.navigate('FAQ')
	}
	const onFooterLinkPress2 = () => {
        navigation.navigate('LINKS')
	}
	const onFooterLinkPress3 = () => {
        navigation.navigate('ABOUT')
	}

	return (
		<View style={{backgroundColor: 'white'}}>
			<Text style={styles.resourcesTitle}> 
				Resources
			</Text>

			<View style={styles.box}>
				<Text style={styles.text}>FAQ</Text>
				<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color={Colors.DARKGRAY}
					onPress={onFooterLinkPress1}
				/>
			</View>
			<View style={{ padding: 10 }} />
			<View style={styles.box}>
				<Text style={styles.text}>LINKS</Text>
				<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color={Colors.DARKGRAY}
					onPress={onFooterLinkPress2}
				/>
			</View>
			<View style={{ padding: 10 }} />
			<View style={styles.box}>
				<Text style={styles.text}>ABOUT</Text>
				<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color={Colors.DARKGRAY}
					onPress={onFooterLinkPress3}
				/>
			</View>
		</View>
	);
}



const styles = StyleSheet.create({
	box: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 58,
		paddingLeft: 24.5,
		paddingRight: 18,
		borderRadius: 9,
		alignItems: 'center',
		backgroundColor: Colors.WHITE,
		shadowColor: "#000",
		shadowOffset: {
		  width: 1,
		  height: 7
		},
		shadowOpacity: 0.13,
		shadowRadius: 6,
	},
	text: {
		fontWeight: 'bold',
		color: '#426FFE',
		fontSize: 16
	},
	resourcesTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        paddingLeft: 23,
        paddingTop: 34,
		color: '#426FFE',
		padding: 20
	  },

});

export default ResourcesPage;
