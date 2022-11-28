import { useEffect, useState } from "react";
import DeviceModel from "../../../../models/device-model";
import "./ScenarioList.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import ScenarioModel from "../../../../models/scenario-model";
import { store } from "../../../../store/store";

function ScenarioList(): JSX.Element {
  const [devices, setDevices] = useState<DeviceModel[]>();
  const [device, setDevice] = useState<any>();
  const [scenarios, setScenarios] = useState<ScenarioModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.getState().userState.user) {
      navigate("/login");
    }
    axios
      .get("http://localhost:3001/api/scenario/all")
      .then((response) => {
        setScenarios(response.data);
      })
      .catch((err) => console.log(err.message));
    axios
      .get("http://localhost:3001/api/device/all")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((err) => console.log(err.message));
  }, [device]);

  const showDevice = (deviceId: number | string) => {
    const deviceToShow = devices?.find((d) => d.name === deviceId);
    setDevice(deviceToShow);
  };

  const deleteScenario = async (id: number) => {
    await axios.delete(`http://localhost:3001/api/scenario/${id}`);
    setDevice(null);
  };

  return (
    <div className="ScenarioList">
      {device && (
        <>
          <div
            className="modal-container"
            onClick={() => setDevice(null)}
          ></div>
          <div className="device-modal">
            <button className="close-modal" onClick={() => setDevice(null)}>
              ❌
            </button>
            <h2>{device.name}</h2>
            <div>
              <span>serial:</span> <span>{device.node_id}</span>
            </div>
            <div>
              <span>min:</span> <span>{device.minimum_value}</span>
            </div>
            <div>
              <span>max:</span> <span>{device.maximum_value}</span>
            </div>
            <div>
              <span>value:</span> <span>{device.value}</span>
            </div>
          </div>
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>name</th>
            <th>device</th>
            <th>status</th>
            <th>start date</th>
            <th>end date</th>
            <th>details</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {scenarios.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.device_type}</td>
              <td>
                {item.start_value} - {item.end_value}
              </td>
              <td>{item.start_date}</td>
              <td>{item.end_date}</td>
              <td>
                <button
                  className="handle-scenario-button"
                  onClick={() => showDevice(item.device_type)}
                >
                  🔍
                </button>
              </td>
              <td>
                <button
                  className="handle-scenario-button"
                  onClick={() => deleteScenario(item.id)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScenarioList;
