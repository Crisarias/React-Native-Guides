import React, { Component } from 'react';
import { View, UIManager, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import LoginForm from './components/LoginForm';
import Router from './Router';


class App extends Component {

  constructor() {
     super();
     this.setupAnimations();
  }

  setupAnimations() {
     if (Platform.OS === 'android') {
         return UIManager.setLayoutAnimationEnabledExperimental &&
         UIManager.setLayoutAnimationEnabledExperimental(true);
     }
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
