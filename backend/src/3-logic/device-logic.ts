import execute from "../2-data-access/dal";
import { OkPacket } from "mysql";
import errorModel from "../1-models/error-model";
import DeviceModel from "../1-models/device-model";

const getAllDevices = async (): Promise<DeviceModel[]> => {
  const sql = `SELECT * FROM device`;
  const devices = await execute(sql);
  return devices;
};

const getDevice = async (id: number): Promise<DeviceModel[]> => {
  const sql = `SELECT * FROM device WHERE id = ${id}`;
  const device = await execute(sql);
  return device;
};

const addDevice = async (device: DeviceModel) => {
  const sql = `
  INSERT INTO device
  Values (DEFAULT , '${device.name}', ${device.node_id}, ${device.minimum_value}, ${device.maximum_value}, ${device.value})
`;
  const result: OkPacket = await execute(sql);
  device.id = result.insertId;
  return device;
};

const updateFullDevice = async (device: DeviceModel) => {
  const sql = `UPDATE device SET name = '${device.name}', node_id = ${device.node_id}, minimum_value = ${device.minimum_value}, maximum_value = ${device.maximum_value}, value = ${device.value} WHERE id = ${device.id}`;
  await execute(sql);
  return device;
};

const deleteDevice = async (id: number) => {
  const sql = `DELETE FROM device WHERE id = ${id}`;
  await execute(sql);
};

export default {
  getAllDevices,
  addDevice,
  updateFullDevice,
  deleteDevice,
  getDevice,
};
