import {StyleSheet, Text, View ,TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import { addComment } from '../utils/firebase';

const ChatScreen = ({route, navigation}, props) => {
  const [msg, setMsg] = useState('');
  const handleComments = () => {
    addComment(msg);
  };

  console.log(route, 'props--------------------')
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
