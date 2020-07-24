import 'react-native-gesture-handler'
import React, { useState, useEffect, useContext, Image } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {Login,Loans,Signup} from './Screens'
import {decode,encode} from 'base-64' 
import { StyleSheet, Text, View} from 'react-native';
import {firebase} from './Constants/ApiKeys'

if (!global.btoa){global.btoa=encode}
if(!global.atob){global.atob=decode}

const Stack1 = createStackNavigator()
const Stack2 = createStackNavigator()

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
      
        {user ? (
          <>
          <Stack1.Navigator>
          <Stack1.Screen name="Home"
          options={{
            headerStyle:{backgroundColor:'#060320',},
            headerTintColor: 'white',
            headerTitleStyle: {fontWeight: 'bold',},
          }}>
            {props => <Loans {...props} extraData={[user,setUser]} />}
          </Stack1.Screen>
          </Stack1.Navigator>
          
          </>
          ) : (
          <>
            <Stack2.Navigator>
            <Stack2.Screen 
            name="Login" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
            component={Login} 
            />
            <Stack2.Screen name="Signup" 
            options={{
              headerStyle:{backgroundColor:'#060320',},
              headerTintColor: 'white',
              headerTitleStyle: {fontWeight: 'bold',}
            }}
            component={Signup} />  
            </Stack2.Navigator>
          </>
          
        )}
      
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
