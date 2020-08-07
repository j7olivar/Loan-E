import React from "react";
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import Emoji from 'react-native-emoji';
import Settings from '../../components/Profile/Settings';
import { createStackNavigator } from '@react-navigation/stack';

function ProfilePage({ navigation }) {


    return (      
        <View style={styles.container}>

            <View style={styles.header}>
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
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                </View>
                
                <View style={styles.row}>
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                </View>

                <View style={styles.row}>
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
                  <Emoji name="coffee" style={styles.emoji} />
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
      <Stack.Screen name="Profile" component={ProfilePage} />
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
      paddingTop: 8
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
      alignSelf:'center',
      position: 'absolute',
      marginTop:33
    },
    name:{
        fontSize:25,
        color: "black",
        marginTop: 45,
        fontWeight: "600",
        alignSelf: 'center'
      },
    award:{
      fontSize:16,
      color: "black",
      marginTop:10,
      alignSelf: 'center'
    },
    square:{
      width: 340,
      height: 340,
      backgroundColor: "white",
      marginTop: 10,
      alignSelf: 'center',
      borderColor: 'black',
      
      paddingTop: 8,
      paddingHorizontal: 20,
    },
    emoji: {
      fontSize: 42,
      paddingRight: 20,
      flexDirection: 'row'
    },
    row: {
      flexDirection: 'row'
    }
  });

  export default Pei;