import { Component, OnInit } from '@angular/core';
import { CityI, CountryI } from 'src/app/model/paises.interface';
import { DataService } from 'src/app/services/data.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UsuarioService, DataService]
})
export class RegistroComponent implements OnInit {
  public selectedCountry: CountryI = {id:'', name:""};
  public countries: CountryI[]
  public cities: CityI[]

  public usuarioModelAdd: Usuario
  constructor(private _usuarioService: UsuarioService, private _dataService: DataService) {
    this.usuarioModelAdd = new Usuario("","","","","","","","","","","","","","")
   }

  ngOnInit(): void {
    this.obtenerUsuarios()
    this.countries = this._dataService.getCountries()
  }

  onSelect(id:string):void{
    this.cities = this._dataService.getCities().filter(item => item.country  == id)
  }

  obtenerUsuarios(){
    this._usuarioService.obtenerUsuarios().subscribe(
      response => {
        console.log(response.usuariosEncontrados);
        // this.usuarioModelAdd = response.usuariosEncontrados
      },
      error => {
        console.log(<any>error);
        
      }
    )
  }

  registrarUsuario(){
    this._usuarioService.registro(this.usuarioModelAdd).subscribe(
      response => {
        console.log(response);
        
      },
      err => {
        console.log(<any>err);
        
      }
    )
  }
}
