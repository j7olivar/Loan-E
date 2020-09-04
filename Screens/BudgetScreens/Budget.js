import React, { useEffect, useState, useRef } from 'react';
import { Image, Animated, SafeAreaView, FlatList, StyleSheet, StatusBar, Text, TextInput, Button, ScrollView, View, ImageBackground, Dimensions } from 'react-native'
import styles from './BudgetStyles.js';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebase } from '../../Constants/ApiKeys';

export default function BudgetScreen({navigation}){
    const [isLoading, setLoading] = useState(true);

    var [allowDragging, setAllowDragging] = useState(true);

    const [data, setData] = useState([]);

    const {width,height} = Dimensions.get('window')

    const user = firebase.auth().currentUser.uid;
    
    const ModalRef = useRef(null)

    const _draggedValue = new Animated.Value(180);

    useEffect(() => {
        console.log('useEffect Run')
        firebase.auth().currentUser.getIdToken().then(function(idToken) {
            console.log("idToken POST started");
            fetch('http://192.168.0.136:8080/send_uid', {
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
                fetch('http://192.168.0.136:8080/transactions')
                    .then((response) => response.json())
                    .then((json) => setData(json.transactions))
                    .catch((error) => console.error(error))
                    .finally(() => setLoading(false));
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    console.log(data.transactions.length)

    const getTotal = (key) => {
        var val = 0;
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
    };

    return(
    <View style={{backgroundColor: 'white', flex: 1}}>
        
        <View style={styles.budgetTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#426FFE'}}>Budget </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Plaid Link')}>
            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source = {require('../../assets/linkIcon.png')}/>
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

        <View style={{flexDirection: 'row', paddingTop: 25, alignSelf: 'center'}}>
            <TouchableOpacity>
                <Text style={{fontWeight: 'bold', fontSize: 20, color: '#426FFE'}}>Edit Budget</Text>
            </TouchableOpacity>
        </View>

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
                    <View>
                        <Text style={{marginVertical: 16, color: 'black', fontWeight: 'bold'}}>
                            Recent Transactions
                        </Text>
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