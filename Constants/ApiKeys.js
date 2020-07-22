import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCYjqgKppX4GuD7xuGj_saUAiqP_Z1vGnw",
    authDomain: "loane-9156e.firebaseapp.com",
    databaseURL: "https://loane-9156e.firebaseio.com",
    projectId: "loane-9156e",
    storageBucket: "loane-9156e.appspot.com",
    messagingSenderId: "625989026940",
    appId: "1:625989026940:web:b3f335d2eba404632c35f9",
    measurementId: "G-LZSKGCLNY8"
}

//calling firebase and only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export {firebase}