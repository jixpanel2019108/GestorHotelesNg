import { Injectable } from '@angular/core';
import { GLOBAL} from "./global.service"
import { Usuario } from '../model/usuario.model';
import {Observable} from "rxjs" //2 Importo para puder usar el observable en la funcion
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //1instancio url de global service para las rutas
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-type','application/json')
  //2Instancio en el contructor
  constructor(public _http: HttpClient) { 
    this.url = GLOBAL.url
  }

  //1 creacion de la funcion
  registro(usuario: Usuario): Observable<any>{
    let params = JSON.stringify(usuario)

    return this._http.post(`${this.url}/registrarUsuario`,params,{headers:this.headersVariable})
  }

  obtenerUsuarios(): Observable<any>{
    return this._http.get(`${this.url}/obtenerUsuarios`,{headers:this.headersVariable})
  }
}
