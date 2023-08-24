import tmpl from "./menu.hbs";
import styles from "./menu.module.scss";

import { Button } from "../button"; 

import Block from "../../utils/block";
import compile from "../../utils/compile";
import Router from "../../utils/router";

interface MenuProps {}

export class Menu extends Block {
  constructor(props: MenuProps) {
    super("div", props);
  }

  render() { 

    const settingsButton = new Button({
      text: "Settings",
      events: {
        click: () => {
          Router.go("/account");
        }
      }
    });

    const exitButton = new Button({
      text: "Exit",
      events: {
        click: () => {
          Router.go("/login");
        }
      }
    });

    return compile(tmpl, {
      styles, 
      settingsButton,
      exitButton,
    });
  }
}
