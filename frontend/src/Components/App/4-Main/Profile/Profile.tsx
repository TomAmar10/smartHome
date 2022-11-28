import { useEffect, useState } from "react";
import UserModel from "../../../../models/user-model";
import { NavLink } from "react-router-dom";
import { store } from "../../../../store/store";
import "./Profile.css";
import Button2 from "../../../../UI/ButtonSecond/ButtonSecond";

function Profile(): JSX.Element {
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    const currUser = store.getState().userState.user;
    setUser(currUser);
  }, []);

  return (
    <div className="Profile">
      <h1>{`${user?.first_name} ${user?.last_name}`}</h1>
      <div className="profile-details">
        <div>
          <label>user name: </label>
          <span>{user?.user_name}</span>
        </div>
        <div>
          <label>email: </label>
          <span>{user?.email}</span>
        </div>
        <div>
          <label>creation date: </label>
          <span>{user?.created}</span>
        </div>
      </div>
      <NavLink to={"/user/profile/edit"}>
        <Button2 value="edit profile" />
      </NavLink>
    </div>
  );
}

export default Profile;
