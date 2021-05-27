import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { Servicio } from 'src/app/model/servicio.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ServicioService } from 'src/app/services/servicio.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.component.html',
  styleUrls: ['./agregar-servicio.component.scss'],
  providers: [ServicioService, UsuarioService]
})
export class AgregarServicioComponent implements OnInit {
  public token
  public servicioModelAdd: Servicio
  public hotelModelGet: Hotel

  constructor(private _usuarioService: UsuarioService, private _servicioService: ServicioService, private _hotelService: HotelService) {
    this.token = this._usuarioService.getToken()
    this.servicioModelAdd = new Servicio('','','',0,'','')
   }

  ngOnInit(): void {
    this.obtenerHoteles()
  }

  obtenerHoteles(){
    this._hotelService.obtenerHotelesAll().subscribe(
      response =>{
        this.hotelModelGet = response.hotelesEncontrados
        console.log(response);
      },err =>{
        console.log(<any>err);
      }
    )
  }

  agregarServicio(){
    this._servicioService.agregarServicio(this.servicioModelAdd, this.token).subscribe(
      response =>{
        console.log(response);
        Swal.fire(
          'Servicio con éxito',
          'Servicio Guardado',
          'success'
        )
      },err =>{
        console.log(<any>err);
      }
    )
  }

}
