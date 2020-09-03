import React, { useEffect, useState, Component } from 'react'
import { Text, TextInput, Button, ScrollView, View } from 'react-native'
import styles from './IndividualLoanStyles.js'
import { TouchableOpacity } from 'react-native-gesture-handler';

import { firebase } from '../../Constants/ApiKeys';

import {allLoans, updateCounter} from '../LoanScreens/GlobalLoans'

export default function IndividualLoanScreen({route, navigation}) {
	const { item } = route.params
	const loansRef = firebase.firestore().collection('goals');

	const [ payment, setPayment ] = useState(0);
	const [ totalLoan, setTotalLoan ] = useState(parseInt(item.value))
	const [ paidOff, setPaidOff ] = useState(parseInt(item.paidOff))
	const [ monthlyPayment, setMonthlyPayment ] = useState(getMonthlyPayement(parseInt(item.years)*12, parseInt(item.interest), parseInt(item.value)))

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
		totalLoan -= payment;
		allLoans.totalLoan -= payment;
		console.log(item)

		//Code to update the total loans amount
		setTotalLoan(totalLoan)
		console.log(totalLoan)

		//Code to update the amount paid off
		paidOff = parseFloat(payment) + parseFloat(paidOff)
		setPaidOff(paidOff)

		//Code to update monthly payments
		var payments = getMonthlyPayement(months, interestRate, totalLoan)
		setMonthlyPayment(payments)

		
		console.log(item.id.substr(0,28))
		editGoalHandler(item.id.substr(0,28), payment)
		
	}

	const editGoalHandler = async (id, payment) =>{
		let userId = id
        const existingDoc = await loansRef.doc(userId).get();
        const goals = existingDoc.data().goals
        const newGoals = goals.slice()
        //time to replace the old goal with new one
        for(let i = 0; i < goals.length;i++){
          if(goals[i].id == item.id){
            console.log('doing this bro')
            newGoals[i] = {
              id: item.id,
              value: totalLoan-payment,
              interest: item.interest,
              years: item.years,
              paidOff: parseInt(paidOff)+parseInt(payment)
			}
			console.log(newGoals[i])
          }
        }
        //rewrite to firestore
        await loansRef.doc(userId).update({goals:newGoals})
        console.log('did this')
        //now can go back to home screen
      }

    return(
        <View style={{backgroundColor: 'white', flex: 1, padding:15}}>
			<Text style={styles.totalLoan}>${totalLoan}</Text>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Monthly Payment:</Text>
				<Text style={styles.rightText1}>${monthlyPayment}</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Interest Rate:</Text>
				<Text style={styles.rightText2}>{parseInt(item.interest)}%</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Months Left:</Text>
				<Text style={styles.rightText3}>{parseInt(item.years) * 12}</Text>
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

			<TouchableOpacity onPress={() => makePayment(totalLoan, payment, paidOff, parseInt(item.interest), parseInt(item.years)*12, allLoans)}>
				<Text style={{
					fontWeight: 'bold',
					fontSize: 20,
					color: '#426FFE',
					textAlign: 'center',
					paddingTop: 20
				}}>
					Make Payment
				</Text>
			</TouchableOpacity>

		</View>
    )
}