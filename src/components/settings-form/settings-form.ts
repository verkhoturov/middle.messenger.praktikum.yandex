import tmpl from "./settings-form.hbs";
import styles from "./settings-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";
import Router from "../../utils/router";

import UserApi from "../../api/user";
import { User, LocalStorageItem } from "../../utils/types";

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
    const userFromLocalData = localStorage.getItem(LocalStorageItem.USER);

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

    const OldPasswordInput = new Input({
      name: "oldPassword",
      placeholder: "Old password",
      type: "password",
    });

    const NewPasswordInput = new Input({
      name: "newPassword",
      placeholder: "New password",
      type: "password",
      validationType: "password",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const SaveButton = new Button({
      text: "Save",
      events: {
        click: async (e) => {
          e.preventDefault();

          const inputs = [
            DisplayNameInput,
            FistNameInput,
            SecondNameInput,
            LoginInput,
            EmailInput,
            PhoneInput,
            // AvatarInput,
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

          // const avatar = AvatarInput.element as HTMLInputElement;

          const oldPassword = OldPasswordInput.element as HTMLInputElement;
          const newPassword = NewPasswordInput.element as HTMLInputElement;

          if (!isValid(oldPassword)) {
            isFormValid = false;
            oldPassword.style.borderColor = "red";
          }

          if (isFormValid) {
            const user = new UserApi();

            const updateProfileRes = await user.updateProfile(formData);

            if (newPassword.value && oldPassword.value) {
              const updatePasswordRes = await user.updatePassword({
                oldPassword: oldPassword.value,
                newPassword: newPassword.value,
              });

              if (updatePasswordRes.status !== "success") {
                oldPassword.style.borderColor = "red";
                return;
              }

              oldPassword.value = "";
              newPassword.value = "";
            }

            /*
            if(avatar.files && avatar.files[0]) {

            }
            */

            if (updateProfileRes.status === "success") {
              Router.go("/chats");
            }
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
      OldPasswordInput,
      NewPasswordInput,
      SaveButton,
      BackButton,
    });
  }
}
