import HTTPTransport from "../utils/HTTPTransport";

const PRAKTIKUM_API_URL = "https://ya-praktikum.tech/api/v2";

interface User {
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  password?: string;
  phone?: string;
}

class AuthAPI {
  http: HTTPTransport;

  constructor() {
    this.http = new HTTPTransport();
  }

  async singIn(data: User) {
    try {
      const res = await this.http.post(PRAKTIKUM_API_URL + "/auth/signin", { data });
      
      console.log("res", res);
      
    } catch (error) {
      console.log(error);
    }
  }

  /*
  singUp(data: User) {
    return this.http.post(URL + "/auth/signup", { data });
  }

  getUser() {
    return this.http.get(URL + "/auth/user");
  }

  logout() {
    return this.http.post(URL + "/auth/logout");
  }
  */
}

export default AuthAPI;
