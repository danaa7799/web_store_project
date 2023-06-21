import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../service/cart.service";
import {AppSettings} from "../../../app-settings";
import {Router} from "@angular/router";
import {LocalStorageManager} from "../../../service/api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public total_items: number = 0;
  public user_name: string = ''

  constructor(private cartService: CartService, private router: Router) {
  }

  ngOnInit() {
    this.user_name = LocalStorageManager.getLoggedInUser() || ''
    this.total_items = this.cartService.getNumberOfProducts()
    this.cartService.getUserCartObservable()
      .subscribe(res => {
        this.total_items = this.cartService.getNumberOfProducts()
      })


  }

  isAnonymous(): boolean {
    return !LocalStorageManager.isLoggedIn();
  }

  onLogIn() {
    this.router.navigate([AppSettings.LOGIN_PAGE])
  }

  onManageOrdersClick() {
    this.router.navigate([AppSettings.ORDERS_PAGE])
  }

  onLogOut() {
    localStorage.setItem(AppSettings.IS_LOGGED_IN, "false")
    localStorage.setItem(AppSettings.LOGIN_AS, '')
    this.router.navigate([AppSettings.DASHBOARD_PAGE])
  }

  onHomeClick(){
    this.router.navigate([AppSettings.DASHBOARD_PAGE])
  }

}
