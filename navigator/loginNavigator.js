import 'react-native-gesture-handler'
import React, { useState, useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Login,Loans,Signup} from '../Screens'
import {decode,encode} from 'base-64' 
import { StyleSheet} from 'react-native';
import {firebase} from '../Constants/ApiKeys'
import Stacker from '../navigator/appNavigator';
import  LoanCalculatorScreen  from '../Screens/LoanScreens/LoanCalculator.js'
import  LoanHomeScreen  from '../Screens/LoanScreens/LoanHome.js'
import  LoanCalculatorResults from '../Screens/LoanScreens/LoanCalculatorResults.js'
import BudgetScreen from '../Screens/BudgetScreens/Budget.js'
import EditGoalInputScreen from '../components/HomeScreen/EditGoalInput'
import ForgotPW from '../Screens/Login/ForgotPW'
import ProfilePage from '../Screens/Main Screens/Pei.js'
import  IndividualLoanScreen from '../Screens/LoanScreens/IndividualLoan.js'
import Settings from '../components/Profile/Settings.js';
import Faq from '../components/Resources/Faq.js';
import About from '../components/Resources/About.js';
import Links from '../components/HomeScreen/Links.js';
import PlaidScreen from '../Screens/BudgetScreens/Plaid.js'

if (!global.btoa){global.btoa=encode}
if(!global.atob){global.atob=decode}

const Stack = createStackNavigator()

const LoginNavigator =  () => {
  const [loading, setLoading]=useState(true)
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            setLoading(false)
          });
      } 
      else {
        setLoading(false)
      }
    });
  }, [])

  return (
      <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
          <Stack.Screen name="Home" options={{headerShown:false}}>
           {props => <Stacker {...props} extraData={user} />}
          </Stack.Screen>
          <Stack.Screen 
            name="Login" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',},
              headerShown: false

            }}
            component={Login} 
            />
            <Stack.Screen name="Signup" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',},
              headerShown: false

            }}
            component={Signup} /> 
            
          </>
          ) : (
          <>
            <Stack.Screen 
            name="Login" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',},
              headerShown: false
            }}
            component={Login} 
            />
            <Stack.Screen name="Signup" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',},
              headerShown: false
            }}
            component={Signup} /> 
           
          </>

        )}
        <Stack.Screen name="ForgotPW" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',},
              headerShown: false

            }}
        component={ForgotPW}/>  
        
        <Stack.Screen name="Loan Calculator"
        options={{
          //headerStyle:{backgroundColor:'#32c090',},
          //headerTintColor: 'black',
          //headerTitleStyle: {fontWeight: 'bold',}
        }}
        component={LoanCalculatorScreen} />
        <Stack.Screen name="Loan Home" 
        options={{
          headerStyle:{backgroundColor:'#32c090',},
          //headerTintColor: 'black',
          headerTitleStyle: {fontWeight: 'bold',}
        }}
        component={LoanHomeScreen} />
        <Stack.Screen name="Calculator Results" 
        options={{
              //headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              //headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={LoanCalculatorResults} />
        <Stack.Screen name="Budget" 
        options={{
              headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={BudgetScreen} />

        <Stack.Screen name = 'EditLoan'
        options= {{
          headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
        }}
        component={EditGoalInputScreen}/>
        <Stack.Screen name="Pei" 
        options={{
              headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={ProfilePage} />
        <Stack.Screen name="Settings" 
        options={{
              //headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              //headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={Settings} />
        <Stack.Screen name="FAQ" 
        options={{
              //headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              //headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={Faq} />
        <Stack.Screen name="LINKS" 
        options={{
              //headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              //headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={Links} />
        <Stack.Screen name="ABOUT" 
        options={{
              //headerStyle:{backgroundColor:'#32c090',},
              //headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={About} />
        <Stack.Screen name="Individual Loan" component={IndividualLoanScreen} />
        <Stack.Screen name="Plaid Link" 
        options={{
              headerStyle:{backgroundColor:'#32c090',},
              headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={PlaidScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
  
});

export default LoginNavigator



