import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/model/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import * as _ from 'lodash'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [HotelService, UsuarioService]
})
export class PrincipalComponent implements OnInit {
  public token
  public hotelModelGet: Hotel
  public hotelModelCiudad: Hotel
  public hotelesArray
  // public idHotel: String


  constructor(private _hotelService: HotelService, private _usuarioService: UsuarioService) { 
    this.token = this._usuarioService.getToken()
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
        // this.hotelModelCiudad = _.groupBy(this.hotelModelCiudad, 'pais')
        
        // this.hotelesArray = Object.values(this.hotelModelCiudad)
        
        console.log(this.hotelModelCiudad);
        console.log(this.hotelesArray);
      },err =>{
        console.log(<any>err);
      }
    )
  }




  // navegarHotelesPais(){
  //   this._router.navigate(['/hotel-pais',id])
  // }

  //TODO: TENGO QUE ARREGLAR LO DE LA RUTA DE PRINCIPAL A HOTELES POR PAIS

}
