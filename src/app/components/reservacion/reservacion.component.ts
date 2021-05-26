import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Habitacion } from 'src/app/model/habitacion.model';
import { Reservacion } from 'src/app/model/reservacion.model';
import { Servicio } from 'src/app/model/servicio.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.scss'],
  providers: [UsuarioService, ReservacionService, HabitacionService, ServicioService]
})
export class ReservacionComponent implements OnInit {
  public token
  public idHabitacion
  public reservacionModelAdd: Reservacion
  public reservacionModelGet: Reservacion
  public habitacionModelGet: Habitacion
  public servicioModelGet: Servicio
  public idServicio
  public serviciosReservacion
  public reservacionActualizadaGet: Reservacion

  constructor(private _usuarioService: UsuarioService, private _reservacionService: ReservacionService, private _habitacionService: HabitacionService,
    private _servicioService: ServicioService, private _activatedRoute: ActivatedRoute ) { 
    this.token = _usuarioService.getToken()

    this.reservacionModelAdd = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',precio:0,cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.reservacionModelGet = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',precio:0,cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.habitacionModelGet = new Habitacion('','','','','',[{checkIn:new Date(),checkOut:new Date()}],'')
    this.servicioModelGet = new Servicio('','','',0,'','')
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHabitacion = dataRuta.get('idHabitacion');
    })
    this.obtenerHabitacionId();
    // this.obtenerServiciosHotel()
    this.obtenerServiciosReservacion()
    this.agregarPrecio()
    this.actualizarTotal()
  }

  reservarHabitacion(idHabitacion){
    this._reservacionService.reservarHabitacion(this.reservacionModelAdd,this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
        
      }
    )
  }

  obtenerHabitacionId(){
    this._habitacionService.obtenerHabitacionId(this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
        this.habitacionModelGet = response.habitacionEncontrada
        
        this._servicioService.obtenerServiciosHotel(this.habitacionModelGet.hotel,this.token).subscribe(
            respuesta => {
            console.log(respuesta.serviciosEncontrados);
            this.servicioModelGet = respuesta.serviciosEncontrados
            
          }
        )

      }
    )
  }

  agregarServiciosReservacion(idServicio){
    this._reservacionService.agregarServiciosReservacion(idServicio,this.token).subscribe(
      response=> {
        console.log(response);
        this.obtenerServiciosReservacion()
        this.actualizarTotal()
      }
    )
  }

  obtenerServiciosReservacion(){
    this._reservacionService.obtenerServiciosReservacion(this.token).subscribe(
      response=>{
        console.log(response.reservacionEncontrada);
        this.reservacionModelGet = response.reservacionEncontrada
        this.serviciosReservacion = response.reservacionEncontrada.servicios
        this.actualizarTotal()
      }
    )
  }

  eliminarServicioReservacion(idServicio){
    this._reservacionService.eliminarServicioReservacion(idServicio,this.token).subscribe(
      response => {
        console.log(response);
        this.obtenerServiciosReservacion()
        this.actualizarTotal()
      }
    )
  }

  actualizarTotal(){
    this._reservacionService.actualizarTotal(this.token).subscribe(
      response => {
        console.log(response);
        this.reservacionModelGet = response.reservacionTotalActualizada
      }
    )
  }

  agregarPrecio(){
    this._reservacionService.agregarPrecio(this.idHabitacion,this.token).subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
