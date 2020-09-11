import React, { useEffect, useState, useRef, Component } from 'react';
import { WebView } from 'react-native-webview';
import { firebase } from '../../Constants/ApiKeys';

// ...
export default function PlaidScreen({navigation}){

  const user = firebase.auth().currentUser.uid;

  useEffect(() => {
    firebase.auth().currentUser.getIdToken().then(function(idToken) {
        console.log("idToken POST started");
        fetch('http://192.168.0.136:8080/send_uid', {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({ idToken: idToken }),
        });
        console.log("idToken sent!");
      }).catch(function(error) {
        console.log("idToken not sent!");
      });
  }, []);

  return (
    <WebView source={{ uri: 'http://192.168.0.136:8080' }} />
  )
}
