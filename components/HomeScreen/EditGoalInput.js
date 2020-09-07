import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Modal} from 'react-native'
import { firebase } from '../../Constants/ApiKeys';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EditGoalInput = props => {
    const {theOne} = props.route.params
    
    const [enteredGoal, setEnteredGoal] = useState(theOne.value)
    const [interestRate, setInterestRate] = useState(theOne.interest)
    const [paid, setPaid] = useState(theOne.paidOff.toString())
    const [years, setYears] = useState(theOne.years.toString())
    
    
	const loansRef = firebase.firestore().collection('goals');

    const goalInputHandler = (enteredText) => {
        if(enteredText !==enteredGoal ){
          setEnteredGoal(enteredText)
        }
        
      }    

      const interestInputHandler = (enteredText) =>{
        if(enteredText !==interestRate ){
          setInterestRate(enteredText)
        }
      }

      const yearsInputHandler = (enteredText) =>{
        if(enteredText !==years ){
          setYears(enteredText)
        }
        
      }
      const paidInputHandler = (enteredText) =>{
        if(enteredText !==paid){
          setPaid(enteredText)
        }
      }

      const editGoalHandler = async () =>{
        const {userId} = props.route.params
        console.log(userId)
        const existingDoc = await loansRef.doc(userId).get();
        const goals = existingDoc.data().goals
        const newGoals = goals.slice()
        //time to replace the old goal with new one
        for(let i =0; i < goals.length;i++){
          if(goals[i].id == theOne.id){
            console.log('doing this bro');
            newGoals[i] = {
              id: theOne.id,
              value: enteredGoal,
              interest: interestRate,
              years: years,
              paidOff: paid
            }
          }
        }
        //rewrite to firestore
        await loansRef.doc(userId).update({goals:newGoals})
        console.log('did this')
        //now can go back to home screen
        props.navigation.goBack()
      }

      //const 

    return(
      <Modal visible= {props.visible} animationType="slide">

      <View style={styles.inputContainer}>

  
        <Text style={styles.formatText}>Loan Amount: </Text>
        <TextInput
          placeholder= {enteredGoal}
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}/>

        <Text style={styles.formatText}>Interest Rate: </Text>
         <TextInput 
          placeholder={interestRate}
          style={styles.input}
          onChangeText={interestInputHandler}
          value={interestRate}
         />  

        <Text style={styles.formatText}>Number of Years: </Text>
        <TextInput 
          placeholder={years}
          style={styles.input}
          onChangeText={yearsInputHandler}
          value={years}
         />  

        <Text style={styles.formatText}>Paid So Far: </Text>
          <TextInput 
          placeholder={paid}
          style={styles.input}
          onChangeText={paidInputHandler}
          value={paid}
         />
     
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={editGoalHandler}>          
              <Text style={styles.appButtonText}>Update</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button1} onPress={() => props.navigation.goBack()}>
              <Text style={styles.appButtonText}>Cancel</Text> 
            </TouchableOpacity>   
          </View>

    </View>
    </Modal>
)
}

const styles = StyleSheet.create({
/*inputContainer: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginBottom: 10,
    marginVertical:10
  },
  /*input: {
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#e7e7e7',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 20,
    color: 'black',
  },*/
  inputContainer: {
    flex:1,
    justifyContent: 'center',
    //padding: 30,
    marginBottom: 10,
    marginVertical:10
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#e7e7e7',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,  
    marginRight: 30,
    paddingLeft: 16,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: "space-between",
    width: '100%',
    alignItems: 'center',
  },
  button: {
    height: 48,
    borderRadius:5,
    overflow: 'hidden',
    backgroundColor: '#426FFE',
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    //paddingLeft: 50,
    //paddingRight: 25,
    //padding: 20,
    paddingLeft: 35,
    paddingRight: 35
  },
  button1:{
    height: 48,
    borderRadius:5,
    overflow: 'hidden',
    backgroundColor: '#ff443a',
    marginTop: 25,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    //paddingLeft: 50,
    //paddingRight: 25,
    //padding: 20,
    paddingLeft: 35,
    paddingRight: 35
  },  
  appButtonText: {
    fontSize: 16,
    marginTop: 13,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
  formatText: {
    paddingTop: 25,
    //textAlign: 'center',
    textAlign: 'left',
    marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#426FFE'
  },
  appButtonText: {
    fontSize: 16,
    marginTop: 13,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
  },
})

export default EditGoalInput