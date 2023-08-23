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
  if (
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/login.html" ||
    pathname === "/index.html"
  )
    return login;

  if (pathname === "/sign-up" || pathname === "/sign-up.html") return reg;
  if (pathname === "/chats" || pathname === "/chats.html") return chats;
  if (pathname === "/account" || pathname === "/account.html") return account;

  return notFound;
};

const pathname = window.location.pathname;
const page = getPage(pathname);

renderDOM("#root", page);
