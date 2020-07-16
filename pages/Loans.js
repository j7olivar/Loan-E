import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from './../components/GoalItem';
import GoalInput from './../components/GoalInput';
import Header from './../components/Header'
import ApiKeys from './../Constants/ApiKeys'
import * as firebase from 'firebase'
import 'react-native-gesture-handler'
import {NavigationContainer, createStackNavigator} from 'react-navigation'

export default function Loans(){
    const [courseGoals, setCourseGoals] = useState([])
    const [isAddMode, setIsAddMode] = useState(false);

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
        })
    }
      
    return (
    
        <View style={styles.screen}>
      
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
          <StatusBar style="auto"></StatusBar>
          </View>
    </View >)
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
  