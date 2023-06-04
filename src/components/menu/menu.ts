import tmpl from "./menu.hbs";
import styles from "./menu.module.scss";

import { Button } from "../button"; 

import Block from "../../utils/block";
import compile from "../../utils/compile";

interface MenuProps {}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super("div", props);
  }

  render() { 

    const settingsButton = new Button({
      text: "Settings",
      to: "/account",
    });

    const exitButton = new Button({
      text: "Exit",
      to: "/login",
    });

    return compile(tmpl, {
      styles, 
      settingsButton,
      exitButton,
    });
  }
}
