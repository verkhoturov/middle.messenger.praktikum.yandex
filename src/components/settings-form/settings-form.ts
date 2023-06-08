import tmpl from "./settings-form.hbs";
import styles from "./settings-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";

interface SettingsFormProps {}

export class SettingsForm extends Block {
  constructor(props: SettingsFormProps) {
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
    const DisplayNameInput = new Input({
      placeholder: "Chat nickname",
      name: "display_name",
    });

    const FistNameInput = new Input({
      placeholder: "Name",
      name: "first_name",
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
            window.location.href = "/chats";
          }
        },
      },
    });

    const BackButton = new Button({
      text: "Back",
      to: "/chats",
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
