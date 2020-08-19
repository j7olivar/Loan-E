import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, ScrollView, View } from 'react-native'
import styles from './LoanCalculatorStyles.js'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function LoanCalculatorResults({route, navigation}) {

    const { months } = route.params
    const { interestRate } = route.params
    const { loanAmount } = route.params

    function getMonthlyPayments(months, interestRate, loanAmount){
        var monthlyIR = (interestRate * .01)/12;
        
        var term1 = Math.pow((1 + monthlyIR), months) - 1;
        var term2 = monthlyIR * Math.pow((1 + monthlyIR), months);
        var monthlyPayments = loanAmount/(term1 / term2);

        return monthlyPayments.toFixed(2);
    }

    function getTotalPaid(months, interestRate, loanAmount){
        var monthlyPayment = getMonthlyPayments(months, interestRate, loanAmount);
        var totalPaid = monthlyPayment * months;
        return totalPaid.toFixed(2); 
    }

    function getInterestPaid(months, interestRate, loanAmount){
        var monthlyPayment = getMonthlyPayments(months, interestRate, loanAmount);
        var interestPaid = (monthlyPayment * months) - loanAmount;
        return interestPaid.toFixed(2); 
    }

    return(
        <View style={{backgroundColor: 'white', flex: 1}}>


                <View style={styles.monthBox}>

                    <Text style={styles.monthlyPayments}>
                            Monthly Payments
                    </Text>
                        
                    <Text style={{
                            textAlign: 'center',
                            fontSize: 22,
                            paddingTop: 15,
                            //fontWeight: 'bold',
                            //marginLeft: 30,
                            //color: '#32c090'
                            }}>
                        ${getMonthlyPayments(months, interestRate, loanAmount)}
                    </Text>
                </View>

                <View style={{marginBottom: 60,}}>
                </View>


                <View style={{flexDirection: 'row'}}>

                    <View style={{flexDirection: 'column'}}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            color: '#426FFE',
                            textAlign: 'center',
                            marginLeft: 50
                        }}> 
                            Total Paid    
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            paddingTop: 30,
                            textAlign: 'center',
                            marginLeft: 50
                        }}>
                            ${getTotalPaid(months, interestRate, loanAmount)}
                        </Text>   
                    </View>

                     
                    <View style={{
                        marginLeft: 47,
                        borderLeftWidth: 1,
                        borderLeftColor: 'grey',
                        }}>
                    </View>
                    

                    <View style={{flexDirection: 'column'}}>
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 31,
                            fontWeight: 'bold',
                            color: '#426FFE'
                        }}> 
                            Total Interest   
                        </Text>
                        <Text style={{
                            fontSize: 20,
                            marginLeft: 31,
                            textAlign: 'center',
                            paddingTop: 30
                        }}>
                            ${getInterestPaid(months, interestRate, loanAmount)}
                        </Text>
                    </View>
                    
                </View>


        </View>
    )
}

