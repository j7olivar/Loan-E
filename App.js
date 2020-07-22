import 'react-native-gesture-handler'
import React, { useState, useEffect, useContext } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Login,Loans,Signup} from './Screens'
import {decode,encode} from 'base-64' 
import { StyleSheet, Text, View} from 'react-native';
import {firebase} from './Constants/ApiKeys'

if (!global.btoa){global.btoa=encode}
if(!global.atob){global.atob=decode}

const Stack = createStackNavigator()

export default function App() {
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
            console.log(loading)
            setLoading(false)
            console.log(loading)
            setUser(userData)
            console.log(userData)

          })
          .catch((error) => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);

  return (
      <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Loans" >
            {props => <Loans {...props} extraData={user} />}
          </Stack.Screen>
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
