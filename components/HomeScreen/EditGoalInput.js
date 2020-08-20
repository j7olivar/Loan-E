import React, {useState} from 'react'
import {View, Text, TextInput, Button, StyleSheet, Modal} from 'react-native'


const EditGoalInput = props => {
    const {theOne} = props.route.params
    const [enteredGoal, setEnteredGoal] = useState(theOne.value)
    const [interestRate, setInterestRate] = useState(theOne.interest)
    const [paid, setPaid] = useState(theOne.paidOff.toString())
    const [years, setYears] = useState(theOne.years.toString())
    
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

      const editGoalHandler = () =>{
        
        //props.addGoalHandler(enteredGoal, interestRate, years, paid)
        //setEnteredGoal("")
        console.log('in here')
        props.navigation.goBack()
      }

      //const 

    return(
      <Modal visible= {props.visible} animationType="slide">

      <View style={styles.inputContainer}>

  
        <Text> Loan Amount </Text>
        <TextInput
          placeholder= {enteredGoal}
          style={styles.input}
          onChangeText={goalInputHandler}
          value={enteredGoal}/>

        <Text> Interest Rate: </Text>
         <TextInput 
          placeholder={interestRate}
          style={styles.input}
          onChangeText={interestInputHandler}
          value={interestRate}
         />  

        <Text> Number of Years </Text>
        <TextInput 
          placeholder={years}
          style={styles.input}
          onChangeText={yearsInputHandler}
          value={years}
         />  

        <Text> Paid So Far: </Text>
          <TextInput 
          placeholder={paid}
          style={styles.input}
          onChangeText={paidInputHandler}
          value={paid}
         />
     
          <View style={styles.buttons}>
            <View style={styles.button}>
              <Button title="CANCEL" color="red" onPress={props.navigation.goBack()} />
            </View>   
            <View style="button">          
              <Button title="Update" onPress={() => editGoalHandler()} />
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

export default EditGoalInput