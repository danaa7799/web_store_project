import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {AppSettings} from "../../../../app-settings";
import {DbHandlerService} from "../../../../service/db-handler.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {
  costumerInfo: any = FormGroup;
  public orders: any = [];
  public currentOrderId: any = "";
  public currentOrder: any;

  constructor(private firebaseHandler: DbHandlerService, titleService: Title, private fb: FormBuilder) {
    titleService.setTitle(AppSettings.CART_PAGE)
    this.currentOrder = Object();
  }

  ngOnInit() {
    this.costumerInfo = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      name: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])]
    })


    this.firebaseHandler.getOrders()
      .subscribe((res) => {
        this.orders = res;
      })


  }

  onOrderClick(id: any) {
    this.currentOrderId = id;
    for (let order of this.orders) {
      if (order.id == id) {
        this.currentOrder = order;
        break;
      }
    }
    this.setCostumerInfoFromOrder();


  }

  deleteOrderFromDB(currentOrderId: string) {
    this.firebaseHandler.deleteOrder(currentOrderId);
    this.currentOrderId = "";
    this.currentOrder = null;

  }

  updateOrderOnDB() {
    this.currentOrder.name = this.costumerInfo.get("name").value
    this.currentOrder.email = this.costumerInfo.get("email").value
    this.currentOrder.address = this.costumerInfo.get("address").value

    this.firebaseHandler.updateOrder(this.currentOrder)

  }

  deleteItemFromOrder(i: number) {
    let item = this.currentOrder.items[i];
    this.currentOrder.order_total = this.currentOrder.order_total - (item.price * item.quantity)
    this.currentOrder.items.splice(i, 1)
  }

  private setCostumerInfoFromOrder() {
    this.costumerInfo.get("name").setValue(this.currentOrder.name)
    this.costumerInfo.get("email").setValue(this.currentOrder.email)
    this.costumerInfo.get("address").setValue(this.currentOrder.address)
  }
}
