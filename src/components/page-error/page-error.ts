import tmpl from "./page-error.hbs";
import styles from "./page-error.module.scss";
import Block from "../../utils/block";
import compile from "../../utils/compile";

interface PageErrorProps {
  code: number | number;
  msg: string;
}

export class PageError extends Block {
  constructor(props: PageErrorProps) {
    super("div", props);
  }

  render() {
    return compile(tmpl, { ...this.props, styles });
  }
}
