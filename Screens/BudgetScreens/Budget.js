import React, { useEffect, useState, useRef } from 'react';
import { Image, Animated, SafeAreaView, FlatList, StyleSheet, StatusBar, Text, TextInput, Button, ScrollView, View, ImageBackground, Dimensions } from 'react-native'
import styles from './BudgetStyles.js';
import SlidingUpPanel from 'rn-sliding-up-panel';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function BudgetScreen({navigation}){

    const {width,height} = Dimensions.get('window')

    const ModalRef = useRef(null)

    const _draggedValue = new Animated.Value(180);

    const Users = [
        {
          key: '1',
          userImage: 'Image URL here',
          userName: 'User Name here',
          transactionDate: 'Date here',
          amount: 'Amount here',
          credit: true
        },
    ]

    return(
    <View style={{backgroundColor: '#000', flex: 1}}>
        
        <View style={styles.budgetTitle}>
            <Text style={{fontWeight: 'bold', fontSize: 26, color: '#32c090'}}>Budget </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Plaid Link')}>
            <Image style={{width: 30, height: 30, alignSelf: 'center'}} source = {require('../../assets/linkIcon.png')}/>
            </TouchableOpacity>
        </View>

        <View style={styles.budgetBox1}>

            <View style={{flexDirection: 'row'}}>
                <Text style={styles.budgetBold}>Total Income: </Text>
                <Text style={styles.budgetNormal}>$0</Text>
            </View>
            
            <Text style={styles.budgetBold}>Spendings:</Text>

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
                <Text style={styles.budgetBold}>+ </Text>
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
            >

                <View style={{flex: 1, backgroundColor: '#161616', borderRadius: 25, padding: 14}}>
                    <View style={styles.panelHandle}></View>
                    <View>
                        <Text style={{marginVertical: 16, color: '#32c090', fontWeight: 'bold'}}>Recent Transactions</Text>
                    </View>

                    <View style = {{height : 500, paddingBottom: 10}}>
                        <FlatList
                        data={Users}
                        keyExtractor={item => item.key}
                        renderItem={({item}) => {
                            return(
                                <View style={styles.panelItemContainer}>
                                    <Text style={styles.budgetNormal}>More to come!</Text>
                                </View>
                            )
                        }}
                        />
                    </View>
                </View>


            </SlidingUpPanel>
        </View>

    </View>
    )
}