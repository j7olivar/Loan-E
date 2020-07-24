import React, { useState, createContext} from 'react'
import { Image, Text, TextInput, TouchableOpacity, View,StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {firebase} from '../../Constants/ApiKeys'
import {App} from './../../App'

export default function Login({navigation}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onFooterLinkPress = () => {
        navigation.navigate('Signup')
    }

    const onLoginPress = () => {
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
            
                        navigation.navigate('Loans', {user:user})
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
        <View style= {{flex:1, alignItems:'center', backgroundColor: '#060320'}}>
            <KeyboardAwareScrollView 
            style={{flex:1,width:'100%'}}
            keyboardShouldPersistTaps='always'>
                <Image 
                style={styles.logo}
                source = {require('../../assets/tempLogo.jpg')}/>
                <TextInput 
                style={styles.input}
                placeholder='Email'
                placeholderTextColor='gray'
                onChangeText={(text) => setEmail(text)}
                value={email}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                />
                
                <TextInput 
                style={styles.input}
                placeholder='Password'
                placeholderTextColor='gray'
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid = 'transparent'
                autoCapitalize='none'
                />

                <TouchableOpacity
                style = {styles.button}
                onPress={()=>onLoginPress()}>
                <Text style = {styles.buttonText}>Log in</Text>
                </TouchableOpacity>

                <View style= {{fontSize: 16,color: '#2e2e2d'}}>
                    <Text style = {styles.footerText}>
                        Don't have an account? 
                    <Text onPress={onFooterLinkPress} 
                        style = {styles.signupText}> Sign up</Text>
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
        color:'white',
        backgroundColor: 'transparent',
        borderBottomWidth:1,
        borderBottomColor:'white',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        
    },
    button: {
        backgroundColor: '#35CA96',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
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
        alignItems: "center",
        bottom:-75,
        position:'absolute',
        paddingLeft:75,
        color:'white'
    },
    signupText:{
        color: "#35CA96",
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical:400
    }
  });