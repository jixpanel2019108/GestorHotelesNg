import { Injectable } from '@angular/core';
import { GLOBAL} from "./global.service"
import { Usuario } from '../model/usuario.model';
import { Observable} from "rxjs" //2 Importo para puder usar el observable en la funcion
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  //1instancio url de global service para las rutas
  public url: String;
  public headersVariable = new HttpHeaders().set('Content-type','application/json')
  public identidad;
  public token;
  user: Usuario;

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

  login(usuario, obtenerToken=null):Observable<any>{
    if (obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }
    let params =JSON.stringify(usuario)
    return this._http.post(this.url + '/login', params,{headers:this.headersVariable})
  }

  getIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'))
    if (identidad2 != 'undefined'){
      this.identidad = identidad2
    }else{
      this.identidad =null;
    }
    return this.identidad
  }

  getToken(){
    var token2 = localStorage.getItem('token')
    if (token2 != 'undefined'){
      this.token = token2
    }else{
      this.token = null;
    }
    return this.token;
  }

  adminObtenerUsuario(token):Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token)
    return this._http.get(`${this.url}/adminObtenerUsuario`,{headers:headersToken})
  }

  obtenerUsuarioId(id: String): Observable<any>{

    return this._http.get(this.url + '/obtenerUsuarioId/'+ id, {headers:this.headersVariable})
 }

 editarUsuario(usuario: Usuario): Observable<any>{
  let params = JSON.stringify(usuario);
  let headersToken = this.headersVariable.set('Authorization', this.getToken())
  return this._http.put(this.url+ '/adminEditarUsuario/'+ usuario._id, params, {headers: headersToken})
}

editarUsuarioUsuario(usuario: Usuario){
  let params = JSON.stringify(usuario);
  let headersToken = this.headersVariable.set('Authorization', this.getToken())
  return this._http.put(this.url+ '/editarUsuario/', params, {headers: headersToken})
}

eliminarUsuario(id:String): Observable<any>{
  let headersToken = this.headersVariable.set('Authorization', this.getToken())
  return this._http.delete(this.url+'/adminEliminarUsuario/'+ id, {headers: headersToken} )
}

eliminarUsuarioUsuario(): Observable<any>{
  let headersToken = this.headersVariable.set('Authorization', this.getToken())
  return this._http.delete(this.url+'/eliminarUsuario',{headers:headersToken})
}

}
