import axios from "axios";
let instance;
let axiosInstance = null;
const { REACT_APP_API_ENDPOINT, REACT_APP_API_VERSION } = process.env;

class Network {
  constructor() {
    if (instance) {
      throw new Error("Network instance cannot be created!!");
    }

    instance = this;
    this.setNetworkInstance();
  }

  getNetworkInstance() {
    return axiosInstance;
  }

  setNetworkInstance() {
    axiosInstance = axios.create({
      baseURL: REACT_APP_API_ENDPOINT.concat(REACT_APP_API_VERSION),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }

  buildAuthNetworkInstance() {
    axiosInstance = axios.create({
      baseURL: REACT_APP_API_ENDPOINT.concat(REACT_APP_API_VERSION),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }
}

let networkInstance = Object.freeze(new Network());

export default networkInstance;
