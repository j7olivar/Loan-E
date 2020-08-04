import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Modal} from 'react-native'

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

  
        <Text> Loan Amount </Text>
        <TextInput
          placeholder="Loan Amount"
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}/>

        <Text> Interest Rate: </Text>
         <TextInput 
          placeholder="Interest Rate"
          style={styles.input}
          onChangeText={interestInputHandler}
          value={interestRate}
         />  

        <Text> Number of Years </Text>
        <TextInput 
          placeholder="Number of Years"
          style={styles.input}
          onChangeText={yearsInputHandler}
          value={years}
         />  

        <Text> Paid So Far: </Text>
          <TextInput 
          placeholder="Paid So Far"
          style={styles.input}
          onChangeText={paidInputHandler}
          value={paid }
         />
     
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="CANCEL" color="red" onPress={props.onCancel} />
            </View>   
            <View style="button">          
              <Button title="ADD" onPress={addGoalHandler} />
            </View>
      </View>
    </View>
    </Modal>
)
}

const styles = StyleSheet.create({
inputContainer: {
  flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
    marginBottom: 10,
    marginVertical:10
  },
  input: {
    borderColor: 'black',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    width: '80%'
  },
  buttons: {
      flexDirection: 'row-reverse',
      justifyContent: "space-between",
      width: '60%',
  },
  button:{
    width: '40%'
  }
})

export default GoalInput