import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { UsuarioService } from '../../services/usuario.service';
import { Hotel } from '../../model/hotel.model';
import { CountryI, CityI } from '../../model/paises.interface';
import { DataService } from '../../services/data.service';
 
@Component({
  selector: 'app-agregar-hotel',
  templateUrl: './agregar-hotel.component.html',
  styleUrls: ['./agregar-hotel.component.scss'],
  providers:[HotelService, UsuarioService, DataService]
})
export class AgregarHotelComponent implements OnInit {
  public selectedCountry: CountryI = {id:0, name:""};
  public countries: CountryI[]
  public cities: CityI[]

  

  public token;
  public hotelModel: Hotel;

  constructor(private _usuarioService: UsuarioService, private _hotelService: HotelService, private _dataService: DataService) { 
    this.token = this._usuarioService.getToken()
    this.hotelModel = new Hotel("","","",0,"",0)
  }

  ngOnInit(): void {
    this.countries = this._dataService.getCountries()
  }

  agregarHotel(){
    this._hotelService.registroHotel(this.hotelModel,this.token).subscribe(
      response => {
        console.log(response);
        this.hotelModel._id = "";
        this.hotelModel.nombre = "";
        this.hotelModel.pais = "";
        this.hotelModel.puntuacion = 0;
        this.hotelModel.direccion = "";
        this.hotelModel.contador = 0;
        
      }
    )
  }
}
