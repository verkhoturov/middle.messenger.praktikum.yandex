import compile from "../../utils/compile";
import tmpl from "./404.hbs";

import { PageError } from "../../components/page-error";
import Block from "../../utils/block";

export class NotFoundPage extends Block {
  constructor() {
    super("div", {});
  }

  render() {
    const error = new PageError({
      code: 404,
      msg: "Page not found",
    });

    return compile(tmpl, {
      error,
    });
  }
}
