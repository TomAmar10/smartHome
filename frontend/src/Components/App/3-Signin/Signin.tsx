import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../models/user-model";
import { useForm } from "react-hook-form";
import "./Signin.css";
import { store } from "../../../store/store";
import { login } from "../../../store/user-state";

function Signin(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [password, setPassword] = useState<string>();
  const [isPassValid, setIsPassValid] = useState<boolean>(true);
  const [inputUsername, setInputUsername] = useState<string>();
  const [isUsernameValid, setIsUsernameValid] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/all")
      .then((response) => setAllUsers(response.data))
      .catch((err) => console.log(err));
  }, []);

  const submitForm = async (newUser: UserModel) => {
    if (newUser.password !== password) {
      setIsPassValid(false);
      return;
    }
    const prevUser = allUsers.find((u) => newUser.user_name === u.user_name);
    if (prevUser) {
      setIsUsernameValid(false);
      return;
    }
    newUser.created = new Date() + "";
    const result = await axios.post(
      "http://localhost:3001/api/user/all",
      newUser
    );
    store.dispatch(login(newUser));
    localStorage.setItem("user", JSON.stringify(result));
    navigate("/homepage");
  };

  const confirmPass = (args: SyntheticEvent) => {
    setIsPassValid(true);
    const value = (args.target as HTMLInputElement).value;
    setPassword(value);
  };
  const handleUsername = (args: SyntheticEvent) => {
    setIsUsernameValid(true);
    const value = (args.target as HTMLInputElement).value;
    setInputUsername(value);
  };

  return (
    <div className="Signin">
      <form className="signin-form" onSubmit={handleSubmit(submitForm)}>
        <h3>Hello !</h3>
        <div>
          <label>first name:</label>
          <input
            type="text"
            required
            minLength={2}
            {...register("first_name")}
          />
        </div>
        <div>
          <label>last name:</label>
          <input
            type="text"
            required
            minLength={2}
            {...register("last_name")}
          />
        </div>
        <div>
          <label>username:</label>
          <input
            type="text"
            required
            onKeyDown={handleUsername}
            placeholder={isPassValid ? "" : "already exist"}
            style={{
              border: isUsernameValid ? "1px black solid" : "1px red solid",
            }}
            minLength={2}
            {...register("user_name")}
          />
        </div>
        <div>
          <label>email:</label>
          <input type="email" required {...register("email")} />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            minLength={6}
            pattern="(?=.*\d)(?=.*[a-z]).{6,}"
            required
            {...register("password")}
          />
        </div>
        <div>
          <label>confirm:</label>
          <input
            type="password"
            minLength={6}
            placeholder={
              isPassValid ? "confirm your password..." : "repeat your password"
            }
            onChange={confirmPass}
            style={{
              border: isPassValid ? "1px black solid" : "1px red solid",
            }}
            required
          />
        </div>
        <button>sign in</button>
      </form>
    </div>
  );
}

export default Signin;
