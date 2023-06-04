import tmpl from "./chats-form.hbs";
import styles from "./chats-form.module.scss";

import { Button } from "../button";
import { Input } from "../input";

import Block from "../../utils/block";
import compile from "../../utils/compile";
import { isValid } from "../../utils/validator";

interface ChatsFormProps {}

export class ChatsForm extends Block {
  constructor(props: ChatsFormProps) {
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
    const messageInput = new Input({
      name: "message",
      placeholder: "Text your message",
      validationType: "message",
      events: {
        blur: this.onFocus.bind(this),
        focus: this.onFocus.bind(this),
      },
    });

    const enterButton = new Button({
      text: "Enter",
      events: {
        click: (e) => {
          e.preventDefault();

          const inputs = [messageInput];

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
          }
        },
      },
    });

    return compile(tmpl, {
      styles,
      messageInput,
      enterButton,
    });
  }
}
