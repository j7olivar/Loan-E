import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, ScrollView, View, ImageBackground } from 'react-native'
import styles from './styles.js'

export default function LoanHomeScreen({navigation}){
    
    
    return(
    <ScrollView>
        
        <View style={styles.loanBoxes}>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loanInside1}>Loan Name</Text>
                <Text style={styles.loanInside2}>$#####.##</Text>
            </View>
            
            <Text style={{
                textAlign: 'center',
            }}>
                ___________________________________________________
            
            </Text>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loanInside3}>Payments Left: ## </Text>
                <Text style={styles.loanInside4}>Payment: $###.##</Text>
            </View>

            

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loanInside5}>Interest Rate: #.##% </Text>
                <Text style={styles.loanInside6}>Paid: $####.##</Text>
            </View>
        
        </View>

        <View style={styles.loanBoxes}>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loanInside1}>Loan Name</Text>
                <Text style={styles.loanInside2}>$#####.##</Text>
            </View>
            
            <Text style={{
                textAlign: 'center',
            }}>
                ___________________________________________________
            
            </Text>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loanInside3}>Payments Left: ## </Text>
                <Text style={styles.loanInside4}>Payment: $###.##</Text>
            </View>

            

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.loanInside5}>Interest Rate: #.##% </Text>
                <Text style={styles.loanInside6}>Paid: $####.##</Text>
            </View>
        </View>

        <Button title='Add Loan'/>

    </ScrollView>)
}