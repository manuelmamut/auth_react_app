import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import firebase from 'firebase'
import { Header, Button, Spinner, Card, CardSection } from './src/components/common'
import LoginForm from './src/components/LoginForm'




export default class App extends React.Component {

  state = {loggedIn:null}

  componentWillMount(){
    firebase.initializeApp({
      apiKey: "AIzaSyBosbgDb-hyB-UzsjIUdpFj_zUwMBxi5JM",
      authDomain: "authentication-7c290.firebaseapp.com",
      databaseURL: "https://authentication-7c290.firebaseio.com",
      projectId: "authentication-7c290",
      storageBucket: "authentication-7c290.appspot.com",
      messagingSenderId: "353030422232"
    });

    firebase.auth().onAuthStateChanged((user) => {
      if(user){
        this.setState({loggedIn:true});
      }else{
        this.setState({loggedIn:false});
      }
    });
  }

  renderContent(){

    switch(this.state.loggedIn){

      case true:
        return (
          <View style={styles.buttonStyle}>
              <Button onPress={() => firebase.auth().signOut()}> 
                Log Out 
              </Button>
          </View>
        );
      case false:
        return <LoginForm />
      default:
        return <Spinner size="large"/>

    };
  }

  render() {
    return (
      <View>
        <Header headerText='Authentication'/>
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {

  buttonStyle: {

      marginTop: 5,
      justifyContent: 'flex-start',
      flexDirection: 'row',

  }


}
