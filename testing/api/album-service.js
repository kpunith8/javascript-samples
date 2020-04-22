import axios from "axios";

export default function service() {
  return axios.get("/albums").then((response) => response.data);
}
