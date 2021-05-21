import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as _ from 'lodash'
import { ActivatedRoute } from '@angular/router';
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

  // public idHotel: String


  constructor(private _hotelService: HotelService, private _usuarioService: UsuarioService,private _reservacionService: ReservacionService) { 
    this.token = this._usuarioService.getToken()
    this.identidad = this._usuarioService.getIdentidad();
    this.reservacionModelAdd = new Reservacion('','',new Date(),new Date(),0,0,[{nombre:'',cantidad:0,idServicio:''}],
    '','','','','','','','','',new Date(),0)
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

}
