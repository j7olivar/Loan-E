import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image, Button, Linking } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Emoji from 'react-native-emoji';
import '../../components/Global.js'
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Colors } from '../../components/Resources/Colors';

import LogOut from '../../components/Profile/LogOut';
import DeleteAccount from '../../components/Profile/DeleteAccount'


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
        let user = firebase.auth().currentUser.uid
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          //setImage({image: result.uri});
          setImage(result.uri)
          uploadImage(result.uri, user)
          displayImage(user)
          .then(() => {
            console.log("success")
          })
          .catch((error) => {
            console.log(error)
          })
        }
        console.log(result);
      } catch (E) {
        console.log(E);
      }
    };

    const uploadImage = async (uri, imageName) => {
      const response = await fetch(uri)
      const blob = await response.blob();

      var ref = firebase.storage().ref().child("images/" + imageName)
      return ref.put(blob)
    }

    const displayImage = async (imageName) => {
      var ref = firebase.storage().ref("images/" + imageName);
      var image = await ref.getDownloadURL();
      setImage(image)
    }

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
      let user = firebase.auth().currentUser.uid
      fetchUserName();
      getPermissionAsync();
      //setImage(firebase.storage().ref("images/" + user))
      displayImage(user);
    }
    )
  
  

    return (    
      <View style={{backgroundColor: 'white'}}>

        <View style={styles.header}>

            <Text style={styles.profileTitle}>
              Profile
            </Text>

            {/*
            <Icon 
              style={styles.setting} 
              name={'settings'} 
              size={30}
              onPress={onFooterLinkPress}
            />
            */}

        </View>

            <View style={{marginTop: -9}}>             
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

              <View style={{padding: 13}}>
              </View>

              <View style={styles.box}>
              <Text style={styles.text}>Bank Account</Text>
                <Icon
                  name={'keyboard-arrow-right'}
                  size={30}
                  color={Colors.DARKGRAY}
                  onPress={() => navigation.navigate('Plaid Link')}
                />
              </View>

              <View style={{padding: 7}}>
              </View>

              <View style={styles.box}>
              <Text style={styles.text}>Feedback Form</Text>
                <Icon
                  name={'keyboard-arrow-right'}
                  size={30}
                  color={Colors.DARKGRAY}
                  onPress={() => Linking.openURL('https://forms.gle/4hQkwLSx6NWpdAMY6')}
                />
              </View>

              <View style={{padding: 7}}>
              </View>

              <View style={styles.box}>
              <Text style={styles.text}>Replay Tutorial</Text>
                <Icon
                  name={'keyboard-arrow-right'}
                  size={30}
                  color={Colors.DARKGRAY}
                  //onPress={onFooterLinkPress2}
                />
              </View>

              <View style={{marginTop: 7}}>
              </View>

              <LogOut />

              <View style={{marginTop: -15}}>
              </View>

              <DeleteAccount />

              <View style={{padding: 7}}>
              </View>



            </View>

            <View style={{padding: 100, backgroundColor: 'white'}}>

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
      box: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 58,
        paddingLeft: 24.5,
        paddingRight: 18,
        borderRadius: 9,
        alignItems: 'center',
        backgroundColor: Colors.WHITE,
        
        shadowColor: "#000",
        shadowOffset: {
          width: 1,
          height: 7
        },
        shadowOpacity: 0.13,
        shadowRadius: 6,
        
      },
    /*square:{
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
    },*/
    row: {
      flexDirection: 'row'
    },
    text: {
      //fontWeight: 'bold',
      color: 'black',
      fontSize: 15
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