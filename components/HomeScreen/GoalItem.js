import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import {Swipeable} from 'react-native-gesture-handler'

const GoalItem = props =>{

  const LeftItem = (progress, dragX) => {
    /*
    const scale = dragX.interpolate({
      inputRange: [0,100],
      outputRange: [0,1],
      extrapolate:'clamp'
    })
    */
  
    return (
      <View style = {styles.leftItem}>
        <TouchableOpacity onPress = {props.onEdit}>
          <Text style={styles.leftItemText}>Edit</Text>
        </TouchableOpacity>
      </View>
    )
  }
  
  const RightItem = (progress, dragX) => {
    /*
    const scale = dragX.interpolate({
      inputRange: [-100,0],
      outputRange: [1,0],
      extrapolate:'clamp'
    })
    */
   
    return (
      <View style = {styles.rightItem}>
        <TouchableOpacity style = {styles.deleteButton} onPress= {props.onDelete}>
          <Text style={styles.rightItemText}>Delete</Text>
        </TouchableOpacity>
        
      </View>
    )
  }


    return(
      <Swipeable
        onSwipeableLeftOpen = {() => console.log('Swiped left')}
        onSwipeableRightOpen = {() => console.log('Swiped right')}
        renderLeftActions = {(progress, dragX)=> (
          <LeftItem progress={progress} dragX={dragX}/>)}
        renderRightActions = {(progress, dragX)=> (
          <RightItem progress={progress} dragX={dragX} />)}>
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
       </Swipeable>)
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
      },
      leftItem: {
        padding: 10,
        marginVertical: 10,
        backgroundColor: '#32c090',
        justifyContent: 'center',
      },
      leftItemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft:20,
        color: '#fff',
      },
      rightItemText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight:15,
        color: '#fff',
      },
      rightItem: {
        marginVertical: 10,
        backgroundColor: '#ff392e',
        justifyContent: 'center',
      },
      deleteButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#c00000',
      },
})
 //<TouchableOpacity onPress={props.onDelete}>
export default GoalItem;

