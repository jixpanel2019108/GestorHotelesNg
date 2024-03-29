import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from 'src/app/model/hotel.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-hoteles-pais',
  templateUrl: './hoteles-pais.component.html',
  styleUrls: ['./hoteles-pais.component.scss'],
  providers: [HotelService, UsuarioService, HabitacionService]
})
export class HotelesPaisComponent implements OnInit {
  public token
  public hotelModelGet: Hotel
  public idPaisHotel: String

  constructor(private _hotelService: HotelService, private _usuarioService: UsuarioService, public _habitacionService: HabitacionService,
    public _activatedRoute: ActivatedRoute) { 
    this.token = this._usuarioService.getToken();
    console.log(this.token);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idPaisHotel = dataRuta.get('idPais');
    })
    this.obtenerHotelesPais(this.idPaisHotel)

  }

  obtenerHotelesPais(idPais){
    this._hotelService.obtenerHotelesPais(idPais).subscribe(
      response =>{
        this.hotelModelGet = response.hotelesEncontrados
        console.log(response);
      }
    )
  }
  

  //PARA HABITACIONES POR HOTEL

  obtenerHabitacionesPorHotel(idHotel){
    this._habitacionService.obtenerHabitacionesPorHotel(idHotel, this.token).subscribe(
      response => {
        // this.habitacionModelGet = response.habitacionesEncontradas2
        console.log(response);
      }
    )
  }

  // obtenerHabitacionesTrue(idHotel){
  //   this._habitacionService.obtenerHabitacionesTrue(idHotel,this.token).subscribe(
  //     response => {
  //       this.habitacionModelGet = response.habitacionesTrue
  //       console.log(response);
  //     }
  //   )
  // }
}
