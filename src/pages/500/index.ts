import { PageError } from "../../components/page-error";

export const ServerErrorPage = `${PageError({code: 500, msg: "Something went wrong"})}`;
