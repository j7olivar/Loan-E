import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList, Alert } from 'react-native';
import GoalItem from '../../components/HomeScreen/GoalItem';
import EditGoalInput from '../../components/HomeScreen/EditGoalInput';
import GoalInput from '../../components/HomeScreen/GoalInput';
import Header from '../../components/Header';
import { firebase } from '../../Constants/ApiKeys';
import FavoriteMealScreen from './FavoriteMealScreen'
//import AsyncStorage from '@react-native-community/async-storage'
import * as SecureStore from 'expo-secure-store'
import * as DocumentPicker from 'expo-document-picker'
import * as FileSystem from 'expo-file-system';

import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { set } from 'react-native-reanimated';

<<<<<<< HEAD
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';


=======
console.ignoredYellowBox = ['Warning:', '- node', 'Encountered', 'Failed'];
console.disableYellowBox = true
>>>>>>> rain

import Icon from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();

const HomeScreen = (props) => {
	const [ courseGoals, setCourseGoals ] = useState([]);
	const [ isAddMode, setIsAddMode ] = useState(false);
	const [ isEditMode, setIsEditMode ] = useState(false)
 	const [goalCounter, setGoalCounter] = useState(0)
	const [pw, setPW] = useState('')
	//const [userOut, setUserOut] = useState("")
	var userOut;

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

	
	const getPW = async () => {
		try {
			//const currPW = await AsyncStorage.getItem('password')
			const currPW = await SecureStore.getItemAsync('password')
			if(currPW !== null){
				setPW(currPW)
			}	
		}
		catch (error) {console.log(JSON.stringify(error))}
	}

	const clearPW = async() => {
		try{
<<<<<<< HEAD
			await SecureStore.deleteItemAsync('password')
			//await AsyncStorage.removeItem('password')
			console.log('removed successfully')
		}catch(error){console.log(error)}
=======
			await AsyncStorage.removeItem('password')
			//console.log('removed successfully')
		}catch(error) {console.log(JSON.stringify(error))}
>>>>>>> rain
	}
	
	
	
	const onDeleteAccountPress = () => {
		var userReauth = firebase.auth().currentUser
		const credential = firebase.auth.EmailAuthProvider.credential(userReauth.email,pw)
		userReauth.reauthenticateWithCredential(credential)
		if(courseGoals.length !== 0){
			loansRef.doc(userId).delete()
			firebase.firestore().collection('users').doc(userId).delete()
		}
		userReauth.delete()
		.then(function(){
			props.navigation.navigate('Login');
			props.navigation.reset({ index: 0, routes: [ { name: 'Login' } ] });
		}).catch(function(error){
			//console.log('there is something wrong')
		})
		clearPW()
	}

	

	const pickDocument = async () => {
		//console.log('pic Doc')
		try {
			
			let input = await DocumentPicker.getDocumentAsync({
				type: "text/plain",
			})
			//setUserOut(await FileSystem.readAsStringAsync(input.uri))
			userOut = await FileSystem.readAsStringAsync(input.uri)
			
			createLoans()
			
		} catch (error) {
			console.log(JSON.stringify(error));
		}
	}
	

	const fileParser = () => {
		//console.log('file parser')
		const parsedLoans = [];
		var newUserOut = userOut;

		if (newUserOut.length == 0) {
			Alert.alert('wrong document','Try Again')
			return
		}
		//remove the grants
		var grantPos = newUserOut.search("Grant Type:");
		var pos = newUserOut.search("Loan Type:");
		//hopefully just the loans now
		newUserOut = newUserOut.slice(pos, grantPos)

		while (newUserOut.length > 0) {
			var lastPos = newUserOut.lastIndexOf("Loan Type:");
			parsedLoans.push(newUserOut.slice(lastPos, newUserOut.length));
			newUserOut = newUserOut.slice(0, lastPos);
		}
		//console.log('parsed loans: ' + parsedLoans)
		return parsedLoans;
	};
	

	const createLoans = () => {
		//console.log('create loans')
		const newLoans = fileParser();
		const title= 'Loan Amount:$'
		const interest = 'Loan Interest Rate:'

		for(let i =1; i <= newLoans.length; i++){
			let loan = newLoans[i]
			let goalTitle=loan.substring(loan.indexOf(title)+title.length,loan.indexOf('Loan Disbursed Amount:'))
			//console.log("goalTitle: " + goalTitle)
			let interestRate = loan.substring(loan.indexOf(interest)+interest.length,loan.indexOf('Loan Repayment Plan Type')-1)
			//console.log("Interest rate: "+ interestRate)
			let years = 10
			let paidOff = 50
			setGoalCounter(goalCounter+1)
			let id =i
			addGoalHandler(goalTitle,interestRate,years,paidOff,id)
		}
		return
    
	};
	

	useEffect(() => {
		getPW()
<<<<<<< HEAD
		/*
		async function letsDoThis(){
			setUserOut(await FileSystem.readAsStringAsync(input.uri))
		}
		letsDoThis()
		*/
		
		console.log('use effect')
=======
		//console.log('use effect')
>>>>>>> rain
		let isMounted = true;

		if (isMounted) {
			loansRef.doc(userId).onSnapshot(
				(docSnapshot) => {
					if(!docSnapshot.exists){console.log('doc doesnt exist, start from scratch')}
					else{
						console.log('loaded successfully '+JSON.stringify(docSnapshot.data().goals))
						setCourseGoals(docSnapshot.data().goals)
						setGoalCounter(docSnapshot.data().goals.length)
					}
				},
				(error) => {
					console.log(JSON.stringify(error));
				}
			);
		}
		return () => {
			isMounted = false;
		};
	}, []);

	const addGoalHandler = async (goalTitle, interestRate, years, paidOff,id) => {
		//console.log('add goal handler')
		if(id==undefined){
			id = 0
		}
		//console.log('num1: '+ (goalCounter+id).toString())
		//console.log(goalCounter)
		setGoalCounter(goalCounter+1)
		setCourseGoals((courseGoals) => [
			...courseGoals,
			{
				//id: userId + (goalCounter+id).toString(),
				id: userId + (Math.floor(Math.random() * 900000)).toString(),
				value: goalTitle,
				interest: interestRate,
				years: years,
				paidOff: paidOff
			}
		]);
		//console.log(goalCounter)
		await addToFB(goalTitle, interestRate,years,paidOff,id)
		setIsAddMode(false);
	}

	const cancelGoalAdditionHandler = () => {
		setIsAddMode(false);
	}

	
	const addToFB = async (goalTitle, interestRate, years, paidOff,id) => {
		//adding data to firebase, takes into account if doc exists already
		if(id===undefined){
			id = 0
		}
		//console.log('add to firebase')
		const loadDoc = await loansRef.doc(userId).get();
		if(loadDoc.exists){
			//console.log('num2: '+ (goalCounter+id).toString())
			await loansRef.doc(userId).update({
				goals: firebase.firestore.FieldValue.arrayUnion({
				//id: userId+(goalCounter+id).toString(),
				id: userId + (Math.floor(Math.random() * 900000)).toString(),
				value: goalTitle,
				interest: interestRate,
				years: years,
				paidOff: paidOff
				})
			})
		}
		else{
			//console.log('num3: '+ (goalCounter+id).toString())
			await loansRef.doc(userId).set({
				goals: firebase.firestore.FieldValue.arrayUnion({
				//id: userId+(goalCounter+id).toString(),
				id: userId + (Math.floor(Math.random() * 900000)).toString(),
				value: goalTitle,
				interest: interestRate,
				years: years,
				paidOff: paidOff
				})
			})
		}
	}

	const removeGoalHandler = async (goalId) => {
		//console.log('remove goal handler')
		const existingDoc = await loansRef.doc(userId).get();
    	const goals = existingDoc.data().goals.filter(goal => goal.id !== goalId);
    	await loansRef.doc(userId).update({ goals });
	}

	const editLoan = async (goalId) => {
		const existingDoc = await loansRef.doc(userId).get();
		//setIsEditMode(true)
		const goals = existingDoc.data().goals
		//console.log('now i have goals: '+ goals)
		var theOne = {}
		for(let i =0; i < goals.length;i++){
			if(goals[i].id == goalId){
			  theOne = goals[i]
			}
		}
		props.navigation.navigate('EditLoan',{theOne,userId})
		//console.log('done boi')
	}


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
				Loans
			</Text> 

			<View style={{ padding: 20, marginTop: 15 }}>

				<Text style={styles.title}>Total Loans:</Text>

				<FlatList
				keyExtractor={(item, index) => item.id}
				data={courseGoals}
				renderItem={(itemData) => (
					addNewLoan(itemData.item.value, itemData.item.paidOff, allLoans)
				)}/>

				<Text style={{
						fontSize: 16,
						color: 'black',
						textAlign: 'left',
						paddingTop: 15,
						marginLeft: 5}}> 
					${totalLoan} 
				</Text>

				<View style={{paddingBottom: 15}}>
				</View>
			
				<Text style={styles.title}>Loans:</Text>

				<View style={{paddingBottom: 15}}>
				</View>

				<GoalInput visible={isAddMode} addGoalHandler={addGoalHandler} onCancel={cancelGoalAdditionHandler} />
				<FlatList
					keyExtractor={(item, index) => item.id}
					data={courseGoals}
					renderItem={(itemData) => (
						<GoalItem
							onDelete={removeGoalHandler.bind(this, itemData.item.id)}
							onEdit = {editLoan.bind(this,itemData.item.id)}
							title={itemData.item.value}
							subInterest={itemData.item.interest}
							subPaid={itemData.item.paidOff}
							subYears={itemData.item.years}
						/>
					)}
				/>
				<Button title="Add New Loan" onPress={() => setIsAddMode(true)} />

				<View style={{paddingBottom: 10}}>
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

				<TouchableOpacity title= 'Upload Doc' onPress={pickDocument}>
					<Text style={{
						fontWeight: 'bold',
						fontSize: 20,
						color: '#426FFE',
						textAlign: 'center',
						paddingTop: 20
					}}>
						Upload Document
					</Text>
				</TouchableOpacity>

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
        paddingTop: 55,
        color: '#426FFE'
      },
	title: {
		//color: '#35CA96',
		fontSize: 20,
		marginLeft:5,
		fontWeight: 'bold',
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
//onDelete={removeGoalHandler.bind(this, itemData.item.id)}
//<EditGoalInput visible={isEditMode} editGoalHandler={editGoalHandler} onCancel={cancelGoalEditHandler} />

export default HomeScreen;


