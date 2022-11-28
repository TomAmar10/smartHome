import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "../../../../../models/user-model";
import { useForm } from "react-hook-form";
import "./ProfileEdit.css";
import { store } from "../../../../../store/store";
import { login } from "../../../../../store/user-state";
import Button2 from "../../../../../UI/ButtonSecond/ButtonSecond";

function ProfileEdit(): JSX.Element {
  const { register, handleSubmit } = useForm<UserModel>();
  const [allUsers, setAllUsers] = useState<UserModel[]>([]);
  const [userPass, setUserPass] = useState<string>();
  const [isValidPass, setIsValidPass] = useState<boolean>(true);
  const [userUsername, setUserUsername] = useState<string>();
  const [isValidUsername, setIsValidUsername] = useState<boolean>(true);
  const navigate = useNavigate();
  const [currUser, setCurrUser] = useState<UserModel>();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/user/all")
      .then((response) => setAllUsers(response.data))
      .catch((err) => console.log(err));

    setCurrUser(store.getState().userState.user);
  }, []);

  const submitForm = async (newUser: UserModel) => {
    if (currUser) {
      newUser.created = currUser?.created;
      if (currUser.password !== userPass) {
        setIsValidPass(false);
        return;
      }
      const sameUserName = allUsers.find(
        (u) => newUser.user_name === u.user_name
      );
      if (sameUserName) {
        setIsValidUsername(false);
        return;
      }
      const result = await axios.put(
        `http://localhost:3001/api/user/id/${currUser.id}`,
        newUser
      );
      store.dispatch(login(newUser));
      localStorage.setItem("user", JSON.stringify(result));
      navigate("/homepage");
    }
  };

  const handlePassword = (args: SyntheticEvent) => {
    setIsValidPass(true);
    const value = (args.target as HTMLInputElement).value;
    setUserPass(value);
  };
  const handleUsername = (args: SyntheticEvent) => {
    setIsValidUsername(true);
    const value = (args.target as HTMLInputElement).value;
    setUserUsername(value);
  };

  return (
    <div className="ProfileEdit">
      <form className="profile-edit-form" onSubmit={handleSubmit(submitForm)}>
        <h3>Edit your profile</h3>
        <div>
          <label>first name:</label>
          <input
            type="text"
            placeholder={currUser?.first_name}
            required
            minLength={2}
            {...register("first_name")}
          />
        </div>
        <div>
          <label>last name:</label>
          <input
            type="text"
            placeholder={currUser?.last_name}
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
            placeholder={currUser?.user_name}
            minLength={2}
            {...register("user_name")}
          />
        </div>
        <div>
          <label>email:</label>
          <input
            type="email"
            required
            {...register("email")}
            placeholder={currUser?.email}
          />
        </div>
        <div>
          <label>password:</label>
          <input
            type="password"
            placeholder="previous password"
            style={{
              border: isValidPass ? "1px black solid" : "1px red solid",
            }}
            onChange={handlePassword}
            minLength={6}
            pattern="(?=.*\d)(?=.*[a-z]).{6,}"
            required
          />
        </div>
        <div>
          <label>new password:</label>
          <input
            type="password"
            minLength={6}
            placeholder={"new password"}
            {...register("password")}
            required
          />
        </div>
        <Button2 value="save" />
      </form>
    </div>
  );
}

export default ProfileEdit;
