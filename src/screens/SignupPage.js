import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { firebaseSignUp } from '../utils/firebase';

const SignUpPage = ({navigation}) => {
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
      firebaseSignUp(loginDetails.email , loginDetails.password , navigation)
      setLoginDetails({
        email: "",
        password: ""
      })
    }
  }


  return (
    <View style={styles.container} >
      <Text style={styles.HeaderBtnText}>SignUp page</Text>
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
        <Text style={styles.loginBtnText}>SignUp</Text>
      </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('LoginPage')}>
        <Text style={styles.FormText}>already a user ! Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default SignUpPage

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