import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from 'src/app/model/evento.model';
import { Habitacion } from 'src/app/model/habitacion.model';
import { Hotel } from 'src/app/model/hotel.model';
import { EventoService } from 'src/app/services/evento.service';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { HotelService } from 'src/app/services/hotel.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-habitaciones-hotel',
  templateUrl: './habitaciones-hotel.component.html',
  styleUrls: ['./habitaciones-hotel.component.scss'],
  providers: [UsuarioService,HabitacionService, HotelService, EventoService]
})
export class HabitacionesHotelComponent implements OnInit {
  public token
  public habitacionModelGet: Habitacion
  public idHotelHabitacion: String
  public hotelModelGet: Hotel
  public eventoModelGet: Evento
  public servicioModelGet: Evento

  constructor(private _usuarioService: UsuarioService, private _habitacionService: HabitacionService, private _hotelService: HotelService,
    private _eventoService: EventoService, private _servicioService: ServicioService, private _activatedRoute:ActivatedRoute ) {
    this.token = this._usuarioService.getToken()
    this.hotelModelGet = new Hotel('','','','',0,'',0,'')
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHotelHabitacion = dataRuta.get('idHotel');
    })
    this.obtenerHabitacionesPorHotel(this.idHotelHabitacion)
    this.obtenerHabitacionesTrue()
    this.obtenerHotelId()
    this.obtenerEventosIdHotel()
    this.obtenerServiciosHotel()
  }

  obtenerHabitacionesPorHotel(idHotel){
    this._habitacionService.obtenerHabitacionesPorHotel(idHotel, this.token).subscribe(
      response => {
        // this.habitacionModelGet = response.habitacionesEncontradas2
        console.log(response);
      }
    )
  }

  obtenerHabitacionesTrue(){
    this._habitacionService.obtenerHabitacionesTrue(this.idHotelHabitacion,this.token).subscribe(
      response => {
        this.habitacionModelGet = response.habitacionesTrue
        console.log(response);
      }
    )
  }

  obtenerHotelId(){
    console.log(this.idHotelHabitacion);
    this._hotelService.obtenerHotelId(this.idHotelHabitacion,this.token).subscribe(
      response => {
        this.hotelModelGet = response.hotelEncontrado
        console.log(response.hotelEncontrado);
        
      }
    )
  }

  obtenerEventosIdHotel(){
    this._eventoService.obtenerEventosIdHotel(this.idHotelHabitacion,this.token).subscribe(

      response => {
        console.log(response.eventosEncontrados);
        this.eventoModelGet = response.eventosEncontrados
      }
    )
    }
    obtenerServiciosHotel(){
    this._servicioService.obtenerServiciosHotel(this.idHotelHabitacion,this.token).subscribe(

      response => {
        console.log(response.serviciosEncontrados);
        this.servicioModelGet = response.serviciosEncontrados
      }
    )
    }

     
  
}
