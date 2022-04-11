import axios from "axios";

const url = "https://localhost:5001/api";

const config = {
  withCredentials: true, // чтобы для каждого запроса куки цеплялись автоматом
  baseURL: url,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access-token")}`,
    ContentType: "application/json",
    AcceptEncoding: "gzip, deflate, br",
  },
};

const api = () => axios.create(config);

// api.interceptors.request.use((config) => {
//   config.headers.authorization = `Bearer ${localStorage.getItem(
//     "access-token"
//   )}`;
//   config.headers.contentType = "application/json";
//   config.headers.acceptEncoding = "gzip, deflate, br";
//   config.headers.accept = "*/*";
//   return config;
// });

export default api();
