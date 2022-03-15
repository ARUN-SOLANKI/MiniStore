import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginPage from '../screens/LoginPage';
import SignUpPage from '../screens/SignupPage';
import MainPage from '../screens/MainPage';
import ChatScreen from '../screens/ChatScreen';

const Stack = createStackNavigator();

function Routes() {
  return (
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="Home" component={MainPage} />
        <Stack.Screen name="Chats" component={ChatScreen} />
      </Stack.Navigator>
  );
}

export default Routes;
