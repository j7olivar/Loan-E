import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Emoji from 'react-native-emoji';
import '../../components/Global.js'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import { firebase } from '../../Constants/ApiKeys'; 

function ProfilePage({ navigation }) {

    const [image, setImage] = useState('')

    const getPermissionAsync = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    };

    const pickImage = async () => {
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          //setImage({image: result.uri});
          setImage(result.uri)
          
        }
  
        console.log(result);
      } catch (E) {
        console.log(E);
      }
    };

    const onFooterLinkPress = () => {
      navigation.navigate('Settings')
    }


    const [ userName, setUserName ] = useState('')
  
    const fetchUserName = async () => {
      let user = firebase.auth().currentUser.uid
      try {
        const userName1 = await firebase.firestore().collection('users').doc(user).get()
        setUserName(userName1.data().fullName)
      } catch (error) {
        console.log(error)
      }
    }
    
    useEffect(() => {
      fetchUserName();
      getPermissionAsync();
    }
    )
    
  

    return (    
      <View style={{backgroundColor: 'white'}}>

        <View style={styles.header}>

            <Text style={styles.profileTitle}>
              Profile
            </Text>

            <Icon 
              style={styles.setting} 
              name={'settings'} 
              size={30}
              onPress={onFooterLinkPress}
            />

        </View>

            <View>
              <Image source={{uri: image}} style={styles.avatar} />
            </View>

            <View style={{paddingTop: 78}}>
              <Button title="Edit" onPress={pickImage} />
            </View>
            
            <View>

              <Text style={styles.name}>
                {userName}
              </Text>
              <Text style={styles.award}>
                Awards
              </Text>

              <View style={styles.square}>
                
                <View style={styles.row}>
                  <Emoji name="clown_face" style={styles.emoji} />
                  <Emoji name="sparkles" style={styles.emoji} />
                  <Emoji name="money_with_wings" style={styles.emoji} />
                  <Emoji name="money_mouth_face" style={styles.emoji} />
                </View>
                
                <View style={styles.row}>
                  <Emoji name={global.halfPaid ? "moneybag" : "black_circle"} style={styles.emoji} />
                  <Emoji name="100" style={styles.emoji} />
                  <Emoji name="burrito" style={styles.emoji} />
                  <Emoji name="video_game" style={styles.emoji} />
                </View>

                <View style={styles.row}>
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="socks" style={styles.emoji} />
                  <Emoji name="call_me_hand" style={styles.emoji} />
                  <Emoji name="tada" style={styles.emoji} />
                </View>

              </View>

            </View>

      </View>
    );
}


const styles = StyleSheet.create({
    header:{
      //backgroundColor: "#426FFE",
      height:125,
    },
    setting:{
      alignSelf: 'flex-end',
      paddingRight: 10,
      marginTop: -50
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 63,
      borderWidth: 1,
      borderColor: "#d1d1d6",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop: -40
    },
    name:{
        fontSize:25,
        color: "black",
        marginTop: 10,
        fontWeight: "600",
        alignSelf: 'center'
      },
    award:{
      fontSize:16,
      color: "black",
      marginTop:12,
      alignSelf: 'center',
    
    },
    square:{
      width: 337,
      height: 285,
      backgroundColor: "white",
      marginTop: 11,
      alignSelf: 'center',
      //borderColor: '#696969',
      //borderWidth: 0.5,
      borderRadius: 23,
      paddingTop: 8,
      paddingHorizontal: 20,
      shadowColor: "#000",
	    shadowOffset: {
        width: 11,
        height: 4
	      },
      shadowOpacity: 0.17,
      shadowRadius: 5,
    },
    emoji: {
      fontSize: 42,
      marginRight: 37.8,
      marginBottom: 30,
      flexDirection: 'row',
      marginTop: 12
    },
    emojiGone: {
      opacity: 0
    },
    emojiHide: {
      width: 44,
      height: 44,
      borderRadius: 44 / 2,
      backgroundColor: 'grey',
      //borderColor: 'black',
      //borderWidth: 3,
      overflow: 'hidden',
      marginRight: 37.8,
      marginBottom: 30,
      flexDirection: 'row',
      marginTop: 15
    },
    row: {
      flexDirection: 'row'
    },
    profileTitle: {
      fontWeight: 'bold',
      fontSize: 26,
      paddingLeft: 23,
      paddingTop: 34,
    color: '#426FFE',
    padding: 20
    }
  });

  export default ProfilePage;