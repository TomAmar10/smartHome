import execute from "../2-data-access/dal";
import { OkPacket } from "mysql";
import errorModel from "../1-models/error-model";
import UserModel from "../1-models/user-model";

const getAllUsers = async (): Promise<UserModel[]> => {
  const sql = `SELECT * FROM users`;
  const users = await execute(sql);
  return users;
};

const getUserById = async (id: number): Promise<UserModel[]> => {
  const sql = `SELECT * FROM users WHERE id = ${id}`;
  const user = await execute(sql);
  return user;
};
const getUserByUsername = async (username: string): Promise<UserModel[]> => {
  const sql = `SELECT * FROM users WHERE username = ${username}`;
  const user = await execute(sql);
  return user;
};

const addUser = async (user: UserModel) => {
  const sql = `
  INSERT INTO users
  Values (DEFAULT , '${user.first_name}', '${user.last_name}', '${user.user_name}', '${user.email}', '${user.password}', '${user.created}')
`;
  const result: OkPacket = await execute(sql);
  user.id = result.insertId;
  return user;
};

const updateFullUser = async (user: UserModel) => {
  const sql = `UPDATE users SET first_name = '${user.first_name}', last_name = '${user.last_name}', user_name = '${user.user_name}', email = '${user.email}', password = '${user.password}', created = '${user.created}' WHERE id = ${user.id}`;
  await execute(sql);
  return user;
};

const deleteUser = async (id: number) => {
  const sql = `DELETE FROM users WHERE id = ${id}`;
  await execute(sql);
};

export default {
  getAllUsers,
  addUser,
  updateFullUser,
  deleteUser,
  getUserById,
  getUserByUsername,
};
