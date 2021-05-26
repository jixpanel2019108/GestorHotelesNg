import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss'],
  providers: [UsuarioService]
})
export class CargaComponent implements OnInit {
  public token = ''
  public identidad
  
  
  constructor(private _usuarioService: UsuarioService, private _router: Router) { 
    this.token = this._usuarioService.getToken()
    this.identidad = this._usuarioService.getIdentidad();
  }

  ngOnInit(): void {
    console.log(this.token);
    console.log(this.identidad);

    if(this.identidad=null){
      this._router.navigate(['/carga'])
    }
  }

}
