import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, ScrollView, View } from 'react-native'
import styles from './LoanCalculatorStyles.js'
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function LoanCalculatorScreen({navigation}) {
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);

    const onFooterLinkPress = () => {
        navigation.navigate('Calculator Results', {months: months, interestRate: interestRate, loanAmount: loanAmount})
    }

    function getMonthlyPayments(months, interestRate, loanAmount){
        var monthlyIR = (interestRate * .01)/12;
        
        var term1 = Math.pow((1 + monthlyIR), months) - 1;
        var term2 = monthlyIR * Math.pow((1 + monthlyIR), months);
        var monthlyPayments = loanAmount/(term1 / term2);

        return monthlyPayments.toFixed(2);
    }

    return(
        <ScrollView style={{backgroundColor: 'white', flex: 1}}>
            <Text style={styles.formatText}>
                Loan Amount
            </Text>

            <TextInput placeholder ="$"
            style={styles.input} 
            onChangeText ={loanAmount => setLoanAmount(loanAmount)}/>

            <Text style={styles.formatText}>
                Loan Term
            </Text>

            <TextInput placeholder="Years"
             style={styles.input} 
             onChangeText ={ months => setMonths((parseInt(months, 10) * 12).toString())}
             defaultValue ={years}/>

            <TextInput 
            placeholder="Months" 
            style={styles.input} 
            onChangeText ={ years => setYears((parseInt(years, 10) / 12).toString())}
            defaultValue ={months}/>

            <Text style={styles.formatText}>
                Interest Rate
            </Text>

            <TextInput placeholder="%"
             style={styles.input}
             onChangeText ={interestRate => setInterestRate(interestRate)}/>

            <TouchableOpacity onPress={onFooterLinkPress} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>
                    Calculate
                </Text>     
            </TouchableOpacity>
                
                    
        </ScrollView>
    )
}

