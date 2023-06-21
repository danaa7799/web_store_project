import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../service/cart.service";
import {DbHandlerService} from "../../../service/db-handler.service";


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  public product_list: any;

  constructor(private firebaseHandler: DbHandlerService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.firebaseHandler.getProduct()
      .subscribe((res: any) => {
        this.product_list = res;

        this.product_list.forEach((a: any) => {
          Object.assign(a, {quantity: 1, total: a.price});
        });
      })
  }

  addToCartP(item: any) {
    this.cartService.addToCartC(item);

  }

}
