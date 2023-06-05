import tmpl from "./button.hbs";
import linkButtonTmpl from "./link-button.hbs";
import styles from "./button.module.scss";
import Block, { BlockDefaultProps } from "../../utils/block";
import compile from "../../utils/compile";

interface ButtonProps extends BlockDefaultProps {
  text: string;
  type?: "button" | "submit" | "reset";
  to?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super("button", props);
    this.props.className = `${styles.button} ${props.className || ""}`;
  }

  render() {
    if (this.props.to) {
      return compile(linkButtonTmpl, this.props);
    }

    return compile(tmpl, this.props);
  }
}
