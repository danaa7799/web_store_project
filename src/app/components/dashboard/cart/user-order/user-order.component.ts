import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbHandlerService} from "../../../../service/db-handler.service";
import {LocalStorageManager} from "../../../../service/api.service";
import {CartService} from "../../../../service/cart.service";


@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent {
  submit_form: any = FormGroup;
  order_submitted: boolean = false;

  constructor(private fb: FormBuilder, private firebaseHandler: DbHandlerService, private cartService: CartService) {
  }

  ngOnInit(): void {
    this.submit_form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])]


    })
  }

  submitForm(data: any) {
    let name: string = data.name.toLowerCase();
    let email: string = data.email.toLowerCase();
    let address: string = data.address.toLowerCase();
    this.firebaseHandler.addNewOrder({
      "name": name, "email": email,
      "address": address, "items": LocalStorageManager.getCart(), "order_total": this.cartService.getTotalPrice()
    });
    this.cartService.clearCartItems();
    this.order_submitted = true;


  }

}
