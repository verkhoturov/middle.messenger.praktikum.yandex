import { PageError } from "../../components/page-error";

export const ServerErrorPage = `<main>${PageError({code: 500, msg: "Something went wrong"})}</main>`;
