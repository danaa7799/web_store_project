import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {LocalStorageManager} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart_items_updater = new BehaviorSubject<any>([]);

  constructor() {
  }

  ngOnInit() {
    let cart = LocalStorageManager.getCart()
    if (cart) {
      this.cart_items_updater.next(cart)
    }
  }

  getUserCartObservable() {
    this.cart_items_updater.next(this.getCart())
    return this.cart_items_updater.asObservable()
  }

  getCart() {
    let cart = LocalStorageManager.getCart()
    return cart
  }

  getNumberOfProducts() {
    let counter = 0;
    this.getCart().forEach((item: any) => {
      counter += item.quantity
    })
    return counter
  }

  addToCartC(product: any) {
    let added = false
    let cart = LocalStorageManager.getCart()
    cart.forEach((prod: any) => {
      if (product.id == prod.id) {
        prod.quantity += 1;
        prod.total += prod.price
        added = true;
        return;
      }
    })
    if (!added) {
      cart.push(product)
    }
    LocalStorageManager.setCart(cart)
    this.cart_items_updater.next(cart)
  }

  getTotalPrice(): number {
    let cart = LocalStorageManager.getCart()
    let grand_total = 0;
    cart.map((a: any) => {
      grand_total += a.total;
    })
    return grand_total;
  }

  removeCartItem(product: any) {
    let cart = LocalStorageManager.getCart()
    cart.map((a: any, index: any) => {
      if (product.id == a.id) {
        cart.splice(index, 1);
      }
    })
    LocalStorageManager.setCart(cart)
    this.cart_items_updater.next(cart)
  }

  clearCartItems() {
    let cart = LocalStorageManager.getCart()
    cart = []
    LocalStorageManager.setCart(cart)
    this.cart_items_updater.next(cart)
  }
}
