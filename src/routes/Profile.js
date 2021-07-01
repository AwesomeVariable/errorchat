import userEvent from "@testing-library/user-event";
import { authService, dbService } from "googlebase";
import React, { useEffect, useState } from "react";

export default ({ loadUser, userObj }) => {
  const [newName, setNewName] = useState(userObj.displayName);
  const onLogOutClick = () => authService.signOut();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewName(value);
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newName) {
      await userObj.updateProfile({
        displayName: newName,
      });
      loadUser();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          onChange={onChange}
          placeholder="What's your name?"
          value={newName}
        />
        <input type="submit" value="Update" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
