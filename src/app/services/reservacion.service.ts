import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reservacion } from '../model/reservacion.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  public url 
  public headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  agregarChekInOut(reservacionModel:Reservacion ,idUsuario , token){
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(reservacionModel)

    return this._http.put(this.url+'/agregarChekInOut/'+idUsuario,params,{headers: headersToken})
  }

  reservarHabitacion(reservacionModel: Reservacion, idHabitacion, token){
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(reservacionModel)

    return this._http.put(this.url+'/reservarHabitacion/'+ idHabitacion, params, {headers: headersToken})
  }
}
