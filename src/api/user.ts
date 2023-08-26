import HTTPTransport from "../utils/HTTPTransport";
import { User } from "../utils/types";

const API = import.meta.env.VITE_PRAKTIKUM_API_URL;

class UserAPI {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  async updateProfile(data: User) {
    try {
      const res = await this.http.put(API + "/user/profile", {
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

  // async updateAvatar(data: FormData) {}

  async updatePassword({
    oldPassword,
    newPassword
  }: {
    oldPassword: string;
    newPassword: string;
  }) {
    try {
      const res = await this.http.put(API + "/user/password", {
        data: {
          oldPassword,
          newPassword
        }
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
}

export default UserAPI;
