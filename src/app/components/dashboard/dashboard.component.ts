import {Component} from '@angular/core';
import {AppSettings} from "../../app-settings";
import {Title} from "@angular/platform-browser";
import {LocalStorageManager} from "../../service/api.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(titleService: Title) {
    LocalStorageManager.initLocalStorage()
    titleService.setTitle(AppSettings.DASHBOARD_PAGE)
  }
}
