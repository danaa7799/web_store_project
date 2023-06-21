import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {CartComponent} from "./components/dashboard/cart/cart.component";
import {OrdersComponent} from "./components/dashboard/admin/orders/orders.component";
import {AppSettings} from "./app-settings";


const routes: Routes = [
  {path: AppSettings.LOGIN_PAGE, component: LoginComponent,},
  {path: AppSettings.DASHBOARD_PAGE, component: DashboardComponent},
  {path: '', redirectTo: AppSettings.DASHBOARD_PAGE, pathMatch: "full"},
  {path: AppSettings.CART_PAGE, component: CartComponent,},
  {path: AppSettings.ORDERS_PAGE, component: OrdersComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
