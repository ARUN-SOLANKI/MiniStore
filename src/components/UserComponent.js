import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const UserComponent = ({navigation , item}) => {

    console.log(item , "-----------------------------")
  return (
    <View>
       <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('Chats' , item)}>
            <Text style={styles.userBtnText}>{item._data.email.split('@')[0]}</Text>
            <Text style={styles.userBtnTextEmail}>{item._data.email}</Text>
          </TouchableOpacity>
    </View>
  )
}

export default UserComponent

const styles = StyleSheet.create({
    userBtn : {
        borderWidth : 1,
        borderColor :"blue",
        marginBottom: 15,
        paddingHorizontal : 20,
        paddingVertical : 10,
        marginHorizontal :15,
        marginVertical : 15
      },
      userBtnText :{
        color :"red",
        fontSize : 18
      },
      userBtnTextEmail :{
        color :"blue",
        fontSize : 15
      }
})