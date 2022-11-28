class ScenarioModel {
  public id: number;
  public name: string;
  public device_type: number;
  public start_value: number;
  public end_value: number;
  public start_date: string;
  public end_date: string;

  public constructor(scenario: ScenarioModel) {
    this.id = scenario.id;
    this.name = scenario.name;
    this.device_type = scenario.device_type;
    this.start_value = scenario.start_value;
    this.end_value = scenario.end_value;
    this.start_date = scenario.start_date;
    this.end_date = scenario.end_date;
  }
}

export default ScenarioModel;
