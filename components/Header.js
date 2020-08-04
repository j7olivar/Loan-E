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
        backgroundColor: '#060320',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#35CA96',
        fontSize: 18
    },

});

export default Header