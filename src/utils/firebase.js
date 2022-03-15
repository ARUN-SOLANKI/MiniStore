import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import axios from 'axios';

const users = firestore().collection('users');
const commentCollection = firestore().collection('Comments');

export const addUsers = async (userInfo) => {
    const res =  await users.doc(userInfo.uid).set(
        userInfo
    )
    return res;
  };


export const addComment = async (msg) => {
    const res =  await commentCollection
      .add({
        id : Math.random(),
        age: 30,
        msg : msg,
        name : "arun solanki"
      })
  };


export const firebaseLogin = async (email , password , navigation) => {

    const response = await auth().signInWithEmailAndPassword(email, password)
    try{
        if(response){
        console.log('User account created & signed in!' ,)
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
            console.log('User account created' , response);
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