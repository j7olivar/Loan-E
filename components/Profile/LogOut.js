import React, { useState } from 'react';
import { Modal, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";

const LogOut = () => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
      <View style={styles.box}>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Log out?</Text>

              <View
                style={{
                  padding: 1,
                  margin: 11,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: 240
                }}
              />

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                /*onPress={() => {
                  setModalVisible(!modalVisible);
                }}*/
              >
                <Text style={styles.textStyle}>Log Out</Text>
              </TouchableHighlight>

              <View
                style={{
                  padding: 2,
                  margin: 11,
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  width: 240
                }}
              />
  
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#ffffff" }}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={styles.textStyle1}>Cancel</Text>
              </TouchableHighlight>

            </View>
          </View>

        </Modal>

  
        <TouchableHighlight
          style={styles.openButton}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Text style={styles.textStyle}>Log Out</Text>
        </TouchableHighlight>

      </View>
    );
  };

const styles = StyleSheet.create({
    box: {
        flexDirection: 'row',
        justifyContent:'space-between',
        height:65,
        paddingLeft:22,
        paddingRight:18,
        alignItems:'center',
      },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 20,
      paddingHorizontal: 8,
      paddingVertical: 23,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    textStyle: {
      fontSize: 16,
      paddingTop: 8,
      color: "red",
      fontWeight: 'bold',
      textAlign: "center"
    },
    textStyle1: {
      fontSize: 16,
      paddingTop: 8,
      color: "black",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 7,
      marginTop: 0,
      fontSize: 16,
      fontWeight: 'bold',
      color: 'black',
    }
    
  });

  export default LogOut