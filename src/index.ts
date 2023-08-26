import {
  AccountPage,
  ChatsPage,
  NotFoundPage,
  LoginPage,
  RegPage,
} from "./pages";

import Router from "./utils/router";
import AuthApi from "./api/auth";
import { LocalStorageItem } from "./utils/types";

const login = new LoginPage();
const reg = new RegPage();
const chats = new ChatsPage();
const account = new AccountPage();
const notFound = new NotFoundPage();

window.addEventListener("DOMContentLoaded", async () => {
  const auth = new AuthApi();
  const res = await auth.getUser();

  if (res?.user) {
    localStorage.setItem(LocalStorageItem.USER, JSON.stringify(res.user));
  }

  Router.use("/", login)
    .use("/login", login)
    .use("/sign-up", reg)
    .use("/404", notFound)
    .use("/account", account)
    .use("/chats", chats)
    .start();
});
