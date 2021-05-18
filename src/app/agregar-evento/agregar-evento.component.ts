import { Component, OnInit } from '@angular/core';
import { Evento } from '../model/evento.model';
import { Hotel } from '../model/hotel.model';
import { TipoEvento } from '../model/tipoEvento.model';
import { EventoService } from '../services/evento.service';
import { HotelService } from '../services/hotel.service';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-agregar-evento',
  templateUrl: './agregar-evento.component.html',
  styleUrls: ['./agregar-evento.component.scss'],
  providers:[UsuarioService, EventoService, HotelService]
})
export class AgregarEventoComponent implements OnInit {
  public idHotel;
  public idEvento;
  public eventoModel: Evento;
  public tiposModelGet: TipoEvento;
  public tipoEventoModelAdd: TipoEvento;
  public hotelModelGet: Hotel;
  public token;

  constructor(private _usuarioService: UsuarioService,private _eventoService: EventoService, private _hotelService: HotelService, private _router:Router) {
    this.token = this._usuarioService.getToken()
    this.eventoModel = new Evento('','','','','')
    this.tipoEventoModelAdd = new TipoEvento('','')
   }

  ngOnInit(): void {
    this.obtenerTipoEvento()
    this.obtenerHoteles()
  }

  agregarEvento(){
    this._eventoService.agregarEvento(this.eventoModel,this.token).subscribe(
      response => {
        console.log(response);
        Swal.fire(
          'Registro con éxito',
          'Evento Guardado',
          'success'
        )
        this.eventoModel.evento = ''
        this.eventoModel.fecha = ''
        this.eventoModel.tipoEvento = ''
        this.eventoModel.hotel = ''
      },
      err =>{
        console.log(<any>err);
      }
    )
  }

  obtenerTipoEvento(){
    this._eventoService.obtenerTipoEvento(this.token).subscribe(
      response => {
        this.tiposModelGet = response.tiposEncontrados
        console.log(response.tiposEncontrados);
        
      },
      err =>{
        console.log(<any>err);
      })
  }
  
  obtenerHoteles(){
    this._hotelService.obtenerHoteles().subscribe(
      response =>{
        this.hotelModelGet = response.hotelesEncontrados
        console.log(response);
      },err =>{
        console.log(<any>err);
      }
    )
  }

  agregarTipoEvento(){
    this._eventoService.agregarTipoEvento(this.tipoEventoModelAdd,this.token).subscribe(
      response =>{
        console.log(response);
        this.obtenerTipoEvento()

      }
    )
  }

}
