import { StyleSheet } from 'react-native'

export default StyleSheet.create({
      fixedRatio: {
        backgroundColor: 'rebeccapurple',
        flex: 1,
        aspectRatio: 1
      },

      budgetTitle: {
        paddingLeft: 23,
        paddingRight: 20,
        paddingTop: 34,
        color: '#426FFE',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },

      budgetBox1: {
        width: 334,
        height: 269,
        marginTop: 35,
        marginLeft: 21,
        //borderColor: 'black',
        //borderWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderRadius: 25,
        shadowColor: "#000",
		    shadowOffset: {
          width: 10,
          height: 9
		    },
		    shadowOpacity: 0.15,
		    shadowRadius: 8,
      },

      budgetBold1: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 20,
        color: 'black'
      },

      budgetBold2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#426FFE'
      },

      budgetNormal: {
        fontSize: 15,
        color: 'black'
      },

      budgetBlue: {
        fontSize: 15,
        paddingLeft: 20,
        color: '#426FFE'
      },

      budgetBlue1: {
        fontSize: 15,
        color: '#426FFE'
      },

      panelHandle: {
          height: 5,
          width: 50,
          backgroundColor: '#666',
          borderRadius: 6,
          alignSelf: 'center',
          marginTop: 6,
      },
      
      panelItemContainer: {
          borderWidth: 0.6,
          borderColor: 'black',
          padding: 14,
          borderRadius: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20
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
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
        height: 420,
        flexDirection: 'column'
      },

      modalView2: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        width: 300,
        height: 500,
        flexDirection: 'column'
      },

      openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },

      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },

      modalText1: {
        fontWeight: 'bold',
        fontSize: 25,
        color: '#426FFE',
        textAlign: "center",
        marginBottom: 20
      },

      modalText2: {
        fontSize: 20,
        marginBottom: 15,
        paddingRight: 25,
        textAlign: 'left'
      },

      modalText3: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#426FFE',
        textAlign: "center",
        marginBottom: 30
      },

      modalText4: {
        fontSize: 16,
        marginBottom: 5,
        paddingRight: 25,
        textAlign: 'left'
      },

      input: {
        height: 35,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#e7e7e7',
        fontSize: 16,
        marginBottom: 20
      },

      button:{
          height: 48,
          width: 100,
          borderRadius:5,
          overflow: 'hidden',
          backgroundColor: '#426FFE',
          marginTop: 25,
      },
      
      button1:{
        height: 48,
        width: 100,
        borderRadius:5,
        overflow: 'hidden',
        backgroundColor: '#ff443a',
        marginTop: 25,
    },

    button2:{
      height: 48,
      width: 100,
      borderRadius:5,
      overflow: 'hidden',
      backgroundColor: '#426FFE',
      marginTop: 25,
      alignSelf: 'center'
    },
    
      appButtonText: {
        fontSize: 16,
        marginTop: 13,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
      },
      formatText: {
        paddingTop: 25,
        //textAlign: 'center',
        textAlign: 'left',
        marginLeft: 30,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#426FFE'
    },
})