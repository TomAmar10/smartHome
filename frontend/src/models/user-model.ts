class UserModel {
  public id: number;
  public first_name: string;
  public last_name: string;
  public user_name: string;
  public email: string;
  public password: string;
  public created: string;

  public constructor(device: UserModel) {
    this.id = device.id;
    this.first_name = device.first_name;
    this.last_name = device.last_name;
    this.user_name = device.user_name;
    this.email = device.email;
    this.password = device.password;
    this.created = device.created;
  }
}

export default UserModel;
