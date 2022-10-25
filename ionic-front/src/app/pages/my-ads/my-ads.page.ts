import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdsService } from '../ads.service';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.page.html',
  styleUrls: ['./my-ads.page.scss'],
})
export class MyAdsPage implements OnInit {
  adsList: any = [];
  constructor(private route: ActivatedRoute, private adsService: AdsService) {}
  uid = this.route.snapshot.paramMap.get('uid');
  ngOnInit() {
    this.adsService.getAdsByUserId(this.uid).subscribe((data: any) => {
      this.adsList = data.ads;
    });
  }
}
