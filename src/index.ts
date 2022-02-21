import { readFileSync } from "fs";
import apiClient from "./clients/api";
import service from "./service";

const init = () => {
  const config = JSON.parse(readFileSync(`${__dirname}/config.json`, "utf8"));

  //initialize api
  apiClient.init(config.baseUrl);

  service(config);
};

init();
