import tmpl from "./settings-form.hbs";
import styles from "./settings-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";
import Router from "../../utils/router";

// import AuthApi from "../../api/auth";
import { User } from "../../utils/types";

interface SettingsFormProps {}

export class SettingsForm extends Block {
  // private user: User | null = null;

  constructor(props: SettingsFormProps) {
    super("div", props);
    // this.user = null;
  }

  onFocus(event: Event) {
    const element = event.target as HTMLInputElement;

    if (!isValid(element)) {
      element.style.borderColor = "red";
    } else {
      element.style.borderColor = "black";
    }
  }

  /*
  componentDidMount() {
    const getUser = async () => {
      const auth = new AuthApi();
      const data = await auth.getUser();

      this.user = data?.user;

    };

    getUser();
  }
  */

  render() {
    const userFromLocalData = localStorage.getItem("ya-messenger-user");

    if (!userFromLocalData) return null;

    const user: User = JSON.parse(userFromLocalData);

    const {
      display_name,
      first_name,
      second_name,
      login,
      email,
      phone,
      // avatar,
    } = user;

    const DisplayNameInput = new Input({
      placeholder: "Chat nickname",
      name: "display_name",
      value: display_name,
    });

    const FistNameInput = new Input({
      placeholder: "Name",
      name: "first_name",
      validationType: "name",
      value: first_name,
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const SecondNameInput = new Input({
      name: "second_name",
      placeholder: "Second name",
      validationType: "name",
      value: second_name,
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const LoginInput = new Input({
      name: "login",
      placeholder: "Login",
      validationType: "login",
      value: login,
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
      value: email,
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
      value: phone,
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const AvatarInput = new Input({
      name: "avatar",
      placeholder: "Avatar",
      type: "file",
    });

    const SaveButton = new Button({
      text: "Save",
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [
            DisplayNameInput,
            FistNameInput,
            SecondNameInput,
            LoginInput,
            EmailInput,
            PhoneInput,
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

    const BackButton = new Button({
      text: "Back",
      events: {
        click: () => {
          Router.go("/chats");
        },
      },
    });

    return compile(tmpl, {
      styles,
      DisplayNameInput,
      FistNameInput,
      SecondNameInput,
      LoginInput,
      EmailInput,
      PhoneInput,
      AvatarInput,
      SaveButton,
      BackButton,
    });
  }
}
