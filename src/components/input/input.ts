import { render } from "../../utils/render";
import input from "bundle-text:./input.hbs";
import styles from "./input.module.scss";

interface InputProps {
  type?: "text" | "password" | "email" | "tel" | "file";
  name: string;
  placeholder?: string;
}

export const Input = ({ type = "text", name, placeholder = "" }: InputProps) =>
  render(input, { type, placeholder, name, className: styles.input });
