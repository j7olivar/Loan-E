import React,  {useState} from 'react'
import {View,Text,StyleSheet, TextInput, Alert, TouchableOpacity, Image, Dimensions} from 'react-native'
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

    const height = Dimensions.get('screen').height
    const width = Dimensions.get('screen').width

    return (
    <View style={{padding:15, flex:1, backgroundColor: 'white'}}>
        <Text style={{fontWeight: 'bold', fontSize: 30, marginLeft: 20, marginTop: 160}}>
            Forgot Password? 
        </Text>
        <Text style={{color: '#A5A5A5', marginLeft: 21, marginTop: 22, fontWeight: 'bold'}}>
            Enter your email and we'll send a link
        </Text>
        <Text style={{color: '#A5A5A5', marginLeft: 21, marginTop: 6, fontWeight: 'bold'}}>
            to reset your password.
        </Text>
        <View style={{marginBottom: 10}}></View>
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

/* TRYING TO PUT IMAGE AT BOTTOM OF SCREEN
<View
        style={{position:'absolute', bottom:height/2 }}>
            <Image
            source={require('../../assets/corgi.png')}
            style={{backgroundColor:'transparent' }}
            />
        </View>
*/

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
        marginLeft: 18,
        marginRight: 30,
        paddingLeft: 4,
        borderBottomColor: 50
        
    },
    button: {
        //backgroundColor: '#35CA96',
        backgroundColor: '#426FFE',
        marginLeft: 20,
        marginRight: 31,
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
