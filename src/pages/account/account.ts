import compile from "../../utils/compile";
import tmpl from "./account.hbs";

import { SettingsForm } from "../../components/settings-form";

import Block from "../../utils/block";

export class AccountPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    const settingsForm = new SettingsForm({});

    return compile(tmpl, {
      settingsForm,
    });
  }
}
