import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Servicio } from '../model/servicio.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {
  public url
  public headers = new HttpHeaders().set('Content-type','application/json')

  constructor(private _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  agregarServicio(servicio:Servicio,token): Observable<any>{
    let headersToken = this.headers.set('Authorization', token)
    let params = JSON.stringify(servicio)

    return this._http.post(this.url+'/agregarServicio',params,{headers: headersToken})
  }

}
