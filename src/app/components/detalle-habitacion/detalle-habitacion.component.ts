import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-habitacion',
  templateUrl: './detalle-habitacion.component.html',
  styleUrls: ['./detalle-habitacion.component.scss'],
  providers: [UsuarioService]
})
export class DetalleHabitacionComponent implements OnInit {
  public token
  public idHabitacion

  constructor(private _usuarioService: UsuarioService, public _activatedRoute: ActivatedRoute) { 
    this.token = this._usuarioService.getToken();
  }
  

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(dataRuta =>{
      this.idHabitacion = dataRuta.get('idHabitacion');
    })
  }

  

}
