import React, {Component} from 'react';
import { StyleSheet, View, ScrollView} from 'react-native';
import { Colors } from './Colors'
import Accordian from './Accordian'

export default class Faq extends Component {

    constructor(props) {
      super(props);
      this.state = {
        menu :[
          { 
            title: 'How do I close my account?', 
            data: 'To close your account, go to the settings page and click on the “Delete Account” button. Just follow the prompts, and you will be on your way to deleting your account.',
          },
          { 
            title: 'Is the app safe?',
            data: 'LOAN*E is completely safe! The login page will help keep your account completely secure.'
          },
          { 
           title: 'Does it cost anything?',
           data: 'LOAN*E does not cost a penny— it is completely free!'
          },
          { 
            title: 'How are we different?',
            data: 'LOAN•E goes above and beyond to not only help college students budget, manage, and organize their finances, but to also educate them and empower them to be financially responsible and independent. We hope to aid in creating a generation of financially savvy young adults.'
           },
           { 
            title: 'What is the FAFSA Document from the Homescreen?',
            data: "It is a document provided by FAFSA from studentaid.gov with all loan information. Don't worry, the document is deleted after extracting loan information"
           },
           { 
            title: 'How do I get the FAFSA Document?',
            data: "1) go to studentaid.gov and login\
            2) from your dashboard, click on 'View Details' on the My Aid rectangle\
            3) click on the 'Download My Aid Data' button on the top\
            4) upload it on LOAN•E"
           },
           { 
            title: 'How do I reset my password?',
            data: 'If you forget your password -- don’t worry! You will be able to reset your password right on the log-in page.'
           },
        ]
       }
    }
  
    render() {
      return (
        <ScrollView style={styles.container}>
          { this.renderAccordians() }
        </ScrollView>
      );
    }
  
    renderAccordians=()=> {
      const items = [];
      for (item of this.state.menu) {
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