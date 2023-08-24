import {
  AccountPage,
  ChatsPage,
  NotFoundPage,
  LoginPage,
  RegPage,
} from "./pages";

import Router from './utils/router';

const login = new LoginPage();
const reg = new RegPage();
const chats = new ChatsPage();
const account = new AccountPage();
const notFound = new NotFoundPage();

window.addEventListener("DOMContentLoaded", () => {
  Router
      .use("/", login)
      .use("/login", login)
      .use("/sign-up", reg)
      .use("/404", notFound)
      .use("/account", account)
      .use("/chats", chats)
      .start();
});
