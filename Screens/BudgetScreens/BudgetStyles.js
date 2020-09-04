import { StyleSheet } from 'react-native'

export default StyleSheet.create({
      fixedRatio: {
        backgroundColor: 'rebeccapurple',
        flex: 1,
        aspectRatio: 1
      },

      budgetTitle: {
<<<<<<< HEAD
        fontWeight: 'bold',
        fontSize: 26,
        paddingLeft: 23,
        paddingTop: 34,
        color: '#426FFE'
=======
        width: 334,
        height: 30,
        marginTop: 34,
        marginLeft: 23,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
>>>>>>> bobranch
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
        color: '#32c090'
      },

      budgetBold2: {
        fontWeight: 'bold',
        fontSize: 15,
        color: '#32c090'
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
})