import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ThemeSwitch from "./ThemeSwitch";
import NotificationSwitch from './NotificationSwitch'
import { Colors } from './Colors1'
import Icon from "react-native-vector-icons/MaterialIcons";
import LogOut from './LogOut'


function Settings() {
    return (
        <View>
            <ThemeSwitch />
            <NotificationSwitch />

            <View style={styles.box}>
                <Text>Export to CSV</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>
            
            <View style={styles.box}>
                <Text>Bank Account</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>
            
            <View style={styles.box}>
                <Text>Anonymous Data</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>
            <View style={styles.box}>
                <Text>Replay Tutorial</Text>
                <Icon 
                name={'keyboard-arrow-right'} 
                size={30} 
                color={Colors.DARKGRAY} 
                />
            </View>
            
            <LogOut />

            <View style={styles.box}>
                <Text style={styles.delete}>
                    Delete Account
                </Text>
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
      alignItems:'center',
    },
    delete: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 18
    }
})

export default Settings;