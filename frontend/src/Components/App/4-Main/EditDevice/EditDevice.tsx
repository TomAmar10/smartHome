import axios from "axios";
import { useEffect, useState } from "react";
import DeviceModel from "../../../../models/device-model";
import "./EditDevice.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//name, age, type(select),ins,owner(auto complete), memo, created, chip, image
function EditDevice(props: any): JSX.Element {
  const { register, handleSubmit } = useForm<DeviceModel>();
  const [devices, setDevices] = useState<DeviceModel[]>();
  const [userInput, setUserInput] = useState<string>();
  const navigate = useNavigate();

  useEffect(() => {
    setUserInput(props.prevType);
    axios
      .get("http://localhost:3001/api/device/all")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((err) => console.log(err.message));
  });

  const send = async (newDevice: DeviceModel) => {
    newDevice.id = props.prevDevice.id;
    newDevice.value = props.prevDevice.value;

    const url = `http://localhost:3001/api/device/${newDevice.id}`;
    await axios.put(url, newDevice);
    navigate("/homepage");
  };

  return (
    <div className="EditDevice">
      <form onSubmit={handleSubmit(send)} autoComplete="off">
        <h2> edit device </h2>
        <div>
          <label>Name: </label>
          <input
            type="text"
            {...register("name")}
            defaultValue={props.prevDevice.name}
          />
        </div>
        <div>
          <label>Node id:</label>
          <input
            type="number"
            {...register("node_id", { valueAsNumber: true })}
            defaultValue={props.prevDevice.node_id}
          />
        </div>
        <div>
          <label>Start Value: </label>
          <input
            type="number"
            {...register("minimum_value", { valueAsNumber: true })}
            defaultValue={props.prevDevice.minimum_value}
          />
        </div>
        <div>
          End Value:
          <input
            type="number"
            {...register("maximum_value", { valueAsNumber: true })}
            defaultValue={props.prevDevice.maximum_value}
          />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
}

export default EditDevice;
