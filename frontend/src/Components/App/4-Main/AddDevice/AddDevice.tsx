import axios from "axios";
import { useEffect, useState } from "react";
import DeviceModel from "../../../../models/device-model";
import "./AddDevice.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddDevice(): JSX.Element {
  const { register, handleSubmit } = useForm<DeviceModel>();
  const [deviceTypes, setDeviceTypes] = useState<DeviceModel[]>();
  const navigate = useNavigate();

  const send = async (newDevice: DeviceModel) => {
    const scenario = new DeviceModel(newDevice);
    scenario.value = 50;
    const url = "http://localhost:3001/api/device/all";
    await axios.post(url, scenario);
    navigate("/homepage");
  };

  return (
    <div className="AddDevice">
      <form onSubmit={handleSubmit(send)} autoComplete="off">
        <h2> add device </h2>
        <div>
          <label>Name: </label>
          <input type="text" {...register("name")} />
        </div>
        <div>
          <label>Node id:</label>
          <input
            type="number"
            {...register("node_id", { valueAsNumber: true })}
          />
        </div>
        <div>
          <label>Minimum: </label>
          <input
            type="number"
            {...register("minimum_value", { valueAsNumber: true })}
            required
          />
        </div>
        <div>
          Maximum:
          <input
            type="number"
            {...register("maximum_value", { valueAsNumber: true })}
            required
          />
        </div>
        <div>
          <input type="submit" value="submit" />
        </div>
      </form>
    </div>
  );
}

export default AddDevice;
