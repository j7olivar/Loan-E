import React, { useEffect, useState, useRef, Component } from 'react';
import { Text, View } from 'react-native'
import styles from './BudgetStyles.js';
import PlaidLink from 'react-native-plaid-link-sdk';
import { WebView } from 'react-native-webview';

// ...
export default function PlaidScreen({navigation}){
  return (
    <WebView source={{ uri: 'http://192.168.0.136:8080' }} />
  )
}