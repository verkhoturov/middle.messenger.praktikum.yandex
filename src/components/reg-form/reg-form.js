import { Input }  from "../input";
import { Button } from "../button";

import * as styles from "./reg-form.module.scss";

export const RegForm = () => `
<form class="${styles.form}">
    <label class="${styles.label}">
        ${Input({placeholder: "Name", name: "first_name"})}
    </label>

    <label class="${styles.label}">
        ${Input({placeholder: "Second name", name: "second_name"})}
    </label>

    <label class="${styles.label}">
        ${Input({placeholder: "Login", name: "login"})}
    </label>

    <label class="${styles.label}">
        ${Input({placeholder: "Email", name: "email", type: "email"})}
    </label>

    <label class="${styles.label}">
        ${Input({placeholder: "Phone", name: "phone", type: "tel"})}
    </label>

    <label class="${styles.label}">
        ${Input({placeholder: "Password", name: "password", type: "password"})}
    </label>
    
    <div class="${styles.label}">
        ${Button({text: "Sign up", to: "/chats"})}
    </div>
    
    <div class="${styles.row}">
        <p>Already have an account?</p>
        ${Button({text: "Login", to: "/login"})}
    </div>
</form>
`;
