import { PageError } from "../../components/page-error";

export const NotFoundPage = `<main>${PageError({
  code: 404,
  msg: "Page not found",
})}</main>`;
