import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from '../../components/HomeScreen/GoalItem';
import GoalInput from '../../components/HomeScreen/GoalInput';
import Header from '../../components/Header';
import { firebase } from '../../Constants/ApiKeys';
import FavoriteMealScreen from './FavoriteMealScreen'
import {allLoans, updateCounter} from '../LoanScreens/GlobalLoans'

import { NavigationContainer } from '@react-navigation/native';
import LoanCalculatorScreen from '../LoanScreens/LoanCalculator.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HomeScreen = (props) => {
	const [ courseGoals, setCourseGoals ] = useState([]);
	const [ isAddMode, setIsAddMode ] = useState(false);
	const [ payment, setPayment ] = useState(0);
	const [ totalLoan, setTotalLoan ] = useState(0)
	const [ updatedLoan, setUpdatedLoan ] = useState(false);


	const userId = props.extraData.id;
	const loansRef = firebase.firestore().collection('goals');

	const onFooterLinkPress = () => {
		props.navigation.navigate('Loan Calculator')
	}

	const onFooterLinkPress2 = () => {
		props.navigation.navigate('Loan Home')
	}

	const onFooterLinkPress3 = (item, allLoans) => {
		props.navigation.navigate('Individual Loan', 
		{loan: item.value, interestRate: item.interest, timeLeft: item.years, paidSoFar: item.paidOff, allLoans: allLoans })
		
    }
	
	const onDeleteAccountPress = () => {
		//console.log(props.extraData)
		/*
		firebase.database().ref('users/'+userId).remove()
		firebase.database().ref('goals')
		firebase.auth().currentUser.delete()
		.then(function(){
			props.navigation.navigate('Login');
			props.navigation.reset({ index: 0, routes: [ { name: 'Login' } ] });
		}).catch(function(error){
			console.log('there is something wrong')
		})
		*/
	}

	useEffect(() => {
		let isMounted = true;

		if (isMounted) {
			loansRef.where('authorID', '==', userId).orderBy('createdAt', 'desc').onSnapshot(
				(querySnapshot) => {
					const newGoals = [];
					querySnapshot.forEach((doc) => {
						const goal = doc.data();
						goal.id = doc.id;
						newGoals.push(goal);
					});
					setCourseGoals(newGoals);
				},
				(error) => {
					console.log(error);
				}
			);
		}
		return () => {
			isMounted = false;
		};
	}, []);

	const onLogoutPress = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				props.navigation.navigate('Login');
				props.navigation.reset({ index: 0, routes: [ { name: 'Login' } ] });
			})
			.catch((error) => {
				alert(error);
			});
	};

	const addGoalHandler = (goalTitle, interestRate, years, paidOff) => {
		updateCounter(allLoans)
		//setCourseGoals([...courseGoals, enteredGoal])
		setCourseGoals((prevGoals) => [
			...courseGoals,
			{
				id: Math.random().toString(),
				//possible fix to deleting new loans
				//id:userId.toString(),
				value: goalTitle,
				interest: interestRate,
				years: years,
				paidOff: paidOff
			}
		]);

		setIsAddMode(false);
	};

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
	};

	function deleteLoan(index, loans){
		loans.splice(index, 1);
		var total = 0;

		for(var i = 0; i < loans.length; i++){
			total += loans[i]
		}

		setTotalLoan(total)
	}

	const removeGoalHandler = (goalId, loans, item) => {
		onFooterLinkPress3(item, loans);
		//deleteLoan(1, loans);

		/*setCourseGoals((currentGoals) => {
			
			loansRef.doc(goalId).delete().then(console.log('removed correctly'))
			return currentGoals.filter((goal) => goal.id !== goalId);
		});*/

		//firebase.database().ref(goalId).remove()
		setTotalLoan(allLoans.totalLoan);
	};

	function addNewLoan(loanToAdd, paidOff, arr){
		var total = 0;

			if(arr.counter == 0){
				arr.loan1 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 1){
				arr.loan2 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 2){
				arr.loan3 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 3){
				arr.loan4 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 4){
				arr.loan5 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 5){
				arr.loan6 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 6){
				arr.loan7 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 7){
				arr.loan8 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 8){
				arr.loan9 = (loanToAdd - paidOff);
			}
			else if(arr.counter == 9){
				arr.loan10 = (loanToAdd - paidOff);
			}
			else{
				console.log("Too many loans")
			}


		arr.totalLoan = arr.loan1 + arr.loan2 + arr.loan3 + arr.loan4 +arr.loan5 + arr.loan6 +arr.loan7 + arr.loan8 + arr.loan9 + arr.loan10;

		setTotalLoan(arr.totalLoan);
		return
	}

	function getTotalLoan(arr){
		var total = 0; 

		//console.log(arr.length)

		for(var i = 0; i < arr.length; i++){
			total += arr[i]
			console.log(i)
		}

		return total;
	}
	
	return (
		<ScrollView style={styles.screen}>
			<Header title="Student Loan Calculator" />

			<View style={{ padding: 20 }}>
				<Text style={styles.total}> Total Loans </Text>

				<FlatList
				keyExtractor={(item, index) => item.id}
				data={courseGoals}
				renderItem={(itemData) => (
					addNewLoan(itemData.item.value, itemData.item.paidOff, allLoans)
					//setTotalLoan(getTotalLoan(allLoans))
				)}/>
				<Text style={styles.totalLoan}>${totalLoan}</Text>

				<Text style={styles.title}> LOANS: </Text>

				<GoalInput visible={isAddMode} addGoalHandler={addGoalHandler} onCancel={cancelGoalAdditionHandler} />

				<FlatList
					keyExtractor={(item, index) => item.id}
					data={courseGoals}
					renderItem={(itemData) => (
						<GoalItem
							onDelete={removeGoalHandler.bind(this, itemData.item.id, allLoans, itemData.item)}
							
							title={itemData.item.value}
							subInterest={itemData.item.interest}
							subPaid={itemData.item.paidOff}
							subYears={itemData.item.years}
						/>
					)}
				/>
				<Button title="Add New Loan" onPress={() => setIsAddMode(true)} />

				<Text style={styles.title}> SHINY GRAPH/SLIDER: </Text>
				<FavoriteMealScreen/>
				
				

<TouchableOpacity title='Loan Calculator' onPress={onFooterLinkPress}> 
	<Text style={{
		fontWeight: 'bold',
		fontSize: 20,
		color: '#32c090',
		textAlign: 'center',
		paddingTop: 20
	}}>
		Loan Calculator
	</Text>
</TouchableOpacity>

<TouchableOpacity title='Loan Calculator' onPress={onFooterLinkPress2}> 
	<Text style={{
		fontWeight: 'bold',
		fontSize: 20,
		color: '#32c090',
		textAlign: 'center',
		paddingTop: 20
	}}>
		Loan Home Screen Prototype
	</Text>
</TouchableOpacity>

<TouchableOpacity title= 'Delete User' onPress={onDeleteAccountPress}>
	<Text style={{
		fontWeight: 'bold',
		fontSize: 20,
		color: '#32c090',
		textAlign: 'center',
		paddingTop: 20
	}}>
		Delete Account
	</Text>
</TouchableOpacity>


			</View>
			<View style={styles.logout}>
				<Button style={styles.logout} title="Logout" onPress={() => onLogoutPress()} />
			</View>
			
		</ScrollView>
	);

};
const styles = StyleSheet.create({
	screen: {
		flex: 1
		//backgroundColor: '#060320'
	},
	title: {
		//color: '#35CA96',
		fontSize: 22,
		margin:15,
		fontWeight: 'bold'
	},
	logout: {
		//	position: 'absolute',
		//marginBottom: 'auto'

		flex: 1,
		justifyContent: 'flex-end'
		//marginBottom: 500
	},
	total: {
		fontSize: 25,
		margin:15,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	totalLoan: {
		fontWeight: 'bold',
		fontSize: 40,
		color: '#32c090',
		textAlign: 'center',
		paddingTop: 20
	},
	input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: 'grey',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
		fontSize: 20,
        color: 'white',
    },
});

export default HomeScreen;

//removeGoalHandler.bind(this, itemData.item.id, allLoans)