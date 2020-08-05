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
              headerTitleStyle: {fontWeight: 'bold',}
            }}
            component={Login} 
            />
            <Stack.Screen name="Signup" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',}
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
              headerTitleStyle: {fontWeight: 'bold',}
            }}
            component={Login} 
            />
            <Stack.Screen name="Signup" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
            component={Signup} />  
          </>

        )}
        <Stack.Screen name="Loan Calculator"
        options={{
          headerStyle:{backgroundColor:'#32c090',},
          headerTintColor: 'black',
          headerTitleStyle: {fontWeight: 'bold',}
        }}
        component={LoanCalculatorScreen} />
        <Stack.Screen name="Loan Home" 
        options={{
          headerStyle:{backgroundColor:'#32c090',},
          headerTintColor: 'black',
          headerTitleStyle: {fontWeight: 'bold',}
        }}
        component={LoanHomeScreen} />
        <Stack.Screen name="Calculator Results" 
        options={{
              headerStyle:{backgroundColor:'#32c090',},
              headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={LoanCalculatorResults} />
        <Stack.Screen name="Budget" 
        options={{
              headerStyle:{backgroundColor:'#32c090',},
              headerTintColor: 'black',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
        component={BudgetScreen} />
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