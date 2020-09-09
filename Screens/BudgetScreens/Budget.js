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
                if (!docSnapshot.exists) {
                    console.log('doc doesnt exist, start from scratch')
                    fetch('http://192.168.1.80:8080/transactions')
                        .then((response) => response.json())
                        .then((json) => setData(json.transactions))
                        .catch((error) => console.error(error))
                        .finally(() => setLoading(false));
                }
                else {
                    console.log('loaded successfully ' + docSnapshot.data())
                    setData(docSnapshot.data())
                }
            },
            (error) => {
                console.log(error);
            }
        );
    }, []);

    console.log(data.transactions);

    return(
    <View style={{backgroundColor: 'white', flex: 1}}>
        
        <View style={styles.budgetTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#32c090'}}>Budget </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Plaid Link')}>
            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source = {require('../../assets/linkIcon.png')}/>
            </TouchableOpacity>
        </View>

        <View style={styles.budgetBox1}>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBold1}>Total Income: </Text>
                <Text style={styles.budgetNormal}>$0</Text>
            </View>
            
            <Text style={styles.budgetBold1}>Spendings:</Text>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Food: </Text>
                <Text style={styles.budgetNormal}>$0/$0</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Textbooks: </Text>
                <Text style={styles.budgetNormal}>$0/$0</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Entertainment: </Text>
                <Text style={styles.budgetNormal}>$0/$0</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBlue}>Subscriptions: </Text>
                <Text style={styles.budgetNormal}>$0/$0</Text>
            </View>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBold1}>+ </Text>
                <Text style={styles.budgetNormal}>Add Category</Text>
            </View>
        
        </View>

        <View style={{flex:1}}>
            <SlidingUpPanel
            ref={ModalRef}
            draggableRange={{top: height - 150 , bottom: 200}}
            animatedValue={_draggedValue}
            backdropOpacity={0}
            height={height + 20}
            friction={0.9}
            onDragEnd={() => setAllowDragging(true)}
            allowDragging={allowDragging}
            >

                <View style={{flex: 1, backgroundColor: 'white', borderRadius: 25, padding: 14}}>
                    <View style={styles.panelHandle}></View>
                    <View>
                        <Text style={{marginVertical: 16, color: 'black', fontWeight: 'bold'}}>
                            Recent Transactions
                        </Text>
                    </View>

                    <ScrollView
                    onTouchStart={() => setAllowDragging(false)}
                    onTouchEnd={() => setAllowDragging(true)}
                    >
                    <View style = {{height : 450, paddingBottom: 10}}>
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
                    </View>
                    </ScrollView>
                </View>


            </SlidingUpPanel>
        </View>

    </View>
    )
}