import { Component, OnInit } from '@angular/core';
import { Habitacion } from 'src/app/model/habitacion.model';
import { Hotel } from 'src/app/model/hotel.model';
import { HabitacionService } from 'src/app/services/habitacion.service';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-habitacion',
  templateUrl: './agregar-habitacion.component.html',
  styleUrls: ['./agregar-habitacion.component.scss'],
  providers: [HabitacionService, UsuarioService, HotelService]
})
export class AgregarHabitacionComponent implements OnInit {
  public token;
  public habitacionModelAdd: Habitacion
  public hotelModelGet: Hotel

  constructor(private _habitacionService: HabitacionService, private _usuarioService: UsuarioService, private _hotelService: HotelService) { 
    this.token = this._usuarioService.getToken()
    
  }

  ngOnInit(): void {
    this.habitacionModelAdd = new Habitacion('','','','','',[{checkIn:new Date(),checkOut:new Date()}],'')
    this.obtenerHotelesAll()
  }

  agregarHabitacion(){
    this._habitacionService.agregarHabitacion(this.habitacionModelAdd, this.token).subscribe(
      response =>{
        console.log(response);
        Swal.fire(
          'Registro con éxito',
          'Evento Guardado',
          'success'
        ),
        err => {
          console.log(<any>err);
          Swal.fire(
            'Error al registrar',
            'Error',
            'error'
          )
        }
      }
    )
  }

  obtenerHotelesAll(){
    this._hotelService.obtenerHotelesAll().subscribe(
      response =>{
        this.hotelModelGet = response.hotelesEncontrados
        console.log(response);
      },err =>{
        console.log(<any>err);
      }
    )
  }

  
}
