
import React, {Component} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, LayoutAnimation, Platform, UIManager, Linking} from "react-native";
import { Colors } from './Colors';
import Icon from "react-native-vector-icons/MaterialIcons";

export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = { 
          data: props.data,
          expanded : false,
        }

        if (Platform.OS === 'android') {
            UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
  
  render() {

    return (
       <View>

            <TouchableOpacity ref={this.accordian} style={styles.row} onPress={()=>this.toggleExpand()}>
                <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
                <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} color={Colors.DARKGRAY} />
            </TouchableOpacity>
            <View style={styles.parentHr}/>
            {
                this.state.expanded &&
                <View style={styles.child}>
                    <Text>{ this.onPressLink() }</Text>    
                </View>
            }
       </View>
    )
  }

  onPressLink() {
      if (this.props.data.indexOf('https') === 0) {
          return <Text onPress={()=> Linking.openURL(this.props.data)}>{this.props.data}</Text>
      }
      else {
          return <Text>{this.props.data}</Text>
      }
  }

  toggleExpand=()=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({expanded : !this.state.expanded})
  }

}

const styles = StyleSheet.create({
    title:{
        fontSize: 15,
        fontWeight:'bold',
        color: Colors.DARKGRAY,
    },
    /*
    data:{
        fontSize: 15,
        fontWeight:'bold',
        color: Colors.DARKGRAY,
    },
    */
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
        height:58,
        paddingLeft:22,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Colors.CGRAY,
    },
    parentHr:{
        height:2,
        color: Colors.WHITE,
        width:'100%'
    },
    child:{
        backgroundColor: Colors.CGRAY,
        paddingLeft:22,
        padding:3,
    },
});