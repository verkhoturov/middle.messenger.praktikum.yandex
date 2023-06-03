import { Input } from "../input";
import { Button } from "../button";

import styles from "./login-form.module.scss";

export const LoginForm = () => `
<form class="${styles.form}">
    <label class="${styles.label}">
        ${Input({ placeholder: "Login", name: "login" })}
    </label>

    <label class="${styles.label}">
        ${Input({
          placeholder: "Password",
          name: "password",
          type: "password",
        })}
    </label>
    
    <div class="${styles.buttons}">
        ${Button({ text: "Enter", to: "/chats" })}
        ${Button({ text: "Register", to: "/sign-up" })}
    </div>
</form>
`;
