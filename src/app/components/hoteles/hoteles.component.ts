import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { CityI, CountryI } from 'src/app/model/paises.interface';
import { DataService } from 'src/app/services/data.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss'],
  providers: [UsuarioService, HotelService, DataService]
})
export class HotelesComponent implements OnInit {
  public selectedCountry: CountryI = {id:'', name:""};
  public countries: CountryI[]
  public cities: CityI[]
  public token
  public hotelModelGet: Hotel
  public hotelId: Hotel

  constructor(private _usuarioService: UsuarioService, private _hotelService: HotelService, private _dataService: DataService) { 
    this.token = this._usuarioService.getToken()
    this.hotelModelGet = new Hotel("","","","",0,"",0,"")
    this.hotelId = new Hotel("","","","",0,"",0,"")
    
  }

  ngOnInit(): void {
    this.adminObtenerHoteles()
    this.countries = this._dataService.getCountries()
  }

  onSelect(id:string):void{
    this.cities = this._dataService.getCities().filter(item => item.country  == id)
  }


  adminObtenerHoteles(){
    this._hotelService.adminObtenerHoteles(this.token).subscribe(
      respuesta => {
        console.log(respuesta);
        console.log(respuesta.hotelesEncontrados);
        this.hotelModelGet = respuesta.hotelesEncontrados        
      }
      )
    }
    
    obtenerHotelId(idHotel){
    this._hotelService.obtenerHotelId(idHotel,this.token).subscribe(
      respuesta => {     
        this.hotelId = respuesta.hotelEncontrado
        console.log(respuesta);
      }
    )
  }

  adminEditarHotel(){
    this._hotelService.adminEditarHotel(this.hotelId,this.token).subscribe(
      response => {
        console.log(response);
        this.adminObtenerHoteles()
      }
    )
  }

  adminEliminarHotel(idHotel){
    this._hotelService.adminEliminarHotel(idHotel,this.token).subscribe(
      response=>{
        console.log(response);
        this.adminObtenerHoteles()
      }
    )
  }

}
