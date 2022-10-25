import { Storage } from '@ionic/storage-angular';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  usersList: any = [];
  uid: any;
  decodedToken: any;
  token = this.storage.get('ACCESS_TOKEN');

  private helper: JwtHelperService = new JwtHelperService();
  constructor(private auth: AuthService, private storage: Storage) {}
  async ngOnInit() {
    this.decodedToken = this.helper.decodeToken(await this.token);
    this.uid = this.decodedToken.userId;
    console.log(this.decodedToken);
    console.log(this.uid);
    this.auth.getAll().subscribe((data: any) => {
      this.usersList = data.users;
    });
  }

  logout() {
    this.auth.logout();
  }
}
