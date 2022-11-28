import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import DeviceModel from "../../../../models/device-model";
import { store } from "../../../../store/store";
import ButtonSecond from "../../../../UI/ButtonSecond/ButtonSecond";
import DeviceBox from "./DeviceBox/DeviceBox";
import "./HomePage.css";

function HomePage(props: any): JSX.Element {
  const [allDevices, setAllDevices] = useState<DeviceModel[]>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.getState().userState.user) {
      navigate("/login");
    }
    axios
      .get("http://localhost:3001/api/device/all")
      .then((response) => setAllDevices(response.data));
  }, []);

  const editClick = (device: DeviceModel) => {
    props.onEditClick(device);
  };

  return (
    <div className="HomePage">
      <div className="boxes-container">
        {allDevices?.map((device) => (
          <DeviceBox device={device} key={device.id} onEditClick={editClick} />
        ))}
      </div>
      <NavLink to={"/device/add"}>
        <ButtonSecond value="add device" />
      </NavLink>
    </div>
  );
}

export default HomePage;
