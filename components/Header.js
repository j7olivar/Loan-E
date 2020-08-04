import React from 'react'
import {Text, View, StyleSheet} from 'react-native'

const Header = props => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 90,
        paddingTop: 36,
        backgroundColor: '#f7287b',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'black',
        fontSize: 18
    },

});

export default Header