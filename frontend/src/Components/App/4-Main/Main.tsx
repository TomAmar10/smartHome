import { useEffect, useState } from "react";
import "./Main.css";
import AddDevice from "./AddDevice/AddDevice";
import { useNavigate } from "react-router-dom";
import ScenarioList from "./ScenarioList/ScenarioList";
import { Route, Routes } from "react-router-dom";
import EditDevice from "./EditDevice/EditDevice";
import HomePage from "./HomePage/HomePage";
import DeviceModel from "../../../models/device-model";
import Login from "../2-Login/Login";
import Signin from "../3-Signin/Signin";
import { store } from "../../../store/store";
import UserModel from "../../../models/user-model";
import Profile from "./Profile/Profile";
import ProfileEdit from "./Profile/ProfileEdit/ProfileEdit";
import { login } from "../../../store/user-state";

function Main(): JSX.Element {
  const [currDevice, setCurrDevice] = useState<DeviceModel>();
  const [currUser, setCurrUser] = useState<UserModel>();
  const navigate = useNavigate();

  const getUserFromStorage = async () => {
    if (localStorage.getItem("user")) {
      const loggedInUser = await JSON.parse(
        localStorage.getItem("user") as string
      );
      setCurrUser(loggedInUser);
      store.dispatch(login(loggedInUser));
    }
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  const updateDevice = (device: DeviceModel) => {
    setCurrDevice(device);
    navigate("/device/edit");
  };

  return (
    <div className="Main">
      {currUser ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/scenario/list" element={<ScenarioList />} />
          <Route path="/device/add" element={<AddDevice />} />
          <Route path="/" element={<HomePage onEditClick={updateDevice} />} />
          <Route
            path="/homepage"
            element={<HomePage onEditClick={updateDevice} />}
          />
          <Route
            path="/device/edit"
            element={<EditDevice prevDevice={currDevice} />}
          />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user/profile" element={<Profile />} />
          <Route path="/user/profile/edit" element={<ProfileEdit />} />{" "}
        </Routes>
      ) : (
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </div>
  );
}

export default Main;
