import axios from "axios";

const http = axios.create({
  baseURL: "https://plankton-app-848ak.ondigitalocean.app/api",
});

export default http;
