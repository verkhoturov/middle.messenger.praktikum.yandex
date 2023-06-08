import tmpl from "./reg.hbs";

import { RegForm } from "../../components/reg-form";

import Block from "../../utils/block";
import compile from "../../utils/compile";

export class RegPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    const regForm = new RegForm({});
    return compile(tmpl, { regForm });
  }
}
