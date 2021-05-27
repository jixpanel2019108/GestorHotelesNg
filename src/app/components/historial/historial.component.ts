import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/model/factura.model';
import { CityI, CountryI } from 'src/app/model/paises.interface';
import { Usuario } from 'src/app/model/usuario.model';
import { DataService } from 'src/app/services/data.service';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss'],
  providers: [ UsuarioService, ReservacionService, DataService]
})
export class HistorialComponent implements OnInit {
  public selectedCountry: CountryI = {id:'', name:""};
  public countries: CountryI[]
  public cities: CityI[]
  public token
  public facturaModelGet: Factura
  public facturaObjetoPrueba
  public facturaActuallizada
  public identidad
  public usuarioModelAdd: Usuario
  public usuarioObtenido: Usuario

  constructor(private _usuarioService: UsuarioService, private _reservacionService: ReservacionService, private _dataService: DataService, private _router:Router) { 
    this.token = this._usuarioService.getToken()
    this.identidad = this._usuarioService.getIdentidad();
    this.usuarioModelAdd = new Usuario("","","","","","","","","","","","","","")
    this.usuarioObtenido = new Usuario("","","","","","","","","","","","","","")
    this.usuarioModelAdd = this._usuarioService.getIdentidad()
    
  }

  ngOnInit(): void {
    this.obtenerFacturasUsuario()
    // this.obtenerServiciosFactura()
    this.obtenerUsuarioIdUsuario()
    this.countries = this._dataService.getCountries()
  }

  onSelect(id:string):void{
    this.cities = this._dataService.getCities().filter(item => item.country  == id)
  }

  eliminarUsuarioUsuario(){
    this._usuarioService.eliminarUsuarioUsuario().subscribe(
      response => {
        console.log(response);
        this._router.navigate(['/login'])
        window.location.replace('http://localhost:4200/login');

        Swal.fire(
          'Usuario Eliminado con Exito',
          'Usuario Eliminado',
          'success'
        )
      }
    )
  }

  editarUsuarioUsuario(){
    this._usuarioService.editarUsuarioUsuario(this.usuarioModelAdd).subscribe(
      response => {
        console.log(response);
        this.obtenerUsuarioIdUsuario()
    })
  }

  obtenerFacturasUsuario(){
    this._reservacionService.obtenerFacturasUsuario(this.token).subscribe(
      response => {
        console.log(response);
        this.facturaModelGet = response.facturasEncontradas
        
        this.facturaObjetoPrueba = Object.assign({},response.facturasEncontradas)
        console.log(this.facturaModelGet);

        
      }
    )
  }

  obtenerServiciosFactura(){
    this._reservacionService.obtenerServiciosFactura(this.token).subscribe(
      response=>{
        console.log(response.facturaServicio);
        this.facturaModelGet = response.facturaServicio
        this.facturaActuallizada = response.facturaServicio.servicios
        console.log(response.facturaServicio.servicios);
        this.actualizarTotal()
      }
    )
  }

  actualizarTotal(){
    this._reservacionService.actualizarTotal(this.token).subscribe(
      response => {
        console.log(response);
        this.facturaActuallizada = response.reservacionTotalActualizada
      }
    )
  }

  obtenerUsuarioIdUsuario(){
    this._usuarioService.obtenerUsuarioIdUsuario().subscribe(
      response => {
        console.log(response);
        this.usuarioObtenido = response.usuarioEncontrado
      }
    )
  }

}
