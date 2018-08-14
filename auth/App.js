import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import { Header } from './src/components/common'
import LoginForm from './src/components/LoginForm'




export default class App extends React.Component {

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyBosbgDb-hyB-UzsjIUdpFj_zUwMBxi5JM",
      authDomain: "authentication-7c290.firebaseapp.com",
      databaseURL: "https://authentication-7c290.firebaseio.com",
      projectId: "authentication-7c290",
      storageBucket: "authentication-7c290.appspot.com",
      messagingSenderId: "353030422232"
    })
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication'/>
        <LoginForm></LoginForm>
      </View>
    );
  }
}


