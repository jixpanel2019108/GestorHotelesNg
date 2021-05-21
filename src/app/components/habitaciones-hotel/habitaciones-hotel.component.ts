import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habitacion } from 'src/app/model/habitacion.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-habitaciones-hotel',
  templateUrl: './habitaciones-hotel.component.html',
  styleUrls: ['./habitaciones-hotel.component.scss'],
  providers: [UsuarioService,HabitacionService]
})
export class HabitacionesHotelComponent implements OnInit {
  public token
  public habitacionModelGet: Habitacion
  public idHotelHabitacion: String

  constructor(private _usuarioService: UsuarioService, private _habitacionService: HabitacionService, private _activatedRoute:ActivatedRoute ) {
    this.token = this._usuarioService.getToken()
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHotelHabitacion = dataRuta.get('idHotel');
    })
    this.obtenerHabitacionesPorHotel(this.idHotelHabitacion)
  }

  obtenerHabitacionesPorHotel(idHotel){
    this._habitacionService.obtenerHabitacionesPorHotel(idHotel, this.token).subscribe(
      response => {
        this.habitacionModelGet = response.habitacionesEncontradas
        console.log(response);
      }
    )
  }
}
