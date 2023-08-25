import HTTPTransport from "../utils/HTTPTransport";
import { User } from "../utils/types";

const PRAKTIKUM_API_URL = "https://ya-praktikum.tech/api/v2";

class AuthAPI {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  async singUp(data: User) {
    try {
      const res = await this.http.post(PRAKTIKUM_API_URL + "/auth/signup", {
        data
      });

      return {
        status: "success",
        message: res
      };
    } catch (error) {
      console.error(error);

      return {
        status: "error",
        message: error?.reason ?? error?.message ?? error ?? "Unknown error"
      };
    }
  }

  async singIn(data: User) {
    try {
      const res = await this.http.post(PRAKTIKUM_API_URL + "/auth/signin", {
        data
      });

      return {
        status: "success",
        message: res
      };
    } catch (error) {
      console.error(error);

      return {
        status: "error",
        message: error?.reason ?? error?.message ?? error ?? "Unknown error"
      };
    }
  }

  async getUser() {
    try {
      const user = await this.http.get(PRAKTIKUM_API_URL + "/auth/user");

      return {
        status: "success",
        user: typeof user === "string" ? JSON.parse(user) : user
      };
    } catch (error) {
      console.log(error);
    }
  }

  async logout() {
    try {
      const res = await this.http.post(PRAKTIKUM_API_URL + "/auth/logout");

      return {
        status: "success",
        message: res
      };
    } catch (error) {
      console.error(error);
    }
  }
}

export default AuthAPI;
