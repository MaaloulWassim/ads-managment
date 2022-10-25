import { ActivatedRoute } from '@angular/router';
import { AdsService } from './../ads.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ad-detail',
  templateUrl: './ad-detail.page.html',
  styleUrls: ['./ad-detail.page.scss'],
})
export class AdDetailPage implements OnInit {
  addetail: any;
  constructor(private adsService: AdsService, public route: ActivatedRoute) {}
  aid = this.route.snapshot.paramMap.get('aid');
  ngOnInit() {
    this.adsService.getAdsById(this.aid).subscribe((data: any) => {
      this.addetail = data.ad;
    });
  }
}
