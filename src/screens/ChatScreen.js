import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {getChat} from '../utils/firebase';
import _ from  'underscore'
import {addComment} from '../utils/firebase';
import {getUsertoken} from '../utils/firebase';

const ChatScreen = ({route, navigation}, props) => {
  const [msg, setMsg] = useState('');
  const [collectionRef, setCollectionRef] = useState('');
  const [userId, setUserId] = useState('');
  const [userChats, setUserChats] = useState([]);

  const handleComments = () => {
    if (msg) {
      const date = new Date();
      addComment(msg, userId, collectionRef, route.params._data.email, date);
      setMsg('');
    }
  };

  useEffect(() => {
    const mergeIds = async () => {
      const user1Id = await getUsertoken();
      const user2Id = route.params._data.uid;
      const comId = user1Id > user2Id ? user1Id + user2Id : user2Id + user1Id;
      setUserId(user1Id);
      const commentCollection = firestore().collection(comId);
      setCollectionRef(commentCollection);
      getChatsss(commentCollection);
    };
    mergeIds();
  }, [userChats]);

  const getChatsss = commentCollection => {
    commentCollection.get().then(querySnapshot => {
      const data = querySnapshot.docs?.map(documentSnapshot => {
        return documentSnapshot.data();
      });
      setUserChats(data);
    });
  };

  const data = _.sortBy(userChats, function(item){ return item.createdTime; });
  console.log(data , "sorted data")

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
          value={msg}
          placeholder="type your message here"
          onChangeText={text => setMsg(text)}
        />
        <TouchableOpacity style={styles.btn} onPress={handleComments}>
          <Text style={styles.textBtn}>Send</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
      {data.map((item, i) => {
        return (
          <View style={{height:60}} key={i}>
            {item.id == userId ? (
              <View style={{marginVertical: 5}}>
                <Text
                  style={{
                    backgroundColor: 'blue',
                    color: '#fff',
                    fontSize: 18,
                    paddingHorizontal: 10,
                    width: '75%',
                    paddingVertical: 5,
                    borderBottomRightRadius:10,
                    borderTopRightRadius :10
                  }}>
                  {item.msg}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginVertical:5,
                }}>
                <Text
                  style={{
                    backgroundColor: 'red',
                    color: '#fff',
                    fontSize: 18,
                    paddingHorizontal: 10,
                    width: '75%',
                    paddingVertical: 5,
                    borderBottomLeftRadius:10,
                    borderTopLeftRadius :10
                  }}>
                  {item.msg}
                </Text>
              </View>
            )}
          </View>
        );
      })}
      </ScrollView>
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
