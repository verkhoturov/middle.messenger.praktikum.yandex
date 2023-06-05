import tmpl from "./login-form.hbs";
import styles from "./login-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";

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
        click: (e) => {
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
            console.log(formData);
            window.location.href = "/chats";
          }
        },
      },
    });

    const RegisterButton = new Button({
      text: "Register",
      to: "/sign-up.html",
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
