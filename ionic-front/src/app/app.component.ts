import { Storage } from '@ionic/storage-angular';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    public router: Router,
    private storage: Storage
  ) {
    this.initializeApp();
    this.storage.create();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.router.navigateByUrl('welcome');
    });
  }
}
