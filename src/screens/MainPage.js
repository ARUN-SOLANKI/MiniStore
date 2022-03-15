import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import {getUsers} from '../utils/firebase';
import UserComponent from '../components/UserComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MainPage = ({route, navigation}, props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const datas = getUsers();
    datas.then(res => {
      setData(res);
    });
  }, []);
  console.log(data, '------------------');

  const clearLocal = () =>{
    AsyncStorage.removeItem('token');
    navigation.navigate('LoginPage')
  }


  return (
    <View>
      {data?.map(item => {
        return (
          <View key={item._data.email}>
          <UserComponent item={item} navigation={navigation} />
          </View>
        );
      })}
      <Button title='logout' onPress={clearLocal} />
    </View>
  );
};

export default MainPage;
const styles = StyleSheet.create({
  
});
