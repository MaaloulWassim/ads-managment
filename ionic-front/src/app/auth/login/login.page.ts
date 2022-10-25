import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { AuthResponse } from '../auth-response';
import { UserLogin } from '../user-login';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private helper: JwtHelperService = new JwtHelperService();
  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) {
    this.init();
  }
  init() {
    this.storage.create();
  }
  ngOnInit() {}

  login(form) {
    this.authService.login(form.value).subscribe((data: any) => {
      this.storage.set('ACCESS_TOKEN', data.token);
      this.router.navigateByUrl(`home`);
    });
  }
}
