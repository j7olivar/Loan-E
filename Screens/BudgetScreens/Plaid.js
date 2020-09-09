import React, { useEffect, useState, useRef, Component } from 'react';
import { Text, View } from 'react-native'
import styles from './BudgetStyles.js';
import PlaidLink from 'react-native-plaid-link-sdk';
import { WebView } from 'react-native-webview';

// ...
export default function PlaidScreen({navigation}){
<<<<<<< HEAD
    return (
      <WebView source={{ uri: 'http://192.168.1.80:8080' }} />
    )
  }
/*export default function PlaidScreen({navigation}){
  const fetchLinkToken = () => {
    const response = fetch('http://localhost:8080/create_link_token', { method: 'POST' });
    const responseJSON = response.json();
    return responseJSON.link_token;
  };

  //const MyPlaidComponent = () => {
    return (
      <PlaidLink
       // Replace any of the following <#VARIABLE#>s according to your setup,
       // for details see https://plaid.com/docs/quickstart/#client-side-link-configuration
      
        token={fetchLinkToken}
        onSuccess={data => console.log('success: ', data)}
        onExit={data => console.log('exit: ', data)}
      >
        <Text>Add Account</Text>
      </PlaidLink>
    );
  //};
}*/
=======
  return (
    <WebView source={{ uri: 'http://192.168.0.136:8080' }} />
  )
}
>>>>>>> origin/bobranch2
