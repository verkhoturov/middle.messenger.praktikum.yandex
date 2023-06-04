import tmpl from "./input.hbs";
import styles from "./input.module.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

interface InputProps {
  type?: "text" | "password" | "email" | "tel" | "file";
  className?: string;
  validationType?: string;
  name: string;
  placeholder?: string;
  events?: {
    blur?: () => void;
    focus?: () => void;
  };
}

export class Input extends Block {
  constructor(props: InputProps) {
    super("input", props);
    this.props.className = `${styles.input} ${props.className || ""}`;
    this.props.type = props.type || "text";
    this.props.placeholder = props.placeholder || "";
  }

  render() {
    return compile(tmpl, this.props);
  }
}
