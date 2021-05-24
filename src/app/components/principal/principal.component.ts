import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as _ from 'lodash'
import { ActivatedRoute, Router } from '@angular/router';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { Reservacion } from 'src/app/model/reservacion.model';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [HotelService, UsuarioService, ReservacionService]
})
export class PrincipalComponent implements OnInit {
  public token
  public hotelModelGet: Hotel
  public hotelModelCiudad: Hotel
  public hotelesArray
  public idPais
  public idUsuario
  public identidad
  public reservacionModelAdd: Reservacion
  public idHotel
  public hotelModelNombre: Hotel
  

  // public idHotel: String


  constructor(private _hotelService: HotelService, private _usuarioService: UsuarioService,private _reservacionService: ReservacionService,
    private _router: Router) { 
    this.token = this._usuarioService.getToken()
    this.identidad = this._usuarioService.getIdentidad();
    this.reservacionModelAdd = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
    this.hotelModelNombre = new Hotel('','','','',0,'',0,'')
  }

  ngOnInit(): void {
    this.obtenerHoteles()
  }

  obtenerHoteles(){
    this._hotelService.obtenerHoteles().subscribe(
      response =>{
        this.hotelModelGet = response.hotelesEncontrados
        console.log(response);
        this.hotelModelCiudad= this.hotelModelGet
        console.log(this.hotelModelCiudad);
      },err =>{
        console.log(<any>err);
      }
    )
  }

  

  agregarChekInOut(){
    this._reservacionService.agregarChekInOut(this.reservacionModelAdd,this.identidad._id,this.token).subscribe(
      response => {
        console.log(response);
      },err =>{
        console.log(<any>err);
      }
    )
  }

  obteneridPais(idPais){
    this.idPais = idPais
    console.log(this.idPais);
  }

  agregarChekInOutSearch(){
    this._reservacionService.agregarChekInOut(this.reservacionModelAdd,this.identidad._id,this.token).subscribe(
      response => {
        console.log(this.hotelModelNombre);
        this._hotelService.obtenerHotelNombre(this.hotelModelNombre,this.token).subscribe(
        response => {
        console.log(response);
        this.idHotel = response.hotelObtenido._id
        this._router.navigate(['/habitaciones-hotel', this.idHotel])
      }
    )
        
        console.log(response);
      },err =>{
        console.log(<any>err);
      }
    )
    //TODO: COMPLETAR LA BUSQUEDA POR NOMBRE EN EL SEARCH ARREGLAR CONFLICTO MODAL
  }

  obtenerHotelNombre(){
    console.log(this.hotelModelNombre);
    this._hotelService.obtenerHotelNombre(this.hotelModelNombre,this.token).subscribe(
      response => {
        console.log(response);
        // this.idHotel = response.hotelObtenido._id
        // this._router.navigate(['/habitacion-hotel', this.idHotel])
      }
    )
  }
}
