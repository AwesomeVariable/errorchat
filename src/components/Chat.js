import { dbService } from "googlebase";
import React, { useState } from "react";

const Chat = ({ chatObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm(
      "This action can never be recovered. Do you still want to delete chat?"
    );
    console.log(ok);
    if (ok) {
      await dbService.doc(`chats/${chatObj.id}`).delete();
    }
  };
  const toggleEdit = () => setEdit((prev) => !prev);
  return (
    <div>
      <h4>{chatObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete</button>
          <button onClick={toggleEdit}>Edit</button>
        </>
      )}
    </div>
  );
};

export default Chat;
