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
        <View style={{backgroundColor: '#060320', flex: 1}}>
            <Text style={styles.monthlyPayments}>
                    Montly Payments
                </Text>
                
                <Text style={{
                    textAlign: 'center',
                    fontSize: 50,
                    paddingTop: 30,
                    fontWeight: 'bold',
                    color: '#32c090'
                }}>
                    ${getMonthlyPayments(months, interestRate, loanAmount)}
                </Text>
                
                <View style={{flexDirection: 'row'}}>

                    <Text style={{
                        fontSize: 25,
                        paddingTop: 40,
                        paddingLeft: 20,
                        fontWeight: 'bold',
                        color: '#32c090'
                    }}> 
                        Total Paid    
                    </Text>

                    <Text style={{
                        fontSize: 25,
                        paddingTop: 40,
                        paddingLeft: 150,
                        fontWeight: 'bold',
                        color: '#32c090'
                    }}>
                        ${getTotalPaid(months, interestRate, loanAmount)}
                    </Text>
                </View>

                <Text style={{
                    textAlign: 'center',
                    color: '#32c090'
                }}>
                    ___________________________________________________________
                </Text>

                <View style={{flexDirection: 'row'}}>

                    <Text style={{
                        fontSize: 25,
                        paddingTop: 15,
                        paddingLeft: 20,
                        fontWeight: 'bold',
                        color: '#32c090'
                    }}> 
                        Total Interest   
                    </Text>

                    <Text style={{
                        fontSize: 25,
                        paddingTop: 15,
                        paddingLeft: 112,
                        fontWeight: 'bold',
                        color: '#32c090'
                    }}>
                        ${getInterestPaid(months, interestRate, loanAmount)}
                    </Text>
                </View>
            </View>
    )
}