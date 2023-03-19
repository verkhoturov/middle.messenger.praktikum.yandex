import { Input }  from "../input";
import { Button } from "../button";

import * as styles from "./menu.module.scss";

export const Menu = () => `
<div class="${styles.menu}">
    <nav class="${styles.nav}">
        ${Button({text: "Settings", to: "/account"})} 
        ${Button({text: "Exit", to: "/login"})} 
    </nav>
</div>
`;
