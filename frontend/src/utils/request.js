import Axios from "axios";

import { API_URL } from "../variables";
const API_TOKEN = localStorage.getItem("API_TOKEN");
Axios.defaults.headers.common["Authorization"] = API_TOKEN;
Axios.defaults.headers.common["Content-Type"] = "application/json";
Axios.defaults.headers.common["Accept"] = "application/json";
Axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
Axios.defaults.headers.common["Access-Control-Allow-Origin"] = true;

const request = (type, url, body) => {
  if(!API_TOKEN){
    return
  }
  return Axios({
    method: type,
    url: API_URL + url,
    data: {
      ...body
    }
  })
    .then(r => {
      if(r.data){
        return r;
      }
    })
    .catch(e => {
      console.log(e.message);
      console.log(e.response);
      return e;
      if (e.response.status === 401) {
        // localStorage.clear();
      }
    });
};

export default request;
