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
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <input
          onChange={onChange}
          type="text"
          autoFocus
          placeholder="Display name"
          value={newName}
          className="formInput"
        />
        <input
          type="submit"
          value="Update"
          className="formBtn"
          style={{
            marginTop: 10,
            backgroundColor: "black",
            color: "white",
          }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};
