import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppSettings} from "../../app-settings";
import {LocalStorageManager} from "../../service/api.service";
import {Title} from "@angular/platform-browser";
import {DbHandlerService} from "../../service/db-handler.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  login_form: any = FormGroup;
  login_clicked: boolean = false

  constructor(private fb: FormBuilder, private router: Router, private titleService: Title,
              private firebaseHandler: DbHandlerService) {
    titleService.setTitle(AppSettings.LOGIN_PAGE)
  }

  ngOnInit(): void {
    this.login_form = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required]
    })
  }

  loginSubmit(data: any) {
    let email: string = data.email.toLowerCase()
    if (this.firebaseHandler.checkLoginDetails(email, data.password)) {
      LocalStorageManager.onLogin(email)
      this.router.navigate([AppSettings.DASHBOARD_PAGE])
    }
    this.login_clicked = true
  }


}
