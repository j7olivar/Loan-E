import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity} from 'react-native'

const GoalInput = props => {

    const [enteredGoal, setEnteredGoal] = useState('')
    const [interestRate, setInterestRate] = useState('')
    const [paid, setPaid] = useState('')
    const [years, setYears] = useState('')


    const goalInputHandler = (enteredText) => {
        setEnteredGoal(enteredText)
      }    

      const interestInputHandler = (enteredText) =>{
        setInterestRate(enteredText)
      }

      const yearsInputHandler = (enteredText) =>{
        setYears(enteredText)
      }
      const paidInputHandler = (enteredText) =>{
        setPaid(enteredText)
      }

      const addGoalHandler = () =>{
        props.addGoalHandler(enteredGoal, interestRate, years, paid)
        setEnteredGoal("")
      }

      //const 

    return(
      <Modal visible= {props.visible} animationType="slide">

      <View style={styles.inputContainer}>


        <Text style={styles.formatText}>Loan Amount: </Text>
        <TextInput
          placeholder="$"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}/>

        <Text style={styles.formatText}>Interest Rate: </Text>
         <TextInput 
          placeholder="%"
          style={styles.input}
          onChangeText={interestInputHandler}
          value={interestRate}
         />  

        <Text style={styles.formatText}>Number of Years: </Text>
        <TextInput 
          placeholder="Years"
          style={styles.input}
          onChangeText={yearsInputHandler}
          value={years}
         />  

        <Text style={styles.formatText}>Paid So Far: </Text>
          <TextInput 
          placeholder="Paid"
          style={styles.input}
          onChangeText={paidInputHandler}
          value={paid }
         />
     
          <View style={styles.buttons}>
            <TouchableOpacity style={styles.button} onPress={addGoalHandler} >
              <Text style={styles.appButtonText}>Add</Text>
            </TouchableOpacity>   
            <TouchableOpacity style={styles.button1} onPress={props.onCancel} >          
              <Text style={styles.appButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
          
    </View>
    </Modal>
)
}

const styles = StyleSheet.create({
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
  button:{
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
})

export default GoalInput