import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Hotel } from '../model/hotel.model';
import { Usuario } from '../model/usuario.model';
import { HotelUsuario } from '../model/hotelUsuario.model';

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

  obtenerHoteles(): Observable<any>{
    return this._http.get(this.url + '/obtenerHoteles',{headers:this.headers})
  }

  registroHotel(hotelUsuario:HotelUsuario, token):Observable<any>{
    // console.log(hotel);
    // let paramsUnidos = Object.assign(hotel, usuario);
    // let paramsJson = JSON.stringify(paramsUnidos)
    // console.log(paramsJson);
    let params = JSON.stringify(hotelUsuario)

    let headersToken = this.headers.set('Authorization', token)  
    return this._http.post(this.url + "/registrarHotel",params,{headers:headersToken})
  }


  

}
