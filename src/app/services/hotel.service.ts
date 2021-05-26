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
  obtenerHotelesAll(): Observable<any>{
    return this._http.get(this.url + '/obtenerHotelesAll',{headers:this.headers})
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

  obtenerHotelesPais(id: String):Observable<any>{
    return this._http.get(this.url+'/obtenerHotelesPais/'+id,{headers: this.headers})
  }

  obtenerHotelNombre(hotelNombre: Hotel, token): Observable<any>{
    let params = JSON.stringify(hotelNombre)
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url+'/obtenerHotelNombre',params,{headers: headersToken})
  }

  obtenerHotelId(idHotel, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerHotelId/'+idHotel,{headers: headersToken})
  }

  adminObtenerHoteles(token):Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/adminObtenerHoteles', {headers: headersToken})
  }

  adminEditarHotel(idHotel, token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url+'/adminEditarHotel/'+idHotel,{},{headers:headersToken})
  }

  adminEliminarHotel(idHotel, token): Observable<any> {
    let headersToken = this.headers.set('Authorization', token)
    return this._http.delete(this.url+'/adminEliminarHotel/'+idHotel,{headers:headersToken})
  }



}
