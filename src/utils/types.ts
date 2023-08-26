export interface User {
  first_name?: string;
  second_name?: string;
  display_name?: string;
  login?: string;
  email?: string;
  password?: string;
  phone?: string;
  avatar?: string;
}

export enum LocalStorageItem {
  USER = "ya-messenger-user"
}