import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, ScrollView, View } from 'react-native'
import styles from './IndividualLoanStyles.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function IndividualLoanScreen({route, navigation}) {
	let { loan } = route.params
    const { interestRate } = route.params
	const { timeLeft } = route.params
	const { paidSoFar } = route.params
	//let { allLoans } = route.params

	let info = [loan, interestRate, timeLeft, paidSoFar];

	const [ payment, setPayment ] = useState(0);
	const [ totalLoan, setTotalLoan ] = useState(info[0] - info[2])

	const onFooterLinkPress3 = (info) => {
		navigation.navigate('Individual Loan', 
		{loan: info[0], interestRate: info[1], timeLeft: info[2], paidSoFar: info[3] })
	}

	/*const onFooterLinkPress = () => {
		props.navigation.navigate('Loan Calculator')
	}*/

	function getMonthlyPayement(months, interestRate, loanAmount){
		var monthlyIR = (interestRate * .01)/12;
        
        var term1 = Math.pow((1 + monthlyIR), months) - 1;
        var term2 = monthlyIR * Math.pow((1 + monthlyIR), months);
        var monthlyPayments = loanAmount/(term1 / term2);

        return monthlyPayments.toFixed(2);
	}

	function makePayment(totalLoan, payment, route){
		totalLoan -= payment;
		route.params.allLoans[1] = totalLoan;
		console.log(route.params.allLoans[1]);

		setTotalLoan(totalLoan)
	}

    return(
        <View style={{backgroundColor: '#060320', flex: 1}}>
			<Text style={styles.leftText}>Loan Name</Text>
			<Text style={styles.totalLoan}>${totalLoan}</Text>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Monthly Payment:</Text>
				<Text style={styles.rightText1}>${getMonthlyPayement(info[2]*12, info[1], info[0])}</Text>
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
				<Text style={styles.rightText4}>${info[3]}</Text>
			</View>

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

		</View>
    )
}