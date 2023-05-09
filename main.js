import config from "@proxtx/config";
import { genCombine } from "@proxtx/combine-rest/request.js";
import { genModule } from "@proxtx/combine/combine.js";

let api;

export class App {
  constructor(config) {
    this.config = config;
    this.initPromise = this.init();
  }

  async init() {
    this.inputApi = await genCombine(
      this.config.input,
      "public/api.js",
      genModule
    );
  }

  async IF(condition, action) {
    await this.initPromise;
    if (condition) {
      if (!api) api = await import("../../public/api.js");
      for (let arg in action.arguments) {
        action.arguments[arg] = await this.inputApi.resolveInput(
          action.arguments[arg]
        );
      }

      return await api.execute(
        config.pwd,
        action.appName,
        action.method,
        action.arguments
      );
    }
  }
}
