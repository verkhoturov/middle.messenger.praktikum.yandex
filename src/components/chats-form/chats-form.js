import { Input }  from "../input";
import { Button } from "../button";

import * as styles from "./chats-form.module.scss";

export const ChatsForm = () => `
<div class="${styles.chatsWrapper}">
    <div class="${styles.list}">
        
    </div>
    <div class="${styles.chat}">
        <div class="${styles.msgs}">
        </div>
        <form class="${styles.form}">
            ${Input({placeholder: "Text your massage", name: "message"})}
            ${Button({text: "Enter"})} 
        </form>
    </div>
</div>
`;
