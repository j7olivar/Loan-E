import React, { useState } from 'react';
import { StyleSheet, Text, View , TextInput} from 'react-native';
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
import { firebase } from '../../Constants/ApiKeys';

const FavoriteMealScreen = (props) => {
	const [ sliderValue, setSliderValue ] = useState(10);
	var currentDebt=0; //cant use useState b/c it doesnt update imediately
	const [ list, setList ] = useState([ 300, 500, 300, 30, 200, 70 ]);
	const [interest, setInterest] = useState(500);

	const [monthlyValue, setMonthlyValue] = useState(100)
	const [currentLoans, setCurrentLoans] = useState({
		'loan1': [1000,10],
		'loan2': [3000,5],
		'loan3': [500,15]
	}) //loan amnt and interest rate

	//Stolen sort dictionary function hope it works
	const sort_object = (obj) => {
		items = Object.keys(obj).map(function(key) {
			return [key, obj[key]];
		});
		items.sort(function(first, second) {
			return second[1][1] - first[1][1];
		});
		sorted_obj={}
		$.each(items, function(k, v) {
			use_key = v[0]
			use_value = v[1]
			sorted_obj[use_key] = use_value
		})
		return(sorted_obj)
	} 

	
	const [interestRate, setInterestRate] = useState('1')
	const [labels, setLabels] = useState([])

	//import total from firebase
	const getTotal = async()=>{
		var total=0;
		let user = firebase.auth().currentUser.uid
		var loansWithInt = []
		try{
			const loans = await firebase.firestore().collection('goals').doc(user).get()
			const goals = loans.data().goals
			
			//time to add up all loans
			for (let i = 0; i < goals.length; i++) {
				//console.log(goals[i].value)
				total += (goals[i].value*1)
				loansWithInt.push({[i]:[goals[i].value*1,goals[i].interest*1]})
			}
			//console.log(loansWithInt)
			setCurrentLoans(loansWithInt)
			return total
			
		}
		catch(error){
			console.log(error)
		}
	}

	const changeGraph = async (value) => {
		setSliderValue(value);

		//get total amount due
		currentDebt = await getTotal()
		
		//finding x-axis intervals
		var oneStep = value/6
		if(value >=6){
			setLabels([oneStep.toFixed(0), (oneStep*2).toFixed(0), (oneStep*3).toFixed(0), (oneStep*4).toFixed(0), (oneStep*5).toFixed(0), value.toFixed(0)])
		}
		else{
			//im not sure what to do for years less than 6 since we are using 6 dots on the graph
			setLabels([1,2,3,4,5])
		}

		//finding y-axis intervals (tbh idk what the List is meant for)
		var yAxisStep = total/5
		setList([yAxisStep.toFixed(0), (yAxisStep*2).toFixed(0),(yAxisStep*3).toFixed(0),(yAxisStep*4).toFixed(0),total])
	

		if(value%5 == 0){
			//setList([])
		}

		setInterest((((interestRate*.01)/(value*12))*currentDebt).toFixed(2))
	};

	const changeInterestRate = (enteredText) => {
          setInterestRate(enteredText.toString())
      }    

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
				<Text style={{
					fontWeight: 'bold',
					fontSize: 16,
					color: 'black',
					textAlign: 'left',
					marginLeft: 24,
					}}>
					Monthly Payments: <Text style={{color:'#426FFE'}}>${monthlyValue}</Text>
				</Text>
				<Slider
					style={{ width: Dimensions.get('window').width - 60, height: 40, justifyContent:'center', marginLeft: 18, marginTop:5}}
					minimumValue={1}
					maximumValue={35}
					step={1}
					minimumTrackTintColor="#426FFE"
					maximumTrackTintColor="#000000"
					onValueChange={(value) => changeGraph(value)}
				/>
				<View style={styles.mid}>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Years = {sliderValue}</Text>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Interest = ${interest}</Text>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Interest Rate= </Text>
				
				<TextInput
				placeholder= {'0%'}
				style={styles.input }
				onChangeText={changeInterestRate}
				value={interestRate}
				/>

				</View>
				<LineChart
					data={{
						//labels: [ '1', '5', '10', '15', '20', '25' ],
						labels:labels,
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
	},
	input: {
		alignItems: 'center',
		//padding: 10,
		//marginVertical: 10,
		width: 50,
		height: 24,
		borderRadius: 5,
		overflow: 'hidden',
		backgroundColor: '#e7e7e7',
		//marginTop: 10,
		marginBottom: 10,
		//marginLeft: 30,
		marginRight: 30,
		//paddingLeft: 16,
		fontSize: 10,
		textAlign:'center',
		color: 'black',
	  }
});

export default FavoriteMealScreen;

//<Header title="Student Loan Calculator" />
