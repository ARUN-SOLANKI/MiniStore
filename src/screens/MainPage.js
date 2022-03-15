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

const MainPage = ({route, navigation}, props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const datas = getUsers();
    datas.then(res => {
      setData(res);
    });
  }, []);
  console.log(data, '------------------');

  return (
    <View>
      {data?.map(item => {
        return (
          <UserComponent item={item} navigation={navigation} />
        );
      })}
    </View>
  );
};

export default MainPage;
const styles = StyleSheet.create({
  
});
