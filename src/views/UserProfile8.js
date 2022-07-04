import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, Text, Button, StyleSheet } from "react-native";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import COLORS from "../consts/colors";
//import Button from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Looder";

const UserProfile8 = ({ route, navigation }) => {
  const { token, email, receiverID, conversation } = route.params;

  console.log(token, email, receiverID);
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   axios
  //   .get(
  //     `http://tourbook-backend.herokuapp.com/api/messages/conversation/${conversation._id}`,
  //     {
  //       headers: { "x-auth-token": token },
  //     }
  //   )
  //   .then((res) => {
  //     console.log("Get messages", res.data.data);
  //     setMessages(res.data.data);
  //   })
  //   .catch((err) => console.log(err.response));
  // }, [conversation]);

  // useEffect(() => {

  //   const pusher = new PusherJs('8446967bdc196e48bfbc', {
  //     cluster: 'ap2',
  //     encrypted: true,
  //   });

  //   const channel = pusher.subscribe(conversationID._id);

  //   channel.bind('message-received', (data) => {

  //     setMessages([...messages, data]);
  //     console.log('array', messages);
  //     console.log('pusher', data);
  //   });

  //   return () => {

  //     pusher.unsubscribe(conversationID._id);
  //   };
  // }, [messages]);

  const SendMessage = (msg) => {
    console.log(msg[0].text);
    // axios
    //   .post(
    //     "http://tourbook-backend.herokuapp.com/api/messages/create",
    //     {
    //       roomID: conversation._id,
    //       receiver: receiverID,
    //       message: msg,
    //     },
    //     {
    //       headers: { "x-auth-token": token },
    //     }
    //   )
    //   .then((res) => {
    //     console.log("conversation init", res.data.data);
    //   })
    //   .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);
  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{ marginBottom: 5, marginRight: 5 }}
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#2e64e5",
          },
        }}
        textStyle={{
          right: {
            color: "#fff",
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => SendMessage(messages)}
      user={{
        _id: 1,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default UserProfile8;
