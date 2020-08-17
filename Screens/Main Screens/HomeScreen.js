import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from '../../components/HomeScreen/GoalItem';
import GoalInput from '../../components/HomeScreen/GoalInput';
import Header from '../../components/Header';
import { firebase } from '../../Constants/ApiKeys';
import FavoriteMealScreen from './FavoriteMealScreen'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoanCalculatorScreen from '../LoanScreens/LoanCalculator.js';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createStackNavigator();


const HomeScreen = (props) => {
	const [ courseGoals, setCourseGoals ] = useState([]);
	const [ isAddMode, setIsAddMode ] = useState(false);

	const [ totalLoan, setTotalLoan ] = useState(0);
	const [ ifHalfPaid, setIfHalfPaid ] = useState(false);


	const userId = props.extraData.id;
	const loansRef = firebase.firestore().collection('goals');

	let allLoans = [0];

	

	const onFooterLinkPress = () => {
		props.navigation.navigate('Loan Calculator')
	}

	const onFooterLinkPress2 = () => {
		props.navigation.navigate('Loan Home')
	}

	const onFooterLinkPress3 = () => {
		props.navigation.navigate('Budget')
	}

	
	const onDeleteAccountPress = () => {
		console.log(props.extraData)
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

	const [userOut, setUserOut] = useState("");

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

		return parsedLoans;
	};

	const createLoans = () => {
    var newLoans = fileParser();
    //console.log(newLoans)
    const title= 'Loan Amount:$'
    const interest = 'Loan Interest Rate:'

    for(let i =0; i < newLoans.length; i++)
    {
      var loan = newLoans[i]
      var goalTitle=loan.substring(loan.indexOf(title)+title.length,loan.indexOf('Loan Disbursed Amount:'))
      console.log("goalTitle: " + goalTitle)
      var interestRate = loan.substring(loan.indexOf(interest)+interest.length,loan.indexOf('Loan Repayment Plan Type'))
      console.log("Interest rate: "+ interestRate)
      var years = 0
      var paidOff = 0

      addGoalHandler(goalTitle,interestRate,years,paidOff)
    }
    
	};

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

	{/*}
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
	*/}

	const addGoalHandler = (goalTitle, interestRate, years, paidOff) => {
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

	const removeGoalHandler = (goalId) => {
		setCourseGoals((currentGoals) => {
			
			loansRef.doc(goalId).delete().then(console.log('removed correctly'))
			return currentGoals.filter((goal) => goal.id !== goalId);
		});

		//firebase.database().ref(goalId).remove()
	};

	function deleteLoan(index, loans){
		loans.splice(index, 1);
		var total = 0;

		for(var i = 0; i < loans.length; i++){
			total += loans[i]
		}

		setTotalLoan(total)
	}

	function addNewLoan(loanToAdd, paidOff, arr){
		arr.push(loanToAdd - paidOff);
		var total = 0;

		for(var i = 0; i < arr.length; i++){
			total += arr[i]
		}

		setTotalLoan(total);
	}

	


	return (
		<ScrollView style={styles.screen}>

			<Text style={styles.loanTitle}>
				Student Loan Calculator
			</Text> 

			<View style={{ padding: 20, marginTop: 15 }}>

				<Text style={styles.title}>Total Loans:</Text>

				<FlatList
				keyExtractor={(item, index) => item.id}
				data={courseGoals}
				renderItem={(itemData) => (
					addNewLoan(itemData.item.value, itemData.item.paidOff, allLoans)
				)}/>

				<Text style={styles.totalLoan}> ${totalLoan} </Text>
			

				<Text style={styles.title}>Loans:</Text>

				<GoalInput visible={isAddMode} addGoalHandler={addGoalHandler} onCancel={cancelGoalAdditionHandler} />

				<FlatList
					keyExtractor={(item, index) => item.id}
					data={courseGoals}
					renderItem={(itemData) => (
						<GoalItem
							onDelete={removeGoalHandler.bind(this, itemData.item.id, allLoans)}
							title={itemData.item.value}
							subInterest={itemData.item.interest}
							subPaid={itemData.item.paidOff}
							subYears={itemData.item.years}
						/>
					)}
				/>
				<Button title="Add New Loan" onPress={() => setIsAddMode(true)} />

				<View style={{paddingBottom: 15}}>
				</View>

				<Text style={styles.title}>Graph:</Text>
				<FavoriteMealScreen/>

				<View style={{paddingBottom: 15}}>
				</View>

				<View style={styles.box} title='Loan Calculator' onPress={onFooterLinkPress}>
					<Text 
						style={{
							fontWeight: 'bold',
							fontSize: 20,
							color: 'black',
							textAlign: 'left',
							marginTop: 10,
							flexDirection: 'row'
						}}>
							Loan Calculator
					</Text>

					<Icon
					name={'keyboard-arrow-right'}
					size={30}
					color="grey"
					onPress={onFooterLinkPress}
					style={{marginTop: 7}}
					/>
					
				</View>

				<TouchableOpacity title='Loan Calculator' onPress={onFooterLinkPress2}> 
					<Text style={{
						fontWeight: 'bold',
						fontSize: 20,
						color: 'black',
						textAlign: 'left',
						paddingTop: 20
					}}>
						Loan Home Screen Prototype
					</Text>
				</TouchableOpacity>

				
				{/*}
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
				*/}

				{/*
			
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
				
				*/}

			</View>

			
			{/*
			<View style={styles.logout}>
				<Button style={styles.logout} title="Logout" onPress={() => onLogoutPress()} />
			</View>
			*/}


			
		</ScrollView>

	);

};
const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: 'white'
	},
	loanTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        paddingLeft: 23,
        paddingTop: 34,
        color: '#426FFE'
      },
	title: {
		//color: '#35CA96',
		fontSize: 20,
		marginLeft:5,
		fontWeight: 'bold'
	},
	logout: {
		//	position: 'absolute',
		//marginBottom: 'auto'

		flex: 1,
		justifyContent: 'flex-end'
		//marginBottom: 500
	},
	box: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		height: 58,
		marginLeft: 5,
		paddingRight: 18,
	}

});

export default HomeScreen;

