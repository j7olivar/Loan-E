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

    const [advDetails, setAdvDetails] = useState([]);

    const [enteredAmount, setEnteredAmount] = useState('')

    const [enteredCategory, setEnteredCategory] = useState('')

    const [enteredProvider, setEnteredProvider] = useState('')
    
    const [enteredDate, setEnteredDate] = useState('')

    const {width,height} = Dimensions.get('window')

    const user = firebase.auth().currentUser.uid;
    
    const ModalRef = useRef(null)

    const _draggedValue = new Animated.Value(180);

    const noData =
        <View style={{justifyContent: 'center', alignItems: 'center', flex:1, marginLeft: 20, marginRight: 20}}>
            <Text style={{fontWeight: 'bold', fontSize: 16, color: '#426FFE', textAlign: 'center', paddingTop: 25}}>Please link your banking information in the profile page.</Text>
        </View>;

    const okData =                         
        <FlatList
        data={data.transactions}
        keyExtractor={item => item.transaction_id}
        renderItem={({item}) => {
            return(
                <TouchableOpacity onPress = {() => {showAdvanced(item)}}>
                <View style={styles.panelItemContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View>
                            <Text style={styles.budgetBold2}>{readCategory(item.category)} - {item.merchant_name}</Text>
                            <Text style={styles.budgetNormal}>{item.date}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.budgetBlue}>${item.amount}</Text>
                    </View>
                </View>
                </TouchableOpacity>
            )
        }}
        />;

    useEffect(() => {
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
            console.log("idToken POST started");
            fetch('http://66.27.69.117:8080/send_uid', {
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
                if (!docSnapshot.exists || docSnapshot.data().date != moment().format('YYYY-MM-DD')) {
                    console.log("transaction pull started: ")
                    fetch('http://66.27.69.117:8080/transactions')
                    .then((response) => response.json())
                    .then((json) => setData(json.transactions))
                    .catch((error) => console.log(error))
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
            if (key == 'other') {
                for (let i = 0; i < data.transactions.length; i++) {
                    if (data.transactions[i].category == null) {
                        val += data.transactions[i].amount
                    }
                    else {
                        continue;
                    }
                }
            }
            else {
                for (let i = 0; i < data.transactions.length; i++) {
                    if (data.transactions[i].category != null && key == data.transactions[i].category[0]) {
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

    const readCategory = (category) => {
        if (category == null) {
            return 'N/A'
        }
        else {
            return category[0]
        }
    }

    const displayChoice = () => {
        if (data.transactions == null) {
            return noData
        }
        else {
            return okData
        }
    }

    const addTransactionHandler = async () => {
        setModalVisible(!modalVisible)
        const newTransaction = {
            amount: enteredAmount,
            category: enteredCategory,
            merchant_name: enteredProvider,
            date: enteredDate,
        };
        console.log("I got here!:" + JSON.stringify(newTransaction));
        await firebase.firestore().collection('transactions').doc(user).update({
            transactions: firebase.firestore.FieldValue.arrayUnion({
                transaction_id: user + Math.floor(Math.random() * 900000).toString(),
                amount: enteredAmount,
                category: enteredCategory,
                merchant_name: enteredProvider,
                date: enteredDate,
            })
        })
        console.log("All done!")
    }

    const showAdvanced = (item) => {
        setModalView(true)
        setAdvDetails(
            <View>
            <Text style={styles.modalText3}>Advanced Details</Text>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Transaction Amount: </Text>
                <Text style={styles.budgetNormal}>${item.amount}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Currency: </Text>
                <Text style={styles.budgetNormal}>{item.iso_currency_code}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Category: </Text>
                <Text style={styles.budgetNormal}>{readCategory(item.category)}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Location: </Text>
                <Text style={styles.budgetNormal}>{item.name}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Provider: </Text>
                <Text style={styles.budgetNormal}>{item.merchant_name}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Payment Type: </Text>
                <Text style={styles.budgetNormal}>{item.payment_channel}</Text>
            </View>
            <View style={{flexDirection: 'row', paddingBottom: 15}}>
                <Text style={styles.budgetBlue1}>Date: </Text>
                <Text style={styles.budgetNormal}>{item.date}</Text>
            </View>
            </View>
        )
    }

    const amountHandler = (enteredText) => {
        setEnteredAmount(enteredText)
    }    

    const categoryHandler = (enteredText) =>{
        setEnteredCategory(enteredText)
    }

    const providerHandler = (enteredText) =>{
        setEnteredProvider(enteredText)
    }
    const dateHandler = (enteredText) =>{
        setEnteredDate(enteredText)
    }

    return(
    <View style={{backgroundColor: 'white', flex: 1}}>
        
        <View style={styles.budgetTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#426FFE'}}>Budget </Text>
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
        
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Other: </Text>
                <Text style={styles.budgetNormal}>${getTotal('other')}</Text>
            </View>
        </View>
        <View style={{flex:1}}>
            <SlidingUpPanel
            ref={ModalRef}
            draggableRange={{top: height - 150 , bottom: 200}}
            animatedValue={_draggedValue}
            backdropOpacity={0.15}
            height={height + 20}
            friction={0.9}
            >

                {dragHandler => (
                <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 14}}>
                    <View {...dragHandler}>
                    <Image style={{width: 300, height: 25, alignSelf: 'center'}} source = {require('../../assets/slideupbar.png')}/>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 17, marginVertical: 16, color: 'black', fontWeight: 'bold'}}>
                            Recent Transactions
                        </Text>
                        <TouchableOpacity onPress = {() => {setModalVisible(true)}}>
                            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#426FFE', paddingTop: 10}}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <View style = {{height : 450, paddingBottom: 10}}>
                    <ScrollView>{displayChoice()}</ScrollView>
                    </View>
                </View>
                )}


            </SlidingUpPanel>
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
                placeholder="  $"
                style={styles.input}
                onChangeText={amountHandler}
                value={enteredAmount}
            />

            <Text style={styles.modalText4}>Category: </Text>
            <TextInput 
                placeholder="  Category"
                style={styles.input}
                onChangeText={categoryHandler}
                value={enteredCategory}
            />  

            <Text style={styles.modalText4}>Provider: </Text>
            <TextInput 
                placeholder="  Business Name"
                style={styles.input}
                onChangeText={providerHandler}
                value={enteredProvider}
            />  

            <Text style={styles.modalText4}>Date: </Text>
                <TextInput 
                placeholder="  YYYY-MM-DD"
                style={styles.input}
                onChangeText={dateHandler}
                value={enteredDate}
            /> 

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={styles.button} onPress={() => {setModalVisible(!modalVisible)}}>
                    <Text style={styles.appButtonText}>Add</Text>
                </TouchableOpacity>   
                <TouchableOpacity style={styles.button1} onPress={() => {setModalVisible(!modalVisible)}}>          
                    <Text style={styles.appButtonText}>Cancel</Text>
                </TouchableOpacity>
                </View>
                
            </View>
            </View>
        </Modal>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalView}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                {advDetails}

                <TouchableOpacity style={styles.button2} onPress={() => {setModalView(!modalView)}} >
                    <Text style={styles.appButtonText}>Done</Text>
                </TouchableOpacity>   
            </View>
            </View>
        </Modal>

        

    </View>
    )
}