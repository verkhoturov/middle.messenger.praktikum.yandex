import compile from "../../utils/compile";
import tmpl from "./500.hbs";

import { PageError } from "../../components/page-error";
import Block from "../../utils/block";

export class ServerErrorPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    const error = new PageError({
      code: 500,
      msg: "Something went wrong",
    });

    return compile(tmpl, {
      error,
    });
  }
}
