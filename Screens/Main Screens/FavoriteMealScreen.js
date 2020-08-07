import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import { Dimensions } from 'react-native';
import {
	LineChart,
	BarChart,
	PieChart,
	ProgressChart,
	ContributionGraph,
	StackedBarChart
} from 'react-native-chart-kit';
import Slider from '@react-native-community/slider';

const FavoriteMealScreen = (props) => {
	const [ sliderValue, setSliderValue ] = useState(10);
	const [ currentDebt, setCurrentDept ] = useState(100000);
	const [ list, setList ] = useState([ 100000, 90000, 70000, 50000, 30000, 0]);

	return (
		<View style={styles.screen}>
			<View >
				<Text style={{
		fontWeight: 'bold',
		fontSize: 20,
		color: '#32c090',
		textAlign: 'center',
		paddingTop: 20
	}}> You currently owe {currentDebt}. In how many years would you want to pay it off?</Text>
				<Slider
					style={{ width: 200, height: 40, justifyContent:'center'}}
					minimumValue={1}
					maximumValue={30}
					step={1}
					minimumTrackTintColor="#FFFFFF"
					maximumTrackTintColor="#000000"
					onValueChange={(value) => setSliderValue(value)}
				/>

				<Text style={{textAlign:'center'}}> Years = {sliderValue}</Text>
				<LineChart
					data={{
						labels: [ '1', '5', '10', '15', '20', '25' ],
						datasets: [
							{
								data: list,
								strokeWidth: 2
							}
						]
					}}
					width={Dimensions.get('window').width - 16}
					height={220}
					chartConfig={{
						backgroundColor: '#1cc910',
						backgroundGradientFrom: '#eff3ff',
						backgroundGradientTo: '#efefef',
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						style: {
              borderRadius: 16,
              justifyContent:'center'
						}
					}}
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
  },
text:{
  textAlign:'center'
},
});

export default FavoriteMealScreen;

//<Header title="Student Loan Calculator" />