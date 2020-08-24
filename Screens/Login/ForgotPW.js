import React,  {useState} from 'react'
import {View,Text,StyleSheet, TextInput, Alert, TouchableOpacity} from 'react-native'
import {firebase} from '../../Constants/ApiKeys'


export default function ForgotPW({navigation}){
  
    const [email, setEmail] = useState('')
    
    const sendEmail = () =>{
        var auth = firebase.auth()
        if(email.length > 0){
            auth.sendPasswordResetEmail(email).then(function(){
                Alert.alert('Successful', 'Password Reset Email Sent',
                {
                    onPress: navigation.navigate('Login')
                })
                //navigation.navigate('Login')
                
            }).catch(function(error){
               Alert.alert('Wrong Email', 'Something went wrong')
            })
        }
        else{
            Alert.alert('Nothing Typed', 'Please insert email')
        }
    }

    return (
    <View style={{padding:15}}>
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

        <TouchableOpacity
                style = {styles.button}
                onPress={()=>sendEmail()}>
                <Text style = {styles.buttonText}>Send Email</Text>
        </TouchableOpacity>
        
    </View>)
}

const styles = StyleSheet.create({
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
        marginTop: 30,
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
})
