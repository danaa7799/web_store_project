import {Injectable} from '@angular/core';
import {AppSettings} from "../app-settings";

@Injectable({
  providedIn: 'root'
})

export class LocalStorageManager {

  constructor() {
  }

  static initLocalStorage() {
    if (!localStorage.getItem(AppSettings.LOGIN_AS)) {
      localStorage.setItem(AppSettings.LOGIN_AS, "")
    }

    if (!localStorage.getItem(AppSettings.IS_LOGGED_IN)) {
      localStorage.setItem(AppSettings.IS_LOGGED_IN, "false")
    }

    if (!localStorage.getItem(AppSettings.LOCAL_STORAGE_CART)) {
      localStorage.setItem(AppSettings.LOCAL_STORAGE_CART, "[]")
    }
  }

  static getCart() {
    let str_acc_carts: string = localStorage.getItem(AppSettings.LOCAL_STORAGE_CART) || ""
    return JSON.parse(str_acc_carts)
  }

  static setCart(carts: any) {
    localStorage.setItem(AppSettings.LOCAL_STORAGE_CART, JSON.stringify(carts))
  }

  static onLogin(email: string) {
    localStorage.setItem(AppSettings.IS_LOGGED_IN, "true");
    localStorage.setItem(AppSettings.LOGIN_AS, email.toLowerCase())
  }

  static getLoggedInUser() {
    return localStorage.getItem(AppSettings.LOGIN_AS)
  }

  static isLoggedIn(): boolean {
    return localStorage.getItem(AppSettings.IS_LOGGED_IN) == "true";

  }


}
