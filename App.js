import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Routes from './src/navigations/Routes'
import {NavigationContainer} from '@react-navigation/native';


const App = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})



// "name": "MiniStoreApp",
  // "displayName": "Warta-Lap"