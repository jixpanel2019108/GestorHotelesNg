import { Component, OnInit } from '@angular/core';
import { CityI, CountryI } from 'src/app/model/paises.interface';
import { Usuario } from 'src/app/model/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
  providers: [UsuarioService, DataService]
})
export class UsuariosComponent implements OnInit {
  public selectedCountry: CountryI = {id:'', name:""};
  public countries: CountryI[]
  public cities: CityI[]
  public token
  public usuarioModelGet: Usuario
  public idUsuarioModel: Usuario;

  constructor(private _usuarioService: UsuarioService, private _dataService: DataService ) { 
    this.token = this._usuarioService.getToken()
    this.idUsuarioModel = new Usuario("","","","","","","","","","","","","","")
  }

  ngOnInit(): void {
    this.adminObtenerUsuario()
    this.countries = this._dataService.getCountries()
  }

  onSelect(id:string):void{
    this.cities = this._dataService.getCities().filter(item => item.country  == id)
  }

  adminObtenerUsuario(){
    this._usuarioService.adminObtenerUsuario(this.token).subscribe(
      respuesta => {
        this.usuarioModelGet = respuesta.usuariosEncontrados        
        console.log(respuesta);
      }
    )
  }

  obtenerUsuarioId(idUsuario){
    this._usuarioService.obtenerUsuarioId(idUsuario).subscribe(
      response =>{
        this.idUsuarioModel = response.usuarioEncontrado;
        console.log(response);
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.idUsuarioModel).subscribe(
      response => {
        console.log(response);
        this.adminObtenerUsuario()
      }
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
        this.adminObtenerUsuario()
        
      }
    )
  }

}
