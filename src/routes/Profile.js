import userEvent from "@testing-library/user-event";
import { authService, dbService } from "googlebase";
import React, { useEffect } from "react";

export default ({ userObj }) => {
  const onLogOutClick = () => authService.signOut();

  const getMyChats = async () => {
    const chats = await dbService
      .collection("chats")
      .where("creatorId", "==", userObj.uid)
      .orderBy("createdAt")
      .get();
    console.log(chats.docs.map((doc) => doc.data()));
  };
  useEffect(() => {
    getMyChats();
  }, []);
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
