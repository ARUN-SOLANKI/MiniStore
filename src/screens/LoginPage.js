import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth';
import { addUsers } from '../utils/firebase';
import { firebaseLogin } from '../utils/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginPage = ({navigation}) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  })

  const handleUserDetails = (value, key) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value
    })
  }

  const handleLogin = () => {
    if (loginDetails.email && loginDetails.password) {
      firebaseLogin(loginDetails.email , loginDetails.password , navigation)
      setLoginDetails({
        email: "",
        password: ""
      })
    }
  }


  useEffect(()=>{
  const getUserName = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
          navigation.navigate("Home")
      }
      }catch {
      console.log(error)
      }
  }
  getUserName();
})

  return (
    <View style={styles.container} >
      <Text style={styles.HeaderBtnText}>Login page</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Enter Email'
        value={loginDetails.email}
        onChangeText={(e) => handleUserDetails(e, "email")}
      />

      <TextInput
      style={styles.textInput}
        placeholder='Password'
        value={loginDetails.password}
        onChangeText={(e) => handleUserDetails(e, "password")}
      />
      <View style={styles.btnContainer}>
      <TouchableOpacity onPress={handleLogin}
        style={styles.logiButton}
      >
        <Text style={styles.loginBtnText}>Login</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('SignUpPage')}>
        <Text style={styles.FormText}>not a user Sign Up</Text>
      </TouchableOpacity>
    </View>
  )
}

export default LoginPage

const styles = StyleSheet.create({
  container: {
    marginHorizontal : 15
  },
  HeaderBtnText : {
    fontSize : 25,
    textAlign : "center",
    marginVertical : 10
  },
  btnContainer : {
    display : "flex",
    alignItems : "center",
    paddingVertical : 15
  },
  textInput:{
    borderWidth:1,
    borderColor : "#1a73e8",
    borderRadius : 5,
    marginVertical : 5
  },
  logiButton : {
    backgroundColor : "#1a73e8",
    paddingVertical : 10,
    width : "30%"
  },
  loginBtnText :{
    textAlign:"center",
    color:"#fff",
  }

})