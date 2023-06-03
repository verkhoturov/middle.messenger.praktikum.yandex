import { Button } from "../button";

import styles from "./menu.module.scss";

export const Menu = () => `
<div class="${styles.menu}">
    <nav class="${styles.nav}">
        ${Button({ text: "Settings", to: "/account" })} 
        ${Button({ text: "Exit", to: "/login" })} 
    </nav>
</div>
`;
