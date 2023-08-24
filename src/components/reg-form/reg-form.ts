import tmpl from "./reg-form.hbs";
import styles from "./reg-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";
import Router from "../../utils/router";

interface RegFormProps {}

export class RegForm extends Block {
  constructor(props: RegFormProps) {
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
    const NameInput = new Input({
      name: "first_name",
      placeholder: "First name",
      validationType: "name",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const SecondNameInput = new Input({
      name: "second_name",
      placeholder: "Second name",
      validationType: "name",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const LoginInput = new Input({
      name: "login",
      placeholder: "Login",
      validationType: "login",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const EmailInput = new Input({
      name: "email",
      type: "email",
      placeholder: "Email",
      validationType: "email",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const PhoneInput = new Input({
      name: "phone",
      placeholder: "Phone",
      type: "tel",
      validationType: "phone",
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

    const SignUpButton = new Button({
      text: "Sign up",
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [
            NameInput,
            SecondNameInput,
            LoginInput,
            EmailInput,
            PhoneInput,
            PasswordInput,
          ];

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
            Router.go("/chats");
          }
        },
      },
    });

    const LoginButton = new Button({
      text: "Login",
      events: {
        click: () => {
          Router.go("/login");
        }
      }
    });

    return compile(tmpl, {
      styles,
      NameInput,
      SecondNameInput,
      LoginInput,
      EmailInput,
      PhoneInput,
      PasswordInput,
      SignUpButton,
      LoginButton,
    });
  }
}
