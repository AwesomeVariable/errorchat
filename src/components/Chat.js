import { dbService, stService } from "googlebase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ chatObj, isOwner }) => {
  const [edit, setEdit] = useState(false);
  const [newChat, setNewChat] = useState(chatObj.text);
  const onDeleteClick = async () => {
    const ok = window.confirm(
      "This action can never be recovered. Do you still want to delete chat?"
    );

    if (ok) {
      await dbService.doc(`chats/${chatObj.id}`).delete();
      await stService.refFromURL(chatObj.attachmentUrl).delete();
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
    <div className="nweet">
      {edit ? (
        <>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              type="text"
              placeholder="Edit Your Chat!"
              value={newChat}
              required
              autoFocus
              onChange={onChange}
              className="formInput"
            />
            <input type="submit" className="formBtn" value="Update" />
          </form>
          <button onClick={toggleEdit} className="formBtn cancelBtn">
            Cancel
          </button>
        </>
      ) : (
        <>
          {" "}
          <h4>{chatObj.text}</h4>
          {chatObj.attachmentUrl && <img src={chatObj.attachmentUrl} />}
          {isOwner && (
            <div class="nweet__actions">
              <span onClick={onDeleteClick}>
                <FontAwesomeIcon icon={faTrash} />
              </span>
              <span onClick={toggleEdit}>
                <FontAwesomeIcon icon={faPencilAlt} />
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Chat;
