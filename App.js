import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedin: null };

  componentWillMount(){
    firebase.initializeApp({
      apiKey: 'AIzaSyAGHKVh3cvsm5dnUpIOrLLGX7P1z3lUFqQ',
      authDomain: 'authentication-d6f19.firebaseapp.com',
      databaseURL: 'https://authentication-d6f19.firebaseio.com',
      projectId: 'authentication-d6f19',
      storageBucket: 'authentication-d6f19.appspot.com',
      messagingSenderId: '332422403287'
    });
  
  firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      this.setState({ loggedin: true });
    } else{
      this.setState({ loggedin: false });
    }
  });

  }
  
  renderContent() {
    switch (this.state.loggedin) {
      case true:
        console.log('User logged in');
        return (
            <Button onPress={() => firebase.auth().signOut()}>
                        Just a Value
            </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="small" />;
    }
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 20}}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
