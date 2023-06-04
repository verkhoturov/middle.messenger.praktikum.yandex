import tmpl from "./button.hbs";
import linkButtonTmpl from "./link-button.hbs";
import styles from "./button.module.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

interface ButtonProps {
  text: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  to?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super("button", props);
    this.props.className = `${styles.button} ${props.className || ""}`;
  }

  render() {
    if(this.props.to) {
      return compile(linkButtonTmpl, this.props);
    }

    return compile(tmpl, this.props);
  }
}
