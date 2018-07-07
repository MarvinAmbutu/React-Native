import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
state = { loggedIn: null };

  componentWillMount() {
    firebase.initializeApp({
    apiKey: 'AIzaSyApi7T1dlLc7IyNJBvx0Cqg_oxJn40VV_M',
    authDomain: 'authentication-79c9b.firebaseapp.com',
    databaseURL: 'https://authentication-79c9b.firebaseio.com',
    projectId: 'authentication-79c9b',
    storageBucket: 'authentication-79c9b.appspot.com',
    messagingSenderId: '456399799110'
  });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <View style={styles.viewStyle}>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </View>
        );
      case false:
        return <LoginForm />;
      default:
        return <Spinner size="large" />;
    }
  }


  render() {
    return (
      <View >
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

const styles = {
  viewStyle: {
    marginTop: 10,
    flexDirection: 'row'
  }
};

export default App;
