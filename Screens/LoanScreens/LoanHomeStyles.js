import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    fixedRatio: {
        backgroundColor: 'rebeccapurple',
        flex: 1,
        aspectRatio: 1
      },

      loanBoxes: {
        width: 350,
        height: 120,
        marginTop: 50,
        marginLeft: 30,
        backgroundColor: '#ffffff',
      },

      loanInside1: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingLeft: 10,
        paddingTop: 5
      },

      loanInside2: {
        fontWeight: 'bold',
        fontSize: 25,
        paddingLeft: 80,
        paddingTop: 5
      },

      loanInside3: {
        paddingLeft: 18,
        fontSize: 17
      },

      loanInside4: {
        paddingLeft: 28,
        fontSize: 17
      },

      loanInside5: {
        paddingLeft: 18,
        fontSize: 17,
        paddingTop: 7
      },

      loanInside6: {
        paddingLeft: 28,
        fontSize: 17,
        paddingTop: 7
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