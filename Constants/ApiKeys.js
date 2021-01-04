import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
   
}

//calling firebase and only once
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export {firebase}
