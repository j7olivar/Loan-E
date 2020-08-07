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
        color: '#32c090'
      },

      budgetBox1: {
        width: 334,
        height: 269,
        marginTop: 35,
        marginLeft: 21,
        borderColor: '#32c090',
        borderWidth: 1,
        backgroundColor: '#161616',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderRadius: 25
      },

      budgetBold: {
        fontWeight: 'bold',
        fontSize: 15,
        paddingLeft: 20,
        color: '#32c090'
      },

      budgetNormal: {
        fontSize: 15,
        color: '#32c090'
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
          borderColor: '#32c090',
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