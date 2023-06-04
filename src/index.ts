import {
  AccountPage,
  ChatsPage,
  NotFoundPage,
  LoginPage,
  RegPage,
} from "./pages";

import { renderDOM } from "./utils/render-dom";

const login = new LoginPage();
const reg = new RegPage();
const chats = new ChatsPage();
const account = new AccountPage();
const notFound = new NotFoundPage();

const getPage = (pathname: string) => {
  if (pathname === "/" || pathname === "/login") return login;
  if (pathname === "/sign-up") return reg;
  if (pathname === "/chats") return chats;
  if (pathname === "/account") return account;

  return notFound;
};

const pathname = window.location.pathname;
const page = getPage(pathname);

renderDOM("#root", page);
