import React, { useEffect, useState, Component } from 'react'
import { Text, TextInput, Button, ScrollView, View } from 'react-native'
import styles from './IndividualLoanStyles.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

import {allLoans, updateCounter} from '../LoanScreens/GlobalLoans'


class updating extends Component{
	componentWillUnmount(){
		alert("Test")
	}

	
}


export default function IndividualLoanScreen({route, navigation}) {
	let { loan } = route.params
	const { interestRate } = route.params
	const { timeLeft } = route.params
	const { paidSoFar } = route.params

	let info = [loan, interestRate, timeLeft, paidSoFar];

	const [ payment, setPayment ] = useState(0);
	const [ totalLoan, setTotalLoan ] = useState(info[0] - info[3])
	const [ paidOff, setPaidOff ] = useState(info[3])
	const [ monthlyPayment, setMonthlyPayment ] = useState(getMonthlyPayement(info[2]*12, info[1], info[0]))

	const onFooterLinkPress = () => {
		navigation.navigate('Home')
	}

	function getMonthlyPayement(months, interestRate, loanAmount){
		var monthlyIR = (interestRate * .01)/12;
        
        var term1 = Math.pow((1 + monthlyIR), months) - 1;
        var term2 = monthlyIR * Math.pow((1 + monthlyIR), months);
        var monthlyPayments = loanAmount/(term1 / term2);

        return monthlyPayments.toFixed(2);
	}

	function makePayment(totalLoan, payment, paidOff, interestRate, months, allLoans){

		if(allLoans.loan1 == totalLoan){
			allLoans.loan1 -= payment;
		}
		else if(allLoans.loan2 == totalLoan){
			allLoans.loan2 -= payment;
		}
		else if(allLoans.loan3 == totalLoan){
			allLoans.loan3 -= payment;
		}
		else if(allLoans.loan4 == totalLoan){
			allLoans.loan4 -= payment;
		}
		else if(allLoans.loan5 == totalLoan){
			allLoans.loan5 -= payment;
		}
		else if(allLoans.loan6 == totalLoan){
			allLoans.loan6 -= payment;
		}
		else if(allLoans.loan7 == totalLoan){
			allLoans.loan7 -= payment;
		}
		else if(allLoans.loan8 == totalLoan){
			allLoans.loan8 -= payment;
		}
		else if(allLoans.loan9 == totalLoan){
			allLoans.loan9 -= payment;
		}
		else if(allLoans.loan10 == totalLoan){
			allLoans.loan10 -= payment;
		}
		else{
			console.log("Too many loans")
		}

		totalLoan -= payment;
		allLoans.totalLoan -= payment;


		//Code to update the total loans amount
		console.log(allLoans.loan1)
		console.log(allLoans.loan2)
		console.log(allLoans.loan3)
		console.log(allLoans.totalLoan)
		setTotalLoan(totalLoan)

		//Code to update the amount paid off
		paidOff = parseFloat(payment) + parseFloat(paidOff)
		setPaidOff(paidOff)

		//Code to update monthly payments
		var payments = getMonthlyPayement(months, interestRate, totalLoan)
		setMonthlyPayment(payments)
		
	}

    return(
        <View style={{backgroundColor: '#060320', flex: 1}}>
			<Text style={styles.leftText}>Loan Name</Text>
			<Text style={styles.totalLoan}>${totalLoan}</Text>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Monthly Payment:</Text>
				<Text style={styles.rightText1}>${monthlyPayment}</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Interest Rate:</Text>
				<Text style={styles.rightText2}>{info[1]}%</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Months Left:</Text>
				<Text style={styles.rightText3}>{info[2] * 12}</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Paid Off:</Text>
				<Text style={styles.rightText4}>${paidOff}</Text>
			</View>

			<View style={{paddingTop: 60}}>
				<TextInput placeholder="Input Payment"
				style={styles.input} 
				onChangeText ={ payment => setPayment(payment)}/>
			 </View>

			<TouchableOpacity onPress={() => makePayment(totalLoan, payment, paidOff, info[1], info[2]*12, allLoans)}>
				<Text style={{
					fontWeight: 'bold',
					fontSize: 20,
					color: '#32c090',
					textAlign: 'center',
					paddingTop: 20
				}}>
					Make Payment
				</Text>
			</TouchableOpacity>

			<Button title='back' onPress={() => onFooterLinkPress()}/>

		</View>
    )
}

/* Code that adds the functionality to make payments to the individual loan screen
<View style={{paddingTop: 60}}>
				<TextInput placeholder="Input Payment"
				style={styles.input} 
				onChangeText ={ payment => setPayment(payment)}/>
			 </View>

			<TouchableOpacity onPress={() => makePayment(totalLoan, payment, route)}>
				<Text style={{
					fontWeight: 'bold',
					fontSize: 20,
					color: '#32c090',
					textAlign: 'center',
					paddingTop: 20
				}}>
					Make Payment
				</Text>
			</TouchableOpacity>
*/