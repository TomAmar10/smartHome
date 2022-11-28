import execute from "../2-data-access/dal";
import { OkPacket } from "mysql";
import errorModel from "../1-models/error-model";
import ScenarioModel from "../1-models/scenario-model";

const getAllScenarios = async (): Promise<ScenarioModel[]> => {
  const sql = `
  SELECT scenario.* , device.name as device_type 
  FROM scenario JOIN device
  ON scenario.device_type = device.id
  `;
  const scenarios = await execute(sql);
  return scenarios;
};

const getScenario = async (id: number): Promise<ScenarioModel[]> => {
  const sql = `SELECT * FROM scenario WHERE id = ${id}`;
  const scenario = await execute(sql);
  return scenario;
};

const addScenario = async (scenario: ScenarioModel) => {
  const sql = `
  INSERT INTO scenario
  Values (DEFAULT , '${scenario.name}', ${scenario.device_type}, ${scenario.start_value}, ${scenario.end_value}, '${scenario.start_date}', '${scenario.end_date}')
`;
  const result: OkPacket = await execute(sql);
  scenario.id = result.insertId;
  return scenario;
};

const updateFullScenario = async (scenario: ScenarioModel) => {
  const sql = `UPDATE scenario SET name = '${scenario.name}', device_type = '${scenario.device_type}', start_value = ${scenario.start_value}, end_value = ${scenario.end_value}, start_date = '${scenario.start_date}', end_date = '${scenario.end_date}'
  WHERE id = ${scenario.id}`;
  const newScenario = await execute(sql);
  return newScenario;
};

const deleteScenario = async (id: number) => {
  const sql = `DELETE FROM scenario WHERE id = ${id}`;
  await execute(sql);
};

export default {
  getAllScenarios,
  addScenario,
  updateFullScenario,
  deleteScenario,
  getScenario,
};

// const sql = `
// SELECT scenario.*, animal_scenario.animal_scenario as scenario
// FROM scenario
// JOIN animal_scenario ON scenario.scenario = animal_scenario.id
// `;

// -------------------------------------------
