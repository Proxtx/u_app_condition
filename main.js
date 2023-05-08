import config from "@proxtx/config";

let api;

export class App {
  constructor(config) {
    this.config = config;
  }

  async IF(condition, action) {
    if (condition) {
      if (!api) api = await import("../../public/api.js");
      return await api.execute(
        config.pwd,
        action.appName,
        action.method,
        action.arguments
      );
    }
  }
}
