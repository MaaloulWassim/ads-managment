import { AdsService } from './../ads.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.page.html',
  styleUrls: ['./user-ads.page.scss'],
})
export class UserAdsPage implements OnInit {
  adsList: any = [];
  constructor(private route: ActivatedRoute, private adsService: AdsService) {}
  uid = this.route.snapshot.paramMap.get('uid');
  ngOnInit() {
    this.adsService.getAdsByUserId(this.uid).subscribe((data: any) => {
      this.adsList = data.ads;
    });
  }
}
