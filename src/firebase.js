import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ41S0LBfFp06vqg9fdMXB9GjRA7JGgcU",
  authDomain: "chat-app-1f5a2.firebaseapp.com",
  databaseURL: "https://chat-app-1f5a2.firebaseio.com",
  projectId: "chat-app-1f5a2",
  storageBucket: "chat-app-1f5a2.appspot.com",
  messagingSenderId: "364582384555",
  appId: "1:364582384555:web:1c3ce656fabf0e7e7dd8ee",
  measurementId: "G-LKYV5CG20N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }

export default db

