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
	const [ list, setList ] = useState([ 300, 500, 300, 30, 200, 70 ]);
	const [interest, setInterest] = useState(500);


	const changeGraph = (value) => {
		const total = currentDebt;
		setSliderValue(value);
		if(value%5==0){
		setList([interest *Math.random(), interest/1.5*Math.random(),interest/2*Math.random(), interest/3*Math.random(),interest/4*Math.random(),interest/10*Math.random()])
		}
		
		setInterest(value*60)
	};

	return (
		<View style={styles.screen}>
			<View>
				{/*}
				<Text style={{
					//fontWeight: 'bold',
					fontSize: 16,
					color: 'black',
					textAlign: 'left',
					paddingTop: 20,
					marginLeft: 18,
					marginBottom: 10
				}}>You currently owe {currentDebt}. In how many years would you want to pay it off?</Text>
			*/}
				<Slider
					style={{ width: 200, height: 40, justifyContent:'center', marginLeft: 18, marginTop:5}}
					minimumValue={1}
					maximumValue={30}
					step={1}
					minimumTrackTintColor="#000000"
					maximumTrackTintColor="#000000"
					onValueChange={(value) => changeGraph(value)}
				/>
				<View style={styles.mid}>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Years = {sliderValue}</Text>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Interest = ${interest}</Text>
				</View>
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
					width={Dimensions.get('window').width - 20}
					height={220}
					chartConfig={{
						//backgroundColor: '#1cc910',
						backgroundGradientFrom: 'white',
						backgroundGradientTo: 'white',
						decimalPlaces: 2,
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						style: {
							borderRadius: 16,
							justifyContent: 'center'
						}
					}}
					style={{
						marginVertical: 8,
						marginLeft:18,
						marginTop:20,
					
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
	mid:{
		flex:1,
		flexDirection: "row"
	},
	text: {
		textAlign: 'center'
	}
});

export default FavoriteMealScreen;

//<Header title="Student Loan Calculator" />
