import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/compat/firestore';
import {AppSettings} from "../app-settings";
import {Observable} from "rxjs";
import {AngularFirestoreCollection} from "@angular/fire/compat/firestore/collection/collection";

@Injectable({
  providedIn: 'root'
})
export class DbHandlerService {
  private users: AngularFirestoreCollection;
  private orders: AngularFirestoreCollection;
  private products: AngularFirestoreCollection;
  private usersCollection;
  private ordersCollection;
  private productsCollection;
  public firebaseHandler;
  private users_list: any;

  constructor(private db: AngularFirestore) {
    this.firebaseHandler = db;

    this.orders = this.db.collection(AppSettings.ORDERS_COLLECTION);
    this.ordersCollection = this.db.collection(AppSettings.ORDERS_COLLECTION)
      .valueChanges({idField: 'id'}) as Observable<[object]>;

    this.products = this.db.collection(AppSettings.PRODUCTS_COLLECTION);
    this.productsCollection = this.db.collection(AppSettings.PRODUCTS_COLLECTION)
      .valueChanges({idField: 'id'}) as Observable<[object]>;

    this.users = this.db.collection(AppSettings.USERS_COLLECTION);
    this.usersCollection = this.db.collection(AppSettings.USERS_COLLECTION)
      .valueChanges({idField: 'id'}) as Observable<[object]>;
    this.getUsers()
      .subscribe((res: any) => {
        this.users_list = res;
      });
  }

  getProduct() {
    return this.productsCollection;
  }

  getOrders() {
    return this.ordersCollection;
  }

  addNewOrder(order: object) {
    this.orders.add(order);
  }

  deleteOrder(orderId: string) {
    this.orders.doc(orderId).delete()
  }

  updateOrder(orderInstance: any) {
    let id = orderInstance.id
    delete orderInstance['id']
    this.orders.doc(id).update(orderInstance)
  }

  getUsers() {
    return this.usersCollection
  }


  checkLoginDetails(email: string, password: string) {
    for (let user of this.users_list) {
      if (user.email == email && user.password == password) return true
    }
    return false
  }
}
