/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import { Provider } from "react-redux";

import AppContainer from "./src/components/AppContainer/AppContainer.js"
import store from './src/redux/store.js';

export default class App extends Component {
  render(){
    return <Provider store={store}>
            <AppContainer/>
        </Provider>
  }
}
