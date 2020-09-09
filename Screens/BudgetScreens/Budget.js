import React, { useEffect, useState, useRef } from 'react';
import { Switch, Modal, Alert, Image, Animated, SafeAreaView, FlatList, StyleSheet, StatusBar, Text, TextInput, Button, ScrollView, View, ImageBackground, Dimensions } from 'react-native'
import styles from './BudgetStyles.js';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../Constants/ApiKeys';
import moment from 'moment';

export default function BudgetScreen({navigation}){
    const [data, setData] = useState([]);

    const [modalView, setModalView] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);

    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const {width,height} = Dimensions.get('window')

    const user = firebase.auth().currentUser.uid;
    
    const ModalRef = useRef(null)

    const _draggedValue = new Animated.Value(180);

    useEffect(() => {
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
            console.log("idToken POST started");
            fetch('http://192.168.1.80:8080/send_uid', {
                method: 'POST',
                headers: {
                  'Content-type': 'application/json'
                },
                body: JSON.stringify({ idToken: idToken }),
            });
            console.log("idToken sent!");
          }).catch(function(error) {
            console.log("idToken not sent!");
          });

        firebase.firestore().collection('transactions').doc(user).onSnapshot(
            (docSnapshot) => {
<<<<<<< HEAD
                if (!docSnapshot.exists) {
                    console.log('doc doesnt exist, start from scratch')
                    fetch('http://192.168.1.80:8080/transactions')
                        .then((response) => response.json())
                        .then((json) => setData(json.transactions))
                        .catch((error) => console.error(error))
                        .finally(() => setLoading(false));
=======
                if (!docSnapshot.exists || docSnapshot.data().date != moment().format('YYYY-MM-DD')) {
                    console.log("transaction pull started: " + isLoading)
                    fetch('http://192.168.0.136:8080/transactions')
                    .then((response) => response.json())
                    .then((json) => setData(json.transactions))
                    .catch((error) => console.log(error))
>>>>>>> origin/bobranch2
                }
                else {
                    console.log("database pull started")
                    setData(docSnapshot.data())
                    console.log("database pull complete")
                }
            },
            (error) => {
                console.log(error);
            }
        );
        
    }, []);

    const getTotal = (key) => {
        var val = 0;
        if (data.transactions == null) {
            return val.toFixed(2);
        }
        else {
            if (key == 'total') {
                for (let i = 0; i < data.transactions.length; i++) {
                    val += data.transactions[i].amount
                }
            }
            else {
                for (let i = 0; i < data.transactions.length; i++) {
                    if (key == data.transactions[i].category[0]) {
                        val += data.transactions[i].amount
                    }
                    else {
                        continue;
                    }
                }
            }
            return val.toFixed(2);
        }
    };

    return(
    <View style={{backgroundColor: 'white', flex: 1}}>
        
        <View style={styles.budgetTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#426FFE'}}>Budget </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Plaid Link')}>
            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source = {require('../../assets/refresh-icon-8.jpg')}/>
            </TouchableOpacity>
        </View>

        <View style={styles.budgetBox1}>
            
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBold1}>Total Spendings: </Text>
                <Text style={styles.budgetNormal}>${getTotal('total')}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Food: </Text>
                <Text style={styles.budgetNormal}>${getTotal('Food and Drink')}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Travel: </Text>
                <Text style={styles.budgetNormal}>${getTotal('Travel')}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Recreation: </Text>
                <Text style={styles.budgetNormal}>${getTotal('Recreation')}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Purchases: </Text>
                <Text style={styles.budgetNormal}>${getTotal('Shops')}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Payments: </Text>
                <Text style={styles.budgetNormal}>${getTotal('Payment')}</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Transfers: </Text>
                <Text style={styles.budgetNormal}>${getTotal('Transfer')}</Text>
            </View>
        
        </View>
        
        <Modal
        animationType="fade"
        transparent={true}
        visible={modalView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText1}>Tracked Categories</Text>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText2}>
                    Food
                </Text>
                <Switch
                    
                    trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText2}>
                    Travel
                </Text>
                <Switch
                    
                    trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText2}>
                    Recreation
                </Text>
                <Switch
                    
                    trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText2}>
                    Purchases
                </Text>
                <Switch
                    
                    trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText2}>
                    Payments
                </Text>
                <Switch
                    
                    trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={styles.modalText2}>
                    Transfers
                </Text>
                <Switch
                    
                    trackColor={{ false: "#3e3e3e", true: "#31db5c" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>

            <TouchableOpacity
              style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
              onPress={() => {
                setModalView(!modalView);
              }}
            >
              <Text style={styles.textStyle}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
        </Modal>

        <View style={{flexDirection: 'row', paddingTop: 25, alignSelf: 'center'}}>
            <TouchableOpacity onPress={() => {setModalView(true)}}>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#426FFE'}}>Edit Budget</Text>
            </TouchableOpacity>
        </View>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView2}>

            <Text style={styles.modalText3}>Add Custom Transaction</Text>

            <Text style={styles.modalText4}>Transaction Amount: </Text>
            <TextInput
                placeholder="$"
                style={styles.input}
            />

            <Text style={styles.modalText4}>Category: </Text>
            <TextInput 
                placeholder="Category"
                style={styles.input}
            />  

            <Text style={styles.modalText4}>Provider: </Text>
            <TextInput 
                placeholder="Company"
                style={styles.input}
            />  

            <Text style={styles.modalText4}>Date: </Text>
                <TextInput 
                placeholder="YYYY-MM-DD"
                style={styles.input}
            />

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(!modalVisible)}} >
                    <Text style={styles.appButtonText}>Add</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={styles.button1} onPress={() => {setModalVisible(!modalVisible)}}>          
                    <Text style={styles.appButtonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
                
            </View>
            </View>
        </Modal>

        <View style={{flex:1}}>
            <SlidingUpPanel
            ref={ModalRef}
            draggableRange={{top: height - 150 , bottom: 200}}
            animatedValue={_draggedValue}
            backdropOpacity={0}
            height={height + 20}
            friction={0.9}
            >

                {dragHandler => (
                <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 14}}>
                    <View {...dragHandler}>
                    <Image style={{width: 300, height: 25, alignSelf: 'center'}} source = {require('../../assets/slideupbar.png')}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{marginVertical: 16, color: 'black', fontWeight: 'bold'}}>
                            Recent Transactions
                        </Text>
                        <TouchableOpacity onPress = {() => {setModalVisible(true)}}>
                            <Text style={{fontWeight: 'bold', fontSize: 35, color: '#426FFE'}}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{height : 450, paddingBottom: 10}}>
                    <ScrollView>
                        <FlatList
                        data={data.transactions}
                        keyExtractor={item => item.transaction_id}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.panelItemContainer}>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <View>
                                            <Text style={styles.budgetBold2}>{item.category[0]} - {item.merchant_name}</Text>
                                            <Text style={styles.budgetNormal}>{item.date}</Text>
                                        </View>
                                    </View>
                                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                        <Text style={styles.budgetBlue}>${item.amount}</Text>
                                    </View>
                                </View>
                            )
                        }}
                        />
                    </ScrollView>
                    </View>
                </View>
                )}


            </SlidingUpPanel>
        </View>

    </View>
    )
}