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
import { ScrollView } from 'react-native-gesture-handler';


const MainPage = ({route, navigation}, props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const datas = getUsers();
    datas.then(res => {
      setData(res);
    });
  }, []);

  const clearLocal = () =>{
    AsyncStorage.removeItem('token');
    navigation.navigate('LoginPage')
  }


  return (
    <View>
      <Button title='logout' onPress={clearLocal} />
      <ScrollView style={{marginBottom:30}}>
      {data?.map(item => {
        return (
          <View key={item._data.email}>
          <UserComponent item={item} navigation={navigation} />
          </View>
        );
      })}
      </ScrollView>
    </View>
  );
};

export default MainPage;
const styles = StyleSheet.create({
  
});
