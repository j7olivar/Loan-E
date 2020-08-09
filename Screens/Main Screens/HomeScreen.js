import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from '../../components/HomeScreen/GoalItem';
import GoalInput from '../../components/HomeScreen/GoalInput';
import Header from '../../components/Header';
import { firebase } from '../../Constants/ApiKeys';
import FavoriteMealScreen from './FavoriteMealScreen'
import AsyncStorage from '@react-native-community/async-storage'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoanCalculatorScreen from '../LoanScreens/LoanCalculator.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const HomeScreen = (props) => {
	const [ courseGoals, setCourseGoals ] = useState([]);
	const [ isAddMode, setIsAddMode ] = useState(false);
	const [goalCounter, setGoalCounter] = useState(0)
	const [pw, setPW] = useState('')
	const [userOut, setUserOut] = useState("")
	const [docIDS, setDocIDS] = useState([])


	const userId = props.extraData.id;
	const loansRef = firebase.firestore().collection('goals');

	const onFooterLinkPress = () => {
		props.navigation.navigate('Loan Calculator')
	}

	const onFooterLinkPress2 = () => {
		props.navigation.navigate('Loan Home')
	}

	const onFooterLinkPress3 = () => {
		props.navigation.navigate('Budget')
	}

	const getPW = async () => {
		try {
			const currPW = await AsyncStorage.getItem('password')
			if(currPW !== null){
				setPW(currPW)
			}	
		}catch (error){console.log(error)}
	}

	const clearPW = async() => {
		try{
			await AsyncStorage.removeItem('password')
			console.log('removed successfully')
		}catch(error){console.log(error)}
	}


	
	const onDeleteAccountPress = () => {
		//console.log(goalCounter)
		//console.log(courseGoals)
		var userReauth = firebase.auth().currentUser
		const credential = firebase.auth.EmailAuthProvider.credential(userReauth.email,pw)
		userReauth.reauthenticateWithCredential(credential)
		if(courseGoals.length !== 0){
			for(let i =0; i < goalCounter; i++){
				//console.log(courseGoals[i])
				firebase.database().ref('goals/'+(docIDS[i])).remove()
			}
		}
		
		firebase.database().ref('users/'+userId).remove()
		
		userReauth.delete()
		.then(function(){
			props.navigation.navigate('Login');
			props.navigation.reset({ index: 0, routes: [ { name: 'Login' } ] });
		}).catch(function(error){
			console.log('there is something wrong')
		})
		clearPW()
	}

	const pickDocument = async () => {
		try {
			let input = await DocumentPicker.getDocumentAsync({
				type: "text/plain",
			});
			setUserOut(await FileSystem.readAsStringAsync(input.uri));
		} catch (error) {
			console.log(error);
		}

		createLoans();
	};

	const fileParser = () => {
		const parsedLoans = [];
		var newUserOut = userOut;

		if (newUserOut.length == 0) {
			return;
		}
		//remove the grants
		var grantPos = newUserOut.search("Grant Type:");
		var pos = newUserOut.search("Loan Type:");
		//hopefully just the loans now
		newUserOut = newUserOut.slice(pos, grantPos);

		while (newUserOut.length > 0) {
			var lastPos = newUserOut.lastIndexOf("Loan Type:");
			parsedLoans.push(newUserOut.slice(lastPos, newUserOut.length));
			newUserOut = newUserOut.slice(0, lastPos);
		}
		//console.log('parsed loans: ' + parsedLoans)
		return parsedLoans;
	};

	const createLoans = () => {
		const newLoans = fileParser();
		const title= 'Loan Amount:$'
		const interest = 'Loan Interest Rate:'

		for(let i =0; i < newLoans.length; i++){
			var loan = newLoans[i]
			var goalTitle=loan.substring(loan.indexOf(title)+title.length,loan.indexOf('Loan Disbursed Amount:'))
			//console.log("goalTitle: " + goalTitle)
			var interestRate = loan.substring(loan.indexOf(interest)+interest.length,loan.indexOf('Loan Repayment Plan Type'))
			//console.log("Interest rate: "+ interestRate)
			var years = 0
			var paidOff = 0

			addGoalHandler(goalTitle,interestRate,years,paidOff)
		}
    
	};

	useEffect(() => {
		getPW()
		let isMounted = true;

		if (isMounted) {
			loansRef.where('authorID', '==', userId).orderBy('createdAt', 'desc').onSnapshot(
				(querySnapshot) => {
					const newGoals = [];
					querySnapshot.forEach((doc) => {
						const goal = doc.data();
						goal.id = doc.id + goalCounter.toString();
						newGoals.push(goal);
					});
					console.log('new Goals: '+ newGoals)
					console.log('old goals: '+ oldGoals)
					var oldGoals = courseGoals
					for(let j =0; j < newGoals.length; j++){
						oldGoals.push(newGoals[j])
					}
					setCourseGoals(oldGoals);
					setGoalCounter(goalCounter+1)
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
		//setCourseGoals([...courseGoals, enteredGoal])
		setCourseGoals((prevGoals) => [
			...courseGoals,
			{
				id:userId.toString() + goalCounter.toString(),
				value: goalTitle,
				interest: interestRate,
				years: years,
				paidOff: paidOff
			}
		]);
		var oldIDS = docIDS 
		oldIDS.push(userId.toString() + goalCounter.toString())
		setDocIDS(oldIDS)
		setGoalCounter(goalCounter+1)
		setIsAddMode(false);
	};

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
	};

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			loansRef.doc(goalId).delete().then(console.log('removed correctly'))
			return currentGoals.filter((goal) => goal.id !== goalId);
		});
		setGoalCounter(goalCounter-1)
	};

	return (
		<ScrollView style={styles.screen}>
			<Header title="Student Loan Calculator" />

			<View style={{ padding: 20 }}>
				<Text style={styles.title}> LOANS: </Text>

				<GoalInput visible={isAddMode} addGoalHandler={addGoalHandler} onCancel={cancelGoalAdditionHandler} />

				<FlatList
					keyExtractor={(item, index) => item.id}
					data={courseGoals}
					renderItem={(itemData) => (
						<GoalItem
							onDelete={removeGoalHandler.bind(this, itemData.item.id)}
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

				
				<TouchableOpacity title='Budget Page' onPress={onFooterLinkPress3}> 
					<Text style={{
						fontWeight: 'bold',
						fontSize: 20,
						color: '#32c090',
						textAlign: 'center',
						paddingTop: 20
					}}>
						Budgeting
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

				<TouchableOpacity title= 'Upload Doc' onPress={pickDocument}>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 20,
						color: '#32c090',
						textAlign: 'center',
						paddingTop: 20
					}}>
						Upload Document
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

});

export default HomeScreen;

