import {
  LoginPage,
  RegPage,
  NotFoundPage,
  AccountPage,
  ChatsPage,
} from "./pages";

const getPageContent = (pathname: string) => {
  if (pathname === "/" || pathname === "/login") return LoginPage;
  if (pathname === "/sign-up") return RegPage;
  if (pathname === "/account") return AccountPage;
  if (pathname === "/chats") return ChatsPage;
  return NotFoundPage;
};

const pathname = window.location.pathname;
const pageContent = getPageContent(pathname);

const root = document.querySelector("#root");
if (!root) throw new Error("Root element not found");
root.innerHTML = pageContent;
