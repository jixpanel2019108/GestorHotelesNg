import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Hotel } from '../model/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public url: String;
  public headers = new HttpHeaders().set('Content-type','application/json');
  public token;

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  registroHotel(hotel:Hotel, token):Observable<any>{
    let params = JSON.stringify(hotel)
    let headersToken = this.headers.set('Authorization', token)  
    return this._http.post(this.url + "/registrarHotel",params,{headers:headersToken})
  }
  

}
