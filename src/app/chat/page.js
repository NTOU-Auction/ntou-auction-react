"use client";
import React, { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";
import Cookies from "js-cookie";
import axios from "axios";
/* UI */
import {
  Avatar,
  MainContainer,
  ChatContainer,
  Sidebar,
  ConversationList,
  Conversation,
  MessageList,
  Message,
  MessageInput,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

const token = Cookies.get("token");

const WebSocketTest = () => {
  // const [user, setUser] = useState(null);
  const [userMessage, setUserMessage] = useState(""); /* 使用者輸入欄的訊息 */
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    // 在這裡呼叫獲取先前訊息的函式
    fetchPreviousMessages();
  }, []); // 空的依賴陣列表示只在組件載入時執行一次

  const fetchPreviousMessages = async () => {
    try {
      const response = await axios.get(
        /* 從哪裡來拿訊息 */
        `http://localhost:8080/api/v1/chat/messages/1`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const previousMessagesData = response.data;
      const userId = localStorage.getItem("userID");
      const messageObjects = previousMessagesData
        .map((message) => {
          if (message.senderId != userId) {
            // 訊息是對方傳送過來的
            return {
              message: message.content,
              direction: "incoming",
              position: "single",
            };
          } else if (message.senderId == userId) {
            // 訊息是自己之前發出去的
            return {
              message: message.content,
              direction: "outgoing",
              position: "single",
            };
          }
          // 可能有其他情況需要處理
          return null; // 或者回傳一個預設值
        })
        .filter((message) => message !== null); // 過濾掉可能的空值
      setMessages(messageObjects);

      console.log(previousMessagesData);
      // 設置先前的聊天訊息到狀態中
      // setPreviousMessages(previousMessagesData);
    } catch (error) {
      console.error("獲取先前的聊天訊息錯誤:", error);
    }
  };

  useEffect(() => {
    const newClient = new Client({
      brokerURL: "ws://localhost:8080/ws",
      connectHeaders: {
        Authorization: `${token}`,
      },
      debug: function (str) {
        console.log(str);
      },
      // reconnectDelay: 5000,
      // heartbeatIncoming: 4000,
      // heartbeatOutgoing: 4000,
    });

    newClient.onConnect = function (frame) {
      console.log("Connected to WebSocket server");
      setClient(newClient);
      const userId = localStorage.getItem("userID");
      const subscription = newClient.subscribe(
        "/user/" + userId + "/queue/messages",
        async (message) => {
          const receivedMessage = JSON.parse(message.body);
          console.log(receivedMessage);

          try {
            const response = await axios.get(
              `http://localhost:8080/api/v1/chat/messages/${receivedMessage.senderId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const tmpMessage = response.data;
            const messageObjects = tmpMessage.map((message) => {
              if (message.senderId != userId) {
                // 訊息是對方傳送過來的
                return {
                  message: message.content,
                  direction: "incoming",
                  position: "single"
                };
              } else {
                // 訊息是自己之前發出去的
                return {
                  message: message.content,
                  direction: "outgoing",
                  position: "single"
                };
              }
            });
            console.log(messageObjects)
            setMessages(messageObjects);
            // messageObjects.forEach((msgObj) => {
            //   setMessages((prevMessages) => [...prevMessages, msgObj]);
            //   // setMessages(msgObj);
            // });
          } catch (error) {
            console.error("Error fetching messages for sender ID:", error);
          }
        }
      );

      return () => {
        if (subscription) {
          subscription.unsubscribe();
        }
        if (newClient && newClient.connected) {
          newClient.deactivate();
        }
      };
    };

    newClient.onStompError = function (frame) {
      console.log("Broker reported error: " + frame.headers["message"]);
      console.log("Additional details: " + frame.body);
    };

    newClient.activate();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
  }, []);

  /* 發送訊息 */
  const handleSendMessage = () => {
    if (userMessage && userMessage.trim() !== "") {
      const newMessageSocket = { /* 訊息傳給誰 */ 
        receiverId: "2",
        content: userMessage,
      };

      const newMessage = {
        message: userMessage,
        direction: "outgoing",
        position: "single",
        // sentTime: new Date().toLocaleTimeString(),
        // sender: "You", // Assuming the sender is the user
      };

      console.log(newMessage);
      /* 設定發送者聊天室顯示訊息 */
      // setMessages([...messages, newMessage]);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      // console.log(messages)
      /* 將新發送的訊息透過socket傳遞 */
      if (client && client.connected) {
        client.publish({
          destination: "/app/send",
          body: JSON.stringify(newMessageSocket),
        });
      }
      setUserMessage("");
    }
  };

  /* 畫面顯示訊息 */
  const handleInputChange = (e) => {
    setUserMessage(e);
  };

  return (
    <div style={{ position: "relative", height: "500px" }}>
      <MainContainer style={{ marginTop: "60px" }}>
        <Sidebar position="left">
          <ConversationList>
            <Conversation
              name="keke"
              lastSenderName="keke"
              info="你好"
              active={true}
            >
              <Avatar src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <Avatar src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" />
            <ConversationHeader.Content
              userName="keke"
              info="上次上線: 10分鐘前"
            ></ConversationHeader.Content>
          </ConversationHeader>
          <MessageList>
            {messages.map((msg, index) => (
              <Message key={index} model={msg}>
                {/* <Avatar src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" /> */}
              </Message>
            ))}
            <Message
              model={{
                message: "你好嗎?",
                sender: "keke",
                sentTime: "10分鐘前",
                direction: "incoming",
                position: "single",
              }}
            >
              <Avatar src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" />
            </Message>

            <Message
              model={{
                message: "我不好",
                sender: "keke",
                sentTime: "10分鐘前",
                direction: "outgoing",
                position: "single",
              }}
            >
              <Avatar src="https://cdn-icons-png.flaticon.com/128/1077/1077114.png" />
            </Message>
          </MessageList>
          <MessageInput
            value={userMessage}
            onChange={handleInputChange}
            placeholder="請在此輸入訊息"
            onSend={handleSendMessage}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default WebSocketTest;