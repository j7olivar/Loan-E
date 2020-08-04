import React, {useState, useContext} from 'react'
import {Text,TextInput,TouchableOpacity, View,StyleSheet} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {firebase} from '../../Constants/ApiKeys'

export default function Signup({navigation}){
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPW, setConfirmPW] = useState('')
    
    const onFooterLinkPress = () =>{
        navigation.navigate('Login')
    }

    //when someone finally registers, time to send them homescreen
    const onRegisterPress = () =>{
        if(password !== confirmPW){
            alert("Passwords don't match")
            return
        }

        firebase
            .auth()
            //creates an user with email and PW
            .createUserWithEmailAndPassword(email,password)
            //we save the users info to DB
            .then((response)=> {
                const uid = response.user.uid
                const data = {
                    id:uid,
                    email,
                    fullName
                }

                const usersRef = firebase.firestore().collection('users')
                usersRef
                    .doc(uid)
                    .set(data)
                    //if successful we go homescreen
                    .then(() => {
                        navigation.navigate("Home", {user:data})
                        navigation.reset({index:0, routes:[{name:'Home'}]})
                    })
                    .catch((error) => {
                        alert(error)
                    })
            })
            .catch( (error) => {
                alert(error)
            })
    }

    return(
    <View style= {{flex:1, alignItems:'center', backgroundColor: '#060320'}}>
        <KeyboardAwareScrollView 
            style ={{flex:1,width:'100%'}}
            keyboardShouldPersistTaps='always'>
            <TextInput
                style={styles.input}
                placeholder = 'Full Name'
                placeholderTextColor = 'gray'
                onChangeText={(text)=>setFullName(text)}
                value={fullName}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder = 'Email'
                placeholderTextColor = 'gray'
                onChangeText={(text)=>setEmail(text)}
                value={email}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
            />

            <TextInput
                style={styles.input}
                placeholder = 'Password'
                placeholderTextColor = 'gray'
                onChangeText={(text)=>setPassword(text)}
                value={password}
                underlineColorAndroid='transparent'
                autoCapitalize='none'
                secureTextEntry= {true}
            />

            <TextInput
               style={styles.input}
               placeholder = 'Confirm Password'
               placeholderTextColor = 'gray'
               onChangeText={(text)=>setConfirmPW(text)}
               value={confirmPW}
               underlineColorAndroid='transparent'
               autoCapitalize='none' 
               secureTextEntry= {true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress = {()=>onRegisterPress()}>
                <Text style = {styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.footerView}>
                <Text style={styles.footerText}>Already have an account?
                <Text onPress={onFooterLinkPress} style = {styles.loginText}> Log in
                </Text>
                </Text>
            </View>
        </KeyboardAwareScrollView>
    </View>
    )
}


const styles = StyleSheet.create({
    loginText:{
        color: "#35CA96",
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical:400
    },
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
    footerView:{
        fontSize: 16,
        color: '#2e2e2d'
    },
    signupText:{
        color: "#35CA96",
        fontWeight: "bold",
        fontSize: 16,
        paddingVertical:400
    }
  });