import { render } from "../../utils/render";
import pageError from "bundle-text:./page-error.hbs";
import * as styles from "./page-error.module.scss";

export const PageError = ({ code, msg }) => render(pageError, { code, msg, className: styles.error });
