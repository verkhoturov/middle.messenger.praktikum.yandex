import compile from "../../utils/compile";
import tmpl from "./login.hbs";

import { LoginForm } from "../../components/login-form";

import Block from "../../utils/block";

export class LoginPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    const loginForm = new LoginForm({});

    return compile(tmpl, {
      loginForm,
    });
  }
}
