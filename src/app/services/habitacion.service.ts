import { Injectable } from '@angular/core';
import { GLOBAL } from './global.service'
import { Observable } from "rxjs"
import { Habitacion } from '../model/habitacion.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  agregarHabitacion(habitacion:Habitacion, token): Observable <any>{
    let params = JSON.stringify(habitacion)
    let headersToken = this.headers.set('Authorization', token)

    return this._http.post(this.url+'/registrarHabitacion',params,{headers: headersToken})
  }

  obtenerHabitacionesPorHotel(id, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerHabitacionesPorHotel/'+id,{headers:headersToken})
  }

  obtenerHabitacionId(idHabitacion, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerHabitacionId/'+idHabitacion,{headers: headersToken})
  }
  
  obtenerHabitacionesTrue(idHabitacion, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(this.url+'/obtenerHabitacionesTrue/'+idHabitacion,{headers: headersToken})
  }
}
