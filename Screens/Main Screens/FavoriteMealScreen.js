import React, { useState, useEffect } from 'react';
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
	const [ sliderValue, setSliderValue ] = useState(0);
	//var currentDebt=0; //cant use useState b/c it doesnt update imediately

	const [currentDebt, setCurrentDebt] = useState(5100);
	const [ list, setList ] = useState([ 0, 0, 0, 0, 0, 0 ]);
	const [interest, setInterest] = useState(0);
	const [totalMonths, setTotalMonths] = useState(0)



	const [monthlyValue, setMonthlyValue] = useState(100)
	const [currentLoans, setCurrentLoans] = useState({
		'loan1': [5000,5],
		'loan2': [100,10],
	}) //loan amnt and interest rate

	
	const [interestRate, setInterestRate] = useState('1')
	const [labels, setLabels] = useState([])

	/*
	useEffect(() => {
		getTotal()
	}, []);
	*/

/* 	const findMonthIntervals = (totalMonths, monthlyPayment){
		monthIntervals = [totalMonths/6, totalMonths/3, totalMonths/2, totalMonths * 2/3, totalMonths * 5/6, totalMonths];
		finalValues = [0,0,0,0,0,0];
		int i;
		int currentLoan = 0;
		val temp = currentLoans
		val new = False;
	// start paying off the loans month by month. When u reach the end, figure out how much interest has been accruing for all the ones that are last in all the months
	// and add that to the total

		// For every group of months
		for(i=0, i<monthIntervals.length; i++){
			int j;
			//For every 1 month calculation
			for(j=0; i < monthIntervals[i].length; j++){
				if(new){
					int p =0;
					//Add to loan all
					for(p=0; p < monthIntervals[i]; p++){
						loan = loan * (1+interest);
					}
				}

				loan = loan - monthlyPayment;
				loan = loan * (1+interest);

				if(loan <= 0){
					new = True;
					currentLoan++;
				}
			}
				int q;
				for(q=currentLoan; q < currentLoans.length; q++){
					int r = 0;
					for(r=0; r < monthIntervals[i]; r++){
					temp[q][0] *= temp[q][0] + (1*currentLoans[q][1]) 
					}
				}
				var thisLoan = temp[i][0];
				finalValues[i] = currentPaidOff
			}
		return finalValues;
	} */

	const calculateTotalMonths = (monthlyPayment) => {
		var currentMonths = 0;
		//setCurrentLoans(sort_objects(currentLoans));
		//setCurrentLoans(currentLoans.sort())
		for(var key in currentLoans){
			currentMonths = calculateSub(currentLoans[key][0], currentLoans[key][1], currentMonths, monthlyPayment)
		}
		return currentMonths;
	}

	const calculateSub = (loan, interest, currentMonths, monthlyPayment) => {
		interest = (interest * .01)/12;
		var i=0;
		console.log("Current Months: " + currentMonths)
		for(i=0; i<currentMonths; i++){
			loan = loan * (1+interest)
		}
		while(loan>0){
			loan = loan-monthlyPayment
			loan = loan * (1+interest);
			currentMonths++;
		}
		return currentMonths;
	}

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
			setCurrentDebt(total)
			console.log(currentLoans)
			return total
			
		}
		catch(error){
			console.log(error)
		}
	}



	const changeGraph = async(value) => {
		setSliderValue(value);
		setMonthlyValue(value);
		if(value%50 == 0){
		//setCurrentLoans(currentLoans.sort())
		//console.lxog(value);
		
			console.log(value);
			var totalNumberOfMonths = calculateTotalMonths(value);
			console.log("Months: " + totalNumberOfMonths)
			// Set labels to be every year, 5 years, etc.
			numberOfLabels = totalNumberOfMonths/12
			var total = currentDebt

			//findMonthIntervals(totalNumberOfMonths, value)
			setList([total*.86, total*.66, total*.5, total *.33, total*.16,0]);
			setTotalMonths(totalNumberOfMonths);
			if(totalNumberOfMonths <= 12){
				setLabels([2,4,6,8,10,12])
			}
			else if(totalNumberOfMonths <= 24){
				setLabels([4,8,12,16,20,22])
			}
			else if(totalNumberOfMonths <= 72){
				setLabels([12,24,36,48,60,72])
			}
			else {
				setLabels([72,144,216,288,360,432])
			}
	};}
		/*
		setSliderValue(value)
		setCurrentLoans(sort_object(currentLoans))
		setMonthlyValue(value);

		//get total amount due
		currentDebt = await getTotal()
		
		//finding x-axis intervals
		if(value%20 == 0){
			totalNumberOfMonths = calculateTotalMonths(value);
			// Set labels to be every year, 5 years, etc.
			numberOfLabels = totalNumberOfMonths/12
		if(value >=6){
			setLabels([oneStep.toFixed(0), (oneStep*2).toFixed(0), (oneStep*3).toFixed(0), (oneStep*4).toFixed(0), (oneStep*5).toFixed(0), value.toFixed(0)])
		}
		else{
			//im not sure what to do for years less than 6 since we are using 6 dots on the graph
			setLabels([1,2,3,4,5])
		}}

		//finding y-axis intervals (tbh idk what the List is meant for)
		var yAxisStep = total/5
		setList([yAxisStep.toFixed(0), (yAxisStep*2).toFixed(0),(yAxisStep*3).toFixed(0),(yAxisStep*4).toFixed(0),total])
	

		

		setInterest((((interestRate*.01)/(value*12))*currentDebt).toFixed(2))
		*/
	

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
					minimumValue={0}
					maximumValue={1000}
					step={1}
					minimumTrackTintColor="#426FFE"
					maximumTrackTintColor="#000000"
					onValueChange={(value) => changeGraph(value)}
				/>
				<View style={styles.mid}>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Months = {totalMonths}</Text>
				<Text style={{ textAlign: 'left', marginLeft:18}}> Interest = ${interest}</Text>
				

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
					//yAxisSuffix="$"
					xAxisLabel="m"
					style={{
						marginVertical: 8,
						marginLeft:18,
						marginTop:20,
					
					}}
				/>
			</View>
		</View>
	);
				}


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
