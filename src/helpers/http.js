import axios from "axios";

const http = axios.create({
  //baseURL: "https://plankton-app-848ak.ondigitalocean.app/api",
  baseURL: "http://sistema-admision-back.test/api",
  
});

export default http;
