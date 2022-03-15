import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import { getChat } from '../utils/firebase';

import {addComment} from '../utils/firebase';
import {getUsertoken} from '../utils/firebase';

const ChatScreen = ({route, navigation}, props) => {
  const [msg, setMsg] = useState('');
  const [collectionRef, setCollectionRef] = useState('');
  const [userId , setUserId] = useState('')

    console.log(route, "jfhkksjn")

  const handleComments = () => {
    addComment(
      msg , userId, collectionRef
    );
  };

  useEffect(async () => {
    const user1Id = await getUsertoken();
    const user2Id = route.params._data.uid;
    const comId = user1Id > user2Id ? user1Id + user2Id : user2Id + user1Id;
    const commentCollection = firestore().collection(comId);
    setUserId(user1Id)
    getChat(commentCollection)
    setCollectionRef(commentCollection);
  }, []);

  return (
    <View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}>
        <TextInput
          style={styles.TextInput}
          placeholder="type your message here"
          onChangeText={text => setMsg(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleComments}>
          <Text style={styles.textBtn}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  TextInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10,
    width: '80%',
  },
  btn: {
    backgroundColor: 'blue',
    padding: 16,
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
  },
  textBtn: {
    color: '#fff',
  },
});
