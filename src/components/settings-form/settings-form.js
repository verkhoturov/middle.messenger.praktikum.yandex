import { Input }  from "../input";
import { Button } from "../button";

import * as styles from "./settings-form.module.scss";

export const SettingsForm = () => `
<form class="${styles.form}">
    <h3 class="${styles.title}">Settings</h3>
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
        <p  class="${styles.desc}">Avatar</p>
        ${Input({ name: "avatar", type: "file"})}
    </label>

    <label class="${styles.label}">
        <p  class="${styles.desc}">Change password</p>
        ${Input({placeholder: "Old password", name: "oldPassword", type: "password"})}
    </label>

    <label class="${styles.label}">
        ${Input({placeholder: "New password", name: "newPassword", type: "password"})}
    </label>
    
    <div class="${styles.row}">
        ${Button({text: "Save", to: "/chats"})}
        ${Button({text: "Back", to: "/chats"})}
    </div>
</form>
`;

// first_name, second_name, display_name, login, email, phone

/*

Поле для изменения аватара: avatar;
Поля для изменения пароля: oldPassword, newPassword.

*/