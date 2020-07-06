import React from 'react'
import {View, Text, StyleSheet, Touchable, TouchableOpacity, TouchableHighlight} from 'react-native'

const GoalItem = props =>{
    return(
       <TouchableOpacity onPress={props.onDelete}>
      <View style={styles.listItem} >
          <View style={styles.main}>
            <Text style={styles.title}> ${props.title} </Text>
          </View>
          <View style={styles.sub}>
            <Text> {props.subInterest}% 
            </Text>
            <Text> , {props.subYears} Years, </Text>
            <Text> Paid Off: ${props.subPaid} </Text>
          </View>
       </View>
       </TouchableOpacity>)
}

const styles = StyleSheet.create({
    listItem: {
        
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#ccc',
        borderColor: 'black',
        borderWidth:1,
      },
      sub: {
        flexDirection: "row",
        flex: 1
      },
      main:{
        
       flex: 2
      },
      title:{
        fontSize: 18
      }
})

export default GoalItem;

