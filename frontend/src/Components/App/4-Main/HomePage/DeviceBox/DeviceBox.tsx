import "./DeviceBox.css";
import Slider from "@mui/material/Slider";
import { useState, useEffect } from "react";
import axios from "axios";
import DeviceModel from "../../../../../models/device-model";
import ScenarioModel from "../../../../../models/scenario-model";
import { store } from "../../../../../store/store";

function DeviceBox(props: any): JSX.Element {
  const [value, setValue] = useState<number | number[]>(props.device.value);
  const [device, setDevice] = useState<DeviceModel>(props.device);
  const [isHelp, setIsHelp] = useState<boolean>(false);
  const [firstVal, setFirstVal] = useState<number>(value as number);

  const handleChange = async (event: Event, newValue: number | number[]) => {
    setValue(newValue);
    const newDevice = { ...device };
    newDevice.value = newValue as number;
    await axios.put(
      `http://localhost:3001/api/device/${newDevice.id}`,
      newDevice
    );
  };

  const deleteDevice = async () => {
    await axios.delete(`http://localhost:3001/api/device/${props.device.id}`);
  };

  const editDevice = async () => {
    props.onEditClick(props.device);
  };

  const mouseUp = () => {
    if (store.getState().userState.user) {
      const scenario = {
        name: store.getState().userState.user?.first_name as string,
        device_type: device.id,
        start_value: firstVal,
        end_value: value,
        start_date: new Date().toLocaleDateString() + "",
        end_date: new Date().toLocaleDateString() + "",
      };
      console.log(scenario);
      axios.post("http://localhost:3001/api/scenario/all", scenario);
      setFirstVal(value as number);
    }
  };

  return (
    <div className="DeviceBox" onClick={() => isHelp && setIsHelp(false)}>
      <div className="top-device-box">
        <h3>{props.device.name}</h3>
        <img
          src={require("../../../../../images/editImg.png")}
          alt=""
          onClick={() => setIsHelp(!isHelp)}
          className="edit-img"
        />
        {isHelp && (
          <select id="" size={2}>
            <option value="edit-device" onClick={editDevice}>
              edit
            </option>
            <option value="delete-device" onClick={deleteDevice}>
              delete
            </option>
          </select>
        )}
      </div>
      <Slider
        value={value}
        color="primary"
        aria-label="Default"
        valueLabelDisplay="auto"
        onChange={handleChange}
        onMouseUp={mouseUp}
      />
    </div>
  );
}

export default DeviceBox;
