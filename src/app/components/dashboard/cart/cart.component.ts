import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../service/cart.service";
import {Title} from "@angular/platform-browser";
import {AppSettings} from "../../../app-settings";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public products: any = [];
  public grand_total: number = 0;
  public checkOut = false;

  constructor(private cartService: CartService, titleService: Title) {
    titleService.setTitle(AppSettings.CART_PAGE)
  }

  ngOnInit() {
    this.cartService.getUserCartObservable()
      .subscribe((res) => {
        this.products = res;
        this.grand_total = this.cartService.getTotalPrice();
      })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }

  clearCart() {
    this.cartService.clearCartItems();
  }

}
