import axios from "axios";

export const requestUrl =  axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});
