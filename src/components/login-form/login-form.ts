import tmpl from "./login-form.hbs";
import styles from "./login-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";
import Router from "../../utils/router";
import { LocalStorageItem } from "../../utils/types";

import AuthApi from "../../api/auth";

interface LoginFormProps {}

export class LoginForm extends Block {
  constructor(props: LoginFormProps) {
    super("div", props);
  }

  onFocus(event: Event) {
    const element = event.target as HTMLInputElement;

    if (!isValid(element)) {
      element.style.borderColor = "red";
    } else {
      element.style.borderColor = "black";
    }
  }

  render() {
    const LoginInput = new Input({
      name: "login",
      placeholder: "Login",
      validationType: "login",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const PasswordInput = new Input({
      name: "password",
      placeholder: "Password",
      type: "password",
      validationType: "password",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const EnterButton = new Button({
      text: "Enter",
      events: {
        click: async (e) => {
          e.preventDefault();

          const inputs = [LoginInput, PasswordInput];

          const formData: { [index: string]: any } = {};

          let isFormValid = true;

          inputs.map((input) => {
            const el = input.element as HTMLInputElement;

            if (!isValid(el)) {
              isFormValid = false;
              el.style.borderColor = "red";
            } else {
              const name = el.getAttribute("name");
              const { value } = el;
              if (name) {
                formData[name] = value;
              }
            }
          });

          if (isFormValid) {
            const auth = new AuthApi();

            const res = await auth.singIn({
              login: formData.login,
              password: formData.password,
            });

            if (res?.status === "error") {
              inputs.map((input) => {
                const el = input.element as HTMLInputElement;
                el.style.borderColor = "red";
              });
            }

            if (res?.status === "success") {
              const userRes = await auth.getUser();

              if (userRes?.status === "success") {
                localStorage.setItem(
                  LocalStorageItem.USER,
                  JSON.stringify(userRes.user)
                );
                Router.go("/chats");
              }
            }
          }
        },
      },
    });

    const RegisterButton = new Button({
      text: "Register",
      events: {
        click: () => {
          Router.go("/sign-up");
        },
      },
    });

    return compile(tmpl, {
      styles,
      LoginInput,
      PasswordInput,
      EnterButton,
      RegisterButton,
    });
  }
}
