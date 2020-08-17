import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Emoji from 'react-native-emoji';
import Settings from '../../components/Profile/Settings';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen'

function ProfilePage({ navigation }) {

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
              onPress={() => navigation.navigate('Settings')}
            />

        </View>

            <Image style={styles.avatar}/>
            
            <View>

              <Text style={styles.name}>
                John Doe
              </Text>
              <Text style={styles.award}>
                Awards
              </Text>

              <View style={styles.square}>
                
                <View style={styles.row}>
                  <Emoji name="black_circle" style={styles.emoji} />
                  <Emoji name="sparkles" style={styles.emoji} />
                  <Emoji name="money_with_wings" style={styles.emoji} />
                  <Emoji name="money_mouth_face" style={styles.emoji} />
                  
                </View>
                
                <View style={styles.row}>
                  <Emoji name="moneybag" style={styles.emoji} />
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

function SettingsPage() {
  return (

  <Settings />

  )
}

const Stack = createStackNavigator();

function Pei() {
	return (
		//<NavigationContainer>
		<Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfilePage} options={{headerShown: false}}/>
			<Stack.Screen name="Settings" component={SettingsPage} />
		</Stack.Navigator>
		//	</NavigationContainer>
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
      borderColor: "#696969",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop: 86
    },
    name:{
        fontSize:25,
        color: "black",
        marginTop: 94,
        fontWeight: "600",
        alignSelf: 'center'
      },
    award:{
      fontSize:16,
      color: "black",
      marginTop:17,
      alignSelf: 'center',
    
    },
    square:{
      width: 337,
      height: 313,
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

  export default Pei;