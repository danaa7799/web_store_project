import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CartComponent} from './components/dashboard/cart/cart.component';
import {ProductsComponent} from './components/dashboard/products/products.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/dashboard/header/header.component';
import {environment} from '../../environment';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFirestoreModule} from '@angular/fire/compat/firestore';
import {OrdersComponent} from './components/dashboard/admin/orders/orders.component';
import {UserOrderComponent} from "./components/dashboard/cart/user-order/user-order.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    CartComponent,
    ProductsComponent,
    HeaderComponent,
    OrdersComponent,
    UserOrderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
