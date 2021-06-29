import { dbService } from "googlebase";
import React, { useEffect, useState } from "react";
import Chat from "components/Chat.js";
const Home = ({ userObj }) => {
  const [chat, setChat] = useState("");
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

  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("chats").add({
      text: chat,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setChat("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setChat(value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={chat}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={150}
        />
        <input type="submit" value="Chat" />
      </form>
      <div>
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
