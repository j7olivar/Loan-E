import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';
import Header from './components/Header'
<<<<<<< HEAD
import LogIn from './pages/LogIn'
import Loans from './pages/Loans'
import ApiKeys from './Constants/ApiKeys'
import * as firebase from 'firebase'

export default function App(){
  const [name,setName]= useState('')
  
   //makes sure firebase wasnt intialized before so it doesnt call it again
   //and give an error 
  if(!firebase.apps.length){
      //this is where we setup firebase and call it the first time  
      firebase.initializeApp(ApiKeys.FirebaseConfig)
  }

  function componentDidMount(){
    this.authListener()
  }

  //for loggining to the app/ when authenication state changes
  function authListener(){
    firebase.auth().onAuthStateChanged((user) => {
      //when logging in
      if(user){
        setName(user)
      }
      //when logging out
      else{
        setName(null)
      }
    })
  }
  //this is going to hold our screens
  const Stack = createStackNavigator()

  //this is where we decide where to send them,
  //either to the login screen or the home screen

  return(
    <View>
      { {name} ? (<Loans/>) : (<LogIn/>)}
    </View>
    
  ) 

=======

export default function App() {

  
  const [courseGoals, setCourseGoals] = useState([])
  const[isAddMode, setIsAddMode] = useState(false);
 
  const addGoalHandler = (goalTitle, interestRate, years, paidOff) => {
    //setCourseGoals([...courseGoals, enteredGoal])
    setCourseGoals(prevGoals => [
      ...courseGoals,
       {id: Math.random().toString(), 
          value: goalTitle, 
          interest: interestRate,
          years: years,
          paidOff: paidOff 
        }
      ])
    
    setIsAddMode(false)
  }

  const cancelGoalAdditionHandler = () =>{
    setIsAddMode(false);

  }

  const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals=>{
            return currentGoals.filter(goal => goal.id !== goalId)
        })}

  return (

    <View style={styles.screen} >

        <Header title="Student Loan Calculator"/>
    
      <View style= {{padding:20}}> 
      <Text style = {styles.title}> LOANS: </Text>
      
      <GoalInput visible={isAddMode}
        addGoalHandler={addGoalHandler} 
        onCancel={cancelGoalAdditionHandler}
      />

      <FlatList 
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={itemData => (
        <GoalItem
          onDelete={removeGoalHandler.bind(this, itemData.item.id)} 
          title={itemData.item.value}
          subInterest={itemData.item.interest}
          subPaid={itemData.item.paidOff}
          subYears={itemData.item.years}
          />)}
      />
      <Button title="Add New Loan" onPress={() => setIsAddMode(true)}/>
      </View>
    </View >
   
  )
>>>>>>> parent of 9f5d05c1... Installed firebase and the api keys on App.js
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
  
});
