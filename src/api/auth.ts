import HTTPTransport from "../utils/HTTPTransport";
import { User } from "../utils/types";

const API = import.meta.env.VITE_PRAKTIKUM_API_URL;

class AuthAPI {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  async singUp(data: User) {
    try {
      const res = await this.http.post(API + "/auth/signup", {
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
      const res = await this.http.post(API + "/auth/signin", {
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
      const user = await this.http.get(API + "/auth/user");

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
      const res = await this.http.post(API + "/auth/logout");

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
