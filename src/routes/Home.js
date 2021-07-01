import { dbService, stService } from "googlebase";
import React, { useEffect, useState } from "react";
import Chat from "components/Chat.js";
import ChatFactory from "components/ChatFactory";

const Home = ({ userObj }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    dbService
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const chatArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(chatArray);
      });
  }, []);

  return (
    <div className="container">
      <ChatFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {chats.map((chat) => (
          <Chat
            key={chat.id}
            chatObj={chat}
            isOwner={chat.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
