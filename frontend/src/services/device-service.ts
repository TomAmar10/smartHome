import axios from "axios";
import DeviceModel from "../models/device-model";

class Service {
  public getAllDevices = async (): Promise<DeviceModel[]> => {
    const response = await axios.get("http://localhost:3001/api/device/all");
    return response.data;
  };

  public getDevice = async (id: number): Promise<DeviceModel> => {
    const response = await axios.get(`http://localhost:3001/api/device/${id}`);
    return response.data;
  };

  public addDevice = async (type: DeviceModel): Promise<DeviceModel> => {
    const response = await axios.post(
      "http://localhost:3001/api/device/all",
      type
    );
    return response.data;
  };

  public deleteDevice = async (id: number) => {
    await axios.delete("http://localhost:3001/api/device/" + id);
  };

  public updateDevice = async (device: DeviceModel) => {
    const response = await axios.put(
      `http://localhost:3001/api/device/${device.id}`,
      device
    );
    return response.data;
  };
}

const service = new Service();
export default service;
