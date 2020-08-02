import React, { useEffect, useState } from 'react'
import { Text, TextInput, Button, ScrollView, View } from 'react-native'
import styles from './LoanCalculatorStyles.js'


export default function LoanCalculatorScreen({navigation}) {
    const [years, setYears] = useState(0);
    const [months, setMonths] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(0);

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
        <ScrollView>
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

            <Button style={{paddingTop: 50}} 
            title="Calculate"
            />

            <Text style={{
                textAlign: 'center',
                paddingTop: 30
            }}>
                _________________________________________________________________
            </Text>

            <Text style={styles.monthlyPayments}>
                Montly Payments
            </Text>
            
            <Text style={{
                textAlign: 'center',
                fontSize: 50,
                paddingTop: 30,
                fontWeight: 'bold'
            }}>
                 ${getMonthlyPayments(months, interestRate, loanAmount)}
            </Text>
            
            <View style={{flexDirection: 'row'}}>

                <Text style={{
                    fontSize: 25,
                    paddingTop: 40,
                    paddingLeft: 20,
                    fontWeight: 'bold'
                }}> 
                    Total Paid    
                </Text>

                <Text style={{
                    fontSize: 25,
                    paddingTop: 40,
                    paddingLeft: 150,
                    fontWeight: 'bold'
                }}>
                    ${getTotalPaid(months, interestRate, loanAmount)}
                </Text>
            </View>

            <Text style={{
                textAlign: 'center',
            }}>
                ___________________________________________________________
            </Text>

            <View style={{flexDirection: 'row'}}>

                <Text style={{
                    fontSize: 25,
                    paddingTop: 15,
                    paddingLeft: 20,
                    fontWeight: 'bold'
                }}> 
                    Total Interest   
                </Text>

                <Text style={{
                    fontSize: 25,
                    paddingTop: 15,
                    paddingLeft: 112,
                    fontWeight: 'bold'
                }}>
                    ${getInterestPaid(months, interestRate, loanAmount)}
                </Text>
            </View>

        </ScrollView>
    )
}