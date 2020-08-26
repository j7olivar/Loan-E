import React, { useState, useEffect} from 'react'
import { Button, Text, TextInput, TouchableOpacity, View,StyleSheet, Alert } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '../../Constants/ApiKeys'
import AsyncStorage from '@react-native-community/async-storage'
import * as SecureStore from 'expo-secure-store'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as LocalAuthentication from 'expo-local-authentication';
import { set } from 'react-native-reanimated';

export default function Login({navigation}) {
    //const [email, setEmail] = useState('')
    //const [password, setPassword] = useState('')
    var email
    var password
    //var bioAvail 
    const onFooterLinkPress = () => {
        navigation.navigate('Signup')
    }
    /*
    //trying to make biometrics dynamic
    useEffect(() => {
        const checkWhich = async ()=>{
            ((await LocalAuthentication.supportedAuthenticationTypesAsync()).includes(2)? 
            bioAvail='face-recognition': bioAvail='fingerprint')
        }
        checkWhich()
    },[])
    */
    const savePW = async () => {
        try {
            await SecureStore.setItemAsync('password',password)
            await SecureStore.setItemAsync('email', email)
        }catch(error){console.log(error)}
    }

    const bioLogin = async() => {
        let isSupported = await LocalAuthentication.hasHardwareAsync()
        if(!isSupported){
            Alert.alert('Unsuccesful', 'Not a Compatabile Device')
            return;
        }
        let savedOptions
        let signin
        //does have hardware for biometric login
        let devices = await LocalAuthentication.supportedAuthenticationTypesAsync()
        if(devices.length == 0){
            Alert.alert('Unsuccesful', 'No Biometrics Available')  
        }
        else if(devices.includes(1)){
            //touch-id
            savedOptions = await LocalAuthentication.isEnrolledAsync()
            //bioAvail='fingerprint'
            if(!savedOptions){
                Alert.alert('Unsuccesful', 'No Saved Fingerprints')
                return
            }
            signin = await LocalAuthentication.authenticateAsync()
        }
        else if(devices.includes(2)){
            //face-id
            savedOptions= await LocalAuthentication.isEnrolledAsync()
            //bioAvail='face-recognition'
            if(!savedOptions){
                Alert.alert('Unsuccesful', 'No Saved Faces')
                return
            }
            signin = await LocalAuthentication.authenticateAsync()
        }
        //now time to sign in
        //console.log(signin)
        if(signin.success){
            //first need to save email and password when they first log-in using SecureStore
            //then check if thats available then call that to sign in
            if(await SecureStore.getItemAsync('password')== null || 
            await SecureStore.getItemAsync('email') == null ){
                //no saved passwords
                Alert.alert('No Saved Credentials', 'FaceID is disabled until you login once')
                return;
            }
            
            email = await SecureStore.getItemAsync('email')
            password = await SecureStore.getItemAsync('password')
            onLoginPress()
        }
        else if(signin.error){
            console.log('something wrong here ')
            Alert.alert('Unsuccesful','Unable to Login')
        }
    }

    const ForgotPWOnPress = () =>{
        console.log('in this hoe')
        navigation.navigate('ForgotPW')
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
                        navigation.navigate('Home', {user:user})
                        navigation.reset({index:0, routes:[{name:'Home'}]})
                    })
                    .catch(error => {
                        console.log('heres the error')
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
                //onChangeText={(text) => setEmail(text)}
                onChangeText= {(text) => email = text}
                value={email}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                secureTextEntry= {false}
                />
                
                <TextInput 
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='gray'
                //onChangeText={(text) => setPassword(text)}
                onChangeText = {(text) => password = text}
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

                <View style = {{alignSelf:'center', paddingTop:10}}>
                <Icon.Button
                    //name = {bioAvail}
                    name= 'face'
                    onPress = {()=> bioLogin()}
                    color = '#426FFE'
                    backgroundColor='transparent'>
                        Login with Biometrics
                </Icon.Button>
                </View>

                <View style= {{fontSize: 16,color: 'red', paddingTop:170}}>
              
                    <Text style = {styles.footerText}>
                        Don't have an account? 
                    <Text onPress={()=>onFooterLinkPress()} 
                        style = {styles.signupText}>  Sign up</Text>
                    </Text>
                </View>

                <View style= {{fontSize: 16,color: 'red'}}>
                    <Text style = {styles.forgotText}
                    onPress={()=>ForgotPWOnPress()} >
                        Forgot Password? 
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
    },
    forgotText:{
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 20,
        color:'#426FFE'
    }
  });