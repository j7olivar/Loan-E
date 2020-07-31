import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';

const FavoriteMealScreen = (props) => {
	return (
		<View style={styles.screen}>
			<Header title="Student Loan Calculator" />
			<View style={styles.screen}>
				<Text>THIS ISNT DEVELOPED YET, USE YOUR IMAGINATION!</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default FavoriteMealScreen;
