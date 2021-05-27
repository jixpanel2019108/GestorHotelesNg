import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  agregarChekInOut(reservacionModel:Reservacion ,idUsuario , token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(reservacionModel)

    return this._http.put(this.url+'/agregarChekInOut/'+idUsuario,params,{headers: headersToken})
  }

  reservarHabitacion(reservacionModel: Reservacion, idHabitacion, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(reservacionModel)

    return this._http.put(this.url+'/reservarHabitacion/'+ idHabitacion, params, {headers: headersToken})
  }

  agregarServiciosReservacion(idServicio, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url+'/agregarServiciosReservacion/'+idServicio,{},{headers:headersToken})
  }
  
  obtenerServiciosReservacion(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerServiciosReservacion',{headers:headersToken})
  }
  obtenerServiciosFactura(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerServiciosFactura',{headers:headersToken})
  }
  eliminarServicioReservacion(idServicio, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url+'/eliminarServicioReservacion/'+idServicio,{},{headers:headersToken})
  }

  actualizarTotal(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.post(this.url+'/actualizarTotal',{},{headers:headersToken})
  }
  
  agregarPrecio(idHabitacion, token):Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url+'/agregarPrecio/'+idHabitacion,{},{headers:headersToken})
  }
  
  agregarFactura(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.put(this.url+'/agregarFactura',{},{headers:headersToken})
  }
  
  obtenerFacturasUsuario(token): Observable<any>{
    let headersToken = this.headers.set('Authorization',token)
    return this._http.get(this.url+'/obtenerFacturasUsuario',{headers: headersToken})
  }
  
  obtenerHotelHabitacion(idHabitacion,token):Observable<any>{
    let headersToken = this.headers.set('Authorization',token)
    return this._http.get(this.url+'/obtenerHotelHabitacion/'+idHabitacion,{headers: headersToken})
  }
}
