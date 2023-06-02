import { render } from "../../utils/render";
import input from "bundle-text:./input.hbs";
import * as styles from "./input.module.scss";

export const Input = ({ type = "text", name, placeholder="" }) => render(input, { type, placeholder, name, className: styles.input });
