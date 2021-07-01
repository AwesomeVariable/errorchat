import { dbService, stService } from "googlebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const ChatFactory = ({ userObj }) => {
  const [chat, setChat] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    if (fileUrl !== "") {
      const fileRef = stService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(fileUrl, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    const chatObj = {
      text: chat,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("chats").add(chatObj);
    setChat("");
    setfileUrl("");
  };
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setChat(value);
  };
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    const oneFile = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (doneEvent) => {
      const {
        currentTarget: { result },
      } = doneEvent;
      setfileUrl(result);
    };
    fileReader.readAsDataURL(oneFile);
  };
  const onClearPhotoClick = () => setfileUrl(null);
  return (
    <form onSubmit={onSubmit}>
      <input
        value={chat}
        onChange={onChange}
        type="text"
        placeholder="What's on your mind?"
        maxLength={150}
      />
      <input type="file" accept="image/*" onChange={onFileChange} />
      <input type="submit" value="Chat" />
      <a href="www.awesomevariable.github.io/paint-js">Paint</a>
      {fileUrl && (
        <div>
          <img src={fileUrl} width="50px" height="50px" />
          <button onClick={onClearPhotoClick}>Cancel</button>
        </div>
      )}
    </form>
  );
};

export default ChatFactory;
