import React, {Component} from 'react';
import { StyleSheet, View, Linking} from 'react-native';
import { Colors } from '../Resources/Colors'
import Accordian from '../Resources/Accordian'

export default class Links extends Component {

    constructor(props) {
      super(props);
      this.state = {
        links :[
          { 
            title: 'About Student Loans', 
            data: 'https://studentaid.gov/understand-aid/types/loans',
          },
          { 
            title: 'Managing Student Loans',
            data: 'https://studentaid.gov/h/manage-loans'
          },
          { 
           title: 'Glossary of Terms',
           data: 'https://studentaid.gov/help-center/answers/topic/glossary/articles'
          },
          { 
            title: 'Publications, Fact Sheets, Videos, etc.',
            data: 'https://studentaid.gov/resources'
           },
        ]
       }
    }
  
    render() {
      return (
        <View style={styles.container}>
          { this.renderAccordians() }
        </View>
      );
    }
  
    renderAccordians=()=> {
      const items = [];
      for (item of this.state.links) {
          items.push(
              <Accordian 
                  title = {item.title}
                  data = {item.data}
              />
          );
      }
      return items;
  }
  }
  
  const styles = StyleSheet.create({
    container: {
     flex:1,
     paddingTop:0,
     backgroundColor:Colors.PRIMARY,
     
    }
  });