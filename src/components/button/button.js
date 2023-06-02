import { render } from "../../utils/render";
import button from "bundle-text:./button.hbs";
import linkButton from "bundle-text:./link-button.hbs";
import * as styles from "./button.module.scss";

export const Button = ({ text, type = "button", to }) => {
    if(to) {
        return render(linkButton, { text, to, className: styles.button });
    }
    return render(button, { text, type, className: styles.button });
};
