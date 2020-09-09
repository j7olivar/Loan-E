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
	const [ totalLoan, setTotalLoan ] = useState((parseFloat(item.value)-parseFloat(item.paidOff)).toFixed(2))
	const [ paidOff, setPaidOff ] = useState(parseFloat(item.paidOff).toFixed(2))
	const [ monthlyPayment, setMonthlyPayment ] = useState(getMonthlyPayement(parseFloat(item.years)*12, parseFloat(item.interest), parseFloat(item.value)-parseFloat(item.paidOff).toFixed(2)))
	const [ monthsLeft, setMonthsLeft ] = useState((parseFloat(item.years) * 12).toFixed(0))

	function getMonthlyPayement(months, interestRate, loanAmount){
		var monthlyIR = (interestRate * .01)/12;
        
        var term1 = Math.pow((1 + monthlyIR), months) - 1;
        var term2 = monthlyIR * Math.pow((1 + monthlyIR), months);
        var monthlyPayments = loanAmount/(term1 / term2);

        return monthlyPayments.toFixed(2);
	}

	function getMonthsLeft(interestRate, loanAmount){
		var monthlyIR = (interestRate * .01)/12;
		
		var term1 = -(Math.log10(1-monthlyIR*(loanAmount/monthlyPayment)));
		var term2 = Math.log10(1+monthlyIR);
		var monthsLeft = term1/term2;

        return Math.round(monthsLeft);
	}

	function reduceTime(){
		//Getting the amount of months paid and setting the amount of months left to pay 
		var monthsPaid = payment/monthlyPayment;
		var remainingMonths = Math.round(monthsLeft-monthsPaid)
		setMonthsLeft(remainingMonths)

		//Code to set the new total loan correctly
		var newTotalLoan = (parseFloat(totalLoan)-payment).toFixed(2)
		setTotalLoan(newTotalLoan)

		//Getting the new monthly payment given the new months
		var payments = getMonthlyPayement(remainingMonths, parseFloat(item.interest), newTotalLoan)
		setMonthlyPayment(payments)

		//Code to set the correct amount paid off
		var newPaidOff = ((parseFloat(paidOff) + parseFloat(payment)).toFixed(2)).toString()
		setPaidOff(newPaidOff)

		editGoalHandler(item.id.substr(0,28), payments, remainingMonths)

	}

	function makeMonthlyPayment(){
		var months = monthsLeft-1
		setMonthsLeft(months)
		setTotalLoan((totalLoan-monthlyPayment).toFixed(2))
		setPaidOff(((parseFloat(paidOff)+parseFloat(monthlyPayment)).toFixed(2)).toString())
		editGoalHandler(item.id.substr(0,28), monthlyPayment, months)

	}

	function makePayment(totalLoan, payment, paidOff, interestRate, months){
		totalLoan -= payment;
		console.log(item)

		//Code to update the total loans amount
		setTotalLoan(totalLoan.toFixed(2))
		console.log(totalLoan)

		//Code to update the amount paid off
		paidOff = parseFloat(payment) + parseFloat(paidOff)
		setPaidOff(paidOff.toFixed(2))

		//Code to update monthly payments
		var payments = getMonthlyPayement(months, interestRate, totalLoan)
		setMonthlyPayment(payments)

		
		console.log(item.id.substr(0,28))
		editGoalHandler(item.id.substr(0,28), payment, monthsLeft)
		
	}

	const editGoalHandler = async (id, payment, months) =>{
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
              value: item.value,
              interest: item.interest,
              years: (months/12).toFixed(2),
              paidOff: (parseFloat(paidOff)+parseFloat(payment)).toString()
			}
          }
        }
        //rewrite to firestore
        await loansRef.doc(userId).update({goals:newGoals})
        console.log(months)
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
				<Text style={styles.rightText2}>{parseFloat(item.interest).toFixed(2)}%</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Months Left:</Text>
				<Text style={styles.rightText3}>{monthsLeft}</Text>
			</View>

			<View style={{flexDirection: 'row'}}>
				<Text style={styles.leftText}>Paid Off:</Text>
				<Text style={styles.rightText4}>${paidOff}</Text>
			</View>

			<View
				style={{
					borderBottomColor: '#ededed',
					borderBottomWidth: 2,
					paddingTop: 30,
					marginLeft:20,
					marginRight: 20
				}}/>

			<Text style={{
					paddingTop: 30,
					paddingLeft: 10,
					fontWeight: 'bold',
					fontSize: 22,
					color: 'black',
					textAlign: 'center'}}>
					Payment
				</Text>

				<View style={{paddingTop: 15}}>
					<TextInput placeholder="Custom Payment"
					style={styles.input} 
					onChangeText ={ payment => setPayment(payment)}/>
				</View>

				<View style={{flexDirection: 'row'}}>

					<TouchableOpacity onPress={() => makePayment(totalLoan, payment, paidOff, parseFloat(item.interest), parseFloat(item.years)*12)}>
						<Text style={{
							fontWeight: 'bold',
							fontSize: 18,
							color: '#426FFE',
							paddingTop: 20,
							paddingLeft: 55
						}}>
							Reduce Pay
						</Text>
					</TouchableOpacity>

					<View
						style={{
						borderLeftWidth: 2,
						borderLeftColor: '#ededed',
						marginLeft: 33,
						marginTop: 10,
						paddingTop:50
						}}
					/>

					<TouchableOpacity onPress={() => reduceTime()}>
						<Text style={{
							fontWeight: 'bold',
							fontSize: 18,
							color: '#426FFE',
							paddingTop: 20,
							paddingLeft: 32
						}}>
							Reduce Time
						</Text>
					</TouchableOpacity>
				</View>

				<View
				style={{
					borderBottomColor: '#ededed',
					borderBottomWidth: 2,
					marginLeft:25,
					marginRight: 25
				}}/>

			<TouchableOpacity onPress={() => makeMonthlyPayment()}>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 18,
						color: '#426FFE',
						textAlign: 'center',
						paddingTop: 15
					}}>
						Monthly Payment
					</Text>

				</TouchableOpacity>
		</View>
    )
}