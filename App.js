/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import store from './store';
import { StackNavigator } from 'react-navigation';
import WelcomeScreen from './screens/WelcomeScreen';
import HomeScreen from './screens/HomeScreen';
import CitiesScreen from './screens/CitiesScreen';
import ForecastScreen from './screens/ForecastScreen';
import LocationScreen from './screens/LocationScreen';
import CitiesEditScreen from './screens/CitiesEditScreen';


export default class App extends Component{
 
  render() {
    const MainNavigator = StackNavigator({
      home: { screen: HomeScreen },
      welcome: { screen: WelcomeScreen },
      cities: { screen: CitiesScreen },
      forecast: { screen: ForecastScreen },
      location: { screen: LocationScreen},
      edit: { screen: CitiesEditScreen }
    });
    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
