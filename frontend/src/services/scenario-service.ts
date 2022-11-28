import axios from "axios";
import ScenarioModel from "../models/scenario-model";

class Service {
  public getAllScenario = async (): Promise<ScenarioModel[]> => {
    const response = await axios.get("http://localhost:3001/api/scenario/all");
    return response.data;
  };

  public getScenario = async (id: number): Promise<ScenarioModel> => {
    const response = await axios.get(
      `http://localhost:3001/api/scenario/${id}`
    );
    return response.data;
  };

  public addScenario = async (
    scenario: ScenarioModel
  ): Promise<ScenarioModel> => {
    const response = await axios.post(
      "http://localhost:3001/api/scenario/all",
      scenario
    );
    return response.data;
  };

  public deleteScenario = async (id: number) => {
    await axios.delete("http://localhost:3001/api/scenario/" + id);
  };

  public updateScenario = async (scenario: ScenarioModel) => {
    const response = await axios.put(
      `http://localhost:3001/api/scenario/${scenario.id}`,
      scenario
    );
    return response.data;
  };
}

const service = new Service();
export default service;
