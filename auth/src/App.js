import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { ScrollView } from 'react-native';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

constructor() {
  super();
  this.unsubscriber = null;
  this.state = {
    loggedIn: null
  };
}

componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
            this.setState({ loggedIn: true });
          } else {
            this.setState({ loggedIn: false });
          }
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
        );
      case false:
        return <LoginForm />;
      default:
        return (
            <Spinner size='large' />
        );
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </ScrollView>
    );
  }
}

export default App;
