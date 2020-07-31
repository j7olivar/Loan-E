import 'react-native-gesture-handler'
import React, { useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native'
import { StyleSheet, Text, View, TextInput, Button, Modal, ScrollView, FlatList } from 'react-native';
import GoalItem from '../../components/GoalItem';
import GoalInput from '../../components/GoalInput';
import {firebase} from '../../Constants/ApiKeys'


export default function Loans(props) {
  const [courseGoals, setCourseGoals] = useState([])
  const[isAddMode, setIsAddMode] = useState(false);

  const userId = props.extraData.id
  //create new collection
  const loansRef = firebase.firestore().collection('goals')

  useEffect(() => {
    let isMounted = true

    if(isMounted){
      loansRef 
      .where('authorID', '==', userId)
      .orderBy("createdAt", 'desc')
      .onSnapshot(
        querySnapshot => {
          const newGoals = []
          querySnapshot.forEach(doc => {
            const goal = doc.data()
            goal.id = doc.id
            newGoals.push(goal)
          })
          setCourseGoals(newGoals)
        },
        error => {
          console.log(error)
        }
      )
    }
    return () => {isMounted = false}
    
  }, [])

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
    //time to save it to firebase
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    const data = {goals: courseGoals, authorID: userId, createdAt: timestamp}
    loansRef
      .add(data)
      .catch((error) => {alert(error)})
    setIsAddMode(false)
  }

  const onLogoutPress = () =>{
    firebase
      .auth()
      .signOut()
      .then(() => {
        props.navigation.navigate('Login',)
        props.navigation.reset({index:0, routes:[{name:'Login'}]})
      })
      .catch(error => {
        alert(error)
      })
  }
    
  const cancelGoalAdditionHandler = () =>{
    setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
        setCourseGoals(currentGoals=>{
            return currentGoals.filter(goal => goal.id !== goalId)
        })
        //delete loan from database
        firebase.database().ref(goalId).remove()
   }

  return (
    <View style={{ flex:1 ,backgroundColor: '#060320'}} >

      <View style={{ position:'absolute', bottom:20, left:150}}>
      <TouchableOpacity
        style = {styles.button}
        onPress={()=>onLogoutPress()}>
        <Text style={{color:'red', fontSize:23}}> Logout </Text>
        </TouchableOpacity>
      </View>

      <View style ={{position:'absolute', left:300, top:10}}>
      <TouchableOpacity
        style = {styles.newLoanButton}
        onPress={()=>setIsAddMode(true)}>
        <Text style ={{color:'#35CA96', fontWeight:'bold',fontSize:20}}> +</Text>
      </TouchableOpacity>
      </View>

      <View style={{justifyContent:"flex-start", position: 'absolute', top:10, left:4}}>
        <Text style = {styles.title}> LOANS: </Text>    
      </View>

      <View style={{marginTop:55}}>
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
      </View>
      </View>
   
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color:'white',
    width:100,
    alignContent:'flex-start'
  },
  button: {
    backgroundColor: 'rgba(52, 52, 52, 0.4)',
    marginTop:3,
    height: 50,
    width: 150,
    borderRadius: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  newLoanButton:{
    marginBottom:570,
    alignItems:'flex-end'
  },
});