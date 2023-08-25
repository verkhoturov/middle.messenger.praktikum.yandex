import tmpl from "./input.hbs";
import styles from "./input.module.scss";
import Block, { BlockDefaultProps } from "../../utils/block";
import compile from "../../utils/compile";

interface InputProps extends BlockDefaultProps {
  type?: "text" | "password" | "email" | "tel" | "file";
  value?: string;
  validationType?: string;
  name: string;
  placeholder?: string;
  events?: {
    blur?: () => void;
    focus?: () => void;
  };
}

export class Input extends Block<InputProps> {
  constructor(props: InputProps) {
    super("input", props);
    this.props.className = `${styles.input} ${props.className || ""}`;
    this.props.type = props.type || "text";
    this.props.placeholder = props.placeholder || "";
    this.props.value = props.value || "";
  }

  render() {
    return compile(tmpl, this.props);
  }
}
