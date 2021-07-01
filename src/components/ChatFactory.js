import { dbService, stService } from "googlebase";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const ChatFactory = ({ userObj }) => {
  const [chat, setChat] = useState("");
  const [fileUrl, setfileUrl] = useState("");
  const onSubmit = async (event) => {
    event.preventDefault();
    if (chat === "") {
      return;
    }

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
  const onClearPhotoClick = () => setfileUrl("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={chat}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={150}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label for="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>

      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />

      {fileUrl && (
        <div className="factoryForm__attachment">
          <img
            src={fileUrl}
            style={{
              backgroundImage: fileUrl,
            }}
          />
          <div className="factoryForm__clear" onClick={onClearPhotoClick}>
            <span>Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default ChatFactory;
