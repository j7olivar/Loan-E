import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    formatText: {
        paddingTop: 25,
        //textAlign: 'center',
        textAlign: 'left',
        marginLeft: 30,
        fontWeight: 'bold',
        fontSize: 18,
        color: '#426FFE'
    },

    textStyle: {
        fontWeight: 'bold'
    },

    monthlyPayments: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
        paddingTop: 25,
        //marginLeft: 30,
        //color: '#32c090'
        color: '#426FFE',
    },

    

    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {

    },
    logo: {
        flex: 1,
        height: 120,
        width: 90,
        alignSelf: "center",
        margin: 30
    },
    input: {
        height: 48,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#e7e7e7',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        fontSize: 18,
        //color: 'white'
    },
    button: {
        backgroundColor: '#788eec',
        marginLeft: 30,
        marginRight: 30,
        marginTop: 20,
        height: 48,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: 'center'
    },
    buttonTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: "bold"
    },
    footerView: {
        flex: 1,
        alignItems: "center",
        marginTop: 20
    },
    footerText: {
        fontSize: 16,
        color: '#2e2e2d'
    },
    footerLink: {
        color: "#788eec",
        fontWeight: "bold",
        fontSize: 16
    },
    appButtonContainer: {
        height: 48,
        borderRadius:5,
        overflow: 'hidden',
        backgroundColor: '#426FFE',
        marginTop: 25,
        marginBottom: 10,
        marginLeft: 30,
        marginRight: 30,
        paddingLeft: 16,
        fontSize: 20,
    },
    appButtonText: {
        fontSize: 16,
        marginTop: 13,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
    },
    monthBox: {
        width: 334,
        height: 130,
        marginTop: 35,
        marginLeft: 21,
        //borderColor: 'black',
        //borderWidth: 1,
        backgroundColor: 'white',
        //flexDirection: 'row',
        //justifyContent: 'space-around',
        //alignItems: 'flex-start',
        borderRadius: 25,
        shadowColor: "#000",
		    shadowOffset: {
          width: 10,
          height: 9
		    },
		    shadowOpacity: 0.15,
            shadowRadius: 8,
        
    }
    
})