import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const users = firestore().collection('users');
const commentCollection = firestore().collection('Comments');

export const addUsers = async (userInfo) => {
    const res =  await users.doc(userInfo.uid).set(
        userInfo
    )
    return res;
  };


export const addComment = async (msg , userId, collectionRef , email, date) => {
    const res =  await collectionRef
      .add({
        id : userId,
        msg : msg,
        email : email,
        createdTime : date
      })
  };


export const firebaseLogin = async (email , password , navigation) => {

    const response = await auth().signInWithEmailAndPassword(email, password)
    try{
        if(response){
        storage(response.user._user.uid)
        navigation.navigate("Home" , response.user._user)
        }
    }catch{
        console.log("error")
    } 
  };


export const firebaseSignUp = async (email , password  , navigation) => {

    const response = await auth().createUserWithEmailAndPassword(email,password)
    try{
        if(response){
            addUsers(response.user._user)
            navigation.navigate('LoginPage');
        }
    }catch{
        console.log('That email address is already in use!');
    } 
  }; 


export const getUsers = async () => {
  const userList = await users.get();
  return userList._docs;
}


export const storage = async (token)=>{
  try { 
    await AsyncStorage.setItem('token', String(token));
  } catch (error) {
    console.log(error)
  }
}


export const getChat = async (ChatRef) => {
  const ChatList = await ChatRef.onSnapshot(documentSnapshot => {
    console.log('User data: ', documentSnapshot.data());
  });
  return ChatList
}
// export const getChat = async (ChatRef) => {
//   const ChatList = await ChatRef.get().onSnapshot(documentSnapshot => {
//     console.log('User data: ', documentSnapshot.data());
//   });
//   return ChatList
// }


export const getUsertoken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
          return token;
      }
      }catch {
      console.log(error)
      }
    }
