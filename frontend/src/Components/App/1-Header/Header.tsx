import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import UserModel from "../../../models/user-model";
import { useNavigate } from "react-router-dom";
import { store } from "../../../store/store";
import { login, logout } from "../../../store/user-state";
import "./Header.css";
import Button from "../../../UI/Button/Button";

function Header(): JSX.Element {
  const [currUser, setCurrUser] = useState<UserModel>();
  const navigate = useNavigate();

  const getUser = async () => {
    if (localStorage.getItem("user")) {
      const loggedInUser = await JSON.parse(
        localStorage.getItem("user") as string
      );
      setCurrUser(loggedInUser);
    }
  };

  useEffect(() => {
    getUser();
  }, [store.getState().userState.user]);

  const logOut = () => {
    store.dispatch(logout());
    setCurrUser(undefined);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="Header">
      <div className="top-links">
        {currUser ? (
          <NavLink to={"/homepage"}>
            <Button value="Home" />
          </NavLink>
        ) : (
          <NavLink to={"/login"} className="login-btn navLink">
            <Button value="login" />
          </NavLink>
        )}
      </div>
      <h2>{currUser ? `Hello ${currUser?.user_name}!` : "Smart Home"}</h2>
      <div className="top-buttons-right">
        {currUser ? (
          <div>
            <NavLink to={"/scenario/list"}>
              <Button value="scenarios" />
            </NavLink>
            <NavLink to={"/user/profile"}>
              <img src={require("../../../images/profile.png")} alt="" />
            </NavLink>
            <img
              src={require("../../../images/logout.png")}
              alt=""
              onClick={logOut}
            />
          </div>
        ) : (
          <NavLink to={"/signin"} className="signin-btn navLink">
            <Button value="sign in" />
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default Header;
