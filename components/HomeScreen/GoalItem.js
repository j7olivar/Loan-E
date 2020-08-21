import React from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'
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
        <TouchableOpacity onPress= {props.onDelete}>
          <Text style={styles.rightItemText}>Delete</Text>
        </TouchableOpacity>
        
      </View>
    )
  }


    return(
      <Swipeable
        //onSwipeableLeftOpen = {() => console.log('Swiped left')}
        //onSwipeableRightOpen = {() => console.log('Swiped right')}
        renderLeftActions = {(progress, dragX)=> (
          <LeftItem progress={progress} dragX={dragX}/>)}
        renderRightActions = {(progress, dragX)=> (
          <RightItem progress={progress} dragX={dragX} />)}>
      <View style={styles.listItem} >
          <View style={styles.main}>
            <Text style={styles.title}> ${props.title} </Text>
          </View>
          <View style={styles.sub}>
            <Text style={{color:'white'}}> {props.subInterest}% 
            </Text>
            <Text style={{color:'white'}}> , {props.subYears} Years, </Text>
            <Text style={{color:'white'}}> Paid Off: ${props.subPaid} </Text>
          </View> 
       </View>
       </Swipeable>)
}


const styles = StyleSheet.create({
    listItem: {
        padding: 2,
        flex: 2,
        height:60,
        width:Dimensions.get('window').width - 40,
        borderRadius:8,
        marginVertical: 3,
        backgroundColor: 'blue',
        //borderColor: 'black',
        //borderWidth:1,
        opacity:0.8
      },
      sub: {
        flexDirection: "row",
        flex: 2,
        color:'white'
      },
      main:{
       flex: 2
      },
      title:{
        fontSize: 18,
        color:'white'
      },
      leftItem: {
        borderRadius:8,
        marginVertical: 3,
        flex:1,
        backgroundColor: '#32c090',
        justifyContent: 'center',
      },
      leftItemText: {
        fontSize: 20,
        fontWeight: 'bold',
        //marginLeft:20,
        justifyContent: 'center',
        alignSelf:'center',
        color: '#fff',
      },
      rightItemText: {
        fontSize: 20,
        fontWeight: 'bold',
        //marginRight:-20,
        justifyContent: 'center',
        alignSelf:'center',
        color: '#fff',
      },
      rightItem: {
        borderRadius:8,
        marginVertical: 3,
        flex: 1,
        backgroundColor: '#ff392e',
        justifyContent: 'center',
      },
      deleteButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //flex: 1,
        backgroundColor: '#ff392e',
      },
})
 //<TouchableOpacity onPress={props.onDelete}>
export default GoalItem;

