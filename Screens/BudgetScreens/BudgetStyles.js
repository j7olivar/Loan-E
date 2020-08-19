import { StyleSheet } from 'react-native'

export default StyleSheet.create({
      fixedRatio: {
        backgroundColor: 'rebeccapurple',
        flex: 1,
        aspectRatio: 1
      },

      budgetTitle: {
        fontWeight: 'bold',
        fontSize: 26,
        paddingLeft: 23,
        paddingTop: 34,
        color: '#426FFE'
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

      budgetBold: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 20,
        color: 'black'
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

    na: {
        width: 60,
        height: 60,
        borderRadius: 60 / 2,
        backgroundColor: 'orange',
        alignItems: 'center',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
        textAlignVertical: 'center',
        marginRight: 10,
        overflow: 'hidden',
    },
})