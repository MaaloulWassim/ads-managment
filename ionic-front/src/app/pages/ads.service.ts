import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdsService {
  url = 'http://localhost:5000';
  constructor(private httpClient: HttpClient) {}

  getAdsByUserId(userId: string) {
    return this.httpClient.get<any>(`${this.url}/api/ads/user/${userId}`);
  }

  getAdsById(id: string) {
    return this.httpClient.get<any>(`${this.url}/api/ads/${id}`);
  }

  createAdd(){
    
  }
}
