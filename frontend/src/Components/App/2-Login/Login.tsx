import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../models/user-model";
import { store } from "../../../store/store";
import { login } from "../../../store/user-state";
import Button2 from "../../../UI/ButtonSecond/ButtonSecond";
import "./Login.css";

function Login(): JSX.Element {
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/all")
      .then((response) => setAllUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const changeUsername = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    setUsername(value);
    setIsWrong(false);
  };
  const changePassword = (args: SyntheticEvent) => {
    const value = (args.target as HTMLInputElement).value;
    setPassword(value);
    setIsWrong(false);
  };

  const submitForm = (e: any) => {
    e.preventDefault();
    const currUser = allUsers.find(
      (user) => user.user_name === username && user.password === password
    );
    if (!currUser) {
      setIsWrong(true);
      return;
    }
    store.dispatch(login(currUser));
    localStorage.setItem("user", JSON.stringify(currUser));
    navigate("/homepage");
  };

  return (
    <div className="Login">
      <form className="login-form" onSubmit={submitForm}>
        <h3>Welcome Back !</h3>
        <div className="second-header">
          <span>
            {isWrong ? "wrong details!" : "please enter your details"}
          </span>
        </div>
        <div>
          <label>username:</label>
          <input
            type="text"
            style={{ border: isWrong ? "1px red solid" : "1px black solid" }}
            onChange={changeUsername}
            required
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            style={{ border: isWrong ? "1px red solid" : "1px black solid" }}
            onChange={changePassword}
            minLength={6}
            required
          />
        </div>
        <Button2 value="login" />
      </form>
    </div>
  );
}

export default Login;
