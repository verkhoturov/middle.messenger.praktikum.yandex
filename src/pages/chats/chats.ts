import compile from "../../utils/compile";
import tmpl from "./chats.hbs";

import { ChatsForm } from "../../components/chats-form";
import { Menu } from "../../components/menu";

import Block from "../../utils/block";

export class ChatsPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    const chatsForm = new ChatsForm({});
    const menu = new Menu({});
    return compile(tmpl, { menu, chatsForm });
  }
}
