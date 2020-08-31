import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ThemeSwitch from "./ThemeSwitch";
import NotificationSwitch from './NotificationSwitch'
import { Colors } from './Colors1'
import Icon from "react-native-vector-icons/MaterialIcons";
import LogOut from './LogOut';
import DeleteAccount from './DeleteAccount'


function Settings() {
    return (
        <View style={{backgroundColor: 'white'}}>

            <View style={{paddingBottom: 15}}>
            </View>
            
            <ThemeSwitch />
            {/* <NotificationSwitch /> */}

            <View style={{paddingBottom: 5}}>
            </View>

            <View style={styles.box}>
                <Text style={styles.text}>Bank Account</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>
            
            <View style={styles.box}>
                <Text style={styles.text}>Feedback Form</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>
            <View style={styles.box}>
                <Text style={styles.text}>Replay Tutorial</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>

            <View style={{paddingBottom: 150}}>
            </View>
            
            <LogOut />

            <DeleteAccount />

            <View style={styles.box}>
            </View>

        </View>
    )
}



const styles = StyleSheet.create({
    
    box: {
      flexDirection: 'row',
      justifyContent:'space-between',
      height:65,
      paddingLeft:22,
      paddingRight:18,
      marginBottom: 6.7,
      alignItems:'center',
    },
    delete: {
        color: '#ff443a',
        fontWeight: 'bold',
        fontSize: 16
    },
    text: {
        fontSize: 15
    },
    
    
})

export default Settings;