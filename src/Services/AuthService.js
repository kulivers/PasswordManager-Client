import api from "../http";

export default class AuthService {
  static async login(username, password) {
    return api
      .post("/token", { username, password })
      .then((response) => response.data);
  }

  static async regitration(firstName, lastName, username, password, email) {
    return api
      .post("/registration", { firstName, lastName, username, password, email })
      .then((response) => response.data);
  }
  static async logout() {
    return api.post("/logout");
  }
}
