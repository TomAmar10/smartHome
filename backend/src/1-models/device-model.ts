class DeviceModel {
  public id: number;
  public name: string;
  public node_id: number;
  public minimum_value: number;
  public maximum_value: number;
  public value: number;

  public constructor(device: DeviceModel) {
    this.id = device.id;
    this.name = device.name;
    this.node_id = device.node_id;
    this.minimum_value = device.minimum_value;
    this.maximum_value = device.maximum_value;
    this.value = device.value;
  }
}

export default DeviceModel;
