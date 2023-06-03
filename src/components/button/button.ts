import { render } from "../../utils/render";
import button from "bundle-text:./button.hbs";
import linkButton from "bundle-text:./link-button.hbs";
import styles from "./button.module.scss";

interface ButtonProps {
    text: string;
    type?: "button" | "submit" | "reset";
    to?: string;
}

export const Button = ({ text, type = "button", to }: ButtonProps) => {
    if(to) {
        return render(linkButton, { text, to, className: styles.button });
    }
    return render(button, { text, type, className: styles.button });
};
