import axios, { AxiosInstance } from "axios";

class ApiClient {
  private static classInstance: AxiosInstance;

  init(baseURL: string) {
    ApiClient.classInstance = axios.create({
      baseURL,
    });
  }

  getInstance() {
    if (!ApiClient.classInstance) {
      throw Error("Init api client first");
    }
    return ApiClient.classInstance;
  }

  call(endpoint: string, params: object) {
    return ApiClient.classInstance.post(endpoint, params, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

const apiClient = new ApiClient();
export default apiClient;
