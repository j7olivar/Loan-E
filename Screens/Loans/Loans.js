import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from './../../components/GoalItem';
import GoalInput from './../../components/GoalInput';
import Header from './../../components/Header'
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import {firebase} from './../../Constants/ApiKeys'
import {NavigationActions} from '@react-navigation'
=======
>>>>>>> parent of d164016a... before meeting #2
=======
>>>>>>> parent of d164016a... before meeting #2
=======
>>>>>>> parent of d164016a... before meeting #2


export default function Loans(props) {
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

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
  const onLogoutPress = () =>{
    firebase
      .auth()
      .signOut()
      .then(() => {
        //console.log('pressed it')
        props.navigation.navigate('Login',)
        props.extraData[1](null)
        //console.log(props.extraData[1](null))
        //props.navigation.reset({index:0, routes:[{name:'Login'}]})
      })
      .catch(error => {
        alert(error)
      })
  }
    
=======
>>>>>>> parent of d164016a... before meeting #2
=======
>>>>>>> parent of d164016a... before meeting #2
=======
>>>>>>> parent of d164016a... before meeting #2
  const cancelGoalAdditionHandler = () =>{
    setIsAddMode(false);

  }

  const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals=>{
            return currentGoals.filter(goal => goal.id !== goalId)
        })
   }

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