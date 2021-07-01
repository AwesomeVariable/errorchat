import { authService } from "googlebase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [err, setErr] = useState("");

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setErr(error.message);
    }
  };
  const toggleAccount = () => setNewAccount((prev) => !prev);
  return (
    <>
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          onChange={onChange}
          value={email}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          onChange={onChange}
          value={password}
          className="authInput"
        />
        <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Sign Up" : "Login"}
        />
        {err && <span className="authError">{err}</span>}
      </form>
      <span className="authSwitch" onClick={toggleAccount}>
        {newAccount ? "Login" : "Sign Up"}
      </span>
    </>
  );
};

export default AuthForm;
