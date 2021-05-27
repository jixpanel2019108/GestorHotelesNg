import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { UsuarioService } from '../../services/usuario.service';
import { Hotel } from '../../model/hotel.model';
import { CountryI, CityI } from '../../model/paises.interface';
import { DataService } from '../../services/data.service';
import { Usuario } from 'src/app/model/usuario.model';
import { HotelUsuario } from 'src/app/model/hotelUsuario.model';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-agregar-hotel',
  templateUrl: './agregar-hotel.component.html',
  styleUrls: ['./agregar-hotel.component.scss'],
  providers:[HotelService, UsuarioService, DataService]
})
export class AgregarHotelComponent implements OnInit {
  public selectedCountry: CountryI = {id:'', name:""};
  public countries: CountryI[]
  public cities: CityI[]
  public token;
  public hotelModelAdd: Hotel;
  public usuarioModel: Usuario
  public hotelUsuarioModel: HotelUsuario

  constructor(private _usuarioService: UsuarioService, private _hotelService: HotelService, private _dataService: DataService) { 
    this.token = this._usuarioService.getToken()
    this.hotelModelAdd = new Hotel("","","","",0,"",0,"")
    this.usuarioModel = new Usuario('','','','','','','','','','','','','','')
    this.hotelUsuarioModel = new HotelUsuario('','','','','','','','')
  }

  ngOnInit(): void {
    // console.log(this._dataService.getCountries());
    this.countries = this._dataService.getCountries()
  }

  onSelect(id:string):void{
    this.cities = this._dataService.getCities().filter(item => item.country  == id)
  }

  agregarHotel(){
    this._hotelService.registroHotel(this.hotelUsuarioModel,this.token).subscribe(
      response => {
        console.log(response);
        Swal.fire(
          'Hotel agregado con éxito',
          'Hotel Guardado',
          'success'
        )
      },
      error => {
        console.log(<any>error);
      }
    )
  }
}
