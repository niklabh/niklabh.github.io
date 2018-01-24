/* global SIGN_IN_REDIRECT */

import firebase from './firebase'
import firebaseui from 'firebaseui'

const ui = new firebaseui.auth.AuthUI(firebase.auth())
const uiConfig = {
  callbacks: {
    signInSuccess (currentUser, credential, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true
    },
    uiShown () {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none'
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: SIGN_IN_REDIRECT,
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    require('firebase').auth.GoogleAuthProvider.PROVIDER_ID
  ]
  // Terms of service url.
  // tosUrl: ''
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(user)
  } else {
    ui.start('#firebaseui-auth-container', uiConfig)
  }
})
