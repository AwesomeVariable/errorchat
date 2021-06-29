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
  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(chatObj, newChat);
    await dbService.doc(`chats/${chatObj.id}`).update({
      text: newChat,
    });
    setEdit(false);
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChat(value);
  };
  return (
    <div>
      {edit ? (
        <>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="Edit Your Chat!"
              value={newChat}
              required
              onChange={onChange}
            />
            <input type="submit" value="Update" />
          </form>
          <button onClick={toggleEdit}>Cancel</button>
        </>
      ) : (
        <>
          {" "}
          <h4>{chatObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete</button>
              <button onClick={toggleEdit}>Edit</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
