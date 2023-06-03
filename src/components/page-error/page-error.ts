import { render } from "../../utils/render";
import pageError from "bundle-text:./page-error.hbs";
import styles from "./page-error.module.scss";

interface PageErrorProps {
  code: number | number;
  msg: string;
}

export const PageError = ({ code, msg }: PageErrorProps) =>
  render(pageError, { code: String(code), msg, className: styles.error });
