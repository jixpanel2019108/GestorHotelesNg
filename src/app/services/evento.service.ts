import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../model/evento.model';
import { TipoEvento } from '../model/tipoEvento.model';
import { GLOBAL } from './global.service'

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json')

  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  agregarEvento(evento:Evento, token): Observable<any>{
    let params = JSON.stringify(evento)
    let headersToken = this.headers.set('Authorization', token)

    return this._http.post(`${this.url}/registrarEvento`, params,{headers: headersToken})
  }

  obtenerTipoEvento(token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(`${this.url}/obtenerTipoEventos`,{headers:headersToken})
  }

  agregarTipoEvento(tipoEvento: TipoEvento, token): Observable<any>{
    let params = JSON.stringify(tipoEvento)
    let headersToken = this.headers.set('Authorization', token)
  
    return this._http.post(this.url+'/registrarTipoEvento', params, {headers:headersToken})
  }

  obtenerEventosIdHotel(idHotel, token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    return this._http.get(`${this.url}/obtenerEventosIdHotel/${idHotel}`,{headers:headersToken})
  }

}
