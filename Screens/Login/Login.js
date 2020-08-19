import React, { useState} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '../../Constants/ApiKeys'
import AsyncStorage from '@react-native-community/async-storage'

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Signup')
    }

    const savePW = async () => {
        try {
            await AsyncStorage.setItem('password',password)
        }catch(error){console.log(error)}
    }


    const onLoginPress = () => {
        savePW()
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                const uid = response.user.uid
                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .get()
                    .then(firestoreDocument => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.")
                            return;
                        }
                        const user = firestoreDocument.data()
                        navigation.navigate('Home', {user})
                        navigation.reset({index:0, routes:[{name:'Home'}]})
                    })
                    .catch(error => {
                        alert(error)
                    });
            })
            .catch(error => {
                alert(error)
            })
    }   
    
    return(
        <View style= {{flex:1, alignItems:'center', /*backgroundColor: '#060320'*/ backgroundColor: 'white'}}>
            <KeyboardAwareScrollView 
            style={{flex:1,width:'100%'}}
            keyboardShouldPersistTaps='always'>
                
                {/*
                <Image 
                style={styles.logo}
                source = {require('../../assets/tempLogo.jpg')}/>
                */}
            
            <Text style={{fontWeight: 'bold', fontSize: 33, marginLeft: 33, marginTop: 150}}>
                Welcome Back, 
            </Text>

            <Text style={{color: '#A5A5A5', marginLeft: 34, marginTop: 18, fontWeight: 'bold'}}> Sign in to continue
            </Text>

                <TextInput 
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='gray'
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                secureTextEntry= {false}
                />
                
                <TextInput 
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='gray'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                secureTextEntry= {true}
                />

                <TouchableOpacity
                style = {styles.button}
                onPress={()=>onLoginPress()}>
                <Text style = {styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <View style= {{fontSize: 16,color: 'red'}}>
                    <Text style = {styles.footerText}>
                        Don't have an account? 
                    <Text onPress={()=>onFooterLinkPress()} 
                        style = {styles.signupText}>  Sign up</Text>
                    </Text>
                </View>

            </KeyboardAwareScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    logo:{
        flex: 1,
        height:200 ,
        width: 400,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        color:'black',
        backgroundColor: 'transparent',
        borderBottomWidth:1,
        borderBottomColor:'white',
        marginTop: 40,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 30,
        paddingLeft: 16,
        borderBottomColor: 50
        
    },
    button: {
        //backgroundColor: '#35CA96',
        backgroundColor: '#426FFE',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 50,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerText:{
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        color:'#A5A5A5'
    },
    signupText:{
        color: "#426FFE",
        fontWeight: "bold",
        fontSize: 14,
        paddingVertical:400
    }
  });