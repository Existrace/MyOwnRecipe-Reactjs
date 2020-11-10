import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyAxVGsp1wJMjRttiPHANaNmVNUjq5YuL9g",
    authDomain: "recettes-app-10d60.firebaseapp.com",
    databaseURL: "https://recettes-app-10d60.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database())

export {firebaseApp}

export default base
